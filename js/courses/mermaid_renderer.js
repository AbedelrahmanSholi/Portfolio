// Mermaid diagram renderer for course content

// Function to process Mermaid diagrams in content
function processMermaidDiagrams() {
    // Find all pre elements with class 'mermaid'
    const mermaidBlocks = document.querySelectorAll('pre.mermaid, div.mermaid');
    
    mermaidBlocks.forEach((block, index) => {
        // Create a unique ID for this diagram if it doesn't have one
        if (!block.id) {
            block.id = 'mermaid-diagram-' + index;
        }
        
        // Make sure the element has the mermaid class
        if (!block.classList.contains('mermaid')) {
            block.classList.add('mermaid');
        }
    });
    
    // Initialize all mermaid diagrams
    if (typeof mermaid !== 'undefined' && mermaidBlocks.length > 0) {
        try {
            mermaid.init(undefined, '.mermaid');
        } catch (error) {
            console.error('Error initializing Mermaid diagrams:', error);
        }
    }
}

// Initialize Mermaid with dark theme configuration (called once)
if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
        startOnLoad: false, // We'll manually initialize to ensure proper loading
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
            primaryColor: '#3498db',
            primaryTextColor: '#fff',
            primaryBorderColor: '#1f77b4',
            lineColor: '#f8f9fa',
            secondaryColor: '#6c757d',
            tertiaryColor: '#2c3e50',
            background: '#1e1e2e',
            mainBkg: '#2c3e50',
            nodeBorder: '#3498db',
            clusterBkg: 'rgba(52, 152, 219, 0.2)',
            clusterBorder: '#3498db',
            titleColor: '#3498db'
        }
    });
}

// Make functions available globally
window.processMermaidDiagrams = processMermaidDiagrams;

// Process any initially visible mermaid diagrams on page load
document.addEventListener('DOMContentLoaded', processMermaidDiagrams);