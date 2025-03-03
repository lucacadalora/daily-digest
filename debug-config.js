
// Debug script to examine the environment and configuration
import fs from 'fs';
import path from 'path';

console.log('=== DEBUG ENVIRONMENT ===');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

console.log('\n=== CONFIG FILES ===');
const configFiles = ['next.config.js', 'next.config.cjs', '.env', '.env.local'];
for (const file of configFiles) {
  try {
    const exists = fs.existsSync(file);
    console.log(`${file}: ${exists ? 'EXISTS' : 'MISSING'}`);
    if (exists && (file === 'next.config.js' || file === 'next.config.cjs')) {
      const content = fs.readFileSync(file, 'utf-8');
      console.log(`${file} content:\n${content}`);
    }
  } catch (err) {
    console.error(`Error checking ${file}:`, err);
  }
}

console.log('\n=== PACKAGE.JSON ===');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  console.log('Type:', packageJson.type);
  console.log('Dependencies:', Object.keys(packageJson.dependencies).join(', '));
} catch (err) {
  console.error('Error reading package.json:', err);
}
