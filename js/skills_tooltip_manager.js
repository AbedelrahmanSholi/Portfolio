(function() {
  'use strict';
  
  let skillTooltip = null;
  let currentHoveredSkill = null;
  let isSkillTooltipVisible = false;
  let skillHoverTimeout = null;
  
  function initializeSkillTooltips() {
    console.log('Initializing skills tooltips...');
    
    // Create or get the tooltip element
    skillTooltip = document.querySelector('.global-skill-tooltip');
    if (!skillTooltip) {
      skillTooltip = document.createElement('div');
      skillTooltip.className = 'global-skill-tooltip';
      document.body.appendChild(skillTooltip);
    }

    const skillItems = Array.from(document.querySelectorAll('.skills-circular-container .skill-circle'));

    console.log('Found', skillItems.length, 'skill items');

    // Ensure all items have tooltip text and proper z-index
    skillItems.forEach((el, index) => {
      if (!el.getAttribute('data-tooltip')) {
        const label = (el.querySelector('span')?.textContent || el.title || '').trim();
        if (label.length) el.setAttribute('data-tooltip', label);
      }
      
      // Ensure proper z-index for event handling
      el.style.zIndex = '100';
      el.style.position = 'absolute';
      
      console.log(`Skill ${index + 1}:`, el.getAttribute('data-tooltip'));
    });

    function showSkillTooltip(target) {
      const text = target.getAttribute('data-tooltip');
      if (!text) return;

      console.log('Showing tooltip for:', text);
      
      skillTooltip.textContent = text;
      skillTooltip.style.opacity = '1';
      skillTooltip.style.visibility = 'visible';
      skillTooltip.style.pointerEvents = 'none';
      
      isSkillTooltipVisible = true;
      currentHoveredSkill = target;
      
      // Pause animation for hovered item only
      target.style.animationPlayState = 'paused';
      
      positionSkillTooltip(target);
    }

    function hideSkillTooltip() {
      if (!isSkillTooltipVisible) return;
      
      console.log('Hiding skill tooltip');
      
      skillTooltip.style.opacity = '0';
      skillTooltip.style.visibility = 'hidden';
      skillTooltip.style.pointerEvents = 'none';
      
      // Resume animation for previously hovered item
      if (currentHoveredSkill) {
        currentHoveredSkill.style.animationPlayState = 'running';
      }
      
      isSkillTooltipVisible = false;
      currentHoveredSkill = null;
    }

    function positionSkillTooltip(target) {
      if (!skillTooltip || !target) return;
      
      const rect = target.getBoundingClientRect();
      const tooltipRect = skillTooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      let top = rect.top - tooltipRect.height - 15;
      
      // Adjust if tooltip goes off screen
      if (left < 10) left = 10;
      if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }
      
      if (top < 10) {
        top = rect.bottom + 15;
      }
      
      skillTooltip.style.left = left + 'px';
      skillTooltip.style.top = top + 'px';
    }

    // Add event listeners to skill items using capture phase
    skillItems.forEach(item => {
      // Mouse enter with timeout to prevent flickering
      item.addEventListener('mouseenter', function(e) {
        clearTimeout(skillHoverTimeout);
        skillHoverTimeout = setTimeout(() => {
          showSkillTooltip(this);
        }, 100);
      }, true);

      // Mouse leave
      item.addEventListener('mouseleave', function(e) {
        clearTimeout(skillHoverTimeout);
        skillHoverTimeout = setTimeout(() => {
          hideSkillTooltip();
        }, 100);
      }, true);

      // Mouse move for positioning
      item.addEventListener('mousemove', function(e) {
        if (currentHoveredSkill === this && isSkillTooltipVisible) {
          positionSkillTooltip(this);
        }
      }, true);

      console.log('Added listeners to skill:', this.getAttribute('data-tooltip'));
    });

    // Global mouse tracking as fallback
    document.addEventListener('mousemove', function(e) {
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      
      if (elementUnderMouse && elementUnderMouse.classList.contains('skill-circle')) {
        if (currentHoveredSkill !== elementUnderMouse) {
          clearTimeout(skillHoverTimeout);
          skillHoverTimeout = setTimeout(() => {
            showSkillTooltip(elementUnderMouse);
          }, 100);
        }
      } else if (isSkillTooltipVisible && !elementUnderMouse?.closest('.global-skill-tooltip')) {
        clearTimeout(skillHoverTimeout);
        skillHoverTimeout = setTimeout(() => {
          hideSkillTooltip();
        }, 100);
      }
    });

    // Hide tooltip on scroll
    window.addEventListener('scroll', function() {
      if (isSkillTooltipVisible) {
        hideSkillTooltip();
      }
    });

    // Hide tooltip on click outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.skills-circular-container') && !e.target.closest('.global-skill-tooltip')) {
        hideSkillTooltip();
      }
    });

    console.log('Skills tooltip initialization complete');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSkillTooltips);
  } else {
    initializeSkillTooltips();
  }

})();

