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
let clickedId;

let mainTracker = {
    previousClickedId: "statsButton",
    previousClickedIdMobile: "statsButtonMobile",
    variableForDesktopGallery: "statsButton"
};

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

let pic1 = 'https://i.ibb.co/Q3jjbsCY/first-Up-G.webp';
let pic2 = 'https://i.ibb.co/ns3bfsWq/2nd-Up-G.jpg';
let pic3 = 'https://i.ibb.co/sd7h9qZK/third-Up-G.jpg';
let pic4, pic5, pic6, pic7, pic8, pic9, pic10;

let startedInMobile = false;
let vantaInitialized = false;
const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];

// ===================== MOBILE DETECTION =====================
function updateIsMobile() {
    isMobile = window.innerHeight > window.innerWidth;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}








// ===================== VANTA INIT (RUN ONCE) =====================


function initVantaFog() {
    if (vantaInitialized) {
        console.log("🟡 VANTA already initialized — skipping");
        return;
    }

    bgTestCover = document.getElementById("bgTestCover");
    bgTestCoverFront = document.getElementById("bgTestCoverFront");

    if (!bgTestCover && !bgTestCoverFront) {
        console.warn("⚠️ VANTA elements not found — aborting init");
        return;
    }

    setTimeout(() => {
        threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.onload = () => {
            vantaScript = document.createElement('script');
            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
            vantaScript.onload = () => {

                if (bgTestCover && window.VANTA?.FOG) {
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
                }

                if (bgTestCoverFront && window.VANTA?.FOG) {
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
                }

                vantaInitialized = true;
            };

            document.body.appendChild(vantaScript);
        };

        document.body.appendChild(threeScript);
    }, 500);
}



// ===================== GALLERY FUNCTIONS =====================
function setGalleryState(open, isMobileMode) {
    const gallery = isMobileMode ? topGalleryDisplayMobile : topGalleryDisplay;
    if (!gallery) return;

    if (open) {
        gallery.style.visibility = "visible";
        requestAnimationFrame(() => {
            gallery.style.opacity = "1";
        });
    } else {
        gallery.style.opacity = "0";
        setTimeout(() => {
            gallery.style.visibility = "hidden";
        }, 300);
    }
}

async function closeGallery() {
    console.group('🧪 CLOSE GALLERY DEBUG');
    console.log('📍 Entered closeGallery()');
    console.log('📱 isMobile:', isMobile);
    console.log('📦 mainTracker snapshot (start):', JSON.parse(JSON.stringify(mainTracker)));

    // ---- STEP 1: Close gallery UI ----
    setGalleryState(false, isMobile);

    // ---- STEP 2: Deactivate gallery button ----
    const galleryBtn = isMobile ? galleryButtonMobile : galleryButton;
    if (galleryBtn) {
        galleryBtn.classList.remove("active");
        galleryBtn.classList.add("inactive");
    }

    // ---- STEP 3: Desktop-only restore ----
    if (!isMobile) {
        const lastButtonId = mainTracker.variableForDesktopGallery;
        if (lastButtonId) {
            console.log('🔁 Restoring previous tab:', lastButtonId);
            activateTabByButtonId(lastButtonId);
        }
    }

    console.groupEnd();
}

