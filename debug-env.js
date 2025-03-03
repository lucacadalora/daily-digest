
// Debug script to verify environment variable detection
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');

// Check Node.js process environment
console.log('process.env.NODE_ENV:', typeof process !== 'undefined' ? process.env.NODE_ENV : 'undefined');

// Try to safely check Vite environment
try {
  console.log('import.meta.env.DEV:', typeof import.meta !== 'undefined' ? import.meta.env.DEV : 'undefined');
} catch (error) {
  console.log('Error accessing import.meta.env:', error.message);
}

// Check execution context
console.log('Is browser:', typeof window !== 'undefined');
console.log('Is Node.js:', typeof process !== 'undefined' && typeof process.versions !== 'undefined');
