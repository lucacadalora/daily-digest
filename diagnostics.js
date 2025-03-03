
// Diagnostics script to check our environment after fixes
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

console.log('=== ENVIRONMENT CHECK ===');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL || 'Not set');

console.log('\n=== CONFIG FILES ===');
['next.config.js', 'next.config.cjs'].forEach(file => {
  console.log(`${file}: ${fs.existsSync(file) ? 'EXISTS' : 'MISSING'}`);
  if (fs.existsSync(file)) {
    console.log(`Content of ${file}:`);
    console.log(fs.readFileSync(file, 'utf-8'));
  }
});

// Check sample URL used in OG image generation
console.log('\n=== IMAGE URL GENERATION TEST ===');
const testTitle = "China's Steel Sector: Supply Reform 2.0";
const testDesc = "Beijing tackles carbon emissions and overcapacity";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
const testImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(testTitle)}&description=${encodeURIComponent(testDesc)}`;
console.log('Generated OG image URL:', testImageUrl);
