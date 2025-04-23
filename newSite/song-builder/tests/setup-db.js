import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '../config';

// Use service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// SQL for creating the tables if they don't exist
const createTablesSQL = `
-- Create extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Create songs table if it doesn't exist
CREATE TABLE IF NOT EXISTS songs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE IF EXISTS user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS songs ENABLE ROW LEVEL SECURITY;

-- Create policies (wrapped in DO block to handle errors)
DO $$ 
BEGIN
  -- User settings policies
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_settings' AND policyname = 'Users can read their own settings'
  ) THEN
    CREATE POLICY "Users can read their own settings"
      ON user_settings FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_settings' AND policyname = 'Users can update their own settings'
  ) THEN
    CREATE POLICY "Users can update their own settings"
      ON user_settings FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_settings' AND policyname = 'Users can insert their own settings'
  ) THEN
    CREATE POLICY "Users can insert their own settings"
      ON user_settings FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  -- Songs policies
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'songs' AND policyname = 'Users can read their own songs'
  ) THEN
    CREATE POLICY "Users can read their own songs"
      ON songs FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'songs' AND policyname = 'Users can update their own songs'
  ) THEN
    CREATE POLICY "Users can update their own songs"
      ON songs FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'songs' AND policyname = 'Users can insert their own songs'
  ) THEN
    CREATE POLICY "Users can insert their own songs"
      ON songs FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'songs' AND policyname = 'Users can delete their own songs'
  ) THEN
    CREATE POLICY "Users can delete their own songs"
      ON songs FOR DELETE
      USING (auth.uid() = user_id);
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating policies: %', SQLERRM;
END $$;
`;

// Split the SQL into separate statements for better error handling
const createExtensionSQL = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

const createUserSettingsTableSQL = `
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);
`;

const createSongsTableSQL = `
CREATE TABLE IF NOT EXISTS songs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
`;

const enableRLSSQL = `
ALTER TABLE IF EXISTS user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS songs ENABLE ROW LEVEL SECURITY;
`;

async function setupDatabase() {
  try {
    console.log('Creating uuid-ossp extension...');
    const { error: extensionError } = await supabase.rpc('pgx_exec', { sql: createExtensionSQL });
    if (extensionError) {
      console.error('Error creating extension:', extensionError);
      // Continue anyway, it might already exist
    }

    console.log('Creating user_settings table...');
    const { error: userSettingsError } = await supabase.rpc('pgx_exec', { sql: createUserSettingsTableSQL });
    if (userSettingsError) {
      console.error('Error creating user_settings table:', userSettingsError);
      return { success: false, error: userSettingsError };
    }

    console.log('Creating songs table...');
    const { error: songsError } = await supabase.rpc('pgx_exec', { sql: createSongsTableSQL });
    if (songsError) {
      console.error('Error creating songs table:', songsError);
      return { success: false, error: songsError };
    }

    console.log('Enabling Row Level Security...');
    const { error: rlsError } = await supabase.rpc('pgx_exec', { sql: enableRLSSQL });
    if (rlsError) {
      console.error('Error enabling RLS:', rlsError);
      // Continue anyway
    }
    
    console.log('Database tables created successfully');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error setting up database:', err);
    return { success: false, error: err };
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupDatabase()
    .then(result => {
      if (result.success) {
        console.log('Database setup complete');
      } else {
        console.error('Database setup failed:', result.error);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Error in setup process:', err);
      process.exit(1);
    });
}

export default setupDatabase; 