import esbuild from 'esbuild';

const endpoints = [
  { entry: 'api-src/resources.ts', outfile: 'api/resources.js' },
  { entry: 'api-src/licenses/[action].ts', outfile: 'api/licenses/[action].js' },
  { entry: 'api-src/licenses/list.ts', outfile: 'api/licenses/list.js' },
  { entry: 'api-src/licenses/generate.ts', outfile: 'api/licenses/generate.js' },
  { entry: 'api-src/licenses/activate.ts', outfile: 'api/licenses/activate.js' },
  { entry: 'api-src/discovery/[action].ts', outfile: 'api/discovery/[action].js' },
  { entry: 'api-src/discovery/status.ts', outfile: 'api/discovery/status.js' },
  { entry: 'api-src/discovery/resources.ts', outfile: 'api/discovery/resources.js' }
];

async function main() {
  console.log('Building and bundling serverless API endpoints from api-src to api...');
  for (const { entry, outfile } of endpoints) {
    await esbuild.build({
      entryPoints: [entry],
      outfile,
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external'
    });
    console.log(`✓ ${entry} -> ${outfile}`);
  }
  console.log('All API endpoints bundled successfully!');
}

main().catch(err => {
  console.error('API bundle error:', err);
  process.exit(1);
});
