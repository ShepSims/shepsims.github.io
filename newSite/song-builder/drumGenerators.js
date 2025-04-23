// This file is now just a historical reference for the drum generator functions
// These methods are now directly included in the BeatMaker class in script.js
console.log("Drum generators reference file loaded - no action needed");

// The original implementation for reference:
/*
// This file adds the missing drum instrument generator methods
console.log("Drum generators script loaded");

// Wait for window load to ensure BeatMaker is fully initialized
window.addEventListener('load', function() {
    // Create a new instance of BeatMaker with our methods added
    console.log("Window loaded, patching BeatMaker...");
    
    // The approach here is to create the BeatMaker instance FIRST using the original class
    // Then we'll add our patch AFTER the first instance is created
    setTimeout(function() {
        console.log("Applying drum generator patch...");
        
        // First, check if there's a better way to access the instance
        const beatMaker = window.beatMaker;
        
        // Define our generator functions
        const generators = {
            // Rimshot generator
            createRimshotGenerator: function() {
                console.log("Creating rimshot generator");
                return function(time) {
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
            },
            
            // Tom generator
            createTomGenerator: function() {
                console.log("Creating tom generator");
                return function(time) {
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
            },
            
            // Cymbal generator
            createCymbalGenerator: function() {
                console.log("Creating cymbal generator");
                return function(time) {
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
            },
            
            // Cowbell generator
            createCowbellGenerator: function() {
                console.log("Creating cowbell generator");
                return function(time) {
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
        };
        
        // Recreate the instance with our patch
        // Create a script element that will run in the global context
        const scriptElement = document.createElement('script');
        scriptElement.textContent = `
            // Store reference to our functions
            window.drumGenerators = ${JSON.stringify(Object.keys(generators))};
            
            // Create new instances of all sound generators
            for (let i = 0; i < document.querySelectorAll('.beat-grid').length; i++) {
                console.log("Creating new BeatMaker instance with custom generators");
                const newBeatMaker = new BeatMaker();
                
                // Add our custom generators
                newBeatMaker.soundGenerators.rimshot = ${generators.createRimshotGenerator.toString()}().bind(newBeatMaker);
                newBeatMaker.soundGenerators.tom = ${generators.createTomGenerator.toString()}().bind(newBeatMaker);
                newBeatMaker.soundGenerators.cymbal = ${generators.createCymbalGenerator.toString()}().bind(newBeatMaker);
                newBeatMaker.soundGenerators.cowbell = ${generators.createCowbellGenerator.toString()}().bind(newBeatMaker);
                
                console.log("New BeatMaker with generators:", Object.keys(newBeatMaker.soundGenerators));
            }
            
            console.log("Drum generators patch applied successfully");
        `;
        
        // Add the script to the document to execute it
        document.head.appendChild(scriptElement);
        
        console.log("Drum generator patch script added to document");
    }, 1000); // Wait 1 second to ensure BeatMaker has initialized
});
*/

// Modern Instrument Generators

// 808 Bass Generator - Essential for modern trap and hip-hop
function create808Bass(audioContext) {
    return (time, options = {}) => {
        const defaults = {
            frequency: 60,
            attack: 0.01,
            decay: 0.5,
            sustain: 0.8,
            release: 1.5,
            volume: 0.9,
            distortion: 4
        };
        
        const params = { ...defaults, ...options };
        
        // Oscillator for initial transient
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = params.frequency;
        
        // Envelope for the 808 shape
        const envelope = audioContext.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(params.volume, time + params.attack);
        envelope.gain.linearRampToValueAtTime(params.volume * params.sustain, time + params.attack + params.decay);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + params.attack + params.decay + params.release);
        
        // Distortion for character
        const distortion = audioContext.createWaveShaper();
        distortion.curve = makeDistortionCurve(params.distortion);
        
        // Filter for that 808 thump
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, time);
        filter.frequency.exponentialRampToValueAtTime(100, time + 0.1);
        filter.Q.value = 1;
        
        // Connect everything
        osc.connect(filter);
        filter.connect(distortion);
        distortion.connect(envelope);
        
        // Start and stop
        osc.start(time);
        osc.stop(time + params.attack + params.decay + params.release + 0.1);
        
        return envelope;
    };
}

