
// Debug environment variables and settings
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

try {
  console.log('Is browser:', typeof window !== 'undefined');
  console.log('Is Node.js:', typeof process !== 'undefined' && !!process.versions && !!process.versions.node);
} catch (e) {
  console.error('Error checking environment:', e);
}

// Log any detected environment info
if (typeof window !== 'undefined') {
  try {
    console.log('Window location:', window.location.href);
    console.log('Hostname:', window.location.hostname);
    console.log('Port:', window.location.port);
  } catch (e) {
    console.error('Error checking window location:', e);
  }
}
