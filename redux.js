
let buttonSelected="stats"

function mainFunction() {
    console.log('🚀 mainFunction() started');

    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;

    const defaultWidth = getComputedStyle(mercierContainerDiv).width;
    const defaultHeight = getComputedStyle(mercierContainerDiv).height;

    let isMobile = false;

    function isMobileView() {
        return window.innerHeight > window.innerWidth;
    }

    function switchMobileDesktop() {
        if (isMobileView()) {
            isMobile = true;
            mercierContainerDiv.style.width = '100%';
            mercierContainerDiv.style.height = '100%';
        } else {
            isMobile = false;
            mercierContainerDiv.style.width = defaultWidth;
            mercierContainerDiv.style.height = defaultHeight;
        }
    }

    switchMobileDesktop();
    window.addEventListener('resize', switchMobileDesktop);
}


function statsPush() {

    if (buttonSelected==="stats"){
        console.log("stats button was pushed but was already selected")
    }
    else {
        
    }

}

document.addEventListener('DOMContentLoaded', mainFunction);
