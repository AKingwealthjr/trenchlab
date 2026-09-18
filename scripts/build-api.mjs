import esbuild from 'esbuild';

const endpoints = [
  'api/resources.ts',
  'api/licenses/[action].ts',
  'api/licenses/list.ts',
  'api/licenses/generate.ts',
  'api/licenses/activate.ts',
  'api/discovery/[action].ts',
  'api/discovery/status.ts',
  'api/discovery/resources.ts'
];

async function main() {
  console.log('Building and bundling serverless API endpoints...');
  for (const entry of endpoints) {
    const outfile = entry.replace(/\.ts$/, '.js');
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
