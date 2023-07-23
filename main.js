// Global variable to track animation status
let isAnimating = false;
// Module Loader Function
(function (modules) {
  const loadedModules = {};

  function loadModule(moduleId) {
    
    if (loadedModules[moduleId]) return loadedModules[moduleId].exports;

    const module = (loadedModules[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });

    modules[moduleId](module.exports, module.exports, loadModule);

    module.loaded = true;
    return module.exports;
  }

  loadModule.m = modules;
  loadModule.c = loadedModules;
  console.log(loadModule.m);
  loadModule.d = (exports, name, getter) => {
    if (!loadModule.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
    }
  };

  loadModule.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };

  loadModule.animationDelay = (value, mode) => {
    if (mode & 1) value = loadModule(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;

    const ns = Object.create(null);
    loadModule.r(ns);
    Object.defineProperty(ns, "default", { enumerable: true, value });
    if (mode & 2 && typeof value !== "string") {
      Object.keys(value).forEach((key) => {
        loadModule.d(ns, key, () => value[key]);
      });
    }
    return ns;
  };

  loadModule.initializeTheme = (module) => {
    const getter = module && module.__esModule ? () => module.default : () => module;
    loadModule.d(getter, "a", getter);
    return getter;
  };

  loadModule.o = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

  loadModule.p = "";

  loadModule(4);
})([
  function (setOnlineAvailability, currentDate) {
    const availabilityMsg = document.querySelector(".available");
    if (availabilityMsg) {
      const checkWorkingHours = (setOnlineAvailability) => setOnlineAvailability >= 9 && setOnlineAvailability <= 17;
      currentDate = new Date();
      const localTime = new Date(currentDate.toLocaleString("en-US", { timeZone: "America/Bogota" }));
      availabilityMsg.textContent = checkWorkingHours(localTime.getHours())
        ? "🟢  I'm probably online right now."
        : "🟠  I'm probably offline right now.";
    }
  },
  function (e, animationDelay, initializeTheme) {},
  function (e, animationDelay, initializeTheme) {},
  ,
  function (e, animationDelay, initializeTheme) {
    "use strict";
    initializeTheme.r(animationDelay);

    const delayPromise = (e) => new Promise((animationDelay) => setTimeout(animationDelay, e));

    const getCookieValue = (e) => {
      const animationDelay = e + "=";
      const initializeTheme = decodeURIComponent(document.cookie).split(";");
      for (let o = 0; o < initializeTheme.length; o++) {
        let r = initializeTheme[o];
        while (r.charAt(0) === " ") r = r.substring(1);
        if (r.indexOf(animationDelay) === 0) return r.substring(animationDelay.length, r.length);
      }
      return "";
    };
    const themes = [
      {
        themeName: "ms-dos",
        primaryColor: "#D4D4D4",
        secondaryColor: "#1E1E1E",
        highlight: "#CE9178",
        comment: "#6A9953",
        filter: "invert(98%) sepia(1%) saturate(2185%) hue-rotate(205deg) brightness(106%) contrast(66%)",
      },
      {
        themeName: "powershell",
        primaryColor: "#EEEDF0",
        secondaryColor: "#012456",
        highlight: "#FFFF00",
        comment: "#008080",
        filter: "invert(94%) sepia(6%) saturate(59%) hue-rotate(218deg) brightness(102%) contrast(91%)",
      },
      {
        themeName: "ubuntu",
        primaryColor: "#ffffff",
        secondaryColor: "#2d0922",
        highlight: "#6eda34",
        comment: "#bc8b0a",
        filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(241deg) brightness(107%) contrast(106%)",
      },
      {
        themeName: "light",
        primaryColor: "#2b2b2b",
        secondaryColor: "#ffffff",
        highlight: "blue",
        comment: "#008000",
        filter: "invert(9%) sepia(0%) saturate(441%) hue-rotate(191deg) brightness(112%) contrast(83%)",
      },
    ];

    async function applySelectedTheme(theme, animationDelay = 100) {
      const { themeName: name, primaryColor: main, secondaryColor: secondary, highlight: highlightColor, comment: commentColor, filter: imageFilter } = theme;

      document.cookie = "theme=" + name;
      selectedTheme = name;
      await delayPromise(2 * animationDelay);


      document.documentElement.style.setProperty("--main-color", main);
      document.documentElement.style.setProperty("--secondary-color", secondary);
      document.documentElement.style.setProperty("--img-filter", imageFilter);
      document.documentElement.style.setProperty("--highlight-color", highlightColor);
      document.documentElement.style.setProperty("--comment-color", commentColor);

      await delayPromise(5 * animationDelay);
    }

    let selectedTheme = getCookieValue("theme");
    if (selectedTheme === "") {
      applySelectedTheme(themes[0], 0);
      document.cookie = "theme=" + themes[0].themeName;
    } else {
      const indexOfSelectedTheme = findThemeIndexByName(themes, "themeName", selectedTheme);
      applySelectedTheme(indexOfSelectedTheme === -1 ? themes[0] : themes[indexOfSelectedTheme], 0);
    }

    function findThemeIndexByName(themesArr, key, value) {
      return themesArr.findIndex((theme) => theme[key] === value);
    }



    initializeTheme(0);

    function getRandomChar() {
      const characters = "abcdefgaweqwrcschijklmnñopiop-iñk..l,mqrstuvwxyz";
      return characters[Math.floor(Math.random() * characters.length)];
    }

    async function animateText(element) {
      element.classList.add("selected");
      element.textContent = "";
      element.style.opacity = 1;
      await delayPromise(500);

      let charIndex = 0;
      while (element.textContent !== element.finalText) {
        if (element.finalText[charIndex] === null || element.hasBeenAnimated) {
          element.textContent = element.finalText;
          element.classList.remove("selected");
          break;
        }

        element.textContent += element.finalText[charIndex];
        charIndex++;

        let delay = 40;
        if (element.finalText[charIndex] === ",") {
          delay = 200;
        }

        if (Math.random() < 0.007) {
          element.textContent += getRandomChar();
          await delayPromise(200);
          element.textContent += getRandomChar();
          await delayPromise(100);
          element.textContent = element.textContent.substring(0, element.textContent.length - 1);
          await delayPromise(200);
          element.textContent = element.textContent.substring(0, element.textContent.length - 1);
          await delayPromise(200);
        }

        await delayPromise(delay);
      }

      element.innerHTML = element.finalInnerHTML;
      element.classList.remove("selected");
    }

    async function animateElement(element) {
        if (isAnimating) {
          // If animation is already in progress, return without animating again
          return;
        }
      
        // Set isAnimating to true to indicate that animation is starting
        isAnimating = true;
      
        for (let child of element.children) {
          if (child.tagName === "H1") {
            await animateText(child);
          } else if (child.classList.contains("image-and-description")) {
            for (let subChild of child.children) {
              if (subChild.tagName === "FIGURE") {
                await delayPromise(100);
                subChild.style.opacity = 1;
                subChild.style.top = 0;
                await delayPromise(500);
              } else if (subChild.classList.contains("description")) {
                for (let textElement of subChild.children) {
                  await animateText(textElement);
                }
              }
            }
          } else if (child.classList.contains("scroll") || child.classList.contains("small")) {
            await delayPromise(300);
            child.style.opacity = 1;
          } else if (child.classList.contains("about-me")) {
            for (let textElement of child.children) {
              await animateText(textElement);
            }
          }
        }
      
        // Set isAnimating to false to indicate that animation is completed
        isAnimating = false;
        // Remove the click event listener from the animated element
        element.onclick = null;
      }

    const h1Elements = document.querySelectorAll("h1");
    const descriptionElements = document.querySelectorAll(".description p, .about-me p");
    const pageElements = document.querySelectorAll(".page");

    function isElementVisible(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = 0.25 * window.innerHeight;
      return rect.top < window.innerHeight - windowHeight && rect.bottom >= 0;
    }

    function animateElementsOnScroll(elements) {
      elements.forEach((element) => {
        if (isElementVisible(element) && !element.hasBeenAnimated) {
          isAnimating = false;
          element.hasBeenAnimated = true;
          animateElement(element);
        }
      });
    }

    h1Elements.forEach((element) => {
      element.finalText = element.textContent;
      element.finalInnerHTML = element.innerHTML;
      element.hasBeenAnimated = false;
    });

    descriptionElements.forEach((element) => {
      element.finalText = element.textContent;
      element.finalInnerHTML = element.innerHTML;
      element.hasBeenAnimated = false;
    });


    animateElementsOnScroll(pageElements);

    window.addEventListener("scroll", () => {
      animateElementsOnScroll(pageElements);
    });
  },
]);
