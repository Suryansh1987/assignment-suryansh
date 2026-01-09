import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Run database migrations
 */
async function runMigrations() {
  const connectionString = process.env.DATABASE_URL!;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  console.log('⏳ Running migrations...');

  await migrate(db, { migrationsFolder: './src/db/migrations' });

  console.log('✅ Migrations completed successfully');

  await client.end();
}

runMigrations().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
