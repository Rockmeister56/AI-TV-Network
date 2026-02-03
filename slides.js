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
        title: "AI Bots Comparison",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide3-ai-bots-comparison.png" 
                     alt="AI Bots Comparison" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Live Demo - Legal Website",
        // Using local file from assets/slides/ folder
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide4-legal-website.png" 
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