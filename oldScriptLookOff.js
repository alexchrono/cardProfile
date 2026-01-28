async function mainFunction() {

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
                } else console.error("Cannot initialize FRONT VANTA Fog!");
            };
            document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
    }, 500);
}
