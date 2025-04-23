# Setting Up the Instruments Table in Supabase

This document provides instructions for setting up the `instruments` table in your Supabase project, which is needed for the instrument saving feature in the Recording Studio tab.

## Prerequisites

1. A Supabase project set up at https://app.supabase.com
2. Admin access to your Supabase project

## Setup Steps

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the SQL Editor (in the left sidebar)
3. Create a new query
4. Copy and paste the contents of the `setup-instruments-table.sql` file into the SQL editor
5. Click "Run" to execute the SQL script

## Table Schema

The `instruments` table has the following columns:

- `id`: UUID primary key (auto-generated)
- `user_id`: Text ID of the user who created the instrument
- `name`: Name of the instrument
- `type`: Type of the instrument (guitar, bass, piano, etc.)
- `description`: Optional description of the instrument
- `created_at`: Timestamp when the instrument was created
- `updated_at`: Timestamp when the instrument was last updated

## Row Level Security (RLS) Policies

The table has the following RLS policies:

1. **Anyone can read instruments**: Allows public read access to all instruments
2. **Users can insert their own instruments**: Allows authenticated users to insert instruments with their user ID
3. **Users can update their own instruments**: Allows authenticated users to update only their own instruments
4. **Users can delete their own instruments**: Allows authenticated users to delete only their own instruments

## Testing the Setup

After setting up the table, you can test the functionality by:

1. Opening the Song Builder application
2. Navigating to the "Recording Studio" tab
3. Filling out the "Save Instrument to Database" form
4. Clicking "Save to Database"
5. Checking the instrument list to see your newly added instrument

## Troubleshooting

If you encounter any issues:

1. Check the browser console for error messages
2. Verify that your Supabase URL and anon key are correctly set in `config.js`
3. Check that the SQL script was executed successfully in the Supabase SQL Editor
4. Verify that Row Level Security is enabled and policies are correctly set up 