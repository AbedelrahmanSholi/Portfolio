// Course content loader
document.addEventListener('DOMContentLoaded', function() {
    // Load Java course content
    loadJavaCourseContent();
    
    // Load WebDriverIO course content
    loadWebDriverIOCourseContent();
    
    // Load Roadmap content
    loadRoadmapContent();
    
    // Setup syntax highlighting
    setupSyntaxHighlighting();
});

// Function to load Java course content
function loadJavaCourseContent() {
    // Map of content IDs to file paths
    const javaContentMap = {
        'java-intro-content': 'courses/java/intro.html',
        'java-lambda-content': 'courses/java/lambda.html',
        'java-streams-content': 'courses/java/streams.html',
        'java-optional-content': 'courses/java/optional.html',
        'java-completable-content': 'courses/java/completable.html',
        'java-reflection-content': 'courses/java/reflection.html',
        'java-exercises-content': 'courses/java/exercises.html'
    };
    
    // Load each content
    for (const [contentId, filePath] of Object.entries(javaContentMap)) {
        loadContent(contentId, filePath);
    }
}

// Function to load WebDriverIO course content
function loadWebDriverIOCourseContent() {
    // Map of content IDs to file paths
    const wdioContentMap = {
        'wdio-fundamentals-content': 'courses/webdriverio/fundamentals.html',
        'wdio-selectors-content': 'courses/webdriverio/selectors.html',
        'wdio-async-content': 'courses/webdriverio/async.html',
        'wdio-api-content': 'courses/webdriverio/api.html',
        'wdio-custom-content': 'courses/webdriverio/custom.html',
        'wdio-pom-content': 'courses/webdriverio/pom.html',
        'wdio-cucumber-content': 'courses/webdriverio/cucumber.html',
        'wdio-testng-content': 'courses/webdriverio/testng.html',
        'wdio-patterns-content': 'courses/webdriverio/patterns.html',
        'wdio-debug-content': 'courses/webdriverio/debug.html',
        'wdio-project-content': 'courses/webdriverio/project.html'
    };
    
    // Load each content
    for (const [contentId, filePath] of Object.entries(wdioContentMap)) {
        loadContent(contentId, filePath);
    }
}

// Function to load Roadmap content
function loadRoadmapContent() {
    // Map of content IDs to file paths
    const roadmapContentMap = {
        'roadmap-enhanced-content': 'courses/roadmap/enhanced.html',
        'roadmap-mastering-content': 'courses/roadmap/mastering.html',
        'roadmap-career-content': 'courses/roadmap/career.html',
        'roadmap-resources-content': 'courses/roadmap/resources.html'
    };
    
    // Load each content
    for (const [contentId, filePath] of Object.entries(roadmapContentMap)) {
        loadContent(contentId, filePath);
    }
}

// Generic function to load content
function loadContent(contentId, filePath) {
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Fix relative paths in the loaded content
                html = html.replace(/src="\.\.\/resources\/diagrams\//g, 'src="resources\/diagrams\/');
                
                // Add sandbox attribute to iframes for security
                html = html.replace(/<iframe/g, '<iframe sandbox="allow-scripts allow-same-origin"');
                
                contentElement.innerHTML = html;
                
                // Process any mermaid diagrams in the loaded content
                if (typeof window.processMermaidDiagrams === 'function') {
                    window.processMermaidDiagrams();
                }
                
                // Apply syntax highlighting
                if (typeof hljs !== 'undefined') {
                    contentElement.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightBlock(block);
                    });
                }
            })
            .catch(error => {
                console.error(`Error loading content for ${contentId}:`, error);
                contentElement.innerHTML = `<p>Error loading content. Please try again later.</p>`;
            });
    }
}

// Setup syntax highlighting
function setupSyntaxHighlighting() {
    // Add highlight.js if not already included
    if (typeof hljs === 'undefined') {
        // Add CSS for highlight.js
        const highlightCSS = document.createElement('link');
        highlightCSS.rel = 'stylesheet';
        highlightCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/atom-one-dark.min.css';
        document.head.appendChild(highlightCSS);
        
        // Add highlight.js script
        const highlightScript = document.createElement('script');
        highlightScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js';
        highlightScript.onload = function() {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        };
        document.body.appendChild(highlightScript);
    }
}
