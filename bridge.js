// bridge.js - Complete Botemia Control Bridge (FIXED VERSION)
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
        
        // Fix all controls
        this.fixFooterControls();
        this.setupMuteButton();
        this.fixOverlayButtons();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
        this.setupKeyboardShortcuts();
        
        // Hide any old pause button
        document.getElementById('footer-pause')?.style.display = 'none';
    }

    // ==================== FOOTER CONTROLS ====================
    fixFooterControls() {
        // Stop Button - Minimize widget
        document.getElementById('footer-stop')?.addEventListener('click', () => {
            console.log('[Bridge] Minimizing avatar');
            this.widget.setAttribute('controlled-widget-state', 'minimized');
            this.isWidgetActive = false;
        });

        // Mic Toggle Button
        document.getElementById('footer-mic')?.addEventListener('click', async () => {
            console.log('[Bridge] Toggling microphone');
            await this.toggleMicrophone();
        });

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

    // ==================== MUTE BUTTON SETUP ====================
    setupMuteButton() {
        const muteBtn = document.getElementById('footer-mute');
        if (!muteBtn) {
            console.warn('[Bridge] Mute button not found in HTML');
            return;
        }
        
        muteBtn.addEventListener('click', async () => {
            await this.toggleMute();
        });
        
        console.log('[Bridge] Mute button ready');
    }

    // ==================== MICROPHONE CONTROL ====================
    async toggleMicrophone() {
        try {
            if (this.isMicOn) {
                await this.widget.micOff?.();
                this.isMicOn = false;
                const micBtn = document.getElementById('footer-mic');
                if (micBtn) {
                    micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
                    micBtn.title = 'Turn Microphone On';
                }
            } else {
                await this.widget.micOn?.();
                this.isMicOn = true;
                const micBtn = document.getElementById('footer-mic');
                if (micBtn) {
                    micBtn.innerHTML = '<i class="fas fa-microphone"></i> Mic';
                    micBtn.title = 'Turn Microphone Off';
                }
            }
            console.log(`[Bridge] Microphone: ${this.isMicOn ? 'ON' : 'OFF'}`);
        } catch (error) {
            console.error('[Bridge] Mic toggle failed:', error);
        }
    }

    // ==================== MUTE/AUDIO CONTROL ====================
    async toggleMute() {
        try {
            // Small delay to ensure widget is ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const muteBtn = document.getElementById('footer-mute');
            
            if (this.isMuted) {
                // Unmute
                await this.widget.unmute?.();
                this.isMuted = false;
                if (muteBtn) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
                    muteBtn.title = 'Mute Audio';
                    muteBtn.style.backgroundColor = '';
                }
                console.log('[Bridge] Audio UNMUTED');
            } else {
                // Mute
                await this.widget.mute?.();
                this.isMuted = true;
                if (muteBtn) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Unmute';
                    muteBtn.title = 'Unmute Audio';
                    muteBtn.style.backgroundColor = '#ff4444';
                }
                console.log('[Bridge] Audio MUTED');
            }
        } catch (error) {
            console.error('[Bridge] Mute toggle failed:', error);
            // Fallback visual toggle
            this.isMuted = !this.isMuted;
            const muteBtn = document.getElementById('footer-mute');
            if (muteBtn) {
                if (this.isMuted) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Unmute';
                    muteBtn.style.backgroundColor = '#ff4444';
                } else {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
                    muteBtn.style.backgroundColor = '';
                }
            }
        }
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            // Ctrl/Cmd + letter shortcuts
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
Ctrl+S = Show Widget
Ctrl+R = Restart Session

🚀 Quick Actions:
F2 = Testimonial Center
F3 = Communication Center
F4 = Video Center
F1 = Show This Help

Tip: Use during presentations!`;
        
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
        
        console.log('[Bridge] Session restarted');
    }

    // ==================== OVERLAY CONTROLS ====================
    fixOverlayButtons() {
        document.getElementById('show-testimonial')?.addEventListener('click', () => {
            this.showTestimonialCenter();
        });

        document.getElementById('show-commcenter')?.addEventListener('click', () => {
            this.showCommunicationCenter();
        });

        document.getElementById('show-videocenter')?.addEventListener('click', () => {
            this.showVideoCenter();
        });
    }

    // ==================== LEAD MAGNET BUTTONS ====================
    setupLeadMagnetButtons() {
        document.getElementById('free-book-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Free Book requested');
            this.offerLeadMagnet('Free AI Business Book', '#');
        });

        document.getElementById('mobile-report-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Mobile Report requested');
            this.offerLeadMagnet('Free Mobile Report', '#');
        });
    }

    // ==================== CUE BUTTONS ====================
    setupCueButtons() {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`cue-${i}`)?.addEventListener('click', () => {
                this.triggerCueSegment(i);
            });
        }
    }

    // ==================== CORE FUNCTIONS ====================
    async showTestimonialCenter() {
        await this.widget.sendMessage('Let me show you our Testimonial Center with real client results.');
        document.getElementById('testimonial-overlay').style.display = 'flex';
        this.widget.setAttribute('controlled-widget-state', 'minimized');
    }

    async showCommunicationCenter() {
        await this.widget.sendMessage('Perfect! Let me open our Communication Center to connect you with our team.');
        document.getElementById('commcenter-overlay').style.display = 'flex';
        // Baton pass will be added here
    }

    async showVideoCenter() {
        await this.widget.sendMessage('I\'ll show you exactly how it works in our Video Center.');
        document.getElementById('videocenter-overlay').style.display = 'flex';
        this.widget.setAttribute('controlled-widget-state', 'minimized');
    }

    async offerLeadMagnet(offerName, downloadUrl) {
        await this.widget.sendMessage(`I'd be happy to send you our ${offerName}. Let me get that for you.`);
        document.getElementById('cta-header').style.display = 'block';
    }

    async triggerCueSegment(cueNumber) {
        const messages = [
            "Let me explain how our AI system works...",
            "Here's what makes our technology unique...",
            "Let me show you some key features...",
            "Here are the results you can expect..."
        ];
        
        await this.widget.sendMessage(messages[cueNumber - 1]);
    }

    // ==================== UTILITY ====================
    async forceMessage(message) {
        if (!this.isWidgetActive) {
            this.widget.setAttribute('controlled-widget-state', 'active');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        await this.widget.sendMessage(message);
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.botemiaBridge = new BotemiaBridge();
        console.log('[Bridge] Botemia Bridge READY!');
        console.log(`
🎮 Keyboard Shortcuts Enabled:
Ctrl+M = Toggle Microphone
Ctrl+U = Toggle Mute
Ctrl+S = Show Widget
Ctrl+R = Restart
F1 = Help, F2 = Testimonial, F3 = Comm Center, F4 = Video Center
        `);
    }, 2000);
});