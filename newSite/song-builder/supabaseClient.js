// Use Supabase from CDN instead of ES module import
// Supabase CDN exposes 'supabase' global variable

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const auth = {
    // Sign up a new user
    signUp: async (email, password) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    // Sign in an existing user
    signIn: async (email, password) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out the current user
    signOut: async () => {
        const { error } = await supabaseClient.auth.signOut();
        return { error };
    },

    // Get the current user
    getCurrentUser: async () => {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        return { user, error };
    },

    // Reset password
    resetPassword: async (email) => {
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);
        return { data, error };
    },

    // Update password
    updatePassword: async (newPassword) => {
        const { data, error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });
        return { data, error };
    }
};

const database = {
    // Save user settings
    saveUserSettings: async (userId, settings) => {
        const { data, error } = await supabaseClient
            .from('user_settings')
            .upsert({ user_id: userId, settings: settings });
        return { data, error };
    },

    // Get user settings
    getUserSettings: async (userId) => {
        const { data, error } = await supabaseClient
            .from('user_settings')
            .select('settings')
            .eq('user_id', userId)
            .single();
        return { data, error };
    },

    // Save user's song data
    saveSong: async (userId, songData) => {
        const { data, error } = await supabaseClient
            .from('songs')
            .insert({
                user_id: userId,
                title: songData.title,
                data: songData.data,
                created_at: new Date().toISOString()
            });
        return { data, error };
    },

    // Get user's songs
    getSongs: async (userId) => {
        const { data, error } = await supabaseClient
            .from('songs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Delete a song
    deleteSong: async (songId) => {
        const { data, error } = await supabaseClient
            .from('songs')
            .delete()
            .eq('id', songId);
        return { data, error };
    },
    
    // Save instrument data
    saveInstrument: async (instrumentData) => {
        // Check if a user is authenticated
        const { user } = await auth.getCurrentUser();
        if (!user) {
            return { error: new Error('Must be logged in to save instruments') };
        }
        
        const { data, error } = await supabaseClient
            .from('instruments')
            .insert({
                user_id: user.id,
                name: instrumentData.name,
                type: instrumentData.type,
                description: instrumentData.description,
                created_at: new Date().toISOString()
            });
            
        return { data, error };
    },
    
    // Get all instruments
    getInstruments: async () => {
        const { data, error } = await supabaseClient
            .from('instruments')
            .select(`
                *,
                user_profiles (
                    username,
                    email
                )
            `)
            .order('created_at', { ascending: false });
            
        return { data, error };
    },
    
    // Get instruments by user ID
    getUserInstruments: async (userId) => {
        const { data, error } = await supabaseClient
            .from('instruments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
        return { data, error };
    },
    
    // Delete an instrument
    deleteInstrument: async (instrumentId) => {
        const { data, error } = await supabaseClient
            .from('instruments')
            .delete()
            .eq('id', instrumentId);
            
        return { data, error };
    }
};

// Export not needed as we're using global variables 