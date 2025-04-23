// Song Database Handler
// This file integrates the Song Builder with Supabase for cloud storage of songs

class SongDatabaseHandler {
    constructor() {
        // UI Elements
        this.saveButton = document.getElementById('saveSound');
        this.loadButton = document.getElementById('loadSound');
        this.deleteButton = document.getElementById('deleteSound');
        this.soundSelect = document.getElementById('soundSelect');
        
        // Reference to the main BeatMaker instance
        this.beatMaker = null;
        
        // Song storage - we'll merge local and cloud songs
        this.localSongs = [];
        this.cloudSongs = [];
        this.allSongs = [];
        
        // Authentication state
        this.isAuthenticated = false;
        this.currentUser = null;
        
        this.init();
    }
    
    init() {
        // Find the BeatMaker instance
        if (window.beatMaker) {
            this.beatMaker = window.beatMaker;
            
            // Load songs on initialization
            this.loadLocalSongs();
            this.checkAuthAndLoadCloudSongs();
            
            // Override the BeatMaker's song storage functions
            this.overrideBeatMakerFunctions();
        } else {
            console.error('BeatMaker instance not found.');
        }
    }
    
    // Check if user is authenticated and load their cloud songs
    async checkAuthAndLoadCloudSongs() {
        try {
            const { user, error } = await auth.getCurrentUser();
            
            if (user) {
                this.isAuthenticated = true;
                this.currentUser = user;
                this.loadCloudSongs();
            } else {
                this.isAuthenticated = false;
                this.currentUser = null;
                console.log('User not authenticated. Only local songs will be available.');
            }
        } catch (err) {
            console.error('Error checking authentication:', err);
        }
    }
    
    // Load songs from localStorage
    loadLocalSongs() {
        try {
            const savedSongs = localStorage.getItem('savedSongs');
            if (savedSongs) {
                this.localSongs = JSON.parse(savedSongs);
            } else {
                this.localSongs = [];
            }
            this.updateSongsList();
        } catch (err) {
            console.error('Error loading local songs:', err);
            this.localSongs = [];
        }
    }
    
    // Load songs from Supabase
    async loadCloudSongs() {
        if (!this.currentUser) return;
        
        try {
            const { data, error } = await database.getSongs(this.currentUser.id);
            
            if (error) {
                console.error('Error loading songs from database:', error);
                return;
            }
            
            if (data && data.length > 0) {
                // Transform the data to match the expected format
                this.cloudSongs = data.map(song => {
                    return {
                        ...song.data,
                        name: song.title,
                        id: song.id,
                        isCloud: true,
                        date: song.created_at
                    };
                });
                
                this.updateSongsList();
            }
        } catch (err) {
            console.error('Error loading cloud songs:', err);
        }
    }
    
    // Merge local and cloud songs and update the dropdown
    updateSongsList() {
        // Combine local and cloud songs
        this.allSongs = [
            ...this.localSongs.map(song => ({ ...song, isCloud: false })),
            ...this.cloudSongs
        ];
        
        // Update the dropdown
        this.updateSongDropdown();
    }
    
    // Update the song selection dropdown
    updateSongDropdown() {
        this.soundSelect.innerHTML = '';
        
        if (this.allSongs.length > 0) {
            this.allSongs.forEach(song => {
                const option = document.createElement('option');
                option.value = song.name;
                
                // Format date for display
                let dateStr = '';
                try {
                    const date = new Date(song.date);
                    dateStr = date.toLocaleDateString();
                } catch (e) {
                    dateStr = 'Unknown date';
                }
                
                // Indicate if song is in cloud
                const storageIcon = song.isCloud ? '☁️' : '💾';
                option.textContent = `${storageIcon} ${song.name} (${dateStr})`;
                option.dataset.isCloud = song.isCloud;
                if (song.id) {
                    option.dataset.id = song.id;
                }
                
                this.soundSelect.appendChild(option);
            });
        } else {
            // Add a placeholder option if no songs are saved
            const option = document.createElement('option');
            option.value = '';
            option.textContent = '-- No saved songs --';
            option.disabled = true;
            this.soundSelect.appendChild(option);
        }
    }
    
