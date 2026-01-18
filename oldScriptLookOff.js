function handleButtonClick(event) {
    const btn = event.currentTarget;
    const btnId = btn.id;

    const isGalleryButton =
        btnId === "galleryButton" ||
        btnId === "galleryButtonMobile";

    console.log('🖱️ BUTTON CLICKED:', btnId);
    console.log('📱 isMobile:', isMobile);

    // ================== HELPER FUNCTION ===================

    function updateMobileState(btn, id) {
        previousButtonMobile = clickedButtonMobile;
        previousClickedIdMobile = clickedIdMobile;

        clickedButtonMobile = btn;
        clickedIdMobile = id;

        console.log('📱 [MOBILE STATE UPDATED]');
        console.log('   previousButtonMobile:', previousButtonMobile?.id);
        console.log('   clickedButtonMobile:', clickedButtonMobile?.id);
        console.log('   clickedIdMobile:', clickedIdMobile);
    }

    // ===================== ID DERIVATION =====================

    const derivedId = isMobile
        ? btnId.replace("ButtonMobile", "")
        : btnId.replace("Button", "");

    console.log('🧠 derivedId:', derivedId);

    if (isMobile && !isGalleryButton) {
        closeGalleryMobileIfOpen();
    }

    // ===================== MOBILE STATE UPDATE =====================

    if (isMobile) {
        updateMobileState(btn, derivedId);
    }

    // ===================== GALLERY SHORT-CIRCUIT =====================

    if (!isMobile && isGalleryButton) {
        console.log('🖼️ [DESKTOP GALLERY CLICK]');
        openGallery();
        return;
    }

    if (isMobile && isGalleryButton) {
        console.log('📱 [MOBILE GALLERY CLICK]');

        if (previousButtonMobile && previousButtonMobile !== btn) {
            console.log('🧹 Deactivating previous mobile button:', previousButtonMobile.id);

            previousButtonMobile.classList.remove("active");
            previousButtonMobile.classList.add("inactive");
        } else {
            let grabThisOne = document.getElementById("statsButtonMobile")
            if (grabThisOne) {
                grabThisOne.classList.remove("active");
                grabThisOne.classList.add("inactive");
            }
            console.log('ℹ️ No previous mobile button to deactivate');
        }

        console.log('✨ Activating gallery button');

        btn.classList.remove("inactive");
        btn.classList.add("active");

        console.log('🖼️ Calling openGallery()');
        openGallery();

        console.log('✅ EXITING MOBILE GALLERY HANDLER');
        return;
    }

    /* ===================== BUTTON STATE (DESKTOP / SHARED) ===================== */

    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    clickedButton = btn;
    clickedId = derivedId;

    console.log('🎯 clickedId:', clickedId);
    console.log('↩️ previousClickedId:', previousClickedId);

    if (previousClickedId === clickedId) {
        console.log('⏭️ Same button clicked — aborting');
        return;
    }

    if (previousButton) {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    } else {
        console.log('📊 No previous button — defaulting to stats');
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

    const SCROLL = {
        holderId: isMobile ? 'scrollHolderMobile' : 'scrollHolder',
        trackClass: isMobile ? '.scroll-trackMobile' : '.scroll-track',
        thumbClass: isMobile ? '.scroll-thumbMobile' : '.scroll-thumb',
        scrollFindId: clickedId + (isMobile ? 'ScrollFindMobile' : 'ScrollFind')
    };

    const scrollHolder = document.getElementById(SCROLL.holderId);
    const el = document.getElementById(SCROLL.scrollFindId);

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

    if (el.scrollHeight <= el.clientHeight) {
        console.log('[FAKE SCROLLBAR] No overflow — hiding');

        scrollHolder.classList.remove('visible');
        scrollHolder.style.visibility = 'hidden';
        scrollHolder.style.opacity = '0';
        return;
    }

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

    el.addEventListener('scroll', syncThumb);
    syncThumb();

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

