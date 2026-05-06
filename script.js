// script.js - AI TV DIRECTOR'S CONTROL PANEL LOGIC
// =================================================

// GLOBAL STATE
let currentSlideIndex = 0;
const overlays = {
    testimonial: document.getElementById('testimonial-overlay'),
    commcenter: document.getElementById('commcenter-overlay'),
    videocenter: document.getElementById('videocenter-overlay'),
    website1: document.getElementById('website-1-overlay'),
    website2: document.getElementById('website-2-overlay'),
    website3: document.getElementById('website-3-overlay'),
    website4: document.getElementById('website-4-overlay')
};

const videoModal = document.getElementById('video-modal');
const demoVideo = document.getElementById('demo-video');

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI TV Control Panel Initialized.');
    loadSlide(currentSlideIndex);
    setupEventListeners();
    updateStatus('Ready');
});

// LEAD MAGNET & CTA FUNCTIONALITY

// CTA Data Objects - USING LOCAL FILES
const ctaData = {
    book: {
        image: 'assets/lead-magnets/book-cover.png',  // ← LOCAL PATH
        text: 'Get Your FREE Copy of "AI Powered Business" - Limited Time Offer!',
        buttonText: 'Download Free Book',
        buttonLink: 'https://freeaibook.info'  // ← UPDATE THIS LINK
    },
    report: {
        image: 'assets/lead-magnets/mobile-report.png',  // ← LOCAL PATH
        text: 'FREE Mobile Marketing Report: Boost Your Conversions by 300%',
        buttonText: 'Get Free Report',
        buttonLink: 'https://freemobilereport.com'  // ← UPDATE THIS LINK
    }
};

// Lead Magnet Button Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const freeBookBtn = document.getElementById('free-book-btn');
    const mobileReportBtn = document.getElementById('mobile-report-btn');
    const ctaHeader = document.getElementById('cta-header');
    const ctaImage = document.getElementById('cta-image');
    const ctaText = document.getElementById('cta-text');
    const ctaActionBtn = document.getElementById('cta-action-btn');
    const ctaClose = document.getElementById('cta-close');
    
    // Free Book Button
    if (freeBookBtn) {
        freeBookBtn.addEventListener('click', function() {
            showCTA('book');
        });
    }
    
    // Mobile Report Button
    if (mobileReportBtn) {
        mobileReportBtn.addEventListener('click', function() {
            showCTA('report');
        });
    }
    
    // CTA Close Button
    if (ctaClose) {
        ctaClose.addEventListener('click', hideCTA);
    }
    
    // CTA Action Button
    if (ctaActionBtn) {
        ctaActionBtn.addEventListener('click', function() {
            const currentType = ctaActionBtn.dataset.type;
            if (currentType && ctaData[currentType]) {
                window.open(ctaData[currentType].buttonLink, '_blank');
            }
        });
    }
});

// Function to show CTA
function showCTA(type) {
    const ctaHeader = document.getElementById('cta-header');
    const ctaImage = document.getElementById('cta-image');
    const ctaText = document.getElementById('cta-text');
    const ctaActionBtn = document.getElementById('cta-action-btn');
    
    if (ctaData[type]) {
        ctaImage.src = ctaData[type].image;
        ctaText.textContent = ctaData[type].text;
        ctaActionBtn.textContent = ctaData[type].buttonText;
        ctaActionBtn.dataset.type = type;
        ctaHeader.style.display = 'flex';
        
        // Auto-hide after 30 seconds
        setTimeout(hideCTA, 30000);
    }
}

// Function to hide CTA
function hideCTA() {
    const ctaHeader = document.getElementById('cta-header');
    ctaHeader.style.display = 'none';
}

// Optional: Auto-show CTA on page load after 60 seconds
setTimeout(() => {
    showCTA('book');
}, 60000);

function showWebsiteOverlay(num) {
    // Hide any other website overlay first
    hideAllWebsiteOverlays();
    
    // Show requested website overlay
    const overlay = document.getElementById(`website-${num}-overlay`);
    if (overlay) {
        overlay.classList.add('active');
        console.log(`Showing website overlay ${num}`);
        updateStatus(`Website Example ${num}`);
    }
}

function hideAllWebsiteOverlays() {
    // Hide all website overlays
    for (let i = 1; i <= 4; i++) {
        const overlay = document.getElementById(`website-${i}-overlay`);
        if (overlay) overlay.classList.remove('active');
    }
    updateStatus('Ready');
}

// Close button
document.querySelectorAll('.website-close').forEach(btn => {
    btn.addEventListener('click', hideAllWebsiteOverlays);
});

