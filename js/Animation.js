/* Animation.js */

/* Text Typewriter Effect */
let animationTimeout;

const greetingElement = document.getElementById('greeting');
const summaryElement = document.getElementById('summary');
const detailsElement = document.getElementById('details');
const hintElement = document.getElementById('hint');

const greetingMSG = "Hi, I'm Abedelrahman Sholi";
const summaryMSG = "Experienced QA Leader with a Decade of Impact";
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
  await animate(summaryMSG, summaryElement);
  await animate(detailsMSG, detailsElement);
  hintElement.innerHTML = "";
}

function stopAnimation() {
  clearTimeout(animationTimeout);
  greetingElement.innerHTML = greetingMSG;
  summaryElement.innerHTML = summaryMSG;
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
      const activeElement = document.querySelector("#side_nav li.active");
      if (activeElement) {
        activeElement.classList.remove("active");
      }
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
        // Remove active from all navigation items
        document.querySelectorAll("#side_nav li").forEach(li => li.classList.remove("active"));
        // Add active to current section
        anchor.parentElement.classList.add("active");
      }
    }
  });
}, { root: null, rootMargin: "0px", threshold: 0.3 });

// Observe all sections that have navigation links
const sectionsToObserve = ['sideBySide', 'projects', 'achievements', 'technical-skills', 'timeline', 'skills', 'courses', 'blogCarousel', 'endPage'];
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


/* Skill Cards Click Functionality */


// Skill data
const skillsData = {
    'Java': {
        title: 'Java Programming',
        level: 'Expert (8+ years)',
        description: 'Expert in Java programming for building robust test automation frameworks and tools.',
        skills: [
            'Object-Oriented Programming (OOP)',
            'Advanced Java features (Lambda, Streams)',
            'Test automation framework development',
            'Maven/Gradle build tools',
            'JUnit and TestNG frameworks',
            'Design patterns implementation'
        ],
        achievements: [
            'Built comprehensive test automation framework',
            'Developed custom reporting tools',
            'Created data-driven testing solutions',
            'Implemented parallel test execution'
        ]
    },
    'Selenium': {
        title: 'Selenium WebDriver',
        level: 'Advanced (7+ years)',
        description: 'Advanced expertise in Selenium WebDriver for creating stable and maintainable UI test automation.',
        skills: [
            'Selenium WebDriver automation',
            'Page Object Model (POM)',
            'Cross-browser testing strategies',
            'Element locating strategies',
            'Explicit and implicit waits',
            'TestNG/JUnit integration'
        ],
        achievements: [
            'Automated 500+ test cases across browsers',
            'Reduced test execution time by 60%',
            'Implemented robust waiting strategies',
            'Created reusable component libraries'
        ]
    },
    'API Testing': {
        title: 'API Testing',
        level: 'Proficient (6+ years)',
        description: 'Proficient in API testing using RestAssured and Postman for comprehensive service validation.',
        skills: [
            'RESTful API testing with RestAssured',
            'Postman collection development',
            'JSON/XML response validation',
            'Authentication testing (OAuth, JWT)',
            'Performance testing with JMeter',
            'API documentation and contracts'
        ],
        achievements: [
            'Achieved 95% API test coverage',
            'Automated API regression testing',
            'Implemented contract testing',
            'Created comprehensive API test suites'
        ]
    },
    'Jenkins': {
        title: 'Jenkins CI/CD',
        level: 'Skilled (5+ years)',
        description: 'Skilled in configuring and maintaining Jenkins pipelines for continuous integration and test automation.',
        skills: [
            'Jenkins pipeline configuration',
            'Automated build and deployment',
            'Plugin management',
            'Integration with version control',
            'Test result reporting',
            'Environment management'
        ],
        achievements: [
            'Set up CI/CD pipelines for 10+ projects',
            'Reduced deployment time by 50%',
            'Implemented automated quality gates',
            'Created custom Jenkins plugins'
        ]
    },
    'GitLab': {
        title: 'GitLab DevOps',
        level: 'Experienced (4+ years)',
        description: 'Experienced with GitLab for version control, CI/CD pipelines, and collaborative development.',
        skills: [
            'GitLab CI/CD pipeline development',
            'Version control and branching',
            'Merge request workflows',
            'Container registry management',
            'Issue tracking',
            'Security scanning integration'
        ],
        achievements: [
            'Migrated 15+ projects to GitLab',
            'Implemented GitOps workflows',
            'Set up automated security scanning',
            'Created standardized CI/CD templates'
        ]
    },
    'Allure': {
        title: 'Allure Reporting',
        level: 'Proficient (4+ years)',
        description: 'Proficient in generating detailed, interactive test reports with Allure for enhanced visibility.',
        skills: [
            'Allure test report generation',
            'Custom report configuration',
            'Test result analysis and trends',
            'Integration with testing frameworks',
            'Historical data tracking',
            'Attachment management'
        ],
        achievements: [
            'Implemented Allure for all test suites',
            'Created custom report dashboards',
            'Set up automated report distribution',
            'Improved test visibility by 80%'
        ]
    },
    'Postman': {
        title: 'Postman API Testing',
        level: 'Expert (6+ years)',
        description: 'Expert in using Postman for API testing, documentation, and automated test collections.',
        skills: [
            'Postman collection development',
            'Environment and variable management',
            'Pre-request and test scripts',
            'Newman CLI automation',
            'API documentation generation',
            'Mock server creation'
        ],
        achievements: [
            'Created 200+ API test collections',
            'Automated API testing in CI/CD',
            'Generated comprehensive API docs',
            'Implemented API monitoring'
        ]
    },
    'Test Management': {
        title: 'Test Management',
        level: 'Skilled (8+ years)',
        description: 'Skilled in test management tools like JIRA, QMetry, and TestRail for comprehensive test planning and execution.',
        skills: [
            'Test case design and management',
            'Test execution planning',
            'Defect lifecycle management',
            'Requirements traceability',
            'Test metrics and reporting',
            'Risk-based testing strategies'
        ],
        achievements: [
            'Managed testing for 20+ projects',
            'Improved defect detection by 70%',
            'Implemented risk-based testing',
            'Created standardized processes'
        ]
    }
};

