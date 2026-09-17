const fs = require('fs');
const path = require('path');

const srcPhasesFile = path.join(__dirname, '../src/data/curriculumPhases3to12.ts');
const fileContent = fs.readFileSync(srcPhasesFile, 'utf8');

// Helper to extract existing lesson block
function getExistingLessonBlock(lessonId) {
  const marker = new RegExp(`id:\\s*['"]${lessonId}['"],`);
  const match = fileContent.search(marker);
  if (match === -1) return null;

  // Find start brace '{' backwards
  let startIdx = match;
  while (startIdx > 0 && fileContent[startIdx] !== '{') {
    startIdx--;
  }

  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;

  for (let i = startIdx; i < fileContent.length; i++) {
    const c = fileContent[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === '\\') {
      escape = true;
      continue;
    }
    if (inString) {
      if (c === stringChar) inString = false;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      inString = true;
      stringChar = c;
      continue;
    }

    if (c === '{') braceCount++;
    else if (c === '}') {
      braceCount--;
      if (braceCount === 0) {
        return fileContent.slice(startIdx, i + 1);
      }
    }
  }
  return null;
}

// Helper to extract phase metadata (practicalAssignment and quiz)
function getExistingPhaseMetadata(phaseId) {
  const phaseMarker = new RegExp(`id:\\s*${phaseId},\\s*\\n?\\s*title:`);
  const match = fileContent.search(phaseMarker);
  if (match === -1) return null;

  let start = match;
  while (start > 0 && fileContent[start] !== '{') start--;

  // Find lessons: [
  const lessonsIdx = fileContent.indexOf('lessons: [', start);
  const metaBlock = fileContent.slice(start, lessonsIdx);

  // Extract practicalAssignment and quiz
  return metaBlock;
}

// Format new lesson
function formatLesson(l) {
  const existing = getExistingLessonBlock(l.id);
  if (existing) {
    return existing;
  }

  return `      {
        id: '${l.id}',
        phaseId: ${l.phaseId},
        lessonNumber: ${l.lessonNumber},
        title: ${JSON.stringify(l.title)},
        difficulty: '${l.difficulty || 'INTERMEDIATE'}',
        estimatedTime: '${l.estimatedTime || '15 min'}',
        objectives: ${JSON.stringify(l.objectives || [
          `Master ${l.title} in real-world trading environments`,
          `Identify key risk factors and signals associated with ${l.title}`,
          `Execute structured strategies while preserving capital`
        ], null, 10)},
        videos: [],
        keyConcepts: ${JSON.stringify(l.keyConcepts || [l.title, 'On-Chain Execution', 'Risk Management', 'Solana Liquidity'], null, 10)},
        deepDive: ${JSON.stringify(l.deepDive || [
          `${l.title} is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.`,
          `When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.`,
          `Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups.`
        ], null, 10)},
        realWorldExample: ${JSON.stringify(l.realWorldExample || `An operator monitoring ${l.title} identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.`)},
        commonMistakes: ${JSON.stringify(l.commonMistakes || [
          `Entering without waiting for confirmation on ${l.title}.`,
          `Over-sizing positions and ignoring liquidity depth.`
        ], null, 10)},
        checkQuestions: [
          {
            question: ${JSON.stringify(l.question || `What is the most critical principle when analyzing ${l.title}?`)},
            options: ${JSON.stringify(l.options || [
              `Always risk 100% of your wallet`,
              `Confirm on-chain structure and manage risk strictly with defined invalidation`,
              `Trade based on unverified Telegram rumors`,
              `Ignore liquidity depth`
            ], null, 12)},
            correctIndex: ${l.correctIndex !== undefined ? l.correctIndex : 1},
            explanation: ${JSON.stringify(l.explanation || `Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability.`)}
          }
        ],
        assignment: {
          title: ${JSON.stringify(`${l.title} Practical Audit`)},
          instructions: ${JSON.stringify(`Observe 3 live Solana tokens demonstrating principles of ${l.title} and document your findings.`)},
          deliverables: ${JSON.stringify([`Written technical case study with Solscan/DexScreener links.`], null, 12)}
        }
      }`;
}

console.log('Curriculum compiler initialized.');
module.exports = {
  getExistingLessonBlock,
  getExistingPhaseMetadata,
  formatLesson
};
