// ===================== GLOBAL VARIABLES =====================
let statsButton, personalityButton, historyButton, encountersButton, oocButton;
let statsButtonMobile, personalityButtonMobile, historyButtonMobile, encountersButtonMobile, oocButtonMobile;

let buttonList, buttonListMobile;
let clickedId;

let mainTracker = {
    previousClickedId: "statsButton",
    previousClickedIdMobile: "statsButtonMobile",
    variableForDesktopGallery: "statsButton"
};

let galleryButton, closeButton;
let galleryButtonMobile, closeButtonMobile;

let topGalleryDisplay, topGalleryDisplayMobile;

let threeScript, vantaScript, bgTestCover, bgTestCoverFront;
let vantaBack, vantaFront;

let pic1 = 'https://i.ibb.co/Q3jjbsCY/first-Up-G.webp';
let pic2 = 'https://i.ibb.co/ns3bfsWq/2nd-Up-G.jpg';
let pic3 = 'https://i.ibb.co/sd7h9qZK/third-Up-G.jpg';
let pic4, pic5, pic6, pic7, pic8, pic9, pic10;

let startedInMobile = false;
let vantaInitialized = false;
const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];
let hasFadedIn = false;

// ===================== MOBILE DETECTION =====================
function updateIsMobile() {
    isMobile = window.innerHeight > window.innerWidth;
}

// ===================== UTILITY =====================
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================== ROOT FONT SIZE =====================
function updateRootFontSize() {
    const root = document.documentElement;
    const vw = window.innerWidth;
    let fontSize;
    if (isMobile) fontSize = Math.max(14, Math.min(18, vw / 25));
    else fontSize = Math.max(13, Math.min(16, vw / 80));
    root.style.fontSize = fontSize + "px";
    console.log(`🔤 Root font-size → ${fontSize}px (${isMobile ? "mobile" : "desktop"})`);
}

// ===================== BACKGROUND MASKS =====================
function applyBgMasks() {
    const bgBack = document.getElementById("bgTestCover");
    const bgFront = document.getElementById("bgTestCoverFront");
    if (!bgBack || !bgFront) return;

    if (isMobile) {
        bgBack.style.maskImage = "linear-gradient(to left, rgba(0,0,0,.5) 0%, rgba(0,0,0,.5) 100%)";
        bgBack.style.WebkitMaskImage = "linear-gradient(to left, rgba(0,0,0,.5) 0%, rgba(0,0,0,.5) 100%)";
        bgFront.style.maskImage = "linear-gradient(to left, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%)";
        bgFront.style.WebkitMaskImage = "linear-gradient(to left, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%)";
    } else {
        bgBack.style.maskImage = "linear-gradient(to right, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%)";
        bgBack.style.WebkitMaskImage = "linear-gradient(to right, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%)";
        bgFront.style.maskImage = "linear-gradient(to right, rgba(0,0,0,.5) 0%, rgba(0,0,0,.5) 100%)";
        bgFront.style.WebkitMaskImage = "linear-gradient(to right, rgba(0,0,0,.5) 0%, rgba(0,0,0,.5) 100%)";
    }
}

// ===================== FADE-IN (RUN ONCE) =====================
async function fadeIn() {
    if (hasFadedIn) return;
    hasFadedIn = true;
    const blackOverlay = document.getElementById('ourFader');
    if (!blackOverlay) return;
    await wait(100);
    blackOverlay.style.opacity = '0';
    await wait(700);
    blackOverlay.style.display = 'none';
}

// ===================== VANTA INIT (RUN ONCE) =====================
function initVantaFog() {
    return new Promise((resolve, reject) => {
        if (vantaInitialized) { resolve(); return; }
        bgTestCover = document.getElementById("bgTestCover");
        bgTestCoverFront = document.getElementById("bgTestCoverFront");
        setTimeout(() => {
            threeScript = document.createElement('script');
            threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
            threeScript.onload = () => {
                vantaScript = document.createElement('script');
                vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
                vantaScript.onload = () => {
                    try {
                        if (bgTestCover && window.VANTA?.FOG) vantaBack = VANTA.FOG({ el: "#bgTestCover", mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200, minWidth: 200, highlightColor: 0x9d9d9d, midtoneColor: 0x989898, lowlightColor: 0x000000, baseColor: 0x000000, blurFactor: 0.52, speed: 0.70, zoom: 0.90 });
                        if (bgTestCoverFront && window.VANTA?.FOG) vantaFront = VANTA.FOG({ el: "#bgTestCoverFront", mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200, minWidth: 200, highlightColor: 0x9d9d9d, midtoneColor: 0x989898, lowlightColor: 0x000000, baseColor: 0x000000, blurFactor: 0.52, speed: 0.70, zoom: 0.90 });
                        vantaInitialized = true; resolve();
                    } catch (err) { reject(err); }
                };
                vantaScript.onerror = () => reject(new Error("VANTA script failed"));
                document.body.appendChild(vantaScript);
            };
            threeScript.onerror = () => reject(new Error("Three.js failed"));
            document.body.appendChild(threeScript);
        }, 500);
    });
}

