// Automation Architecture Course - Code Block and Content Fixes
(function() {
    'use strict';

    // Flag to ensure the script runs only once per page load
    if (window.automationArchitectureFixesApplied) {
        return;
    }
    window.automationArchitectureFixesApplied = true;

    // Function to fix code blocks in automation architecture modules
    function fixCodeBlocks() {
        // Only apply fixes to automation architecture course pages
        if (!window.location.pathname.includes('automation-architecture')) {
            return;
        }

        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Remove any inline styles that cause conflicts
            block.removeAttribute('style');

            // Ensure proper class structure for highlight.js
            if (!block.className.includes('hljs')) {
                block.className = 'hljs language-java'; // Default to Java if no language specified
            }

            // Get the raw text content, not innerHTML, to avoid unescaped HTML issues
            let content = block.textContent;

            // Re-set textContent to ensure no HTML is processed
            block.textContent = content;

            // Re-apply syntax highlighting
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(block);
            }
        });
    }

    // Function to fix Mermaid diagrams
    function fixMermaidDiagrams() {
        // Only apply fixes to automation architecture course pages
        if (!window.location.pathname.includes('automation-architecture')) {
            return;
        }

        const mermaidElements = document.querySelectorAll('.mermaid');
        mermaidElements.forEach(element => {
            // Clean up the content to ensure only diagram syntax is present
            let content = element.textContent.trim();

            // Remove any non-diagram content that might have been mixed in
            const lines = content.split('\n');
            const diagramLines = [];
            let inDiagram = false;

            for (let line of lines) {
                const trimmedLine = line.trim();

                // Start of diagram
                if (trimmedLine.match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|gitgraph)/)) {
                    inDiagram = true;
                    diagramLines.push(trimmedLine);
                }
                // Diagram content
                else if (inDiagram && (trimmedLine.match(/^[A-Z0-9_]+(\[.*\]|\(.*\)|\{.*\}|-->|->|\|.*\||:)/i) || trimmedLine === '')) {
                    diagramLines.push(trimmedLine);
                }
                // End of diagram (empty line or non-diagram content)
                else if (inDiagram && !trimmedLine.match(/^[A-Z0-9_]+/i)) {
                    break;
                }
            }

            // Set the cleaned diagram content
            if (diagramLines.length > 0) {
                element.textContent = diagramLines.join('\n');
                element.setAttribute('data-content-fixed', 'true');
            }
        });
    }

    // Function to separate content that got mixed into code blocks
    function separateContentFromCodeBlocks() {
        // Only apply fixes to automation architecture course pages
        if (!window.location.pathname.includes('automation-architecture')) {
            return;
        }

        // Find code examples that might have content mixed in
        const codeExamples = document.querySelectorAll('.code-example');
        codeExamples.forEach(example => {
            const codeBlock = example.querySelector('pre code');
            if (!codeBlock) return;

            let content = codeBlock.textContent;

            // Check if there's non-code content mixed in
            const lines = content.split('\n');
            const codeLines = [];
            const textContent = [];
            let inCodeBlock = false;

            for (let line of lines) {
                const trimmedLine = line.trim();

                // Detect code patterns
                if (trimmedLine.match(/^(\/\/|public|private|class|interface|@|import|package|\{|\}|if|for|while|try|catch)/)) {
                    inCodeBlock = true;
                    codeLines.push(line);
                }
                // Continue code block
                else if (inCodeBlock && (trimmedLine.match(/^[a-zA-Z0-9_\s\.\(\)\[\]\{\}\;]+$/) || trimmedLine === '')) {
                    codeLines.push(line);
                }
                // Non-code content
                else if (!inCodeBlock && trimmedLine.length > 0 && !trimmedLine.match(/^[{}();]$/)) {
                    textContent.push(trimmedLine);
                }
                // End of code block
                else if (inCodeBlock && trimmedLine.match(/^[A-Z][a-z]/)) {
                    inCodeBlock = false;
                    textContent.push(trimmedLine);
                }
            }

            // If we found separated content, update the structure
            if (textContent.length > 0 && codeLines.length > 0) {
                codeBlock.textContent = codeLines.join('\n');

                // Add the text content after the code block
                const textDiv = document.createElement('div');
                textDiv.className = 'separated-content';
                textDiv.innerHTML = textContent.map(text => `<p>${text}</p>`).join('');
                example.appendChild(textDiv);
            }
        });
    }

    // Function to fix syntax errors in text content
    function fixSyntaxErrors() {
        // Only apply fixes to automation architecture course pages
        if (!window.location.pathname.includes('automation-architecture')) {
            return;
        }

        // Find and fix common syntax issues in text content
        const textElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            let content = element.innerHTML;

            // Fix common HTML entity issues
            content = content.replace(/&lt;/g, '&amp;lt;');
            content = content.replace(/&gt;/g, '&amp;gt;');

            // Fix unclosed tags
            content = content.replace(/<([^>]+)(?<!\/|>)$/g, '&lt;$1');

            element.innerHTML = content;
        });
    }

    // Initialize fixes when DOM is ready
    function initializeFixes() {
        // Apply all fixes
        fixCodeBlocks();
        fixMermaidDiagrams();
        separateContentFromCodeBlocks();
        fixSyntaxErrors();

        // Re-initialize highlight.js if available
        if (typeof hljs !== 'undefined') {
            setTimeout(() => {
                hljs.highlightAll();
            }, 100);
        }

        // Re-process Mermaid diagrams if available
        if (typeof window.processMermaidDiagrams === 'function') {
            setTimeout(() => {
                window.processMermaidDiagrams();
            }, 200);
        }

        console.log('Automation architecture fixes applied');
    }

    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFixes);
    } else {
        initializeFixes();
    }

    // Also apply fixes when content is dynamically loaded
    const observer = new MutationObserver((mutations) => {
        let shouldApplyFixes = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldApplyFixes = true;
            }
        });

        if (shouldApplyFixes) {
            setTimeout(initializeFixes, 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();


