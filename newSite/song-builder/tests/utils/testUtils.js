// Test utilities for Supabase testing
export const createTestUser = async (supabase, email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { data, error };
};

export const deleteTestUser = async (supabase, email) => {
    // Note: This requires admin privileges in Supabase
    const { data, error } = await supabase.auth.admin.deleteUser(email);
    return { data, error };
};

export const cleanupTestData = async (supabase, userId) => {
    // Delete all test data for a user
    const { error: settingsError } = await supabase
        .from('user_settings')
        .delete()
        .eq('user_id', userId);

    const { error: songsError } = await supabase
        .from('songs')
        .delete()
        .eq('user_id', userId);

    return { settingsError, songsError };
};

export const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 