// ================= SLIDE MANAGEMENT =================
function loadSlide(index) {
    if (!slides || index < 0 || index >= slides.length) {
        console.error('Invalid slide index or slides not loaded.');
        return;
    }
    currentSlideIndex = index;
    const slide = slides[currentSlideIndex];
    const slideContentEl = document.getElementById('slide-content');
    
    if (slideContentEl && slide.content) {
        slideContentEl.innerHTML = slide.content;
        console.log(`Loaded Slide ${index + 1}: ${slide.title}`);
        updateStatus(`Slide: ${slide.title}`);
    }
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) nextIndex = 0; // Loop to start
    loadSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) prevIndex = slides.length - 1; // Loop to end
    loadSlide(prevIndex);
}

// ================= OVERLAY CONTROLS =================
function showOverlay(overlayKey) {
    // First, close any other open overlays
    for (const key in overlays) {
        if (overlays[key] && overlays[key].classList.contains('active')) {
            overlays[key].classList.remove('active');
        }
    }
    // Show the requested overlay
    if (overlays[overlayKey]) {
        overlays[overlayKey].classList.add('active');
        console.log(`Showing overlay: ${overlayKey}`);
        updateStatus(`${overlayKey.replace('-', ' ')} active`);
    }
}

function hideAllOverlays() {
    for (const key in overlays) {
        if (overlays[key]) {
            overlays[key].classList.remove('active');
        }
    }
    videoModal.classList.remove('active');
    if (demoVideo) {
        demoVideo.pause();
        demoVideo.currentTime = 0;
    }
    console.log('All overlays closed.');
    updateStatus('Ready');
}

// ================= VIDEO CONTROLS =================
function playDemoVideo() {
    if (demoVideo) {
        videoModal.classList.add('active');
        demoVideo.play();
        console.log('Playing demo video.');
        updateStatus('Playing testimonial video');
    }
}

// ================= BOTEMIA CONTROLS (Placeholder) =================
// These functions are ready for future integration.
function cueBotemiaSegment(cueId) {
    console.log(`[MANUAL CUE REQUIRED] Botemia should now deliver segment: ${cueId}`);
    console.log('--> Host: Click the "Video Chat" button in the Botemia widget.');
    updateStatus(`Cue: ${cueId} - Use Botemia Widget UI`);
    // Future: Integrate with widget.sendMessage(cueId) when custom actions are set up.
}

function pauseBotemia() {
    console.log('[MANUAL ACTION REQUIRED] Pause Botemia audio via widget UI.');
    updateStatus('Avatar Paused (Manual)');
}

function stopBotemia() {
    console.log('[MANUAL ACTION REQUIRED] Stop Botemia interaction via widget UI.');
    updateStatus('Avatar Stopped (Manual)');
}

function toggleMic() {
    console.log('[MANUAL ACTION REQUIRED] Toggle Botemia mic via widget UI.');
    updateStatus('Mic Toggled (Manual)');
}

