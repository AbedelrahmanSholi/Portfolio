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