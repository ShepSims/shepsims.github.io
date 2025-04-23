class BeatMaker {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        
        // Create gain nodes for each instrument
        this.gainNodes = {
            kick: this.audioContext.createGain(),
            snare: this.audioContext.createGain(),
            hihat: this.audioContext.createGain(),
            clap: this.audioContext.createGain(),
            synth: this.audioContext.createGain(),
            mic: this.audioContext.createGain(),
            rimshot: this.audioContext.createGain(),
            tom: this.audioContext.createGain(),
            cymbal: this.audioContext.createGain(),
            cowbell: this.audioContext.createGain(),
            // Add new modern instruments
            bass808: this.audioContext.createGain(),
            trapHihat: this.audioContext.createGain(),
            vocalChop: this.audioContext.createGain(),
            futureBass: this.audioContext.createGain()
        };
        
        // Connect all gain nodes to master gain
        Object.values(this.gainNodes).forEach(node => {
            node.connect(this.masterGain);
        });
        
        this.currentKey = 'C';
        this.currentScale = 'ambient';
        this.isPlaying = false;
        this.currentStep = 0;
        this.tempo = 120;
        this.steps = 16;
        
        // Microphone and recording state
        this.micStream = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.isLoopPlaying = false;
        this.loopBuffer = null;
        this.loopSource = null;
        this.visualizer = null;
        
        // Define piano notes (will be fully initialized in createSynthGrid)
        this.pianoNotes = ['C5', 'B4', 'A♯4', 'A4', 'G♯4', 'G4', 'F♯4', 'F4', 'E4', 'D♯4', 'D4', 'C♯4', 'C4'];
        
        // Sound parameters with default values
        this.soundParams = {
            kick: { frequency: 100, decay: 0.5, volume: 0.8, duration: 0.5 },
            snare: { frequency: 200, noiseAmount: 0.5, decay: 0.3, volume: 0.8, duration: 0.3 },
            hihat: { frequency: 5000, decay: 0.1, volume: 0.8, duration: 0.2 },
            clap: { delay: 0.03, decay: 0.3, volume: 0.8, duration: 0.3, frequency: 1000 },
            rimshot: { frequency: 400, decay: 0.2, volume: 0.7, duration: 0.2 },
            tom: { frequency: 150, decay: 0.4, volume: 0.8, duration: 0.4 },
            cymbal: { frequency: 8000, decay: 0.7, volume: 0.6, duration: 0.7 },
            cowbell: { frequency: 800, decay: 0.3, volume: 0.7, duration: 0.3 },
            // Add parameters for new modern instruments
            bass808: { frequency: 60, attack: 0.01, decay: 0.5, sustain: 0.8, release: 1.5, volume: 0.9, distortion: 4 },
            trapHihat: { frequency: 8000, decay: 0.08, volume: 0.7, pan: 0, isRoll: false, rollSpeed: 4 },
            vocalChop: { note: 'C4', chop: 1, attack: 0.01, release: 0.3, volume: 0.7, reverb: 0.3 },
            futureBass: { note: 'C4', attack: 0.05, decay: 0.2, sustain: 0.8, release: 0.5, detune: 15, lfoRate: 6, lfoDepth: 20, volume: 0.7 }
        };
        
        // Initialize sound generators with current parameters
        this.soundGenerators = {
            kick: this.createKickGenerator(),
            snare: this.createSnareGenerator(),
            hihat: this.createHiHatGenerator(),
            clap: this.createClapGenerator(),
            rimshot: this.createRimshotGenerator(),
            tom: this.createTomGenerator(),
            cymbal: this.createCymbalGenerator(),
            cowbell: this.createCowbellGenerator(),
            // Add new modern instrument generators
            bass808: this.create808BassGenerator(),
            trapHihat: this.createTrapHiHatGenerator(),
            vocalChop: this.createVocalChopGenerator(),
            futureBass: this.createFutureBassGenerator()
        };
        
        // Synth state
        this.synthParams = {
            waveform: 'sine',
            attack: 0.1,
            decay: 0.2,
            sustain: 0.5,
            release: 0.3,
            style: 'ambient',
            volume: 0.8
        };
        this.currentOctave = 4;
        this.selectedNote = null;
        
        // Initialize the grid and synthGrid arrays
        this.grid = Array(12).fill().map(() => Array(this.steps).fill(false)); // Increased to 12 for new instruments
        this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
        
        // Musical scales and chords
        this.scales = {
            ambient: ['C', 'D', 'E', 'G', 'A'],
            house: ['C', 'D', 'F', 'G', 'A'],
            techno: ['C', 'D#', 'F', 'G', 'A#'],
            chill: ['C', 'D', 'F', 'G', 'A'],
            // Add modern scales
            trap: ['C', 'D#', 'F', 'G', 'A#'],
            future: ['C', 'D', 'E', 'G', 'B'],
            pop: ['C', 'D', 'E', 'F', 'G', 'A']
        };
        
        this.chords = {
            ambient: {
                'C': ['C', 'E', 'G'],
                'D': ['D', 'F', 'A'],
                'E': ['E', 'G', 'B'],
                'G': ['G', 'B', 'D'],
                'A': ['A', 'C', 'E']
            },
            house: {
                'C': ['C', 'F', 'G'],
                'D': ['D', 'G', 'A'],
                'F': ['F', 'A', 'C'],
                'G': ['G', 'C', 'D'],
                'A': ['A', 'D', 'E']
            },
            techno: {
                'C': ['C', 'D#', 'G'],
                'D#': ['D#', 'G', 'A#'],
                'F': ['F', 'A#', 'C'],
                'G': ['G', 'C', 'D#'],
                'A#': ['A#', 'D#', 'F']
            },
            chill: {
                'C': ['C', 'D', 'G'],
                'D': ['D', 'F', 'A'],
                'F': ['F', 'G', 'C'],
                'G': ['G', 'A', 'D'],
                'A': ['A', 'C', 'E']
            }
        };
        
        // Key options - available root notes
        this.rootNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        this.init();
        this.setupSoundStorage();
        this.setupMicrophone();
        this.setupSynth();
        
        // Initialize the wobble instrument after setup
        this.wobbleInstrument = new WobbleInstrument(this);
    }

    init() {
        // Initialize the beat and synth grids
        this.createGrid();
        this.createSynthGrid();
        
        // Setup UI interactions
        this.setupEventListeners();
        // this.setupParameterControls();
        this.setupKnobControls();
        this.setupTabNavigation();
        
        // Make sure initial UI state is correct
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const tabId = activeTab.getAttribute('data-tab');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) {
                // Make sure only the active tab pane is visible
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                tabPane.classList.add('active');
            }
        }
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get the target tab
                const targetTab = button.dataset.tab;
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show the corresponding tab pane
                let targetPane = document.getElementById(`${targetTab}-tab`);
                
                if (targetPane) {
                    targetPane.classList.add('active');
                    
                    // Handle specific tab activations
                    if (targetTab === 'recording' && this.visualizer) {
                    setTimeout(() => {
                            // Trigger resize for microphone visualizer canvas
                        if (this.visualizer.canvas) {
                            this.visualizer.canvas.width = this.visualizer.canvas.offsetWidth;
                            this.visualizer.canvas.height = this.visualizer.canvas.offsetHeight;
                        }
                    }, 50);
                }
                
                    if (targetTab === 'wobble' && this.wobbleInstrument) {
                    setTimeout(() => {
                            // Trigger redraw for wobble pad
                        if (this.wobbleInstrument) {
                            this.wobbleInstrument.drawCanvas();
                        }
                    }, 50);
                    }
                    
                    if (targetTab === 'synth') {
                        // Trigger redraw of synth grid
                        setTimeout(() => {
                            this.updateSynthGrid();
                        }, 50);
                    }
                    
                    if (targetTab === 'visualize') {
                        // Trigger canvas resize for sound visualizer
                        setTimeout(() => {
                            if (window.soundVisualizer) {
                                console.log('Resizing sound visualizer canvas from tab change');
                                window.soundVisualizer.resizeCanvas();
                            }
                        }, 50);
                    }
                }
            });
        });
    }

    setupKnobControls() {
        // Set up knob rotation based on sliders
        const knobs = [
            { knob: 'kickFreqKnob', slider: 'kickFreq', min: 20, max: 200 },
            { knob: 'kickDecayKnob', slider: 'kickDecay', min: 0.1, max: 1 },
            { knob: 'snareNoiseKnob', slider: 'snareNoise', min: 0, max: 1 },
            { knob: 'snareDecayKnob', slider: 'snareDecay', min: 0.1, max: 1 },
            { knob: 'hihatFreqKnob', slider: 'hihatFreq', min: 1000, max: 10000 },
            { knob: 'hihatDecayKnob', slider: 'hihatDecay', min: 0.05, max: 0.5 },
            { knob: 'clapDelayKnob', slider: 'clapDelay', min: 0, max: 0.1 },
            { knob: 'clapDecayKnob', slider: 'clapDecay', min: 0.1, max: 1 },
            { knob: 'rimshotFreqKnob', slider: 'rimshotFreq', min: 200, max: 800 },
            { knob: 'rimshotDecayKnob', slider: 'rimshotDecay', min: 0.1, max: 0.5 },
            { knob: 'tomFreqKnob', slider: 'tomFreq', min: 50, max: 300 },
            { knob: 'tomDecayKnob', slider: 'tomDecay', min: 0.1, max: 1 },
            { knob: 'cymbalFreqKnob', slider: 'cymbalFreq', min: 5000, max: 12000 },
            { knob: 'cymbalDecayKnob', slider: 'cymbalDecay', min: 0.1, max: 1 },
            { knob: 'cowbellFreqKnob', slider: 'cowbellFreq', min: 500, max: 1500 },
            { knob: 'cowbellDecayKnob', slider: 'cowbellDecay', min: 0.1, max: 0.5 },
            // Add modern instrument knobs
            { knob: 'bass808FreqKnob', slider: 'bass808Freq', min: 40, max: 120 },
            { knob: 'bass808DistortionKnob', slider: 'bass808Distortion', min: 1, max: 10 },
            { knob: 'trapHihatFreqKnob', slider: 'trapHihatFreq', min: 6000, max: 12000 },
            { knob: 'trapHihatRollSpeedKnob', slider: 'trapHihatRollSpeed', min: 2, max: 8 },
            { knob: 'vocalChopReverbKnob', slider: 'vocalChopReverb', min: 0, max: 0.8 },
            { knob: 'futureBassLFORateKnob', slider: 'futureBassLFORate', min: 1, max: 20 },
            { knob: 'futureBassLFODepthKnob', slider: 'futureBassLFODepth', min: 1, max: 50 }
        ];

        // Initialize knobs
        knobs.forEach(({ knob, slider, min, max }) => {
            const knobElement = document.getElementById(knob);
            const sliderElement = document.getElementById(slider);
            
            if (!knobElement || !sliderElement) return;
            
            // Set initial rotation
            const value = parseFloat(sliderElement.value);
            const percentage = (value - min) / (max - min);
            const rotation = percentage * 270 - 135; // -135 to +135 degrees
            knobElement.style.transform = `rotate(${rotation}deg)`;

            // Add event listeners
            knobElement.addEventListener('mousedown', (e) => {
                const knobRect = knobElement.getBoundingClientRect();
                const knobCenter = {
                    x: knobRect.left + knobRect.width / 2,
                    y: knobRect.top + knobRect.height / 2
                };
                
                const handleMouseMove = (moveEvent) => {
                    const mousePos = {
                        x: moveEvent.clientX,
                        y: moveEvent.clientY
                    };
                    
                    // Calculate angle
                    let angle = Math.atan2(mousePos.y - knobCenter.y, mousePos.x - knobCenter.x) * (180 / Math.PI);
                    
                    // Restrict to 270 degree rotation (-135 to +135)
                    if (angle < -135) angle = -135;
                    if (angle > 135) angle = 135;
                    
                    // Apply rotation
                    knobElement.style.transform = `rotate(${angle}deg)`;
                    
                    // Convert angle to slider value
                    const percentage = (angle + 135) / 270;
                    const newValue = percentage * (max - min) + min;
                    
                    // Update slider
                    sliderElement.value = newValue.toFixed(2);
                    
                    // Trigger slider input event
                    const event = new Event('input', { bubbles: true });
                    sliderElement.dispatchEvent(event);
                };
                
                const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            });
            
            // Update knob when slider changes
            sliderElement.addEventListener('input', () => {
                const value = parseFloat(sliderElement.value);
                const percentage = (value - min) / (max - min);
                const rotation = percentage * 270 - 135; // -135 to +135 degrees
                knobElement.style.transform = `rotate(${rotation}deg)`;
            });
        });
    }

    setupParameterControls() {
        // Kick controls
        document.getElementById('kickFreq').addEventListener('input', (e) => {
            this.soundParams.kick.frequency = parseFloat(e.target.value);
            this.soundGenerators.kick = this.createKickGenerator();
        });
        
        document.getElementById('kickDecay').addEventListener('input', (e) => {
            this.soundParams.kick.decay = parseFloat(e.target.value);
            this.soundGenerators.kick = this.createKickGenerator();
        });

        // Snare controls
        document.getElementById('snareNoise').addEventListener('input', (e) => {
            this.soundParams.snare.noiseAmount = parseFloat(e.target.value);
            this.soundGenerators.snare = this.createSnareGenerator();
        });
        
        document.getElementById('snareDecay').addEventListener('input', (e) => {
            this.soundParams.snare.decay = parseFloat(e.target.value);
            this.soundGenerators.snare = this.createSnareGenerator();
        });

        // Hi-hat controls
        document.getElementById('hihatFreq').addEventListener('input', (e) => {
            this.soundParams.hihat.frequency = parseFloat(e.target.value);
            this.soundGenerators.hihat = this.createHiHatGenerator();
        });
        
        document.getElementById('hihatDecay').addEventListener('input', (e) => {
            this.soundParams.hihat.decay = parseFloat(e.target.value);
            this.soundGenerators.hihat = this.createHiHatGenerator();
        });

        // Clap controls
        document.getElementById('clapDelay').addEventListener('input', (e) => {
            this.soundParams.clap.delay = parseFloat(e.target.value);
            this.soundGenerators.clap = this.createClapGenerator();
        });
        
        document.getElementById('clapDecay').addEventListener('input', (e) => {
            this.soundParams.clap.decay = parseFloat(e.target.value);
            this.soundGenerators.clap = this.createClapGenerator();
        });
        
        // Rimshot controls
        document.getElementById('rimshotFreq').addEventListener('input', (e) => {
            this.soundParams.rimshot.frequency = parseFloat(e.target.value);
            this.soundGenerators.rimshot = this.createRimshotGenerator();
        });
        
        document.getElementById('rimshotDecay').addEventListener('input', (e) => {
            this.soundParams.rimshot.decay = parseFloat(e.target.value);
            this.soundGenerators.rimshot = this.createRimshotGenerator();
        });
        
        // Tom controls
        document.getElementById('tomFreq').addEventListener('input', (e) => {
            this.soundParams.tom.frequency = parseFloat(e.target.value);
            this.soundGenerators.tom = this.createTomGenerator();
        });
        
        document.getElementById('tomDecay').addEventListener('input', (e) => {
            this.soundParams.tom.decay = parseFloat(e.target.value);
            this.soundGenerators.tom = this.createTomGenerator();
        });
        
        // Cymbal controls
        document.getElementById('cymbalFreq').addEventListener('input', (e) => {
            this.soundParams.cymbal.frequency = parseFloat(e.target.value);
            this.soundGenerators.cymbal = this.createCymbalGenerator();
        });
        
        document.getElementById('cymbalDecay').addEventListener('input', (e) => {
            this.soundParams.cymbal.decay = parseFloat(e.target.value);
            this.soundGenerators.cymbal = this.createCymbalGenerator();
        });
        
        // Cowbell controls
        document.getElementById('cowbellFreq').addEventListener('input', (e) => {
            this.soundParams.cowbell.frequency = parseFloat(e.target.value);
            this.soundGenerators.cowbell = this.createCowbellGenerator();
        });
        
        document.getElementById('cowbellDecay').addEventListener('input', (e) => {
            this.soundParams.cowbell.decay = parseFloat(e.target.value);
            this.soundGenerators.cowbell = this.createCowbellGenerator();
        });

        // Tempo controls
        const tempoInput = document.getElementById('tempo');
        const tempoValue = document.getElementById('tempoValue');
        tempoInput.addEventListener('input', (e) => {
            const wasPlaying = this.isPlaying;
            
            // Update tempo
            this.tempo = parseFloat(e.target.value);
            tempoValue.textContent = this.tempo;
            
            // If playing, reset timing
            if (wasPlaying) {
                this.nextStepTime = this.audioContext.currentTime;
            }
        });

        // Tempo buttons
        document.getElementById('tempoDown').addEventListener('click', () => {
            if (this.tempo > 40) {
                const wasPlaying = this.isPlaying;
                
                // Update tempo
                this.tempo -= 5;
                tempoInput.value = this.tempo;
                tempoValue.textContent = this.tempo;
                
                // If playing, reset timing
                if (wasPlaying) {
                    this.nextStepTime = this.audioContext.currentTime;
                }
            }
        });
        
        document.getElementById('tempoUp').addEventListener('click', () => {
            if (this.tempo < 240) {
                const wasPlaying = this.isPlaying;
                
                // Update tempo
                this.tempo += 5;
                tempoInput.value = this.tempo;
                tempoValue.textContent = this.tempo;
                
                // If playing, reset timing
                if (wasPlaying) {
                    this.nextStepTime = this.audioContext.currentTime;
                }
            }
        });
        
        // Setup volume controls
        this.setupVolumeControls();
    }
    
    // Set up volume controls for each instrument
    setupVolumeControls() {
        // Prevent multiple volume panels by checking if one already exists
        if (document.getElementById('volumeControlPanel')) {
            // If a volume panel already exists, just return
            return;
        }
        
        // Create volume control panel
        const volumeControlPanel = document.createElement('div');
        volumeControlPanel.className = 'parameter-panel';
        volumeControlPanel.id = 'volumeControlPanel';
        volumeControlPanel.style.position = 'absolute';
        volumeControlPanel.style.top = '50px';
        volumeControlPanel.style.left = '20px'; // Position at top left instead of right
        volumeControlPanel.style.backgroundColor = '#2a2a2a';
        volumeControlPanel.style.border = '1px solid #444';
        volumeControlPanel.style.borderRadius = '5px';
        volumeControlPanel.style.padding = '10px';
        volumeControlPanel.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        volumeControlPanel.style.zIndex = '1000';
        
        // Add header with minimize button
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '10px';
        header.style.cursor = 'move';
        
        const title = document.createElement('h3');
        title.textContent = 'Volume Controls';
        title.style.margin = '0';
        
        const minimizeBtn = document.createElement('button');
        minimizeBtn.textContent = '-';
        minimizeBtn.style.background = 'none';
        minimizeBtn.style.border = 'none';
        minimizeBtn.style.color = 'white';
        minimizeBtn.style.fontSize = '16px';
        minimizeBtn.style.cursor = 'pointer';
        
        header.appendChild(title);
        header.appendChild(minimizeBtn);
        volumeControlPanel.appendChild(header);
        
        // Create container for controls
        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'volumeControlsContainer';
        controlsContainer.style.display = 'flex';
        controlsContainer.style.flexDirection = 'column';
        controlsContainer.style.gap = '8px';
        volumeControlPanel.appendChild(controlsContainer);
        
        // Array of instruments to create volume controls for
        const instruments = [
            { id: 'master', name: 'Master' }, // Place master volume first
            { id: 'kick', name: 'Kick' },
            { id: 'snare', name: 'Snare' },
            { id: 'hihat', name: 'Hi-hat' },
            { id: 'clap', name: 'Clap' },
            { id: 'rimshot', name: 'Rimshot' },
            { id: 'tom', name: 'Tom' },
            { id: 'cymbal', name: 'Cymbal' },
            { id: 'cowbell', name: 'Cowbell' },
            { id: 'bass808', name: '808 Bass' },
            { id: 'trapHihat', name: 'Trap Hi-hat' },
            { id: 'vocalChop', name: 'Vocal Chop' },
            { id: 'futureBass', name: 'Future Bass' },
            { id: 'synth', name: 'Synth' },
            { id: 'mic', name: 'Mic/Loop' }
        ];
        
        // Create volume controls for each instrument
        instruments.forEach(instrument => {
            const controlRow = document.createElement('div');
            controlRow.style.display = 'flex';
            controlRow.style.alignItems = 'center';
            controlRow.style.justifyContent = 'space-between';
            
            const label = document.createElement('label');
            label.textContent = instrument.name;
            label.style.minWidth = '70px';
            
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0';
            slider.max = '1';
            slider.step = '0.01';
            slider.value = '0.7';
            slider.id = `${instrument.id}Volume`;
            slider.style.width = '100px';
            
            const valueDisplay = document.createElement('span');
            valueDisplay.textContent = '70%';
            valueDisplay.id = `${instrument.id}VolumeValue`;
            valueDisplay.style.minWidth = '40px';
            valueDisplay.style.textAlign = 'right';
            
            controlRow.appendChild(label);
            controlRow.appendChild(slider);
            controlRow.appendChild(valueDisplay);
            
            controlsContainer.appendChild(controlRow);
            
            // Add event listener for volume change
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                valueDisplay.textContent = `${Math.round(value * 100)}%`;
                
                if (instrument.id === 'master') {
                    if (this.masterGain) {
                        this.masterGain.gain.value = value;
                    }
                } else {
                    // Update the gain node for this instrument if it exists
                    if (this.gainNodes && this.gainNodes[instrument.id]) {
                        this.gainNodes[instrument.id].gain.value = value;
                    }
                }
            });
        });
        
        // Add drag functionality
        let isDragging = false;
        let offsetX, offsetY;
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - volumeControlPanel.getBoundingClientRect().left;
            offsetY = e.clientY - volumeControlPanel.getBoundingClientRect().top;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                volumeControlPanel.style.left = (e.clientX - offsetX) + 'px';
                volumeControlPanel.style.top = (e.clientY - offsetY) + 'px';
                // Remove right position when manually positioning
                volumeControlPanel.style.right = 'auto';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Minimize button functionality
        minimizeBtn.addEventListener('click', () => {
            if (controlsContainer.style.display === 'none') {
                controlsContainer.style.display = 'flex';
                minimizeBtn.textContent = '-';
            } else {
                controlsContainer.style.display = 'none';
                minimizeBtn.textContent = '+';
            }
        });
        
        // Append the panel to the body
        document.body.appendChild(volumeControlPanel);
        
        // Set initial volumes
        instruments.forEach(instrument => {
            if (instrument.id === 'master') {
                if (this.masterGain) {
                    this.masterGain.gain.value = 0.7;
                }
            } else {
                if (this.gainNodes && this.gainNodes[instrument.id]) {
                    this.gainNodes[instrument.id].gain.value = 0.7;
                }
            }
        });
    }

    setupSoundStorage() {
        // Load saved songs from localStorage
        this.savedSongs = JSON.parse(localStorage.getItem('savedSongs') || '[]');
        
        // Migration: Check for legacy "savedSounds" format and upgrade to new format
        if (this.savedSongs.length === 0) {
            const legacySounds = JSON.parse(localStorage.getItem('savedSounds') || '[]');
            if (legacySounds.length > 0) {
                console.log('Migrating legacy saved sounds to new format...');
                
                // Convert each legacy sound to the new format
                for (const sound of legacySounds) {
                    const newSong = {
                        name: sound.name,
                        tempo: this.tempo,
                        currentKey: this.currentKey,
                        currentScale: this.currentScale,
                        currentOctave: this.currentOctave,
                        soundParams: sound.params || {},
                        synthParams: this.synthParams || {},
                        drumGrid: JSON.parse(JSON.stringify(this.grid)),
                        synthGrid: JSON.parse(JSON.stringify(this.synthGrid)),
                        date: sound.date || new Date().toISOString(),
                        version: '1.0',
                        migrated: true
                    };
                    
                    this.savedSongs.push(newSong);
                }
                
                // Save the migrated songs
                localStorage.setItem('savedSongs', JSON.stringify(this.savedSongs));
                
                // Clear legacy format to avoid double migration
                localStorage.removeItem('savedSounds');
                
                console.log('Migration complete. Migrated ' + legacySounds.length + ' songs.');
            }
        }
        
        this.updateSoundSelect();

        // Save sound button
        document.getElementById('saveSound').addEventListener('click', () => {
            const name = prompt('Enter a name for this song:');
            if (name) {
                this.saveSong(name);
            }
        });

        // Load sound button
        document.getElementById('loadSound').addEventListener('click', () => {
            const select = document.getElementById('soundSelect');
            const songName = select.value;
            if (songName) {
                this.loadSong(songName);
            }
        });

        // Delete sound button
        document.getElementById('deleteSound').addEventListener('click', () => {
            const select = document.getElementById('soundSelect');
            const songName = select.value;
            if (songName && confirm(`Are you sure you want to delete "${songName}"?`)) {
                this.deleteSong(songName);
            }
        });
    }

    saveSong(name) {
        // Create a complete snapshot of the current song state
        const song = {
            name,
            // Basic parameters
            tempo: this.tempo,
            currentKey: this.currentKey,
            currentScale: this.currentScale,
            currentOctave: this.currentOctave,
            
            // Sound parameters
            soundParams: JSON.parse(JSON.stringify(this.soundParams)),
            
            // Synth parameters
            synthParams: JSON.parse(JSON.stringify(this.synthParams)),
            
            // Grid patterns
            drumGrid: JSON.parse(JSON.stringify(this.grid)),
            synthGrid: JSON.parse(JSON.stringify(this.synthGrid)),
            
            // Metadata
            date: new Date().toISOString(),
            version: '1.0' // For future compatibility
        };

        // Check if song with this name already exists
        const existingIndex = this.savedSongs.findIndex(s => s.name === name);
        if (existingIndex >= 0) {
            if (confirm(`Song "${name}" already exists. Overwrite?`)) {
                this.savedSongs[existingIndex] = song;
        } else {
                return; // User canceled overwrite
            }
        } else {
            this.savedSongs.push(song);
        }

        // Save to localStorage
        localStorage.setItem('savedSongs', JSON.stringify(this.savedSongs));
        this.updateSoundSelect();
        
        // Show confirmation
        alert(`Song "${name}" saved successfully!`);
    }

    loadSong(name) {
        const song = this.savedSongs.find(s => s.name === name);
        if (!song) {
            alert("Song not found!");
            return;
        }
        
        try {
            // Stop playback if it's running
            if (this.isPlaying) {
                this.stop();
            }
            
            // Load basic parameters
            this.tempo = song.tempo || 120;
            this.currentKey = song.currentKey || 'C';
            this.currentScale = song.currentScale || 'ambient';
            this.currentOctave = song.currentOctave || 4;
            
            // Load sound parameters
            if (song.soundParams) {
                this.soundParams = JSON.parse(JSON.stringify(song.soundParams));
            }
            
            // Load synth parameters
            if (song.synthParams) {
                this.synthParams = JSON.parse(JSON.stringify(song.synthParams));
            }
            
            // Load grid patterns
            if (song.drumGrid) {
                this.grid = JSON.parse(JSON.stringify(song.drumGrid));
            }
            
            if (song.synthGrid) {
                this.synthGrid = JSON.parse(JSON.stringify(song.synthGrid));
            }
            
            // Update UI
            this.updateUI();
            
            // Regenerate sound generators
            this.soundGenerators = {
                kick: this.createKickGenerator(),
                snare: this.createSnareGenerator(),
                hihat: this.createHiHatGenerator(),
                clap: this.createClapGenerator(),
                rimshot: this.createRimshotGenerator(),
                tom: this.createTomGenerator(),
                cymbal: this.createCymbalGenerator(),
                cowbell: this.createCowbellGenerator(),
                bass808: this.create808BassGenerator(),
                trapHihat: this.createTrapHiHatGenerator(),
                vocalChop: this.createVocalChopGenerator(),
                futureBass: this.createFutureBassGenerator()
            };
            
            // Show confirmation
            alert(`Song "${name}" loaded successfully!`);
        } catch (error) {
            console.error("Error loading song:", error);
            alert("Error loading song. Check console for details.");
        }
    }

    updateUI() {
        // Update tempo and waveform selector
        document.getElementById('tempo').value = this.tempo;
        document.getElementById('tempoValue').textContent = this.tempo;
        
        if (this.synthParams && this.synthParams.waveform) {
            document.getElementById('synthWaveform').value = this.synthParams.waveform;
        }
        
        if (this.synthParams && this.synthParams.style) {
            document.getElementById('synthStyle').value = this.synthParams.style;
        }
        
        // Update Key display
        document.getElementById('currentKey').textContent = `${this.currentKey} ${this.currentScale}`;
        
        // Update keyboard guide if it exists
        const keyboardGuideScale = document.getElementById('keyboardCurrentScale');
        if (keyboardGuideScale) {
            keyboardGuideScale.textContent = `${this.currentKey} ${this.currentScale}`;
        }
        
        // Update octave display
        document.getElementById('currentOctave').textContent = this.currentOctave;
        
        // Update piano keyboard to reflect current octave
        if (this.updatePianoWithOctave) {
            this.updatePianoWithOctave();
        }
        
        // Update envelope controls
        if (this.synthParams) {
            ['attack', 'decay', 'sustain', 'release'].forEach(param => {
                if (this.synthParams[param] !== undefined) {
                    document.getElementById(`synth${param.charAt(0).toUpperCase() + param.slice(1)}`).value = this.synthParams[param];
                }
            });
        }
        
        // Update drum parameter controls
        if (this.soundParams) {
            if (this.soundParams.kick) {
            document.getElementById('kickFreq').value = this.soundParams.kick.frequency;
            document.getElementById('kickDecay').value = this.soundParams.kick.decay;
            }
            
            if (this.soundParams.snare) {
            document.getElementById('snareNoise').value = this.soundParams.snare.noiseAmount;
            document.getElementById('snareDecay').value = this.soundParams.snare.decay;
            }
            
            if (this.soundParams.hihat) {
            document.getElementById('hihatFreq').value = this.soundParams.hihat.frequency;
            document.getElementById('hihatDecay').value = this.soundParams.hihat.decay;
            }
            
            if (this.soundParams.clap) {
            document.getElementById('clapDelay').value = this.soundParams.clap.delay;
            document.getElementById('clapDecay').value = this.soundParams.clap.decay;
            }
            
            if (this.soundParams.rimshot) {
            document.getElementById('rimshotFreq').value = this.soundParams.rimshot.frequency;
            document.getElementById('rimshotDecay').value = this.soundParams.rimshot.decay;
            }
            
            if (this.soundParams.tom) {
            document.getElementById('tomFreq').value = this.soundParams.tom.frequency;
            document.getElementById('tomDecay').value = this.soundParams.tom.decay;
            }
            
            if (this.soundParams.cymbal) {
            document.getElementById('cymbalFreq').value = this.soundParams.cymbal.frequency;
            document.getElementById('cymbalDecay').value = this.soundParams.cymbal.decay;
            }
            
            if (this.soundParams.cowbell) {
            document.getElementById('cowbellFreq').value = this.soundParams.cowbell.frequency;
            document.getElementById('cowbellDecay').value = this.soundParams.cowbell.decay;
            }
        }
        
        // Clear existing grids and recreate them with saved data
        this.createGrid();
        
        // Update grid visuals
        this.updateDrumGrid();
        this.updateSynthGrid();
    }
    
    updateDrumGrid() {
        // Update drum grid visualization
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.steps; j++) {
                const cell = document.querySelector(`.beat-cell[data-sound="${i}"][data-step="${j}"]`);
                if (cell) {
                    if (this.grid[i][j]) {
                        cell.classList.add('active');
                    } else {
                        cell.classList.remove('active');
                    }
                }
            }
        }
    }

    deleteSong(name) {
        this.savedSongs = this.savedSongs.filter(s => s.name !== name);
        localStorage.setItem('savedSongs', JSON.stringify(this.savedSongs));
        this.updateSoundSelect();
    }

    updateSoundSelect() {
        const select = document.getElementById('soundSelect');
        select.innerHTML = '';
        
        if (this.savedSongs && this.savedSongs.length > 0) {
            this.savedSongs.forEach(song => {
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
                
                option.textContent = `${song.name} (${dateStr})`;
            select.appendChild(option);
        });
        } else {
            // Add a placeholder option if no songs are saved
            const option = document.createElement('option');
            option.value = '';
            option.textContent = '-- No saved songs --';
            option.disabled = true;
            select.appendChild(option);
        }
    }

    createGrid() {
        const beatGrid = document.querySelector('.beat-grid');
        beatGrid.innerHTML = '';
        
        const drumSounds = ['kick', 'snare', 'hihat', 'clap', 'rimshot', 'tom', 'cymbal', 'cowbell', 'bass808', 'trapHihat', 'vocalChop', 'futureBass'];
        
        // Ensure grid is properly initialized with 12 rows (including modern instruments)
        if (!this.grid || this.grid.length !== 12) {
            this.grid = Array(12).fill().map(() => Array(this.steps).fill(false));
        }
        
        // Create drum and modern instrument cells
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < this.steps; j++) {
                const cell = document.createElement('div');
                cell.className = 'beat-cell';
                
                // Add quarter note indicators
                if (j % 4 === 0) {
                    cell.classList.add('quarter');
                }
                
                // Add modern sound indicators for better visual distinction
                if (i >= 8) {
                    cell.classList.add('modern-sound');
                }
                
                // Check if this cell should be active
                if (this.grid[i] && this.grid[i][j]) {
                    cell.classList.add('active');
                }
                
                cell.addEventListener('click', () => {
                    this.toggleCell(i, j);
                });
                
                beatGrid.appendChild(cell);
            }
        }
    }
    
    toggleCell(soundIndex, step) {
        // Toggle the cell state
        this.grid[soundIndex][step] = !this.grid[soundIndex][step];
        
        // Update UI to reflect the change
        const cells = document.querySelectorAll('.beat-cell');
        const cellIndex = soundIndex * this.steps + step;
        
        if (this.grid[soundIndex][step]) {
            cells[cellIndex].classList.add('active');
            
            // Play the sound if toggled on
            if (this.isPlaying) {
                const soundNames = ['kick', 'snare', 'hihat', 'clap', 'rimshot', 'tom', 'cymbal', 'cowbell', 'bass808', 'trapHihat', 'vocalChop', 'futureBass'];
                const soundName = soundNames[soundIndex];
                this.playSound(soundName, this.audioContext.currentTime);
            }
        } else {
            cells[cellIndex].classList.remove('active');
        }
    }
    
    // Create the synth grid
    createSynthGrid() {
        const synth = document.querySelector('.synth-grid');
        synth.innerHTML = '';
        
        // Ensure synthGrid is properly initialized
        if (!this.synthGrid || this.synthGrid.length !== this.pianoNotes.length) {
            this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
        }
        
        // Use this.pianoNotes here to create the grid
        // Each row corresponds to a note, and each column corresponds to a step
        for (let i = 0; i < this.pianoNotes.length; i++) {
            for (let j = 0; j < this.steps; j++) {
                const cell = document.createElement('div');
                cell.className = 'synth-cell';
                
                // Add class to highlight quarter notes
                if (j % 4 === 0) {
                    cell.classList.add('quarter');
                }
                
                // Set data attributes for note and step
                cell.dataset.note = this.pianoNotes[i];
                cell.dataset.step = j;
                
                // Check if this cell should be active
                if (this.synthGrid[i] && this.synthGrid[i][j]) {
                    cell.classList.add('active');
                }
                
                cell.addEventListener('click', () => {
                    this.toggleSynthCell(i, j);
                });
                
                synth.appendChild(cell);
            }
        }
        
        // Setup the piano keyboard
        this.setupPianoKeyboard(this.pianoNotes);
    }
    
    toggleSynthCell(noteIndex, step) {
        const note = this.pianoNotes[noteIndex];
        
        // Make sure synthGrid is initialized properly
        if (!this.synthGrid[noteIndex]) {
            this.synthGrid[noteIndex] = Array(this.steps).fill(false);
        }
        
        // Toggle the cell state
        this.synthGrid[noteIndex][step] = !this.synthGrid[noteIndex][step];
        
        // Update the UI to reflect the change
        const cells = document.querySelectorAll('.synth-cell');
        const cellIndex = noteIndex * this.steps + step;
        
        if (this.synthGrid[noteIndex][step]) {
            cells[cellIndex].classList.add('active');
            
            // Play the note immediately when toggled on
            if (this.isPlaying) {
                this.playSynthNote(note, this.audioContext.currentTime);
            } else {
                // Preview the note even if not playing
                this.playSynthNote(note, this.audioContext.currentTime);
            }
        } else {
            cells[cellIndex].classList.remove('active');
        }
    }
    
    // Setup piano keyboard interactions
    setupPianoKeyboard(notes) {
        const pianoKeys = document.querySelectorAll('.piano-key');
        
        pianoKeys.forEach((key) => {
            const note = key.dataset.note;
            
            // Map notes to grid indices by finding the index in the notes array
            const noteIndex = notes.indexOf(note);
            
            // Click to select note for sequencer
            key.addEventListener('click', () => {
                // Deselect all piano keys
                document.querySelectorAll('.piano-key').forEach(k => k.classList.remove('selected'));
                
                // Deselect all note buttons
                document.querySelectorAll('.note-btn').forEach(btn => btn.classList.remove('active'));
                
                // Select this key
                key.classList.add('selected');
                
                // Set as selected note (for grid placement)
                this.selectedNote = note;
                
                // Select the corresponding note button if exists
                const noteWithoutSymbol = note.replace('♯', '#').replace('♭', 'b');
                const matchingButton = document.querySelector(`.note-btn[data-note="${noteWithoutSymbol}"]`);
                if (matchingButton) {
                    matchingButton.classList.add('active');
                }
                
                // Preview the note
                this.playSynthNote(note, this.audioContext.currentTime);
            });
            
            // Mouse down - play note and highlight active cells in that row
            key.addEventListener('mousedown', (e) => {
                // Prevent click event if this is part of a drag operation
                if (e.buttons !== 1) return;
                
                // Highlight the key
                key.classList.add('active');
                
                // Play the note
                this.playSynthNote(note, this.audioContext.currentTime);
                
                // Highlight all active cells in this row (if valid note index)
                if (noteIndex !== -1) {
                    document.querySelectorAll(`.synth-cell[data-note="${noteIndex}"].active`).forEach(cell => {
                        cell.classList.add('highlighted');
                    });
                }
            });
            
            // Mouse up - remove highlighting
            key.addEventListener('mouseup', () => {
                key.classList.remove('active');
                document.querySelectorAll('.synth-cell.highlighted').forEach(cell => {
                    cell.classList.remove('highlighted');
                });
            });
            
            // Mouse leave - remove highlighting
            key.addEventListener('mouseleave', () => {
                key.classList.remove('active');
                document.querySelectorAll('.synth-cell.highlighted').forEach(cell => {
                    cell.classList.remove('highlighted');
                });
            });
        });
    }

    setupEventListeners() {
        // Play, stop, clear, and randomize buttons
        document.getElementById('playBtn').addEventListener('click', () => this.start());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomize());
        
        // Clear and randomize synth buttons
        document.getElementById('clearSynth').addEventListener('click', () => {
            this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
            this.updateSynthGrid();
        });
        document.getElementById('randomizeSynth').addEventListener('click', () => this.randomizeSynthPattern());
        
        // Set up keyboard bindings for playing notes
        this.setupKeyboardPerformance();
    }
    
    // Setup keyboard performance mode with right-side keys
    setupKeyboardPerformance() {
        // Map keys to scale degrees (1-based)
        const keyMap = {
            '7': 1, // Root note
            '8': 2, // 2nd note of scale
            '9': 3, // 3rd note of scale
            '0': 4, // 4th note of scale
            '-': 5, // 5th note of scale
            '=': 6, // 6th note of scale
            'y': 7, // 7th note of scale
            'u': 8, // Octave
            'i': -1, // Root note one octave lower
            'o': -2, // 2nd note one octave lower
            'p': -3, // 3rd note one octave lower
        };

        // Keep track of currently playing keyboard notes
        this.keyboardNotes = {};

        // Key display names for the guide
        const keyDisplayNames = {
            '7': '7', '8': '8', '9': '9', '0': '0', '-': '-', '=': '=',
            'y': 'Y', 'u': 'U', 'i': 'I', 'o': 'O', 'p': 'P'
        };

        // Create and append keyboard guide
        this.createKeyboardGuide(keyMap, keyDisplayNames);

        // Event listener for keydown - play note
        document.addEventListener('keydown', (event) => {
            // Skip if we're typing in an input field or form control
            if (window.isFormControlFocused?.() || 
                event.target.tagName === 'INPUT' || 
                event.target.tagName === 'TEXTAREA') {
                return;
            }

            const key = event.key;

            // Toggle keyboard guide visibility with 'K' key
            if (key.toLowerCase() === 'k') {
                this.toggleKeyboardGuide();
                return;
            }

            // Check if the pressed key is in our map and not already playing
            if (keyMap[key] !== undefined && !this.keyboardNotes[key]) {
                // Audio context needs to be running - ensure it's started
                if (this.audioContext.state !== 'running') {
                    this.audioContext.resume().catch(console.error);
                }

                // Get scale degree (1-based)
                const scaleDegree = keyMap[key];
                
                // Get the current scale notes
                const scaleNotes = this.getScaleNotes(this.currentKey, this.currentScale);
                
                // Calculate the note to play
                let noteIdx;
                if (scaleDegree > 0) {
                    // Positive scale degrees are in the current octave
                    noteIdx = (scaleDegree - 1) % scaleNotes.length;
                } else {
                    // Negative scale degrees are in the lower octave
                    noteIdx = (scaleNotes.length + scaleDegree) % scaleNotes.length;
                }
                
                // Get the note
                const note = scaleNotes[noteIdx];
                
                // Calculate octave based on scale degree
                let octaveOffset = 0;
                if (scaleDegree < 0) {
                    octaveOffset = -1; // Lower octave for negative scale degrees
                } else if (scaleDegree > scaleNotes.length) {
                    octaveOffset = 1; // Higher octave for scale degrees > scale length
                }
                
                // Final note with octave
                const finalNote = `${note}${this.currentOctave + octaveOffset}`;
                
                // Play the note and show info
                this.playKeyboardNote(finalNote, key);
                this.showKeyboardNoteInfo(finalNote, keyDisplayNames[key]);
                
                // Show in UI which note is being played
                const noteDisplay = document.getElementById('currentNote');
                if (noteDisplay) {
                    noteDisplay.textContent = finalNote;
                }
            }
        });

        // Event listener for keyup - stop note
        document.addEventListener('keyup', (event) => {
            // We still process keyup events for keys that were already playing,
            // even if a form control is now focused
            const key = event.key;
            
            if (this.keyboardNotes[key]) {
                this.stopKeyboardNote(key);
                delete this.keyboardNotes[key];
                
                // If no more keys are pressed, hide the note info and restore the note display
                if (Object.keys(this.keyboardNotes).length === 0) {
                    this.hideKeyboardNoteInfo();
                    
                    // Reset current note display
                    const noteDisplay = document.getElementById('currentNote');
                    if (noteDisplay) {
                        noteDisplay.textContent = '--';
                    }
                } else {
                    // If other keys are still being played, show the most recent one
                    const lastKey = Object.keys(this.keyboardNotes).pop();
                    const lastNote = this.keyboardNotes[lastKey].note;
                    
                    // Update note display
                    const noteDisplay = document.getElementById('currentNote');
                    if (noteDisplay) {
                        noteDisplay.textContent = lastNote;
                    }
                }
            }
        });
    }
    
    // Create a visual guide for keyboard controls
    createKeyboardGuide(keyMap, keyDisplayNames) {
        // Create scale degree names for display
        const scaleNames = {
            1: 'Root', 2: '2nd', 3: '3rd', 4: '4th', 
            5: '5th', 6: '6th', 7: '7th', 8: 'Octave',
            '-1': 'Root -8va', '-2': '2nd -8va', '-3': '3rd -8va'
        };

        // Create the guide element
        const guide = document.createElement('div');
        guide.classList.add('keyboard-guide');
        guide.style.display = 'none'; // Hidden by default

        // Add title and description
        guide.innerHTML = `
            <h4>Keyboard Performance</h4>
            <p>Current scale: <span id="keyboardCurrentScale">${this.currentKey} ${this.currentScale}</span></p>
            <p>Play notes using these keys:</p>
            <ul>
                ${Object.entries(keyMap).map(([key, degree]) => 
                    `<li><span class="keyboard-key">${keyDisplayNames[key]}</span> - ${scaleNames[degree]}</li>`
                ).join('')}
            </ul>
            <p>Press <span class="keyboard-key">K</span> to toggle this guide</p>
        `;

        // Add to the DOM
        document.body.appendChild(guide);
        this.keyboardGuide = guide;
    }
    
    // Toggle keyboard guide visibility
    toggleKeyboardGuide() {
        const guide = document.querySelector('.keyboard-guide');
        if (guide) {
            // Update current scale info
            const scaleInfo = guide.querySelector('#keyboardCurrentScale');
            if (scaleInfo) {
                scaleInfo.textContent = `${this.currentKey} ${this.currentScale}`;
            }
            
            // Toggle visibility
            guide.style.display = guide.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    // Play a note using the keyboard performance
    playKeyboardNote(note, keyCode) {
        // Use the main audio context
        if (!this.audioContext) return;
        
        // Create oscillator and gain nodes
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Create a filter for additional shaping
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 5000;
        filter.Q.value = 1;
        
        // Use the current synth settings
        oscillator.type = this.synthParams.waveform || 'sine';
        
        // Get the frequency for this note
        const frequency = this.getNoteFrequency(note);
        if (!frequency) return;
        
        oscillator.frequency.value = frequency;
        
        // Set envelope (faster attack for responsive keyboard playing)
        const attack = Math.min(this.synthParams.attack, 0.05); // Faster attack for keyboard
        const decay = this.synthParams.decay || 0.2;
        const sustain = this.synthParams.sustain || 0.5;
        const release = this.synthParams.release || 0.3;
        const volume = this.synthParams.volume || 0.8;
        
        // Apply envelope
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + attack);
        gainNode.gain.linearRampToValueAtTime(sustain * volume, this.audioContext.currentTime + attack + decay);
        
        // Determine octave for low frequency compensation
        const match = note.match(/[A-G][#♯♭b]?(\d+)/);
        const octave = match ? parseInt(match[1]) : 4;
        
        // Apply octave-based adjustments for better balance
        if (octave <= 3) {
            // Apply a bit more volume to lower octaves
            const boostFactor = 1.2;
            gainNode.gain.value = Math.min(volume * boostFactor, 1.0);
            // Lower filter cutoff for warmer bass
            filter.frequency.value = 3000;
        }
        
        // Connect through the synth gain node (not directly to destination)
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.gainNodes.synth);
        
        // Start the oscillator
        oscillator.start();
        
        // Store the nodes so we can stop them later
        this.keyboardNotes[keyCode] = { 
            oscillator, 
            gainNode, 
            filter,
            note,
            startTime: this.audioContext.currentTime 
        };
    }
    
    // Stop a note that was playing via keyboard
    stopKeyboardNote(keyCode) {
        const noteInfo = this.keyboardNotes[keyCode];
        if (!noteInfo) return;
        
        const { oscillator, gainNode, filter, startTime } = noteInfo;
        const release = this.synthParams.release || 0.3;
        const now = this.audioContext.currentTime;
        
        // Ensure note has played for at least a minimum duration
        const minDuration = 0.1;
        const releaseStart = Math.max(now, startTime + minDuration);
        
        // Apply release envelope
        gainNode.gain.cancelScheduledValues(releaseStart);
        gainNode.gain.setValueAtTime(gainNode.gain.value, releaseStart);
        gainNode.gain.linearRampToValueAtTime(0, releaseStart + release);
        
        // Schedule oscillator stop after release
        setTimeout(() => {
            try {
                oscillator.stop();
                oscillator.disconnect();
                if (filter) filter.disconnect();
                gainNode.disconnect();
                delete this.keyboardNotes[keyCode];
            } catch (e) {
                // Ignore errors from stopping already stopped nodes
            }
        }, (releaseStart - now + release) * 1000 + 50);
    }
    
    // Show visual feedback for the key being played
    showKeyboardNoteInfo(note, key) {
        // Create info panel if it doesn't exist
        if (!document.querySelector('.keyboard-performance-info')) {
            const infoPanel = document.createElement('div');
            infoPanel.classList.add('keyboard-performance-info');
            infoPanel.innerHTML = `
                <div class="info-panel">
                    <div class="played-note"></div>
                    <div class="key-pressed"></div>
                </div>
            `;
            document.body.appendChild(infoPanel);
        }

        // Update the info
        const playedNoteEl = document.querySelector('.played-note');
        const keyPressedEl = document.querySelector('.key-pressed');
        
        if (playedNoteEl && keyPressedEl) {
            // Format the note for display (e.g., C4, F#3)
            playedNoteEl.textContent = note;
            keyPressedEl.textContent = `Key: ${key}`;
            
            // Show the info panel
            document.querySelector('.keyboard-performance-info').style.display = 'block';
        }
    }
    
    // Hide visual feedback
    hideKeyboardNoteInfo() {
        // Hide the info panel after a short delay (to avoid flickering)
        setTimeout(() => {
            const infoPanel = document.querySelector('.keyboard-performance-info');
            if (infoPanel && Object.keys(this.keyboardNotes).length === 0) {
                infoPanel.style.display = 'none';
            }
        }, 200);
    }

    randomize() {
        // Clear the grid first
        this.clear();
        
        // Select a random key and scale
        this.currentKey = this.rootNotes[Math.floor(Math.random() * this.rootNotes.length)];
        const scaleOptions = Object.keys(this.scales);
        this.currentScale = scaleOptions[Math.floor(Math.random() * scaleOptions.length)];
        
        // Update the UI to reflect the new key and scale
        document.getElementById('currentKey').textContent = `${this.currentKey} ${this.currentScale}`;
        
        // Common drum patterns for each sound
        const patterns = {
            kick: [
                [0, 4, 8, 12],    // Basic four-on-the-floor
                [0, 7, 12],       // Common rock pattern
                [0, 3, 6, 10, 12] // Hip-hop pattern
            ],
            snare: [
                [4, 12],          // Basic backbeat
                [4, 8, 12],       // Double-time feel
                [4, 11, 12]       // Syncopated pattern
            ],
            hihat: [
                [0, 2, 4, 6, 8, 10, 12, 14],  // Straight eighths
                [0, 3, 6, 9, 12, 15],         // Triplet feel
                [0, 4, 8, 12]                 // Quarter notes
            ],
            clap: [
                [4, 12],          // Basic backbeat
                [2, 6, 10, 14],   // Off-beat pattern
                [3, 7, 11, 15]    // Syncopated pattern
            ],
            rimshot: [
                [2, 10],                     // Sparse pattern
                [3, 8, 11],                  // Accents
                [5, 13]                      // Alternate backbeat
            ],
            tom: [
                [1, 9],                      // Fill pattern
                [7, 8, 9],                   // Quick fill
                [14, 15]                     // End-of-bar fill
            ],
            cymbal: [
                [0],                         // Start accent
                [8],                         // Mid-pattern accent
                [15]                         // End accent
            ],
            cowbell: [
                [2, 6, 10, 14],              // Off-beats
                [0, 8],                      // Downbeats
                [4, 12]                      // Backbeat accent
            ]
        };

        // Randomly select a pattern for each sound
        const soundNames = Object.keys(this.soundGenerators);
        
        // Get all beat cells
        const beatCells = document.querySelectorAll('.beat-cell');
        
        this.grid.forEach((soundRow, soundIndex) => {
            if (soundIndex >= soundNames.length) return;
            
            const soundName = soundNames[soundIndex];
            const soundPatterns = patterns[soundName];
            
            if (!soundPatterns) {
                console.log(`No patterns defined for ${soundName}`);
                return;
            }
            
            const selectedPattern = soundPatterns[Math.floor(Math.random() * soundPatterns.length)];
            
            // Apply the selected pattern
            selectedPattern.forEach(step => {
                this.grid[soundIndex][step] = true;
                
                // Find and style the corresponding cell - using the grid index based on our grid layout
                const cellIndex = soundIndex * this.steps + step;
                if (cellIndex < beatCells.length) {
                    beatCells[cellIndex].classList.add('active');
                }
            });

            // Add some variation (30% chance to add an extra hit)
            if (Math.random() < 0.3) {
                const availableSteps = Array.from({length: this.steps}, (_, i) => i)
                    .filter(step => !selectedPattern.includes(step));
                if (availableSteps.length > 0) {
                    const extraStep = availableSteps[Math.floor(Math.random() * availableSteps.length)];
                    this.grid[soundIndex][extraStep] = true;
                    
                    // Find and style the corresponding cell
                    const cellIndex = soundIndex * this.steps + extraStep;
                    if (cellIndex < beatCells.length) {
                        beatCells[cellIndex].classList.add('active');
                    }
                }
            }
        });
        
        // Also randomize the synth pattern based on the selected key
        this.randomizeSynthPattern();
    }

    toggleCell(soundIndex, step) {
        this.grid[soundIndex][step] = !this.grid[soundIndex][step];
        
        // No need to update visual state, the click handler does this
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.currentStep = 0;
        
        // Reset the next step time
        this.nextStepTime = this.audioContext.currentTime;
        
        // Start the step sequencer
        this.scheduleStep();
    }

    stop() {
        this.isPlaying = false;
        this.nextStepTime = null;
        this.updateCurrentStepIndicator();
    }

    clear() {
        // Update for all instruments in the grid
        const numSounds = Object.keys(this.soundGenerators).length;
        this.grid = Array(numSounds).fill().map(() => Array(this.steps).fill(false));
        this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));

        // Update visuals
        document.querySelectorAll('.beat-cell').forEach(cell => {
            cell.classList.remove('active');
        });
        
        document.querySelectorAll('.synth-cell').forEach(cell => {
            cell.classList.remove('active');
        });
        
        // Update current step indicator
        this.updateCurrentStepIndicator();
    }

    updateCurrentStepIndicator() {
        // Remove the current step indicator from all cells
        document.querySelectorAll('.beat-cell').forEach(cell => {
            cell.classList.remove('current');
        });
        
        document.querySelectorAll('.synth-cell').forEach(cell => {
            cell.classList.remove('current');
        });
        
        // Add the current step indicator to cells in the current step
        const currentStep = this.currentStep;
        
        // Get all cells from the DOM
        const beatCells = document.querySelectorAll('.beat-cell');
        const synthCells = document.querySelectorAll('.synth-cell');
        
        // Make sure we have cells before attempting to add classes
        if (beatCells.length > 0) {
            // Drum cells
            for (let i = 0; i < 8; i++) {
                const cellIndex = i * this.steps + currentStep;
                if (cellIndex < beatCells.length) {
                    beatCells[cellIndex].classList.add('current');
                }
            }
        }
        
        // Make sure we have synth cells before attempting to add classes
        if (synthCells.length > 0) {
            // Synth cells
            for (let i = 0; i < this.pianoNotes.length; i++) {
                const cellIndex = i * this.steps + currentStep;
                if (cellIndex < synthCells.length) {
                    synthCells[cellIndex].classList.add('current');
                }
            }
        }
    }

    scheduleStep() {
        if (!this.isPlaying) return;

        // Get current time from audio context for precision
        const currentTime = this.audioContext.currentTime;

        // Calculate the time for the next step
        const stepTime = 60 / this.tempo; // Convert BPM to seconds per beat
        this.nextStepTime = this.nextStepTime || currentTime;

        // If it's time for the next step
        if (currentTime >= this.nextStepTime) {
            // Play sounds for current step
            this.playStep(this.currentStep);
            
            // Update visual indicators
            this.updateCurrentStepIndicator();

            // Move to next step
            this.currentStep = (this.currentStep + 1) % this.steps;
            
            // Calculate next step time
            this.nextStepTime += stepTime;
            
            // If we've fallen too far behind, reset to avoid spiral of death
            if (this.nextStepTime < currentTime) {
                this.nextStepTime = currentTime + stepTime;
            }
        }

        // Schedule the next check using requestAnimationFrame
        requestAnimationFrame(() => this.scheduleStep());
    }

    playStep(step) {
        // Play drum sounds
        const beatCells = document.querySelectorAll('.beat-cell');
        const drumSounds = ['kick', 'snare', 'hihat', 'clap', 'rimshot', 'tom', 'cymbal', 'cowbell'];
        
        // Make sure grid is initialized
        if (!this.grid || this.grid.length === 0) {
            this.grid = Array(8).fill().map(() => Array(this.steps).fill(false));
        }
        
        drumSounds.forEach((sound, i) => {
            if (this.grid[i] && this.grid[i][step]) {
                this.playSound(sound, this.audioContext.currentTime);
                
                // Highlight the active cell
                const cellIndex = i * this.steps + step;
                if (beatCells[cellIndex]) {
                    beatCells[cellIndex].classList.add('playing');
                        setTimeout(() => {
                        beatCells[cellIndex].classList.remove('playing');
                        }, 100);
                }
            }
        });
        
        // Play synth notes
        const synthCells = document.querySelectorAll('.synth-cell');
        
        // Make sure synthGrid is initialized
        if (!this.synthGrid || this.synthGrid.length === 0) {
            this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
        }
        
        // Loop through each note in this step
        for (let i = 0; i < this.pianoNotes.length; i++) {
            // If there's an active note at this step
            if (this.synthGrid[i] && this.synthGrid[i][step]) {
                const note = this.pianoNotes[i];
                this.playSynthNote(note, this.audioContext.currentTime);
                
                // Highlight the active cell
                const cellIndex = i * this.steps + step;
                if (synthCells[cellIndex]) {
                    synthCells[cellIndex].classList.add('playing');
                        setTimeout(() => {
                        synthCells[cellIndex].classList.remove('playing');
                        }, 100);
                    }
            }
        }
        
        // Update the current step indicator
        this.updateCurrentStepIndicator();
    }

    playSound(soundName, time) {
        console.log(`Playing sound: ${soundName}, time: ${time}`);
        const generator = this.soundGenerators[soundName];
        if (generator) {
            console.log(`Using generator for ${soundName}, params:`, this.soundParams[soundName]);
            generator(time, this.gainNodes[soundName]);
        }
    }

    // Kick sound generator
    createKickGenerator() {
        return (time) => {
            console.log('Kick generator called with time:', time);
            console.log('Kick params:', JSON.stringify(this.soundParams.kick));
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.frequency.value = this.soundParams.kick.frequency;
            gainNode.gain.value = this.soundParams.kick.volume;
            
            oscillator.connect(gainNode);
            gainNode.connect(this.gainNodes.kick);
            
            oscillator.start(time);
            oscillator.stop(time + this.soundParams.kick.duration);
            
            // Pitch envelope
            oscillator.frequency.exponentialRampToValueAtTime(
                this.soundParams.kick.frequency * 0.01,
                time + this.soundParams.kick.duration
            );
            
            // Volume envelope
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                time + this.soundParams.kick.duration
            );
        };
    }
    
    // Snare sound generator
    createSnareGenerator() {
        return (time) => {
            // Oscillator for the tone component
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'triangle';
            oscillator.frequency.value = this.soundParams.snare.frequency;
            gainNode.gain.value = this.soundParams.snare.volume * 0.5;
            
            oscillator.connect(gainNode);
            
            // Noise for the noise component
            const noiseBuffer = this.audioContext.createBuffer(
                1, 
                this.audioContext.sampleRate * 0.1, 
                this.audioContext.sampleRate
            );
            const noiseData = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < noiseBuffer.length; i++) {
                noiseData[i] = Math.random() * 2 - 1;
            }
            
            const noise = this.audioContext.createBufferSource();
            noise.buffer = noiseBuffer;
            
            const noiseGain = this.audioContext.createGain();
            noiseGain.gain.value = this.soundParams.snare.volume * 0.5;
            
            // Filter the noise
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            
            noise.connect(filter);
            filter.connect(noiseGain);
            
            // Connect both components to the output
            gainNode.connect(this.gainNodes.snare);
            noiseGain.connect(this.gainNodes.snare);
            
            // Start and stop
            oscillator.start(time);
            oscillator.stop(time + this.soundParams.snare.duration);
            
            noise.start(time);
            noise.stop(time + this.soundParams.snare.duration);
            
            // Volume envelopes
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                time + this.soundParams.snare.duration
            );
            
            noiseGain.gain.exponentialRampToValueAtTime(
                0.01,
                time + this.soundParams.snare.duration
            );
        };
    }
    
    // Hi-hat sound generator
    createHiHatGenerator() {
        return (time) => {
            const duration = this.soundParams.hihat.duration;
            const buffer = this.audioContext.createBuffer(
                1, 
                this.audioContext.sampleRate * duration, 
                this.audioContext.sampleRate
            );
            const data = buffer.getChannelData(0);
            
            // Fill with white noise
            for (let i = 0; i < buffer.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = this.audioContext.createBufferSource();
            noise.buffer = buffer;
            
            // Create a filter to shape the sound
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = this.soundParams.hihat.frequency;
            filter.Q.value = 8;
            
            // Create gain node for volume control
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.soundParams.hihat.volume;
            
            // Connect everything
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.gainNodes.hihat);
            
            // Start and stop
            noise.start(time);
            noise.stop(time + duration);
            
            // Volume envelope
            gainNode.gain.setValueAtTime(this.soundParams.hihat.volume, time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);
        };
    }
    
    // Clap sound generator
    createClapGenerator() {
        console.log('Creating clap generator, params:', JSON.stringify(this.soundParams.clap));
        return (time) => {
            console.log('Clap generator called with time:', time);
            console.log('Clap params:', JSON.stringify(this.soundParams.clap));
            
            const duration = this.soundParams.clap.duration;
            const delayTime = 0.01; // Delay between clap layers
            
            // Create multiple layers of noise to simulate a clap
            for (let i = 0; i < 4; i++) {
                const layerTime = time + (i * delayTime);
                console.log(`Clap layer ${i}, layerTime: ${layerTime}`);
                
                // Create a short noise burst
                const buffer = this.audioContext.createBuffer(
                    1, 
                    this.audioContext.sampleRate * 0.1, 
                    this.audioContext.sampleRate
                );
                const data = buffer.getChannelData(0);
                
                for (let j = 0; j < buffer.length; j++) {
                    data[j] = Math.random() * 2 - 1;
                }
                
                const noise = this.audioContext.createBufferSource();
                noise.buffer = buffer;
                
                // Shape the sound with a bandpass filter
                const filter = this.audioContext.createBiquadFilter();
                filter.type = 'bandpass';
                console.log(`Clap frequency value: ${this.soundParams.clap.frequency}`);
                filter.frequency.value = this.soundParams.clap.frequency || 1000; // Use default if undefined
                filter.Q.value = 1;
                
                // Gain node for volume and envelope
                const gainNode = this.audioContext.createGain();
                gainNode.gain.value = this.soundParams.clap.volume * (i === 3 ? 1 : 0.7);
                
                // Connect
                noise.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(this.gainNodes.clap);
                
                // Start and stop
                noise.start(layerTime);
                noise.stop(layerTime + 0.1);
                
                // Volume envelope
                gainNode.gain.setValueAtTime(gainNode.gain.value, layerTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, layerTime + 0.1);
            }
        };
    }
    
    // Rimshot sound generator
    createRimshotGenerator() {
        return (time) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = "square";
            oscillator.frequency.value = this.soundParams.rimshot.frequency;
            gainNode.gain.value = this.soundParams.rimshot.volume;
            
            // Add a filter for more character
            const filter = this.audioContext.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.value = this.soundParams.rimshot.frequency * 2;
            filter.Q.value = 2;
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.gainNodes.rimshot);
            
            oscillator.start(time);
            oscillator.stop(time + this.soundParams.rimshot.duration);
            
            // Quick attack and decay for a percussive sound
            gainNode.gain.setValueAtTime(this.soundParams.rimshot.volume, time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + this.soundParams.rimshot.duration);
        };
    }
    
    // Tom sound generator
    createTomGenerator() {
        return (time) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = "sine";
            oscillator.frequency.value = this.soundParams.tom.frequency;
            gainNode.gain.value = this.soundParams.tom.volume;
            
            oscillator.connect(gainNode);
            gainNode.connect(this.gainNodes.tom);
            
            oscillator.start(time);
            oscillator.stop(time + this.soundParams.tom.duration);
            
            // Pitch down for tom effect
            oscillator.frequency.exponentialRampToValueAtTime(
                this.soundParams.tom.frequency * 0.5,
                time + this.soundParams.tom.duration
            );
            
            // Volume envelope
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                time + this.soundParams.tom.duration
            );
        };
    }
    
    // Cymbal sound generator
    createCymbalGenerator() {
        return (time) => {
            const duration = this.soundParams.cymbal.duration;
            const buffer = this.audioContext.createBuffer(
                1, 
                this.audioContext.sampleRate * duration, 
                this.audioContext.sampleRate
            );
            const data = buffer.getChannelData(0);
            
            // Fill with white noise
            for (let i = 0; i < buffer.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = this.audioContext.createBufferSource();
            noise.buffer = buffer;
            
            // Create multiple filters for cymbal character
            const highpassFilter = this.audioContext.createBiquadFilter();
            highpassFilter.type = "highpass";
            highpassFilter.frequency.value = this.soundParams.cymbal.frequency;
            
            const resonanceFilter = this.audioContext.createBiquadFilter();
            resonanceFilter.type = "peaking";
            resonanceFilter.frequency.value = this.soundParams.cymbal.frequency * 0.8;
            resonanceFilter.Q.value = 5;
            resonanceFilter.gain.value = 10;
            
            // Create gain node for volume control
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.soundParams.cymbal.volume;
            
            // Connect everything
            noise.connect(highpassFilter);
            highpassFilter.connect(resonanceFilter);
            resonanceFilter.connect(gainNode);
            gainNode.connect(this.gainNodes.cymbal);
            
            // Start and stop
            noise.start(time);
            noise.stop(time + duration);
            
            // Volume envelope - longer sustain for cymbal
            gainNode.gain.setValueAtTime(this.soundParams.cymbal.volume, time);
            gainNode.gain.exponentialRampToValueAtTime(this.soundParams.cymbal.volume * 0.3, time + duration * 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);
        };
    }
    
    // Cowbell sound generator
    createCowbellGenerator() {
        return (time) => {
            // Create two oscillators for the cowbell
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            
            // Use square waves for metallic sound
            osc1.type = "square";
            osc2.type = "square";
            
            // Cowbell frequencies (classic cowbell uses two specific frequencies)
            osc1.frequency.value = this.soundParams.cowbell.frequency;
            osc2.frequency.value = this.soundParams.cowbell.frequency * 1.5;
            
            // Create a gain node for volume control
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.soundParams.cowbell.volume;
            
            // Add a bandpass filter for cowbell timbre
            const filter = this.audioContext.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.value = this.soundParams.cowbell.frequency * 2;
            filter.Q.value = 3;
            
            // Connect the oscillators to the filter and gain
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.gainNodes.cowbell);
            
            // Start and stop the oscillators
            osc1.start(time);
            osc2.start(time);
            osc1.stop(time + this.soundParams.cowbell.duration);
            osc2.stop(time + this.soundParams.cowbell.duration);
            
            // Volume envelope
            gainNode.gain.setValueAtTime(this.soundParams.cowbell.volume, time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + this.soundParams.cowbell.duration);
        };
    }

    // Play a synth note
    playSynthNote(note, time) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Set oscillator type from synth parameters
        oscillator.type = this.synthParams.waveform;
        
        // Get the frequency for the note
        const freq = this.getNoteFrequency(note);
        oscillator.frequency.value = freq;
        
        // Connect the oscillator to a gain node for envelope control
        oscillator.connect(gainNode);
        gainNode.connect(this.gainNodes.synth);
        
        // Set volume from synth parameters
        gainNode.gain.value = 0;
        
        // Apply ADSR envelope
        const now = time || this.audioContext.currentTime;
        const attack = parseFloat(this.synthParams.attack);
        const decay = parseFloat(this.synthParams.decay);
        const sustain = parseFloat(this.synthParams.sustain);
        const release = parseFloat(this.synthParams.release);
        
        // Attack phase
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(this.synthParams.volume, now + attack);
        
        // Decay and sustain phase
        gainNode.gain.linearRampToValueAtTime(sustain * this.synthParams.volume, now + attack + decay);
        
        // Start the oscillator
        oscillator.start(now);
        
        // Stop the oscillator after the note duration (use a minimum duration to avoid clicks)
        const noteDuration = Math.max(0.1, attack + decay + release);
        
        // Release phase
        gainNode.gain.linearRampToValueAtTime(0, now + noteDuration);
        oscillator.stop(now + noteDuration + 0.1); // Add a small buffer to avoid clicks
        
        // Clean up nodes when done
        oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
        };
    }

    setupMicrophone() {
        // Start microphone button
        document.getElementById('startMic').addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.micStream = stream;
                
                // Create audio context and analyzer
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                // Enable recorder buttons
                document.getElementById('startMic').disabled = true;
                document.getElementById('stopMic').disabled = false;
                document.getElementById('startRecording').disabled = false;
                
                // Set up visualization
                const source = this.audioContext.createMediaStreamSource(stream);
                const analyzer = this.audioContext.createAnalyser();
                analyzer.fftSize = 2048;
                source.connect(analyzer);
                this.visualizer = analyzer;
                
                // Start visualizing
                this.visualize();
                
                // Set up media recorder
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        this.recordedChunks.push(e.data);
                    }
                };
                
                this.mediaRecorder.onstop = async () => {
                    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(blob);
                    
                    // Load recorded audio into a buffer
                    const arrayBuffer = await blob.arrayBuffer();
                    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                    this.loopBuffer = audioBuffer;
                    
                    // Enable playback buttons
                    document.getElementById('playLoop').disabled = false;
                    document.getElementById('loopLength').textContent = Math.round(audioBuffer.duration * (this.tempo / 60));
                    document.getElementById('recordingStatus').textContent = 'Ready';
                    document.getElementById('recordingIndicator').classList.remove('active');
                };
            } catch (err) {
                console.error('Error accessing microphone:', err);
                alert('Unable to access microphone. Please check permissions.');
            }
        });
        
        // Stop microphone button
        document.getElementById('stopMic').addEventListener('click', () => {
            if (this.micStream) {
                this.micStream.getTracks().forEach(track => track.stop());
                this.micStream = null;
                this.visualizer = null;
                
                // Disable buttons
                document.getElementById('startMic').disabled = false;
                document.getElementById('stopMic').disabled = true;
                document.getElementById('startRecording').disabled = true;
                
                // If recording, stop it
                if (this.isRecording) {
                    document.getElementById('stopRecording').click();
                }
            }
        });
        
        // Start recording button
        document.getElementById('startRecording').addEventListener('click', () => {
            if (this.mediaRecorder && this.mediaRecorder.state !== 'recording') {
                this.recordedChunks = [];
                this.mediaRecorder.start();
                this.isRecording = true;
                
                // Update UI
                document.getElementById('startRecording').disabled = true;
                document.getElementById('stopRecording').disabled = false;
                document.getElementById('recordingStatus').textContent = 'Recording';
                document.getElementById('recordingIndicator').classList.add('active');
            }
        });
        
        // Stop recording button
        document.getElementById('stopRecording').addEventListener('click', () => {
            if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.stop();
                this.isRecording = false;
                
                // Update UI
                document.getElementById('startRecording').disabled = false;
                document.getElementById('stopRecording').disabled = true;
                document.getElementById('recordingStatus').textContent = 'Processing...';
            }
        });
        
        // Play loop button
        document.getElementById('playLoop').addEventListener('click', () => {
            if (this.loopBuffer) {
                this.playLoop();
            }
        });

        // Stop loop button
        document.getElementById('stopLoop').addEventListener('click', () => {
                this.stopLoop();
        });
    }

    visualize() {
        if (!this.visualizer) return;

        const canvas = document.getElementById('micVisualizer');
        const canvasCtx = canvas.getContext('2d');
        const width = canvas.width = canvas.clientWidth;
        const height = canvas.height = canvas.clientHeight;

        const draw = () => {
            if (!this.visualizer) return;
            
            requestAnimationFrame(draw);
            
            const bufferLength = this.visualizer.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            this.visualizer.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, width, height);
            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            canvasCtx.fillRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * height;

                // Use gradient color based on frequency
                const hue = i / bufferLength * 360;
                canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;

                canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();
    }

    playLoop() {
        if (!this.loopBuffer || this.isLoopPlaying) return;

        // Create a source for the loop
        this.loopSource = this.audioContext.createBufferSource();
        this.loopSource.buffer = this.loopBuffer;
        
        // Connect to output
        this.loopSource.connect(this.audioContext.destination);
        
        // Set loop properties
        this.loopSource.loop = true;
        
        // Start playback
        this.loopSource.start();
        this.isLoopPlaying = true;
        
        // Update UI
        document.getElementById('playLoop').disabled = true;
        document.getElementById('stopLoop').disabled = false;
        
        // Add indicator
        document.getElementById('recordingIndicator').classList.add('active');
        document.getElementById('recordingStatus').textContent = 'Playing';
    }

    stopLoop() {
        if (!this.isLoopPlaying || !this.loopSource) return;
        
        // Stop playback
        this.loopSource.stop();
        this.loopSource.disconnect();
            this.loopSource = null;
            this.isLoopPlaying = false;
            
        // Update UI
            document.getElementById('playLoop').disabled = false;
            document.getElementById('stopLoop').disabled = true;
        
        // Remove indicator
        document.getElementById('recordingIndicator').classList.remove('active');
        document.getElementById('recordingStatus').textContent = 'Ready';
    }

    setupSynth() {
        // Create synth grid
        this.createSynthGrid();
        
        // Setup note buttons
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Deselect all note buttons
                document.querySelectorAll('.note-btn').forEach(b => b.classList.remove('active'));
                
                // Deselect all piano keys
                document.querySelectorAll('.piano-key').forEach(key => key.classList.remove('selected'));
                
                // Select this button
                btn.classList.add('active');
                this.selectedNote = btn.dataset.note;
                
                // Preview the note when selected
                this.playSynthNote(this.selectedNote, this.audioContext.currentTime);
                
                // Highlight the corresponding piano key
                const pianoKey = document.querySelector(`.piano-key[data-note="${this.selectedNote}"]`);
                if (pianoKey) {
                    pianoKey.classList.add('selected');
                }
            });
        });
        
        // Setup synth parameters
        document.getElementById('synthWaveform').addEventListener('change', (e) => {
            this.synthParams.waveform = e.target.value;
        });
        
        document.getElementById('synthStyle').addEventListener('change', (e) => {
            this.synthParams.style = e.target.value;
            this.currentScale = e.target.value;
            
            // Update UI
            document.getElementById('currentKey').textContent = `${this.currentKey} ${this.currentScale}`;
            
            // If we have the wobble instrument, update its canvas
            if (this.wobbleInstrument) {
                this.wobbleInstrument.drawCanvas();
            }
            
            // When changing style, regenerate pattern
            this.randomizeSynthPattern();
        });
        
        ['attack', 'decay', 'sustain', 'release'].forEach(param => {
            document.getElementById(`synth${param.charAt(0).toUpperCase() + param.slice(1)}`)
                .addEventListener('input', (e) => {
                    this.synthParams[param] = parseFloat(e.target.value);
                });
        });
        
        // Setup octave controls
        document.getElementById('octaveUp').addEventListener('click', () => {
            if (this.currentOctave < 7) {
                this.currentOctave++;
                document.getElementById('currentOctave').textContent = this.currentOctave;
                this.updatePianoWithOctave();
            }
        });
        
        document.getElementById('octaveDown').addEventListener('click', () => {
            if (this.currentOctave > 1) {
                this.currentOctave--;
                document.getElementById('currentOctave').textContent = this.currentOctave;
                this.updatePianoWithOctave();
            }
        });
        
        // Setup clear and randomize buttons
        document.getElementById('clearSynth').addEventListener('click', () => {
            this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
            this.updateSynthGrid();
        });
        
        document.getElementById('randomizeSynth').addEventListener('click', () => {
            this.randomizeSynthPattern();
        });
        
        // Initialize the piano keyboard with current octave
        this.updatePianoWithOctave();
    }

    updateSynthGrid() {
        // Clear all active classes first
        document.querySelectorAll('.synth-cell').forEach(cell => {
            cell.classList.remove('active');
        });
        
        // Add active class to all cells that should be active
        const cells = document.querySelectorAll('.synth-cell');
        
        for (let i = 0; i < this.synthGrid.length; i++) {
            for (let j = 0; j < this.steps; j++) {
                if (this.synthGrid[i][j]) {
                    const cellIndex = i * this.steps + j;
                    if (cellIndex < cells.length) {
                        cells[cellIndex].classList.add('active');
                    }
                }
            }
        }
    }

    updateNoteButtons() {
        const buttons = document.querySelectorAll('.note-btn');
        buttons.forEach(btn => {
            
            // Add active class if note is set
            if (this.synthGrid[noteIndex] && this.synthGrid[noteIndex][step]) {
                cell.classList.add('active');
            }
        });
    }

    updateNoteButtons() {
        const buttons = document.querySelectorAll('.note-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.note === this.selectedNote) {
                btn.classList.add('active');
            }
        });
    }

    // Method to update piano keyboard display based on the current octave
    updatePianoWithOctave() {
        // Update the piano-key elements in the UI
        const pianoKeysContainer = document.querySelector('.piano-keyboard');
        const noteLabelsContainer = document.querySelector('.note-labels');
        
        if (!pianoKeysContainer || !noteLabelsContainer) return;
        
        // Clear existing keys
        pianoKeysContainer.innerHTML = '';
        noteLabelsContainer.innerHTML = '';
        
        // Notes in the chromatic scale
        const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
        
        // Create labels and keys for the current octave range (spans 13 semitones)
        // From C in the current octave up to C in the next octave
        const currentOct = this.currentOctave;
        const notes = [];
        
        // Add C from the next octave (top note)
        notes.push(`C${currentOct + 1}`);
        
        // Add the notes from the current octave in reverse order (for top-to-bottom display)
        for (let i = 11; i >= 0; i--) {
            notes.push(`${noteNames[i]}${currentOct}`);
        }

        // Update the pianoNotes array with the new notes
        this.pianoNotes = notes;
        
        // Create labels
        for (const note of notes) {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'note-label';
            labelDiv.dataset.note = note;
            labelDiv.textContent = note;
            noteLabelsContainer.appendChild(labelDiv);
        }
        
        // Create piano keys
        for (const note of notes) {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'piano-key';
            keyDiv.dataset.note = note;
            keyDiv.textContent = note;
            
            // Add appropriate class (black or white key)
            if (note.includes('♯')) {
                keyDiv.classList.add('black-key');
            } else {
                keyDiv.classList.add('white-key');
            }
            
            pianoKeysContainer.appendChild(keyDiv);
        }
        
        // Re-initialize the synth grid with the new notes
        this.createSynthGrid();
    }

    getNoteIndex(note) {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
        return notes.indexOf(note[0]);
    }

    randomizeSynthPattern() {
        // Clear current pattern
        this.synthGrid = Array(this.pianoNotes.length).fill().map(() => Array(this.steps).fill(false));
        
        // Get scale notes based on current key and scale
        const scaleNotes = this.getScaleNotes(this.currentKey, this.currentScale);
        const noteRows = this.pianoNotes;
        
        // Get the current octave from the UI
        const currentOctave = this.currentOctave;
        
        // For each step, 30% chance to add a note
        for (let step = 0; step < this.steps; step++) {
            // Skip some steps for rhythm
            if (Math.random() > 0.3) continue;
            
            // Choose 1-3 notes from the scale
            const numNotes = Math.floor(Math.random() * 3) + 1;
            const selectedRowIndices = new Set();
            
            for (let i = 0; i < numNotes; i++) {
                // Use the current octave and the octave above for most natural melody range
                const octave = Math.random() > 0.7 ? currentOctave + 1 : currentOctave;
                
                // Select random note from current scale
                const noteIndex = Math.floor(Math.random() * scaleNotes.length);
                const note = scaleNotes[noteIndex] + octave;
                
                // Find the row this note would go in
                let rowIndex = -1;
                
                // Match the note to a row in our grid by checking each piano key's data-note attribute
                for (let j = 0; j < noteRows.length; j++) {
                    const rowNote = noteRows[j];
                    
                    // Direct match (check both with symbols and without)
                    const normalizedRowNote = rowNote.replace('♯', '#').replace('♭', 'b');
                    const normalizedNote = note.replace('♯', '#').replace('♭', 'b');
                    
                    if (normalizedRowNote === normalizedNote) {
                        rowIndex = j;
                        break;
                    }
                    
                    // Match by note and octave separately
                    const rowNoteParts = normalizedRowNote.match(/([A-G][#b]?)(\d+)/);
                    const noteParts = normalizedNote.match(/([A-G][#b]?)(\d+)/);
                    
                    if (rowNoteParts && noteParts && 
                        rowNoteParts[1] === noteParts[1] && 
                        rowNoteParts[2] === noteParts[2]) {
                        rowIndex = j;
                        break;
                    }
                }
                
                // Avoid duplicates and add the note if we found a valid row
                if (rowIndex !== -1 && !selectedRowIndices.has(rowIndex)) {
                    selectedRowIndices.add(rowIndex);
                    
                    // Set this cell to active with a boolean true instead of an object
                    this.synthGrid[rowIndex][step] = true;
                }
            }
        }
        
        // Update the grid UI
        this.updateSynthGrid();
    }

    getNoteFrequency(note) {
        // Ensure note is a string
        if (typeof note !== 'string') {
            console.error('Invalid note type:', typeof note, note);
            return null;
        }
        
        // Convert Unicode sharp/flat symbols to standard notation
        note = note.replace('♯', '#').replace('♭', 'b');
        
        const A4 = 440.0;
        // Extract the note (e.g., C, C#, D) and octave (e.g., 4, 5)
        const noteMatch = note.match(/([A-G][#b]?)(\d+)/);
        
        if (!noteMatch) {
            console.error('Invalid note format:', note);
            return null;
        }
        
        const [, noteLetter, octave] = noteMatch;
        
        // Define semitones from A4
        const semitones = {
            'C': -9, 'C#': -8, 'Db': -8,
            'D': -7, 'D#': -6, 'Eb': -6,
            'E': -5, 'E#': -4, 'Fb': -5,
            'F': -4, 'F#': -3, 'Gb': -3,
            'G': -2, 'G#': -1, 'Ab': -1,
            'A': 0, 'A#': 1, 'Bb': 1,
            'B': 2, 'B#': 3, 'Cb': 1
        };
        
        // Calculate semitones from A4
        const semitonesFromA4 = semitones[noteLetter] + (parseInt(octave) - 4) * 12;
        
        // Calculate frequency
        return A4 * Math.pow(2, semitonesFromA4 / 12);
    }

    // Play the song by evaluating the column of notes
    playSong() {
        if (!this.isPlaying) return;
        
        // Update the current step indicator
        this.updateCurrentStepIndicator();
        
        // Only scroll to ensure current column is visible - playStep handles the note playback and keyboard highlighting
        const firstCellInColumn = document.querySelector(`.synth-cell[data-step="${this.currentStep}"]`);
        if (firstCellInColumn) {
            const synthGrid = document.querySelector('.synth-grid');
            if (synthGrid) {
                // Scroll to make current column visible
                const columnWidth = 40; // Width of each cell
                synthGrid.scrollLeft = this.currentStep * columnWidth - (synthGrid.clientWidth / 2) + columnWidth;
                
                // Ensure non-negative scroll value
                if (synthGrid.scrollLeft < 0) {
                    synthGrid.scrollLeft = 0;
                }
            }
        }
        
        // Schedule next column after tempo delay - don't increment currentStep here as scheduleStep does that
                        setTimeout(() => {
            if (this.isPlaying) {
                this.playSong();
            }
        }, 60000 / this.tempo); // Convert BPM to milliseconds
    }

    // Add a method to get notes in a given scale
    getScaleNotes(key, scaleName) {
        const scalePattern = this.scales[scaleName] || this.scales.ambient;
        const rootIndex = this.rootNotes.indexOf(key);
        
        if (rootIndex === -1) return scalePattern; // Key not found, return the original scale
        
        // Convert scale pattern to actual notes based on the key
        return scalePattern.map(note => {
            // Calculate the index of this note in the chromatic scale
            const noteIndex = this.rootNotes.indexOf(note);
            if (noteIndex === -1) return note; // Note not found in rootNotes
            
            // Calculate the transposed note index
            const transposedIndex = (noteIndex + rootIndex) % this.rootNotes.length;
            return this.rootNotes[transposedIndex];
        });
    }

    create808BassGenerator() {
        return (time, params = {}) => {
            const defaults = this.soundParams.bass808;
            const options = { ...defaults, ...params };
            
            // Oscillator for initial transient
            const osc = this.audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = options.frequency;
            
            // Envelope for the 808 shape
            const envelope = this.audioContext.createGain();
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(options.volume, time + options.attack);
            envelope.gain.linearRampToValueAtTime(options.volume * options.sustain, time + options.attack + options.decay);
            envelope.gain.exponentialRampToValueAtTime(0.001, time + options.attack + options.decay + options.release);
            
            // Distortion for character
            const distortion = this.audioContext.createWaveShaper();
            distortion.curve = this.makeDistortionCurve(options.distortion);
            
            // Filter for that 808 thump
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(500, time);
            filter.frequency.exponentialRampToValueAtTime(100, time + 0.1);
            filter.Q.value = 1;
            
            // Connect everything
            osc.connect(filter);
            filter.connect(distortion);
            distortion.connect(envelope);
            envelope.connect(this.gainNodes.bass808);
            
            // Start and stop
            osc.start(time);
            osc.stop(time + options.attack + options.decay + options.release + 0.1);
        };
    }

    createTrapHiHatGenerator() {
        return (time, params = {}) => {
            const defaults = this.soundParams.trapHihat;
            const options = { ...defaults, ...params };
            
            // For rolls, we'll create multiple hi-hats
            const count = options.isRoll ? options.rollSpeed : 1;
            const interval = options.isRoll ? 0.05 : 0;
            
            // Panning
            const panner = this.audioContext.createStereoPanner();
            panner.pan.value = options.pan;
            
            for (let i = 0; i < count; i++) {
                const noteTime = time + (i * interval);
                
                // Noise source
                const bufferSize = this.audioContext.sampleRate * 2;
                const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                
                for (let j = 0; j < bufferSize; j++) {
                    output[j] = Math.random() * 2 - 1;
                }
                
                const noise = this.audioContext.createBufferSource();
                noise.buffer = noiseBuffer;
                
                // Band-pass filter for hi-hat character
                const bandpass = this.audioContext.createBiquadFilter();
                bandpass.type = 'bandpass';
                bandpass.frequency.value = options.frequency;
                bandpass.Q.value = 1;
                
                // High-pass filter to remove low frequencies
                const highpass = this.audioContext.createBiquadFilter();
                highpass.type = 'highpass';
                highpass.frequency.value = 7000;
                
                // Envelope
                const envelope = this.audioContext.createGain();
                const decay = options.isRoll ? options.decay * 0.5 : options.decay;
                envelope.gain.setValueAtTime(options.volume, noteTime);
                envelope.gain.exponentialRampToValueAtTime(0.001, noteTime + decay);
                
                // Connect everything
                noise.connect(bandpass);
                bandpass.connect(highpass);
                highpass.connect(envelope);
                envelope.connect(panner);
                
                // Start and stop
                noise.start(noteTime);
                noise.stop(noteTime + decay + 0.1);
            }
            
            panner.connect(this.gainNodes.trapHihat);
        };
    }

    createVocalChopGenerator() {
        return (time, params = {}) => {
            const defaults = this.soundParams.vocalChop;
            const options = { ...defaults, ...params };
            
            // Create frequency based on note
            const noteToFreq = {
                'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
                'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
                'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
            };
            
            const frequency = noteToFreq[options.note] || 440;
            
            // Oscillator to mix with noise for vocal-like quality
            const osc = this.audioContext.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = frequency;
            
            // Noise component to mix with oscillator
            const bufferSize = this.audioContext.sampleRate * 2;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 0.2 - 0.1;
            }
            
            const noise = this.audioContext.createBufferSource();
            noise.buffer = noiseBuffer;
            
            // Formant filter for vocal character
            const formant = this.audioContext.createBiquadFilter();
            formant.type = 'bandpass';
            formant.frequency.value = frequency * 1.5;
            formant.Q.value = 5;
            
            // Second formant
            const formant2 = this.audioContext.createBiquadFilter();
            formant2.type = 'bandpass';
            formant2.frequency.value = frequency * 2.5;
            formant2.Q.value = 4;
            
            // Chop patterns - simulate different syllables
            let chopGain = 1;
            let chopFreq = 1;
            
            switch (options.chop) {
                case 1: // "Ah"
                    chopGain = 1;
                    chopFreq = 1;
                    break;
                case 2: // "Eh"
                    chopGain = 0.8;
                    chopFreq = 1.2;
                    formant.frequency.value = frequency * 1.7;
                    break;
                case 3: // "Oh"
                    chopGain = 0.7;
                    chopFreq = 0.9;
                    formant.frequency.value = frequency * 1.3;
                    break;
                case 4: // "Ih"
                    chopGain = 0.9;
                    chopFreq = 1.4;
                    formant.frequency.value = frequency * 2;
                    break;
                case 5: // "Uh"
                    chopGain = 0.7;
                    chopFreq = 0.7;
                    formant.frequency.value = frequency * 1.1;
                    break;
            }
            
            // Envelope
            const envelope = this.audioContext.createGain();
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(options.volume * chopGain, time + options.attack);
            envelope.gain.exponentialRampToValueAtTime(0.001, time + options.attack + options.release);
            
            // Oscillator mix (vocal component)
            const oscGain = this.audioContext.createGain();
            oscGain.gain.value = 0.7;
            
            // Noise mix (breath component)
            const noiseGain = this.audioContext.createGain();
            noiseGain.gain.value = 0.3;
            
            // Reverb (convolution)
            const convolver = this.audioContext.createConvolver();
            const reverbBuffer = this.createReverbBuffer(1.5);
            convolver.buffer = reverbBuffer;
            
            // Reverb mix
            const reverbGain = this.audioContext.createGain();
            reverbGain.gain.value = options.reverb;
            
            const dryGain = this.audioContext.createGain();
            dryGain.gain.value = 1 - options.reverb;
            
            // Connect everything
            osc.connect(formant);
            noise.connect(noiseGain);
            formant.connect(formant2);
            formant2.connect(oscGain);
            
            oscGain.connect(envelope);
            noiseGain.connect(envelope);
            
            // Split for dry/wet reverb
            envelope.connect(dryGain);
            envelope.connect(convolver);
            convolver.connect(reverbGain);
            
            // Connect to output
            dryGain.connect(this.gainNodes.vocalChop);
            reverbGain.connect(this.gainNodes.vocalChop);
            
            // Start and stop
            osc.start(time);
            noise.start(time);
            osc.stop(time + options.attack + options.release + 0.1);
            noise.stop(time + options.attack + options.release + 0.1);
        };
    }

    createFutureBassGenerator() {
        return (time, params = {}) => {
            const defaults = this.soundParams.futureBass;
            const options = { ...defaults, ...params };
            
            // Create frequency based on note
            const noteToFreq = {
                'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
                'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
                'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
            };
            
            const frequency = noteToFreq[options.note] || 440;
            
            // Create multiple oscillators for rich sound
            const waveforms = ['sine', 'triangle', 'sawtooth'];
            
            // LFO for modulation
            const lfo = this.audioContext.createOscillator();
            lfo.frequency.value = options.lfoRate;
            
            const lfoGain = this.audioContext.createGain();
            lfoGain.gain.value = options.lfoDepth;
            
            lfo.connect(lfoGain);
            lfo.start(time);
            lfo.stop(time + options.attack + options.decay + options.release + 0.1);
            
            // Main envelope
            const envelope = this.audioContext.createGain();
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(options.volume, time + options.attack);
            envelope.gain.linearRampToValueAtTime(options.volume * options.sustain, time + options.attack + options.decay);
            envelope.gain.exponentialRampToValueAtTime(0.001, time + options.attack + options.decay + options.release);
            
            // Filter for signature "wub" sound
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 1000;
            filter.Q.value = 5;
            
            // Connect LFO to filter
            lfoGain.connect(filter.frequency);
            
            // Create three oscillators with slightly different settings
            for (let i = 0; i < 3; i++) {
                const osc = this.audioContext.createOscillator();
                osc.type = waveforms[i % waveforms.length];
                osc.frequency.value = frequency;
                
                // Detune each oscillator differently
                osc.detune.value = (i - 1) * options.detune;
                
                // Individual gain for mixing
                const gain = this.audioContext.createGain();
                gain.gain.value = 0.3; // Mix equally
                
                // Connect osc -> gain -> filter
                osc.connect(gain);
                gain.connect(filter);
                
                // Start and stop each oscillator
                osc.start(time);
                osc.stop(time + options.attack + options.decay + options.release + 0.1);
            }
            
            // Connect filter to envelope to output
            filter.connect(envelope);
            envelope.connect(this.gainNodes.futureBass);
        };
    }
    
    // Utility methods for new instruments
    
    makeDistortionCurve(amount) {
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < samples; ++i) {
            const x = i * 2 / samples - 1;
            curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
        }
        
        return curve;
    }
    
    createReverbBuffer(duration) {
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);
        
        for (let i = 0; i < length; i++) {
            const n = i / length;
            // Exponential decay
            const t = 10 * Math.exp(-n * 6);
            
            // Random values create the reverb tail
            left[i] = (Math.random() * 2 - 1) * t;
            right[i] = (Math.random() * 2 - 1) * t;
        }
        
        return impulse;
    }
}

class WobbleInstrument {
    constructor(beatMaker) {
        // Reference to the main BeatMaker class to access scales and current key
        this.beatMaker = beatMaker;
        this.audioContext = beatMaker.audioContext;
        
        // Canvas setup
        this.canvas = document.getElementById('wobblePad');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Audio nodes
        this.oscillator = null;
        this.filter = null;
        this.gain = null;
        this.lfo = null;
        this.lfoGain = null;
        
        // State
        this.isPlaying = false;
        this.currentNote = null;
        this.lastX = 0;
        this.lastY = 0;
        
        // Settings
        this.settings = {
            type: 'bass',
            filterCutoff: 2000,
            resonance: 5,
            lfoRate: 5,
            lfoDepth: 50,
            octaveOffset: 0, // Used for hotkey octave shifting
            showHelp: false  // Help menu visibility
        };
        
        // Initialize
        this.setupControlListeners();
        this.setupKeyboardControls();
        this.setupCanvasListeners();
        this.createHelpMenu();
        this.makeControlPanelsDraggable();
        this.drawCanvas();
        
        // Draw notes grid
        window.requestAnimationFrame(() => this.animateCanvas());
    }
    
    // Make the control panels draggable
    makeControlPanelsDraggable() {
        // Make all main sections draggable by their headers
        const allSections = document.querySelectorAll('.wobble-section, .beat-section, .synth-section, .mic-section');
        
        allSections.forEach(section => {
            // Add a draggable handle to each section
            const header = section.querySelector('h3');
            if (header) {
                const handle = document.createElement('div');
                handle.className = 'drag-handle';
                handle.innerHTML = '<span>☰</span>';
                handle.title = 'Drag to move';
                
                // Insert the handle before the existing heading
                header.parentNode.insertBefore(handle, header);
                
                // Create a header container to hold both the handle and the h3
                const headerContainer = document.createElement('div');
                headerContainer.className = 'section-header';
                
                // Move the handle and h3 into the header container
                handle.parentNode.insertBefore(headerContainer, handle);
                headerContainer.appendChild(handle);
                headerContainer.appendChild(header);
                
                // Make the section draggable by the header
                this.makeDraggable(section, '.section-header');
                
                // Add class for styling
                section.classList.add('draggable-panel');
            }
        });
        
        // Make the control panels draggable by their headers
        const controlPanels = document.querySelectorAll('.control-panel');
        controlPanels.forEach(panel => {
            const groupHeadings = panel.querySelectorAll('.control-group h4');
            groupHeadings.forEach(heading => {
                const container = heading.closest('.control-group');
                if (container) {
                    // Add a drag handle to each control group
                    const handle = document.createElement('div');
                    handle.className = 'drag-handle small';
                    handle.innerHTML = '<span>☰</span>';
                    handle.title = 'Drag to move';
                    
                    // Create a header container
                    const headerContainer = document.createElement('div');
                    headerContainer.className = 'group-header';
                    
                    // Insert before the heading
                    heading.parentNode.insertBefore(headerContainer, heading);
                    headerContainer.appendChild(handle);
                    headerContainer.appendChild(heading);
                    
                    // Make the control group draggable
                    this.makeDraggable(container, '.group-header');
                    
                    // Add class for styling
                    container.classList.add('draggable-ready');
                }
            });
        });
        
        // Style the draggable panels
        const style = document.createElement('style');
        style.textContent = `
            .draggable-panel {
                position: relative;
                z-index: 10;
                transition: box-shadow 0.3s, transform 0.2s;
            }
            .draggable-panel:hover {
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            }
            .dragging {
                z-index: 1000 !important;
                opacity: 0.9;
                transform: scale(1.02);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5) !important;
            }
            .section-header, .group-header {
                display: flex;
                align-items: center;
                cursor: move;
                padding: 5px 0;
            }
            .drag-handle {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                margin-right: 10px;
                color: var(--secondary-color);
                cursor: move;
                user-select: none;
            }
            .drag-handle.small {
                font-size: 14px;
            }
            .control-group {
                position: relative;
                z-index: 5;
                border: 1px solid transparent;
                transition: all 0.3s;
                padding: 8px;
                border-radius: 6px;
            }
            .control-group.draggable-ready:hover {
                border: 1px solid var(--primary-color);
                background: rgba(0, 0, 0, 0.2);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupControlListeners() {
        // Sound type selector
        document.getElementById('wobbleType').addEventListener('change', (e) => {
            this.settings.type = e.target.value;
            if (this.isPlaying) {
                this.stopSound();
                this.startSound(this.lastX, this.lastY);
            }
        });
        
        // Effect controls
        document.getElementById('filterCutoff').addEventListener('input', (e) => {
            this.settings.filterCutoff = parseFloat(e.target.value);
            if (this.filter) {
                this.filter.frequency.value = this.settings.filterCutoff;
            }
        });
        
        document.getElementById('resonance').addEventListener('input', (e) => {
            this.settings.resonance = parseFloat(e.target.value);
            if (this.filter) {
                this.filter.Q.value = this.settings.resonance;
            }
        });
        
        // LFO controls
        document.getElementById('lfoRate').addEventListener('input', (e) => {
            this.settings.lfoRate = parseFloat(e.target.value);
            if (this.lfo) {
                this.lfo.frequency.value = this.settings.lfoRate;
            }
        });
        
        document.getElementById('lfoDepth').addEventListener('input', (e) => {
            this.settings.lfoDepth = parseFloat(e.target.value);
            if (this.lfoGain) {
                const lfoAmount = this.settings.lfoDepth * 50; // Scale to a useful range
                this.lfoGain.gain.value = lfoAmount;
            }
        });
    }
    
    setupKeyboardControls() {
        // Using an event listener at the document level to capture keyboard events
        document.addEventListener('keydown', (e) => {
            // Skip if a form control is focused (login, etc.)
            // IMPORTANT: This needs to be the first check to prevent form input issues
            if (window.isFormControlFocused?.() || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' ||
                e.target.getAttribute('contenteditable') === 'true') {
                return; // Exit immediately for form controls
            }
            
            // Only process hotkeys when cursor is over the wobble pad or help is showing
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const isOverCanvas = mouseX >= rect.left && mouseX <= rect.right && 
                                mouseY >= rect.top && mouseY <= rect.bottom;
                                
            // Always process the help toggle key
            if (e.key === 'h' || e.key === 'H') {
                this.settings.showHelp = !this.settings.showHelp;
                this.toggleHelpMenu();
                return;
            }
            
            // Only process other hotkeys if over canvas or help is showing
            if (!isOverCanvas && !this.settings.showHelp) return;
            
            // Prevent default browser behaviors for these keys
            // ONLY if we're not in a form element
            if (['z', 'x', 'q', 'w', 'a', 's', 'e', 'r', 'd', 'f', '1', '2', '3', '4'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
            
            switch (e.key.toLowerCase()) {
                // Octave controls
                case 'z':
                    this.settings.octaveOffset = Math.max(this.settings.octaveOffset - 1, -2);
                    this.drawCanvas();
                    if (this.isPlaying) this.updateSound(this.lastX, this.lastY);
                    break;
                case 'x':
                    this.settings.octaveOffset = Math.min(this.settings.octaveOffset + 1, 2);
                    this.drawCanvas();
                    if (this.isPlaying) this.updateSound(this.lastX, this.lastY);
                    break;
                
                // Filter cutoff controls
                case 'q':
                    this.settings.filterCutoff = Math.max(this.settings.filterCutoff - 500, 100);
                    document.getElementById('filterCutoff').value = this.settings.filterCutoff;
                    if (this.filter) this.filter.frequency.value = this.settings.filterCutoff;
                    break;
                case 'w':
                    this.settings.filterCutoff = Math.min(this.settings.filterCutoff + 500, 10000);
                    document.getElementById('filterCutoff').value = this.settings.filterCutoff;
                    if (this.filter) this.filter.frequency.value = this.settings.filterCutoff;
                    break;
                
                // Resonance controls
                case 'a':
                    this.settings.resonance = Math.max(this.settings.resonance - 1, 0);
                    document.getElementById('resonance').value = this.settings.resonance;
                    if (this.filter) this.filter.Q.value = this.settings.resonance;
                    break;
                case 's':
                    this.settings.resonance = Math.min(this.settings.resonance + 1, 20);
                    document.getElementById('resonance').value = this.settings.resonance;
                    if (this.filter) this.filter.Q.value = this.settings.resonance;
                    break;
                
                // LFO rate controls
                case 'e':
                    this.settings.lfoRate = Math.max(this.settings.lfoRate - 1, 0.1);
                    document.getElementById('lfoRate').value = this.settings.lfoRate;
                    if (this.lfo) this.lfo.frequency.value = this.settings.lfoRate;
                    break;
                case 'r':
                    this.settings.lfoRate = Math.min(this.settings.lfoRate + 1, 20);
                    document.getElementById('lfoRate').value = this.settings.lfoRate;
                    if (this.lfo) this.lfo.frequency.value = this.settings.lfoRate;
                    break;
                
                // LFO depth controls
                case 'd':
                    this.settings.lfoDepth = Math.max(this.settings.lfoDepth - 10, 0);
                    document.getElementById('lfoDepth').value = this.settings.lfoDepth;
                    if (this.lfoGain) this.lfoGain.gain.value = this.settings.lfoDepth * 50;
                    break;
                case 'f':
                    this.settings.lfoDepth = Math.min(this.settings.lfoDepth + 10, 100);
                    document.getElementById('lfoDepth').value = this.settings.lfoDepth;
                    if (this.lfoGain) this.lfoGain.gain.value = this.settings.lfoDepth * 50;
                    break;
                
                // Instrument type controls
                case '1':
                    this.settings.type = 'bass';
                    document.getElementById('wobbleType').value = 'bass';
                    if (this.isPlaying) {
                        this.stopSound();
                        this.startSound(this.lastX, this.lastY);
                    }
                    break;
                case '2':
                    this.settings.type = 'synth';
                    document.getElementById('wobbleType').value = 'synth';
                    if (this.isPlaying) {
                        this.stopSound();
                        this.startSound(this.lastX, this.lastY);
                    }
                    break;
                case '3':
                    this.settings.type = 'pad';
                    document.getElementById('wobbleType').value = 'pad';
                    if (this.isPlaying) {
                        this.stopSound();
                        this.startSound(this.lastX, this.lastY);
                    }
                    break;
                case '4':
                    this.settings.type = 'pluck';
                    document.getElementById('wobbleType').value = 'pluck';
                    if (this.isPlaying) {
                        this.stopSound();
                        this.startSound(this.lastX, this.lastY);
                    }
                    break;
            }
        });
    }
    
    createHelpMenu() {
        // Create a help menu overlay
        const helpMenu = document.createElement('div');
        helpMenu.className = 'wobble-help-menu';
        helpMenu.style.display = 'none';
        helpMenu.innerHTML = `
            <div class="help-header">
                <h3>Wobble Pad Keyboard Controls</h3>
                <button id="closeHelpBtn">×</button>
            </div>
            <div class="help-content">
                <div class="help-section">
                    <h4>Octave Controls</h4>
                    <p><kbd>Z</kbd> - Lower octave</p>
                    <p><kbd>X</kbd> - Raise octave</p>
                </div>
                <div class="help-section">
                    <h4>Filter Controls</h4>
                    <p><kbd>Q</kbd> - Decrease cutoff</p>
                    <p><kbd>W</kbd> - Increase cutoff</p>
                    <p><kbd>A</kbd> - Decrease resonance</p>
                    <p><kbd>S</kbd> - Increase resonance</p>
                </div>
                <div class="help-section">
                    <h4>LFO Controls</h4>
                    <p><kbd>E</kbd> - Decrease rate</p>
                    <p><kbd>R</kbd> - Increase rate</p>
                    <p><kbd>D</kbd> - Decrease depth</p>
                    <p><kbd>F</kbd> - Increase depth</p>
                </div>
                <div class="help-section">
                    <h4>Instrument Types</h4>
                    <p><kbd>1</kbd> - Bass</p>
                    <p><kbd>2</kbd> - Synth</p>
                    <p><kbd>3</kbd> - Pad</p>
                    <p><kbd>4</kbd> - Pluck</p>
                </div>
                <div class="help-section">
                    <h4>Help Menu</h4>
                    <p><kbd>H</kbd> - Toggle this help menu</p>
                </div>
            </div>
        `;
        
        document.querySelector('.wobble-pad-container').appendChild(helpMenu);
        
        // Add close button functionality
        document.getElementById('closeHelpBtn').addEventListener('click', () => {
            this.settings.showHelp = false;
            this.toggleHelpMenu();
        });
        
        // Create a help button
        const helpButton = document.createElement('button');
        helpButton.className = 'wobble-help-button';
        helpButton.textContent = '?';
        helpButton.title = 'Show keyboard shortcuts (H)';
        helpButton.addEventListener('click', () => {
            this.settings.showHelp = !this.settings.showHelp;
            this.toggleHelpMenu();
        });
        
        document.querySelector('.wobble-pad-container').appendChild(helpButton);
        
        // Make the help menu draggable by its header
        this.makeDraggable(helpMenu, '.help-header');
    }
    
    // Method to make an element draggable by its handle
    makeDraggable(element, handleSelector) {
        const handle = element.querySelector(handleSelector);
        if (!handle) return;
        
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        // Handle will trigger the drag start
        handle.style.cursor = 'move';
        handle.addEventListener('mousedown', dragMouseDown);
        handle.addEventListener('touchstart', dragTouchStart, { passive: false });
        
        function dragMouseDown(e) {
            e.preventDefault();
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Add the event listeners for drag and drop
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
            
            // Add a class to indicate dragging is in progress
            element.classList.add('dragging');
        }
        
        function dragTouchStart(e) {
            e.preventDefault();
            // Get the touch position at startup
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            
            // Add touch event listeners
            document.addEventListener('touchmove', elementTouchDrag, { passive: false });
            document.addEventListener('touchend', closeTouchDragElement);
            document.addEventListener('touchcancel', closeTouchDragElement);
            
            // Add a class to indicate dragging is in progress
            element.classList.add('dragging');
        }
        
        function elementDrag(e) {
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Reset transform to prevent accumulating
            const currentTransform = window.getComputedStyle(element).getPropertyValue('transform');
            
            // If element is using transform: translate(-50%, -50%) for centering,
            // convert to absolute positioning during drag
            if (currentTransform.includes('matrix') && element.style.left === '') {
                const rect = element.getBoundingClientRect();
                element.style.top = rect.top + 'px';
                element.style.left = rect.left + 'px';
                element.style.transform = 'none';
            }
            
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function elementTouchDrag(e) {
            e.preventDefault();
            // Calculate the new touch position
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            
            // Reset transform to prevent accumulating
            const currentTransform = window.getComputedStyle(element).getPropertyValue('transform');
            
            // If element is using transform: translate(-50%, -50%) for centering,
            // convert to absolute positioning during drag
            if (currentTransform.includes('matrix') && element.style.left === '') {
                const rect = element.getBoundingClientRect();
                element.style.top = rect.top + 'px';
                element.style.left = rect.left + 'px';
                element.style.transform = 'none';
            }
            
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
            
            // Remove the dragging class
            element.classList.remove('dragging');
        }
        
        function closeTouchDragElement() {
            // Stop moving when touch ends
            document.removeEventListener('touchmove', elementTouchDrag);
            document.removeEventListener('touchend', closeTouchDragElement);
            document.removeEventListener('touchcancel', closeTouchDragElement);
            
            // Remove the dragging class
            element.classList.remove('dragging');
        }
    }
    
    toggleHelpMenu() {
        const helpMenu = document.querySelector('.wobble-help-menu');
        if (helpMenu) {
            helpMenu.style.display = this.settings.showHelp ? 'block' : 'none';
        }
    }
    
    setupCanvasListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            this.isPlaying = true;
            this.lastX = x;
            this.lastY = y;
            this.startSound(x, y);
            this.createRipple(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isPlaying) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            this.lastX = x;
            this.lastY = y;
            this.updateSound(x, y);
            this.createRipple(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.stopSound();
            this.isPlaying = false;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.stopSound();
            this.isPlaying = false;
        });
        
        // Touch support for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left) / rect.width;
            const y = (touch.clientY - rect.top) / rect.height;
            
            this.isPlaying = true;
            this.lastX = x;
            this.lastY = y;
            this.startSound(x, y);
            this.createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.isPlaying) return;
            
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left) / rect.width;
            const y = (touch.clientY - rect.top) / rect.height;
            
            this.lastX = x;
            this.lastY = y;
            this.updateSound(x, y);
            this.createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.stopSound();
            this.isPlaying = false;
        });
    }
    
    createRipple(x, y) {
        // Only create ripples occasionally to avoid too many elements
        if (Math.random() > 0.3) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'wobble-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add to container
        const container = document.querySelector('.wobble-pad-container');
        container.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    startSound(x, y) {
        // Create audio nodes
        this.oscillator = this.audioContext.createOscillator();
        this.filter = this.audioContext.createBiquadFilter();
        this.gain = this.audioContext.createGain();
        this.lfo = this.audioContext.createOscillator();
        this.lfoGain = this.audioContext.createGain();
        
        // Add a bass boost for richer low-end
        this.bassBoost = this.audioContext.createBiquadFilter();
        this.bassBoost.type = 'lowshelf';
        this.bassBoost.frequency.value = 440;
        this.bassBoost.gain.value = 6; // Add 6dB boost to low frequencies
        
        // Set oscillator type based on selected instrument
        switch (this.settings.type) {
            case 'bass':
                this.oscillator.type = 'sawtooth';
                // For bass type, create a second detuned oscillator for fuller sound
                this.oscillator2 = this.audioContext.createOscillator();
                this.oscillator2.type = 'sawtooth';
                this.oscillator2.detune.value = -10; // Slightly detuned for thickness
                this.oscillator2.connect(this.filter);
                break;
            case 'synth':
                this.oscillator.type = 'square';
                break;
            case 'pad':
                this.oscillator.type = 'sine';
                break;
            case 'pluck':
                this.oscillator.type = 'triangle';
                break;
            default:
                this.oscillator.type = 'sawtooth';
        }
        
        // Set filter type based on instrument
        this.filter.type = 'lowpass';
        if (this.settings.type === 'synth' || this.settings.type === 'pluck') {
            this.filter.type = 'bandpass';
        }
        
        // Connect nodes with bass boost
        this.oscillator.connect(this.filter);
        this.filter.connect(this.bassBoost);
        this.bassBoost.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
        
        // LFO setup for wobble effect
        this.lfo.type = 'sine';
        this.lfo.frequency.value = this.settings.lfoRate;
        this.lfoGain.gain.value = this.settings.lfoDepth * 50; // Scale to a useful range
        
        this.lfo.connect(this.lfoGain);
        this.lfoGain.connect(this.filter.frequency);
        
        // Initial settings
        this.filter.frequency.value = this.settings.filterCutoff;
        this.filter.Q.value = this.settings.resonance;
        
        // Update sound based on position
        this.updateSound(x, y);
        
        // Start the oscillators
        this.oscillator.start();
        this.lfo.start();
        if (this.oscillator2) {
            this.oscillator2.start();
        }
        
        // Smooth attack
        this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gain.gain.linearRampToValueAtTime(0.8, this.audioContext.currentTime + 0.05);
    }
    
    stopSound() {
        if (!this.oscillator) return;
        
        // Smooth release
        this.gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
        
        // Stop and clean up after release
        setTimeout(() => {
            if (this.oscillator) {
                this.oscillator.stop();
                this.oscillator.disconnect();
                this.oscillator = null;
            }
            
            if (this.oscillator2) {
                this.oscillator2.stop();
                this.oscillator2.disconnect();
                this.oscillator2 = null;
            }
            
            if (this.lfo) {
                this.lfo.stop();
                this.lfo.disconnect();
                this.lfo = null;
            }
            
            if (this.filter) {
                this.filter.disconnect();
                this.filter = null;
            }
            
            if (this.bassBoost) {
                this.bassBoost.disconnect();
                this.bassBoost = null;
            }
            
            if (this.gain) {
                this.gain.disconnect();
                this.gain = null;
            }
            
            if (this.lfoGain) {
                this.lfoGain.disconnect();
                this.lfoGain = null;
            }
            
            document.getElementById('currentNote').textContent = '--';
        }, 100);
    }
    
    updateSound(x, y) {
        if (!this.oscillator || !this.filter) return;
        
        // Map X position to note in current scale
        const currentScaleKey = this.beatMaker.currentKey || 'C';
        const currentScale = this.beatMaker.currentScale || 'ambient';
        const scaleNotes = this.beatMaker.getScaleNotes(currentScaleKey, currentScale);
        
        // Determine note based on X position
        const noteIndex = Math.floor(x * scaleNotes.length);
        const clampedNoteIndex = Math.min(Math.max(noteIndex, 0), scaleNotes.length - 1);
        const note = scaleNotes[clampedNoteIndex];
        
        // Determine octave based on vertical position (3 octaves range)
        // Lower Y values (top of canvas) = higher octaves
        const octave = Math.floor(5 - y * 3);
        
        // Apply octave offset from keyboard controls
        const adjustedOctave = octave + this.settings.octaveOffset;
        
        // Clamp to reasonable range (1-7)
        const clampedOctave = Math.min(Math.max(adjustedOctave, 1), 7);
        
        // Calculate final note with octave
        const finalNote = `${note}${clampedOctave}`;
        
        // Update oscillator frequency
        const frequency = this.beatMaker.getNoteFrequency(finalNote);
        if (frequency) {
            this.oscillator.frequency.setTargetAtTime(frequency, this.audioContext.currentTime, 0.01);
            
            // If we have a second oscillator (for bass sounds), update its frequency too
            if (this.oscillator2) {
                this.oscillator2.frequency.setTargetAtTime(frequency, this.audioContext.currentTime, 0.01);
            }
            
            // Adjust bass boost based on octave
            if (this.bassBoost) {
                // More bass boost for lower octaves
                if (clampedOctave <= 3) {
                    this.bassBoost.gain.setTargetAtTime(
                        12 - (clampedOctave * 2), // Higher boost for lower octaves
                        this.audioContext.currentTime, 
                        0.05
                    );
                } else {
                    // Less bass boost for higher octaves
                    this.bassBoost.gain.setTargetAtTime(3, this.audioContext.currentTime, 0.05);
                }
            }
            
            // Update current note display
            document.getElementById('currentNote').textContent = finalNote;
            this.currentNote = finalNote;
        }
        
        // Map Y position (inverted) to filter cutoff 
        const filterRange = this.settings.type === 'bass' ? 5000 : 10000;
        const filterMin = this.settings.type === 'bass' ? 100 : 200;
        
        // Adjust filter cutoff based on instrument and octave
        let filterValue = filterMin + (1 - y) * filterRange;
        
        // For bass in low octaves, add more emphasis on low frequencies
        if (this.settings.type === 'bass' && clampedOctave <= 3) {
            // Limit maximum cutoff frequency for bass notes to preserve low end
            filterValue = Math.min(filterValue, 1500 + (clampedOctave * 500));
            
            // Increase resonance for more pronounced bass
            this.filter.Q.setTargetAtTime(
                this.settings.resonance * 1.5,
                this.audioContext.currentTime,
                0.1
            );
        } else {
            // Normal resonance for other notes
            this.filter.Q.setTargetAtTime(
                this.settings.resonance,
                this.audioContext.currentTime,
                0.1
            );
        }
        
        // Apply filter modulation
        this.filter.frequency.setTargetAtTime(filterValue, this.audioContext.currentTime, 0.05);
        
        // Adjust LFO depth based on vertical position and octave
        let lfoDepthValue = y * 100 * (this.settings.lfoDepth / 50);
        
        // Increase LFO depth for bass notes to get more wobble
        if (clampedOctave < 4 && this.settings.type === 'bass') {
            lfoDepthValue *= 1.5; // 50% more wobble for bass notes
        }
        
        this.lfoGain.gain.setTargetAtTime(lfoDepthValue, this.audioContext.currentTime, 0.1);
    }
    
    drawCanvas() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Get current scale
        const currentScaleKey = this.beatMaker.currentKey || 'C';
        const currentScale = this.beatMaker.currentScale || 'ambient';
        const scaleNotes = this.beatMaker.getScaleNotes(currentScaleKey, currentScale);
        
        // Update key display
        document.getElementById('currentKey').textContent = `${currentScaleKey} ${currentScale}`;
        
        // Draw background
        this.ctx.fillStyle = 'rgba(30, 30, 60, 0.5)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw note zones
        const cellWidth = this.width / scaleNotes.length;
        const cellHeight = this.height / 3; // 3 octaves
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        
        // Draw vertical lines (note divisions)
        for (let i = 0; i <= scaleNotes.length; i++) {
            const x = i * cellWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
            
            // Color alternate note areas
            if (i < scaleNotes.length) {
                if (i % 2 === 0) {
                    this.ctx.fillStyle = 'rgba(60, 80, 120, 0.3)';
                    this.ctx.fillRect(x, 0, cellWidth, this.height);
                }
                
                // Draw note name
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.font = '16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(scaleNotes[i], x + cellWidth / 2, this.height - 10);
            }
        }
        
        // Draw horizontal lines (octave divisions)
        for (let i = 0; i <= 3; i++) {
            const y = i * cellHeight;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
            
            // Label octaves with the offset applied
            if (i < 3) {
                const baseOctave = 5 - i;
                const adjustedOctave = baseOctave + this.settings.octaveOffset;
                
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.font = '14px Arial';
                this.ctx.textAlign = 'left';
                this.ctx.fillText(`Oct ${adjustedOctave}`, 10, y + 20);
            }
        }
        
        // Draw main title with octave shift indicator if active
        let titleText = `${currentScaleKey} ${currentScale} Scale - Drag to play!`;
        if (this.settings.octaveOffset !== 0) {
            const direction = this.settings.octaveOffset > 0 ? '+' : '';
            titleText += ` (Octave Shift: ${direction}${this.settings.octaveOffset})`;
        }
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(titleText, this.width / 2, 20);
        
        // Show current parameters if active
        if (this.isPlaying) {
            // Show current settings
            const settingsText = `Type: ${this.settings.type} | Cutoff: ${this.settings.filterCutoff} | Res: ${this.settings.resonance} | LFO: ${this.settings.lfoRate}Hz/${this.settings.lfoDepth}%`;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(settingsText, this.width / 2, 40);
        }
    }
    
    animateCanvas() {
        this.drawCanvas();
        
        // Draw current position marker if playing
        if (this.isPlaying) {
            const x = this.lastX * this.width;
            const y = this.lastY * this.height;
            
            // Draw outer glow
            const gradient = this.ctx.createRadialGradient(x, y, 5, x, y, 40);
            gradient.addColorStop(0, 'rgba(0, 230, 180, 0.8)');
            gradient.addColorStop(0.5, 'rgba(0, 180, 230, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 120, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(x, y, 40, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw inner circle with pulsing animation
            const pulseSize = 8 + Math.sin(Date.now() / 200) * 4;
            
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw note being played
            if (this.currentNote) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(this.currentNote, x, y - 30);
            }
            
            // Draw ripple waves (simulate audio waves)
            for (let i = 0; i < 3; i++) {
                const rippleSize = (i * 20) + ((Date.now() / 200) % 60);
                const opacity = 0.7 - (rippleSize / 100);
                if (opacity > 0) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 200, 230, ${opacity})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.arc(x, y, rippleSize, 0, Math.PI * 2);
                    this.ctx.stroke();
                }
            }
        }
        
        // Continue animation
        window.requestAnimationFrame(() => this.animateCanvas());
    }
}

// Initialize the beat maker and song builder when the page loads
window.addEventListener('load', () => {
    // BeatMaker is already initialized in DOMContentLoaded
    // No need to create another instance here
    
    // Uncomment the line below to also initialize the SongBuilder
    // new SongBuilder();
}); 

// Create and initialize BeatMaker 
document.addEventListener('DOMContentLoaded', () => {
    const beatMaker = new BeatMaker();
    
    // Make BeatMaker instance globally accessible for visualizer
    window.beatMaker = beatMaker;
    
    // The wobble instrument is already created in the BeatMaker constructor
    // Don't create another instance here
}); 
