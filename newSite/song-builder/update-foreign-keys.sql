-- First, drop all policies that reference user_id
DROP POLICY IF EXISTS "Users can insert their own instruments" ON instruments;
DROP POLICY IF EXISTS "Users can update their own instruments" ON instruments;
DROP POLICY IF EXISTS "Users can delete their own instruments" ON instruments;
DROP POLICY IF EXISTS "Anyone can read instruments" ON instruments;

DROP POLICY IF EXISTS "Users can only read their own songs" ON songs;
DROP POLICY IF EXISTS "Users can insert their own songs" ON songs;
DROP POLICY IF EXISTS "Users can update their own songs" ON songs;
DROP POLICY IF EXISTS "Users can delete their own songs" ON songs;

-- Now modify the instruments table to use UUID for user_id
ALTER TABLE instruments 
    ALTER COLUMN user_id TYPE uuid USING 
        CASE 
            WHEN user_id = 'anonymous' THEN NULL 
            ELSE user_id::uuid 
        END;

-- Add foreign key constraint to instruments table
ALTER TABLE instruments
    ADD CONSTRAINT fk_user_profile
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Modify the songs table to use UUID for user_id
ALTER TABLE songs
    ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Add foreign key constraint to songs table
ALTER TABLE songs
    ADD CONSTRAINT fk_user_profile
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Recreate the instruments table policies with UUID comparison
CREATE POLICY "Anyone can read instruments"
    ON instruments FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own instruments"
    ON instruments FOR INSERT
    WITH CHECK (auth.uid()::uuid = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own instruments"
    ON instruments FOR UPDATE
    USING (auth.uid()::uuid = user_id);

CREATE POLICY "Users can delete their own instruments"
    ON instruments FOR DELETE
    USING (auth.uid()::uuid = user_id);

-- Recreate the songs table policies with UUID comparison
CREATE POLICY "Users can only read their own songs"
    ON songs FOR SELECT
    USING (auth.uid()::uuid = user_id);

CREATE POLICY "Users can insert their own songs"
    ON songs FOR INSERT
    WITH CHECK (auth.uid()::uuid = user_id);

CREATE POLICY "Users can update their own songs"
    ON songs FOR UPDATE
    USING (auth.uid()::uuid = user_id);

CREATE POLICY "Users can delete their own songs"
    ON songs FOR DELETE
    USING (auth.uid()::uuid = user_id); 