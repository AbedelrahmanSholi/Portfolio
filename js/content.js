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
  traits: ['open to remote', '4 years fully remote'],

  lede:
    'Hands-on quality engineer with 11+ years in software quality across payments, aviation and ' +
    'healthcare. I find product and customer risks early with Product, Engineering and Design, ' +
    'through exploratory testing, production data and risk-based planning. I build web, mobile and ' +
    'API automation with Playwright (TypeScript), Selenium and Appium, and I read and debug ' +
    'application code to get to root cause.',

  experience: [
    {
      role: 'Quality Assurance Lead, dnata International',
      company: 'Emirates Group',
      place: 'Dubai',
      dates: 'Jan 2026 - Present',
      industry: 'Aviation',
      stack: 'Playwright, Selenium, Appium, GitLab CI',
      blurb:
        'Lead QA for enterprise airport platforms used across Europe, the Middle East and Asia. ' +
        "Hands-on in testing and automation while leading internal engineers and the vendor's QA delivery.",
    },
    {
      role: 'Lead Quality Assurance Engineer',
      company: 'Emirates Group',
      place: 'Dubai',
      dates: 'Jan 2024 - Jan 2026',
      industry: 'Aviation',
      stack: 'Selenium, Cucumber, RestAssured, SauceLabs',
      blurb:
        'Led QA for core Emirates passenger-service and payment platforms across web, mobile and API layers.',
    },
    {
      role: 'Senior QA Engineer',
      company: 'IQVIA',
      place: 'Palestine, Remote',
      dates: 'Sep 2021 - Jan 2024',
      industry: 'Healthcare',
      stack: 'Microservices, RestAssured, TestNG, YAML',
      blurb:
        "Led QA for IQVIA's healthcare SaaS suite serving providers, payers and patients across the " +
        'Middle East and parts of Europe, coordinating 8 engineers across time zones and 8 interconnected ' +
        'products.',
    },
    {
      // No industry label for this role, by the owner's decision.
      role: 'QA Engineer',
      company: 'ProGineer Technologies',
      place: 'Palestine, Remote',
      dates: 'Nov 2019 - Sep 2021',
      stack: 'Desktop apps, APIs, Java tooling',
      blurb:
        'ProGineer Technologies is a Palestine-based company serving as a delivery partner to ' +
        'PDF Solutions, Inc. (Santa Clara, CA).',
    },
    {
      role: 'Systems Integration Engineer',
      company: 'Ooredoo (Wataniya Mobile Palestine)',
      place: 'Palestine',
      dates: 'May 2015 - Nov 2019',
      industry: 'Telecom',
      stack: 'SOA Suite, Integration testing',
      blurb: 'Developed, monitored and operated integration systems within an SOA environment.',
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
        'On my own initiative, checked production data for which cards customers really use, found one that would have failed on the new version, and proposed a routing fix.',
        'Planned test coverage for the migration by risk, so critical payment cases were covered first and the remaining effort went to the scenarios that mattered most to customers.',
        'Found a payment failure when switching payment method mid-entry, through exploratory testing. It affected web, mobile and call center users.',
        'Raised UX risks, missing test cards and untested flows early, and worked with designers on the payment gateway UI.',
      ],
      outcome:
        'The routing fix kept the release on its planned date. The mid-entry failure was caught before ' +
        'release. The UI changes made the payment flow easier for end users.',
    },
    'Playwright Framework and CI Migration': {
      problem:
        'An enterprise asset management (EAM) product went live in Switzerland and Italy, with more ' +
        'airports and stations to follow. It needed web and API integration coverage, and test ' +
        'execution had to move from Jenkins to GitLab CI.',
      approach: [
        'Built a Playwright (TypeScript) framework for web and API integration testing.',
        'Wrote about 600 end-to-end scenarios with Playwright agents and AI-assisted authoring.',
        'Moved CI execution from Jenkins to GitLab CI with SauceLabs.',
        'Added contract and schema tests for program APIs with RestAssured against OpenAPI/Swagger specs, supported by PactFlow.',
      ],
      outcome: 'About 600 end-to-end scenarios run in GitLab CI with SauceLabs.',
    },
    'HACCP Catering Framework Redesign': {
      problem:
        'The Selenium and Appium framework for a food safety (HACCP) catering application needed a new ' +
        'architecture. The regression run took 8 hours.',
      approach: [
        'Redesigned the Selenium and Appium framework for the new architecture.',
        'Ran mobile suites on real Samsung devices in GitLab and Jenkins pipelines.',
      ],
      outcome: 'Regression run cut from 8 hours to about 3 hours.',
    },
    'Synthetic Test Data and Bug Investigation': {
      problem:
        'Lower environments needed realistic boarding data and repeatable test data. Production data ' +
        'carries passenger PII. Test and pipeline failures had to be traced to root cause before they ' +
        'reached developers.',
      approach: [
        'Built an IATA 792 barcode generator and decoder, unprompted, that creates synthetic boarding data.',
        'Used Splunk logs to reproduce bugs and to build automation test data with PII removed.',
        'Traced test and pipeline failures to root cause across the application, APIs and GitLab CI before raising them with developers.',
        'Proposed and added failure categorization to the Allure reports.',
      ],
      outcome:
        'Lower environments hold no passenger PII. Automation has repeatable test data. Each run shows ' +
        'clear error categories, so failures are triaged faster.',
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
