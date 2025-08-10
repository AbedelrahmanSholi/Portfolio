// Diagram loader for Mermaid markdown files
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mermaid first
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: { 
                primaryColor: "#4fd1c7", 
                primaryTextColor: "#fff", 
                primaryBorderColor: "#4fd1c7", 
                lineColor: "#f8f9fa", 
                secondaryColor: "#6c757d", 
                tertiaryColor: "#2c3e50" 
            } 
        });
    }
    
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
        container.style.cssText = 'margin: 20px 0; padding: 20px; background: rgba(26, 32, 44, 0.8); border-radius: 8px; text-align: center;';
        
        // Create the mermaid div
        const mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.id = diagramId;
        mermaidDiv.style.cssText = 'background: transparent; color: white;';
        
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
                    mermaidDiv.textContent = mermaidCode;
                    
                    // Render the diagram if mermaid is loaded
                    if (typeof mermaid !== 'undefined') {
                        try {
                            // Use mermaid.render for newer versions
                            mermaid.render(diagramId + '-svg', mermaidCode).then(function(result) {
                                mermaidDiv.innerHTML = result.svg;
                            }).catch(function(error) {
                                console.error('Mermaid rendering error:', error);
                                // Fallback to init method
                                mermaidDiv.innerHTML = mermaidCode;
                                mermaid.init(undefined, mermaidDiv);
                            });
                        } catch (error) {
                            console.error('Mermaid rendering error:', error);
                            // Fallback to init method
                            mermaidDiv.innerHTML = mermaidCode;
                            try {
                                mermaid.init(undefined, mermaidDiv);
                            } catch (initError) {
                                console.error('Mermaid init error:', initError);
                                mermaidDiv.innerHTML = '<p style="color: #ff6b6b;">Error rendering diagram</p>';
                            }
                        }
                    } else {
                        console.warn('Mermaid library not loaded');
                        mermaidDiv.innerHTML = '<p style="color: #ffa500;">Mermaid library not loaded</p>';
                    }
                } else {
                    mermaidDiv.innerHTML = '<p style="color: #ff6b6b;">No valid mermaid diagram found in the source file.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading diagram:', error);
                mermaidDiv.innerHTML = '<p style="color: #ff6b6b;">Error loading diagram: ' + error.message + '</p>';
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
