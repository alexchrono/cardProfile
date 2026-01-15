// ===================== GLOBAL VARIABLES =====================
let statsButton;
let personalityButton;
let historyButton;
let encountersButton;
let oocButton;
let isMobile = false;




let statsButtonMobile;
let personalityButtonMobile;
let historyButtonMobile;
let encountersButtonMobile;
let oocButtonMobile;






let buttonList;
let buttonListMobile;
let clickedButton;
let clickedId;

let clickedButtonMobile;
let clickedIdMobile;


let previousButton;
let previousClickedId;


let previousButtonMobile;
let previousClickedIdMobile;


let galleryButton;
let closeButton;


let galleryButtonMobile;
let closeButtonMobile;




let topGalleryDisplay;

let topGalleryDisplayMobile;



let threeScript;
let vantaScript;
let bgTestCover;
let bgTestCoverFront;
let vantaBack;
let vantaFront;
let topNumberEl;

let pic1 = 'https://i.ibb.co/Q3jjbsCY/first-Up-G.webp';
let pic2 = 'https://i.ibb.co/ns3bfsWq/2nd-Up-G.jpg';
let pic3 = 'https://i.ibb.co/sd7h9qZK/third-Up-G.jpg';
let pic4; // YOU CAN ADD THESE LATER IF YOU WANT.
let pic5;
let pic6;
let pic7;
let pic8;
let pic9;
let pic10;

const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];




// function isMobileViewFind() {
//     return window.innerHeight > window.innerWidth;
// }

function updateIsMobile() {
    isMobile = window.innerHeight > window.innerWidth;
}


// ===================== GALLERY FUNCTIONS =====================
function openGallery() {


    console.log('WE CLICKED OPEN GALLERY')
    topGalleryDisplay.style.visibility = "visible";
    requestAnimationFrame(() => {
        topGalleryDisplay.style.opacity = "1";
    });
}


function closeGallery() {
    topGalleryDisplay.style.opacity = "0";
    setTimeout(() => {
        topGalleryDisplay.style.visibility = "hidden";
    }, 1000);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================== TAB BUTTON HANDLER =====================
function handleButtonClick(event) {
    if (
        event.currentTarget.id === "galleryButton" ||
        event.currentTarget.id === "galleryButtonMobile"
    ) return;


    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }


    clickedButton = event.currentTarget;

    if (isMobile){
            clickedId = clickedButton.id.replace("ButtonMobile", "");


    } else {
            clickedId = clickedButton.id.replace("Button", "");


    }


    if (previousClickedId === clickedId) return;


    if (previousButton) {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    } else {
        statsButton.classList.remove("active");
        statsButton.classList.add("inactive");
    }


    clickedButton.classList.remove("inactive");
    clickedButton.classList.add("active");


    if (previousClickedId) {
        let prevTab;

        if (isMobile) {
            prevTab = document.getElementById(previousClickedId + "TabMobile");

        } else {
            prevTab = document.getElementById(previousClickedId + "Tab");

        }

        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    } else {
        let prevTab;

        if (isMobile) {
            prevTab = document.getElementById("statsTabMobile")

        } else {
            prevTab = document.getElementById("statsTab");


        }
        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    }

    let currTab;

    if (isMobile) {
        currTab = document.getElementById(clickedId + "TabMobile");



    } else {
        currTab = document.getElementById(clickedId + "Tab");


    }

    if (currTab) {
        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
            currTab.style.opacity = "1";
        });
    }


    console.log(`Activated: ${clickedId}`);
}


