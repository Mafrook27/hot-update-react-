import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import path from 'path';

try {
  const appVersion = execSync('node ./scripts/get-version.js').toString().trim();
  const signature = JSON.stringify({ version: appVersion });

  const publicDir = path.join(process.cwd(), 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  writeFileSync(path.join(publicDir, 'signature.json'), signature);
  console.log(`Version synced: ${appVersion}`);

  // Touch vite.config.ts to force Vite to reload the new version in dev mode
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  if (existsSync(viteConfigPath)) {
    const configContent = readFileSync(viteConfigPath, 'utf8');
    writeFileSync(viteConfigPath, configContent);
  }
} catch (error) {
  console.error('Error syncing version:', error);
  process.exit(1);
}
