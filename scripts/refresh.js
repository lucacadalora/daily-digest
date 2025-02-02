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
  // Clear build artifacts
  log('Clearing build artifacts...');
  clearDirectory(path.join(__dirname, '..', 'dist'));
  clearDirectory(path.join(__dirname, '..', 'build'));
  clearDirectory(path.join(__dirname, '..', '.next'));

  // Clear cache directories
  log('Clearing cache directories...');
  clearDirectory(path.join(__dirname, '..', 'node_modules', '.cache'));
  clearDirectory(path.join(__dirname, '..', '.cache'));
  clearDirectory(path.join(__dirname, '..', '.vite'));
  clearDirectory(path.join(__dirname, '..', '.parcel-cache'));

  // Clear npm cache for this project
  log('Clearing npm cache...');
  execSync('npm cache clean --force');

  // Remove node_modules
  log('Removing node_modules...');
  clearDirectory(path.join(__dirname, '..', 'node_modules'));

  // Print environment information
  log('Environment Information:');
  log(`Node Version: ${process.version}`);
  log(`PWD: ${process.cwd()}`);
  log(`Platform: ${process.platform}`);

  // Check for environment variables
  log('Checking environment variables...');
  const requiredEnvVars = ['NODE_ENV'];
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingEnvVars.length > 0) {
    log(`Warning: Missing environment variables: ${missingEnvVars.join(', ')}`);
  }

  // Reinstall dependencies
  log('Reinstalling dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Rebuild the project
  log('Rebuilding project...');
  execSync('npm run build', { stdio: 'inherit' });

  log('Refresh completed successfully!');
  log('Restarting development server...');

  // The development server will be automatically restarted by the workflow
  process.exit(0);
} catch (error) {
  console.error('\x1b[31m[Refresh Error]\x1b[0m', error);
  process.exit(1);
}