// script.js - AI TV DIRECTOR'S CONTROL PANEL LOGIC
// =================================================

// GLOBAL STATE
let currentSlideIndex = 0;
const overlays = {
    testimonial: document.getElementById('testimonial-overlay'),
    commcenter: document.getElementById('commcenter-overlay'),
    videocenter: document.getElementById('videocenter-overlay')
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

// ================= UI STATUS UPDATE =================
function updateStatus(message) {
    const statusEl = document.getElementById('connection-status');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

// ================= EVENT LISTENER SETUP =================
function setupEventListeners() {
    // Slide Navigation
    document.getElementById('next-slide').addEventListener('click', nextSlide);
    document.getElementById('prev-slide').addEventListener('click', prevSlide);
    
    // Cue Buttons (1-4)
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`cue-${i}`);
        if (btn) {
            btn.addEventListener('click', () => {
                loadSlide(i - 1); // Load corresponding slide
                cueBotemiaSegment(btn.dataset.cueId); // Log the cue for manual action
            });
        }
    }
    
    // Overlay Controls
    document.getElementById('show-testimonial').addEventListener('click', () => showOverlay('testimonial'));
    document.getElementById('show-commcenter').addEventListener('click', () => showOverlay('commcenter'));
    document.getElementById('show-videocenter').addEventListener('click', () => showOverlay('videocenter'));
    
    // Overlay Close Buttons
    document.getElementById('close-testimonial').addEventListener('click', hideAllOverlays);
    document.getElementById('close-commcenter').addEventListener('click', hideAllOverlays);
    document.getElementById('close-videocenter').addEventListener('click', hideAllOverlays);
    
    // Video Controls
    document.getElementById('testimonial-video-trigger').addEventListener('click', playDemoVideo);
    document.getElementById('close-video').addEventListener('click', hideAllOverlays);
    
    // Botemia Control Buttons (Placeholder - manual for now)
    document.getElementById('botemia-pause').addEventListener('click', pauseBotemia);
    document.getElementById('botemia-stop').addEventListener('click', stopBotemia);
    document.getElementById('toggle-mic').addEventListener('click', toggleMic);
    
    // Keyboard Shortcuts (Optional)
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight': e.preventDefault(); nextSlide(); break;
            case 'ArrowLeft': e.preventDefault(); prevSlide(); break;
            case 'Escape': hideAllOverlays(); break;
        }
    });
    
    console.log('All event listeners attached.');
}