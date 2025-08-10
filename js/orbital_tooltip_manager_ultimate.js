/* Ultimate Orbital Tooltip Manager: Fixes overlapping element issues */

(function() {
  'use strict';
  
  let tooltip = null;
  let currentHoveredItem = null;
  let isTooltipVisible = false;
  let hoverTimeout = null;
  
  function initializeTooltips() {
    console.log('Initializing orbital tooltips (ultimate version)...');
    
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

    // Ensure all items have tooltip text and proper z-index
    items.forEach((el, index) => {
      if (!el.getAttribute('data-tooltip')) {
        const label = (el.querySelector('span')?.textContent || el.title || '').trim();
        if (label.length) el.setAttribute('data-tooltip', label);
      }
      
      // Ensure proper z-index for event handling
      el.style.zIndex = '100';
      el.style.position = 'relative';
      
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
      
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      
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
      
      // Animate in with a slight delay to ensure positioning is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tooltip.classList.add('visible');
          isTooltipVisible = true;
        });
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

    function scheduleHideTooltip() {
      // Use a timeout to prevent flickering when moving between overlapping elements
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      hoverTimeout = setTimeout(() => {
        hideTooltip();
      }, 50);
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

    // Add new event listeners with improved handling for overlapping elements
    items.forEach((el) => {
      const listeners = {
        enter: (e) => {
          // Clear any pending hide timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
          }
          
          // Check if the mouse is actually over this element (not just bubbling)
          const rect = el.getBoundingClientRect();
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          if (mouseX >= rect.left && mouseX <= rect.right && 
              mouseY >= rect.top && mouseY <= rect.bottom) {
            showTooltip(el);
          }
        },
        leave: (e) => {
          // Only hide if we're actually leaving this element and not going to a child
          const rect = el.getBoundingClientRect();
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          // Check if mouse is still within the element bounds
          if (mouseX < rect.left || mouseX > rect.right || 
              mouseY < rect.top || mouseY > rect.bottom) {
            if (currentHoveredItem === el) {
              scheduleHideTooltip();
            }
          }
        },
        move: (e) => {
          // Only update if this is the current hovered item and mouse is within bounds
          const rect = el.getBoundingClientRect();
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          if (mouseX >= rect.left && mouseX <= rect.right && 
              mouseY >= rect.top && mouseY <= rect.bottom) {
            if (currentHoveredItem !== el) {
              showTooltip(el);
            }
          }
        }
      };
      
      // Use capture phase to ensure we get events before they bubble
      el.addEventListener('mouseenter', listeners.enter, true);
      el.addEventListener('mouseleave', listeners.leave, true);
      el.addEventListener('mousemove', listeners.move, true);
      
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

    // Add global mousemove listener to handle cases where elements don't receive events
    document.addEventListener('mousemove', (e) => {
      // Get the element directly under the mouse
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      
      // Check if it's one of our orbit items
      const orbitItem = elementUnderMouse?.closest('.orbit-item, .orbit-center');
      
      if (orbitItem && items.includes(orbitItem)) {
        // If we're over an orbit item but it's not the current one, switch to it
        if (currentHoveredItem !== orbitItem) {
          showTooltip(orbitItem);
        }
      } else if (isTooltipVisible && !elementUnderMouse?.closest('.orbital-system')) {
        // If we're not over any orbit item and not in the orbital system, hide tooltip
        scheduleHideTooltip();
      }
    });

    console.log('Tooltip initialization complete (ultimate version)');
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