    // Save song locally and to the cloud if authenticated
    async saveSong(name, songData) {
        // Always save locally
        this.saveLocalSong(name, songData);
        
        // If authenticated, also save to the cloud
        if (this.isAuthenticated && this.currentUser) {
            await this.saveCloudSong(name, songData);
        }
        
        this.updateSongsList();
    }
    
    // Save song to localStorage
    saveLocalSong(name, songData) {
        // Check if song with this name already exists locally
        const existingIndex = this.localSongs.findIndex(s => s.name === name);
        
        if (existingIndex >= 0) {
            this.localSongs[existingIndex] = songData;
        } else {
            this.localSongs.push(songData);
        }
        
        // Save to localStorage
        localStorage.setItem('savedSongs', JSON.stringify(this.localSongs));
    }
    
    // Save song to Supabase
    async saveCloudSong(name, songData) {
        if (!this.currentUser) return;
        
        try {
            // First check if this song already exists in the cloud
            const existingSong = this.cloudSongs.find(s => s.name === name);
            
            if (existingSong) {
                // Update the existing song
                // This would need an update function in the database object
                console.log('Updating existing cloud song not implemented yet');
                // TODO: Implement updating existing songs
            } else {
                // Save a new song
                const { data, error } = await database.saveSong(
                    this.currentUser.id,
                    {
                        title: name,
                        data: songData
                    }
                );
                
                if (error) {
                    console.error('Error saving song to database:', error);
                    alert('Failed to save song to the cloud. Check console for details.');
                } else {
                    console.log('Song saved to cloud successfully!');
                }
            }
            
            // Refresh the cloud songs
            this.loadCloudSongs();
        } catch (err) {
            console.error('Error saving song to cloud:', err);
        }
    }
    
    // Load a song (either local or cloud)
    loadSong(name) {
        // Find the song in our merged list
        const song = this.allSongs.find(s => s.name === name);
        
        if (!song) {
            alert('Song not found!');
            return;
        }
        
        // Return the song data to the beatMaker
        return song;
    }
    
    // Delete a song (from both local and cloud if applicable)
    async deleteSong(name) {
        // Find the song to determine if it's local, cloud, or both
        const song = this.allSongs.find(s => s.name === name);
        
        if (!song) {
            alert('Song not found!');
            return;
        }
        
        // If it's a cloud song and the user is authenticated
        if (song.isCloud && this.isAuthenticated && song.id) {
            await this.deleteCloudSong(song.id);
        }
        
        // Always try to delete locally too
        this.deleteLocalSong(name);
        
        // Update the songs list
        this.updateSongsList();
    }
    
    // Delete a song from localStorage
    deleteLocalSong(name) {
        this.localSongs = this.localSongs.filter(s => s.name !== name);
        localStorage.setItem('savedSongs', JSON.stringify(this.localSongs));
    }
    
    // Delete a song from Supabase
    async deleteCloudSong(songId) {
        if (!this.currentUser) return;
        
        try {
            const { error } = await database.deleteSong(songId);
            
            if (error) {
                console.error('Error deleting song from database:', error);
                alert('Failed to delete song from the cloud. Check console for details.');
                return false;
            }
            
            // Remove from our local list of cloud songs
            this.cloudSongs = this.cloudSongs.filter(s => s.id !== songId);
            return true;
        } catch (err) {
            console.error('Error deleting song from cloud:', err);
            return false;
        }
    }
    
