class InstrumentsManager {
    constructor(beatMaker) {
        this.beatMaker = beatMaker;
        this.currentInstrument = 'guitar';
        this.keyboardNotes = {};
        this.currentOctave = 4; // Default octave
        this.setupInstrumentSelector();
        this.setupKeyboard();
        this.setupInstrumentControls();
        this.setupKeyboardControls();
        this.setupHelpMenu();
    }

    setupInstrumentSelector() {
        const selector = document.getElementById('instrumentType');
        selector.addEventListener('change', (e) => {
            this.currentInstrument = e.target.value;
            this.updateActivePanel();
        });
    }

    updateActivePanel() {
        // Hide all instrument panels
        const panels = document.querySelectorAll('.instrument-panel');
        panels.forEach(panel => {
            panel.style.display = 'none';
        });

        // Show the selected instrument panel
        const selectedPanel = document.querySelector(`.instrument-panel[data-instrument="${this.currentInstrument}"]`);
        if (selectedPanel) {
            selectedPanel.style.display = 'block';
        }
    }

    setupKeyboard() {
        const keyboardContainer = document.querySelector('.keyboard-container');
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        // Create keyboard keys
        notes.forEach((note, index) => {
            const key = document.createElement('div');
            key.className = 'key';
            if (note.includes('#')) {
                key.className += ' black';
            }
            key.dataset.note = note;
            
            // Add event listeners
            key.addEventListener('mousedown', () => this.playNote(note));
            key.addEventListener('mouseup', () => this.stopNote(note));
            key.addEventListener('mouseleave', () => this.stopNote(note));
            
            keyboardContainer.appendChild(key);
        });
    }

    playNote(note) {
        const key = document.querySelector(`.key[data-note="${note}"]`);
        if (key) {
            key.classList.add('pressed');
        }

        switch (this.currentInstrument) {
            case 'guitar':
                this.playGuitarNote(note);
                break;
            case 'bass':
                this.playBassNote(note);
                break;
            case 'synth':
                this.playSynthNote(note);
                break;
            case 'pad':
                this.playPadNote(note);
                break;
            case 'pluck':
                this.playPluckNote(note);
                break;
            case 'futureBass':
                this.playFutureBassNote(note);
                break;
            case 'vocalChop':
                this.playVocalChopNote(note);
                break;
        }
    }

    stopNote(note) {
        const key = document.querySelector(`.key[data-note="${note}"]`);
        if (key) {
            key.classList.remove('pressed');
        }

        // Stop any playing notes
        if (this.keyboardNotes[note]) {
            this.keyboardNotes[note].forEach(node => {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            });
            delete this.keyboardNotes[note];
        }
    }

    playGuitarNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const distortion = this.beatMaker.audioContext.createWaveShaper();
        const reverb = this.beatMaker.audioContext.createConvolver();
        const delay = this.beatMaker.audioContext.createDelay();
        const filter = this.beatMaker.audioContext.createBiquadFilter();
        
        // Get guitar type
        const guitarType = document.getElementById('guitarType').value;
        
        // Set up distortion based on guitar type
        const distortionAmount = parseFloat(document.getElementById('guitarDistortion').value);
        if (guitarType === 'electric') {
            distortion.curve = this.makeDistortionCurve(distortionAmount);
        } else {
            // Acoustic guitar has minimal distortion
            distortion.curve = this.makeDistortionCurve(0.1);
        }
        
        // Set up reverb
        const reverbAmount = parseFloat(document.getElementById('guitarReverb').value);
        const reverbBuffer = this.createReverbBuffer(2.0);
        reverb.buffer = reverbBuffer;
        
        // Set up delay
        const delayTime = parseFloat(document.getElementById('guitarDelay').value);
        delay.delayTime.value = delayTime;
        
        // Set up filter based on guitar type
        if (guitarType === 'electric') {
            filter.type = 'lowpass';
            filter.frequency.value = 5000;
            filter.Q.value = 1;
        } else {
            // Acoustic guitar has a more natural frequency response
            filter.type = 'bandpass';
            filter.frequency.value = 2000;
            filter.Q.value = 2;
        }
        
        // Create harmonics for more realistic sound
        const harmonics = [];
        const numHarmonics = guitarType === 'electric' ? 4 : 6;
        const harmonicGain = guitarType === 'electric' ? 0.3 : 0.2;
        
