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
        botemiaCueId: "segment_1"
    },
    {
        id: 6,
        title: "The Conversion Crises",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide6-conversion-crisis.png" 
                     alt="Conversion Crisis" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_2"
    },
    {
        id: 7,
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
        id: 8,
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