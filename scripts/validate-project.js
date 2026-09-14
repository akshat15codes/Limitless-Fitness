'use strict';

const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const javascriptFiles = [
  'server.js',
  'auth-client.js',
  'cursor.js',
  'script.js',
  'theme-init.js',
  'js/ai-coach.js',
  'js/animations.js',
  'js/auth.js',
  'js/diet-planner.js',
  'js/index.js',
  'js/workspace.js',
  'public/chatbot.js',
  'public/voice.js',
  'backend/config/db.js',
  'backend/utils/email.js',
  'backend/utils/logger.js',
  'scripts/validate-project.js',
];

const moduleFiles = new Set([
  'public/chatbot.js',
  'public/voice.js',
]);

let failed = false;

for (const file of javascriptFiles) {
  const isModule = moduleFiles.has(file);
  const result = spawnSync(
    process.execPath,
    isModule ? ['--input-type=module', '--check'] : ['--check', file],
    {
      cwd: projectRoot,
      encoding: 'utf8',
      input: isModule ? fs.readFileSync(path.join(projectRoot, file), 'utf8') : undefined,
    }
  );

  if (result.status === 0) {
    console.log(`PASS ${file}`);
  } else {
    failed = true;
    console.error(`FAIL ${file}`);
    if (result.stderr) console.error(result.stderr.trim());
  }
}

if (failed) process.exit(1);
console.log(`Checked ${javascriptFiles.length} JavaScript files successfully.`);
