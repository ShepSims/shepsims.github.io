class SoundVisualizer {
    constructor(beatMaker) {
        this.beatMaker = beatMaker;
        this.canvas = document.getElementById('soundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.markersContainer = document.querySelector('.sound-markers');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Visualization properties
        this.style = 'cosmic';
        this.theme = 'neon';
        this.motionIntensity = 70;
        this.particleDensity = 200;
        
        // Initialize visualization elements
        this.particles = [];
        this.circles = [];
        this.stars = [];
        this.lines = [];
        this.waves = [];
        
        // Color themes
        this.themes = {
            neon: {
                background: '#050023',
                primary: '#ff00cc',
                secondary: '#3333ff',
                accent1: '#00ffff',
                accent2: '#ff9900',
                particle: ['#ff00cc', '#3333ff', '#00ffff', '#ff9900', '#9900ff']
            },
            sunset: {
                background: '#120d16',
                primary: '#ff7e5f',
                secondary: '#feb47b',
                accent1: '#ffb997',
                accent2: '#ff5757',
                particle: ['#ff7e5f', '#feb47b', '#ffb997', '#ff5757', '#ff9166']
            },
            ocean: {
                background: '#001e3c',
                primary: '#0083B0',
                secondary: '#00B4DB',
                accent1: '#91d9ff',
                accent2: '#2389da',
                particle: ['#0083B0', '#00B4DB', '#91d9ff', '#2389da', '#b5e2ff']
            },
            galaxy: {
                background: '#0f0f1b',
                primary: '#29323c',
                secondary: '#485563',
                accent1: '#7b88a0',
                accent2: '#a4b0be',
                particle: ['#29323c', '#485563', '#7b88a0', '#a4b0be', '#d1d8e0']
            }
        };
        
        // Sound colors
        this.soundColors = {
            kick: '#FF5E5B',
            snare: '#4ECDC4',
            hihat: '#FFD166',
            clap: '#FFE0AC',
            rimshot: '#FFAAA5',
            tom: '#A8E6CF',
            cymbal: '#DCEDC1',
            cowbell: '#FAD2E1',
            bass808: '#6A0DAD',
            trapHihat: '#FFD700',
            vocalChop: '#FF70A6',
            futureBass: '#05D9E8',
            synth: '#05D9E8'
        };
        
        // Initialize the canvas
        this.init();
    }
    
    init() {
        console.log('Initializing SoundVisualizer');
        
        // Make sure we have a valid canvas
        if (!this.canvas) {
            console.error('Sound canvas not found!');
            return;
        }
        
        // Set initial canvas size
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            console.log('Window resized, updating canvas');
            this.resizeCanvas();
        });
        
        // Make sure the canvas is visible when the visualize tab is shown
        const visualizeTab = document.querySelector('.tab-button[data-tab="visualize"]');
        if (visualizeTab) {
            visualizeTab.addEventListener('click', () => {
                console.log('Visualize tab clicked, updating canvas');
                // Give the tab time to become visible
                setTimeout(() => this.resizeCanvas(), 100);
            });
        }
        
        // Initialize particles
        this.createParticles();
        
        // Setup theme handling
        this.setupThemeButtons();
        
        // Setup style select
        this.setupStyleSelect();
        
        // Connect with beatmaker
        this.connectToBeatMaker();
        
        // Setup sliders
        this.setupSliders();
        
        // Start the animation loop
        this.animate();
        
        console.log('SoundVisualizer initialized successfully');
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        
        // Force canvas to match container size
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        console.log(`Canvas resized to ${this.width}x${this.height}`);
        
        // Recreate elements after resize
        this.createParticles();
    }
    
    setupThemeButtons() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        if (themeButtons.length === 0) {
            console.error("Theme buttons not found");
            return;
        }
        
        console.log(`Found ${themeButtons.length} theme buttons`);
        
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                themeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Set the theme
                this.theme = button.dataset.theme;
                console.log(`Theme changed to: ${this.theme}`);
                
                // Force redraw
                this.createParticles();
            });
        });
    }
    
    setupStyleSelect() {
        const styleSelect = document.getElementById('visualizationStyle');
        if (!styleSelect) {
            console.error("Visualization style selector not found");
            return;
        }
        
        styleSelect.addEventListener('change', () => {
            this.style = styleSelect.value;
            console.log(`Style changed to: ${this.style}`);
            
            // Recreate particles for the new style
            this.createParticles();
        });
    }
    
    setupSliders() {
        const motionSlider = document.getElementById('motionIntensity');
        const densitySlider = document.getElementById('particleDensity');
        
        if (!motionSlider || !densitySlider) {
            console.error("Sliders not found", {
                motionSlider: !!motionSlider,
                densitySlider: !!densitySlider
            });
            return;
        }
        
        motionSlider.addEventListener('input', () => {
            this.motionIntensity = parseInt(motionSlider.value);
            console.log(`Motion intensity changed to: ${this.motionIntensity}`);
        });
        
        densitySlider.addEventListener('input', () => {
            this.particleDensity = parseInt(densitySlider.value);
            console.log(`Particle density changed to: ${this.particleDensity}`);
            this.createParticles();
        });
    }
    
    connectToBeatMaker() {
        // Override the playSound method to also trigger visualizations
        const originalPlaySound = this.beatMaker.playSound;
        this.beatMaker.playSound = (soundName, time) => {
            // Call the original method
            originalPlaySound.call(this.beatMaker, soundName, time);
            
            // Trigger visualization
            this.visualizeSound(soundName);
        };
        
        // Also connect to synth notes
        const originalPlaySynthNote = this.beatMaker.playSynthNote;
        this.beatMaker.playSynthNote = (note, time) => {
            // Call the original method
            originalPlaySynthNote.call(this.beatMaker, note, time);
            
            // Trigger visualization
            this.visualizeSynthNote(note);
        };
    }
    
    createParticles() {
        // Clear existing particles
        this.particles = [];
        this.circles = [];
        this.stars = [];
        this.lines = [];
        this.waves = [];
        
        // Create new particles based on the selected style
        switch (this.style) {
            case 'cosmic':
                this.createCosmicWaves();
                break;
            case 'particles':
                this.createParticleSystem();
                break;
            case 'geometric':
                this.createGeometricPulse();
                break;
            case 'liquid':
                this.createLiquidHarmonics();
                break;
            case 'aurora':
                this.createAuroraBeats();
                break;
            default:
                this.createParticleSystem();
        }
    }
    
    createCosmicWaves() {
        // Create more stars for a better cosmic effect
        for (let i = 0; i < this.particleDensity * 3; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2.5, // Bigger stars
                alpha: Math.random() * 0.7 + 0.3, // More visible
                speed: Math.random() * 0.1 + 0.02 // Faster movement
            });
        }
        
        // Create more dramatic waves
        for (let i = 0; i < 8; i++) { // More waves
            this.waves.push({
                y: this.height * 0.2 + (i * this.height * 0.1),
                amplitude: 30 + (i * 10), // Larger amplitude
                frequency: 0.01 + (i * 0.002),
                speed: 0.05 + (i * 0.01),
                offset: Math.random() * 1000,
                color: i % 3 === 0 ? 'primary' : (i % 3 === 1 ? 'secondary' : 'accent1'),
                lineWidth: 3 + Math.floor(Math.random() * 3) // Varying line widths
            });
        }
        
        // Add some nebula-like elements
        for (let i = 0; i < 5; i++) {
            const size = 100 + Math.random() * 200;
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: size,
                color: Math.floor(Math.random() * 5),
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                opacity: 0.1 + Math.random() * 0.1,
                isNebula: true
            });
        }
    }
    
    createParticleSystem() {
        // Create more varied particles
        for (let i = 0; i < this.particleDensity * 1.5; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 5 + 1, // Larger particles
                color: Math.floor(Math.random() * 5),
                speedX: (Math.random() - 0.5) * 1.2, // Faster movement
                speedY: (Math.random() - 0.5) * 1.2,
                opacity: Math.random() * 0.6 + 0.4, // More visible
                pulseRate: 0.02 + Math.random() * 0.04, // Pulsing effect
                pulseDirection: Math.random() > 0.5 ? 1 : -1,
                maxRadius: Math.random() * 5 + 3
            });
        }
        
        // Add some attractors/focal points
        for (let i = 0; i < 3; i++) {
            this.circles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 50 + Math.random() * 100,
                strength: Math.random() * 0.2 + 0.1,
                color: i % 3
            });
        }
    }
    
    createGeometricPulse() {
        // Create concentric circles
        for (let i = 0; i < 5; i++) {
            this.circles.push({
                x: this.width / 2,
                y: this.height / 2,
                radius: 50 + (i * 50),
                lineWidth: 2,
                rotation: i * (Math.PI / 5),
                speed: 0.005 + (i * 0.001),
                color: i % 2 === 0 ? 'primary' : 'secondary'
            });
        }
        
        // Create connecting lines
        const count = 10;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = this.width / 2 + Math.cos(angle) * (this.width * 0.3);
            const y = this.height / 2 + Math.sin(angle) * (this.height * 0.3);
            
            this.lines.push({
                x: x,
                y: y,
                angle: angle,
                length: 100,
                lineWidth: 1.5,
                speed: 0.01 + (Math.random() * 0.02),
                color: i % 2 === 0 ? 'accent1' : 'accent2'
            });
        }
    }
    
    createLiquidHarmonics() {
        // Create fluid-like particles
        for (let i = 0; i < this.particleDensity * 0.7; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 8 + 2,
                color: Math.floor(Math.random() * 5),
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        
        // Create waves
        for (let i = 0; i < 3; i++) {
            this.waves.push({
                y: this.height * 0.3 + (i * this.height * 0.2),
                amplitude: 30 + (i * 10),
                frequency: 0.005 + (i * 0.001),
                speed: 0.02 + (i * 0.005),
                offset: Math.random() * 1000,
                color: i % 3 === 0 ? 'primary' : (i % 3 === 1 ? 'secondary' : 'accent1')
            });
        }
    }
    
    createAuroraBeats() {
        // Create aurora-like waves
        for (let i = 0; i < 7; i++) {
            this.waves.push({
                y: this.height * 0.2 + (i * this.height * 0.1),
                amplitude: 15 + (i * 5),
                frequency: 0.015 - (i * 0.001),
                speed: 0.03 + (i * 0.005),
                offset: Math.random() * 1000,
                color: i % 3 === 0 ? 'primary' : (i % 3 === 1 ? 'secondary' : 'accent1')
            });
        }
        
        // Create stars
        for (let i = 0; i < this.particleDensity; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.2,
                alpha: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.02
            });
        }
    }
    
    visualizeSound(soundName) {
        if (!this.soundColors[soundName]) return;
        
        // Create visual marker for the sound
        const marker = document.createElement('div');
        marker.className = `sound-marker ${soundName}`;
        
        // Random position for the marker
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        
        // Add to DOM
        this.markersContainer.appendChild(marker);
        
        // Create impact effect in the visualization
        this.createSoundImpact(soundName, x, y);
        
        // Remove marker after animation completes
        setTimeout(() => {
            if (marker.parentNode) {
                marker.parentNode.removeChild(marker);
            }
        }, 1200);
    }
    
    visualizeSynthNote(note) {
        const frequency = this.beatMaker.getNoteFrequency(note);
        const normalizedFreq = (frequency - 100) / 1000; // Normalize between 0 and 1 approximately
        
        // Calculate x and y positions based on note frequency
        const x = this.width * (0.2 + normalizedFreq * 0.6); // Keep within center 60% of width
        const y = this.height * (0.7 - normalizedFreq * 0.4); // Higher notes = higher position
        
        // Create visual marker for the synth note
        const marker = document.createElement('div');
        marker.className = 'sound-marker synth';
        
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        
        // Add to DOM
        this.markersContainer.appendChild(marker);
        
        // Create impact effect in the visualization
        this.createSoundImpact('synth', x, y);
        
        // Remove marker after animation completes
        setTimeout(() => {
            if (marker.parentNode) {
                marker.parentNode.removeChild(marker);
            }
        }, 1200);
    }
    
    createSoundImpact(soundName, x, y) {
        const impactForce = this.motionIntensity / 10;
        console.log(`Creating sound impact for ${soundName} at ${x},${y} with force ${impactForce}`);
        
        // Create a common explosion effect for all styles
        // Add a large central ripple marker
        const ripple = document.createElement('div');
        ripple.className = 'sound-marker';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.backgroundColor = 'transparent';
        ripple.style.borderRadius = '50%';
        ripple.style.border = `3px solid ${this.soundColors[soundName] || '#fff'}`;
        ripple.style.animation = 'ripple-effect 1s ease-out forwards';
        ripple.style.opacity = '0.8';
        
        // Add custom animation
        const styleSheet = document.styleSheets[0];
        if (!document.querySelector('style#visualizer-styles')) {
            const style = document.createElement('style');
            style.id = 'visualizer-styles';
            document.head.appendChild(style);
            
            // Add keyframes
            style.sheet.insertRule(`
                @keyframes ripple-effect {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            `, 0);
        }
        
        this.markersContainer.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
        
        // Style-specific effects
        switch(this.style) {
            case 'cosmic':
                // Disturb waves more dramatically
                this.waves.forEach(wave => {
                    wave.amplitude += impactForce * 15;
                    wave.offset += Math.random() * 30 - 15;
                });
                
                // Add burst particles
                for (let i = 0; i < 25; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 10 + Math.random() * 150;
                    const size = 3 + Math.random() * 5;
                    
                    this.particles.push({
                        x: x + Math.cos(angle) * (Math.random() * 10), // Start near center
                        y: y + Math.sin(angle) * (Math.random() * 10), 
                        targetX: x + Math.cos(angle) * distance,
                        targetY: y + Math.sin(angle) * distance,
                        radius: size,
                        color: Math.floor(Math.random() * 5),
                        speedX: Math.cos(angle) * (0.5 + Math.random() * 2.5) * (impactForce / 5),
                        speedY: Math.sin(angle) * (0.5 + Math.random() * 2.5) * (impactForce / 5),
                        opacity: 0.8 + Math.random() * 0.2,
                        decay: 0.01 + Math.random() * 0.03
                    });
                }
                
                // Add a bright flash
                const flash = document.createElement('div');
                flash.className = 'flash-effect';
                flash.style.position = 'absolute';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.backgroundColor = this.soundColors[soundName] || '#fff';
                flash.style.opacity = '0.2';
                flash.style.transition = 'opacity 0.3s ease-out';
                flash.style.pointerEvents = 'none';
                
                this.markersContainer.appendChild(flash);
                
                // Fade out the flash
                setTimeout(() => {
                    flash.style.opacity = '0';
                }, 50);
                
                // Remove the flash after fade out
                setTimeout(() => {
                    if (flash.parentNode) {
                        flash.parentNode.removeChild(flash);
                    }
                }, 300);
                break;
                
            case 'particles':
                // Add explosion particles
                for (let i = 0; i < 40; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * impactForce * 2;
                    
                    this.particles.push({
                        x: x,
                        y: y,
                        radius: Math.random() * 6 + 2,
                        color: Math.floor(Math.random() * 5),
                        speedX: Math.cos(angle) * speed,
                        speedY: Math.sin(angle) * speed,
                        opacity: 0.9,
                        decay: 0.01 + Math.random() * 0.02,
                        pulseRate: 0.05 + Math.random() * 0.1,
                        pulseDirection: Math.random() > 0.5 ? 1 : -1,
                        maxRadius: Math.random() * 6 + 4
                    });
                }
                
                // Add a new attractor at impact point
                this.circles.push({
                    x: x,
                    y: y,
                    radius: 150 + Math.random() * 100,
                    strength: 0.3 + Math.random() * 0.3,
                    color: Math.floor(Math.random() * 5),
                    decay: 0.01,
                    opacity: 0.5
                });
                break;
                
            case 'geometric':
                // Add multiple pulsing circles
                for (let i = 0; i < 3; i++) {
                    const delay = i * 100; // Staggered appearance
                    
                    setTimeout(() => {
                        this.circles.push({
                            x: x,
                            y: y,
                            radius: 10,
                            targetRadius: 100 + (impactForce * 15) + (i * 50),
                            lineWidth: 4 - i,
                            rotation: Math.random() * Math.PI * 2,
                            speed: 0.02 + (i * 0.01),
                            color: soundName,
                            opacity: 0.9 - (i * 0.2),
                            decay: 0.015 + (i * 0.005)
                        });
                    }, delay);
                }
                
                // Add radiating lines
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    
                    this.lines.push({
                        x: x,
                        y: y,
                        angle: angle,
                        length: 50 + Math.random() * 150,
                        lineWidth: 2,
                        speed: 0.01,
                        growSpeed: 10 + Math.random() * 20,
                        color: soundName,
                        opacity: 0.9,
                        decay: 0.02
                    });
                }
                break;
                
            case 'liquid':
                // Add liquid drops
                for (let i = 0; i < 30; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 150;
                    
                    this.particles.push({
                        x: x,
                        y: y,
                        radius: 8 + Math.random() * 15,
                        color: Math.floor(Math.random() * 5),
                        speedX: Math.cos(angle) * (Math.random() * impactForce),
                        speedY: Math.sin(angle) * (Math.random() * impactForce),
                        opacity: 0.7,
                        decay: 0.01 + Math.random() * 0.02
                    });
                }
                
                // Disturb waves dramatically
                this.waves.forEach(wave => {
                    if (Math.abs(wave.y - y) < 200) {
                        wave.amplitude += impactForce * 20;
                        // Create a localized disturbance
                        wave.disturbance = {
                            x: x,
                            amplitude: 50 + (impactForce * 30),
                            width: 100 + (impactForce * 40),
                            decay: 0.98
                        };
                    }
                });
                break;
                
            case 'aurora':
                // Disturb the aurora waves with a ripple effect
                this.waves.forEach((wave, index) => {
                    setTimeout(() => {
                        wave.amplitude += impactForce * (5 + index);
                        wave.frequency += 0.002;
                    }, index * 50); // Staggered effect
                });
                
                // Add burst particles in a circular pattern
                for (let i = 0; i < 30; i++) {
                    const angle = (i / 30) * Math.PI * 2;
                    const distance = 100 + Math.random() * 150;
                    
                    this.particles.push({
                        x: x,
                        y: y,
                        targetX: x + Math.cos(angle) * distance,
                        targetY: y + Math.sin(angle) * distance,
                        radius: Math.random() * 3 + 1,
                        color: Math.floor(Math.random() * 5),
                        opacity: 0.9,
                        decay: 0.02,
                        progress: 0,
                        speed: 0.05 + Math.random() * 0.05
                    });
                }
                break;
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Get theme colors
        const theme = this.themes[this.theme];
        
        // Clear canvas
        this.ctx.fillStyle = theme.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw based on the selected style
        switch (this.style) {
            case 'cosmic':
                this.drawCosmicWaves(theme);
                break;
            case 'particles':
                this.drawParticleSystem(theme);
                break;
            case 'geometric':
                this.drawGeometricPulse(theme);
                break;
            case 'liquid':
                this.drawLiquidHarmonics(theme);
                break;
            case 'aurora':
                this.drawAuroraBeats(theme);
                break;
            default:
                this.drawParticleSystem(theme);
        }
    }
    
    drawCosmicWaves(theme) {
        // Draw nebula-like particles first (background elements)
        this.particles.forEach((p, index) => {
            if (p.isNebula) {
                // Create a radial gradient for the nebula effect
                const gradient = this.ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.radius
                );
                
                const color = theme.particle[p.color % theme.particle.length];
                gradient.addColorStop(0, `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.5, `${color}${Math.floor(p.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${color}00`); // Transparent at edge
                
                this.ctx.beginPath();
                this.ctx.fillStyle = gradient;
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Move slowly
                p.x += p.speedX * (this.motionIntensity / 50);
                p.y += p.speedY * (this.motionIntensity / 50);
                
                // Wrap around screen
                if (p.x < -p.radius) p.x = this.width + p.radius;
                if (p.x > this.width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = this.height + p.radius;
                if (p.y > this.height + p.radius) p.y = -p.radius;
            }
        });
        
        // Draw stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            
            // Add glow effect to stars
            if (star.radius > 1.5) {
                const gradient = this.ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.radius * 4
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
                gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.alpha * 0.3})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Draw star center
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this.ctx.fill();
            
            // Move star slightly
            star.y -= star.speed * (this.motionIntensity / 50);
            if (star.y < -10) {
                star.y = this.height + 10;
                star.x = Math.random() * this.width;
                star.radius = Math.random() * 2.5;
            }
            
            // Twinkle
            star.alpha += (Math.random() - 0.5) * 0.05;
            star.alpha = Math.max(0.2, Math.min(0.9, star.alpha));
        });
        
        // Draw waves with glow effect
        this.waves.forEach(wave => {
            // Draw glow layer
            this.ctx.beginPath();
            
            // Update wave
            wave.offset += wave.speed * (this.motionIntensity / 50);
            
            // Gradually return amplitude to normal
            if (wave.amplitude > 30 + (this.waves.indexOf(wave) * 10)) {
                wave.amplitude *= 0.99;
            }
            
            // Draw wave path
            for (let x = 0; x < this.width; x += 3) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            // Set wave glow effect
            this.ctx.strokeStyle = `${theme[wave.color]}40`;  // 25% opacity
            this.ctx.lineWidth = wave.lineWidth * 3;
            this.ctx.stroke();
            
            // Draw main wave line over the glow
            this.ctx.beginPath();
            for (let x = 0; x < this.width; x += 3) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            // Set wave style
            this.ctx.strokeStyle = theme[wave.color];
            this.ctx.lineWidth = wave.lineWidth;
            this.ctx.stroke();
        });
        
        // Draw regular particles
        this.particles.forEach((p, index) => {
            if (!p.isNebula) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `${theme.particle[p.color % theme.particle.length]}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
                this.ctx.fill();
                
                // Add glow for some particles
                if (p.radius > 2 && Math.random() > 0.7) {
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                    this.ctx.fillStyle = `${theme.particle[p.color % theme.particle.length]}20`;
                    this.ctx.fill();
                }
                
                // Move particle
                p.x += p.speedX * (this.motionIntensity / 50);
                p.y += p.speedY * (this.motionIntensity / 50);
                
                // Fade out
                if (p.decay) {
                    p.opacity -= p.decay;
                    if (p.opacity <= 0) {
                        this.particles.splice(index, 1);
                    }
                }
                
                // Wrap around screen
                if (p.x < 0) p.x = this.width;
                if (p.x > this.width) p.x = 0;
                if (p.y < 0) p.y = this.height;
                if (p.y > this.height) p.y = 0;
            }
        });
    }
    
    drawParticleSystem(theme) {
        // Draw particles with pulsing effect
        this.particles.forEach((p, index) => {
            // Add pulsing animation
            if (p.pulseRate) {
                p.radius += p.pulseDirection * p.pulseRate;
                if (p.radius > p.maxRadius) {
                    p.pulseDirection = -1;
                } else if (p.radius < 1) {
                    p.pulseDirection = 1;
                }
            }
            
            // Draw particle glow
            const glowRadius = p.radius * 3;
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, glowRadius
            );
            
            const color = theme.particle[p.color % theme.particle.length];
            gradient.addColorStop(0, `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${color}00`); // Transparent at edge
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw particle core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${theme.particle[p.color % theme.particle.length]}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();
            
            // Apply attraction to focal points
            if (this.circles.length > 0) {
                this.circles.forEach(attractor => {
                    const dx = attractor.x - p.x;
                    const dy = attractor.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < attractor.radius) {
                        const force = (1 - dist / attractor.radius) * attractor.strength;
                        p.speedX += (dx / dist) * force;
                        p.speedY += (dy / dist) * force;
                    }
                });
                
                // Apply some drag to prevent extreme speeds
                p.speedX *= 0.99;
                p.speedY *= 0.99;
            }
            
            // Move particle
            p.x += p.speedX * (this.motionIntensity / 50);
            p.y += p.speedY * (this.motionIntensity / 50);
            
            // Fade out impact particles
            if (p.decay) {
                p.opacity -= p.decay;
                if (p.opacity <= 0) {
                    this.particles.splice(index, 1);
                }
            }
            
            // Wrap around screen
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
        });
        
        // Draw focal points with subtle glow
        this.circles.forEach(circle => {
            const gradient = this.ctx.createRadialGradient(
                circle.x, circle.y, 0,
                circle.x, circle.y, circle.radius
            );
            
            const baseColor = theme.particle[circle.color % theme.particle.length];
            gradient.addColorStop(0, `${baseColor}30`); // 30% opacity at center
            gradient.addColorStop(0.7, `${baseColor}10`); // 10% opacity at middle
            gradient.addColorStop(1, `${baseColor}00`); // Transparent at edge
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections between nearby particles
        this.ctx.strokeStyle = `${theme.accent1}60`; // 40% opacity
        this.ctx.lineWidth = 0.8;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    // Fade opacity based on distance
                    const opacity = 1 - (distance / 120);
                    this.ctx.strokeStyle = `${theme.accent1}${Math.floor(opacity * 100).toString(16).padStart(2, '0')}`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawGeometricPulse(theme) {
        // Draw concentric circles
        this.circles.forEach((circle, index) => {
            this.ctx.beginPath();
            
            // If it's a pulsing circle from a sound impact
            if (circle.targetRadius) {
                circle.radius += (circle.targetRadius - circle.radius) * 0.1;
                circle.opacity -= circle.decay;
                
                if (circle.opacity <= 0) {
                    this.circles.splice(index, 1);
                    return;
                }
                
                // Get color from sound color or theme
                const color = this.soundColors[circle.color] || theme[circle.color] || theme.primary;
                this.ctx.strokeStyle = `${color}${Math.floor(circle.opacity * 255).toString(16).padStart(2, '0')}`;
            } else {
                // Regular animated circle
                circle.rotation += circle.speed * (this.motionIntensity / 50);
                this.ctx.strokeStyle = theme[circle.color];
            }
            
            // Draw circle with gaps
            for (let i = 0; i < 8; i++) {
                const startAngle = circle.rotation + (i * Math.PI / 4);
                const endAngle = startAngle + (Math.PI / 8);
                
                this.ctx.arc(circle.x, circle.y, circle.radius, startAngle, endAngle);
            }
            
            this.ctx.lineWidth = circle.lineWidth;
            this.ctx.stroke();
        });
        
        // Draw lines
        this.lines.forEach(line => {
            line.angle += line.speed * (this.motionIntensity / 50);
            
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            
            const startX = centerX + Math.cos(line.angle) * (this.width * 0.3);
            const startY = centerY + Math.sin(line.angle) * (this.height * 0.3);
            
            const endX = startX + Math.cos(line.angle + Math.PI / 2) * line.length;
            const endY = startY + Math.sin(line.angle + Math.PI / 2) * line.length;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = theme[line.color];
            this.ctx.lineWidth = line.lineWidth;
            this.ctx.stroke();
        });
    }
    
    drawLiquidHarmonics(theme) {
        // Draw waves
        this.waves.forEach(wave => {
            this.ctx.beginPath();
            
            // Update wave
            wave.offset += wave.speed * (this.motionIntensity / 50);
            
            // Gradually return amplitude to normal
            if (wave.amplitude > 30 + (this.waves.indexOf(wave) * 10)) {
                wave.amplitude *= 0.98;
            }
            
            // Handle localized disturbance if present
            if (wave.disturbance) {
                // Decay the disturbance
                wave.disturbance.amplitude *= wave.disturbance.decay;
                
                // Remove if too small
                if (wave.disturbance.amplitude < 1) {
                    delete wave.disturbance;
                }
            }
            
            // Draw wave path
            for (let x = 0; x < this.width; x += 2) { // Higher resolution
                let y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                
                // Apply disturbance if present
                if (wave.disturbance) {
                    const dx = Math.abs(x - wave.disturbance.x);
                    if (dx < wave.disturbance.width) {
                        const disturbanceFactor = 1 - (dx / wave.disturbance.width); // 1 at center, 0 at edges
                        y += Math.sin(x * 0.05 + wave.offset * 2) * wave.disturbance.amplitude * disturbanceFactor;
                    }
                }
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            // Set wave style with more dramatic glow
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = theme[wave.color];
            this.ctx.stroke();
            
            // Add stronger glow effect
            this.ctx.lineWidth = 12;
            this.ctx.strokeStyle = `${theme[wave.color]}30`; // 30% opacity
            this.ctx.stroke();
            
            // Add inner intense glow
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = `${theme[wave.color]}60`; // 60% opacity
            this.ctx.stroke();
        });
        
        // Draw liquid particles
        this.particles.forEach((p, index) => {
            // Draw liquid blob (circle with blur)
            this.ctx.beginPath();
            
            // Create radial gradient for bubble effect
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius
            );
            
            const color = theme.particle[p.color % theme.particle.length];
            gradient.addColorStop(0, `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${color}00`); // Transparent at edge
            
            this.ctx.fillStyle = gradient;
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw highlight on some liquid particles
            if (p.radius > 10 && Math.random() > 0.7) {
                this.ctx.beginPath();
                this.ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
                this.ctx.fill();
            }
            
            // Move particle with slight wobble
            p.x += p.speedX * (this.motionIntensity / 50) + (Math.random() - 0.5) * 0.8;
            p.y += p.speedY * (this.motionIntensity / 50) + (Math.random() - 0.5) * 0.8;
            
            // Fade out impact particles
            if (p.decay) {
                p.opacity -= p.decay;
                if (p.opacity <= 0) {
                    this.particles.splice(index, 1);
                }
            }
            
            // Add some gravity
            p.speedY += 0.01;
            
            // Add some drag
            p.speedX *= 0.99;
            p.speedY *= 0.99;
            
            // Wrap around screen
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
        });
    }
    
    drawAuroraBeats(theme) {
        // Draw stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this.ctx.fill();
            
            // Move star slightly
            star.y -= star.speed * (this.motionIntensity / 50);
            if (star.y < 0) {
                star.y = this.height;
                star.x = Math.random() * this.width;
            }
            
            // Twinkle
            star.alpha += (Math.random() - 0.5) * 0.05;
            star.alpha = Math.max(0.1, Math.min(0.9, star.alpha));
        });
        
        // Draw aurora-like waves
        this.waves.forEach(wave => {
            // Create wave path
            const points = [];
            for (let x = 0; x < this.width; x += 5) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                points.push({ x, y });
            }
            
            // Update wave
            wave.offset += wave.speed * (this.motionIntensity / 70);
            
            // Gradually return amplitude to normal
            if (wave.amplitude > 15 + (this.waves.indexOf(wave) * 5)) {
                wave.amplitude *= 0.99;
            }
            
            // Draw glow using gradient
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.height);
            
            // Draw curve through points
            points.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.lineTo(point.x, point.y);
                } else {
                    const xc = (point.x + points[i - 1].x) / 2;
                    const yc = (point.y + points[i - 1].y) / 2;
                    this.ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
                }
            });
            
            // Complete the path
            this.ctx.lineTo(this.width, this.height);
            this.ctx.lineTo(0, this.height);
            
            // Create gradient
            const gradient = this.ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + 150);
            gradient.addColorStop(0, theme[wave.color] + '15'); // Almost transparent at top
            gradient.addColorStop(0.5, theme[wave.color] + '50'); // More visible in middle
            gradient.addColorStop(1, 'transparent'); // Transparent at bottom
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Add highlights at the top of each wave
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            
            points.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.moveTo(point.x, point.y);
                } else {
                    const xc = (point.x + points[i - 1].x) / 2;
                    const yc = (point.y + points[i - 1].y) / 2;
                    this.ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
                }
            });
            
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = theme[wave.color];
            this.ctx.stroke();
        });
        
        // Draw aurora particles
        this.particles.forEach((p, index) => {
            // Handle particles that move to target
            if (p.targetX !== undefined && p.targetY !== undefined) {
                // Update progress
                p.progress += p.speed || 0.05;
                
                // Calculate position based on progress (using easing)
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const progress = Math.min(1, p.progress);
                const easedProgress = ease(progress);
                
                // Move toward target position
                p.x = p.x + (p.targetX - p.x) * easedProgress;
                p.y = p.y + (p.targetY - p.y) * easedProgress;
                
                // Fade out when close to target
                if (progress > 0.7) {
                    p.opacity = 0.9 * (1 - (progress - 0.7) / 0.3);
                }
                
                // Remove when done
                if (progress >= 1) {
                    this.particles.splice(index, 1);
                    return;
                }
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            
            // Add glow for aurora particles
            const glow = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius * 5
            );
            
            const color = theme.particle[p.color % theme.particle.length];
            glow.addColorStop(0, `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
            glow.addColorStop(0.5, `${color}${Math.floor(p.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
            glow.addColorStop(1, `${color}00`); // Transparent at edge
            
            this.ctx.fillStyle = glow;
            this.ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${theme.particle[p.color % theme.particle.length]}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();
            
            // Fade out
            if (p.decay && !p.targetX) {
                p.opacity -= p.decay;
                if (p.opacity <= 0) {
                    this.particles.splice(index, 1);
                }
            }
        });
    }
}

// Initialize the visualizer when the page loads
window.addEventListener('load', () => {
    // Wait a bit to ensure the BeatMaker has initialized
    setTimeout(() => {
        // Check if BeatMaker instance is available
        if (window.beatMaker) {
            // Create the visualizer
            window.soundVisualizer = new SoundVisualizer(window.beatMaker);
            console.log('Sound Visualizer initialized');
        } else {
            console.error('BeatMaker instance not found');
        }
    }, 1000);
}); 