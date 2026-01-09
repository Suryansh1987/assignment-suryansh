import { config } from './config/env';
import { testConnection } from './config/database';
import { createServer } from './server';

/**
 * Start the server
 */
async function start() {
  try {
    // Test database connection
    console.log('🔌 Connecting to database...');
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Exiting...');
      process.exit(1);
    }

    // Create Express app
    const app = createServer();

    // Start server
    const port = config.port;
    app.listen(port, () => {
      console.log(`\n🚀 AgriSense AI Backend running on port ${port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🌐 API available at http://localhost:${port}/api`);
      console.log(`❤️  Health check at http://localhost:${port}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
start();
