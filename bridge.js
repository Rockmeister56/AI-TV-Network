// bridge.js - Complete Botemia Control Bridge
class BotemiaBridge {
    constructor() {
        this.widget = document.querySelector('lemon-slice-widget');
        this.isMicOn = false;
        this.isMuted = false;
        this.isWidgetActive = true;
        this.audioCheckInterval = null;
        this.init();
    }

    init() {
        console.log('[Botemia Bridge] Initialized');
        
        this.fixFooterControls();
        this.setupMuteButton();
        this.fixOverlayButtons();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
        this.setupKeyboardShortcuts();
        
        // Start audio monitoring
        this.startAudioMonitoring();
    }

    // ==================== AUDIO MONITORING ====================
    startAudioMonitoring() {
        console.log('[Audio Monitor] Starting audio status monitoring...');
        
        if (this.audioCheckInterval) {
            clearInterval(this.audioCheckInterval);
        }
        
        this.audioCheckInterval = setInterval(() => {
            this.checkAudioStatus();
        }, 3000);
        
        setTimeout(() => this.checkAudioStatus(), 1000);
    }
    
    checkAudioStatus() {
        if (!this.widget) {
            console.warn('[Audio Monitor] Widget not found');
            return;
        }
        
        try {
            const status = {
                widgetState: this.widget.getAttribute('controlled-widget-state'),
                canUnmute: this.widget.canUnmute?.(),
                isMicOn: this.widget.isMicOn?.(),
                isMuted: this.widget.isMuted?.(),
                timestamp: new Date().toLocaleTimeString()
            };
            
            console.log('🔊 AUDIO STATUS:', status);
            this.autoFixAudioIssues(status);
            
        } catch (error) {
            console.error('[Audio Monitor] Error:', error);
        }
    }
    
    autoFixAudioIssues(status) {
        if (status.widgetState === 'active' && !status.isMicOn) {
            console.log('[Audio Monitor] Fixing: widget active but mic off');
            setTimeout(async () => {
                try {
                    await this.widget.micOn?.();
                    console.log('[Audio Monitor] ✅ Mic auto-fixed');
                } catch (e) {
                    console.log('[Audio Monitor] Auto-fix failed:', e);
                }
            }, 1000);
        }
        
        if (status.isMuted && status.widgetState === 'active') {
            console.log('[Audio Monitor] Fixing: widget muted but active');
            setTimeout(async () => {
                try {
                    await this.widget.unmute?.();
                    console.log('[Audio Monitor] ✅ Unmuted auto-fixed');
                } catch (e) {
                    console.log('[Audio Monitor] Auto-unmute failed:', e);
                }
            }, 1000);
        }
    }
    
    emergencyMicFix() {
        console.log('[Emergency Fix] Fixing all audio...');
        
        this.widget.setAttribute('controlled-widget-state', 'active');
        
        setTimeout(async () => {
            try {
                await this.widget.micOn?.();
                console.log('[Emergency Fix] Step 1: Mic on');
            } catch (e) {
                console.warn('[Emergency Fix] micOn failed:', e);
            }
        }, 500);
        
        setTimeout(async () => {
            try {
                await this.widget.unmute?.();
                console.log('[Emergency Fix] Step 2: Unmuted');
            } catch (e) {
                console.warn('[Emergency Fix] unmute failed:', e);
            }
        }, 1000);
        
        console.log('[Emergency Fix] All fixes initiated');
    }

    // ==================== FOOTER CONTROLS ====================
    fixFooterControls() {
        document.getElementById('footer-stop')?.addEventListener('click', () => {
            console.log('[Bridge] Minimizing avatar');
            this.widget.setAttribute('controlled-widget-state', 'minimized');
            this.isWidgetActive = false;
        });

        document.getElementById('footer-mic')?.addEventListener('click', async () => {
            console.log('[Bridge] Toggling microphone');
            await this.toggleMicrophone();
        });

        document.getElementById('footer-chat')?.addEventListener('click', () => {
            console.log('[Bridge] Opening chat');
            this.widget.setAttribute('controlled-widget-state', 'active');
            this.isWidgetActive = true;
        });

        document.getElementById('footer-restart')?.addEventListener('click', () => {
            console.log('[Bridge] Restarting session');
            this.restartSession();
        });
    }

