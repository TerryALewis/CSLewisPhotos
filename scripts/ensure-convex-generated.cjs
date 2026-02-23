#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const generatedDir = path.join(process.cwd(), 'convex', '_generated');

if (existsSync(generatedDir)) {
  console.log('convex/_generated already exists — skipping generation.');
  process.exit(0);
}

const hasConvexEnv = !!(process.env.CONVEX_URL || process.env.CONVEX_DEPLOYMENT);

if (!hasConvexEnv) {
  console.warn('convex/_generated is missing and no Convex env variables found (CONVEX_URL or CONVEX_DEPLOYMENT).');
  console.warn('Skipping convex generation. If the build still needs convex/_generated, set CONVEX_URL or commit convex/_generated to the repo.');
  process.exit(0);
}

console.log('Attempting to run `npx convex build` to generate convex/_generated...');

const res = spawnSync('npx', ['convex', 'build'], { stdio: 'inherit' });

if (res.error) {
  console.error('Failed to run `npx convex build`:', res.error);
  process.exit(1);
}

if (res.status !== 0) {
  console.error('`npx convex build` exited with code', res.status);
  process.exit(res.status);
}

console.log('convex/_generated generated successfully.');
process.exit(0);
