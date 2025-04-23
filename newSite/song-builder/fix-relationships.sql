-- First, create missing user profiles for existing users
INSERT INTO user_profiles (user_id, email)
SELECT DISTINCT i.user_id, au.email
FROM instruments i
LEFT JOIN user_profiles up ON i.user_id = up.user_id
JOIN auth.users au ON i.user_id = au.id
WHERE up.user_id IS NULL
AND i.user_id IS NOT NULL;

-- Also create profiles for users from songs table
INSERT INTO user_profiles (user_id, email)
SELECT DISTINCT s.user_id, au.email
FROM songs s
LEFT JOIN user_profiles up ON s.user_id = up.user_id
JOIN auth.users au ON s.user_id = au.id
WHERE up.user_id IS NULL
AND s.user_id IS NOT NULL;

-- Now we can safely add the foreign key constraints
ALTER TABLE IF EXISTS instruments 
    DROP CONSTRAINT IF EXISTS instruments_user_id_fkey;

ALTER TABLE IF EXISTS songs 
    DROP CONSTRAINT IF EXISTS songs_user_id_fkey;

-- Add foreign key constraint from instruments to user_profiles
ALTER TABLE instruments
    ADD CONSTRAINT instruments_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES user_profiles(user_id)
    ON DELETE CASCADE;

-- Add foreign key constraint from songs to user_profiles
ALTER TABLE songs
    ADD CONSTRAINT songs_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES user_profiles(user_id)
    ON DELETE CASCADE;

-- Verify the relationships were created
SELECT
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'; 