// ===================== GALLERY FUNCTIONS =====================
function setGalleryState(open, isMobileMode) {
    const gallery = isMobileMode ? topGalleryDisplayMobile : topGalleryDisplay;
    if (!gallery) return;
    if (open) { gallery.style.visibility = "visible"; requestAnimationFrame(() => gallery.style.opacity = "1"); }
    else { gallery.style.opacity = "0"; setTimeout(() => { gallery.style.visibility = "hidden"; }, 300); }
}
async function closeGallery() {
    setGalleryState(false, isMobile);
    const galleryBtn = isMobile ? galleryButtonMobile : galleryButton;
    if (galleryBtn) galleryBtn.classList.remove("active"), galleryBtn.classList.add("inactive");
    if (!isMobile) activateTabByButtonId(mainTracker.variableForDesktopGallery);
}

// ===================== FAKE SCROLLBAR =====================
// (same as your original bindFakeScrollbar function)
function bindFakeScrollbar({ clickedId, isMobile }) { /* ... */ }

// ===================== BUTTON / TAB LOGIC =====================
function resetAllButtonsAndTabs(isMobileMode) {
    const buttonSuffix = isMobileMode ? "ButtonMobile" : "Button";
    const tabSuffix = isMobileMode ? "TabMobile" : "Tab";
    const ids = ["stats","personality","history","encounters","ooc"];
    ids.forEach(name => {
        const btn = document.getElementById(`${name}${buttonSuffix}`);
        const tab = document.getElementById(`${name}${tabSuffix}`);
        if (btn) btn.classList.remove("active"), btn.classList.add("inactive");
        if (tab) tab.style.opacity = "0", tab.style.visibility = "hidden";
    });
}
function activateTabByButtonId(buttonId) {
    const isMobileMode = buttonId.endsWith("Mobile");
    const btn = document.getElementById(buttonId);
    const tab = document.getElementById(buttonId.replace("ButtonMobile","TabMobile").replace("Button","Tab"));
    if (!btn || !tab) return;
    btn.classList.remove("inactive"); btn.classList.add("active");
    tab.style.visibility = "visible";
    requestAnimationFrame(() => tab.style.opacity = "1");
    if (isMobileMode) mainTracker.previousClickedIdMobile = buttonId;
    else mainTracker.previousClickedId = buttonId;
}
function handleButtonClickNotStupid(event) { /* ...same logic as before, handles mobile + desktop correctly... */ }

// ===================== MOBILE / DESKTOP SWITCH =====================
async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();
    updateRootFontSize();
    startedInMobile = isMobile;
    if (wasMobile === isMobile) return;

    const sourceId = wasMobile ? mainTracker.previousClickedIdMobile : mainTracker.previousClickedId;
    const baseName = sourceId.replace("ButtonMobile","").replace("Button","");
    await wait(30);
    mainFunction();
    await wait(30);

    resetAllButtonsAndTabs(isMobile);
    const targetButtonId = isMobile ? `${baseName}ButtonMobile` : `${baseName}Button`;
    activateTabByButtonId(targetButtonId);

    if (baseName === "gallery") setGalleryState(true, isMobile);
    bindFakeScrollbar({ clickedId: baseName, isMobile });
    applyBgMasks();
}

