// slides.js - AI TV NETWORK SLIDE DECK
// =============================================
// NOW USING LOCAL FILES FROM assets/slides/ FOLDER

const slides = [
    {
        id: 1,
        title: "AI TV Network",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides/slide1-ainetworkscreen.png" 
                     alt="AI TV Network" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_1"
    },
    {
        id: 2,
        title: "Just Ask AI",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide2-just-ask-ai.png" 
                     alt="Conversion Crisis" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_2"
    },
    {
        id: 3,
        title: "The AI Boost Factor",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide3-ai-boost-factor.png" 
                     alt="AI Bots Comparison" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Show on the Road",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide4-show-on-the-road.png" 
                     alt="Legal Website Demo" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_4"
     },
    {
    id: 5,
        title: "The Number One Problem AI Solves",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides/slide5-number-one-problem-AI-solves.png" 
                     alt="AI TV Network" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_5"
    },
    {
        id: 6,
        title: "The Conversion Crises",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide6-conversion-crises2.png" 
                     alt="Conversion Crisis" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_6"
    },
    {
        id: 7,
        title: "Bleeding Money",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide7-bleeding-money.png" 
                     alt="AI Bots Comparison" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_7"
    },
    {
        id: 8,
        title: "Only 3 out of every 100",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide8-3-percent.png" 
                     alt="Legal Website Demo" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_8"
    },
    {
        id: 9,
        title: "Kiss of Death",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide10-kiss-of-death.png" 
                     alt="Conversion Crisis" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_9"
    },
    {
        id: 11,
        title: "The AI Boost Factor",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide3-ai-boost-factor.png" 
                     alt="AI Bots Comparison" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_11"
    },
    {
        id: 4,
        title: "Show on the Road",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide4-show-on-the-road.png" 
                     alt="Legal Website Demo" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_4"
     },
    {
    id: 12,
        title: "The Number One Problem AI Solves",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides/slide5-number-one-problem-AI-solves.png" 
                     alt="AI TV Network" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_12"
    },
    {
        id: 13,
        title: "The Conversion Crises",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide6-conversion-crises2.png" 
                     alt="Conversion Crisis" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_13"
    },
    {
        id: 14,
        title: "Bleeding Money",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide7-bleeding-money.png" 
                     alt="AI Bots Comparison" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_14"
    },
    {
        id: 15,
        title: "Only 3 out of every 100",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide8-3-percent.png" 
                     alt="Legal Website Demo" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_15"
    }
    // TO ADD MORE SLIDES: Copy the block above, increment id, and add new image to assets/slides/
    // {
    //     id: 5,
    //     title: "Your Slide Title",
    //     content: `<img src="assets/slides/slide5-your-image.png" style="width:100%; height:auto;">`,
    //     botemiaCueId: "segment_5"
    // }
];

// =============================================
// DO NOT EDIT BELOW THIS LINE.
// =============================================
console.log("Slide deck loaded. Total slides:", slides.length);