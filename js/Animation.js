/* Animation.js */

/* Text Typewriter Effect */
let animationTimeout;

const greetingElement = document.getElementById('greeting');
const summeryElement = document.getElementById('summery');
const detailsElement = document.getElementById('details');
const hintElement = document.getElementById('hint');

const greetingMSG = "Hi, I'm Abedelrahman Sholi";
const summeryMSG = "Experienced QA Leader with a Decade of Impact";
const detailsMSG =
  "I bring <span class='highlight'>over</span> 10 years of expertise in software quality assurance, leading teams to deliver <span class='highlight'>robust</span> solutions across aviation, healthcare, telecom, and electronics. My focus is on driving <span class='highlight'>strategic</span> QA processes, fostering team <span class='highlight'>excellence</span>, and enhancing system reliability through innovative automation and stakeholder collaboration. Aspiring to elevate organizational quality as a Software Quality Assurance Manager.";

function animate(str, elementInHTML) {
  return new Promise((resolve) => {
    let index = 0;
    function animateText() {
      elementInHTML.innerHTML = str.slice(0, index + 1);
      index++;
      if (index < str.length) {
        animationTimeout = setTimeout(animateText, 80);
      } else {
        resolve();
      }
    }
    animateText();
  });
}

async function animateOnVisible() {
  await animate(greetingMSG, greetingElement);
  await animate(summeryMSG, summeryElement);
  await animate(detailsMSG, detailsElement);
  hintElement.innerHTML = "";
}

function stopAnimation() {
  clearTimeout(animationTimeout);
  greetingElement.innerHTML = greetingMSG;
  summeryElement.innerHTML = summeryMSG;
  detailsElement.innerHTML = detailsMSG;
  hintElement.innerHTML = "";
}

animateOnVisible();
document.addEventListener('click', stopAnimation);

/* Anchor Navigation */
const anchors = document.querySelectorAll("#side_nav li a");
anchors.forEach(anchor => {
  anchor.addEventListener("click", function(event) {
    event.preventDefault();
    const targetSection = document.querySelector(anchor.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      document.querySelector("#side_nav li.active").classList.remove("active");
      anchor.parentElement.classList.add("active");
    }
  });
});

/* Scroll Intersection Observer */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const anchor = document.querySelector(`#side_nav li a[href="#${entry.target.id}"]`);
    if (anchor) { // Only proceed if anchor exists
      if (entry.isIntersecting) {
        anchor.parentElement.classList.add("active");
      } else {
        anchor.parentElement.classList.remove("active");
      }
    }
  });
}, { root: null, rootMargin: "0px", threshold: 0.5 });

// Only observe sections with matching sidebar links
const sectionsToObserve = ['sideBySide', 'skills', 'blogCarousel', 'endPage'];
sectionsToObserve.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});

/* Scroll Down Button */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("scrollDownButton").addEventListener("click", () => {
    const currentActive = document.querySelector("#side_nav li.active a");
    const nextSectionAnchor = currentActive?.parentElement.nextElementSibling?.querySelector("a") || document.querySelector("#side_nav li:first-child a");
    const targetSection = document.querySelector(nextSectionAnchor.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      nextSectionAnchor.click();
    }
  });
});

/* Popup */
const triggers = document.querySelectorAll(".trigger");
const modals = document.querySelectorAll(".modal");

triggers.forEach(trigger => trigger.addEventListener("click", (e) => {
  const index = Array.from(triggers).indexOf(e.currentTarget);
  modals[index].classList.toggle("show-modal");
  document.body.classList.toggle("modal-open");
}));

document.querySelectorAll(".close-button").forEach(button => button.addEventListener("click", (e) => {
  e.target.closest(".modal").classList.remove("show-modal");
  document.body.classList.remove("modal-open");
}));

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show-modal");
    document.body.classList.remove("modal-open");
  }
});

/* Dynamic Availability */
function updateAvailability() {
  const availableElement = document.querySelector('.available');
  const hour = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }).split(',')[1].split(':')[0] * 1;
  availableElement.innerHTML = (hour >= 9 && hour < 17) ? "🟢 I might be online right now!" : "🟠 I'm probably offline right now.";
}
updateAvailability();
setInterval(updateAvailability, 60000);