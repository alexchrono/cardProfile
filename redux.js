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

let mainTracker = {

    "previousClickedId": "statsButton",
    "previousClickedIdMobile": "statsButtonMobile"

}

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
let pic4;
let pic5;
let pic6;
let pic7;
let pic8;
let pic9;
let pic10;

let startedInMobile = false;

const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];

// ===================== MOBILE DETECTION =====================
function updateIsMobile() {
    isMobile = window.innerHeight > window.innerWidth;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================== GALLERY FUNCTIONS =====================
function openGallery() {
    console.log('not to open gallery yet');
    return
    if (isMobile) {
        topGalleryDisplayMobile.style.visibility = "visible";
        requestAnimationFrame(() => {
            topGalleryDisplayMobile.style.opacity = "1";
        });
    } else {
        topGalleryDisplay.style.visibility = "visible";
        requestAnimationFrame(() => {
            topGalleryDisplay.style.opacity = "1";
        });
    }
}

function closeGallery() {
    console.log('not to close gallery yet');
    return
    if (isMobile) {
        topGalleryDisplayMobile.style.opacity = "0";
        setTimeout(() => {
            topGalleryDisplayMobile.style.visibility = "hidden";
        }, 1000);
    } else {
        topGalleryDisplay.style.opacity = "0";
        setTimeout(() => {
            topGalleryDisplay.style.visibility = "hidden";
        }, 1000);
    }
}
//======== close gallery if open

function closeGalleryMobileIfOpen() {
    console.log('not to close galleryMobileIfOpen yet');
    return
    if (!topGalleryDisplayMobile) return;

    const isVisible =
        topGalleryDisplayMobile.style.visibility === "visible" ||
        getComputedStyle(topGalleryDisplayMobile).visibility === "visible";

    if (!isVisible) return;

    console.log('📱 [MOBILE] Closing gallery due to non-gallery click');

    // hide gallery
    topGalleryDisplayMobile.style.opacity = "0";
    setTimeout(() => {
        topGalleryDisplayMobile.style.visibility = "hidden";
    }, 300);

    // unhighlight gallery button
    if (galleryButtonMobile) {
        galleryButtonMobile.classList.remove("active");
        galleryButtonMobile.classList.add("inactive");
    }

    // IMPORTANT: clear mobile gallery state
    if (clickedIdMobile === "gallery") {
        clickedIdMobile = null;
        clickedButtonMobile = null;
    }
}




function bindFakeScrollbar({
    clickedId,
    isMobile
}) {
    /* ============================================================
       ===================== FAKE SCROLLBAR =====================
       ============================================================ */

    const SCROLL = {
        holderId: isMobile ? 'scrollHolderMobile' : 'scrollHolder',
        trackClass: isMobile ? '.scroll-trackMobile' : '.scroll-track',
        thumbClass: isMobile ? '.scroll-thumbMobile' : '.scroll-thumb',
        scrollFindId: clickedId + (isMobile ? 'ScrollFindMobile' : 'ScrollFind')
    };

    const scrollHolder = document.getElementById(SCROLL.holderId);
    const el = document.getElementById(SCROLL.scrollFindId);

    /* ===================== CLEANUP ===================== */

    if (scrollHolder?.dataset?.boundTo) {
        const prevEl = document.getElementById(scrollHolder.dataset.boundTo);

        console.log('[FAKE SCROLLBAR] Cleaning previous binding:', scrollHolder.dataset.boundTo);

        if (prevEl) {
            prevEl.removeEventListener('scroll', prevEl.__syncThumb);
            delete prevEl.__syncThumb;
        }

        scrollHolder.classList.remove('visible');
        scrollHolder.style.visibility = 'hidden';
        scrollHolder.style.opacity = '0';

        delete scrollHolder.dataset.boundTo;
    }

    /* ===================== GUARDS ===================== */

    if (!scrollHolder || !el) {
        console.log('[FAKE SCROLLBAR] Missing elements — aborting');
        return;
    }

    if (el.scrollHeight <= el.clientHeight) {
        console.log('[FAKE SCROLLBAR] No overflow — hiding');
        return;
    }

    const track = scrollHolder.querySelector(SCROLL.trackClass);
    const thumb = scrollHolder.querySelector(SCROLL.thumbClass);

    if (!track || !thumb) {
        console.warn('[FAKE SCROLLBAR] Track or thumb missing');
        return;
    }

    /* ===================== SHOW ===================== */

    scrollHolder.style.visibility = 'visible';
    scrollHolder.style.opacity = '1';
    scrollHolder.classList.add('visible');

    console.log('[FAKE SCROLLBAR] Binding to:', el.id);

    /* ===================== SYNC ===================== */

    function syncThumb() {
        const ratio = el.clientHeight / el.scrollHeight;
        const thumbHeight = Math.max(
            ratio * track.clientHeight,
            track.clientHeight * 0.08
        );

        thumb.style.height = thumbHeight + 'px';

        const buffer = track.clientHeight * 0.01;
        const maxTop = track.clientHeight - thumbHeight - buffer;

        const scrollRatio =
            el.scrollTop / (el.scrollHeight - el.clientHeight || 1);

        thumb.style.top = buffer + scrollRatio * maxTop + 'px';
    }

    // store ref so we can cleanly remove it later
    el.__syncThumb = syncThumb;
    el.addEventListener('scroll', syncThumb);
    syncThumb();

    /* ===================== DRAG ===================== */

    let dragging = false;
    let startY = 0;
    let startScroll = 0;

    thumb.onmousedown = e => {
        dragging = true;
        startY = e.clientY;
        startScroll = el.scrollTop;
        document.body.style.userSelect = 'none';
    };

    document.onmousemove = e => {
        if (!dragging) return;

        const delta =
            (e.clientY - startY) *
            (el.scrollHeight / track.clientHeight);

        el.scrollTop = startScroll + delta;
    };

    document.onmouseup = () => {
        dragging = false;
        document.body.style.userSelect = '';
    };

    scrollHolder.dataset.boundTo = el.id;

    console.log('[FAKE SCROLLBAR] Bound successfully →', el.id);
}


function handleButtonClickNotStupid(event) {
    const btn = event.currentTarget;
    const btnId = btn.id;

    const baseId = btnId
    .replace("ButtonMobile", "")
    .replace("Button", "");

clickedId = baseId;


    let oldButtonToGrab;
    let oldTabToHide;
    let newTabToFadeIn;

    if (isMobile) {
        // if (!mainTracker?.previousClickedIdMobile) {
        //     mainTracker.previousClickedIdMobile = "statsButtonMobile"
        // }

        if (mainTracker?.previousClickedIdMobile && btnId === mainTracker?.previousClickedIdMobile) {
            return
        }

        if (mainTracker?.previousClickedIdMobile && btnId !== mainTracker?.previousClickedIdMobile) {
            oldButtonToGrab = document.getElementById(mainTracker?.previousClickedIdMobile)
            oldTabToHide =  document.getElementById(mainTracker?.previousClickedIdMobile.replace("ButtonMobile", "TabMobile"))
        }

        newTabToFadeIn = document.getElementById(btnId.replace("ButtonMobile", "TabMobile"))
        // : btnId.replace("Button", "tab");



        // previousTocheck = isMobile
        //     ? btnId.replace("ButtonMobile", "tabMobile")
        //     : btnId.replace("Button", "tab");


    }
    else if (!isMobile){
        console.log('555555555555btn Id is',btnId)
        console.log('555555555 mainTracker previousClickedId is',mainTracker.previousClickedId)

        if ((mainTracker?.previousClickedId) && (btnId === mainTracker?.previousClickedId)) {
            return
        }

        if ((mainTracker?.previousClickedId) && (btnId !== mainTracker?.previousClickedId)) {
            console.log('5555555555 the clicked button is different from previous')
            oldButtonToGrab = document.getElementById(mainTracker?.previousClickedId)
            // let oldTabName = mainTracker?.previousClickedId.replace("Button", "Tab")
            oldTabToHide =  document.getElementById(mainTracker?.previousClickedId.replace("Button", "Tab"))
            newTabToFadeIn = document.getElementById(btnId.replace("Button", "Tab"))

        }

        // previousTocheck = isMobile
        //     ? btnId.replace("ButtonMobile", "tabMobile")
        //     : btnId.replace("Button", "tab");


    }

         if (oldButtonToGrab){
            oldButtonToGrab.classList.remove("active");
            oldButtonToGrab.classList.add("inactive");
            }
            if (btn){
                btn.classList.remove("inactive");
            btn.classList.add("active");

            }



            if (oldTabToHide){
        oldTabToHide.style.opacity = "0";
        setTimeout(() => {
            oldTabToHide.style.visibility = "hidden";
        }, 600);
    }

     if (newTabToFadeIn) {
        newTabToFadeIn.style.visibility = "visible";
        requestAnimationFrame(() => {
            newTabToFadeIn.style.opacity = "1";
        });
    }



        if (isMobile) {

            mainTracker.previousClickedIdMobile = btnId
        }
        else {
            mainTracker.previousClickedId = btnId
        }


bindFakeScrollbar({
    clickedId,
    isMobile
});


    // console.log('STARTING OUT REAL SIMPLE...btn or event.currentTarget is', btn)
    // console.log('btnId will be......', btn.id)


    // console.log('before we do anything mainTracker is....', mainTracker)
    // const derivedId = isMobile
    //     ? btnId.replace("ButtonMobile", "tabMobile")
    //     : btnId.replace("Button", "tab");

    // console.log('we can get our item by grabbing the following....', derivedId)





}
// ===================== TAB / BUTTON HANDLER =====================













// ===================== STARTUP INTRO HOOK =====================
async function runMobileStartupIntro() {
    console.log("🚀 Mobile startup intro placeholder");

    // let bottomTextDisplay = document.getElementById("just4Startup")

    // bottomTextDisplay.style.visibility="visible"



    let bottomButtonMenu = document.getElementById("mainMenuMobile");
    // bottomButtonMenu.style.height="0%"
    // bottomButtonMenu.style.visibility="hidden";

    // let expandForBeginning = document.getElementById("topViewMobile")
    // expandForBeginning.style.height="100%";

    // let topViewMobileInner = document.getElementById("topViewMobileInner");
    // topViewMobileInner.style.backgroundColor = "transparent";




}


// ===================== MAIN FUNCTION =====================
async function mainFunction() {
    console.log("📌 mainFunction started");

    // ===================== CAROUSEL LOGIC (UNCHANGED) =====================
    let imageToGrab;
    let leftChev;
    let rightChev;
    let previewContainer;
    let classNameForPreviews;
    let previewNodes;

    if (!isMobile) {
        imageToGrab = document.getElementById('sexyKyra');
        leftChev = document.getElementById('leftChev');
        rightChev = document.getElementById('rightChev');
        previewContainer = document.getElementById('topGalleryBot');
        classNameForPreviews = 'picturePreview';
    } else {
        imageToGrab = document.getElementById('sexyKyraMobile');
        leftChev = document.getElementById('leftChevMobile');
        rightChev = document.getElementById('rightChevMobile');
        previewContainer = document.getElementById('topGalleryBotMobile');
        classNameForPreviews = 'picturePreviewMobile';
    }


    const activePics = allPics.filter(p => typeof p === "string" && p.trim() !== "");







    previewContainer.innerHTML = '';
    previewNodes = [];

    activePics.forEach((src, index) => {
        const preview = document.createElement('div');
        preview.className = `${classNameForPreviews}`

        const img = document.createElement('img');
        img.src = src;

        preview.appendChild(img);

        preview.addEventListener('click', () => {
            setActivePic(index);
        });

        previewContainer.appendChild(preview);
        previewNodes.push(preview);
    });











    let pics = {};
    activePics.forEach((url, index) => pics[index] = url);


    let currentPicIndex = 0;
    // let previewNodes = [];

    function setActivePic(index) {
        currentPicIndex = index;

        // update main image
        updateMainImage(index);

        // update preview borders
        previewNodes.forEach((node, i) => {
            node.classList.toggle('activePreview', i === index);
        });
    }

    function updateMainImage(index) {
        let rchevContainer;
        let lchevContainer;

        if (!isMobile) {
            rchevContainer = document.getElementById('rchev');
            lchevContainer = document.getElementById('lchev');
        }
        else {
            rchevContainer = document.getElementById('rchevMobile');
            lchevContainer = document.getElementById('lchevMobile');
        }

        if (!activePics[index] || !imageToGrab) return;

        imageToGrab.src = activePics[index];
        // uniCount = index;

        let prevIndex = index - 1 >= 0 ? index - 1 : activePics.length - 1;
        let nextIndex = index + 1 < activePics.length ? index + 1 : 0;

        if (lchevContainer && leftChev) {
            let newLeftChev = leftChev.cloneNode(true);
            lchevContainer.replaceChild(newLeftChev, leftChev);
            leftChev = newLeftChev;
            // leftChev.addEventListener('click', () => updateMainImage(prevIndex));
            leftChev.addEventListener('click', () => setActivePic(prevIndex));

        }

        if (rchevContainer && rightChev) {
            let newRightChev = rightChev.cloneNode(true);
            rchevContainer.replaceChild(newRightChev, rightChev);
            rightChev = newRightChev;
            // rightChev.addEventListener('click', () => updateMainImage(nextIndex));
            rightChev.addEventListener('click', () => setActivePic(nextIndex));

        }
    }

    if (activePics.length > 0) setActivePic(0);

    // ===================== TABS / BUTTONS =====================
    let statsTab;
    let mercierContainerDiv;

    if (isMobile) {
        statsTab = document.getElementById("statsTabMobile");
        mercierContainerDiv = document.getElementById("mercierContainer");

        statsButton = document.getElementById("statsButtonMobile");
        personalityButton = document.getElementById("personalityButtonMobile");
        historyButton = document.getElementById("historyButtonMobile");
        encountersButton = document.getElementById("encountersButtonMobile");
        oocButton = document.getElementById("oocButtonMobile");
        galleryButton = document.getElementById("galleryButtonMobile");
        topGalleryDisplayMobile = document.getElementById("topGalleryDisplayMobile");

        buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton, galleryButton];
    } else {
        statsTab = document.getElementById("statsTab");
        mercierContainerDiv = document.getElementById("mercierContainer");

        statsButton = document.getElementById("statsButton");
        personalityButton = document.getElementById("personalityButton");
        historyButton = document.getElementById("historyButton");
        encountersButton = document.getElementById("encountersButton");
        oocButton = document.getElementById("oocButton");
        galleryButton = document.getElementById("galleryButton");
        closeButton = document.getElementById("closeButton");
        topGalleryDisplay = document.getElementById("topGalleryDisplay");

        buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton, galleryButton];
    }

    if (startedInMobile && isMobile) {
        await runMobileStartupIntro();
    }

    if (statsTab && !startedInMobile) {
        statsTab.style.visibility = "visible";
        statsTab.style.opacity = "1";
    }

    if (!mercierContainerDiv) return;

    buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClickNotStupid));
    if (closeButton) closeButton.addEventListener("click", closeGallery);

    // ===================== VANTA / THREE (EXACTLY AS YOU WROTE IT) =====================
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
// async function switchMobileDesktop() {
//     const wasMobile = isMobile;
//     updateIsMobile();
//     await wait(10);
//     if (wasMobile === isMobile) return;
//     mainFunction();
// }

