import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { ResourceStore } from './src/server/resourceStore';
import { searchYouTubeForLesson } from './src/server/youtubeService';
import { generateSearchProfile } from './src/lib/searchProfiles';
import { CURRICULUM_DATA, getLessonById } from './src/data/curriculumData';
import { LessonResource } from './src/types';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // ==========================================
  // DISCOVERY & CONTENT STUDIO API ROUTES FIRST
  // ==========================================

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'TRENCHLAB University Server'
    });
  });

  // 2. Discovery Status and Summary of 148 Lessons
  app.get('/api/discovery/status', (req, res) => {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      const isKeyConfigured = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_YOUTUBE_API_KEY');

      const allLessonIds: string[] = [];
      for (const phase of CURRICULUM_DATA) {
        for (const lesson of phase.lessons) {
          allLessonIds.push(lesson.id);
        }
      }

      const summary = ResourceStore.getSummary(allLessonIds);

      res.json({
        success: true,
        apiKeyConfigured: isKeyConfigured,
        totalLessons: allLessonIds.length,
        summary
      });
    } catch (err: any) {
      console.error('Error fetching discovery status:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. List all stored resources
  app.get('/api/discovery/resources', (req, res) => {
    try {
      const { lessonId, status } = req.query;
      let resources = ResourceStore.getAll();

      if (lessonId && typeof lessonId === 'string') {
        resources = resources.filter(r => r.lessonId === lessonId);
      }
      if (status && typeof status === 'string') {
        resources = resources.filter(r => r.status === status);
      }

      res.json({
        success: true,
        count: resources.length,
        resources
      });
    } catch (err: any) {
      console.error('Error listing resources:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Discover candidates for a single lesson
  app.post('/api/discovery/discover-single', async (req, res) => {
    try {
      const { lessonId, maxResults = 5 } = req.body;
      if (!lessonId) {
        return res.status(400).json({ success: false, error: 'lessonId is required' });
      }

      const found = getLessonById(lessonId);
      if (!found) {
        return res.status(404).json({ success: false, error: `Lesson ${lessonId} not found in curriculum` });
      }

      const searchProfile = generateSearchProfile(found.lesson, found.phase.title);
      const searchResult = await searchYouTubeForLesson(searchProfile, maxResults);

      if (!searchResult.success && !searchResult.apiKeyConfigured) {
        return res.status(400).json({
          success: false,
          apiKeyConfigured: false,
          error: searchResult.error
        });
      }

      // Store discovered candidates in ResourceStore
      const savedList: LessonResource[] = [];
      const now = new Date().toISOString();

      for (const item of searchResult.videos) {
        const id = `res-${lessonId}-${item.id}`;
        const existing = ResourceStore.getById(id);

        const resource: LessonResource = {
          id,
          lessonId,
          provider: 'youtube',
          providerVideoId: item.id,
          title: item.title,
          description: item.description,
          channelName: item.channelTitle,
          thumbnailUrl: item.thumbnailUrl,
          youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${item.id}`,
          durationSeconds: item.durationSeconds || 600,
          durationFormatted: item.durationFormatted || '10:00',
          publishedAt: item.publishedAt,
          relevanceScore: item.relevanceScore,
          qualityScore: item.qualityScore,
          resourceType: 'EXTERNAL_YOUTUBE',
          status: existing ? existing.status : 'DISCOVERED',
          isPrimary: existing ? existing.isPrimary : false,
          searchQuery: searchProfile.primarySearchQuery,
          whyUseful: item.whyUseful,
          createdAt: existing ? existing.createdAt : now,
          updatedAt: now
        };

        const saved = ResourceStore.saveResource(resource);
        savedList.push(saved);
      }

      res.json({
        success: true,
        apiKeyConfigured: searchResult.apiKeyConfigured,
        quotaExceeded: searchResult.quotaExceeded,
        videosFound: savedList.length,
        resources: savedList
      });
    } catch (err: any) {
      console.error('Error running single discovery:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Run batch discovery across multiple lessons (rate-limited to conserve quota)
  app.post('/api/discovery/discover-batch', async (req, res) => {
    try {
      const { lessonIds, phaseId, batchSize = 3, delayMs = 600 } = req.body;
      const apiKey = process.env.YOUTUBE_API_KEY;

      if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_YOUTUBE_API_KEY') {
        return res.status(400).json({
          success: false,
          apiKeyConfigured: false,
          error: 'YOUTUBE_API_KEY is not configured in server environment (.env).'
        });
      }

      let targets: { lessonId: string }[] = [];

      if (Array.isArray(lessonIds) && lessonIds.length > 0) {
        targets = lessonIds.map(id => ({ lessonId: id }));
      } else if (phaseId) {
        const phase = CURRICULUM_DATA.find(p => p.id === Number(phaseId));
        if (phase) {
          targets = phase.lessons.map(l => ({ lessonId: l.id }));
        }
      } else {
        // Collect all lessons that currently have NO approved resource
        for (const phase of CURRICULUM_DATA) {
          for (const l of phase.lessons) {
            const approved = ResourceStore.getByLessonId(l.id, true);
            if (approved.length === 0) {
              targets.push({ lessonId: l.id });
            }
          }
        }
      }

      const actualBatch = targets.slice(0, Math.min(Number(batchSize) || 3, 10));
      const results: Record<string, { success: boolean; found: number; error?: string }> = {};

      for (const item of actualBatch) {
        const found = getLessonById(item.lessonId);
        if (!found) continue;

        const profile = generateSearchProfile(found.lesson, found.phase.title);
        const searchRes = await searchYouTubeForLesson(profile, 3);

        if (searchRes.quotaExceeded) {
          results[item.lessonId] = { success: false, found: 0, error: 'Daily YouTube quota limit reached' };
          break; // Stop immediately on quota limit
        }

        if (searchRes.success && searchRes.videos.length > 0) {
          const now = new Date().toISOString();
          for (const vid of searchRes.videos) {
            const id = `res-${item.lessonId}-${vid.id}`;
            const existing = ResourceStore.getById(id);
            const resource: LessonResource = {
              id,
              lessonId: item.lessonId,
              provider: 'youtube',
              providerVideoId: vid.id,
              title: vid.title,
              description: vid.description,
              channelName: vid.channelTitle,
              thumbnailUrl: vid.thumbnailUrl,
              youtubeUrl: `https://www.youtube.com/watch?v=${vid.id}`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${vid.id}`,
              durationSeconds: vid.durationSeconds || 600,
              durationFormatted: vid.durationFormatted || '10:00',
              publishedAt: vid.publishedAt,
              relevanceScore: vid.relevanceScore,
              qualityScore: vid.qualityScore,
              resourceType: 'EXTERNAL_YOUTUBE',
              status: existing ? existing.status : 'DISCOVERED',
              isPrimary: existing ? existing.isPrimary : false,
              searchQuery: profile.primarySearchQuery,
              whyUseful: vid.whyUseful,
              createdAt: existing ? existing.createdAt : now,
              updatedAt: now
            };
            ResourceStore.saveResource(resource);
          }
          results[item.lessonId] = { success: true, found: searchRes.videos.length };
        } else {
          results[item.lessonId] = { success: searchRes.success, found: 0, error: searchRes.error };
        }

        // Throttle to respect YouTube API rate limits
        if (delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }

      res.json({
        success: true,
        processedCount: Object.keys(results).length,
        results
      });
    } catch (err: any) {
      console.error('Error running batch discovery:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Approve candidate
  app.post('/api/discovery/approve', (req, res) => {
    try {
      const { resourceId, isPrimary = true } = req.body;
      if (!resourceId) {
        return res.status(400).json({ success: false, error: 'resourceId is required' });
      }

      const approved = ResourceStore.approve(resourceId, isPrimary);
      if (!approved) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, resource: approved });
    } catch (err: any) {
      console.error('Error approving resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Reject candidate
  app.post('/api/discovery/reject', (req, res) => {
    try {
      const { resourceId } = req.body;
      if (!resourceId) {
        return res.status(400).json({ success: false, error: 'resourceId is required' });
      }

      const rejected = ResourceStore.reject(resourceId);
      if (!rejected) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, resource: rejected });
    } catch (err: any) {
      console.error('Error rejecting resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Set primary resource for a lesson
  app.post('/api/discovery/set-primary', (req, res) => {
    try {
      const { lessonId, resourceId } = req.body;
      if (!lessonId || !resourceId) {
        return res.status(400).json({ success: false, error: 'lessonId and resourceId are required' });
      }

      const updated = ResourceStore.setPrimary(lessonId, resourceId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Target resource not found for this lesson' });
      }

      res.json({ success: true, resource: updated });
    } catch (err: any) {
      console.error('Error setting primary resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Manually add custom YouTube resource
  app.post('/api/discovery/manual-add', (req, res) => {
    try {
      const { lessonId, youtubeUrl, title, whyUseful, channelName } = req.body;
      if (!lessonId || !youtubeUrl || !title) {
        return res.status(400).json({ success: false, error: 'lessonId, youtubeUrl, and title are required' });
      }

      // Extract YouTube ID
      let videoId = '';
      try {
        const urlObj = new URL(youtubeUrl);
        if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        } else {
          videoId = urlObj.searchParams.get('v') || '';
        }
      } catch {
        // Simple regex fallback
        const match = youtubeUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (match) videoId = match[1];
      }

      if (!videoId) {
        return res.status(400).json({ success: false, error: 'Could not extract valid 11-character YouTube video ID' });
      }

      const now = new Date().toISOString();
      const id = `res-${lessonId}-${videoId}`;
      const newResource: LessonResource = {
        id,
        lessonId,
        provider: 'youtube',
        providerVideoId: videoId,
        title,
        description: whyUseful || '',
        channelName: channelName || 'Curated Operator',
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        durationSeconds: 600,
        durationFormatted: '10:00',
        publishedAt: now,
        relevanceScore: 99,
        qualityScore: 99,
        resourceType: 'EXTERNAL_YOUTUBE',
        status: 'APPROVED',
        isPrimary: true,
        searchQuery: 'manual addition',
        whyUseful: whyUseful || 'Manually approved high-conviction educational guide.',
        createdAt: now,
        updatedAt: now
      };

      const saved = ResourceStore.saveResource(newResource);
      ResourceStore.setPrimary(lessonId, id);

      res.json({ success: true, resource: saved });
    } catch (err: any) {
      console.error('Error adding manual resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TRENCHLAB University Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
