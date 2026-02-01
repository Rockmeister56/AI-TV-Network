// slides.js - AI TV NETWORK SLIDE DECK
// =============================================
// YOU EDIT THIS FILE TO ADD YOUR SLIDES.
// 1. Replace placeholder content with your image URLs.
// 2. Add more slide objects to the array as needed.

const slides = [
    {
        id: 1,
        title: "AI TV Network",
        // REPLACE THIS URL WITH YOUR AI TV NETWORK SCREEN IMAGE FROM SUPABASE
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="https://odetjszursuaxpapfwcy.supabase.co/storage/v1/object/public/form-assets/AI%20tvnetwork/ainetworkscreen.png" 
                     alt="AI TV Network" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_1" // For future automation
    },
    {
        id: 2,
        title: "The Conversion Crisis",
        // REPLACE WITH YOUR CONVERSION CRISIS SLIDE IMAGE
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <div style="text-align:center; color: #fff; padding: 20px;">
                    <h2 style="color: #0ff0fc;">SLIDE 2 PLACEHOLDER</h2>
                    <p>Conversion Crisis Stats & Visual</p>
                    <p><em>Replace with your image from Supabase</em></p>
                </div>
            </div>
        `,
        botemiaCueId: "segment_2"
    },
    {
        id: 3,
        title: "AI Bots Comparison",
        // REPLACE WITH YOUR AI BOTS COMPARISON SLIDE IMAGE
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <div style="text-align:center; color: #fff; padding: 20px;">
                    <h2 style="color: #0ff0fc;">SLIDE 3 PLACEHOLDER</h2>
                    <p>Not All AI Bots Are Created Equal</p>
                    <p><em>Replace with your image from Supabase</em></p>
                </div>
            </div>
        `,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Live Demo - Legal Website",
        // REPLACE WITH YOUR EXAMPLE WEBSITE IMAGE (e.g., a legal site)
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <div style="text-align:center; color: #fff; padding: 20px;">
                    <h2 style="color: #0ff0fc;">SLIDE 4 PLACEHOLDER</h2>
                    <p>Example Website for Live Demo</p>
                    <p><em>Replace with your website screenshot from Supabase</em></p>
                </div>
            </div>
        `,
        botemiaCueId: "segment_4"
    }
    // TO ADD MORE SLIDES, COPY A BLOCK ABOVE AND PASTE IT HERE.
    // {
    //     id: 5,
    //     title: "Your Slide Title",
    //     content: `<img src="YOUR_SUPABASE_IMAGE_URL" style="width:100%; height:auto;">`,
    //     botemiaCueId: "segment_5"
    // }
];

// =============================================
// DO NOT EDIT BELOW THIS LINE.
// =============================================
console.log("Slide deck loaded. Total slides:", slides.length);