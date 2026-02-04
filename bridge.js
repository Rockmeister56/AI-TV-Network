// bridge.js - Complete Botemia Control Bridge (WITH MUTE & KEYBOARD SHORTCUTS)
class BotemiaBridge {
    constructor() {
        this.widget = document.querySelector('lemon-slice-widget');
        this.isMicOn = false;
        this.isMuted = false;
        this.isWidgetActive = true;
        this.init();
    }

    init() {
        console.log('[Botemia Bridge] Initialized');
        this.fixFooterControls();
        this.fixOverlayButtons();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
        this.setupKeyboardShortcuts(); // NEW: Keyboard shortcuts
    }

    // ==================== FOOTER CONTROLS ====================
    fixFooterControls() {
          // REMOVE THIS ENTIRE SECTION:
    // Pause Button - Hide widget
    // document.getElementById('footer-pause')?.addEventListener('click', () => {
    //     console.log('[Bridge] Pausing avatar');
    //     this.widget.setAttribute('controlled-widget-state', 'hidden');
    //     this.isWidgetActive = false;
    // });
        // Stop Button - Minimize widget
        document.getElementById('footer-stop')?.addEventListener('click', () => {
            console.log('[Bridge] Stopping/minimizing avatar');
            this.widget.setAttribute('controlled-widget-state', 'minimized');
            this.isWidgetActive = false;
        });

        // Mic Toggle Button (turns microphone on/off)
        document.getElementById('footer-mic')?.addEventListener('click', async () => {
            console.log('[Bridge] Toggling microphone');
            await this.toggleMicrophone();
        });

        // NEW: Mute Button (mutes/unmutes audio output)
        // We need to add this button to HTML first, but let's create the function
        this.addMuteButton();

        // Chat Button - Open/Activate widget
        document.getElementById('footer-chat')?.addEventListener('click', () => {
            console.log('[Bridge] Opening chat');
            this.widget.setAttribute('controlled-widget-state', 'active');
            this.isWidgetActive = true;
        });

        // Restart Button - Reset conversation
        document.getElementById('footer-restart')?.addEventListener('click', () => {
            console.log('[Bridge] Restarting session');
            this.restartSession();
        });
    }

    // ==================== NEW MUTE BUTTON ====================
    addMuteButton() {
        // Check if mute button already exists in HTML
        if (!document.getElementById('footer-mute')) {
            // Create and insert mute button into footer controls
            const footerControls = document.querySelector('.footer-controls');
            if (footerControls) {
                const muteButton = document.createElement('button');
                muteButton.id = 'footer-mute';
                muteButton.className = 'footer-btn';
                muteButton.title = 'Mute/Unmute Audio';
                muteButton.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
                
                // Insert before the restart button
                const restartBtn = document.getElementById('footer-restart');
                if (restartBtn) {
                    footerControls.insertBefore(muteButton, restartBtn);
                } else {
                    footerControls.appendChild(muteButton);
                }

                // Add click handler
                muteButton.addEventListener('click', async () => {
                    await this.toggleMute();
                });
            }
        } else {
            // If button already exists in HTML, just add the handler
            document.getElementById('footer-mute')?.addEventListener('click', async () => {
                await this.toggleMute();
            });
        }
    }

    // ==================== MICROPHONE CONTROL ====================
    async toggleMicrophone() {
        if (this.isMicOn) {
            await this.widget.micOff?.();
            this.isMicOn = false;
            // Update button appearance
            const micBtn = document.getElementById('footer-mic');
            if (micBtn) {
                micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
                micBtn.title = 'Turn Microphone On';
            }
        } else {
            await this.widget.micOn?.();
            this.isMicOn = true;
            // Update button appearance
            const micBtn = document.getElementById('footer-mic');
            if (micBtn) {
                micBtn.innerHTML = '<i class="fas fa-microphone"></i> Mic';
                micBtn.title = 'Turn Microphone Off';
            }
        }
        console.log(`[Bridge] Microphone: ${this.isMicOn ? 'ON' : 'OFF'}`);
    }

