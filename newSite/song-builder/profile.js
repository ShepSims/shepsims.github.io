// Wait for DOM and Supabase to be ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check if user is authenticated
        const { user, error } = await auth.getCurrentUser();
        
        if (error || !user) {
            window.location.href = 'index.html';
            return;
        }

        // Initialize auth controller with skipAuthButton=true to prevent duplicate buttons
        const authController = new AuthController({ skipAuthButton: true });
        await authController.init();

        // Load user profile data
        await loadProfileData(user);
        
        // Set up event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing profile:', error);
        showError('Failed to initialize profile. Please try again later.');
    }
});

async function loadProfileData(user) {
    try {
        // Fetch user profile data
        const { data: profile, error: profileError } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (profileError) throw profileError;

        // Update basic user info
        document.getElementById('profile-username').textContent = profile.username || user.email.split('@')[0];
        document.getElementById('profile-email').textContent = profile.email || user.email;
        document.getElementById('profile-created').textContent = new Date(profile.created_at).toLocaleDateString();

        // Get user's songs count
        const { count: songsCount, error: songsError } = await supabaseClient
            .from('songs')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (songsError) throw songsError;
        document.getElementById('profile-songs-count').textContent = songsCount || 0;

        // Get user's instruments count
        const { count: instrumentsCount, error: instrumentsError } = await supabaseClient
            .from('instruments')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (instrumentsError) throw instrumentsError;
        document.getElementById('profile-instruments-count').textContent = instrumentsCount || 0;

    } catch (error) {
        console.error('Error loading profile data:', error);
        showError('Failed to load profile data. Please try again later.');
    }
}

async function updateProfile(updates) {
    try {
        const { user, error: userError } = await auth.getCurrentUser();
        if (userError || !user) throw new Error('Not authenticated');

        const { data, error } = await supabaseClient
            .from('user_profiles')
            .update(updates)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

function setupEventListeners() {
    // Edit Profile button
    document.getElementById('edit-profile').addEventListener('click', async () => {
        const username = prompt('Enter new username:');
        if (username) {
            try {
                await updateProfile({ username });
                const { user } = await auth.getCurrentUser();
                await loadProfileData(user);
                showMessage('Profile updated successfully!');
            } catch (error) {
                showError('Failed to update profile. Please try again.');
            }
        }
    });

    // Change Password button
    document.getElementById('change-password').addEventListener('click', async () => {
        const newPassword = prompt('Enter new password:');
        if (newPassword) {
            try {
                const { error } = await auth.updatePassword(newPassword);
                if (error) throw error;
                showMessage('Password updated successfully!');
            } catch (error) {
                console.error('Error updating password:', error);
                showError('Failed to update password. Please try again.');
            }
        }
    });

    // Logout button
    document.getElementById('logout').addEventListener('click', async () => {
        try {
            const { error } = await auth.signOut();
            if (error) throw error;
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error logging out:', error);
            showError('Failed to logout. Please try again.');
        }
    });
}

function showError(message) {
    alert(message);
}

function showMessage(message) {
    alert(message);
} 