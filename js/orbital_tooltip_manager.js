/* Orbital Tooltip Manager: non-rotating global tooltip + pause on hover */

document.addEventListener('DOMContentLoaded', () => {
  // Create a single tooltip attached to <body>
  const tooltip = document.createElement('div');
  tooltip.className = 'global-orbit-tooltip';
  document.body.appendChild(tooltip);

  const rings = Array.from(document.querySelectorAll('.orbital-system .orbit-ring'));
  const items = Array.from(document.querySelectorAll('.orbital-system .orbit-item, .orbital-system .orbit-center'));

  // Ensure all items have tooltip text. If missing, derive a sensible default
  items.forEach((el) => {
    if (!el.getAttribute('data-tooltip')) {
      const label = (el.querySelector('span')?.textContent || el.title || '').trim();
      if (label.length) el.setAttribute('data-tooltip', label);
    }
  });
  // Default for center if missing
  const center = document.querySelector('.orbital-system .orbit-center');
  if (center && !center.getAttribute('data-tooltip')) {
    center.setAttribute('data-tooltip', 'QA Leadership - Driving quality excellence across all industry verticals');
  }

  function placeTooltip(target) {
    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    tooltip.textContent = text;
    tooltip.classList.remove('below');
    
    // Pause ring animations while reading
    rings.forEach((r) => (r.style.animationPlayState = 'paused'));

    const rect = target.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Temporarily make tooltip visible but offscreen to measure
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '1';
    tooltip.style.left = '-9999px';
    tooltip.style.top = '-9999px';
    
    // Force a reflow to ensure measurement is accurate
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

    // Position tooltip and make it visible
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.visibility = 'visible';
    
    // Use requestAnimationFrame to ensure positioning is complete before showing
    requestAnimationFrame(() => {
      tooltip.classList.add('visible');
    });
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
    tooltip.style.opacity = '';
    tooltip.style.visibility = '';
    rings.forEach((r) => (r.style.animationPlayState = 'running'));
  }

  // Bind events to all items, including center
  items.forEach((el) => {
    el.addEventListener('mouseenter', () => placeTooltip(el));
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('mousemove', () => placeTooltip(el));
  });
});


