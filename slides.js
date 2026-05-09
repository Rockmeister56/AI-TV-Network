// slides.js - AI TV NETWORK SLIDE DECK
// =============================================
// NOW USING LOCAL FILES FROM assets/slides/ FOLDER

const slides = [
    {
        id: 1,
        title: "Mobile Wise Ai",
        content: `
            <div style="width:95%; height:95%; display:flex; align-items:left; justify-content:left; background:#000;">
                <img src="assets/slides1/slide1.jpg"
                     style="width:100%; height:100%; object-fit: contain;">
            </div>
        `,
        botemiaCueId: "segment_1"
    },
    {
        id: 2,
        title: "Top 3 Problems",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide2.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_2"
    },
    {
        id: 3,
        title: "The 3 top problems shown",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide3.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_3"
    },
    {
        id: 4,
        title: "Bounce Rate",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide4.jpeg"
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_4"
    },
    {
        id: 5,
        title: "According to Google Gemini",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000;">
                <img src="assets/slides1/slide5.jpeg"
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_5"
    },
    {
        id: 6,
        title: "According to Google Gemini",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide6.jpg"
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_6"
    },
    {
        id: 7,
        title: "Form Abandonment Compare",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide7.jpeg"
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_7"
    },
    {
        id: 8,
        title: "Form Bot Not",
        content: `
            <div style="width:95%; height:95%; display:flex; align-items:left; justify-content:left; background:#000;">
                <img src="assets/slides1/slide8.jpeg"
                     style="width:100%; height:100%; object-fit: contain;">
            </div>
        `,
        botemiaCueId: "segment_8"
    },
    {
        id: 9,
        title: "Kiss of Death",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide9.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_9"
    },
    {
        id: 10,
        title: "Lost Patience",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide10.jpg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_10"
         },
    {
        id: 11,
        title: "70 perent abandonment",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide11.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_11"
    },
    {
        id: 12,
        title: "pre qualification interview",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide12.jpg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_12"
    },
    {
        id: 13,
        title: "Builds Trust",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide13.jpg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_13"
    },
    {
        id: 14,
        title: "VidGuide in Action",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide14.jpg"   
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_14"
    },
    {
        id: 15,
        title: "Mortgage VidGuide AI Example",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide15.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_15"

     },
    {
        id: 16,
        title: "Pre Sold Lead",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide16.jpeg"   
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_16"
    },
    {
        id: 17,
        title: "Proof is in the Analystics",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide17.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_17"
    },
    {
        id: 18,
        title: "Just Ask AI with Boteemia",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide18.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_18"

         },
         {
        id: 19,
        title: "Free Gifts",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide19.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_19"
    },
    {
        id: 20,
        title: "Thank You for Joining Us",
        content: `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#111;">
                <img src="assets/slides1/slide20.jpeg" 
                     style="max-width:100%; max-height:100%;">
            </div>
        `,
        botemiaCueId: "segment_20"
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