// async function switchMobileDesktop() {
//     const wasMobile = isMobile;

//     updateIsMobile();

//     // no state change → do nothing
//     if (wasMobile === isMobile) return;

//     // STATE TRANSITION LOGGING
//     if (!wasMobile && isMobile) {
//         console.log("🔁 CHANGE DETECTED: DESKTOP → MOBILE");

//         //CHAT GPT HERE I WANT TO USE THE LOGIC I USE IN handleButtonClickNotStupid to
//         //  persist tabs even when the window changes.  for instance if i was on the encounters tab
//         // in desktop, and i resized to mobile, we would still be on the encounters tab
//         // that means I would want to remove the active class from the encountersButton
//         //  it also means i would want to hide the encountersTab
//         //   and then right here....   I would see what mainTracker.previousClickedIdMobile was
//         //     and strip it of the "Mobile", and if that matched previousClickedId I would
//         //    do nothing because im already showing the equivalent
//         //  however if it is different, i would grab previoudClickedIdMobile's button and tab
//         //   and make both inactive / hidden
//         //   and also grab previousClickedId + Mobile  and activate that button and tab
//         //  do you understand me?  if so write me my switchMobileDesktop here.  I want to persist
//         //  the state over both types of resizes
//       let newKeyPhrase = mainTracker.previousClickedId
//       let newButtonToActive =  document.getElementById(`${mainTracker.previousClickedId}Mobile`)
//     }

