import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a postgres connection with retries
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 10, // Max pool size
  idle_timeout: 20, // Idle connection timeout in seconds
  connect_timeout: 10, // Connection timeout in seconds
});

// Test the connection
const testConnection = async () => {
  try {
    await queryClient`SELECT 1`;
    console.log('Database connection successful');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
};

testConnection();

export const db = drizzle(queryClient, { schema });