// ===================== FAKE SCROLLBAR =====================
function bindFakeScrollbar({ clickedId, isMobile }) {
    const SCROLL = {
        holderId: isMobile ? 'scrollHolderMobile' : 'scrollHolder',
        trackClass: isMobile ? '.scroll-trackMobile' : '.scroll-track',
        thumbClass: isMobile ? '.scroll-thumbMobile' : '.scroll-thumb',
        scrollFindId: clickedId + (isMobile ? 'ScrollFindMobile' : 'ScrollFind')
    };

    const scrollHolder = document.getElementById(SCROLL.holderId);
    const el = document.getElementById(SCROLL.scrollFindId);

    // Cleanup previous binding
    if (scrollHolder?.dataset?.boundTo) {
        const prevEl = document.getElementById(scrollHolder.dataset.boundTo);
        console.log('[FAKE SCROLLBAR] Cleaning previous binding:', scrollHolder.dataset.boundTo);
        if (prevEl && prevEl.__syncThumb) {
            prevEl.removeEventListener('scroll', prevEl.__syncThumb);
            delete prevEl.__syncThumb;
        }
        scrollHolder.classList.remove('visible');
        scrollHolder.style.visibility = 'hidden';
        scrollHolder.style.opacity = '0';
        delete scrollHolder.dataset.boundTo;
    }

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

    // Show scrollbar
    scrollHolder.style.visibility = 'visible';
    scrollHolder.style.opacity = '1';
    scrollHolder.classList.add('visible');

    console.log('[FAKE SCROLLBAR] Binding to:', el.id);

    // Thumb sync
    function syncThumb() {
        const ratio = el.clientHeight / el.scrollHeight;
        const thumbHeight = Math.max(ratio * track.clientHeight, track.clientHeight * 0.08);
        thumb.style.height = thumbHeight + 'px';

        const buffer = track.clientHeight * 0.01;
        const maxTop = track.clientHeight - thumbHeight - buffer;
        const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        thumb.style.top = buffer + scrollRatio * maxTop + 'px';
    }

    el.__syncThumb = syncThumb;
    el.addEventListener('scroll', syncThumb);
    syncThumb();

    // Drag logic
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
        const delta = (e.clientY - startY) * (el.scrollHeight / track.clientHeight);
        el.scrollTop = startScroll + delta;
    };

    document.onmouseup = () => {
        dragging = false;
        document.body.style.userSelect = '';
    };

    scrollHolder.dataset.boundTo = el.id;
    console.log('[FAKE SCROLLBAR] Bound successfully →', el.id);
}

// ===================== BUTTON / TAB LOGIC =====================
function resetAllButtonsAndTabs(isMobileMode) {
    const buttonSuffix = isMobileMode ? "ButtonMobile" : "Button";
    const tabSuffix = isMobileMode ? "TabMobile" : "Tab";
    const ids = ["stats", "personality", "history", "encounters", "ooc"];

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
    const tab = document.getElementById(buttonId.replace("ButtonMobile", "TabMobile").replace("Button", "Tab"));
    if (!btn || !tab) return;

    btn.classList.remove("inactive");
    btn.classList.add("active");

    tab.style.visibility = "visible";
    requestAnimationFrame(() => tab.style.opacity = "1");

    if (isMobileMode) mainTracker.previousClickedIdMobile = buttonId;
    else mainTracker.previousClickedId = buttonId;
}

function handleButtonClickNotStupid(event) {
    const btn = event.currentTarget;
    const btnId = btn.id;
    const baseId = btnId.replace("ButtonMobile", "").replace("Button", "");
    clickedId = baseId;

    // === GALLERY SPECIAL CASE ===
    if (baseId === "gallery") {
        if (isMobile) {
            resetAllButtonsAndTabs(true);
            mainTracker.previousClickedIdMobile = "galleryButtonMobile";
        } else {
            mainTracker.variableForDesktopGallery = mainTracker.previousClickedId;
            resetAllButtonsAndTabs(false);
            mainTracker.previousClickedId = "galleryButton";
        }

        btn.classList.remove("inactive");
        btn.classList.add("active");
        setGalleryState(true, isMobile);
        return; // skip normal tab logic
    }

    // NORMAL TAB SWITCH
    let oldButton, oldTab, newTab;
    if (isMobile) {
        if (mainTracker.previousClickedIdMobile && btnId !== mainTracker.previousClickedIdMobile) {
            oldButton = document.getElementById(mainTracker.previousClickedIdMobile);
            oldTab = document.getElementById(mainTracker.previousClickedIdMobile.replace("ButtonMobile", "TabMobile"));
        }
        newTab = document.getElementById(btnId.replace("ButtonMobile", "TabMobile"));
    } else {
        if (mainTracker.previousClickedId && btnId !== mainTracker.previousClickedId) {
            oldButton = document.getElementById(mainTracker.previousClickedId);
            oldTab = document.getElementById(mainTracker.previousClickedId.replace("Button", "Tab"));
        }
        newTab = document.getElementById(btnId.replace("Button", "Tab"));
    }

    if (oldButton) oldButton.classList.remove("active"), oldButton.classList.add("inactive");
    btn.classList.remove("inactive"), btn.classList.add("active");

    // Close gallery if switching away
    if ((isMobile && mainTracker.previousClickedIdMobile === "galleryButtonMobile") ||
        (!isMobile && mainTracker.previousClickedId === "galleryButton")) {
        setGalleryState(false, isMobile);
        const galleryBtn = isMobile ? galleryButtonMobile : galleryButton;
        if (galleryBtn) galleryBtn.classList.remove("active"), galleryBtn.classList.add("inactive");
    }

    if (oldTab) {
        oldTab.style.opacity = "0";
        setTimeout(() => oldTab.style.visibility = "hidden", 600);
    }

    if (newTab) {
        newTab.style.visibility = "visible";
        requestAnimationFrame(() => newTab.style.opacity = "1");
    }

    if (isMobile) mainTracker.previousClickedIdMobile = btnId;
    else mainTracker.previousClickedId = btnId;

    bindFakeScrollbar({ clickedId, isMobile });
}

