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

// ===================== TAB / BUTTON HANDLER =====================
function handleButtonClick(event) {

    const btn = event.currentTarget;
    const btnId = btn.id;

    const isGalleryButton =
        btnId === "galleryButton" ||
        btnId === "galleryButtonMobile";

    /* ===================== GALLERY SHORT-CIRCUIT ===================== */

    if (!isMobile && isGalleryButton) {
        openGallery();
        return;
    }

    if (isMobile && isGalleryButton) {
        previousButtonMobile = clickedButtonMobile;
        previousClickedIdMobile = clickedIdMobile;

        clickedButtonMobile = btn;
        clickedIdMobile = "gallery";

        if (previousButtonMobile) {
            previousButtonMobile.classList.remove("active");
            previousButtonMobile.classList.add("inactive");
        }

        btn.classList.remove("inactive");
        btn.classList.add("active");

        openGallery();
        return;
    }

    /* ===================== BUTTON STATE ===================== */

    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    clickedButton = btn;

    clickedId = isMobile
        ? btnId.replace("ButtonMobile", "")
        : btnId.replace("Button", "");

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

    /* ===================== TAB TRANSITION ===================== */

    let prevTab = previousClickedId
        ? document.getElementById(previousClickedId + (isMobile ? "TabMobile" : "Tab"))
        : document.getElementById(isMobile ? "statsTabMobile" : "statsTab");

    if (prevTab) {
        prevTab.style.opacity = "0";
        setTimeout(() => {
            prevTab.style.visibility = "hidden";
        }, 600);
    }

    let currTab = document.getElementById(
        clickedId + (isMobile ? "TabMobile" : "Tab")
    );

    if (currTab) {
        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
            currTab.style.opacity = "1";
        });
    }

    console.log('[TAB] Activated:', clickedId);

    /* ============================================================
       ===================== SCROLLBAR LOGIC =====================
       ============================================================ */

    /* ---------- PARAMS ---------- */

    const SCROLL = {
        holderId: isMobile ? 'scrollHolderMobile' : 'scrollHolder',
        trackClass: isMobile ? '.scroll-trackMobile' : '.scroll-track',
        thumbClass: isMobile ? '.scroll-thumbMobile' : '.scroll-thumb',
        scrollFindId: clickedId + (isMobile ? 'ScrollFindMobile' : 'ScrollFind')
    };

    const scrollHolder = document.getElementById(SCROLL.holderId);
    const el = document.getElementById(SCROLL.scrollFindId);

    /* ---------- SAFEGUARD CLEANUP ---------- */

    if (scrollHolder?.dataset?.boundTo) {
        console.log('[FAKE SCROLLBAR] Cleaning previous binding:', scrollHolder.dataset.boundTo);

        scrollHolder.classList.remove('visible');
        scrollHolder.style.visibility = 'hidden';
        scrollHolder.style.opacity = '0';

        delete scrollHolder.dataset.boundTo;
    }

    if (!scrollHolder || !el) {
        console.log('[FAKE SCROLLBAR] Missing elements — aborting');
        return;
    }

    /* ---------- OVERFLOW CHECK ---------- */

    if (el.scrollHeight <= el.clientHeight) {
        console.log('[FAKE SCROLLBAR] No overflow — hiding');

        scrollHolder.classList.remove('visible');
        scrollHolder.style.visibility = 'hidden';
        scrollHolder.style.opacity = '0';
        return;
    }

    /* ---------- INIT ---------- */

    console.log('[FAKE SCROLLBAR] Binding to:', el.id);

    const track = scrollHolder.querySelector(SCROLL.trackClass);
    const thumb = scrollHolder.querySelector(SCROLL.thumbClass);

    if (!track || !thumb) {
        console.warn('[FAKE SCROLLBAR] Track or thumb missing');
        return;
    }

    scrollHolder.style.visibility = 'visible';
    scrollHolder.style.opacity = '1';
    scrollHolder.classList.add('visible');

    function syncThumb() {
        const ratio = el.clientHeight / el.scrollHeight;
        const thumbHeight = Math.max(ratio * track.clientHeight, track.clientHeight * 0.08);
        thumb.style.height = thumbHeight + 'px';

        const buffer = track.clientHeight * 0.01;
        const maxTop = track.clientHeight - thumbHeight - buffer;

        const scrollRatio =
            el.scrollTop / (el.scrollHeight - el.clientHeight || 1);

        thumb.style.top = buffer + scrollRatio * maxTop + 'px';
    }

    el.addEventListener('scroll', syncThumb);
    syncThumb();

    /* ---------- DRAG ---------- */

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

    buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClick));
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
async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();
    await wait(10);
    if (wasMobile === isMobile) return;
    mainFunction();
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