// ===================== MAIN FUNCTION =====================
function mainFunction() {
    console.log("📌 mainFunction started");


    // ===================== CAROUSEL LOGIC =====================


    let imageToGrab;
    let leftChev;
    let rightChev;

    if (isMobile) {

        console.log('come back to')
        // NARUTO NARUTO NEED THESE FOR MOBILE


    }
    else {
        imageToGrab = document.getElementById('sexyKyra');
        // const slider = document.getElementById('carouselSlider');
        leftChev = document.getElementById('leftChev');
        rightChev = document.getElementById('rightChev');

    }











    // Filter only active pics
    const activePics = allPics.filter(p => typeof p === "string" && p.trim() !== "");
    console.log("🖼 Active pics detected:", activePics);

    // map index -> pic
    let pics = {};
    activePics.forEach((url, index) => pics[index] = url);

    // fallback topNumberEl
    // if (!topNumberEl) {
    //     console.warn("⚠ topNumberEl not found, creating fallback display element.");
    //     topNumberEl = document.createElement('div');
    //     topNumberEl.id = "topNumberElFallback";
    //     topNumberEl.style.position = "absolute";
    //     topNumberEl.style.bottom = "10px";
    //     topNumberEl.style.right = "10px";
    //     topNumberEl.style.background = "rgba(0,0,0,0.5)";
    //     topNumberEl.style.color = "#fff";
    //     topNumberEl.style.padding = "5px 10px";
    //     topNumberEl.style.borderRadius = "5px";
    //     topNumberEl.style.fontFamily = "sans-serif";
    //     topNumberEl.style.fontSize = "14px";
    //     document.body.appendChild(topNumberEl);
    //     console.log("✅ Fallback topNumberEl added to DOM");
    // }

    function allPicFunction(index) {

        let rchevContainer;
        let lchevContainer;

        if (isMobile) {
            console.log('come back to later')
            // NARUTO NARUTO need these for mobile
        } else {
            rchevContainer = document.getElementById('rchev');
            lchevContainer = document.getElementById('lchev');

        }






        if (!activePics[index]) {
            console.warn(`⚠ Index ${index} has no image, skipping`);
            return;
        }
        if (!imageToGrab) {
            console.error("❌ imageToGrab element not found");
            return;
        }

        console.log(`📸 Updating image to index ${index}: ${activePics[index]}`);
        imageToGrab.src = activePics[index];
        uniCount = index;

        // if (slider) {
        //     slider.value = index;
        //     console.log("🎚 Slider updated to:", slider.value);
        // }

        // if (topNumberEl) {
        //     topNumberEl.innerText = `${index + 1} / ${activePics.length}`;
        //     console.log("🔢 topNumberEl updated to:", topNumberEl.innerText);
        // }

        // Previous / Next index
        let prevIndex = index - 1 >= 0 ? index - 1 : activePics.length - 1;
        let nextIndex = index + 1 < activePics.length ? index + 1 : 0;
        console.log(`⏪ prevIndex: ${prevIndex}, ⏩ nextIndex: ${nextIndex}`);

        // LEFT chevron
        if (lchevContainer && leftChev) {
            let newLeftChev = leftChev.cloneNode(true);
            lchevContainer.replaceChild(newLeftChev, leftChev);
            leftChev = newLeftChev;
            leftChev.addEventListener('click', () => {
                console.log("⬅ Left chevron clicked");
                allPicFunction(prevIndex);
            });
        }


        if (rchevContainer && rightChev) {
            let newRightChev = rightChev.cloneNode(true);
            rchevContainer.replaceChild(newRightChev, rightChev);
            rightChev = newRightChev;
            rightChev.addEventListener('click', () => {
                console.log("➡ Right chevron clicked");
                allPicFunction(nextIndex);
            });
        }
    }

    // Slider input
    // if (slider) {
    //     slider.max = activePics.length - 1;
    //     slider.addEventListener('input', () => {
    //         const currentIndex = parseInt(slider.value, 10);
    //         console.log("🎚 Slider input, index:", currentIndex);
    //         allPicFunction(currentIndex);
    //     });
    // }

    // Initialize first image
    if (activePics.length > 0) {
        console.log("🌟 Initializing carousel with first image");
        allPicFunction(0);
    } else {
        console.warn("⚠ No active images found, carousel will not initialize");
    }
    console.log("✅ Carousel initialized with", activePics.length, "images");

    // ===================== TABS & BUTTONS =====================



    let statsTab;

    let mercierContainerDiv;







    if (isMobile) {






        statsTab = document.getElementById("statsTabMobile");

        // NARUTO NARUTO FIND CONTAINING DIV LATER IF THIS LINE NEEDED
        mercierContainerDiv = document.getElementById('mercierContainer');
        statsButton = document.getElementById("statsButtonMobile");
        personalityButton = document.getElementById("personalityButtonMobile");
        historyButton = document.getElementById("historyButtonMobile");
        encountersButton = document.getElementById("encountersButtonMobile");
        oocButton = document.getElementById("oocButtonMobile");
        galleryButton = document.getElementById("galleryButtonMobile");
        closeButton = document.getElementById("closeButtonMobile");
        topGalleryDisplay = document.getElementById("topGalleryDisplayMobile");

    } else {
        statsTab = document.getElementById("statsTab");
        mercierContainerDiv = document.getElementById('mercierContainer');
        statsButton = document.getElementById("statsButton");
        personalityButton = document.getElementById("personalityButton");
        historyButton = document.getElementById("historyButton");
        encountersButton = document.getElementById("encountersButton");
        oocButton = document.getElementById("oocButton");
        galleryButton = document.getElementById("galleryButton");
        closeButton = document.getElementById("closeButton");
        topGalleryDisplay = document.getElementById("topGalleryDisplay");

    }

    buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton];



    // Ensure gallery buttons are globally bound


    if (galleryButton) galleryButton.addEventListener("click", openGallery);
    if (closeButton) closeButton.addEventListener("click", closeGallery);




















    if (statsTab) {
        statsTab.style.visibility = "visible";
        statsTab.style.opacity = "1";
    }

    if (!mercierContainerDiv) return;


    const missingButtons = buttonList.filter(btn => !btn);
    if (missingButtons.length > 0) {
        console.error("Some buttons were not found in the DOM:", missingButtons);
        return;
    }

    buttonList.forEach(btn => btn.addEventListener("click", handleButtonClick));

    // ===================== GALLERY BUTTONS =====================

    if (isMobile){
        galleryButton = document.getElementById("galleryButtonMobile");
    closeButton = document.getElementById("closeButtonMobile");
    topGalleryDisplay = document.getElementById("topGalleryDisplayMobile");

    } else {
        galleryButton = document.getElementById("galleryButton");
    closeButton = document.getElementById("closeButton");
    topGalleryDisplay = document.getElementById("topGalleryDisplay");

    }


    console.log('ARE WE GETTING TOPGALLERY DISPLAY', topGalleryDisplay)

    if (galleryButton) {
        galleryButton.addEventListener("click", openGallery);
        console.log("🎨 Gallery button bound successfully");
    } else {
        console.warn("⚠ galleryButton not found in DOM");
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeGallery);
        console.log("❌ Close gallery button bound successfully");
    } else {
        console.warn("⚠ closeButton not found in DOM");
    }

    // ===================== VANTA / THREE =====================
    bgTestCover = document.getElementById("bgTestCover");
    bgTestCoverFront = document.getElementById("bgTestCoverFront");

    setTimeout(() => {
        threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.onload = () => {
            vantaScript = document.createElement('script');
            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
            vantaScript.onload = () => {
                if (bgTestCover && window.VANTA && window.VANTA.FOG) {
                    vantaBack = VANTA.FOG({
                        el: "#bgTestCover",
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200,
                        minWidth: 200,
                        highlightColor: 0x9d9d9d,
                        midtoneColor: 0x989898,
                        lowlightColor: 0x000000,
                        baseColor: 0x000000,
                        blurFactor: 0.52,
                        speed: 0.70,
                        zoom: 0.90,
                    });
                    console.log("VANTA Back Fog initialized ✅");
                } else console.error("Cannot initialize BACK VANTA Fog!");

                if (bgTestCoverFront && window.VANTA && window.VANTA.FOG) {
                    vantaFront = VANTA.FOG({
                        el: "#bgTestCoverFront",
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200,
                        minWidth: 200,
                        highlightColor: 0x9d9d9d,
                        midtoneColor: 0x989898,
                        lowlightColor: 0x000000,
                        baseColor: 0x000000,
                        blurFactor: 0.52,
                        speed: 0.70,
                        zoom: 0.90,
                    });
                    console.log("VANTA Front Fog initialized ✅");
                } else console.error("Cannot initialize FRONT VANTA Fog!");
            };
            document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
    }, 500);
}

