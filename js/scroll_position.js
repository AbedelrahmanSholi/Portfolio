// Scroll position retention for index.html
(function() {
    'use strict';
    
    const STORAGE_KEY = 'portfolioScrollPosition';
    
    // Save scroll position before page unload
    function saveScrollPosition() {
        const scrollPosition = {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop,
            timestamp: Date.now()
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(scrollPosition));

    }
    
    // Restore scroll position after page load
    function restoreScrollPosition() {
        const savedPosition = sessionStorage.getItem(STORAGE_KEY);
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                // Check if the saved position is recent (within 1 hour)
                if (Date.now() - position.timestamp < 3600000) {

                    // Use requestAnimationFrame for smoother scrolling
                    requestAnimationFrame(() => {
                        window.scrollTo({
                            left: position.x,
                            top: position.y,
                            behavior: 'instant'
                        });
                    });
                } else {
                    // Clear old position data
                    sessionStorage.removeItem(STORAGE_KEY);
                }
            } catch (e) {

                sessionStorage.removeItem(STORAGE_KEY);
            }
        }
    }
    
    // Save scroll position when user is about to leave the page
    window.addEventListener('beforeunload', saveScrollPosition);
    
    // Save scroll position when user clicks on course links
    document.addEventListener('click', function(e) {
        const target = e.target;
        // Check if the clicked element is a course explore button or any link that opens in new tab
        if (target.classList.contains('explore-btn') || 
            target.closest('.explore-btn') ||
            (target.tagName === 'A' && target.target === '_blank') ||
            target.getAttribute('data-course')) {

            saveScrollPosition();
        }
    });
    
    // Save scroll position periodically while user is on the page
    let scrollSaveTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollSaveTimer);
        scrollSaveTimer = setTimeout(saveScrollPosition, 500);
    });
    
    // Restore scroll position when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(restoreScrollPosition, 100);
        });
    } else {
        setTimeout(restoreScrollPosition, 100);
    }
    
    // Also restore on window load as a fallback
    window.addEventListener('load', function() {
        setTimeout(restoreScrollPosition, 200);
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('pageshow', function(event) {

        if (event.persisted) {
            setTimeout(restoreScrollPosition, 100);
        }
    });
    
    // Handle visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            saveScrollPosition();
        } else {
            // User returned to the tab, restore position after a short delay
            setTimeout(restoreScrollPosition, 300);
        }
    });
    
    // Handle focus events (when user returns to the tab)
    window.addEventListener('focus', function() {
        setTimeout(restoreScrollPosition, 200);
    });
    
})();