// ================= FOOTER BOTEMIA CONTROLS =================
function updateAvatarStatus(message) {
    const statusEl = document.getElementById('avatar-status');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

function pauseAvatar() {
    console.log('[FOOTER] Pause Avatar requested');
    updateAvatarStatus('Paused');
    // Future: widget.pause() if API supports it
}

function stopAvatar() {
    console.log('[FOOTER] Stop Avatar requested');
    updateAvatarStatus('Stopped');
    // Future: widget.stop() if API supports it
}

function toggleAvatarMic() {
    console.log('[FOOTER] Toggle Mic requested');
    updateAvatarStatus('Mic Toggled');
    // Future: widget.micOn() / widget.micOff()
}

function openAvatarChat() {
    console.log('[FOOTER] Open Chat requested');
    updateAvatarStatus('Chat Active');
    // Future: widget.setAttribute('controlled-widget-state', 'active')
}

function restartAvatarSession() {
    console.log('[FOOTER] Restart Session requested');
    updateAvatarStatus('Restarting...');
    // Future: widget.reload() or reinitialize
}

// ================= UI STATUS UPDATE =================
function updateStatus(message) {
    const statusEl = document.getElementById('connection-status');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

// ================= EVENT LISTENER SETUP =================
function setupEventListeners() {
    console.log('Attaching listeners for Multi-Deck System...');

    // ----------------------------------------------------
    // 1. DECK 1 (Smart AI Demo)
    // ----------------------------------------------------
    const d1Prev = document.querySelector('.deck1-prev');
    const d1Next = document.querySelector('.deck1-next');

    if (d1Prev) d1Prev.addEventListener('click', prevSlide); // Uses existing prevSlide logic
    if (d1Next) d1Next.addEventListener('click', nextSlide);   // Uses existing nextSlide logic

    // ----------------------------------------------------
    // 2. DECK 2 (AI Review Publisher)
    // ----------------------------------------------------
    let deck2Index = 0;
    const d2Prev = document.querySelector('.deck2-prev');
    const d2Next = document.querySelector('.deck2-next');

    if (d2Prev) {
        d2Prev.addEventListener('click', () => {
            // Ensure slides2 exists and has content
            if (typeof slides2 !== 'undefined') {
                deck2Index = Math.max(0, deck2Index - 1);
                loadSpecificSlide(slides2, deck2Index);
            } else {
                console.warn('slides2 data not found');
            }
        });
    }

    if (d2Next) {
        d2Next.addEventListener('click', () => {
            if (typeof slides2 !== 'undefined') {
                deck2Index = Math.min(slides2.length - 1, deck2Index + 1);
                loadSpecificSlide(slides2, deck2Index);
            } else {
                console.warn('slides2 data not found');
            }
        });
    }

    // ----------------------------------------------------
    // 3. DECK 3 (AI Performance Plan)
    // ----------------------------------------------------
    let deck3Index = 0;
    const d3Prev = document.querySelector('.deck3-prev');
    const d3Next = document.querySelector('.deck3-next');

    if (d3Prev) {
        d3Prev.addEventListener('click', () => {
            if (typeof slides3 !== 'undefined') {
                deck3Index = Math.max(0, deck3Index - 1);
                loadSpecificSlide(slides3, deck3Index);
            } else {
                console.warn('slides3 data not found');
            }
        });
    }

    if (d3Next) {
        d3Next.addEventListener('click', () => {
            if (typeof slides3 !== 'undefined') {
                deck3Index = Math.min(slides3.length - 1, deck3Index + 1);
                loadSpecificSlide(slides3, deck3Index);
            } else {
                console.warn('slides3 data not found');
            }
        });
    }

  // ============================================
// DEMO ANALYTICS — Opens dashboard overlay
// ============================================

setTimeout(function() {
    var demoBtn = document.getElementById('demo-analytics-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            var overlay = document.getElementById('analytics-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });
        console.log('✅ Demo analytics button ready');
    }
}, 1000);

    // ----------------------------------------------------
    // OVERLAY CONTROLS
    // ----------------------------------------------------
    // These match your HTML IDs, so they should work fine now
    
    const btnTestimonial = document.getElementById('show-testimonial');
    const btnCommCenter = document.getElementById('show-commcenter');
    const btnVideoCenter = document.getElementById('show-videocenter');

    if (btnTestimonial) btnTestimonial.addEventListener('click', () => showOverlay('testimonial'));
    if (btnCommCenter) btnCommCenter.addEventListener('click', () => showOverlay('commcenter'));
    if (btnVideoCenter) btnVideoCenter.addEventListener('click', () => showOverlay('videocenter'));

    // Global Close Button logic (for generic overlay-close classes)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.overlay-close') || e.target.classList.contains('overlay-close')) {
            hideAllOverlays();
        }
    });

    // Real-time activity listener
if (window.supabaseChannel) {
    window.supabaseChannel.on('broadcast', { event: 'analytics_event' }, function(payload) {
        var event = payload.payload;
        var ticker = document.getElementById('live-activity');
        var text = document.getElementById('live-activity-text');
        
        switch(event.event_type) {
            case 'splash_view': text.textContent = '👀 Visitor viewing splash screen'; break;
            case 'activate_tess': text.textContent = '🤖 Visitor activated Tess'; break;
            case 'prequal_start': text.textContent = '📋 Pre-qualification interview started'; break;
            case 'lead_captured': text.textContent = '📧 Lead captured: ' + (event.event_data?.email || 'new lead'); break;
            case 'phone_connect': text.textContent = '📞 Phone call initiated'; break;
        }
        
        ticker.style.display = 'block';
        setTimeout(function() { ticker.style.display = 'none'; }, 4000);
    });
}

        // ----------------------------------------------------
    // KEYBOARD SHORTCUTS
    // ----------------------------------------------------
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight': e.preventDefault(); nextSlide(); break;
            case 'ArrowLeft': e.preventDefault(); prevSlide(); break;
            case 'Escape': 
                var analyticsOverlay = document.getElementById('analytics-overlay');
                if (analyticsOverlay) analyticsOverlay.style.display = 'none';
                hideAllOverlays(); 
                break;
        }
    });

    console.log('✅ All Multi-Deck event listeners attached.');
}

// --------------------------------------------------------
// HELPER FUNCTION FOR MULTI-DECK LOADING
// --------------------------------------------------------
// This separates the "which slide" logic from the "render" logic
// so Deck 2 and 3 can reuse the rendering code cleanly.
function loadSpecificSlide(slideDeckArray, index) {
    if (!slideDeckArray || index < 0 || index >= slideDeckArray.length) {
        console.error('Invalid slide deck or index.');
        return;
    }

    const slide = slideDeckArray[index];
    const slideContentEl = document.getElementById('slide-content');
    
    if (slideContentEl && slide.content) {
        slideContentEl.innerHTML = slide.content;
        console.log(`Loaded Slide ${index + 1} from deck: ${slide.title}`);
        updateStatus(`Slide: ${slide.title}`);
    }
}