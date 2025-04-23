# Setting up Songs Table in Supabase

This document provides instructions for setting up the songs table in your Supabase project to enable cloud storage of songs created in the Song Builder application.

## Prerequisites

1. A Supabase project (same one used for instruments)
2. Admin access to your Supabase project
3. SQL Editor access in your Supabase dashboard

## Setup Instructions

1. Go to your Supabase project dashboard: https://app.supabase.com/
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query" to create a new SQL query
4. Copy the entire contents of the `setup-songs-table.sql` file into the SQL editor
5. Run the SQL query by clicking the "Run" button

## Table Structure

The songs table has the following structure:

- `id`: UUID - Primary key for the songs
- `user_id`: Text - ID of the user who created the song
- `title`: Text - Title/name of the song
- `data`: JSONB - JSON data containing the full song definition
- `created_at`: Timestamp - When the song was first created
- `updated_at`: Timestamp - When the song was last updated

## Row Level Security (RLS)

The table is configured with Row Level Security to ensure:

1. Users can only read their own songs
2. Users can only insert songs linked to their own user_id
3. Users can only update their own songs
4. Users can only delete their own songs

## Using the Table

The Song Builder application uses this table to:

1. Save songs created by users to the cloud
2. Load user's songs from the cloud
3. Delete songs that the user no longer wants to keep

This allows songs to be accessible across different devices and provides a backup beyond local storage. 