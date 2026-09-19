import esbuild from 'esbuild';

const endpoints = [
  { entry: 'api-src/resources.ts', outfile: 'api/resources.js' },
  { entry: 'api-src/licenses.ts', outfile: 'api/licenses.js' },
  { entry: 'api-src/discovery.ts', outfile: 'api/discovery.js' }
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
