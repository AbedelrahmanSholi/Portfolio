/*Start of text typewriter effect */
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
/*End of text typewriter effect */

/*Start of anchor click to navigate to specific section and move slider */

// Get all anchor elements inside the #side_nav
const anchors = document.querySelectorAll("#side_nav li a");

// Loop through each anchor and add a click event listener
anchors.forEach(anchor => {
  anchor.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of anchor element
    
    // Get the target section's ID from the href attribute
    const targetSectionID = anchor.getAttribute("href");
    
    // Get the target section element
    const targetSection = document.querySelector(targetSectionID);
    
    // Check if the target section exists and scroll to it with smooth behavior
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      
      // Remove active class from the previous active element
      const currentActive = document.querySelector("#side_nav li.active");
      if (currentActive) {
        currentActive.classList.remove("active");
      }
      
      // Add active class to the clicked anchor's parent element (li)
      anchor.parentElement.classList.add("active");
    }
  });
});
/*End of anchor click to navigate to specific section and move slider */

/*Start of Handel scroll up/down to move the slider */

// Function to handle the intersection changes for the sections
function handleIntersection(entries) {
  entries.forEach(entry => {
    const targetSectionID = `#${entry.target.id}`;
    const correspondingAnchor = document.querySelector(`#side_nav li a[href="${targetSectionID}"]`);
    
    if (entry.isIntersecting) {
      // Add active class to the anchor corresponding to the visible section
      correspondingAnchor.parentElement.classList.add("active");
    } else {
      // Remove active class from the anchor if it's not visible in the viewport
      correspondingAnchor.parentElement.classList.remove("active");
    }
  });
}

// Set up the Intersection Observer with options
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Adjust this threshold value based on your preference
};

// Create the Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Get all the sections that you want to observe
const sections = document.querySelectorAll("section");

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});

/*End of Handel scroll up/down to move the slider */