// Trap Hi-Hat Generator with signature rolls
function createTrapHiHat(audioContext) {
    return (time, options = {}) => {
        const defaults = {
            frequency: 8000,
            decay: 0.08,
            volume: 0.7,
            pan: 0,
            isRoll: false,
            rollSpeed: 4
        };
        
        const params = { ...defaults, ...options };
        
        // For rolls, we'll create multiple hi-hats
        const count = params.isRoll ? params.rollSpeed : 1;
        const interval = params.isRoll ? 0.05 : 0;
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = params.volume;
        
        // Panning
        const panner = audioContext.createStereoPanner();
        panner.pan.value = params.pan;
        
        for (let i = 0; i < count; i++) {
            const noteTime = time + (i * interval);
            
            // Noise source
            const bufferSize = audioContext.sampleRate * 2;
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            for (let j = 0; j < bufferSize; j++) {
                output[j] = Math.random() * 2 - 1;
            }
            
            const noise = audioContext.createBufferSource();
            noise.buffer = noiseBuffer;
            
            // Band-pass filter for hi-hat character
            const bandpass = audioContext.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = params.frequency;
            bandpass.Q.value = 1;
            
            // High-pass filter to remove low frequencies
            const highpass = audioContext.createBiquadFilter();
            highpass.type = 'highpass';
            highpass.frequency.value = 7000;
            
            // Envelope
            const envelope = audioContext.createGain();
            const decay = params.isRoll ? params.decay * 0.5 : params.decay;
            envelope.gain.setValueAtTime(params.volume, noteTime);
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
        
        panner.connect(gainNode);
        return gainNode;
    };
}

// Modern vocal chop generator
function createVocalChop(audioContext) {
    return (time, options = {}) => {
        const defaults = {
            note: 'C4',
            chop: 1, // 1-5 different chop types
            attack: 0.01,
            release: 0.3,
            volume: 0.7,
            reverb: 0.3
        };
        
        const params = { ...defaults, ...options };
        
        // Create frequency based on note
        const noteToFreq = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
            'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
            'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
        };
        
        const frequency = noteToFreq[params.note] || 440;
        
        // Oscillator to mix with noise for vocal-like quality
        const osc = audioContext.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = frequency;
        
        // Noise component to mix with oscillator
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 0.2 - 0.1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        
        // Formant filter for vocal character
        const formant = audioContext.createBiquadFilter();
        formant.type = 'bandpass';
        formant.frequency.value = frequency * 1.5;
        formant.Q.value = 5;
        
        // Second formant
        const formant2 = audioContext.createBiquadFilter();
        formant2.type = 'bandpass';
        formant2.frequency.value = frequency * 2.5;
        formant2.Q.value = 4;
        
        // Chop patterns - simulate different syllables
        let chopGain = 1;
        let chopFreq = 1;
        
        switch (params.chop) {
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
        const envelope = audioContext.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(params.volume * chopGain, time + params.attack);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + params.attack + params.release);
        
        // Oscillator mix (vocal component)
        const oscGain = audioContext.createGain();
        oscGain.gain.value = 0.7;
        
        // Noise mix (breath component)
        const noiseGain = audioContext.createGain();
        noiseGain.gain.value = 0.3;
        
        // Reverb (convolution)
        const convolver = audioContext.createConvolver();
        const reverbBuffer = createReverbBuffer(audioContext, 1.5);
        convolver.buffer = reverbBuffer;
        
        // Reverb mix
        const reverbGain = audioContext.createGain();
        reverbGain.gain.value = params.reverb;
        
        const dryGain = audioContext.createGain();
        dryGain.gain.value = 1 - params.reverb;
        
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
        
        // Start and stop
        osc.start(time);
        noise.start(time);
        osc.stop(time + params.attack + params.release + 0.1);
        noise.stop(time + params.attack + params.release + 0.1);
        
        const outputGain = audioContext.createGain();
        dryGain.connect(outputGain);
        reverbGain.connect(outputGain);
        
        return outputGain;
    };
}

// Future Bass style synth
function createFutureBass(audioContext) {
    return (time, options = {}) => {
        const defaults = {
            note: 'C4',
            attack: 0.05,
            decay: 0.2,
            sustain: 0.8,
            release: 0.5,
            detune: 15,
            lfoRate: 6,
            lfoDepth: 20,
            volume: 0.7
        };
        
        const params = { ...defaults, ...options };
        
        // Create frequency based on note
        const noteToFreq = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
            'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
            'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
        };
        
        const frequency = noteToFreq[params.note] || 440;
        
        // Create multiple oscillators for rich sound
        const oscillators = [];
        const waveforms = ['sine', 'triangle', 'sawtooth'];
        const gains = [];
        
        // LFO for modulation
        const lfo = audioContext.createOscillator();
        lfo.frequency.value = params.lfoRate;
        
        const lfoGain = audioContext.createGain();
        lfoGain.gain.value = params.lfoDepth;
        
        lfo.connect(lfoGain);
        lfo.start(time);
        lfo.stop(time + params.attack + params.decay + params.release + 0.1);
        
        // Main envelope
        const envelope = audioContext.createGain();
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(params.volume, time + params.attack);
        envelope.gain.linearRampToValueAtTime(params.volume * params.sustain, time + params.attack + params.decay);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + params.attack + params.decay + params.release);
        
        // Filter for signature "wub" sound
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;
        filter.Q.value = 5;
        
        // Connect LFO to filter
        lfoGain.connect(filter.frequency);
        
        // Create three oscillators with slightly different settings
        for (let i = 0; i < 3; i++) {
            const osc = audioContext.createOscillator();
            osc.type = waveforms[i % waveforms.length];
            osc.frequency.value = frequency;
            
            // Detune each oscillator differently
            osc.detune.value = (i - 1) * params.detune;
            
            // Individual gain for mixing
            const gain = audioContext.createGain();
            gain.gain.value = 0.3; // Mix equally
            
            oscillators.push(osc);
            gains.push(gain);
            
            // Connect osc -> gain -> filter -> envelope
            osc.connect(gain);
            gain.connect(filter);
            
            // Start and stop each oscillator
            osc.start(time);
            osc.stop(time + params.attack + params.decay + params.release + 0.1);
        }
        
        // Connect filter to envelope
        filter.connect(envelope);
        
        return envelope;
    };
}

// Utility: Distortion curve generator
function makeDistortionCurve(amount) {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    
    for (let i = 0; i < samples; ++i) {
        const x = i * 2 / samples - 1;
        curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
    }
    
    return curve;
}

// Utility: Create reverb impulse response buffer
function createReverbBuffer(audioContext, duration) {
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * duration;
    const impulse = audioContext.createBuffer(2, length, sampleRate);
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

// Export all generators for use in main script
// Original generators
// ...

// Add the new modern generators
// ... existing code ...

// Export all generators
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Original generators
        // ...
        
        // New modern generators
        create808Bass,
        createTrapHiHat,
        createVocalChop,
        createFutureBass
    };
}
