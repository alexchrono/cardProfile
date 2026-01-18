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
//======== close gallery if open

function closeGalleryMobileIfOpen() {
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


// ===================== TAB / BUTTON HANDLER =====================
function handleButtonClick(event) {
    const btn = event.currentTarget;
    const btnId = btn.id;

    console.log("======================================");
    console.log("🖱️ CLICK EVENT FIRED");
    console.log("BTN:", btn);
    console.log("BTN ID:", btnId);

    const isGalleryButton =
        btnId === "galleryButton" ||
        btnId === "galleryButtonMobile";

    const derivedId = isMobile
        ? btnId.replace("ButtonMobile", "")
        : btnId.replace("Button", "");

    console.log("📌 isMobile:", isMobile);
    console.log("📌 isGalleryButton:", isGalleryButton);
    console.log("📌 derivedId:", derivedId);

    console.log("📊 STATE BEFORE CLICK");
    console.log("clickedButtonMobile:", clickedButtonMobile?.id);
    console.log("clickedIdMobile:", clickedIdMobile);
    console.log("previousButtonMobile:", previousButtonMobile?.id);
    console.log("previousClickedIdMobile:", previousClickedIdMobile);
    console.log("clickedButton (desktop):", clickedButton?.id);
    console.log("clickedId (desktop):", clickedId);
    console.log("previousClickedId (desktop):", previousClickedId);

    /* =========================================================
       ======================= MOBILE ==========================
       ========================================================= */
    if (isMobile) {
        console.log("📱 ENTER MOBILE FLOW");

        /* ---------- GALLERY BUTTON ---------- */
        if (isGalleryButton) {
            console.log("🖼️ MOBILE GALLERY BUTTON CLICKED");

            // 🔒 ENSURE BASELINE TAB EXISTS (FIRST CLICK EVER)
            if (!clickedButtonMobile && !clickedIdMobile) {
                console.log("🧱 No mobile baseline — initializing to STATS");

                clickedButtonMobile = statsButtonMobile;
                clickedIdMobile = "stats";

                statsButtonMobile.classList.add("active");
                statsButtonMobile.classList.remove("inactive");
            }

            if (clickedButtonMobile) {
                console.log("🔎 clickedButtonMobile classes:", [...clickedButtonMobile.classList]);
            }

            if (
                clickedButtonMobile &&
                clickedButtonMobile !== galleryButtonMobile &&
                clickedIdMobile !== "stats"
            ) {
                console.log("🧹 Deactivating previous mobile button:", clickedButtonMobile.id);

                clickedButtonMobile.classList.remove("active");
                clickedButtonMobile.classList.add("inactive");
            }

            console.log("🎨 galleryButtonMobile BEFORE:", [...galleryButtonMobile.classList]);

            galleryButtonMobile.classList.remove("inactive");
            galleryButtonMobile.classList.add("active");

            console.log("🎨 galleryButtonMobile AFTER:", [...galleryButtonMobile.classList]);

            clickedButtonMobile = galleryButtonMobile;
            clickedIdMobile = "gallery";

            console.log("📊 STATE AFTER GALLERY SET");
            console.log("clickedButtonMobile:", clickedButtonMobile?.id);
            console.log("clickedIdMobile:", clickedIdMobile);

            console.log("🖼️ CALLING openGallery()");
            openGallery();

            console.log("✅ RETURNING FROM MOBILE GALLERY HANDLER");
            return;
        }

        /* ---------- LEAVING GALLERY ---------- */
        if (clickedIdMobile === "gallery") {
            console.log("🚪 MOBILE: LEAVING GALLERY");

            console.log("🖼️ CALLING closeGalleryMobileIfOpen()");
            closeGalleryMobileIfOpen();

            console.log("🎨 galleryButtonMobile BEFORE:", [...galleryButtonMobile.classList]);

            galleryButtonMobile.classList.remove("active");
            galleryButtonMobile.classList.add("inactive");

            console.log("🎨 galleryButtonMobile AFTER:", [...galleryButtonMobile.classList]);

            clickedButtonMobile = null;
            clickedIdMobile = null;

            console.log("📊 STATE AFTER LEAVING GALLERY");
            console.log("clickedButtonMobile:", clickedButtonMobile);
            console.log("clickedIdMobile:", clickedIdMobile);
        }

        /* ---------- NORMAL TAB ---------- */
        console.log("📱 MOBILE NORMAL TAB CLICK:", derivedId);

        previousButtonMobile = clickedButtonMobile;
        previousClickedIdMobile = clickedIdMobile;

        console.log("↩️ previousButtonMobile:", previousButtonMobile?.id);
        console.log("↩️ previousClickedIdMobile:", previousClickedIdMobile);

        if (previousButtonMobile) {
            console.log("🧹 Deactivating previous mobile button:", previousButtonMobile.id);
            console.log("🎨 BEFORE:", [...previousButtonMobile.classList]);

            previousButtonMobile.classList.remove("active");
            previousButtonMobile.classList.add("inactive");

            console.log("🎨 AFTER:", [...previousButtonMobile.classList]);
        }

        clickedButtonMobile = btn;
        clickedIdMobile = derivedId;

        console.log("🎯 New clickedButtonMobile:", clickedButtonMobile.id);
        console.log("🎯 New clickedIdMobile:", clickedIdMobile);

        console.log("🎨 BTN BEFORE:", [...btn.classList]);

        btn.classList.remove("inactive");
        btn.classList.add("active");

        console.log("🎨 BTN AFTER:", [...btn.classList]);
        console.log("📱 EXIT MOBILE FLOW (NO RETURN)");
    }

    /* =========================================================
       ======================= DESKTOP =========================
       ========================================================= */
    if (!isMobile) {
        console.log("🖥️ ENTER DESKTOP FLOW");

        if (isGalleryButton) {
            console.log("🖼️ DESKTOP GALLERY CLICK");
            console.log("🖼️ CALLING openGallery()");
            openGallery();
            console.log("✅ RETURN FROM DESKTOP GALLERY");
            return;
        }

        if (clickedButton && clickedId) {
            previousButton = clickedButton;
            previousClickedId = clickedId;
        }

        console.log("↩️ previousClickedId:", previousClickedId);

        clickedButton = btn;
        clickedId = derivedId;

        if (previousClickedId === clickedId) {
            console.log("⏭️ SAME TAB CLICK — RETURNING");
            return;
        }

        if (previousButton) {
            console.log("🧹 Deactivating previous desktop button:", previousButton.id);
            previousButton.classList.remove("active");
            previousButton.classList.add("inactive");
        } else {
            console.log("📊 No previous desktop button — assuming stats");
            statsButton.classList.remove("active");
            statsButton.classList.add("inactive");
        }

        btn.classList.remove("inactive");
        btn.classList.add("active");
    }

    /* =========================================================
       ==================== TAB TRANSITION =====================
       ========================================================= */
    console.log("📄 TAB TRANSITION START");

    const prevTabId = previousClickedId
        ? previousClickedId + (isMobile ? "TabMobile" : "Tab")
        : (isMobile ? "statsTabMobile" : "statsTab");

    const prevTab = document.getElementById(prevTabId);
    console.log("🔎 prevTabId:", prevTabId, "exists:", !!prevTab);

    if (prevTab) {
        const cs = getComputedStyle(prevTab);
        console.log("👀 prevTab visibility BEFORE:", cs.visibility, cs.opacity);

        prevTab.style.opacity = "0";
        setTimeout(() => {
            prevTab.style.visibility = "hidden";
            console.log("🙈 prevTab HIDDEN:", prevTabId);
        }, 600);
    }

    const currTabId = derivedId + (isMobile ? "TabMobile" : "Tab");
    const currTab = document.getElementById(currTabId);

    console.log("🔎 currTabId:", currTabId, "exists:", !!currTab);

    if (currTab) {
        const cs = getComputedStyle(currTab);
        console.log("👀 currTab BEFORE:", cs.visibility, cs.opacity);

        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
            currTab.style.opacity = "1";
            const cs2 = getComputedStyle(currTab);
            console.log("👁️ currTab AFTER:", cs2.visibility, cs2.opacity);
        });
    }

    /* =========================================================
       =================== SCROLLBAR ===========================
       ========================================================= */
    console.log("🧵 SCROLLBAR SETUP");

    const SCROLL = {
        holderId: isMobile ? "scrollHolderMobile" : "scrollHolder",
        trackClass: isMobile ? ".scroll-trackMobile" : ".scroll-track",
        thumbClass: isMobile ? ".scroll-thumbMobile" : ".scroll-thumb",
        scrollFindId: derivedId + (isMobile ? "ScrollFindMobile" : "ScrollFind")
    };

    console.log("🧵 SCROLL CONFIG:", SCROLL);

    const scrollHolder = document.getElementById(SCROLL.holderId);
    const el = document.getElementById(SCROLL.scrollFindId);

    console.log("🔎 scrollHolder exists:", !!scrollHolder);
    console.log("🔎 scroll target exists:", !!el);

    if (!scrollHolder || !el) {
        console.log("🚫 SCROLL ABORT — missing elements");
        return;
    }

    console.log("📏 scrollHeight:", el.scrollHeight, "clientHeight:", el.clientHeight);

    if (el.scrollHeight <= el.clientHeight) {
        console.log("📏 NO OVERFLOW — hiding scrollbar");
        return;
    }

    const track = scrollHolder.querySelector(SCROLL.trackClass);
    const thumb = scrollHolder.querySelector(SCROLL.thumbClass);
    if (!track || !thumb) return;

    scrollHolder.style.visibility = "visible";
    scrollHolder.style.opacity = "1";
    scrollHolder.classList.add("visible");

    function syncThumb() {
        const ratio = el.clientHeight / el.scrollHeight;
        const thumbHeight = Math.max(ratio * track.clientHeight, track.clientHeight * 0.08);
        thumb.style.height = thumbHeight + "px";

        const maxTop = track.clientHeight - thumbHeight;
        const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        thumb.style.top = scrollRatio * maxTop + "px";
    }

    el.addEventListener("scroll", syncThumb);
    syncThumb();

    scrollHolder.dataset.boundTo = el.id;
    console.log("🟢 SCROLLBAR BOUND TO:", el.id);

    console.log("======================================");
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
    statsButtonMobile = document.getElementById("statsButtonMobile");
    personalityButtonMobile = document.getElementById("personalityButtonMobile");
    historyButtonMobile = document.getElementById("historyButtonMobile");
    encountersButtonMobile = document.getElementById("encountersButtonMobile");
    oocButtonMobile = document.getElementById("oocButtonMobile");
    galleryButtonMobile = document.getElementById("galleryButtonMobile");
    topGalleryDisplayMobile = document.getElementById("topGalleryDisplayMobile");

    buttonList = [statsButtonMobile, personalityButtonMobile, historyButtonMobile, encountersButtonMobile, oocButtonMobile, galleryButtonMobile];
} else {
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

    // buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClick));

    if (isMobile) {
    buttonListMobile.forEach(btn => btn && btn.addEventListener("click", handleButtonClick));
} else {
    buttonList.forEach(btn => btn && btn.addEventListener("click", handleButtonClick));
}

if (closeButton) closeButton.addEventListener("click", closeGallery);

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