//     if (wasMobile && !isMobile) {
//         console.log("🔁 CHANGE DETECTED: MOBILE → DESKTOP");
//     }

//     await wait(10);
//     mainFunction();
// }

function resetAllButtonsAndTabs(isMobileMode) {
    const buttonSuffix = isMobileMode ? "ButtonMobile" : "Button";
    const tabSuffix = isMobileMode ? "TabMobile" : "Tab";

    const ids = ["stats", "personality", "history", "encounters", "ooc"];

    ids.forEach(name => {
        const btn = document.getElementById(`${name}${buttonSuffix}`);
        const tab = document.getElementById(`${name}${tabSuffix}`);

        if (btn) {
            btn.classList.remove("active");
            btn.classList.add("inactive");
        }

        if (tab) {
            tab.style.opacity = "0";
            tab.style.visibility = "hidden";
        }
    });
}


function activateTabByButtonId(buttonId) {
    const isMobileMode = buttonId.endsWith("Mobile");

    const btn = document.getElementById(buttonId);
    const tab = document.getElementById(
        buttonId.replace("ButtonMobile", "TabMobile")
                .replace("Button", "Tab")
    );

    if (!btn || !tab) return;

    btn.classList.remove("inactive");
    btn.classList.add("active");

    tab.style.visibility = "visible";
    requestAnimationFrame(() => {
        tab.style.opacity = "1";
    });

    if (isMobileMode) {
        mainTracker.previousClickedIdMobile = buttonId;
    } else {
        mainTracker.previousClickedId = buttonId;
    }
}