// ===================== MOBILE / DESKTOP SWITCH =====================
async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();
    if (wasMobile === isMobile) return;

    const sourceId = wasMobile ? mainTracker.previousClickedIdMobile : mainTracker.previousClickedId;
    const baseName = sourceId.replace("ButtonMobile", "").replace("Button", "");

    await wait(30);
    mainFunction(); // rebuild DOM
    await wait(30);

    resetAllButtonsAndTabs(isMobile);
    const targetButtonId = isMobile ? `${baseName}ButtonMobile` : `${baseName}Button`;
    activateTabByButtonId(targetButtonId);

    if (baseName === "gallery") setGalleryState(true, isMobile);

    bindFakeScrollbar({ clickedId: baseName, isMobile });
}

//START UP CRAP========================================

// ===================== STARTUP INTRO HOOK =====================
async function runMobileStartupIntro() {
    console.log("🚀 Mobile startup intro placeholder");

    // let bottomTextDisplay = document.getElementById("just4Startup")

    // bottomTextDisplay.style.visibility="visible"

    let topTextLogo = document.getElementById("just4StartupCharaNameTop")

    let bottomButtonMenu = document.getElementById("mainMenuMobile");

    // bottomButtonMenu.style.visibility="hidden";

    // let expandForBeginning = document.getElementById("topViewMobile")
    // expandForBeginning.style.height="100%";
    let containerOfCutout = document.getElementById("just4StartupColumn4Chara")
    let topViewMobileInner = document.getElementById("topViewMobileInner");
    let statTabsMobile = document.getElementById('statsTabMobile');
    let startUpFlashPics = document.getElementById('just4StartupFlashPics');
    let actualImage = document.getElementById('flashPicsImage');
    statTabsMobile.style.visibility="hidden";  //was visible
    bottomButtonMenu.style.height="0%" //height was originally 12
    topViewMobileInner.style.backgroundColor = "transparent"; //was         background-color: rgba(28, 46, 131, 0.75);
    topTextLogo.style.visibility="visible" //was hidden



    await wait(4000);





   //======================PART WHERE I ANIMATE THE IMAGES....
    startUpFlashPics.style.visibility="visible" //was hidden
    await wait(20)
    topTextLogo.style.visibility="hidden"
    containerOfCutout.style.opacity = '0'
    containerOfCutout.style.visibility = 'hidden'


    // actualImage.src="https://i.ibb.co/Q3jjbsCY/first-Up-G.webp";

    // containerOfCutout.style.opacity = '0'
    // containerOfCutout.style.visibility = 'hidden'
    // await wait(1500);
    // actualImage.src="https://i.ibb.co/ns3bfsWq/2nd-Up-G.jpg";
    // await wait(1500);

    // actualImage.src="https://i.ibb.co/sd7h9qZK/third-Up-G.jpg";
    // await wait(1500);

    // startUpFlashPics.style.visibility="hidden"


    // await wait(2000);
     //END ANIMATE IMAGES

    // ================= SHOW THE DAMN MENU

    // bottomButtonMenu.style.height="12%";
    // statTabsMobile.style.visibility="visible";
    // bottomButtonMenu.style.height="12%";
    // topViewMobileInner.style.backgroundColor = "rgba(28, 46, 131, 0.5)";

   //========= ignore below

    // bottomButtonMenu.style.height="0%" //height was originally 12
    // topViewMobileInner.style.backgroundColor = "transparent"; //was         background-color: rgba(28, 46, 131, 0.75);

    // topTextLogo.style.visibility="visible"; //was hidden





}


//==================================MAIN FUNCTION ==========================================

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

}

    // ===================== END OF MAINFUNCTION =====================


// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', () => {
    updateIsMobile();
    if (isMobile) startedInMobile = true, console.log("📱 STARTED IN MOBILE MODE");
    mainFunction();
    initVantaFog();
    window.addEventListener('resize', switchMobileDesktop);
});
