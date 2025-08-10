/* Fixed Orbital Tooltip Manager: Ensures reliable tooltip functionality */

// Use both DOMContentLoaded and window.onload to ensure everything is ready
function initializeTooltips() {
  console.log('Initializing orbital tooltips...');
  
  // Create a single tooltip attached to <body>
  let tooltip = document.querySelector('.global-orbit-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'global-orbit-tooltip';
    document.body.appendChild(tooltip);
  }

  const rings = Array.from(document.querySelectorAll('.orbital-system .orbit-ring'));
  const items = Array.from(document.querySelectorAll('.orbital-system .orbit-item, .orbital-system .orbit-center'));

  console.log('Found', items.length, 'orbit items');

  // Ensure all items have tooltip text
  items.forEach((el, index) => {
    if (!el.getAttribute('data-tooltip')) {
      const label = (el.querySelector('span')?.textContent || el.title || '').trim();
      if (label.length) el.setAttribute('data-tooltip', label);
    }
    console.log(`Item ${index}:`, el.getAttribute('data-tooltip'));
  });
  
  // Default for center if missing
  const center = document.querySelector('.orbital-system .orbit-center');
  if (center && !center.getAttribute('data-tooltip')) {
    center.setAttribute('data-tooltip', 'QA Leadership - Driving quality excellence across all industry verticals');
  }

  function placeTooltip(target) {
    console.log('Placing tooltip for:', target.getAttribute('data-tooltip'));
    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    tooltip.textContent = text;
    tooltip.classList.remove('below');
    
    // Pause ring animations while reading
    rings.forEach((r) => (r.style.animationPlayState = 'paused'));

    const rect = target.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Reset tooltip styles
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '0';
    tooltip.style.left = '-9999px';
    tooltip.style.top = '-9999px';
    
    // Force a reflow
    tooltip.offsetHeight;
    
    const tipWidth = tooltip.offsetWidth || 220;
    const tipHeight = tooltip.offsetHeight || 48;

    let left = rect.left + rect.width / 2 + scrollX;
    let top = rect.top + scrollY - tipHeight - 14; // above by default

    // Clamp horizontally
    const min = 10, max = window.innerWidth - 10;
    if (left - tipWidth / 2 < min) left = min + tipWidth / 2;
    if (left + tipWidth / 2 > max) left = max - tipWidth / 2;

    // If not enough room above, show below
    if (top < scrollY + 10) {
      top = rect.bottom + scrollY + 14;
      tooltip.classList.add('below');
    }

    // Position tooltip
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    // Show tooltip with animation
    setTimeout(() => {
      tooltip.classList.add('visible');
    }, 10);
  }

  function hideTooltip() {
    console.log('Hiding tooltip');
    tooltip.classList.remove('visible');
    tooltip.style.opacity = '';
    tooltip.style.visibility = '';
    rings.forEach((r) => (r.style.animationPlayState = 'running'));
  }

  // Remove any existing listeners first
  items.forEach((el) => {
    if (el._tooltipInitialized) return; // Already initialized
    
    const mouseEnterHandler = () => placeTooltip(el);
    const mouseLeaveHandler = hideTooltip;
    const mouseMoveHandler = () => placeTooltip(el);
    
    el.addEventListener('mouseenter', mouseEnterHandler);
    el.addEventListener('mouseleave', mouseLeaveHandler);
    el.addEventListener('mousemove', mouseMoveHandler);
    
    // Mark as initialized
    el._tooltipInitialized = true;
    
    console.log('Added listeners to item:', el.getAttribute('data-tooltip'));
  });

  console.log('Tooltip initialization complete');
}

// Initialize on both events to ensure it works
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTooltips);
} else {
  initializeTooltips();
}

window.addEventListener('load', initializeTooltips);

// Also initialize after a short delay as fallback
setTimeout(initializeTooltips, 1000);