// async function switchMobileDesktop() {
//     const wasMobile = isMobile;
//     updateIsMobile();

//     if (wasMobile === isMobile) return;

//     console.log(
//         isMobile
//             ? "🔁 CHANGE DETECTED: DESKTOP → MOBILE"
//             : "🔁 CHANGE DETECTED: MOBILE → DESKTOP"
//     );

//     // determine canonical tab name
//     const sourceId = wasMobile
//         ? mainTracker.previousClickedIdMobile
//         : mainTracker.previousClickedId;

//     const baseName = sourceId
//         .replace("ButtonMobile", "")
//         .replace("Button", "");

//     await wait(30); // allow resize DOM settle

//     // FULL RESET
//     resetAllButtonsAndTabs(isMobile);

//     // ACTIVATE EXACTLY ONE
//     const targetButtonId = isMobile
//         ? `${baseName}ButtonMobile`
//         : `${baseName}Button`;

//         await wait(30);

//     activateTabByButtonId(targetButtonId);

//     await wait(30);
//     mainFunction();
// }

async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();

    if (wasMobile === isMobile) return;

    const sourceId = wasMobile
        ? mainTracker.previousClickedIdMobile
        : mainTracker.previousClickedId;

    const baseName = sourceId
        .replace("ButtonMobile", "")
        .replace("Button", "");

    await wait(30);

    mainFunction();   // rebuild DOM first

    await wait(30);

    resetAllButtonsAndTabs(isMobile);

    const targetButtonId = isMobile
        ? `${baseName}ButtonMobile`
        : `${baseName}Button`;

    activateTabByButtonId(targetButtonId);

    bindFakeScrollbar({
        clickedId: baseName,
        isMobile
    });
}



// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', () => {
    updateIsMobile();
    if (isMobile) {
        startedInMobile = true;
        console.log("📱 STARTED IN MOBILE MODE");
    }
    mainFunction();
    window.addEventListener('resize', switchMobileDesktop);
});
