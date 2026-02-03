// slides.js - AI TV NETWORK SLIDE DECK
// =============================================
// NOW USING LOCAL FILES FROM assets/slides/ FOLDER

const slides = [
    {
        id: 1,
        title: "AI TV Network",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides/slide1-ainetworkscreen.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_1"
    },
    {
        id: 2,
        title: "Just Ask AI",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide2-just-ask-ai.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_2"
    },
    {
        id: 3,
        title: "The AI Boost Factor",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide3-ai-boost-factor.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Show on the Road",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide4-show-on-the-road.png"
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_4"
    },
    {
        id: 5,
        title: "The Number One Problem AI Solves",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides/slide5-number-one-problem-AI-solves.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_5"
    },
    {
        id: 6,
        title: "The Conversion Crises",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide6-conversion-crises2.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_6"
    },
    {
        id: 7,
        title: "Bleeding Money",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide7-bleeding-money.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_7"
    },
    {
        id: 8,
        title: "97 percent bail",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide8-97-percent-bail.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_8"
    },
    {
        id: 9,
        title: "Kiss of Death",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide9-kiss-of-death2.png"  // CHANGED FROM slide10 to slide9
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_9"
    },
    {
        id: 10,
        title: "Realization at the Desk",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides/slide10-executive-realization.png" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_10"
    }
    // TO ADD MORE SLIDES: Copy the block above, increment id, and add new image to assets/slides/
    // {
    //     id: 11,
    //     title: "Your Slide Title",
    //     content: `<img src="assets/slides/slide11-your-image.png" style="width:100%; height:auto;">`,
    //     botemiaCueId: "segment_11"
    // }
];

// =============================================
// DO NOT EDIT BELOW THIS LINE.
// =============================================
console.log("Slide deck loaded. Total slides:", slides.length);