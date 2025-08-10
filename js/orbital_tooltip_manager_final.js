/* Final Orbital Tooltip Manager: Fixes stuck tooltips, specific item issues, and orbit pausing */

(function() {
  'use strict';
  
  let tooltip = null;
  let currentHoveredItem = null;
  let isTooltipVisible = false;
  
  function initializeTooltips() {
    console.log('Initializing orbital tooltips (final version)...');
    
    // Create or get the tooltip element
    tooltip = document.querySelector('.global-orbit-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'global-orbit-tooltip';
      document.body.appendChild(tooltip);
    }

    const rings = Array.from(document.querySelectorAll('.orbital-system .orbit-ring'));
    const items = Array.from(document.querySelectorAll('.orbital-system .orbit-item, .orbital-system .orbit-center'));

    console.log('Found', items.length, 'orbit items and', rings.length, 'rings');

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

    function showTooltip(target) {
      const text = target.getAttribute('data-tooltip');
      if (!text) return;

      console.log('Showing tooltip for:', text);
      
      // Set current hovered item
      currentHoveredItem = target;
      
      // Clear any existing tooltip state
      hideTooltip();
      
      // Set tooltip content
      tooltip.textContent = text;
      tooltip.classList.remove('below');
      
      // Get target position
      const rect = target.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      // Position tooltip offscreen first to measure
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '1';
      tooltip.style.left = '-9999px';
      tooltip.style.top = '-9999px';
      
      // Force reflow and measure
      tooltip.offsetHeight;
      const tipWidth = tooltip.offsetWidth || 220;
      const tipHeight = tooltip.offsetHeight || 48;

      // Calculate position
      let left = rect.left + rect.width / 2 + scrollX;
      let top = rect.top + scrollY - tipHeight - 14; // above by default

      // Clamp horizontally
      const minX = 10;
      const maxX = window.innerWidth - 10;
      if (left - tipWidth / 2 < minX) left = minX + tipWidth / 2;
      if (left + tipWidth / 2 > maxX) left = maxX - tipWidth / 2;

      // If not enough room above, show below
      if (top < scrollY + 10) {
        top = rect.bottom + scrollY + 14;
        tooltip.classList.add('below');
      }

      // Position and show tooltip
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '0';
      
      // Animate in
      requestAnimationFrame(() => {
        tooltip.classList.add('visible');
        isTooltipVisible = true;
      });
    }

    function hideTooltip() {
      if (!isTooltipVisible) return;
      
      console.log('Hiding tooltip');
      
      // Clear current hovered item
      currentHoveredItem = null;
      
      // Hide tooltip
      tooltip.classList.remove('visible');
      tooltip.style.opacity = '';
      tooltip.style.visibility = '';
      isTooltipVisible = false;
    }

    // Clean up any existing listeners
    items.forEach((el) => {
      if (el._tooltipListeners) {
        el.removeEventListener('mouseenter', el._tooltipListeners.enter);
        el.removeEventListener('mouseleave', el._tooltipListeners.leave);
        el.removeEventListener('mousemove', el._tooltipListeners.move);
        delete el._tooltipListeners;
      }
    });

    // Add new event listeners
    items.forEach((el) => {
      const listeners = {
        enter: () => showTooltip(el),
        leave: () => {
          // Only hide if we're leaving the current hovered item
          if (currentHoveredItem === el) {
            hideTooltip();
          }
        },
        move: () => {
          // Only update if this is the current hovered item
          if (currentHoveredItem === el) {
            showTooltip(el);
          }
        }
      };
      
      el.addEventListener('mouseenter', listeners.enter);
      el.addEventListener('mouseleave', listeners.leave);
      el.addEventListener('mousemove', listeners.move);
      
      // Store listeners for cleanup
      el._tooltipListeners = listeners;
      
      console.log('Added listeners to item:', el.getAttribute('data-tooltip'));
    });

    // Add global scroll listener to hide tooltips when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (isTooltipVisible) {
        hideTooltip();
      }
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to hide tooltip after scrolling stops
      scrollTimeout = setTimeout(() => {
        if (isTooltipVisible) {
          hideTooltip();
        }
      }, 100);
    });

    // Add global click listener to hide tooltips when clicking outside
    document.addEventListener('click', (e) => {
      if (isTooltipVisible && !e.target.closest('.orbital-system')) {
        hideTooltip();
      }
    });

    console.log('Tooltip initialization complete (final version)');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTooltips);
  } else {
    initializeTooltips();
  }

  // Also initialize on window load as fallback
  window.addEventListener('load', initializeTooltips);

  // Fallback timeout initialization
  setTimeout(initializeTooltips, 1000);

})();

