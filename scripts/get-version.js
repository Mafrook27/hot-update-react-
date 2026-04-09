import { execSync } from 'child_process';
import { readFileSync } from 'fs';

try {
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
  const version = packageJson.version;
  let gitCommitCount = '0';
  let gitCommitHash = '0000000';

  try {
    gitCommitCount = execSync('git rev-list --count HEAD').toString().trim();
    gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {}

  const appVersion = `${version}-${gitCommitCount}-${gitCommitHash}`;
  process.stdout.write(appVersion);
} catch (error) {
  process.exit(1);
}
