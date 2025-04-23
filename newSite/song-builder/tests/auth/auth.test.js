import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../config';
import { createTestUser, deleteTestUser, waitFor } from '../utils/testUtils';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

describe('Authentication Tests', () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'testPassword123!';

    afterAll(async () => {
        // Cleanup test user
        await deleteTestUser(supabase, testEmail);
    });

    test('should successfully sign up a new user', async () => {
        const { data, error } = await createTestUser(supabase, testEmail, testPassword);
        expect(error).toBeNull();
        expect(data.user).toBeDefined();
        expect(data.user.email).toBe(testEmail);
    });

    test('should successfully sign in with correct credentials', async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });
        expect(error).toBeNull();
        expect(data.user).toBeDefined();
        expect(data.user.email).toBe(testEmail);
    });

    test('should fail to sign in with incorrect password', async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: 'wrongPassword',
        });
        expect(error).toBeDefined();
        expect(data.user).toBeNull();
    });

    test('should successfully sign out', async () => {
        // First sign in
        await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });

        // Then sign out
        const { error } = await supabase.auth.signOut();
        expect(error).toBeNull();

        // Verify session is cleared
        const { data: { session } } = await supabase.auth.getSession();
        expect(session).toBeNull();
    });

    test('should get current user when authenticated', async () => {
        // Sign in first
        await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });

        const { data: { user }, error } = await supabase.auth.getUser();
        expect(error).toBeNull();
        expect(user).toBeDefined();
        expect(user.email).toBe(testEmail);

        // Clean up by signing out
        await supabase.auth.signOut();
    });

    test('should handle password reset flow', async () => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(testEmail);
        expect(error).toBeNull();
        expect(data).toBeDefined();
    });
}); 