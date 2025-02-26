import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a postgres connection with enhanced error handling and connection pooling
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 10, // Connection pool size
  idle_timeout: 20, // How long a connection can stay idle in pool
  connect_timeout: 10, // Connection timeout
  onnotice: (notice) => {
    console.log("Database notice:", notice);
  },
});

// Initialize db connection
export const db = drizzle(queryClient, { schema });

// Verify database connection
export const verifyDbConnection = async () => {
  try {
    // Simple query to verify connection
    const result = await queryClient`SELECT 1 as connected`;
    console.log("Database connection verified:", result[0].connected === 1);
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};
