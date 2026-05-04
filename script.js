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
    // Helper function to safely add listeners
    function safeAddListener(id, event, func) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener(event, func);
        } else {
            console.warn(`[Setup Warning] Element with ID '${id}' not found.`);
        }
    }

    // Slide Navigation
    safeAddListener('next-slide', 'click', nextSlide);
    safeAddListener('prev-slide', 'click', prevSlide);
    
    // Close any overlay when clicking any close button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('overlay-close')) {
            hideAllOverlays();
        }
    });
    
    // Overlay Controls
    safeAddListener('show-testimonial', 'click', () => showOverlay('testimonial'));
    safeAddListener('show-commcenter', 'click', () => showOverlay('commcenter'));
    safeAddListener('show-videocenter', 'click', () => showOverlay('videocenter'));
    
    // Overlay Close Buttons
    safeAddListener('close-testimonial', 'click', hideAllOverlays);
    safeAddListener('close-commcenter', 'click', hideAllOverlays);
    safeAddListener('close-videocenter', 'click', hideAllOverlays);
    
    // Video Controls
    safeAddListener('testimonial-video-trigger', 'click', playDemoVideo);
    safeAddListener('close-video', 'click', hideAllOverlays);
    
    // Botemia Control Buttons (if they exist)
    if (document.getElementById('botemia-pause')) {
        safeAddListener('botemia-pause', 'click', pauseBotemia);
        safeAddListener('botemia-stop', 'click', stopBotemia);
        safeAddListener('toggle-mic', 'click', toggleMic);
    }

    // Keyboard Shortcuts (Optional)
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight': e.preventDefault(); nextSlide(); break;
            case 'ArrowLeft': e.preventDefault(); prevSlide(); break;
            case 'Escape': hideAllOverlays(); break;
        }
    });
    
    console.log('All event listeners attached.');

    // ============================================
    // MULTI-DECK SLIDE NAVIGATION
    // ============================================

    let deck2Index = 0;
    let deck3Index = 0;
    const slideContainer = document.getElementById('slide-content');

    function showDeckSlide(deckSlides, index) {
        if (index < 0 || index >= deckSlides.length) return;
        if (slideContainer && deckSlides[index].content) {
            slideContainer.innerHTML = deckSlides[index].content;
        }
    }

    // Deck 2 nav - Safe Check Added
    const deck2Prev = document.querySelector('.deck2-prev');
    const deck2Next = document.querySelector('.deck2-next');
    
    if (deck2Prev) {
        deck2Prev.addEventListener('click', function() {
            deck2Index = Math.max(0, deck2Index - 1);
            showDeckSlide(slides2, deck2Index);
        });
    }
    if (deck2Next) {
        deck2Next.addEventListener('click', function() {
            deck2Index = Math.min(slides2.length - 1, deck2Index + 1);
            showDeckSlide(slides2, deck2Index);
        });
    }

    // Deck 3 nav - Safe Check Added
    const deck3Prev = document.querySelector('.deck3-prev');
    const deck3Next = document.querySelector('.deck3-next');

    if (deck3Prev) {
        deck3Prev.addEventListener('click', function() {
            deck3Index = Math.max(0, deck3Index - 1);
            showDeckSlide(slides3, deck3Index);
        });
    }
    if (deck3Next) {
        deck3Next.addEventListener('click', function() {
            deck3Index = Math.min(slides3.length - 1, deck3Index + 1);
            showDeckSlide(slides3, deck3Index);
        });
    }
}