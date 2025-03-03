
const { spawn } = require('child_process');

// Start Next.js development server
const nextDev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

console.log('Next.js development server started');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  nextDev.kill('SIGINT');
  process.exit(0);
});
