# Abedelrahman Sholi, QA Lead

Source for my portfolio site.

**Live:** https://abedelrahmansholi.github.io/Portfolio/

## About

Hands-on QA lead. 11+ years in software quality across payments, aviation and
healthcare, 5+ of those leading distributed teams. I find product and customer
risks early, through exploratory testing, production data and risk-based
planning. I build web, mobile and API automation with Playwright (TypeScript),
Selenium and Appium. Four years fully remote across time zones.

## Skills

**Testing.** Exploratory testing, risk-based testing, API and integration
testing, contract testing (OpenAPI/Swagger, PactFlow), mobile testing on real
devices (SauceLabs), shift-left, test-pyramid strategy.

**Automation.** Playwright (TypeScript), Selenium, Appium, RestAssured,
Cucumber, JUnit, TestNG, hybrid web/API automation frameworks.

**Programming.** Java, SQL (MySQL), HTML/CSS.

**Code literacy.** Reads and debugs JavaScript/Node.js for test analysis,
automation review and root-cause investigation.

**CI/CD.** GitLab CI, Jenkins, Maven, Git.

**Investigation.** Splunk for bug reproduction and for building test data from
production logs with PII removed. JMeter for API-level performance tests.

**GenAI for QA.** LLM-assisted generation of test cases, synthetic test data
and automation scripts. AI-assisted test analysis.

**Tools.** Jira, QMetry, TestRail, Confluence, Agile/Scrum delivery.

**Leadership.** Distributed team leadership, vendor QA governance, release
readiness, quality gates and SLAs.

## Experience

| Role | Company | Dates |
| --- | --- | --- |
| Quality Assurance Lead, dnata International | Emirates Group, Dubai | Jan 2026 to present |
| Lead Quality Assurance Engineer | Emirates Group, Dubai | Jan 2024 to Jan 2026 |
| Senior QA Engineer | IQVIA, Palestine, remote | Sep 2021 to Jan 2024 |
| QA Engineer | ProGineer Technologies, Palestine, remote | Nov 2019 to Sep 2021 |
| Systems Integration Engineer | Ooredoo (Wataniya Mobile Palestine), Palestine | May 2015 to Nov 2019 |

Full detail is in the resume:
[assets/Abedelrahman-Sholi-Resume.pdf](assets/Abedelrahman-Sholi-Resume.pdf)

## Education and certifications

* Certified Ethical Hacker (CEH), EC-Council. Arab German Academy, 2015 to 2016.
* BSc Telecommunication Engineering. An-Najah National University, 2010 to 2015.

## Running the site

Static site. No build step and no dependencies. Serve the folder over HTTP,
because `js/portfolio.js` is an ES module and will not load from `file://`.

    python -m http.server 8000

Then open http://localhost:8000.

## How the repo is organised

| Path | What it is |
| --- | --- |
| `index.html` | Page shell. Meta tags, structured data, font loading, no-JS fallback. |
| `css/terminal.css` | All styling. Theme tokens live in `:root`. |
| `js/content.js` | All content. Single source of truth, taken from the resume. |
| `js/portfolio.js` | Renders the page from `content.js`. No framework. |
| `assets/` | Resume PDF. |

To change any text on the site, edit `js/content.js`. Nothing else should need
touching.

## Contact

* Dubai, United Arab Emirates
* s.holi_1989@live.com
* LinkedIn: https://linkedin.com/in/sholi