        for (let i = 1; i <= numHarmonics; i++) {
            const harmonicOsc = this.beatMaker.audioContext.createOscillator();
            const harmonicGainNode = this.beatMaker.audioContext.createGain();
            
            harmonicOsc.frequency.value = this.beatMaker.getNoteFrequency(note + '4') * i;
            harmonicGainNode.gain.value = harmonicGain / i;
            
            harmonicOsc.connect(harmonicGainNode);
            harmonicGainNode.connect(gainNode);
            
            harmonics.push(harmonicOsc);
            harmonics.push(harmonicGainNode);
        }
        
        // Connect nodes
        oscillator.connect(distortion);
        distortion.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(delay);
        delay.connect(reverb);
        reverb.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        oscillator.frequency.value = frequency;
        
        // Apply envelope for more natural pluck
        const attack = guitarType === 'electric' ? 0.01 : 0.05;
        const decay = guitarType === 'electric' ? 0.1 : 0.2;
        const sustain = guitarType === 'electric' ? 0.5 : 0.3;
        const release = guitarType === 'electric' ? 0.2 : 0.5;
        
        const now = this.beatMaker.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(1, now + attack);
        gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
        gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + release);
        
        // Start playing
        oscillator.start();
        harmonics.forEach((node, index) => {
            if (node.start) node.start();
        });
        
        // Stop after release
        oscillator.stop(now + attack + decay + release);
        harmonics.forEach((node, index) => {
            if (node.stop) node.stop(now + attack + decay + release);
        });
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, distortion, reverb, delay, filter, ...harmonics];
    }

    playBassNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const distortion = this.beatMaker.audioContext.createWaveShaper();
        const subOscillator = this.beatMaker.audioContext.createOscillator();
        
        // Set up distortion
        const distortionAmount = parseFloat(document.getElementById('bassDistortion').value);
        distortion.curve = this.makeDistortionCurve(distortionAmount);
        
        // Set up sub bass
        const subAmount = parseFloat(document.getElementById('bassSub').value);
        subOscillator.frequency.value = this.beatMaker.getNoteFrequency(note + '2');
        
        // Connect nodes
        oscillator.connect(distortion);
        subOscillator.connect(distortion);
        distortion.connect(gainNode);
        gainNode.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '3');
        oscillator.frequency.value = frequency;
        
        // Start playing
        oscillator.start();
        subOscillator.start();
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, distortion, subOscillator];
    }

    playSynthNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const filter = this.beatMaker.audioContext.createBiquadFilter();
        
        // Set up waveform
        const waveform = document.getElementById('synthWaveform').value;
        oscillator.type = waveform;
        
        // Set up filter
        const filterFreq = parseFloat(document.getElementById('synthFilter').value);
        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;
        
        // Connect nodes
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        oscillator.frequency.value = frequency;
        
        // Start playing
        oscillator.start();
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, filter];
    }

    playPadNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        
        // Set up envelope
        const attack = parseFloat(document.getElementById('padAttack').value);
        const release = parseFloat(document.getElementById('padRelease').value);
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        oscillator.frequency.value = frequency;
        
        // Apply envelope
        gainNode.gain.setValueAtTime(0, this.beatMaker.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.8, this.beatMaker.audioContext.currentTime + attack);
        gainNode.gain.linearRampToValueAtTime(0, this.beatMaker.audioContext.currentTime + attack + release);
        
        // Start playing
        oscillator.start();
        oscillator.stop(this.beatMaker.audioContext.currentTime + attack + release);
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode];
    }

    playPluckNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const filter = this.beatMaker.audioContext.createBiquadFilter();
        
        // Set up envelope
        const decay = parseFloat(document.getElementById('pluckDecay').value);
        const filterFreq = parseFloat(document.getElementById('pluckFilter').value);
        
        // Connect nodes
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        oscillator.frequency.value = frequency;
        
        // Apply envelope
        gainNode.gain.setValueAtTime(0.8, this.beatMaker.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.beatMaker.audioContext.currentTime + decay);
        
        // Apply filter envelope
        filter.frequency.setValueAtTime(filterFreq, this.beatMaker.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(20, this.beatMaker.audioContext.currentTime + decay);
        
        // Start playing
        oscillator.start();
        oscillator.stop(this.beatMaker.audioContext.currentTime + decay);
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, filter];
    }

    playFutureBassNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const filter = this.beatMaker.audioContext.createBiquadFilter();
        const lfo = this.beatMaker.audioContext.createOscillator();
        const lfoGain = this.beatMaker.audioContext.createGain();
        
        // Set up LFO
        const lfoRate = parseFloat(document.getElementById('futureBassLFORate').value);
        const lfoDepth = parseFloat(document.getElementById('futureBassLFODepth').value);
        
        lfo.frequency.value = lfoRate;
        lfoGain.gain.value = lfoDepth;
        
        // Connect nodes
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.beatMaker.audioContext.destination);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        
        // Set frequency
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        oscillator.frequency.value = frequency;
        
        // Start playing
        oscillator.start();
        lfo.start();
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, filter, lfo, lfoGain];
    }

    playVocalChopNote(note) {
        const oscillator = this.beatMaker.audioContext.createOscillator();
        const gainNode = this.beatMaker.audioContext.createGain();
        const reverb = this.beatMaker.audioContext.createConvolver();
        
        // Set up reverb
        const reverbAmount = parseFloat(document.getElementById('vocalChopReverb').value);
        const reverbBuffer = this.createReverbBuffer(1.5);
        reverb.buffer = reverbBuffer;
        
        // Set up vocal type
        const vocalType = document.getElementById('vocalChopType').value;
        const formant = this.beatMaker.audioContext.createBiquadFilter();
        formant.type = 'bandpass';
        
        // Adjust formant based on vocal type
        const frequency = this.beatMaker.getNoteFrequency(note + '4');
        switch (vocalType) {
            case '1': // Ah
                formant.frequency.value = frequency * 1.5;
                break;
            case '2': // Eh
                formant.frequency.value = frequency * 1.7;
                break;
            case '3': // Oh
                formant.frequency.value = frequency * 1.3;
                break;
            case '4': // Ih
                formant.frequency.value = frequency * 2.0;
                break;
            case '5': // Uh
                formant.frequency.value = frequency * 1.1;
                break;
        }
        
        // Connect nodes
        oscillator.connect(formant);
        formant.connect(gainNode);
        gainNode.connect(reverb);
        reverb.connect(this.beatMaker.audioContext.destination);
        
        // Set frequency
        oscillator.frequency.value = frequency;
        
        // Start playing
        oscillator.start();
        
        // Store for cleanup
        this.keyboardNotes[note] = [oscillator, gainNode, formant, reverb];
    }

    makeDistortionCurve(amount) {
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < samples; i++) {
            const x = (i * 2) / samples - 1;
            curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
        }
        
        return curve;
    }

    createReverbBuffer(duration) {
        const sampleRate = this.beatMaker.audioContext.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.beatMaker.audioContext.createBuffer(2, length, sampleRate);
        const leftChannel = buffer.getChannelData(0);
        const rightChannel = buffer.getChannelData(1);
        
        for (let i = 0; i < length; i++) {
            const n = i / length;
            leftChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, 2);
            rightChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, 2);
        }
        
        return buffer;
    }

    setupInstrumentControls() {
        // Initialize knobs
        this.initializeKnobs();
        
        // Show initial instrument panel
        this.updateActivePanel();
    }

    initializeKnobs() {
        // Initialize all knobs with the knob library
        document.querySelectorAll('.knob').forEach(knob => {
            const input = document.getElementById(knob.id.replace('Knob', ''));
            if (input) {
                // Initialize knob with current value
                const value = parseFloat(input.value);
                const min = parseFloat(input.min);
                const max = parseFloat(input.max);
                
                // Create knob instance
                const knobInstance = new Knob({
                    element: knob,
                    value: value,
                    min: min,
                    max: max,
                    onChange: (value) => {
                        input.value = value;
                    }
                });
            }
        });
    }

    setupKeyboardControls() {
        // Map keys to notes (bottom right keys for one octave)
        const keyMap = {
            'h': 'C',
            'j': 'D',
            'k': 'E',
            'l': 'F',
            ';': 'G',
            "'": 'A',
            'b': 'B',
            'n': 'C#',
            'm': 'D#',
            ',': 'F#',
            '.': 'G#',
            '/': 'A#'
        };

        // GarageBand-style controls
        const controlMap = {
            'z': () => this.changeOctave(-1), // Lower octave
            'x': () => this.changeOctave(1),  // Higher octave
            'c': () => this.toggleDistortion(), // Toggle distortion
            'v': () => this.toggleReverb(),    // Toggle reverb
            'b': () => this.toggleDelay(),     // Toggle delay
            'space': () => this.stopAllNotes() // Stop all notes
        };

        // Keydown event listener
        document.addEventListener('keydown', (e) => {
            // Skip if we're typing in an input field or form control
            if (window.isFormControlFocused?.() || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA') {
                return;
            }

            const key = e.key.toLowerCase();

            // Check if it's a note key
            if (keyMap[key] && !this.keyboardNotes[key]) {
                const note = keyMap[key];
                this.playNote(note);
                this.keyboardNotes[key] = note;
            }

            // Check if it's a control key
            if (controlMap[key]) {
                controlMap[key]();
            }
        });

        // Keyup event listener
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            
            if (this.keyboardNotes[key]) {
                const note = this.keyboardNotes[key];
                this.stopNote(note);
                delete this.keyboardNotes[key];
            }
        });
    }

    changeOctave(delta) {
        this.currentOctave = Math.max(1, Math.min(7, this.currentOctave + delta));
        document.getElementById('currentOctave').textContent = this.currentOctave;
    }

    toggleDistortion() {
        const distortionControl = document.getElementById('guitarDistortion');
        if (distortionControl) {
            const currentValue = parseFloat(distortionControl.value);
            const newValue = currentValue > 0 ? 0 : 0.5;
            distortionControl.value = newValue;
            // Trigger the input event to update the sound
            distortionControl.dispatchEvent(new Event('input'));
        }
    }

    toggleReverb() {
        const reverbControl = document.getElementById('guitarReverb');
        if (reverbControl) {
            const currentValue = parseFloat(reverbControl.value);
            const newValue = currentValue > 0 ? 0 : 0.5;
            reverbControl.value = newValue;
            reverbControl.dispatchEvent(new Event('input'));
        }
    }

    toggleDelay() {
        const delayControl = document.getElementById('guitarDelay');
        if (delayControl) {
            const currentValue = parseFloat(delayControl.value);
            const newValue = currentValue > 0 ? 0 : 0.3;
            delayControl.value = newValue;
            delayControl.dispatchEvent(new Event('input'));
        }
    }

    stopAllNotes() {
        Object.keys(this.keyboardNotes).forEach(key => {
            const note = this.keyboardNotes[key];
            this.stopNote(note);
        });
        this.keyboardNotes = {};
    }

    setupHelpMenu() {
        // Create help button
        const helpButton = document.createElement('button');
        helpButton.className = 'help-button';
        helpButton.innerHTML = '?';
        helpButton.title = 'Show Help';
        document.querySelector('.instruments-section').appendChild(helpButton);

        // Create help menu
        const helpMenu = document.createElement('div');
        helpMenu.className = 'help-menu';
        helpMenu.style.display = 'none';
        
        const helpContent = `
            <h3>Keyboard Controls</h3>
            <div class="help-section">
                <h4>Notes (Bottom Right Keys)</h4>
                <p>h - C</p>
                <p>j - D</p>
                <p>k - E</p>
                <p>l - F</p>
                <p>; - G</p>
                <p>' - A</p>
                <p>b - B</p>
                <p>n - C#</p>
                <p>m - D#</p>
                <p>, - F#</p>
                <p>. - G#</p>
                <p>/ - A#</p>
            </div>
            <div class="help-section">
                <h4>Controls</h4>
                <p>z - Lower Octave</p>
                <p>x - Higher Octave</p>
                <p>c - Toggle Distortion</p>
                <p>v - Toggle Reverb</p>
                <p>b - Toggle Delay</p>
                <p>Space - Stop All Notes</p>
            </div>
            <button class="close-help">Close</button>
        `;
        helpMenu.innerHTML = helpContent;
        document.querySelector('.instruments-section').appendChild(helpMenu);

        // Create pop-out keyboard button
        const keyboardButton = document.createElement('button');
        keyboardButton.className = 'keyboard-button';
        keyboardButton.innerHTML = '🎹';
        keyboardButton.title = 'Show Keyboard';
        document.querySelector('.instruments-section').appendChild(keyboardButton);

        // Create pop-out keyboard
        const popoutKeyboard = document.createElement('div');
        popoutKeyboard.className = 'popout-keyboard';
        popoutKeyboard.style.display = 'none';
        
        // Copy the existing keyboard content
        const keyboardContainer = document.querySelector('.keyboard-container');
        popoutKeyboard.innerHTML = keyboardContainer.innerHTML;
        document.querySelector('.instruments-section').appendChild(popoutKeyboard);

        // Help button click handler
        helpButton.addEventListener('click', () => {
            helpMenu.style.display = helpMenu.style.display === 'none' ? 'block' : 'none';
        });

        // Close help button click handler
        helpMenu.querySelector('.close-help').addEventListener('click', () => {
            helpMenu.style.display = 'none';
        });

        // Keyboard button click handler
        keyboardButton.addEventListener('click', () => {
            popoutKeyboard.style.display = popoutKeyboard.style.display === 'none' ? 'block' : 'none';
        });

        // Close help menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!helpMenu.contains(e.target) && e.target !== helpButton) {
                helpMenu.style.display = 'none';
            }
        });
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    if (window.beatMaker) {
        window.instrumentsManager = new InstrumentsManager(window.beatMaker);
    }
}); 