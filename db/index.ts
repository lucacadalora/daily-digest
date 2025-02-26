import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@db/schema";

// Handle missing DATABASE_URL more gracefully
let isDatabaseAvailable = false;
let queryClient: any = null;
let dbInstance: any = null;

// Create a dummy client for when no database is available
const dummyClient = {
  query: async () => {
    throw new Error("Database not available. DATABASE_URL is not set.");
  }
};

// Initialize database connection if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL is not set. Features requiring database will not work.");
  console.warn("  - Use create_postgresql_database_tool to create a database");
  console.warn("  - Or, provide DATABASE_URL in your environment variables");
} else {
  try {
    isDatabaseAvailable = true;
    // Create a postgres connection with more lenient connection settings for Replit environment
    queryClient = postgres(process.env.DATABASE_URL, {
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
    
    // Initialize db connection only if database URL is available
    dbInstance = drizzle(queryClient, { schema });
    console.log("✅ Database client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize database client:", error);
    isDatabaseAvailable = false;
  }
}

// Export the db object conditionally
export const db = isDatabaseAvailable && dbInstance ? dbInstance : dummyClient;

// Verify database connection with retries for better resilience
export const verifyDbConnection = async (retries = 3, delay = 1000) => {
  if (!isDatabaseAvailable || !queryClient) {
    console.warn("⚠️ Cannot verify database connection: DATABASE_URL is not set");
    return false;
  }
  
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
      
      const tables = tablesResult.map((row: any) => row.table_name);
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
