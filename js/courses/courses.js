// Courses section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mermaid for diagram rendering
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
                primaryColor: '#3498db',
                primaryTextColor: '#fff',
                primaryBorderColor: '#1f77b4',
                lineColor: '#f8f9fa',
                secondaryColor: '#6c757d',
                tertiaryColor: '#2c3e50'
            }
        });
    }

    // Handle course card click to open modal
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        exploreBtn.addEventListener('click', function(e) {
            const courseId = this.getAttribute("data-course");
            openCourseContentInNewTab(courseId);
        });
    });



    // Module toggle click is now handled in init_modals.js to avoid conflicts
});

function openCourseContentInNewTab(courseId) {
    let url = '';
    switch (courseId) {
        case 'java':
            url = 'courses/java/overview.html'; // Java course overview page
            break;
        case 'webdriverio':
            url = 'courses/webdriverio/Module_1__WebDriverIO_Fundamentals.html'; // WebDriverIO course main page
            break;
        case 'automation-architecture':
            url = 'courses/automation-architecture/overview.html'; // Automation Architecture course overview
            break;
        case 'roadmap':
            url = 'courses/roadmap/enhanced.html'; // Or a main Roadmap page
            break;
        default:
            console.error('Unknown courseId:', courseId);
            return;
    }
    window.open(url, '_blank');
}



// Function to load course content dynamically
function loadCourseContent(courseId, moduleId) {
    const moduleContent = document.querySelector(`#module-${courseId}-${moduleId} .module-content`);
    
    if (moduleContent && !moduleContent.getAttribute('data-loaded')) {
        // Set loading state
        moduleContent.innerHTML = '<p>Loading content...</p>';
        
        // Fetch the module content
        fetch(`courses/${courseId}/${moduleId}.html`)
            .then(response => response.text())
            .then(html => {
                moduleContent.innerHTML = html;
                moduleContent.setAttribute('data-loaded', 'true');
                
                // Render Mermaid diagrams if present
                if (moduleContent.querySelector('.mermaid') && typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, moduleContent.querySelectorAll('.mermaid'));
                }
            })
            .catch(error => {
                moduleContent.innerHTML = '<p>Error loading content. Please try again.</p>';
                console.error('Error loading module content:', error);
            });
    }
}

// Function to convert markdown code blocks to highlighted code
function highlightCode() {
    document.querySelectorAll('pre code').forEach((block) => {
        if (typeof hljs !== 'undefined') {
            hljs.highlightBlock(block);
        }
    });
}
