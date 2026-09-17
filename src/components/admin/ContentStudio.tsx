import React, { useState, useEffect, useMemo } from 'react';
import { 
  Tv, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  ExternalLink, 
  RefreshCw, 
  Filter, 
  Layers, 
  Plus, 
  ShieldCheck, 
  BarChart3, 
  Key, 
  Check, 
  ChevronRight,
  Info,
  Clock,
  ThumbsUp,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { CURRICULUM_DATA, TOTAL_CURRICULUM_LESSONS } from '../../data/curriculumData';
import { LessonResource, ResourceStatus, LessonResourceSummaryStatus } from '../../types';

interface DiscoveryStatusResponse {
  success: boolean;
  apiKeyConfigured: boolean;
  totalLessons: number;
  summary: {
    totalLessons: number;
    approvedResourcesCount: number;
    needsReviewCount: number;
    withoutResourcesCount: number;
    lessonStatusMap: Record<string, LessonResourceSummaryStatus>;
  };
}

export const ContentStudio: React.FC = () => {
  const [statusData, setStatusData] = useState<DiscoveryStatusResponse | null>(null);
  const [resources, setResources] = useState<LessonResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [discoveringLessonId, setDiscoveringLessonId] = useState<string | null>(null);
  const [batchDiscovering, setBatchDiscovering] = useState(false);
  const [batchProgress, setBatchProgress] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Filters
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewVideo, setPreviewVideo] = useState<LessonResource | null>(null);

  // Manual Add Modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualLessonId, setManualLessonId] = useState('l1-01');
  const [manualUrl, setManualUrl] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualChannel, setManualChannel] = useState('');
  const [manualWhyUseful, setManualWhyUseful] = useState('');
  const [manualSubmitting, setManualSubmitting] = useState(false);

  // Batch Config
  const [batchSize, setBatchSize] = useState<number>(3);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [statusRes, resRes] = await Promise.all([
        fetch('/api/discovery/status'),
        fetch('/api/discovery/resources')
      ]);

      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatusData(sData);
      }
      if (resRes.ok) {
        const rData = await resRes.json();
        setResources(rData.resources || []);
      }
    } catch (err) {
      console.error('Failed to load Content Studio status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setActionNotice({ message, type });
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Flattened lessons list with mapped resources
  const allLessons = useMemo(() => {
    const list = [];
    for (const phase of CURRICULUM_DATA) {
      for (const lesson of phase.lessons) {
        list.push({
          ...lesson,
          phaseTitle: phase.title
        });
      }
    }
    return list;
  }, []);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return allLessons.filter(lesson => {
      if (selectedPhase !== 'all' && lesson.phaseId !== selectedPhase) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesId = lesson.id.toLowerCase().includes(q);
        const matchesConcepts = lesson.keyConcepts?.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesId && !matchesConcepts) return false;
      }

      const lessonResources = resources.filter(r => r.lessonId === lesson.id);
      const hasApproved = lessonResources.some(r => r.status === 'APPROVED');
      const hasDiscovered = lessonResources.some(r => r.status === 'DISCOVERED');

      if (selectedStatus === 'READY' && !hasApproved) return false;
      if (selectedStatus === 'NEEDS_REVIEW' && !hasDiscovered) return false;
      if (selectedStatus === 'NEEDS_RESOURCE' && (hasApproved || hasDiscovered)) return false;

      return true;
    });
  }, [allLessons, selectedPhase, selectedStatus, searchQuery, resources]);

  // Handle single discovery
  const handleDiscoverSingle = async (lessonId: string) => {
    try {
      setDiscoveringLessonId(lessonId);
      const res = await fetch('/api/discovery/discover-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, maxResults: 4 })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotice(data.error || 'Discovery failed', 'error');
      } else {
        showNotice(`Discovered ${data.videosFound} candidate videos for ${lessonId}`);
        await fetchData();
      }
    } catch (err: any) {
      showNotice(err.message, 'error');
    } finally {
      setDiscoveringLessonId(null);
    }
  };

  // Handle batch discovery
  const handleBatchDiscovery = async (targetPhaseId?: number) => {
    try {
      setBatchDiscovering(true);
      setBatchProgress(targetPhaseId ? `Discovering Phase ${targetPhaseId}...` : `Discovering batch of ${batchSize} lessons...`);

      const res = await fetch('/api/discovery/discover-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchSize,
          phaseId: targetPhaseId,
          delayMs: 800
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotice(data.error || 'Batch discovery halted', 'error');
      } else {
        showNotice(`Batch processed ${data.processedCount} lessons successfully!`);
        await fetchData();
      }
    } catch (err: any) {
      showNotice(err.message, 'error');
    } finally {
      setBatchDiscovering(false);
      setBatchProgress(null);
    }
  };

  // Approve Resource
  const handleApprove = async (resourceId: string, isPrimary = true) => {
    try {
      const res = await fetch('/api/discovery/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId, isPrimary })
      });
      if (res.ok) {
        showNotice(`Resource approved as ${isPrimary ? 'PRIMARY' : 'SECONDARY'}`);
        await fetchData();
      }
    } catch (err: any) {
      showNotice(err.message, 'error');
    }
  };

  // Reject Resource
  const handleReject = async (resourceId: string) => {
    try {
      const res = await fetch('/api/discovery/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId })
      });
      if (res.ok) {
        showNotice('Resource rejected and removed from rotation');
        await fetchData();
      }
    } catch (err: any) {
      showNotice(err.message, 'error');
    }
  };

  // Manual Resource Submission
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl || !manualTitle) return;

    try {
      setManualSubmitting(true);
      const res = await fetch('/api/discovery/manual-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: manualLessonId,
          youtubeUrl: manualUrl,
          title: manualTitle,
          channelName: manualChannel,
          whyUseful: manualWhyUseful
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showNotice(data.error || 'Failed to manually add video', 'error');
      } else {
        showNotice(`Manually verified video added to ${manualLessonId}`);
        setShowManualModal(false);
        setManualUrl('');
        setManualTitle('');
        setManualChannel('');
        setManualWhyUseful('');
        await fetchData();
      }
    } catch (err: any) {
      showNotice(err.message, 'error');
    } finally {
      setManualSubmitting(false);
    }
  };

  const approvedCount = statusData?.summary?.approvedResourcesCount ?? 0;
  const reviewCount = statusData?.summary?.needsReviewCount ?? 0;
  const pendingLessonsCount = statusData?.summary?.withoutResourcesCount ?? 0;
  const isKeyReady = statusData?.apiKeyConfigured;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Top Banner / Studio Identity */}
      <div className="bg-[#131316] border border-[#242429] rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#E8A33D]/10 text-[#E8A33D] rounded-xl border border-[#E8A33D]/30 shadow-[0_0_20px_-5px_rgba(232,163,61,0.3)]">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8A33D]/10 text-[#E8A33D] border border-[#E8A33D]/30 font-semibold">
                  ADMIN CONTENT STUDIO
                </span>
                <span className="text-xs font-mono text-[#8E8E98]">
                  TOTAL {TOTAL_CURRICULUM_LESSONS} LESSONS
                </span>
              </div>
              <h1 className="text-2xl font-display font-bold text-[#EDEDEF] mt-1">
                YouTube Educational Resource Discovery
              </h1>
              <p className="text-sm text-[#9A9AA3] mt-1 max-w-2xl">
                Server-side curated discovery powered by YouTube Data API v3. Eliminates clickbait, checks educational allowlists, and assigns verified video guides to all 148 curriculum lessons.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowManualModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#1C1C22] border border-[#3A3A42] hover:border-[#E8A33D] text-xs font-mono text-[#EDEDEF] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E8A33D]" />
              <span>MANUAL INJECT</span>
            </button>

            <button
              onClick={() => handleBatchDiscovery()}
              disabled={batchDiscovering || !isKeyReady}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                batchDiscovering || !isKeyReady
                  ? 'bg-[#1C1C22] text-[#8E8E98] border border-[#242429] cursor-not-allowed'
                  : 'bg-[#E8A33D] hover:bg-[#F2B04E] text-black shadow-lg'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${batchDiscovering ? 'animate-spin' : ''}`} />
              <span>{batchDiscovering ? 'DISCOVERING...' : `DISCOVER NEXT BATCH (${batchSize})`}</span>
            </button>
          </div>
        </div>

        {/* Global Notice Toast */}
        {actionNotice && (
          <div className={`mt-4 p-3 rounded-lg text-xs font-mono flex items-center space-x-2 border ${
            actionNotice.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}>
            {actionNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{actionNotice.message}</span>
          </div>
        )}

        {/* Batch Discovery Status Bar */}
        {batchProgress && (
          <div className="mt-4 p-3 rounded-lg bg-[#1C1C22] border border-[#E8A33D]/40 text-xs font-mono text-[#E8A33D] flex items-center space-x-2 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{batchProgress}</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#131316] border border-[#242429] rounded-xl p-4">
          <div className="text-xs font-mono text-[#8E8E98] flex items-center justify-between">
            <span>APPROVED RESOURCES</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-2">
            {approvedCount}
          </div>
          <div className="text-[11px] font-mono text-[#8E8E98] mt-1">
            Active in student lesson modals
          </div>
        </div>

        <div className="bg-[#131316] border border-[#242429] rounded-xl p-4">
          <div className="text-xs font-mono text-[#8E8E98] flex items-center justify-between">
            <span>NEEDS REVIEW</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-2">
            {reviewCount}
          </div>
          <div className="text-[11px] font-mono text-[#8E8E98] mt-1">
            Candidates awaiting approval
          </div>
        </div>

        <div className="bg-[#131316] border border-[#242429] rounded-xl p-4">
          <div className="text-xs font-mono text-[#8E8E98] flex items-center justify-between">
            <span>PENDING DISCOVERY</span>
            <Layers className="w-4 h-4 text-[#8E8E98]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#EDEDEF] mt-2">
            {pendingLessonsCount}
          </div>
          <div className="text-[11px] font-mono text-[#8E8E98] mt-1">
            Lessons without approved video
          </div>
        </div>

        <div className="bg-[#131316] border border-[#242429] rounded-xl p-4">
          <div className="text-xs font-mono text-[#8E8E98] flex items-center justify-between">
            <span>YOUTUBE API STATUS</span>
            <Key className="w-4 h-4 text-[#E8A33D]" />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isKeyReady ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <span className="text-base font-mono font-bold text-[#EDEDEF]">
              {isKeyReady ? 'CONFIGURED' : 'UNCONFIGURED'}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#8E8E98] mt-1">
            {isKeyReady ? 'Server proxy ready' : 'Add YOUTUBE_API_KEY to .env'}
          </div>
        </div>
      </div>

      {/* Control & Filter Strip */}
      <div className="bg-[#131316] border border-[#242429] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lesson ID, title, or concept..."
            className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#EDEDEF] placeholder-[#8E8E98] focus:outline-none focus:border-[#E8A33D]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Phase Filter */}
          <div className="flex items-center space-x-1 text-xs font-mono">
            <span className="text-[#8E8E98]">PHASE:</span>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-[#0A0A0B] border border-[#242429] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
            >
              <option value="all">ALL 12 PHASES</option>
              {CURRICULUM_DATA.map(p => (
                <option key={p.id} value={p.id}>
                  PHASE {String(p.id).padStart(2, '0')} ({p.lessons.length} LESSONS)
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1 text-xs font-mono">
            <span className="text-[#8E8E98]">STATUS:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#0A0A0B] border border-[#242429] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
            >
              <option value="all">ALL STATUSES</option>
              <option value="READY">APPROVED READY</option>
              <option value="NEEDS_REVIEW">NEEDS REVIEW</option>
              <option value="NEEDS_RESOURCE">NEEDS RESOURCE</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 bg-[#0A0A0B] border border-[#242429] hover:border-[#E8A33D] rounded-lg text-[#8E8E98] hover:text-[#EDEDEF] cursor-pointer"
            title="Refresh Studio Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Lesson Curriculum Resources Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E8E98] px-1">
          <span>SHOWING {filteredLessons.length} OF {TOTAL_CURRICULUM_LESSONS} LESSONS</span>
          <span>QUOTA GUARD: MAX 3 SEARCH CALLS PER AUTO-BATCH</span>
        </div>

        {filteredLessons.map(lesson => {
          const lessonResources = resources.filter(r => r.lessonId === lesson.id);
          const primaryApproved = lessonResources.find(r => r.status === 'APPROVED' && r.isPrimary) || lessonResources.find(r => r.status === 'APPROVED');
          const candidates = lessonResources.filter(r => r.status === 'DISCOVERED');
          const isDiscoveringThis = discoveringLessonId === lesson.id;

          return (
            <div
              key={lesson.id}
              className="bg-[#131316] border border-[#242429] rounded-xl p-5 hover:border-[#3A3A42] transition-colors"
            >
              {/* Header Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#242429]">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#E8A33D] bg-[#E8A33D]/10 px-2 py-0.5 rounded border border-[#E8A33D]/30">
                      {lesson.id.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-[#8E8E98]">
                      PHASE {String(lesson.phaseId).padStart(2, '0')} • LESSON {lesson.lessonNumber}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      primaryApproved
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                        : candidates.length > 0
                        ? 'bg-amber-950/60 border border-amber-500/40 text-amber-400'
                        : 'bg-zinc-900 border border-zinc-700 text-zinc-400'
                    }`}>
                      {primaryApproved ? 'APPROVED READY' : candidates.length > 0 ? `${candidates.length} CANDIDATES TO REVIEW` : 'NO RESOURCE'}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-bold text-[#EDEDEF] mt-1">
                    {lesson.title}
                  </h3>
                </div>

                {/* Single Discovery Action */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDiscoverSingle(lesson.id)}
                    disabled={isDiscoveringThis || !isKeyReady}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      isDiscoveringThis || !isKeyReady
                        ? 'bg-[#1C1C22] text-[#8E8E98] border border-[#242429] cursor-not-allowed'
                        : 'bg-[#1C1C22] border border-[#3A3A42] hover:border-[#E8A33D] text-[#EDEDEF]'
                    }`}
                  >
                    <Search className={`w-3.5 h-3.5 ${isDiscoveringThis ? 'animate-spin' : 'text-[#E8A33D]'}`} />
                    <span>{isDiscoveringThis ? 'SEARCHING YOUTUBE...' : 'DISCOVER CANDIDATES'}</span>
                  </button>
                </div>
              </div>

              {/* Resource Content: Approved Primary Card */}
              <div className="mt-4">
                {primaryApproved ? (
                  <div className="bg-[#0A0A0B] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail with Play preview */}
                      <div 
                        onClick={() => setPreviewVideo(primaryApproved)}
                        className="relative w-36 h-20 rounded-lg overflow-hidden shrink-0 border border-[#242429] group cursor-pointer"
                      >
                        <img 
                          src={primaryApproved.thumbnailUrl} 
                          alt={primaryApproved.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                          <Play className="w-6 h-6 text-[#E8A33D] fill-[#E8A33D]" />
                        </div>
                        <span className="absolute bottom-1 right-1 text-[10px] font-mono bg-black/80 px-1 rounded text-white">
                          {primaryApproved.durationFormatted}
                        </span>
                      </div>

                      {/* Video Info */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                            PRIMARY APPROVED
                          </span>
                          <span className="text-xs font-mono text-[#8E8E98]">
                            {primaryApproved.channelName}
                          </span>
                          <span className="text-xs font-mono text-[#E8A33D]">
                            SCORE: {primaryApproved.qualityScore}/100
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#EDEDEF] mt-1 line-clamp-1">
                          {primaryApproved.title}
                        </h4>
                        <p className="text-xs text-[#9A9AA3] mt-1 line-clamp-2">
                          {primaryApproved.whyUseful || primaryApproved.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={primaryApproved.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-[#8E8E98] hover:text-[#EDEDEF] border border-[#242429] rounded-lg"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleReject(primaryApproved.id)}
                        className="px-2.5 py-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-900/60 text-xs font-mono cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0A0A0B] border border-dashed border-[#242429] rounded-xl p-4 text-center">
                    <p className="text-xs font-mono text-[#8E8E98]">
                      No approved primary video resource linked for this lesson.
                    </p>
                  </div>
                )}

                {/* Candidate Video Review Shelf */}
                {candidates.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#242429]/60">
                    <div className="text-xs font-mono text-[#E8A33D] font-bold mb-3 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{candidates.length} CANDIDATE VIDEOS AWAITING OPERATOR REVIEW</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {candidates.map(cand => (
                        <div
                          key={cand.id}
                          className="bg-[#0D0D10] border border-[#242429] rounded-lg p-3 flex flex-col justify-between"
                        >
                          <div className="flex items-start space-x-3">
                            <div 
                              onClick={() => setPreviewVideo(cand)}
                              className="relative w-28 h-16 rounded overflow-hidden shrink-0 border border-[#242429] cursor-pointer group"
                            >
                              <img 
                                src={cand.thumbnailUrl} 
                                alt={cand.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Play className="w-4 h-4 text-white fill-white" />
                              </div>
                              <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-white">
                                {cand.durationFormatted}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 text-[10px] font-mono">
                                <span className="text-[#8E8E98] truncate">{cand.channelName}</span>
                                <span className="text-[#E8A33D] font-bold shrink-0">QS: {cand.qualityScore}</span>
                              </div>
                              <h5 className="text-xs font-semibold text-[#EDEDEF] truncate mt-0.5">
                                {cand.title}
                              </h5>
                              <p className="text-[11px] text-[#9A9AA3] line-clamp-1 mt-0.5">
                                {cand.whyUseful}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 mt-3 pt-2 border-t border-[#242429]/40">
                            <button
                              onClick={() => handleReject(cand.id)}
                              className="px-2 py-1 text-[11px] font-mono rounded bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-900/60 cursor-pointer"
                            >
                              REJECT
                            </button>
                            <button
                              onClick={() => handleApprove(cand.id, true)}
                              className="px-2.5 py-1 text-[11px] font-mono font-bold rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 cursor-pointer flex items-center space-x-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>APPROVE AS PRIMARY</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131316] border border-[#242429] rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#242429] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono bg-[#E8A33D]/10 text-[#E8A33D] border border-[#E8A33D]/30 px-2 py-0.5 rounded">
                  {previewVideo.lessonId.toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-[#EDEDEF] truncate max-w-md">
                  {previewVideo.title}
                </span>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="text-[#8E8E98] hover:text-[#EDEDEF] text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={previewVideo.embedUrl}
                title={previewVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-[#0A0A0B] flex items-center justify-between">
              <div className="text-xs font-mono text-[#8E8E98]">
                Channel: <span className="text-[#EDEDEF]">{previewVideo.channelName}</span> • Duration: <span className="text-[#EDEDEF]">{previewVideo.durationFormatted}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    handleApprove(previewVideo.id, true);
                    setPreviewVideo(null);
                  }}
                  className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 cursor-pointer"
                >
                  APPROVE AS PRIMARY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Inject Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131316] border border-[#242429] rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#242429]">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#E8A33D]" />
                <h3 className="text-base font-display font-bold text-[#EDEDEF]">
                  Manual Resource Injection
                </h3>
              </div>
              <button
                onClick={() => setShowManualModal(false)}
                className="text-[#8E8E98] hover:text-[#EDEDEF] text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4 mt-4 text-xs font-mono">
              <div>
                <label className="block text-[#8E8E98] mb-1">TARGET CURRICULUM LESSON</label>
                <select
                  value={manualLessonId}
                  onChange={(e) => setManualLessonId(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg px-3 py-2 text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
                >
                  {allLessons.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.id.toUpperCase()} — {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#8E8E98] mb-1">YOUTUBE VIDEO URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg px-3 py-2 text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div>
                <label className="block text-[#8E8E98] mb-1">VIDEO TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Solscan in 10 Minutes"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg px-3 py-2 text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div>
                <label className="block text-[#8E8E98] mb-1">CHANNEL NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Whiteboard Crypto"
                  value={manualChannel}
                  onChange={(e) => setManualChannel(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg px-3 py-2 text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div>
                <label className="block text-[#8E8E98] mb-1">WHY USEFUL / TAKEAWAYS</label>
                <textarea
                  rows={3}
                  placeholder="Explains transaction signatures, inner instructions, and rent exemption..."
                  value={manualWhyUseful}
                  onChange={(e) => setManualWhyUseful(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#242429] rounded-lg px-3 py-2 text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#242429]">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1C1C22] text-[#8E8E98] hover:text-[#EDEDEF] cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={manualSubmitting}
                  className="px-4 py-2 rounded-lg bg-[#E8A33D] hover:bg-[#F2B04E] text-black font-bold cursor-pointer"
                >
                  {manualSubmitting ? 'SAVING...' : 'INJECT & APPROVE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
