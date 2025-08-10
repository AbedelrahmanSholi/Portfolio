// Orbital System Fixes JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Fix 1: Pause all orbit ring animations when hovering any orbit item
    const orbitItems = document.querySelectorAll('.orbit-item');
    const orbitRings = document.querySelectorAll('.orbit-ring');
    
    orbitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Pause all orbit ring animations
            orbitRings.forEach(ring => {
                ring.style.animationPlayState = 'paused';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Resume all orbit ring animations
            orbitRings.forEach(ring => {
                ring.style.animationPlayState = 'running';
            });
        });
    });
    
    // Fix 2: Ensure all orbit items have tooltips
    const orbitItemsData = [
        {
            selector: '.orbit-ring:nth-child(2) .orbit-item:nth-child(1)',
            tooltip: 'Telecommunications - Network testing, protocol validation, and telecom system integration'
        },
        {
            selector: '.orbit-ring:nth-child(2) .orbit-item:nth-child(2)',
            tooltip: 'Electronics - Hardware-software integration, embedded systems, and IoT device testing'
        },
        {
            selector: '.orbit-ring:nth-child(3) .orbit-item:nth-child(1)',
            tooltip: 'Healthcare - Medical software validation, HIPAA compliance, and patient data security'
        },
        {
            selector: '.orbit-ring:nth-child(3) .orbit-item:nth-child(2)',
            tooltip: 'Aviation - Flight systems testing, safety-critical applications, and regulatory compliance'
        },
        {
            selector: '.orbit-ring:nth-child(4) .orbit-item:nth-child(1)',
            tooltip: 'Systems Integration - Enterprise systems, microservices architecture, and API orchestration'
        },
        {
            selector: '.orbit-ring:nth-child(4) .orbit-item:nth-child(2)',
            tooltip: 'Security Testing - Vulnerability assessment, penetration testing, and security automation'
        }
    ];
    
    // Apply tooltips to all orbit items
    orbitItemsData.forEach(itemData => {
        const element = document.querySelector(itemData.selector);
        if (element) {
            element.setAttribute('data-tooltip', itemData.tooltip);
            element.classList.add('tooltip');
        }
    });
    
    // Fix 3: Enhanced hover effects with proper z-index management
    orbitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Bring hovered item to front
            this.style.zIndex = '200';
            
            // Dim other items slightly
            orbitItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset z-index
            this.style.zIndex = '10';
            
            // Restore opacity for all items
            orbitItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
    
    // Fix 4: Improved tooltip positioning for edge cases
    function adjustTooltipPosition() {
        const tooltips = document.querySelectorAll('.orbit-item[data-tooltip]');
        
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', function() {
                setTimeout(() => {
                    const tooltipElement = this.querySelector(':before');
                    if (tooltipElement) {
                        const rect = this.getBoundingClientRect();
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;
                        
                        // Adjust if tooltip would go off-screen
                        if (rect.left < 150) {
                            this.style.setProperty('--tooltip-offset', '20px');
                        } else if (rect.right > viewportWidth - 150) {
                            this.style.setProperty('--tooltip-offset', '-20px');
                        } else {
                            this.style.setProperty('--tooltip-offset', '0px');
                        }
                    }
                }, 50);
            });
        });
    }
    
    // Initialize tooltip positioning
    adjustTooltipPosition();
    
    // Re-adjust on window resize
    window.addEventListener('resize', adjustTooltipPosition);
    
    // Fix 5: Ensure center orbit item also has proper interaction
    const orbitCenter = document.querySelector('.orbit-center');
    if (orbitCenter && !orbitCenter.hasAttribute('data-tooltip')) {
        orbitCenter.setAttribute('data-tooltip', 'QA Leadership - Driving quality excellence across all industry verticals');
        orbitCenter.classList.add('tooltip');
    }
    
    console.log('Orbital system fixes applied successfully');
});

