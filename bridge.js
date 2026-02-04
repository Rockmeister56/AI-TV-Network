// bridge.js - Complete Botemia Control Bridge
class BotemiaBridge {
    constructor() {
        this.widget = document.querySelector('lemon-slice-widget');
        this.isMicOn = false;
        this.isWidgetActive = true;
        this.init();
    }

    init() {
        console.log('[Botemia Bridge] Initialized');
        this.fixFooterControls();
        this.fixOverlayButtons();
        this.setupLeadMagnetButtons();
        this.setupCueButtons();
    }

    // ==================== FOOTER CONTROLS ====================
    fixFooterControls() {
        // Pause Button - Hide widget
        document.getElementById('footer-pause')?.addEventListener('click', () => {
            console.log('[Bridge] Pausing avatar');
            this.widget.setAttribute('controlled-widget-state', 'hidden');
            this.isWidgetActive = false;
        });

        // Stop Button - Minimize widget
        document.getElementById('footer-stop')?.addEventListener('click', () => {
            console.log('[Bridge] Stopping/minimizing avatar');
            this.widget.setAttribute('controlled-widget-state', 'minimized');
            this.isWidgetActive = false;
        });

        // Mic Toggle Button
        document.getElementById('footer-mic')?.addEventListener('click', async () => {
            console.log('[Bridge] Toggling microphone');
            if (this.isMicOn) {
                await this.widget.micOff?.();
                this.isMicOn = false;
            } else {
                await this.widget.micOn?.();
                this.isMicOn = true;
            }
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
            // Hide then show to reset
            this.widget.setAttribute('controlled-widget-state', 'hidden');
            setTimeout(() => {
                this.widget.setAttribute('controlled-widget-state', 'active');
                this.isWidgetActive = true;
            }, 500);
        });
    }

    // ==================== OVERLAY CONTROLS ====================
    fixOverlayButtons() {
        // Testimonial Center Button
        document.getElementById('show-testimonial')?.addEventListener('click', () => {
            console.log('[Bridge] Showing Testimonial Center');
            this.showTestimonialCenter();
        });

        // Communication Center Button
        document.getElementById('show-commcenter')?.addEventListener('click', () => {
            console.log('[Bridge] Showing Communication Center');
            this.showCommunicationCenter();
        });

        // Video Center Button
        document.getElementById('show-videocenter')?.addEventListener('click', () => {
            console.log('[Bridge] Showing Video Center');
            this.showVideoCenter();
        });
    }

    // ==================== LEAD MAGNET BUTTONS ====================
    setupLeadMagnetButtons() {
        // Free Book Button
        document.getElementById('free-book-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Free Book requested');
            this.offerLeadMagnet('Free AI Business Book', 'book-download-url');
        });

        // Mobile Report Button
        document.getElementById('mobile-report-btn')?.addEventListener('click', () => {
            console.log('[Bridge] Mobile Report requested');
            this.offerLeadMagnet('Free Mobile Report', 'report-download-url');
        });
    }

    // ==================== CUE BUTTONS ====================
    setupCueButtons() {
        // Cue buttons 1-4
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`cue-${i}`)?.addEventListener('click', () => {
                console.log(`[Bridge] Cue ${i} triggered`);
                this.triggerCueSegment(i);
            });
        }
    }

    // ==================== CORE FUNCTIONS ====================
    async showTestimonialCenter() {
        // Make Botemia announce it
        await this.widget.sendMessage('Let me show you our Testimonial Center with real client results.');
        
        // Show the overlay (your existing code should handle this)
        document.getElementById('testimonial-overlay').style.display = 'flex';
        
        // Minimize Botemia during viewing
        this.widget.setAttribute('controlled-widget-state', 'minimized');
    }

    async showCommunicationCenter() {
        // Make Botemia announce it
        await this.widget.sendMessage('Perfect! Let me open our Communication Center to connect you with our team.');
        
        // Show the overlay
        document.getElementById('commcenter-overlay').style.display = 'flex';
        
        // THE BATON PASS WILL HAPPEN HERE
        // When user clicks "Get Pre-Qualified" inside the comm center
        this.setupBatonPass();
    }

    async showVideoCenter() {
        await this.widget.sendMessage('I\'ll show you exactly how it works in our Video Center.');
        document.getElementById('videocenter-overlay').style.display = 'flex';
        this.widget.setAttribute('controlled-widget-state', 'minimized');
    }

    async offerLeadMagnet(offerName, downloadUrl) {
        await this.widget.sendMessage(`I'd be happy to send you our ${offerName}. Let me get that for you.`);
        
        // Open CTA header or direct download
        document.getElementById('cta-header').style.display = 'block';
        // Or: window.open(downloadUrl, '_blank');
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

    // ==================== BATON PASS TO VOICE AI ====================
    setupBatonPass() {
        // This will be triggered when user clicks "Get Pre-Qualified" in Communication Center
        // We need to know the button ID inside the commcenter-overlay
        
        // Example: If there's a button with ID "get-prequalified-btn" in your comm center image
        // You would need to add a clickable area overlay on the image
        
        console.log('[Bridge] Baton pass system ready');
        console.log('[Bridge] TO DO: Add click handler to "Get Pre-Qualified" button in Communication Center image');
        
        // When ready, this will:
        // 1. Minimize Botemia
        // 2. Open your Voice AI system
        // 3. Handle the return
    }

    // ==================== UTILITY FUNCTIONS ====================
    async forceMessage(message) {
        if (!this.isWidgetActive) {
            this.widget.setAttribute('controlled-widget-state', 'active');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        await this.widget.sendMessage(message);
    }

    minimizeToCorner() {
        this.widget.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            width: 200px !important;
            height: 300px !important;
            z-index: 9999 !important;
        `;
    }

    restoreFullSize() {
        this.widget.style.cssText = '';
    }
}

// ==================== INITIALIZE BRIDGE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Lemon Slice widget to load
    setTimeout(() => {
        window.botemiaBridge = new BotemiaBridge();
        console.log('[Bridge] Botemia Bridge ready!');
    }, 2000);
});