import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../config';
import { createTestUser, cleanupTestData, waitFor } from '../utils/testUtils';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

describe('Database Operations Tests', () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'testPassword123!';
    let testUserId;

    beforeAll(async () => {
        // Create test user and get their ID
        const { data } = await createTestUser(supabase, testEmail, testPassword);
        testUserId = data.user.id;
        
        // Sign in the test user
        await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });
    });

    afterAll(async () => {
        // Clean up all test data
        await cleanupTestData(supabase, testUserId);
        await supabase.auth.signOut();
    });

    describe('User Settings', () => {
        const testSettings = {
            theme: 'dark',
            volume: 0.8,
            lastInstrument: 'guitar'
        };

        test('should save user settings', async () => {
            const { data, error } = await supabase
                .from('user_settings')
                .upsert({ user_id: testUserId, settings: testSettings });

            expect(error).toBeNull();
            expect(data).toBeDefined();
        });

        test('should retrieve user settings', async () => {
            const { data, error } = await supabase
                .from('user_settings')
                .select('settings')
                .eq('user_id', testUserId)
                .single();

            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(data.settings).toEqual(testSettings);
        });
    });

    describe('Songs', () => {
        const testSong = {
            title: 'Test Song',
            data: {
                tempo: 120,
                instruments: ['guitar', 'drums'],
                notes: ['C4', 'E4', 'G4']
            }
        };

        test('should save a new song', async () => {
            const { data, error } = await supabase
                .from('songs')
                .insert({
                    user_id: testUserId,
                    title: testSong.title,
                    data: testSong.data
                });

            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(data[0].title).toBe(testSong.title);
        });

        test('should retrieve user songs', async () => {
            const { data, error } = await supabase
                .from('songs')
                .select('*')
                .eq('user_id', testUserId);

            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(data.length).toBeGreaterThan(0);
            expect(data[0].title).toBe(testSong.title);
        });

        test('should delete a song', async () => {
            // First create a song to delete
            const { data: createdSong } = await supabase
                .from('songs')
                .insert({
                    user_id: testUserId,
                    title: 'Song to Delete',
                    data: { test: 'data' }
                })
                .select()
                .single();

            // Then delete it
            const { error } = await supabase
                .from('songs')
                .delete()
                .eq('id', createdSong.id);

            expect(error).toBeNull();

            // Verify it's deleted
            const { data: deletedSong } = await supabase
                .from('songs')
                .select()
                .eq('id', createdSong.id)
                .single();

            expect(deletedSong).toBeNull();
        });
    });
}); 