// Initialize skill cards functionality
function initSkillCards() {
    
    // Create modal HTML
    const modalHTML = `
        <div id="skillModal" class="skill-modal" style="display: none;">
            <div class="skill-modal-content">
                <div class="skill-modal-header">
                    <h2 id="skillModalTitle"></h2>
                    <span class="skill-modal-close">&times;</span>
                </div>
                <div class="skill-modal-body">
                    <div class="skill-overview">
                        <div class="skill-level-badge">
                            <span id="skillLevel"></span>
                        </div>
                        <p id="skillDescription"></p>
                    </div>
                    
                    <div class="skill-details-section">
                        <h3>Technical Skills & Expertise</h3>
                        <ul id="skillDetailsList"></ul>
                    </div>
                    
                    <div class="skill-projects-section">
                        <h3>Key Achievements</h3>
                        <ul id="skillProjectsList"></ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page if it doesn't exist
    if (!document.getElementById('skillModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Get modal elements
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.skill-modal-close');

    // Add click event listeners to skill cards
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach((skillBox, index) => {
        // Add cursor pointer style
        skillBox.style.cursor = 'pointer';
        skillBox.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        // Add hover effect
        skillBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        skillBox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click event
        skillBox.addEventListener('click', function() {
            const skillName = this.querySelector('h3').textContent;
            const skillData = skillsData[skillName];
            
            if (skillData) {
                showSkillModal(skillData);
            } else {
            }
        });
        
    });

    // Function to show modal with skill data
    function showSkillModal(skillData) {
        
        document.getElementById('skillModalTitle').textContent = skillData.title;
        document.getElementById('skillLevel').textContent = skillData.level;
        document.getElementById('skillDescription').textContent = skillData.description;
        
        // Populate skills list
        const detailsList = document.getElementById('skillDetailsList');
        detailsList.innerHTML = '';
        skillData.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            detailsList.appendChild(li);
        });
        
        // Populate achievements list
        const projectsList = document.getElementById('skillProjectsList');
        projectsList.innerHTML = '';
        skillData.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            projectsList.appendChild(li);
        });
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
}

// Initialize skill cards when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillCards);
} else {
    initSkillCards();
}


