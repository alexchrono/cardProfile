let statsButton;
let personalityButton;
let historyButton;
let encountersButton;
let oocButton;
let buttonList;
let clickedButton;
let clickedId;
let previousButton;
let previousClickedId;
let galleryButton;
let closeButton;
let topGalleryDisplay;
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
let pic4; //YOU CAN ADD THESE LATER IF YOU WANT.
let pic5;
let pic6;
let pic7;
let pic8;
let pic9;
let pic10;


const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];


function openGallery() {
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

function handleButtonClick(event) {
    if (event.currentTarget.id === "galleryButton") return;

    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    clickedButton = event.currentTarget;
    clickedId = clickedButton.id.replace("Button", "");

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
        const prevTab = document.getElementById(previousClickedId + "Tab");
        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    } else {
        const prevTab = document.getElementById("statsTab");
        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    }

    const currTab = document.getElementById(clickedId + "Tab");
    if (currTab) {
        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
            currTab.style.opacity = "1";
        });
    }

    console.log(`Activated: ${clickedId}`);
}

function mainFunction() {

 //======================THIS IS OUR CAROUSEL LOGIC

// const imageIdsMaybe = ['firstPic', 'secondPic', 'thirdPic', 'fourthPic', 'fifthPic'];

const imageToGrab = document.getElementById('sexyKyra');
const slider = document.getElementById('carouselSlider');
let leftChev = document.getElementById('leftChev');
let rightChev = document.getElementById('rightChev');


// ===== CAROUSEL =====

// collect all possible pics
const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];

// only keep defined / non-empty ones
const activePics = allPics.filter(p =>
    typeof p === "string" && p.trim() !== ""
);

// map index -> pic
let pics = {};
activePics.forEach((url, index) => {
    pics[index] = url;
});

let topNumber = activePics.length;

function allPicFunction(index) {
    if (!activePics[index]) return;

    if (imageToGrab) {
        imageToGrab.src = activePics[index]
    }
    else {return}

    uniCount = index;

    if (slider) slider.value = index;
    if (topNumberEl) topNumberEl.innerText = (index + 1);

    let prevIndex = index - 1 >= 0 ? index - 1 : activePics.length - 1;
    let nextIndex = index + 1 < activePics.length ? index + 1 : 0;

    let prevUrl = pics[prevIndex];
    let nextUrl = pics[nextIndex];

    const lchevContainer = document.getElementById('lchev');
    if (lchevContainer && leftChev) {
        let newLeftChev = leftChev.cloneNode(true);
        lchevContainer.replaceChild(newLeftChev, leftChev);
        leftChev = newLeftChev;
        leftChev.addEventListener('click', () => {
            allPicFunction(prevIndex);
        });
    }

    const rchevContainer = document.getElementById('rchev');
    if (rchevContainer && rightChev) {
        let newRightChev = rightChev.cloneNode(true);
        rchevContainer.replaceChild(newRightChev, rightChev);
        rightChev = newRightChev;
        rightChev.addEventListener('click', () => {
            allPicFunction(nextIndex);
        });
    }
}

// Slider input
if (slider) {
    slider.max = activePics.length - 1;
    slider.addEventListener('input', () => {
        const currentIndex = parseInt(slider.value, 10);
        allPicFunction(currentIndex);
    });
}

// Initialize first image
if (activePics.length > 0) {
    allPicFunction(0);
}

console.log("✅ Carousel initialized with", activePics.length, "images");



    document.getElementById("statsTab").style.visibility = "visible";
    document.getElementById("statsTab").style.opacity = "1";

    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;

    statsButton = document.getElementById("statsButton");
    personalityButton = document.getElementById("personalityButton");
    historyButton = document.getElementById("historyButton");
    encountersButton = document.getElementById("encountersButton");
    oocButton = document.getElementById("oocButton");

    buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton];

    const missingButtons = buttonList.filter(btn => !btn);
    if (missingButtons.length > 0) {
        console.error("Some buttons were not found in the DOM:", missingButtons);
        return;
    }

    buttonList.forEach(btn => btn.addEventListener("click", handleButtonClick));

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
                } else {
                    console.error("Cannot initialize BACK VANTA Fog!");
                }

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
                } else {
                    console.error("Cannot initialize FRONT VANTA Fog!");
                }
            };
            document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
    }, 500);
}

function switchMobileDesktop() {
    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;
    if (window.innerHeight > window.innerWidth) {
        mercierContainerDiv.style.width = '100%';
        mercierContainerDiv.style.height = '100%';
    } else {
        mercierContainerDiv.style.width = '';
        mercierContainerDiv.style.height = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mainFunction();
    window.addEventListener('resize', switchMobileDesktop);
    galleryButton = document.getElementById("galleryButton");
    closeButton = document.getElementById("closeButton");
    topGalleryDisplay = document.getElementById("topGalleryDisplay");
    galleryButton.addEventListener("click", openGallery);
    closeButton.addEventListener("click", closeGallery);
});
