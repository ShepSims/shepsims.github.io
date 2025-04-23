// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class SongStorage {
    constructor() {
        this.userId = null;
        this.initializeAuth();
    }

    async initializeAuth() {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.userId = session.user.id;
        }

        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                this.userId = session.user.id;
            } else if (event === 'SIGNED_OUT') {
                this.userId = null;
            }
        });
    }

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    }

    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) throw error;
        return data;
    }

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    async saveSong(songData) {
        if (!this.userId) {
            throw new Error('User must be signed in to save songs');
        }

        const { data, error } = await supabase
            .from('songs')
            .insert([
                {
                    user_id: this.userId,
                    name: songData.name,
                    data: songData.data,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) throw error;
        return data[0];
    }

    async getSongs() {
        if (!this.userId) {
            throw new Error('User must be signed in to get songs');
        }

        const { data, error } = await supabase
            .from('songs')
            .select('*')
            .eq('user_id', this.userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async deleteSong(songId) {
        if (!this.userId) {
            throw new Error('User must be signed in to delete songs');
        }

        const { error } = await supabase
            .from('songs')
            .delete()
            .eq('id', songId)
            .eq('user_id', this.userId);

        if (error) throw error;
    }
}

// Create a global instance
window.songStorage = new SongStorage(); 