// Use the database object from the global scope
// database is defined in supabaseClient.js

class InstrumentDatabaseHandler {
    constructor() {
        // UI Elements
        this.instrumentNameInput = document.getElementById('instrumentName');
        this.instrumentTypeSelect = document.getElementById('instrumentType');
        this.instrumentDescriptionTextarea = document.getElementById('instrumentDescription');
        this.saveButton = document.getElementById('saveInstrument');
        this.saveStatus = document.getElementById('saveStatus');
        this.instrumentList = document.getElementById('instrumentList');
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.saveButton.addEventListener('click', () => this.saveInstrument());
        
        // Load saved instruments when tab is opened
        document.querySelector('.tab-button[data-tab="recording"]').addEventListener('click', () => {
            this.loadInstruments();
        });
        
        // Initial load of instruments
        this.loadInstruments();
    }
    
    // Save an instrument to the database
    async saveInstrument() {
        // Get values from form
        const name = this.instrumentNameInput.value.trim();
        const type = this.instrumentTypeSelect.value;
        const description = this.instrumentDescriptionTextarea.value.trim();
        
        // Validate inputs
        if (!name) {
            this.showStatus('Please enter an instrument name', 'error');
            return;
        }
        
        // Disable save button while saving
        this.saveButton.disabled = true;
        this.saveButton.textContent = 'Saving...';
        
        try {
            // Save instrument data
            const { data, error } = await database.saveInstrument({
                name,
                type,
                description
            });
            
            if (error) {
                console.error('Error saving instrument:', error);
                this.showStatus('Error saving instrument', 'error');
            } else {
                this.showStatus('Instrument saved successfully!', 'success');
                this.clearForm();
                this.loadInstruments(); // Refresh the list
            }
        } catch (err) {
            console.error('Exception saving instrument:', err);
            this.showStatus('Error saving instrument', 'error');
        } finally {
            // Re-enable save button
            this.saveButton.disabled = false;
            this.saveButton.textContent = 'Save to Database';
        }
    }
    
    // Load all instruments from the database
    async loadInstruments() {
        this.instrumentList.innerHTML = '<div class="loading-message">Loading instruments...</div>';
        
        try {
            const { data, error } = await database.getInstruments();
            
            if (error) {
                console.error('Error loading instruments:', error);
                this.instrumentList.innerHTML = '<div class="error-message">Error loading instruments</div>';
                return;
            }
            
            // Display instruments
            if (data && data.length > 0) {
                this.displayInstruments(data);
            } else {
                this.instrumentList.innerHTML = '<div class="empty-message">No instruments found</div>';
            }
        } catch (err) {
            console.error('Exception loading instruments:', err);
            this.instrumentList.innerHTML = '<div class="error-message">Error loading instruments</div>';
        }
    }
    
    // Display instruments in the list
    displayInstruments(instruments) {
        this.instrumentList.innerHTML = '';
        
        instruments.forEach(instrument => {
            const instrumentElement = document.createElement('div');
            instrumentElement.className = 'instrument-item';
            instrumentElement.dataset.id = instrument.id;
            
            // Get creator info from user_profiles
            let creatorName = 'Anonymous';
            if (instrument.user_profiles) {
                creatorName = instrument.user_profiles.username || 
                            (instrument.user_profiles.email ? instrument.user_profiles.email.split('@')[0] : 'Anonymous');
            }
            
            instrumentElement.innerHTML = `
                <div class="instrument-item-details">
                    <div class="instrument-main-info">
                        <span class="instrument-item-name">${instrument.name}</span>
                        <span class="instrument-item-type">${instrument.type}</span>
                    </div>
                    <div class="instrument-creator">
                        Created by: <span class="creator-name">${creatorName}</span>
                    </div>
                </div>
                <button class="instrument-delete-btn" data-id="${instrument.id}">Delete</button>
            `;
            
            // Add delete button listener
            instrumentElement.querySelector('.instrument-delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteInstrument(instrument.id);
            });
            
            this.instrumentList.appendChild(instrumentElement);
        });
    }
    
    // Delete an instrument
    async deleteInstrument(id) {
        if (!confirm('Are you sure you want to delete this instrument?')) {
            return;
        }
        
        try {
            const { error } = await database.deleteInstrument(id);
            
            if (error) {
                console.error('Error deleting instrument:', error);
                alert('Error deleting instrument');
            } else {
                // Remove from UI
                const element = this.instrumentList.querySelector(`[data-id="${id}"]`);
                if (element) {
                    element.remove();
                }
                
                // Check if list is now empty
                if (this.instrumentList.children.length === 0) {
                    this.instrumentList.innerHTML = '<div class="empty-message">No instruments found</div>';
                }
            }
        } catch (err) {
            console.error('Exception deleting instrument:', err);
            alert('Error deleting instrument');
        }
    }
    
    // Show status message
    showStatus(message, type) {
        this.saveStatus.textContent = message;
        this.saveStatus.className = 'save-status';
        this.saveStatus.classList.add(type);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.saveStatus.className = 'save-status';
        }, 3000);
    }
    
    // Clear the form
    clearForm() {
        this.instrumentNameInput.value = '';
        this.instrumentTypeSelect.selectedIndex = 0;
        this.instrumentDescriptionTextarea.value = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with the instrument form
    if (document.getElementById('saveInstrument')) {
        window.instrumentDB = new InstrumentDatabaseHandler();
    }
}); 