    // ==================== MUTE/AUDIO CONTROL ====================
    async toggleMute() {
        if (this.isMuted) {
            await this.widget.unmute?.();
            this.isMuted = false;
            // Update button appearance
            const muteBtn = document.getElementById('footer-mute');
            if (muteBtn) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
                muteBtn.title = 'Mute Audio';
                muteBtn.style.backgroundColor = ''; // Reset color
            }
        } else {
            await this.widget.mute?.();
            this.isMuted = true;
            // Update button appearance
            const muteBtn = document.getElementById('footer-mute');
            if (muteBtn) {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Unmute';
                muteBtn.title = 'Unmute Audio';
                muteBtn.style.backgroundColor = '#ff4444'; // Red when muted
            }
        }
        console.log(`[Bridge] Audio Mute: ${this.isMuted ? 'ON' : 'OFF'}`);
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Only trigger if not typing in an input field
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            // Use Ctrl/Cmd + letter for shortcuts
            if (event.ctrlKey || event.metaKey) {
                switch(event.key.toLowerCase()) {
                    case 'm': // Ctrl+M = Toggle Microphone
                        event.preventDefault();
                        this.toggleMicrophone();
                        this.showShortcutNotification('Microphone Toggled');
                        break;
                        
                    case 'u': // Ctrl+U = Toggle Mute
                        event.preventDefault();
                        this.toggleMute();
                        this.showShortcutNotification('Audio Mute Toggled');
                        break;
                        
                    case 'h': // Ctrl+H = Hide Widget
                        event.preventDefault();
                        this.widget.setAttribute('controlled-widget-state', 'hidden');
                        this.showShortcutNotification('Widget Hidden');
                        break;
                        
                    case 's': // Ctrl+S = Show Widget
                        event.preventDefault();
                        this.widget.setAttribute('controlled-widget-state', 'active');
                        this.showShortcutNotification('Widget Shown');
                        break;
                        
                    case 'r': // Ctrl+R = Restart
                        event.preventDefault();
                        this.restartSession();
                        this.showShortcutNotification('Session Restarted');
                        break;
                }
            }
            
            // Function keys
            switch(event.key) {
                case 'F1': // F1 = Show Help
                    event.preventDefault();
                    this.showShortcutHelp();
                    break;
                    
                case 'F2': // F2 = Testimonial Center
                    event.preventDefault();
                    this.showTestimonialCenter();
                    break;
                    
                case 'F3': // F3 = Communication Center
                    event.preventDefault();
                    this.showCommunicationCenter();
                    break;
                    
                case 'F4': // F4 = Video Center
                    event.preventDefault();
                    this.showVideoCenter();
                    break;
            }
        });
    }

    showShortcutNotification(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            border-left: 4px solid #00ff00;
        `;
        notification.textContent = `🚀 ${message}`;
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
        
        console.log(`[Bridge Shortcut] ${message}`);
    }

    showShortcutHelp() {
        const helpText = `
🎮 BOTEMIA KEYBOARD SHORTCUTS:

📢 Audio Controls:
Ctrl+M = Toggle Microphone
Ctrl+U = Toggle Audio Mute

👁️ Visibility:
Ctrl+H = Hide Widget
Ctrl+S = Show Widget
Ctrl+R = Restart Session

🚀 Quick Actions:
F2 = Testimonial Center
F3 = Communication Center
F4 = Video Center
F1 = Show This Help

Tip: Use these during presentations!`;
        
        alert(helpText);
    }

    // ==================== RESTART SESSION ====================
    async restartSession() {
        this.widget.setAttribute('controlled-widget-state', 'hidden');
        await new Promise(resolve => setTimeout(resolve, 500));
        this.widget.setAttribute('controlled-widget-state', 'active');
        this.isWidgetActive = true;
        
        // Reset states
        this.isMicOn = false;
        this.isMuted = false;
        
        // Reset button appearances
        const micBtn = document.getElementById('footer-mic');
        if (micBtn) micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
        
        const muteBtn = document.getElementById('footer-mute');
        if (muteBtn) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
            muteBtn.style.backgroundColor = '';
        }
    }

    // ==================== (KEEP ALL YOUR EXISTING FUNCTIONS BELOW) ====================
    // ... keep all your existing showTestimonialCenter(), showCommunicationCenter(), etc.
    // ... ALL THE REST OF YOUR EXISTING CODE STAYS THE SAME
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.botemiaBridge = new BotemiaBridge();
        console.log('[Bridge] Botemia Bridge ready with Mute & Keyboard Shortcuts!');
        
        // Show available shortcuts on load
        console.log(`
🎮 Botemia Keyboard Shortcuts Enabled:
Ctrl+M = Toggle Microphone
Ctrl+U = Toggle Mute
Ctrl+H = Hide Widget  
Ctrl+S = Show Widget
Ctrl+R = Restart
F1 = Help, F2 = Testimonial, F3 = Comm Center, F4 = Video Center
        `);
    }, 2000);
});