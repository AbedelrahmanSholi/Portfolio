let animationTimeout; // Variable to store the animation timeout

const greetingElement = document.getElementById('greeting');
const summeryElement = document.getElementById('summery');
const detailsElement = document.getElementById('details');

const greetingMSG = "Hey, I'm Abedelrahman Sholi";
const summeryMSG = "Professional Quality Assurenace Engineer.";
const detailsMSG =
  "Results-driven engineer, leading cross-functional teams for successful product rollouts, achieving high-quality software releases, and optimizing efficiency.";


// Define the animate function with a Promise-based approach
function animate(str, startIndex = 0, elementInHTML) {
  return new Promise((resolve) => {
    let isTag = false;
    let text = "";

    function animateText() {
      text = str.slice(0, startIndex + 1);
      elementInHTML.innerHTML = text;

      if (text === str) {
        resolve(); // Resolve the Promise when the animation completes
      } else {
        const char = text.slice(-1);
        if (char === '<') isTag = true;
        if (char === '>') isTag = false;

        if (isTag) {
          startIndex++;
          animateText();
        } else {
          startIndex++;
          animationTimeout = setTimeout(animateText, 80); // Set the animationTimeout variable
        }
      }
    }

    animateText();
  });
}

async function animateOnVisible() {
  await animate(greetingMSG, 0, greetingElement);
  await animate(summeryMSG, 0, summeryElement);
  await animate(detailsMSG, 0, detailsElement);
  await clearHint();
}

function clearHint() {
  const hintElement = document.getElementById('hint');
  hintElement.innerHTML = "";
}

// will be executed once the file loaded
animateOnVisible();

// Clear the animation timeout to stop the animation
// This will stop the animation and make the text appear
document.addEventListener('click', function () {
  clearTimeout(animationTimeout);

  greetingElement.innerHTML = greetingMSG;
  summeryElement.innerHTML = summeryMSG;
  detailsElement.innerHTML = detailsMSG;
  clearHint();
});

//Code used for navigation bar elements
// Setting up the Variables
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");
//setting up the listener
bars.addEventListener("click", barClicked, false);
//setting up the clicked Effect
function barClicked() {
  bars.classList.toggle('active');
  nav.classList.toggle('visible');
}
// Remove effect
function closeMenu() {
  bars.classList.remove('active');
  nav.classList.remove('visible');
}

//Scroll sideBar and slider animation efffect.
const slider = document.querySelector('.slider');
const verticalLine = document.querySelector('.vertical-line');
let lastSliderTop = 0;

function handleAnchorHover(event) {
  const anchorElement = event.target;
  const anchorRect = anchorElement.getBoundingClientRect();
  const verticalLineRect = verticalLine.getBoundingClientRect();
  const sliderTop = anchorRect.top - verticalLineRect.top + window.scrollY + anchorRect.height / 2 - slider.offsetHeight / 2;

  slider.style.transform = `translateY(${sliderTop}px)`;
  slider.style.opacity = 1;

  // Clear the timer to prevent slider from hiding on mouse hover
  clearTimeout(slider.hideTimer);
}

function handleAnchorHoverEnd() {
  // Check if the mouse is still inside the #sideBar element
  const sideBar = document.getElementById('sideBar');
  const sideBarRect = sideBar.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  if (
    mouseX >= sideBarRect.left &&
    mouseX <= sideBarRect.right &&
    mouseY >= sideBarRect.top &&
    mouseY <= sideBarRect.bottom
  ) {
    // Mouse is still inside the #sideBar element, don't hide the slider
    return;
  }

  // Hide the slider after a brief delay when the mouse leaves the anchor
  slider.hideTimer = setTimeout(() => {
    slider.style.opacity = 0;
  }, 100); // Adjust the delay time (in milliseconds) as needed
}

// Add event listeners to anchors
const anchors = document.querySelectorAll('.navigation a');
anchors.forEach((anchor) => {
  anchor.addEventListener('mouseenter', handleAnchorHover);
  anchor.addEventListener('mouseleave', handleAnchorHoverEnd);
});

// Handle mouse leave on the #sideBar element
const sideBar = document.getElementById('sideBar');
sideBar.addEventListener('mouseleave', () => {
  slider.style.opacity = 1;
});