    // ==================== MUTE BUTTON SETUP ====================
    setupMuteButton() {
        const muteBtn = document.getElementById('footer-mute');
        if (!muteBtn) {
            console.warn('[Bridge] Mute button not found');
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
            const currentMicOn = this.widget.isMicOn?.();
            console.log('[Mic Toggle] Current:', currentMicOn, 'Our state:', this.isMicOn);
            
            if (this.isMicOn || currentMicOn) {
                await this.widget.micOff?.();
                this.isMicOn = false;
                const micBtn = document.getElementById('footer-mic');
                if (micBtn) {
                    micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
                    micBtn.title = 'Turn Microphone On';
                }
                console.log('[Mic Toggle] ✅ Mic OFF');
            } else {
                await this.widget.micOn?.();
                this.isMicOn = true;
                const micBtn = document.getElementById('footer-mic');
                if (micBtn) {
                    micBtn.innerHTML = '<i class="fas fa-microphone"></i> Mic';
                    micBtn.title = 'Turn Microphone Off';
                }
                console.log('[Mic Toggle] ✅ Mic ON');
            }
            
            setTimeout(() => {
                this.isMicOn = this.widget.isMicOn?.() || false;
                console.log('[Mic Toggle] Updated state:', this.isMicOn);
            }, 500);
            
        } catch (error) {
            console.error('[Mic Toggle] Failed:', error);
            this.isMicOn = !this.isMicOn;
            const micBtn = document.getElementById('footer-mic');
            if (micBtn) {
                if (this.isMicOn) {
                    micBtn.innerHTML = '<i class="fas fa-microphone"></i> Mic';
                    micBtn.style.backgroundColor = '#00ff00';
                } else {
                    micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
                    micBtn.style.backgroundColor = '';
                }
            }
        }
    }

    // ==================== MUTE/AUDIO CONTROL ====================
    async toggleMute() {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const muteBtn = document.getElementById('footer-mute');
            
            if (this.isMuted) {
                await this.widget.unmute?.();
                this.isMuted = false;
                if (muteBtn) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
                    muteBtn.title = 'Mute Audio';
                    muteBtn.style.backgroundColor = '';
                }
                console.log('[Bridge] Audio UNMUTED');
            } else {
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
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

            if (event.ctrlKey || event.metaKey) {
                switch(event.key.toLowerCase()) {
                    case 'm':
                        event.preventDefault();
                        this.toggleMicrophone();
                        this.showShortcutNotification('Microphone Toggled');
                        break;
                    case 'u':
                        event.preventDefault();
                        this.toggleMute();
                        this.showShortcutNotification('Audio Mute Toggled');
                        break;
                    case 's':
                        event.preventDefault();
                        this.widget.setAttribute('controlled-widget-state', 'active');
                        this.showShortcutNotification('Widget Shown');
                        break;
                    case 'r':
                        event.preventDefault();
                        this.restartSession();
                        this.showShortcutNotification('Session Restarted');
                        break;
                }
            }
            
            switch(event.key) {
                case 'F1':
                    event.preventDefault();
                    this.showShortcutHelp();
                    break;
                case 'F2':
                    event.preventDefault();
                    this.showTestimonialCenter();
                    break;
                case 'F3':
                    event.preventDefault();
                    this.showCommunicationCenter();
                    break;
                case 'F4':
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
            background: rgba(0,0,0,0.8);
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
        
        setTimeout(() => notification.remove(), 2000);
        console.log(`[Bridge Shortcut] ${message}`);
    }

    showShortcutHelp() {
        alert(`🎮 BOTEMIA KEYBOARD SHORTCUTS:

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
F1 = Show This Help`);
    }

    // ==================== RESTART SESSION ====================
    async restartSession() {
        console.log('[Restart] Full audio restart...');
        
        try {
            await this.widget.micOn?.();
        } catch (e) {
            console.log('[Restart] Could not ensure mic on:', e);
        }
        
        this.widget.setAttribute('controlled-widget-state', 'hidden');
        await new Promise(resolve => setTimeout(resolve, 500));
        this.widget.setAttribute('controlled-widget-state', 'active');
        this.isWidgetActive = true;
        
        this.isMicOn = false;
        this.isMuted = false;
        
        setTimeout(async () => {
            try {
                await this.widget.micOn?.();
                this.isMicOn = true;
                console.log('[Restart] ✅ Mic turned on after restart');
            } catch (e) {
                console.warn('[Restart] Could not turn mic on:', e);
            }
        }, 1000);
        
        const micBtn = document.getElementById('footer-mic');
        if (micBtn) micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
        
        const muteBtn = document.getElementById('footer-mute');
        if (muteBtn) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
            muteBtn.style.backgroundColor = '';
        }
        
        console.log('[Restart] Session restarted with audio check');
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
    }

    async showVideoCenter() {
        await this.widget.sendMessage("I'll show you exactly how it works in our Video Center.");
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
        console.log('[Bridge] Botemia Bridge READY with Audio Monitoring!');
        console.log('🎮 Commands: botemiaBridge.emergencyMicFix()');
    }, 2000);
});