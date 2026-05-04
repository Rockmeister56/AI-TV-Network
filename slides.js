// slides.js - AI TV NETWORK SLIDE DECKS
// =============================================
// Three separate decks for different presentations

// DECK 1: Smart AI Demo (current slides, renamed)
const deck1Slides = [
    {
        id: 1,
        title: "AI TV Network",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
            <img src="assets/slides/slide1-ainetworkscreen.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_1"
    },
    {
        id: 2,
        title: "Just Ask AI",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide2-just-ask-ai.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_2"
    },
    {
        id: 3,
        title: "The AI Boost Factor",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide3-ai-boost-factor.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Show on the Road",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide4-show-on-the-road.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_4"
    },
    {
        id: 5,
        title: "The Number One Problem AI Solves",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
            <img src="assets/slides/slide5-number-one-problem-AI-solves.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_5"
    },
    {
        id: 6,
        title: "The Conversion Crises",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide6-conversion-crises2.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_6"
    },
    {
        id: 7,
        title: "Bleeding Money",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide7-bleeding-money.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_7"
    },
    {
        id: 8,
        title: "97 percent bail",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide8-97-percent-bail2.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_8"
    },
    {
        id: 9,
        title: "Kiss of Death",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide9-kiss-of-death2.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_9"
    },
    {
        id: 10,
        title: "The AI Comparison Factor",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide10-bot-comparison.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_10"
    },
    {
        id: 11,
        title: "Just Text",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide11-just-text.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_11"
    },
    {
        id: 12,
        title: "Boteemia",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide12-boteemia.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_12"
    },
    {
        id: 13,
        title: "Builds Trust",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide13-builds-trust.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_13"
    },
    {
        id: 14,
        title: "VidGuide in Action",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide14-vidguide-ai-in-action.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_14"
    },
    {
        id: 15,
        title: "Mortgage VidGuide AI Example",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide15-mortgage-web.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_15"
    },
    {
        id: 16,
        title: "Pre Sold Lead",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide16-hot-lead.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_16"
    },
    {
        id: 17,
        title: "Proof is in the Analystics",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide17-analystics.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_17"
    },
    {
        id: 18,
        title: "Just Ask AI with Boteemia",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide18-just-ask-ai-with-boteemia.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_18"
    },
    {
        id: 19,
        title: "Free Gifts",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide19-free-gifts.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_19"
    },
    {
        id: 20,
        title: "Thank You for Joining Us",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
            <img src="assets/slides/slide20-thank-you.png" style="max-width:100%; max-height:100%;">
        </div>`,
        botemiaCueId: "segment_20"
    }
];

// DECK 2: AI Review Publisher
const deck2Slides = [
    {
        id: 1,
        title: "AI Review Publisher",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h1 style="font-size:3rem; color:#f8c400;">📹 AI Review Publisher</h1>
            <p style="font-size:1.5rem; margin-top:20px;">Turn Every Closed Loan Into a Published Review</p>
        </div>`,
        botemiaCueId: "review_segment_1"
    },
    {
        id: 2,
        title: "The Problem",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Most Brokers Have 4-5 Reviews</h2>
            <p style="font-size:1.3rem; margin-top:20px;">92% of consumers read reviews before deciding.</p>
            <p style="font-size:1.3rem;">You're invisible without them.</p>
        </div>`,
        botemiaCueId: "review_segment_2"
    },
    {
        id: 3,
        title: "How It Works",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Send a Link, Tess Does the Rest</h2>
            <p style="font-size:1.3rem; margin-top:20px;">Text or email a link to your client.</p>
            <p style="font-size:1.3rem;">Tess interviews them in 3-5 minutes.</p>
            <p style="font-size:1.3rem;">Published to Google, YouTube, and your site.</p>
        </div>`,
        botemiaCueId: "review_segment_3"
    },
    {
        id: 4,
        title: "The Referral Engine",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Every Review = Referrals</h2>
            <p style="font-size:1.3rem; margin-top:20px;">At the end of every interview, Tess asks:</p>
            <p style="font-size:1.3rem; font-style:italic;">"Know anyone else who needs help?"</p>
            <p style="font-size:1.3rem;">Personal referral links track everything.</p>
        </div>`,
        botemiaCueId: "review_segment_4"
    },
    {
        id: 5,
        title: "The Flywheel",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Leads → Closes → Reviews → More Leads</h2>
            <p style="font-size:1.3rem; margin-top:20px;">It's a reputation flywheel.</p>
            <p style="font-size:1.3rem;">Every deal feeds the next.</p>
        </div>`,
        botemiaCueId: "review_segment_5"
    }
];

