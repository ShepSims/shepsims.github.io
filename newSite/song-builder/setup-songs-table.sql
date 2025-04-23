-- Create extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create songs table if it doesn't exist
CREATE TABLE IF NOT EXISTS songs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id text NOT NULL,
  title text NOT NULL,
  data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE IF EXISTS songs ENABLE ROW LEVEL SECURITY;

-- Create policies for songs table
-- Public read policy (songs are private, so no public read)
CREATE POLICY "Users can only read their own songs"
  ON songs FOR SELECT
  USING (auth.uid()::text = user_id);

-- Insert policy (allow authenticated users to insert their own songs)
CREATE POLICY "Users can insert their own songs"
  ON songs FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Update policy (allow authenticated users to update their own songs)
CREATE POLICY "Users can update their own songs"
  ON songs FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Delete policy (allow authenticated users to delete their own songs)
CREATE POLICY "Users can delete their own songs"
  ON songs FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create a trigger to update the updated_at field automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_songs_updated_at ON songs;
CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON songs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 