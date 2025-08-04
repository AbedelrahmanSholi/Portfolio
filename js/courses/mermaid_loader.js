// Mermaid library inclusion
document.addEventListener('DOMContentLoaded', function() {
    // Add Mermaid.js if not already included
    if (typeof mermaid === 'undefined') {
        const mermaidScript = document.createElement("script");
        mermaidScript.src = "https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.min.js";
        mermaidScript.onload = function() {
            if (typeof mermaid !== "undefined") {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: "dark",
                    securityLevel: "loose",
                    themeVariables: {
                        primaryColor: "#3498db",
                        primaryTextColor: "#fff",
                        primaryBorderColor: "#1f77b4",
                        lineColor: "#f8f9fa",
                        secondaryColor: "#6c757d",
                        tertiaryColor: "#2c3e50",
                        background: "#1e1e2e",
                        mainBkg: "#2c3e50",
                        nodeBorder: "#3498db",
                        clusterBkg: "rgba(52, 152, 219, 0.2)",
                        clusterBorder: "#3498db",
                        titleColor: "#3498db"
                    }
                });
                if (typeof window.processMermaidDiagrams === "function") {
                    window.processMermaidDiagrams();
                }
            }
        };
        document.body.appendChild(mermaidScript);
    }
});
