// Single source of truth for the portfolio. Every fact is transcribed from
// Abedelrahman Sholi's resume (assets/Abedelrahman-Sholi-Resume.pdf). No
// invented titles, dates, metrics, or projects.
//
// House style for written copy: no em dashes, no hyphens used as dashes, no
// arrows, no separator glyphs. Use commas or two sentences. The terminal UI
// glyphs live in portfolio.js and are part of the design, not the copy.

export const RESUME = {
  name: 'Abedelrahman Sholi',
  title: 'Hands-on quality engineer',
  years: '11+',
  location: 'Dubai, UAE',
  availability: 'Open to remote roles, available across all time zones',
  email: 's.holi_1989@live.com',
  phone: '+971 56 953 8533',
  linkedin: 'linkedin.com/in/sholi',
  resumeFile: 'assets/Abedelrahman-Sholi-Resume.pdf',

  // Hero tag row: industries render as accent tags, traits as muted chips.
  industries: ['Payments', 'Aviation', 'Healthcare'],
  traits: ['open to remote', '4 years fully remote', 'async by default'],

  lede:
    'The spec tells you what should work. Production data tells you what will break. ' +
    "I start with the second one. I'd rather find a way to ship than a reason to stop.",

  experience: [
    {
      role: 'Quality Assurance Lead, dnata International',
      company: 'Emirates Group',
      place: 'Dubai',
      dates: 'Jan 2026 - Present',
      industry: 'Aviation',
      stack: 'Playwright, Selenium, Appium, GitLab CI',
      blurb:
        'I lead QA for airport platforms across Europe, the Middle East and Asia. I still test and ' +
        "write automation every week, alongside leading our engineers and the vendor's test team.",
    },
    {
      role: 'Lead Quality Assurance Engineer',
      company: 'Emirates Group',
      place: 'Dubai',
      dates: 'Jan 2024 - Jan 2026',
      industry: 'Aviation',
      stack: 'Selenium, Cucumber, RestAssured, SauceLabs',
      blurb:
        "I was the QA embedded in the team that runs Emirates' passenger and payment platforms, " +
        'on web, mobile and API.',
    },
    {
      role: 'Senior QA Engineer',
      company: 'IQVIA',
      place: 'Palestine, Remote',
      dates: 'Sep 2021 - Jan 2024',
      industry: 'Healthcare',
      stack: 'Microservices, RestAssured, TestNG, YAML',
      blurb:
        'I led QA for a healthcare SaaS suite of eight connected products, with eight engineers ' +
        'spread across time zones.',
    },
    {
      // No industry label for this role, by the owner's decision.
      role: 'QA Engineer',
      company: 'ProGineer Technologies',
      place: 'Palestine, Remote',
      dates: 'Nov 2019 - Sep 2021',
      stack: 'Desktop apps, APIs, Java tooling',
      blurb:
        'A Palestine-based delivery partner for PDF Solutions in Santa Clara. I tested desktop apps ' +
        'and APIs and built Java tools for the team.',
    },
    {
      role: 'Systems Integration Engineer',
      company: 'Ooredoo (Wataniya Mobile Palestine)',
      place: 'Palestine',
      dates: 'May 2015 - Nov 2019',
      industry: 'Telecom',
      stack: 'SOA Suite, Integration testing',
      blurb:
        'I built, watched and fixed integration systems for a telecom, and learned to find problems ' +
        'in production logs before customers did.',
    },
  ],

  // Each habit is backed by a case study rendered on this page. `ref` must
  // match a projects[].name so the claim is checkable against the card.
  habits: [
    { text: 'I check production data before I decide what to test.', ref: 'Payment Gateway Migration' },
    { text: 'I explore by hand first, then automate what proved to matter.', ref: 'Payment Gateway Migration' },
    { text: 'When I find a risk late, I propose a way to ship, not a reason to stop.', ref: 'Payment Gateway Migration' },
    { text: 'I raise UX problems, not only bugs.', ref: 'Payment Gateway Migration' },
    { text: 'I build test data that holds no PII.', ref: 'Synthetic Test Data and Bug Investigation' },
    { text: 'When a test fails, I find out why before I raise it.', ref: 'Synthetic Test Data and Bug Investigation' },
  ],

  // Selected work. Signature engagements pulled from the experience above.
  projects: [
    {
      name: 'Payment Gateway Migration',
      org: 'Emirates Group',
      tag: 'Payments',
      stack: ['Production data', 'Exploratory testing', 'Selenium', 'Cucumber', 'RestAssured', 'OpenAPI/Swagger'],
    },
    {
      name: 'Playwright Framework and CI Migration',
      org: 'dnata International',
      tag: 'Automation, CI/CD',
      stack: ['Playwright (TypeScript)', 'GitLab CI', 'SauceLabs', 'PactFlow'],
    },
    {
      name: 'HACCP Catering Framework Redesign',
      org: 'dnata International',
      tag: 'Automation',
      stack: ['Selenium', 'Appium', 'GitLab', 'Jenkins'],
    },
    {
      name: 'Synthetic Test Data and Bug Investigation',
      org: 'dnata International',
      tag: 'Test data, Investigation',
      stack: ['IATA 792', 'Splunk', 'Allure', 'Synthetic data'],
    },
  ],

  // Case studies. Problem, approach and outcome assembled only from resume
  // bullets. Where the resume is thin, the entry is short rather than padded.
  caseStudies: {
    'Payment Gateway Migration': {
      problem:
        'Emirates moved its payment gateway from XML to JSON services, across global and local card ' +
        'types, on a gateway that processes millions of transactions.',
      approach: [
        'Nobody asked me to look at production data. I did, to see which cards customers really use. One card type would have failed on the new version. I proposed routing it to the old gateway until the fix was ready.',
        'I planned the testing by risk: the payment paths that would hurt most got covered first.',
        'Testing by hand, I switched payment method halfway through and the payment failed. It affected web, mobile and the call center.',
        'I raised the UX problems too, not only bugs, and worked with the designers on the payment screens.',
      ],
      outcome:
        'We shipped on the planned date. The mid-entry bug never reached customers. The payment flow ' +
        'got simpler.',
    },
    'Playwright Framework and CI Migration': {
      problem:
        'An enterprise asset management (EAM) product went live in Switzerland and Italy, with more ' +
        'airports and stations to follow. It needed web and API integration coverage, and test ' +
        'execution had to move from Jenkins to GitLab CI.',
      approach: [
        'I built a Playwright (TypeScript) framework for web and API testing.',
        'I wrote about 600 end-to-end scenarios, using Playwright agents and AI tools for the first drafts.',
        'I moved test execution from Jenkins to GitLab CI, running on SauceLabs.',
        'I added contract and schema tests against the OpenAPI specs, with PactFlow.',
      ],
      outcome: 'About 600 scenarios run in GitLab CI.',
    },
    'HACCP Catering Framework Redesign': {
      problem:
        'The Selenium and Appium framework for a food safety (HACCP) catering application needed a new ' +
        'architecture. The regression run took 8 hours.',
      approach: [
        'I rebuilt the Selenium and Appium framework for the new architecture.',
        'Mobile suites run on real Samsung devices in the pipelines.',
      ],
      outcome: 'Regression went from 8 hours to about 3.',
    },
    'Synthetic Test Data and Bug Investigation': {
      problem:
        'Lower environments needed realistic boarding data and repeatable test data. Production data ' +
        'carries passenger PII. Test and pipeline failures had to be traced to root cause before they ' +
        'reached developers.',
      approach: [
        'I built an IATA 792 barcode generator and decoder, on my own initiative, so we could create boarding data instead of copying it from production.',
        'I use Splunk logs to reproduce bugs and to build test data with the PII stripped out.',
        'When a test or pipeline fails, I trace it to the root cause before I raise it.',
        'I proposed and added failure categories to the Allure reports.',
      ],
      outcome:
        'No passenger PII in lower environments. Repeatable test data. Failures sorted by category, ' +
        'so triage is faster.',
    },
  },

  // Metric readouts. Every figure is lifted from the resume and carries its
  // own context. "about 3h" is the resume's own wording and stays.
  readouts: [
    { value: '8h to about 3h', label: 'Regression run', note: 'dnata, HACCP framework redesign' },
    { value: '90%', label: 'Requirements coverage', note: 'IQVIA, 8-product suite' },
    { value: '40% less', label: 'Manual effort', note: 'Ooredoo, reconciliation routines' },
  ],

  skills: [
    { group: 'Testing', items: ['Exploratory', 'Risk-based', 'API and integration', 'Contract testing (OpenAPI/Swagger, PactFlow)', 'Real-device mobile testing (SauceLabs)'] },
    { group: 'Automation', items: ['Playwright (TypeScript)', 'Selenium', 'Appium', 'RestAssured', 'Cucumber', 'JUnit', 'TestNG', 'Hybrid web/API automation frameworks'] },
    { group: 'Programming', items: ['Java (primary)', 'TypeScript', 'JavaScript/Node.js'] },
    { group: 'CI/CD', items: ['GitLab CI', 'Jenkins', 'Maven', 'Git'] },
    { group: 'Observability', items: ['Splunk'] },
    { group: 'Tools', items: ['Jira', 'QMetry', 'TestRail', 'Confluence', 'Agile/Scrum delivery'] },
    { group: 'Leadership', items: ['Distributed team leadership', 'SaaS vendor QA governance', 'Release readiness', 'Quality gates and SLAs', 'RFI/RFT/SOW review'] },
    { group: 'GenAI for QA', items: ['Claude', 'GitHub Copilot', 'Playwright agents', 'Test-case generation', 'Synthetic test data', 'Automation authoring', 'AI-assisted test analysis'] },
  ],

  education: [
    { title: 'Certified Ethical Hacker (CEH), EC-Council', org: 'Arab German Academy', kind: 'Certification', dates: '2015 - 2016' },
    { title: 'BSc Telecommunication Engineering', org: 'An-Najah National University', kind: 'Degree', dates: '2010 - 2015' },
  ],
};
