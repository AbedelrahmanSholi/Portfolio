// Function to initialize all course modals and their content
function initializeCourseModals() {
    // Handle course card click to open modal
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const courseId = this.getAttribute('data-course');
                openCourseModal(courseId);
            });
        }
    });

    // Close modal when clicking the close button or outside the modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('course-modal')) {
            closeCourseModal();
        }
    });

    // Handle module toggle click - FIXED: Improved event delegation
    document.addEventListener('click', function(e) {
        // Check if the click target is a module header or a child of a module header
        const moduleHeader = e.target.classList.contains('module-header') ? 
                            e.target : 
                            e.target.closest('.module-header');
                            
        if (moduleHeader) {
            const moduleItem = moduleHeader.closest('.module-item');
            if (!moduleItem) return; // Safety check
            
            const moduleContent = moduleItem.querySelector('.module-content');
            const moduleToggle = moduleItem.querySelector('.module-toggle');
            
            if (!moduleContent || !moduleToggle) return; // Safety check
            
            // Toggle module content visibility
            moduleContent.classList.toggle('active');
            
            // Update toggle icon
            if (moduleContent.classList.contains('active')) {
                moduleToggle.innerHTML = '−';
                
                // Load content if not already loaded
                const contentDiv = moduleContent.querySelector('.markdown-content');
                if (contentDiv && contentDiv.textContent.trim() === 'Loading content...') {
                    const contentId = contentDiv.id;
                    if (typeof loadModuleContentDirectly === 'function') {
                        loadModuleContentDirectly(contentId);
                    } else if (typeof loadContent === 'function') {
                        // Fallback to content_loader.js function if available
                        const courseId = moduleItem.id.split('-')[1];
                        const moduleId = moduleItem.id.split('-')[2];
                        loadContent(contentId, `/courses/${courseId}/${moduleId}.html`);
                    }
                }
                
                // Render Mermaid diagrams when module is opened
                if (moduleContent.querySelector('.mermaid')) {
                    if (typeof mermaid !== 'undefined') {
                        mermaid.init(undefined, moduleContent.querySelectorAll('.mermaid'));
                    }
                }
                
                // Apply syntax highlighting
                if (typeof hljs !== 'undefined') {
                    moduleContent.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightBlock(block);
                    });
                }
            } else {
                moduleToggle.innerHTML = '+';
            }
        }
    });
    
    // Initialize any modals that might be open by default
    document.querySelectorAll('.module-content.active').forEach(module => {
        const contentDiv = module.querySelector('.markdown-content');
        if (contentDiv && contentDiv.textContent.trim() === 'Loading content...') {
            const contentId = contentDiv.id;
            if (typeof loadModuleContentDirectly === 'function') {
                loadModuleContentDirectly(contentId);
            }
        }
    });
}
