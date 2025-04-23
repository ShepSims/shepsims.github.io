-- Create extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create instruments table if it doesn't exist
CREATE TABLE IF NOT EXISTS instruments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id text NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE IF EXISTS instruments ENABLE ROW LEVEL SECURITY;

-- Create policies for instruments table
-- Public read policy (allow anyone to read instruments)
CREATE POLICY "Anyone can read instruments"
  ON instruments FOR SELECT
  USING (true);

-- Insert policy (allow authenticated users to insert their own instruments)
CREATE POLICY "Users can insert their own instruments"
  ON instruments FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id = 'anonymous');

-- Update policy (allow authenticated users to update their own instruments)
CREATE POLICY "Users can update their own instruments"
  ON instruments FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Delete policy (allow authenticated users to delete their own instruments)
CREATE POLICY "Users can delete their own instruments"
  ON instruments FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create a trigger to update the updated_at field automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_instruments_updated_at ON instruments;
CREATE TRIGGER update_instruments_updated_at
BEFORE UPDATE ON instruments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 