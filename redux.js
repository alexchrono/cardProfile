// ===================== GLOBAL VARIABLES =====================
let statsButton, personalityButton, historyButton, encountersButton, oocButton;
let statsButtonMobile, personalityButtonMobile, historyButtonMobile, encountersButtonMobile, oocButtonMobile;

let buttonList, buttonListMobile;
let clickedId;
let theWaveOpacity;
let theWaveLOpacity;

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
let startedInMobile2 = false;
let vantaInitialized = false;
const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];
let hasFadedIn = false;
let isMobile = false;



const LAYOUT_STATE = {
  desktop: [
    {
      selector: "#just4StartupColumn4Chara img",
      styles: {
        objectFit: "contain",
        height: "100%",
        maxHeight: "79dvh",
        width: "auto",
        marginLeft: "5%"
      }
    },
    {
      selector: "#theWaveImg",
      styles: { opacity: "1" }
    },
    {
      selector: "#theWaveLImg",
      styles: { opacity: "1" }
    },
    {
      selector: "#mobileMain",
      styles: { display: "none" }
    },
    {
      selector: "#leftSideMain",
      styles: { display: "flex" }
    },
    {
      selector: "#bg-test img",
      styles: { filter: "brightness(1.4)" }
    },
    {
      selector: "#bgTestCoverFront",
      styles: { zIndex: "17" }
    },
    {
      selector: "#theRest",
      styles: { display: "flex" }
    },
    {
      selector: "#topViewMobile",
      styles: {
        boxSizing: "",
        width: "",
        height: "",
        position: "",
        display: "none",
        flexDirection: "",
        justifyContent: "",
        alignItems: ""
      }
    },
    {
      selector: ".menuBlockMobile",
      styles: {
        boxSizing: "",
        width: "",
        height: "",
        display: "",
        justifyContent: "",
        alignItems: ""
      }
    },
    {
      selector: ".menuInnerMobile",
      styles: {
        boxSizing: "",
        borderRadius: "",
        height: "",
        width: "",
        fontSize: "",
        display: "",
        justifyContent: "",
        alignItems: "",
        textAlign: "",
        color: "",
        cursor: ""
      }
    }
  ],

  portrait: [
    {
      selector: "#just4StartupColumn4Chara img",
      styles: {
        objectFit: "contain",
        height: "100%",
        maxHeight: "66dvh",
        width: "auto",
        marginLeft: "0"
      }
    },
    {
      selector: "#theWaveImg",
      styles: { opacity: "0" }
    },
    {
      selector: "#theWaveLImg",
      styles: { opacity: "0" }
    },
    {
      selector: "#mobileMain",
      styles: { display: "flex" }
    },
    {
      selector: "#leftSideMain",
      styles: { display: "none" }
    },
    {
      selector: "#bg-test img",
      styles: { filter: "brightness(1.8)" }
    },
    {
      selector: "#bgTestCoverFront",
      styles: { zIndex: "16" }
    },
    {
      selector: "#theRest",
      styles: { display: "none" }
    },
    {
      selector: "#topViewMobile",
      styles: {
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    {
      selector: ".menuBlockMobile",
      styles: {
        boxSizing: "border-box",
        width: "16.66%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    {
      selector: ".menuInnerMobile",
      styles: {
        boxSizing: "border-box",
        borderRadius: "0",
        height: "100%",
        width: "100%",
        fontSize: ".6rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        cursor: "pointer"
      }
    }
  ]
};




//   APPLY CSS CCHANGES

// helper function

function syncLayoutState() {
  applyLayoutState(isMobile ? "portrait" : "desktop");
}
//main

function applyLayoutState(mode) {
  LAYOUT_STATE[mode].forEach(rule => {
    document.querySelectorAll(rule.selector).forEach(el => {
      Object.assign(el.style, rule.styles);
    });
  });
}




//=============== bind buttons =========================


function bindButtonsOnce(buttons) {
    buttons.forEach(btn => {
        if (!btn || btn.dataset.bound) return;

        // CLOSE BUTTONS (explicit routing)
        if (btn.id === "closeButton" || btn.id === "closeButtonMobile") {
            btn.addEventListener("click", closeGallery);
            btn.dataset.bound = "true";
            return;
        }

        // NORMAL TAB / GALLERY BUTTONS
        btn.addEventListener("click", handleButtonClickNotStupid);
        btn.dataset.bound = "true";
    });
}




//  FONT DEBUG SIZE CRAP=======================

function logFontDebugInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const zoom = Math.round(window.devicePixelRatio * 100); // in %
    const root = document.documentElement;

    // current computed font-size
    const computedFontSize = parseFloat(getComputedStyle(root).fontSize);

    // suggested font-size logic (same as your current function)
    let suggestedFontSize;
    if (isMobile) suggestedFontSize = Math.max(14, Math.min(18, width / 25));
    else suggestedFontSize = Math.max(13, Math.min(16, width / 80));


}

// ===================== MOBILE DETECTION =====================
async function updateIsMobile() {
    const prev = isMobile;
    isMobile = window.innerHeight > window.innerWidth;

    if (prev !== isMobile){
        syncLayoutState()
        await wait(40)
    }

    return isMobile;
}



// ===================== UTILITY =====================
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



//================== RISING SUN ANIMATION =========

function riseSun({
  element,
  overlays = [],
  topOverlay = null,
  from = -70,
  to = 0,
  brightnessFrom = 0.2,
  brightnessTo = 1,
  duration = 4000,
  fadeDuration = duration,
  postSunFadeSpeed = 2,
  usePostSunOpacity = false,   // 👈 TOGGLE
  easing = (t) => t
}) {
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    // 🌄 Sun progress
    const sunProgress = Math.min(elapsed / duration, 1);
    const sunEased = easing(sunProgress);

    // 🌅 Fade progress (with optional acceleration)
    let effectiveFadeElapsed = elapsed;
    if (usePostSunOpacity && elapsed > duration) {
      const extraTime = elapsed - duration;
      effectiveFadeElapsed =
        duration + extraTime * postSunFadeSpeed;
    }

    const fadeProgress = Math.min(
      effectiveFadeElapsed / fadeDuration,
      1
    );
    const fadeEased = easing(fadeProgress);

    // 🌄 Sun position
    const currentBottom = from + (to - from) * sunEased;
    element.style.bottom = `${currentBottom}%`;

    // 🔆 Brightness overlays
    overlays.forEach(overlay => {
      if (overlay) {
        const currentBrightness =
          brightnessFrom + (brightnessTo - brightnessFrom) * sunEased;
        overlay.style.filter = `brightness(${currentBrightness})`;
      }
    });

    // 🌅 Top overlay behavior
    if (topOverlay) {
      if (!usePostSunOpacity) {
        // ✅ SIMPLE MODE — gradient the whole time
        const reveal = fadeEased * 100;

        const gradient = `linear-gradient(
          to top,
          rgba(255,255,255,1) ${reveal}%,
          rgba(255,255,255,0) ${reveal + 15}%
        )`;

        topOverlay.style.maskImage = gradient;
        topOverlay.style.webkitMaskImage = gradient;
        topOverlay.style.opacity = 1;
      }
      else {
        // 🔥 COMPLEX MODE — gradient → opacity
        if (sunProgress < .85) {
          const reveal = fadeEased * 100;

          const gradient = `linear-gradient(
            to top,
            rgba(255,255,255,1) ${reveal}%,
            rgba(255,255,255,0) ${reveal + 15}%
          )`;

          topOverlay.style.maskImage = gradient;
          topOverlay.style.webkitMaskImage = gradient;
          topOverlay.style.opacity = fadeEased * 0.5;
        }
        else {
          const opacityProgress =
            (fadeProgress - (duration / fadeDuration)) /
            (1 - (duration / fadeDuration));

          const safeOpacity = Math.max(0, Math.min(opacityProgress, 1));

          topOverlay.style.maskImage = "none";
          topOverlay.style.webkitMaskImage = "none";
          topOverlay.style.opacity = safeOpacity;
        }
      }
    }

    if (sunProgress < 1 || fadeProgress < 1) {
      requestAnimationFrame(animate);
    }


  }

  requestAnimationFrame(animate);
}


// ================= SUN ANIMATION USE FOR ALL ========

async function runSunStartup() {
  let theSunOnly = document.getElementById("bg-testSunOnly");
  let ourDarkBgImage = document.getElementById("ourDarkBgImageNow");
  let normOverlayImg = document.getElementById("bgTestBoverlayImg");
  let topOverlayImg = document.getElementById("bgTestTopPicImg");

riseSun({
  element: theSunOnly,
  overlays: [ourDarkBgImage, normOverlayImg],
  topOverlay: topOverlayImg,

  duration: 3000,
  fadeDuration: 10000,
  postSunFadeSpeed: 4,

  usePostSunOpacity: true, // 👈 SIMPLE MODE

  brightnessFrom: 0.2,
  brightnessTo: .6
});


}







// ==================== MOBILE STARTUP ANIMATION ==================

async function runMobileStartupIntro() {
    let topOverlayImg = document.getElementById("bgTestTopPicImg");

    if (hasFadedIn) return;

    const topTextLogo = document.getElementById("just4StartupCharaNameTopVertical");
    // const waitingWheel = document.getElementById("just4StartupWaitingWheel");
    const bottomButtonMenu = document.getElementById("mainMenuMobile");
    const containerOfCutout = document.getElementById("just4StartupColumn4Chara");
    const topViewMobileInner = document.getElementById("topViewMobileInner");
    const statTabsMobile = document.getElementById("statsTabMobile");
    const startUpFlashPics = document.getElementById("just4StartupFlashPics");
    const actualImage = document.getElementById("flashPicsImage");
    theWaveOpacity = document.getElementById("theWaveImg");
    theWaveLOpacity= document.getElementById("theWaveLImg");

    //kenshin wave opacity was 0.5 changing to 0.  wavveLopacity was 0.3 changing to 0
    theWaveOpacity.style.opacity="0";
    theWaveLOpacity.style.opacity="0"
    statTabsMobile.style.visibility = "hidden";
    statTabsMobile.style.opacity = "0";
    bottomButtonMenu.style.height = "0%";
    topViewMobileInner.style.backgroundColor = "transparent";

    containerOfCutout.style.visibility = "visible";
    containerOfCutout.style.opacity = "1";

    topTextLogo.style.visibility = "visible";
    topTextLogo.style.opacity = "1";

    // waitingWheel.style.visibility = "visible";
    // waitingWheel.style.opacity = ".3";

    await fadeIn();


    runSunStartup()
    await wait(6500);

    // startUpFlashPics.style.visibility = "visible";
    // startUpFlashPics.style.opacity = "1";
    // await wait(20);

    topTextLogo.style.opacity = "0";
    containerOfCutout.style.opacity = "0";

    await wait(500);

    containerOfCutout.style.visibility = "hidden";
    topTextLogo.style.visibility = "hidden";


    bottomButtonMenu.style.height = "12%";
    topViewMobileInner.style.backgroundColor = "rgba(28, 46, 131, 0.5)";
    bottomButtonMenu.style.opacity = "1";
    bottomButtonMenu.style.pointerEvents = "auto";
    statTabsMobile.style.visibility = "visible";
    statTabsMobile.style.opacity = "1";
    // await wait(1500)


    applyBgMasks(isMobile);

    // startUpFlashPics.style.opacity = "0";
    // await wait(1800);
    // startUpFlashPics.style.visibility = "hidden";
    startedInMobile = false;
    // startedInMobile2 = true;
    // await wait(700)
    mainFunction()
}

// ===================== ROOT FONT SIZE =====================
async function updateRootFontSize() {
    const root = document.documentElement;
    // const vw = window.innerWidth;
    // const vh = window.innerHeight;


    const vw = window.visualViewport?.width || window.innerWidth;
const vh = window.visualViewport?.height || window.innerHeight;

    let fontSize;


    // =====================
    // MOBILE — DISCRETE STEPS
    // =====================
    if (isMobile) {
        // if (vw <= 375) {
        //     fontSize = 15;
        // } else if (vw <= 850) {
        //     fontSize = 19;
        // } else {
        //     fontSize = 24;
        // }




            // root.style.fontSize = fontSize + "px";
            root.style.fontSize = "2.4vh";

    await wait(200)



    return {
        fontsize: "2.4vh",
        mode: isMobile ? "mobile" : "desktop",
        vw,
        vh
    };
    }
    // =====================
    // DESKTOP — SMOOTH SCALING
    // =====================
    else {
        const desktopBreakpoints = [
            { w: 500,  f: 4 },
            { w: 726,  f: 8 },
            { w: 1085, f: 12 },
            { w: 1517, f: 15 },
            { w: 1920, f: 19 },
            { w: 2880, f: 25 }
        ];

        let lower = desktopBreakpoints[0];
        let upper = desktopBreakpoints[desktopBreakpoints.length - 1];

        if (vw <= lower.w) {
            fontSize = lower.f;
        } else if (vw >= upper.w) {
            fontSize = upper.f;
        } else {
            for (let i = 0; i < desktopBreakpoints.length - 1; i++) {
                if (vw >= desktopBreakpoints[i].w && vw <= desktopBreakpoints[i + 1].w) {
                    lower = desktopBreakpoints[i];
                    upper = desktopBreakpoints[i + 1];
                    break;
                }
            }

            fontSize =
                lower.f +
                ((vw - lower.w) / (upper.w - lower.w)) *
                (upper.f - lower.f);
        }
    }

    root.style.fontSize = fontSize + "px";

    await wait(200)



    return {
        fontSize,
        mode: isMobile ? "mobile" : "desktop",
        vw,
        vh
    };
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

        return;
    }

    if (el.scrollHeight <= el.clientHeight) {

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

}

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
  await updateIsMobile();
  await updateRootFontSize();

  if (wasMobile === isMobile) return;

  if(!wasMobile && isMobile && !startedInMobile){

  // let bottomButtonMenu = document.getElementById("")
  let bottomButtonMenu = document.getElementById("mainMenuMobile");
  if (bottomButtonMenu){
  bottomButtonMenu.style.display = "flex";
  bottomButtonMenu.style.height = "12%";
  bottomButtonMenu.style.opacity = "1";
  bottomButtonMenu.style.pointerEvents = "auto";
  bottomButtonMenu.style.transform = "translateY(0)";
  bottomButtonMenu.style.visibility = "visible";
    bottomButtonMenu.style.transition = "none";

  }
  }

  const sourceId = wasMobile
    ? mainTracker.previousClickedIdMobile
    : mainTracker.previousClickedId;

  const baseName = sourceId
    .replace("ButtonMobile","")
    .replace("Button","");

  await wait(30);
  await mainFunction();

  resetAllButtonsAndTabs(isMobile);

  const targetButtonId = isMobile
    ? `${baseName}ButtonMobile`
    : `${baseName}Button`;

  activateTabByButtonId(targetButtonId);

  if (baseName === "gallery") {
    setGalleryState(true, isMobile);
  }

  bindFakeScrollbar({ clickedId: baseName, isMobile });
  applyBgMasks();
}

