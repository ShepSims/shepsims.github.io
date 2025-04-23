// Increase timeout for all tests
jest.setTimeout(30000);

// Import the database setup function conditionally
// Skip for simple connection tests
const setupDatabase = process.env.SKIP_DB_SETUP 
  ? null 
  : require('./setup-db').default;

// Log test messages with timestamps
const originalLog = console.log;
console.log = (...args) => {
    originalLog(`[${new Date().toISOString()}]`, ...args);
};

// Mock console.error to make it more visible in test output
const originalError = console.error;
console.error = (...args) => {
    originalError(`[ERROR ${new Date().toISOString()}]`, ...args);
};

// Set up the database before all tests
beforeAll(async () => {
    // Skip database setup for simple connection tests
    if (!setupDatabase) {
        console.log('Skipping database setup');
        return;
    }
    
    console.log('Setting up test database...');
    const result = await setupDatabase();
    if (!result.success) {
        console.error('Failed to set up database:', result.error);
        // We'll continue anyway, as the tests will fail appropriately
    } else {
        console.log('Database setup complete');
    }
});

// Add any global cleanup that needs to happen after tests
afterAll(() => {
    console.log('Test suite complete');
}); 