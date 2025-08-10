document.addEventListener('DOMContentLoaded', function() {
    // Course Navigation JavaScript
    console.log('Course navigation script loaded');
    
    // Initialize navigation functionality
    initializeNavigation();
    
    function initializeNavigation() {
        // Handle navigation button clicks
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add any navigation-specific logic here
                console.log('Navigation button clicked:', this.textContent);
            });
        });
        
        // Handle module progress tracking
        updateModuleProgress();
        
        // Handle breadcrumb navigation
        initializeBreadcrumbs();
    }
    
    function updateModuleProgress() {
        // Get current module from URL or page context
        const currentPath = window.location.pathname;
        const moduleMatch = currentPath.match(/Module_(\d+)/);
        
        if (moduleMatch) {
            const currentModule = parseInt(moduleMatch[1]);
            const progressElement = document.querySelector('.nav-progress');
            
            if (progressElement) {
                // Update progress display
                progressElement.textContent = `Module ${currentModule} of 8`;
            }
            
            // Mark current module as active in navigation
            markActiveModule(currentModule);
        }
    }
    
    function markActiveModule(moduleNumber) {
        // Remove active class from all navigation items
        const navItems = document.querySelectorAll('.module-nav a');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current module
        const currentModuleLink = document.querySelector(`a[href*="Module_${moduleNumber}"]`);
        if (currentModuleLink) {
            currentModuleLink.classList.add('active');
        }
    }
    
    function initializeBreadcrumbs() {
        const breadcrumbLinks = document.querySelectorAll('.course-breadcrumb a');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Breadcrumb clicked:', this.textContent);
            });
        });
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowLeft':
                    // Navigate to previous module
                    const prevButton = document.querySelector('.nav-btn.prev');
                    if (prevButton) {
                        e.preventDefault();
                        prevButton.click();
                    }
                    break;
                case 'ArrowRight':
                    // Navigate to next module
                    const nextButton = document.querySelector('.nav-btn.next');
                    if (nextButton) {
                        e.preventDefault();
                        nextButton.click();
                    }
                    break;
            }
        }
    });
});

