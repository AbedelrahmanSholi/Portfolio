// Define the animate function with a Promise-based approach
function animate(str, startIndex = 0, elementInHTML) {
    return new Promise((resolve) => {
      let isTag = false;
      let text = "";
  
      function animateText() {
        text = str.slice(0, startIndex + 1);
        elementInHTML.innerHTML = text;
  
        if (text === str) {
          resolve();
        } else {
          const char = text.slice(-1);
          if (char === '<') isTag = true;
          if (char === '>') isTag = false;
  
          if (isTag) {
            startIndex++;
            animateText();
          } else {
            startIndex++;
            setTimeout(animateText, 80);
          }
        }
      }
  
      animateText();
    });
  }
  
  async function animateOnVisible() {
    const greetingElement = document.getElementById('greeting');
    const summeryElement = document.getElementById('summery');
    const detailsElement = document.getElementById('details');
  
    var greetingMSG = "Hey, I'm Abedelrahman Sholi";
    var summeryMSG = "Professional Quality Assurenace Engineer.";
    var detailsMSG =
      "Results-driven engineer, leading cross-functional teams for successful product rollouts, achieving high-quality software releases, and optimizing efficiency.";
  
    await animate(greetingMSG, 0, greetingElement);
    await animate(summeryMSG, 0, summeryElement);
    await animate(detailsMSG, 0, detailsElement);
  }

  animateOnVisible();