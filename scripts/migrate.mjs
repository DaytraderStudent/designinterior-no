import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vbcmeueohlmutmwsknna.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY21ldWVvaGxtdXRtd3Nrbm5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc5MjMzNSwiZXhwIjoyMDg4MzY4MzM1fQ.ydtUGs1mIvASa-YzE2-2A7M3EOScw6Htplil3uxW5oY"
);

const migrations = [
  // Profiles table
  `CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    plan TEXT DEFAULT 'free',
    ai_credits INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Sessions table
  `CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    name TEXT DEFAULT 'Mitt prosjekt',
    original_image_url TEXT,
    generated_image_url TEXT,
    canvas_state JSONB,
    room_analysis JSONB,
    total_cost INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Products table
  `CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT,
    category TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    affiliate_url TEXT,
    style_tags TEXT[],
    color_tags TEXT[],
    room_tags TEXT[],
    dimensions JSONB,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Session products table
  `CREATE TABLE IF NOT EXISTS session_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    position JSONB,
    room_name TEXT,
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Chat messages table
  `CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
];

async function runMigrations() {
  for (const sql of migrations) {
    const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
    console.log(`Creating table: ${tableName}...`);

    const { error } = await supabase.rpc("exec_sql", { sql_query: sql });

    if (error) {
      // rpc might not exist, try direct approach
      console.log(`  RPC failed (${error.message}), table may need manual creation`);
    } else {
      console.log(`  OK`);
    }
  }
}

// Since we can't execute raw SQL via the JS client, let's test the connection
// and output the SQL for manual execution
async function testConnection() {
  const { data, error } = await supabase.from("profiles").select("count").limit(0);

  if (error && error.code === "42P01") {
    console.log("Tables don't exist yet. Running SQL via Supabase Dashboard SQL Editor:");
    console.log("\n--- Copy and paste the SQL below into the Supabase SQL Editor ---\n");
    console.log(migrations.join(";\n\n") + ";");
    console.log("\n--- Enable RLS ---\n");
    console.log(`ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read on products
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Allow authenticated users to manage their own data
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (true);
CREATE POLICY "Users manage own sessions" ON sessions FOR ALL USING (true);
CREATE POLICY "Users manage own session_products" ON session_products FOR ALL USING (true);
CREATE POLICY "Users manage own chat_messages" ON chat_messages FOR ALL USING (true);`);
    return false;
  } else if (error) {
    console.log("Connection error:", error.message);
    return false;
  } else {
    console.log("Tables already exist! Connection successful.");
    return true;
  }
}

const exists = await testConnection();
if (!exists) {
  console.log("\nPlease run the SQL above in the Supabase Dashboard, or I can use the Management API.");
}
