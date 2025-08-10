document.addEventListener('DOMContentLoaded', (event) => {
    // Prevent multiple executions
    if (window.codeHighlightingInitialized) {
        return;
    }
    window.codeHighlightingInitialized = true;

    // Initialize highlight.js if available
    if (typeof hljs !== 'undefined') {
        // Configure highlight.js first
        hljs.configure({
            languages: ['javascript', 'java', 'python', 'html', 'css', 'xml', 'json', 'bash'],
            ignoreUnescapedHTML: true // This helps prevent the unescaped HTML warnings
        });

        // Apply additional styling to code blocks BEFORE highlighting
        document.querySelectorAll('pre code').forEach((block) => {
            // Ensure proper styling
            block.style.borderRadius = '8px';
            block.style.overflowX = 'auto';
            block.style.whiteSpace = 'pre';
            block.style.wordBreak = 'normal';

            // Add language detection if not already present
            if (!block.className.includes('language-') && !block.className.includes('hljs')) {
                block.className += ' language-java';
            }

            // Ensure content is properly escaped
            if (block.innerHTML !== block.textContent) {
                block.textContent = block.textContent; // This ensures no HTML is processed
            }
        });

        // Now highlight all code blocks
        hljs.highlightAll();
    }
});

