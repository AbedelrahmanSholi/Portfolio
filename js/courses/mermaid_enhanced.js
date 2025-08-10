// Enhanced Mermaid Loader with proper error handling and styling
(function() {
    'use strict';
    
    let mermaidLoaded = false;
    let mermaidQueue = [];
    
    // Enhanced Mermaid configuration
    const mermaidConfig = {
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Poppins, sans-serif',
        themeVariables: {
            primaryColor: '#3498db',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#3498db',
            lineColor: '#f8f9fa',
            secondaryColor: '#6c757d',
            tertiaryColor: '#2c3e50',
            background: '#1e1e2e',
            mainBkg: '#2c3e50',
            nodeBorder: '#3498db',
            clusterBkg: 'rgba(52, 152, 219, 0.2)',
            clusterBorder: '#3498db',
            titleColor: '#3498db',
            edgeLabelBackground: '#1e1e2e',
            actorBorder: '#3498db',
            actorBkg: '#2c3e50',
            actorTextColor: '#ffffff',
            actorLineColor: '#3498db',
            signalColor: '#ffffff',
            signalTextColor: '#ffffff',
            labelBoxBkgColor: '#2c3e50',
            labelBoxBorderColor: '#3498db',
            labelTextColor: '#ffffff',
            loopTextColor: '#ffffff',
            noteBorderColor: '#f39c12',
            noteBkgColor: 'rgba(243, 156, 18, 0.1)',
            noteTextColor: '#ffffff',
            activationBorderColor: '#e74c3c',
            activationBkgColor: 'rgba(231, 76, 60, 0.1)',
            sequenceNumberColor: '#ffffff',
            sectionBkgColor: 'rgba(155, 89, 182, 0.1)',
            altSectionBkgColor: 'rgba(52, 152, 219, 0.1)',
            gridColor: 'rgba(255, 255, 255, 0.1)',
            cScale0: '#3498db',
            cScale1: '#e74c3c',
            cScale2: '#f39c12',
            cScale3: '#2ecc71',
            cScale4: '#9b59b6',
            cScale5: '#1abc9c',
            cScale6: '#34495e',
            cScale7: '#95a5a6',
            cScale8: '#e67e22',
            cScale9: '#16a085'
        },
        flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 20
        },
        sequence: {
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            showSequenceNumbers: false
        },
        gantt: {
            titleTopMargin: 25,
            barHeight: 20,
            fontSizeFactor: 1,
            fontFamily: 'Poppins, sans-serif',
            gridLineStartPadding: 35,
            fontSize: 11,
            sectionFontSize: 11,
            numberSectionStyles: 4
        }
    };
    
    // Function to load Mermaid library
    function loadMermaid() {
        return new Promise((resolve, reject) => {
            if (typeof mermaid !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
            script.onload = () => {
                if (typeof mermaid !== 'undefined') {
                    mermaid.initialize(mermaidConfig);
                    mermaidLoaded = true;
                    resolve();
                } else {
                    reject(new Error('Mermaid failed to load'));
                }
            };
            script.onerror = () => reject(new Error('Failed to load Mermaid script'));
            document.head.appendChild(script);
        });
    }
    
    // Function to process Mermaid diagrams
    function processMermaidDiagrams() {
        const mermaidElements = document.querySelectorAll('.mermaid');
        
        if (mermaidElements.length === 0) {
            return;
        }
        
        if (!mermaidLoaded) {
            // Queue the processing for when Mermaid is loaded
            mermaidQueue.push(() => processMermaidDiagrams());
            return;
        }
        
        mermaidElements.forEach((element, index) => {
            if (element.getAttribute('data-processed') === 'true') {
                return; // Skip already processed elements
            }
            
            const diagramText = element.textContent.trim();
            if (!diagramText) {
                element.innerHTML = '<div class="mermaid-error">No diagram content found</div>';
                return;
            }
            
            // Create a unique ID for the diagram
            const diagramId = `mermaid-diagram-${Date.now()}-${index}`;
            element.id = diagramId;
            
            try {
                // Clear the element and render the diagram
                element.innerHTML = '';
                
                mermaid.render(diagramId + '-svg', diagramText)
                    .then(({ svg, bindFunctions }) => {
                        element.innerHTML = svg;
                        if (bindFunctions) {
                            bindFunctions(element);
                        }
                        element.setAttribute('data-processed', 'true');
                        
                        // Apply custom styling
                        const svgElement = element.querySelector('svg');
                        if (svgElement) {
                            svgElement.style.maxWidth = '100%';
                            svgElement.style.height = 'auto';
                            svgElement.style.background = 'rgba(0, 0, 0, 0.3)';
                            svgElement.style.borderRadius = '15px';
                            svgElement.style.padding = '20px';
                        }
                    })
                    .catch(error => {
                        console.error('Mermaid rendering error:', error);
                        element.innerHTML = `
                            <div class="mermaid-error">
                                <h4>Diagram Rendering Error</h4>
                                <p>Failed to render the diagram. Please check the syntax.</p>
                                <details>
                                    <summary>Show diagram source</summary>
                                    <pre><code>${diagramText}</code></pre>
                                </details>
                            </div>
                        `;
                        element.setAttribute('data-processed', 'true');
                    });
            } catch (error) {
                console.error('Mermaid processing error:', error);
                element.innerHTML = `
                    <div class="mermaid-error">
                        <h4>Diagram Processing Error</h4>
                        <p>An error occurred while processing the diagram.</p>
                    </div>
                `;
                element.setAttribute('data-processed', 'true');
            }
        });
    }
    
    // Function to handle dynamic content loading
    function observeMermaidElements() {
        const observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.classList && node.classList.contains('mermaid')) {
                                shouldProcess = true;
                            } else if (node.querySelectorAll && node.querySelectorAll('.mermaid').length > 0) {
                                shouldProcess = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldProcess) {
                setTimeout(processMermaidDiagrams, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize when DOM is ready
    function initialize() {
        loadMermaid()
            .then(() => {
                // Process any existing diagrams
                processMermaidDiagrams();
                
                // Process queued operations
                while (mermaidQueue.length > 0) {
                    const queuedFunction = mermaidQueue.shift();
                    queuedFunction();
                }
                
                // Set up observer for dynamic content
                observeMermaidElements();
                
                console.log('Mermaid enhanced loader initialized successfully');
            })
            .catch(error => {
                console.error('Failed to initialize Mermaid:', error);
                
                // Show error message in mermaid elements
                const mermaidElements = document.querySelectorAll('.mermaid');
                mermaidElements.forEach(element => {
                    if (element.getAttribute('data-processed') !== 'true') {
                        element.innerHTML = `
                            <div class="mermaid-error">
                                <h4>Mermaid Library Not Available</h4>
                                <p>The diagram library failed to load. Please check your internet connection.</p>
                            </div>
                        `;
                        element.setAttribute('data-processed', 'true');
                    }
                });
            });
    }
    
    // Add CSS for error styling
    function addErrorStyles() {
        if (document.getElementById('mermaid-error-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'mermaid-error-styles';
        style.textContent = `
            .mermaid-error {
                background: rgba(244, 67, 54, 0.1);
                border: 1px solid rgba(244, 67, 54, 0.3);
                border-radius: 15px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
                color: #f44336;
            }
            
            .mermaid-error h4 {
                margin: 0 0 10px 0;
                color: #f44336;
            }
            
            .mermaid-error p {
                margin: 0 0 10px 0;
                color: #ffcdd2;
            }
            
            .mermaid-error details {
                margin-top: 15px;
                text-align: left;
            }
            
            .mermaid-error summary {
                cursor: pointer;
                color: #f44336;
                font-weight: bold;
            }
            
            .mermaid-error pre {
                background: rgba(0, 0, 0, 0.3);
                padding: 10px;
                border-radius: 5px;
                overflow-x: auto;
                margin-top: 10px;
            }
            
            .mermaid-error code {
                color: #ffcdd2;
                font-family: 'Roboto Mono', monospace;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Expose global functions
    window.processMermaidDiagrams = processMermaidDiagrams;
    window.mermaidEnhanced = {
        process: processMermaidDiagrams,
        reload: initialize
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addErrorStyles();
            initialize();
        });
    } else {
        addErrorStyles();
        initialize();
    }
})();