    // Override the BeatMaker's song storage functions to use our enhanced versions
    overrideBeatMakerFunctions() {
        const originalSaveSong = this.beatMaker.saveSong.bind(this.beatMaker);
        const originalLoadSong = this.beatMaker.loadSong.bind(this.beatMaker);
        const originalDeleteSong = this.beatMaker.deleteSong.bind(this.beatMaker);
        
        // Override saveSong
        this.beatMaker.saveSong = (name) => {
            // Get the song data using the original method's logic
            const song = {
                name,
                // Basic parameters
                tempo: this.beatMaker.tempo,
                currentKey: this.beatMaker.currentKey,
                currentScale: this.beatMaker.currentScale,
                currentOctave: this.beatMaker.currentOctave,
                
                // Sound parameters
                soundParams: JSON.parse(JSON.stringify(this.beatMaker.soundParams)),
                
                // Synth parameters
                synthParams: JSON.parse(JSON.stringify(this.beatMaker.synthParams)),
                
                // Grid patterns
                drumGrid: JSON.parse(JSON.stringify(this.beatMaker.grid)),
                synthGrid: JSON.parse(JSON.stringify(this.beatMaker.synthGrid)),
                
                // Metadata
                date: new Date().toISOString(),
                version: '1.0' // For future compatibility
            };
            
            // Save using our method
            this.saveSong(name, song);
            
            // Show confirmation
            alert(`Song "${name}" saved successfully!`);
        };
        
        // Override loadSong
        this.beatMaker.loadSong = (name) => {
            const song = this.loadSong(name);
            if (!song) return;
            
            try {
                // Stop playback if it's running
                if (this.beatMaker.isPlaying) {
                    this.beatMaker.stop();
                }
                
                // Load basic parameters
                this.beatMaker.tempo = song.tempo || 120;
                this.beatMaker.currentKey = song.currentKey || 'C';
                this.beatMaker.currentScale = song.currentScale || 'ambient';
                this.beatMaker.currentOctave = song.currentOctave || 4;
                
                // Load sound parameters
                if (song.soundParams) {
                    this.beatMaker.soundParams = JSON.parse(JSON.stringify(song.soundParams));
                }
                
                // Load synth parameters
                if (song.synthParams) {
                    this.beatMaker.synthParams = JSON.parse(JSON.stringify(song.synthParams));
                }
                
                // Load grid patterns
                if (song.drumGrid) {
                    this.beatMaker.grid = JSON.parse(JSON.stringify(song.drumGrid));
                }
                
                if (song.synthGrid) {
                    this.beatMaker.synthGrid = JSON.parse(JSON.stringify(song.synthGrid));
                }
                
                // Update UI
                this.beatMaker.updateUI();
                
                // Regenerate sound generators
                this.beatMaker.soundGenerators = {
                    kick: this.beatMaker.createKickGenerator(),
                    snare: this.beatMaker.createSnareGenerator(),
                    hihat: this.beatMaker.createHiHatGenerator(),
                    clap: this.beatMaker.createClapGenerator(),
                    rimshot: this.beatMaker.createRimshotGenerator(),
                    tom: this.beatMaker.createTomGenerator(),
                    cymbal: this.beatMaker.createCymbalGenerator(),
                    cowbell: this.beatMaker.createCowbellGenerator(),
                    bass808: this.beatMaker.create808BassGenerator(),
                    trapHihat: this.beatMaker.createTrapHiHatGenerator(),
                    vocalChop: this.beatMaker.createVocalChopGenerator(),
                    futureBass: this.beatMaker.createFutureBassGenerator()
                };
                
                // Show confirmation
                alert(`Song "${name}" loaded successfully!`);
            } catch (error) {
                console.error("Error loading song:", error);
                alert("Error loading song. Check console for details.");
            }
        };
        
        // Override deleteSong
        this.beatMaker.deleteSong = (name) => {
            if (confirm(`Are you sure you want to delete "${name}"?`)) {
                this.deleteSong(name);
                this.beatMaker.updateSoundSelect = () => this.updateSongDropdown();
                this.updateSongDropdown();
            }
        };
        
        // Override updateSoundSelect
        this.beatMaker.updateSoundSelect = () => this.updateSongDropdown();
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment to make sure BeatMaker is initialized
    setTimeout(() => {
        window.songDB = new SongDatabaseHandler();
    }, 1000);
}); 