// ===================== MAIN FUNCTION =====================
async function mainFunction() {
    // Button assignment

topGalleryDisplay = document.getElementById('topGalleryDisplay');
topGalleryDisplayMobile = document.getElementById('topGalleryDisplayMobile');
galleryButton = document.getElementById('galleryButton');
galleryButtonMobile = document.getElementById('galleryButtonMobile');
closeButton = document.getElementById('closeButton');
closeButtonMobile = document.getElementById('closeButtonMobile');
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


    bindButtonsOnce(buttonListMobile);


    // buttonListMobile.forEach(btn => btn && btn.addEventListener("click", handleButtonClickNotStupid));
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


    bindButtonsOnce(buttonList);


    buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClickNotStupid));
    if (closeButton) closeButton.addEventListener("click", closeGallery);
}





    // Initialize carousel
    const imageToGrab = isMobile ? document.getElementById('sexyKyraMobile') : document.getElementById('sexyKyra');
    let leftChev = isMobile ? document.getElementById('leftChevMobile') : document.getElementById('leftChev');
    let rightChev = isMobile ? document.getElementById('rightChevMobile') : document.getElementById('rightChev');
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

    const prevIndex = index - 1 >= 0 ? index - 1 : activePics.length - 1;
    const nextIndex = index + 1 < activePics.length ? index + 1 : 0;

    const lchevContainer = isMobile
        ? document.getElementById('lchevMobile')
        : document.getElementById('lchev');
    const rchevContainer = isMobile
        ? document.getElementById('rchevMobile')
        : document.getElementById('rchev');

    if (lchevContainer) {
        if (!lchevContainer.contains(leftChev)) {
            leftChev = document.getElementById(isMobile ? 'leftChevMobile' : 'leftChev');
            if (!leftChev) {
                leftChev = document.createElement('img');
                leftChev.src = "https://i.ibb.co/4S4XsLX/chevron-left-fa.png";
                leftChev.className = "chevrons";
                leftChev.id = isMobile ? "leftChevMobile" : "leftChev";
                lchevContainer.appendChild(leftChev);
            } else lchevContainer.appendChild(leftChev);
        }
        leftChev.onclick = () => setActivePic(prevIndex);
    }

    if (rchevContainer) {
        if (!rchevContainer.contains(rightChev)) {
            rightChev = document.getElementById(isMobile ? 'rightChevMobile' : 'rightChev');
            if (!rightChev) {
                rightChev = document.createElement('img');
                rightChev.src = "https://i.ibb.co/jkXDWgv/chevron-right-fa.png";
                rightChev.className = "chevrons";
                rightChev.id = isMobile ? "rightChevMobile" : "rightChev";
                rchevContainer.appendChild(rightChev);
            } else rchevContainer.appendChild(rightChev);
        }
        rightChev.onclick = () => setActivePic(nextIndex);
    }
}


    if (activePics.length>0) setActivePic(0);


    const statsTab = isMobile ? document.getElementById("statsTabMobile") : document.getElementById("statsTab");
    if (statsTab && !startedInMobile && !startedInMobile2) { statsTab.style.visibility="visible"; statsTab.style.opacity="1"; }


}

// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', async () => {
    await updateIsMobile();
    await updateRootFontSize();

updateRootFontSize().then(info => {

});

    logFontDebugInfo();

    if (isMobile) startedInMobile = true;

    await mainFunction();
    await initVantaFog();

    if (!isMobile && !hasFadedIn) {
        await fadeIn();
        runSunStartup()}
    else if (isMobile && !hasFadedIn) await runMobileStartupIntro();

    // Resize handling — single source of truth
    window.addEventListener('resize', switchMobileDesktop);

});
