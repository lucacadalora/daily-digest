import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a postgres connection with more lenient connection settings for Replit environment
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 5, // Smaller connection pool size to avoid overwhelming the database
  idle_timeout: 30, // How long a connection can stay idle in pool (seconds)
  connect_timeout: 30, // Increased connection timeout for slower networks (seconds)
  max_lifetime: 60 * 30, // Connection lifetime in seconds (30 minutes)
  onnotice: (notice) => {
    console.log("Database notice:", notice);
  },
  types: {
    // Fix for array types which can cause issues in some environments
    array: {
      to: 1009,
      from: [1009, 1015, 1000],
      serialize: (array: any[]) => array,
      parse: (value: any) => value
    }
  }
});

// Initialize db connection
export const db = drizzle(queryClient, { schema });

// Verify database connection with retries for better resilience
export const verifyDbConnection = async (retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Simple query to verify connection
      const result = await queryClient`SELECT 1 as connected`;
      const isConnected = result?.[0]?.connected === 1;
      
      console.log(`✅ Database connection verified on attempt ${attempt}: ${isConnected}`);
      
      // Let's check for database tables too to verify schema
      const tablesResult = await queryClient`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name IN ('subscribers', 'users')
      `;
      
      const tables = tablesResult.map(row => row.table_name);
      console.log(`✅ Found database tables: ${tables.join(', ')}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Database connection error on attempt ${attempt}/${retries}:`, error);
      
      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        // Increase delay for next retry (exponential backoff)
        delay *= 2;
      } else {
        console.error("❌ All database connection attempts failed");
        return false;
      }
    }
  }
  
  return false;
};
