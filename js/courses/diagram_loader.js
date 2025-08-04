// Diagram loader for Mermaid markdown files
document.addEventListener('DOMContentLoaded', function() {
    // Find all img tags that reference .md files
    const diagramImages = document.querySelectorAll('img[src$=".md"]');
    
    // Replace each image with a div for mermaid rendering
    diagramImages.forEach((img, index) => {
        // Create a unique ID for the mermaid diagram
        const diagramId = 'mermaid-diagram-' + index;
        
        // Create a container div to replace the img
        const container = document.createElement('div');
        container.className = 'mermaid-container';
        container.id = diagramId + '-container';
        
        // Create the mermaid div
        const mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.id = diagramId;
        
        // Add loading indicator
        mermaidDiv.innerHTML = 'Loading diagram...';
        
        // Add the mermaid div to the container
        container.appendChild(mermaidDiv);
        
        // Replace the img with the container
        img.parentNode.replaceChild(container, img);
        
        // Get the source file path
        const mdFilePath = img.getAttribute('src');
        
        // Fetch the markdown file content
        fetch(mdFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load diagram: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(content => {
                // Extract the mermaid code from the markdown
                const mermaidCode = extractMermaidCode(content);
                
                if (mermaidCode) {
                    // Set the mermaid code to the div
                    mermaidDiv.innerHTML = mermaidCode;
                    
                    // Render the diagram if mermaid is loaded
                    if (typeof mermaid !== 'undefined') {
                        try {
                            mermaid.init(undefined, mermaidDiv);
                        } catch (error) {
                            console.error('Error rendering mermaid diagram:', error);
                            mermaidDiv.innerHTML = 'Error rendering diagram: ' + error.message;
                        }
                    }
                } else {
                    mermaidDiv.innerHTML = 'No valid mermaid diagram found in the source file.';
                }
            })
            .catch(error => {
                console.error('Error loading diagram:', error);
                mermaidDiv.innerHTML = 'Error loading diagram: ' + error.message;
            });
    });
    
    // Function to extract mermaid code from markdown content
    function extractMermaidCode(content) {
        // Look for content between ```mermaid and ``` tags
        const mermaidRegex = /```mermaid\s*([\s\S]*?)\s*```/;
        const match = content.match(mermaidRegex);
        
        if (match && match[1]) {
            return match[1].trim();
        }
        
        return null;
    }
});