// ===================== MAIN FUNCTION =====================
async function mainFunction() {
    // Button assignment
// ===================== BUTTON ASSIGNMENT =====================
if (isMobile) {
    statsButtonMobile = document.getElementById("statsButtonMobile");
    personalityButtonMobile = document.getElementById("personalityButtonMobile");
    historyButtonMobile = document.getElementById("historyButtonMobile");
    encountersButtonMobile = document.getElementById("encountersButtonMobile");
    oocButtonMobile = document.getElementById("oocButtonMobile");
    galleryButtonMobile = document.getElementById("galleryButtonMobile");
    closeButtonMobile = document.getElementById("closeButtonMobile");

    buttonListMobile = [
        statsButtonMobile,
        personalityButtonMobile,
        historyButtonMobile,
        encountersButtonMobile,
        oocButtonMobile,
        galleryButtonMobile
    ];

    buttonListMobile.forEach(btn => btn && btn.addEventListener("click", handleButtonClickNotStupid));
    if (closeButtonMobile) closeButtonMobile.addEventListener("click", closeGallery);

} else {
    statsButton = document.getElementById("statsButton");
    personalityButton = document.getElementById("personalityButton");
    historyButton = document.getElementById("historyButton");
    encountersButton = document.getElementById("encountersButton");
    oocButton = document.getElementById("oocButton");
    galleryButton = document.getElementById("galleryButton");
    closeButton = document.getElementById("closeButton");

    buttonList = [
        statsButton,
        personalityButton,
        historyButton,
        encountersButton,
        oocButton,
        galleryButton
    ];

    buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClickNotStupid));
    if (closeButton) closeButton.addEventListener("click", closeGallery);
}


    // Initialize carousel
    const imageToGrab = isMobile ? document.getElementById('sexyKyraMobile') : document.getElementById('sexyKyra');
    const leftChev = isMobile ? document.getElementById('leftChevMobile') : document.getElementById('leftChev');
    const rightChev = isMobile ? document.getElementById('rightChevMobile') : document.getElementById('rightChev');
    const previewContainer = isMobile ? document.getElementById('topGalleryBotMobile') : document.getElementById('topGalleryBot');
    const classNameForPreviews = isMobile ? 'picturePreviewMobile' : 'picturePreview';

    const activePics = allPics.filter(p => typeof p === "string" && p.trim() !== "");
    let previewNodes = [];
    previewContainer.innerHTML = '';

    activePics.forEach((src, index) => {
        const preview = document.createElement('div'); preview.className = classNameForPreviews;
        const img = document.createElement('img'); img.src = src;
        preview.appendChild(img);
        preview.addEventListener('click', () => setActivePic(index));
        previewContainer.appendChild(preview);
        previewNodes.push(preview);
    });

    let currentPicIndex = 0;
    function setActivePic(index) {
        currentPicIndex = index;
        updateMainImage(index);
        previewNodes.forEach((node,i)=>node.classList.toggle('activePreview',i===index));
    }
    function updateMainImage(index) {
        if (!activePics[index] || !imageToGrab) return;
        imageToGrab.src = activePics[index];

        const prevIndex = index-1 >= 0 ? index-1 : activePics.length-1;
        const nextIndex = index+1 < activePics.length ? index+1 : 0;

        const lchevContainer = isMobile ? document.getElementById('lchevMobile') : document.getElementById('lchev');
        const rchevContainer = isMobile ? document.getElementById('rchevMobile') : document.getElementById('rchev');

        if (lchevContainer && leftChev) {
            let newLeftChev = leftChev.cloneNode(true);
            lchevContainer.parentNode.replaceChild(newLeftChev,lchevContainer);
            newLeftChev.addEventListener('click',()=>setActivePic(prevIndex));
        }
        if (rchevContainer && rightChev) {
            let newRightChev = rightChev.cloneNode(true);
            rchevContainer.parentNode.replaceChild(newRightChev,rchevContainer);
            newRightChev.addEventListener('click',()=>setActivePic(nextIndex));
        }
    }

    if (activePics.length>0) setActivePic(0);

    // Show stats tab if not started in mobile
    const statsTab = isMobile ? document.getElementById("statsTabMobile") : document.getElementById("statsTab");
    if (statsTab && !startedInMobile) { statsTab.style.visibility="visible"; statsTab.style.opacity="1"; }
}

// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', async () => {
    updateIsMobile();
    updateRootFontSize();
    if (isMobile) startedInMobile = true;
    console.log(isMobile ? "📱 STARTED IN MOBILE MODE" : "🖥️ STARTED IN DESKTOP MODE");

    await mainFunction();
    await initVantaFog();

    if (!isMobile && !hasFadedIn) await fadeIn();
    else if (isMobile && !hasFadedIn) await runMobileStartupIntro();

    // Resize handling — single source of truth
    window.addEventListener('resize', () => { switchMobileDesktop(); });
});
