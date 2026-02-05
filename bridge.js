// bridge.js - SMART AUTO-FIX VERSION
class BotemiaBridge {
    constructor() {
        this.widget = document.querySelector('lemon-slice-widget');
        this.isMicOn = false;
        this.isMuted = false;
        this.isWidgetActive = true;
        this.zoomReady = false;
        this.init();
    }

    init() {
        console.log('[Botemia Bridge] Initialized');
        
        // SMART: Auto-fix on load
        this.autoFixForZoom();
        
        // SMART: Also listen for Zoom meeting patterns
        this.setupZoomDetection();
        
        // Your existing controls
        this.fixFooterControls();
        this.setupMuteButton();
        this.fixOverlayButtons();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
        this.setupKeyboardShortcuts();
        
        // SMART: Add visual status indicator
        this.addZoomReadyIndicator();
    }
    
    // 🔥 SMART AUTO-FIX #1: Fix on page load
    autoFixForZoom() {
        console.log('[Auto-Fix] Preparing Botemia for Zoom...');
        
        setTimeout(() => {
            if (!this.widget) {
                console.warn('[Auto-Fix] Widget not ready yet');
                setTimeout(() => this.autoFixForZoom(), 2000); // Retry
                return;
            }
            
            // Force proper state
            this.widget.setAttribute('controlled-widget-state', 'active');
            
            // Ensure mic is on
            setTimeout(async () => {
                try {
                    await this.widget.micOn?.();
                    await this.widget.unmute?.();
                    
                    this.zoomReady = true;
                    console.log('[Auto-Fix] ✅ Botemia auto-fixed for Zoom!');
                    
                    // Update visual indicator
                    this.updateZoomIndicator();
                    
                } catch (error) {
                    console.warn('[Auto-Fix] Partial success:', error);
                }
            }, 1500);
            
        }, 1000);
    }
    
    // 🔥 SMART AUTO-FIX #2: Detect Zoom meetings
    setupZoomDetection() {
        // Listen for common Zoom patterns
        const zoomKeywords = ['zoom', 'meeting', 'call', 'demo', 'presentation'];
        const zoomUrls = ['zoom.us', 'meet', 'teams'];
        
        // Check URL for Zoom indicators
        const checkForZoom = () => {
            const url = window.location.href.toLowerCase();
            const hasZoomUrl = zoomUrls.some(zoomUrl => url.includes(zoomUrl));
            
            if (hasZoomUrl && !this.zoomReady) {
                console.log('[Zoom Detect] Zoom URL detected - ensuring Botemia ready');
                this.ensureZoomReady();
            }
        };
        
        // Check now and on URL changes
        checkForZoom();
        window.addEventListener('hashchange', checkForZoom);
        
        // Also listen for Zoom in page content
        const observer = new MutationObserver(() => {
            const pageText = document.body.textContent.toLowerCase();
            if (zoomKeywords.some(keyword => pageText.includes(keyword)) && !this.zoomReady) {
                console.log('[Zoom Detect] Zoom keywords found in page');
                this.ensureZoomReady();
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // 🔥 SMART AUTO-FIX #3: One-click fix button
    ensureZoomReady() {
        if (this.zoomReady) {
            console.log('[Zoom Ready] Already prepared');
            return;
        }
        
        console.log('[Zoom Ready] Ensuring Botemia ready...');
        
        if (this.widget) {
            this.widget.setAttribute('controlled-widget-state', 'active');
            
            setTimeout(async () => {
                try {
                    await this.widget.micOn?.();
                    await this.widget.unmute?.();
                    
                    this.zoomReady = true;
                    this.updateZoomIndicator();
                    
                    // Show confirmation
                    this.showNotification('🎤 Botemia ready for Zoom!', 'success');
                    
                } catch (error) {
                    this.showNotification('⚠️ Botemia partially ready', 'warning');
                }
            }, 1000);
        }
    }
    
    // 🔥 VISUAL INDICATOR: Shows when Botemia is Zoom-ready
    addZoomReadyIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'botemia-zoom-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s;
            cursor: pointer;
        `;
        
        indicator.innerHTML = `
            <span>🔴</span>
            <span>Zoom: Not Ready</span>
        `;
        
        indicator.onclick = () => {
            this.ensureZoomReady();
            this.showNotification('🔧 Fixing Botemia for Zoom...', 'info');
        };
        
        document.body.appendChild(indicator);
        this.zoomIndicator = indicator;
    }
    
    updateZoomIndicator() {
        if (!this.zoomIndicator) return;
        
        if (this.zoomReady) {
            this.zoomIndicator.style.background = '#00cc00';
            this.zoomIndicator.innerHTML = `
                <span>✅</span>
                <span>Zoom: Ready</span>
            `;
            this.zoomIndicator.title = 'Botemia is ready for Zoom calls';
        } else {
            this.zoomIndicator.style.background = '#ff4444';
            this.zoomIndicator.innerHTML = `
                <span>🔴</span>
                <span>Zoom: Click to Fix</span>
            `;
            this.zoomIndicator.title = 'Click to prepare Botemia for Zoom';
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00cc00' : type === 'warning' ? '#ff9900' : '#0088ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add animation styles if not present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // 🔥 REST OF YOUR EXISTING METHODS (keep exactly as they are)...
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
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

            if (event.ctrlKey || event.metaKey) {
                switch(event.key.toLowerCase()) {
                    case 'm':
                        event.preventDefault();
                        this.toggleMicrophone();
                        this.showNotification('Microphone Toggled');
                        break;
                    case 'u':
                        event.preventDefault();
                        this.toggleMute();
                        this.showNotification('Audio Mute Toggled');
                        break;
                    case 's':
                        event.preventDefault();
                        this.widget.setAttribute('controlled-widget-state', 'active');
                        this.showNotification('Widget Shown');
                        break;
                    case 'r':
                        event.preventDefault();
                        this.restartSession();
                        this.showNotification('Session Restarted');
                        break;
                }
            }
            
            switch(event.key) {
                case 'F1':
                    event.preventDefault();
                    alert(`🎮 BOTEMIA KEYBOARD SHORTCUTS:\n\n📢 Audio:\nCtrl+M = Toggle Microphone\nCtrl+U = Toggle Mute\n\n👁️ Visibility:\nCtrl+S = Show Widget\nCtrl+R = Restart\n\n🚀 Quick Actions:\nF2 = Testimonial\nF3 = Communication\nF4 = Video\nF1 = This Help`);
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
    
    async restartSession() {
        this.widget.setAttribute('controlled-widget-state', 'hidden');
        await new Promise(resolve => setTimeout(resolve, 500));
        this.widget.setAttribute('controlled-widget-state', 'active');
        this.isWidgetActive = true;
        
        this.isMicOn = false;
        this.isMuted = false;
        
        const micBtn = document.getElementById('footer-mic');
        if (micBtn) micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic';
        
        const muteBtn = document.getElementById('footer-mute');
        if (muteBtn) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
            muteBtn.style.backgroundColor = '';
        }
        
        // Reset Zoom ready status
        this.zoomReady = false;
        this.updateZoomIndicator();
        
        console.log('[Bridge] Session restarted');
    }
    
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
    
    setupCueButtons() {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`cue-${i}`)?.addEventListener('click', () => {
                this.triggerCueSegment(i);
            });
        }
    }
    
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
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.botemiaBridge = new BotemiaBridge();
        console.log('[Bridge] Botemia Bridge READY with Smart Zoom Fix!');
        console.log('✅ Auto-fix enabled');
        console.log('✅ Zoom detection active');
        console.log('✅ Visual indicator added');
    }, 2000);
});