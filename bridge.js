// bridge.js - AVATAR CONTROLS ONLY (No Overlay Conflicts)
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
        console.log('[Botemia Bridge] Initialized - Avatar Controls Only');
        
        // SMART: Auto-fix on load
        this.autoFixForZoom();
        
        // SMART: Also listen for Zoom meeting patterns
        this.setupZoomDetection();
        
        // Avatar controls only
        this.fixFooterControls();
        this.setupMuteButton();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
        this.setupKeyboardShortcuts();
        
        // CRITICAL: Add escape key protection
        this.setupEscapeProtection();
        
        // SMART: Add visual status indicator
        this.addZoomReadyIndicator();
    }
    
    // 🔥 CRITICAL: Prevent widget from intercepting Escape when overlays are open
    setupEscapeProtection() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                // Check if any overlay is visible
                const anyOverlayVisible = document.querySelector('.overlay.active, .website-overlay.active, .video-modal.active');
                
                if (anyOverlayVisible) {
                    console.log('[Bridge] Blocking Escape from widget - overlay is open');
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // Trigger script.js hideAllOverlays
                    if (window.hideAllOverlays && typeof window.hideAllOverlays === 'function') {
                        window.hideAllOverlays();
                    }
                    
                    return false;
                }
            }
        }, true); // Use capture phase to run BEFORE widget handlers
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
        // Find footer controls container
        const footerControls = document.querySelector('.footer-controls');
        if (!footerControls) return;
        
        const indicator = document.createElement('div');
        indicator.id = 'botemia-zoom-indicator';
        indicator.style.cssText = `
            display: inline-flex;
            align-items: center;
            margin-left: 10px;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(255,68,68,0.9);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
        `;
        
        indicator.innerHTML = `
            <span style="margin-right:4px;">🔴</span>
            <span>Zoom</span>
        `;
        
        indicator.onclick = () => {
            this.ensureZoomReady();
        };
        
        // Insert after the restart button
        const restartBtn = document.getElementById('footer-restart');
        if (restartBtn) {
            restartBtn.parentNode.insertBefore(indicator, restartBtn.nextSibling);
        } else {
            footerControls.appendChild(indicator);
        }
        
        this.zoomIndicator = indicator;
    }
    
    updateZoomIndicator() {
        if (!this.zoomIndicator) return;
        
        if (this.zoomReady) {
            this.zoomIndicator.style.background = 'rgba(0,204,0,0.9)';
            this.zoomIndicator.innerHTML = `
                <span style="margin-right:4px;">✅</span>
                <span>Zoom</span>
            `;
            this.zoomIndicator.title = 'Botemia ready for Zoom';
        } else {
            this.zoomIndicator.style.background = 'rgba(255,68,68,0.9)';
            this.zoomIndicator.innerHTML = `
                <span style="margin-right:4px;">🔴</span>
                <span>Zoom</span>
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
    
    // 🔥 AVATAR CONTROLS ONLY (No overlay interference)
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

            // Only avatar control shortcuts
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
            
            // Keep F1 for help only
            if (event.key === 'F1') {
                event.preventDefault();
                alert(`🎮 BOTEMIA KEYBOARD SHORTCUTS:\n\n📢 Audio:\nCtrl+M = Toggle Microphone\nCtrl+U = Toggle Mute\n\n👁️ Visibility:\nCtrl+S = Show Widget\nCtrl+R = Restart\n\nℹ️ Press Escape to close overlays`);
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
    
    setupLeadMagnetButtons() {
        document.getElementById('free-book-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Free Book requested');
            // Let script.js handle the CTA
            if (window.showCTA && typeof window.showCTA === 'function') {
                window.showCTA('book');
            }
        });

        document.getElementById('mobile-report-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Mobile Report requested');
            // Let script.js handle the CTA
            if (window.showCTA && typeof window.showCTA === 'function') {
                window.showCTA('report');
            }
        });
    }
    
    setupCueButtons() {
        // These should trigger website overlays via script.js
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`cue-${i}`)?.addEventListener('click', () => {
                console.log(`[Bridge] Cue ${i} clicked - letting script.js handle overlay`);
                // script.js will handle this via its own event listeners
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.botemiaBridge = new BotemiaBridge();
        console.log('[Bridge] Botemia Bridge READY - Avatar Controls Only');
        console.log('✅ Auto-fix enabled');
        console.log('✅ Zoom detection active');
        console.log('✅ Escape protection active');
        console.log('✅ No overlay interference');
    }, 2000);
});