// DECK 3: AI Performance Plan
const deck3Slides = [
    {
        id: 1,
        title: "AI Performance Plan",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h1 style="font-size:3rem; color:#f8c400;">💰 AI Performance Plan</h1>
            <p style="font-size:1.5rem; margin-top:20px;">You Only Pay for Leads Above Your Baseline</p>
        </div>`,
        botemiaCueId: "plan_segment_1"
    },
    {
        id: 2,
        title: "Zero Risk",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">We Put Our Money Where Tess Is</h2>
            <p style="font-size:1.3rem; margin-top:20px;">If Tess doesn't outperform your current forms,</p>
            <p style="font-size:1.3rem;">you owe nothing. Period.</p>
        </div>`,
        botemiaCueId: "plan_segment_2"
    },
    {
        id: 3,
        title: "How It Works",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Simple Math</h2>
            <p style="font-size:1.3rem; margin-top:20px;">Baseline: 20 leads/month from forms</p>
            <p style="font-size:1.3rem;">Month 1 with Tess: 42 leads</p>
            <p style="font-size:1.3rem; color:#f8c400;">You pay for 22 incremental leads</p>
        </div>`,
        botemiaCueId: "plan_segment_3"
    },
    {
        id: 4,
        title: "Pricing",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Three Simple Tiers</h2>
            <p style="font-size:1.3rem; margin-top:20px;">Month-to-Month: $175/lead</p>
            <p style="font-size:1.3rem;">One Year: $150/lead</p>
            <p style="font-size:1.3rem;">Two Years: $125/lead</p>
            <p style="font-size:1rem; margin-top:20px; color:#aaa;">The longer we work together, the more you save.</p>
        </div>`,
        botemiaCueId: "plan_segment_4"
    },
    {
        id: 5,
        title: "The Bottom Line",
        content: `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#0f2b4b; color:white; flex-direction:column;">
            <h2 style="color:#f8c400; font-size:2rem;">Can You Afford Not To?</h2>
            <p style="font-size:1.3rem; margin-top:20px;">Your website is already losing 70% of visitors.</p>
            <p style="font-size:1.3rem;">Tess converts them. You only pay when she does.</p>
            <p style="font-size:1.3rem; font-weight:bold;">Zero risk. All reward.</p>
        </div>`,
        botemiaCueId: "plan_segment_5"
    }
];

// Current active deck
let activeDeck = 'deck1';
let slides = deck1Slides;
let currentSlideIndex = 0;

// Switch between decks
function switchDeck(deckName) {
    activeDeck = deckName;
    currentSlideIndex = 0;
    
    switch(deckName) {
        case 'deck1': slides = deck1Slides; break;
        case 'deck2': slides = deck2Slides; break;
        case 'deck3': slides = deck3Slides; break;
    }
    
    // Update button states
    document.querySelectorAll('.action-btn').forEach(btn => btn.classList.remove('active-deck'));
    document.getElementById(deckName + '-btn').classList.add('active-deck');
    
    // Update cue buttons for new deck
    updateCueButtons();
    
    // Show first slide
    showSlide(0);
    
    console.log('Switched to deck:', deckName, 'Slides:', slides.length);
}

// Update cue buttons to match current deck's segments
function updateCueButtons() {
    const cueButtons = document.querySelectorAll('.cue-btn');
    cueButtons.forEach((btn, index) => {
        if (index < slides.length) {
            btn.style.display = 'inline-block';
            btn.setAttribute('data-cue-id', slides[index].botemiaCueId);
            btn.textContent = index + 1;
        } else {
            btn.style.display = 'none';
        }
    });
}

// Show a specific slide
function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlideIndex = index;
    const slideContent = document.getElementById('slide-content');
    if (slideContent) {
        slideContent.innerHTML = slides[index].content;
    }
    console.log('Showing slide:', slides[index].title);
}

// Navigation
function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Deck switch buttons
    document.getElementById('deck-1-btn').addEventListener('click', () => switchDeck('deck1'));
    document.getElementById('deck-2-btn').addEventListener('click', () => switchDeck('deck2'));
    document.getElementById('deck-3-btn').addEventListener('click', () => switchDeck('deck3'));
    
    // Nav buttons
    document.getElementById('prev-slide').addEventListener('click', prevSlide);
    document.getElementById('next-slide').addEventListener('click', nextSlide);
    
    // Cue buttons
    document.querySelectorAll('.cue-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cueId = this.getAttribute('data-cue-id');
            const slideIndex = slides.findIndex(s => s.botemiaCueId === cueId);
            if (slideIndex >= 0) showSlide(slideIndex);
        });
    });
    
    // Show first slide
    showSlide(0);
    updateCueButtons();
});

console.log("AI TV Network slide decks loaded. Decks:", 3, "Total slides:", deck1Slides.length + deck2Slides.length + deck3Slides.length);