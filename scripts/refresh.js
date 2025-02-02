const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function log(message) {
  console.log(`\x1b[36m[Refresh]\x1b[0m ${message}`);
}

function clearDirectory(dir) {
  if (fs.existsSync(dir)) {
    log(`Clearing ${dir}...`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

try {
  // Print initial status
  log('Starting environment refresh...');
  log(`Time: ${new Date().toISOString()}`);

  // Clear build artifacts
  log('Clearing build artifacts...');
  clearDirectory(path.join(__dirname, '..', 'dist'));
  clearDirectory(path.join(__dirname, '..', 'build'));
  clearDirectory(path.join(__dirname, '..', '.next'));

  // Clear ALL cache directories
  log('Clearing cache directories...');
  clearDirectory(path.join(__dirname, '..', 'node_modules', '.cache'));
  clearDirectory(path.join(__dirname, '..', '.cache'));
  clearDirectory(path.join(__dirname, '..', '.vite'));
  clearDirectory(path.join(__dirname, '..', '.parcel-cache'));

  // Clear TypeScript cache
  clearDirectory(path.join(__dirname, '..', 'node_modules', '.typescript'));
  clearDirectory(path.join(__dirname, '..', 'node_modules', '.tsbuildinfo'));

  // Clear package manager cache
  log('Clearing package manager cache...');
  execSync('npm cache clean --force');
  execSync('npm cache verify');

  // Remove node_modules
  log('Removing node_modules...');
  clearDirectory(path.join(__dirname, '..', 'node_modules'));

  // Print environment information
  log('Environment Information:');
  log(`Node Version: ${process.version}`);
  log(`PWD: ${process.cwd()}`);
  log(`Platform: ${process.platform}`);
  log(`Memory Usage: ${JSON.stringify(process.memoryUsage())}`);

  // Check for environment variables
  log('Checking environment variables...');
  const requiredEnvVars = ['NODE_ENV'];
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingEnvVars.length > 0) {
    log(`Warning: Missing environment variables: ${missingEnvVars.join(', ')}`);
  }

  // Clean install dependencies
  log('Reinstalling dependencies...');
  execSync('npm ci || npm install', { stdio: 'inherit' });

  // Rebuild the project
  log('Rebuilding project...');
  execSync('npm run build', { stdio: 'inherit' });

  log('Refresh completed successfully!');
  log('Restarting development server...');

  // Force reload by exiting - the workflow will restart automatically
  process.exit(0);
} catch (error) {
  console.error('\x1b[31m[Refresh Error]\x1b[0m', error);
  process.exit(1);
}