// ===================== MOBILE / DESKTOP SWITCH =====================
async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();
    await wait(10);

    if (wasMobile === isMobile) return;

    // if (!clickedButton || !clickedButtonMobile) {
    //     // Decide which button to click based on the new mode
    //     let statsBtnId = isMobile ? "statsButtonMobile" : "statsButton";
    //     let statsBtn = document.getElementById(statsBtnId);

    //     if (statsBtn) {
    //         // Simulate a click programmatically
    //         statsBtn.click();
    //         console.log(`💥 Auto-activated default stats button for ${isMobile ? "mobile" : "desktop"}`);
    //     }
    // }



    if ((wasMobile === false) && (isMobile === true)) {
        console.log('we just switched from desktop to mobile');

        if (!clickedButton){
            mainFunction()
            await wait(10);
        }

        console.log('=============desktop, where we were clicking, looks like....')
        console.log('clickedButton is', clickedButton);
        console.log('clickedId is', clickedId);
        console.log('previousButton is', previousButton);
        console.log('previousClickedId is', previousClickedId);
        console.log('=============================')
        console.log('=============MOBILE, where we switched to, looks like....')
        console.log('clickedButtonMobile is', clickedButtonMobile);
        console.log('clickedIdMobile is', clickedIdMobile);
        console.log('previousButtonMobile is', previousButtonMobile);
        console.log('previousClickedIdMobile is', previousClickedIdMobile);
    } else if ((wasMobile === true) && (isMobile === false)) {
        console.log('we just switched from Mobile to Desktop');

           if (!clickedButtonMobile){
            mainFunction()
            await wait(10);
        }

        console.log('=============Mobile, where we were clicking, looks like....')
        console.log('clickedButtonMobile is', clickedButtonMobile);
        console.log('clickedIdMobile is', clickedIdMobile);
        console.log('previousButtonMobile is', previousButtonMobile);
        console.log('previousClickedIdMobile is', previousClickedIdMobile);
        console.log('=============================')
        console.log('=============DESKTOP, where we switched to, looks like....')
        console.log('clickedButton is', clickedButton);
        console.log('clickedId is', clickedId);
        console.log('previousButton is', previousButton);
        console.log('previousClickedId is', previousClickedId);
    }
















    let mainContainerDiv;

    if (isMobile) {
        mainContainerDiv = document.getElementById('mobileMain');


    } else {
        mainContainerDiv = document.getElementById('mercierContainer');


    }

    if (!mainContainerDiv) return;
    if (window.innerHeight > window.innerWidth) {
        mainContainerDiv.style.width = '100%';
        mainContainerDiv.style.height = '100%';
    } else {
        mainContainerDiv.style.width = '';
        mainContainerDiv.style.height = '';
    }
}

// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', () => {
    updateIsMobile();
    mainFunction();
    window.addEventListener('resize', () => {
        // updateIsMobile();
        switchMobileDesktop();
        // mainFunction()
    });
});
