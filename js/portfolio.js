// Renders the terminal portfolio from the single content module and wires the
// interactive bits: the command line, expandable case studies, the live Dubai
// clock, and the scroll-reveal. No framework — a small hyperscript helper (h)
// keeps the element trees readable.

import { RESUME as R } from './content.js';

// --- hyperscript -------------------------------------------------------
// h('div', { class: 'x', onclick: fn }, child, [moreChildren], 'text')
// Children may be nodes, strings, arrays, or null/false (skipped).
function h(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'style') Object.assign(node.style, value);
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else if (value === true) node.setAttribute(key, '');
      else node.setAttribute(key, value);
    }
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

// Scroll to a section without scrollIntoView (it can fight a host frame).
// behavior:'auto' overrides the CSS smooth-scroll per call, matching the spec.
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70; // clear the sticky bar
  window.scrollTo({ top: y, behavior: 'auto' });
}

// A section's "command label" — ➜ ~/portfolio <cmd>
// Rendered as an h2 so the page has a real heading outline (h1 is the name).
// Styling is unchanged; .section-cmd carries the muted terminal look.
function sectionCmd(cmd) {
  return h('h2', { class: 'section-cmd' },
    h('span', { class: 'prompt-sym' }, '➜'), ' ',
    h('span', { class: 'prompt-path' }, '~/portfolio'), ' ',
    h('b', null, cmd),
  );
}

// --- top bar -----------------------------------------------------------
function Topbar() {
  const nav = [['top', 'Home'], ['work', 'Work'], ['career', 'Experience'], ['skills', 'Skills'], ['contact', 'Contact']];
  // 'top' scrolls to the document origin rather than the hero's offset, so the
  // sticky-bar allowance in scrollToId can't leave a sliver of page above.
  const navLink = (id, label, attrs) =>
    h('a', {
      href: '#' + id,
      onclick: (e) => {
        e.preventDefault();
        if (id === 'top') window.scrollTo({ top: 0, behavior: 'auto' });
        else scrollToId(id);
      },
      ...attrs,
    }, label);
  return h('div', { class: 'topbar' },
    h('div', { class: 'dots' },
      h('span', { class: 'dot', style: { background: '#ff5f57' } }),
      h('span', { class: 'dot', style: { background: '#febc2e' } }),
      h('span', { class: 'dot', style: { background: '#28c840' } }),
    ),
    navLink('top', 'abedelrahman@qa: portfolio', { class: 'title' }),
    h('nav', { class: 'topnav', 'aria-label': 'Sections' },
      nav.map(([id, label]) => navLink(id, label)),
      // Downloads the PDF directly. It used to scroll to Contact, which has
      // no resume on it.
      h('a', { href: R.resumeFile, download: true, style: { color: 'var(--acc)' } }, 'Resume'),
    ),
  );
}

// --- hero --------------------------------------------------------------
function Hero() {
  return h('header', { class: 'hero wrap', id: 'top' },
    h('div', { class: 'cmdline' },
      h('span', { class: 'prompt-sym' }, '➜'), '  ',
      h('span', { class: 'prompt-path' }, '~/portfolio'), ' ',
      h('b', null, 'whoami'),
    ),
    h('h1', null, R.name, h('span', { class: 'cursor-block' })),
    h('div', { class: 'role' }, '# ' + R.title),
    h('p', { class: 'lede' }, R.lede),
    h('div', { class: 'tag-row' },
      R.industries.map((t) => h('span', { class: 'tag' }, t.toLowerCase())),
      R.traits.map((t) => h('span', { class: 'chip chip-static' }, t)),
    ),
    h('div', { class: 'cta-row' },
      h('a', { class: 'btn btn-primary', href: R.resumeFile, download: true }, 'Download resume'),
      h('a', { class: 'btn', href: 'mailto:' + R.email }, R.email),
      h('a', { class: 'btn', href: 'https://' + R.linkedin, target: '_blank', rel: 'noopener noreferrer' }, R.linkedin),
    ),
  );
}

// --- command line ------------------------------------------------------
// Each command returns a node to print. Keeping them in one map makes it easy
// to add or rename without touching the input handling.
function buildCommands() {
  const link = (href, text, external) =>
    h('a', { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }, text);
  const k = (text) => h('span', { class: 'k' }, text);

  return {
    help: {
      run: () => h('span', null,
        'available commands:\n',
        '  ', k('whoami'), '      who I am\n',
        '  ', k('work'), '        selected projects\n',
        '  ', k('experience'), '  career history\n',
        '  ', k('skills'), '      tools & stack\n',
        '  ', k('contact'), '     how to reach me\n',
        '  ', k('resume'), '      download the PDF\n',
        '  ', k('clear'), '       clear the screen',
      ),
    },
    whoami: {
      run: () => h('span', null,
        `${R.name}, ${R.title}.\n${R.years} years across payments, aviation and healthcare. Based in ${R.location}, open to remote.`),
    },
    work: {
      run: () => { scrollToId('work'); return h('span', null, `opening selected work... (${R.projects.length} projects)`); },
    },
    experience: {
      aliases: ['career'],
      run: () => { scrollToId('career'); return h('span', null, 'opening experience, 2015 to present.'); },
    },
    skills: {
      aliases: ['stack'],
      run: () => { scrollToId('skills'); return h('span', null, 'opening the stack...'); },
    },
    contact: {
      run: () => h('span', null,
        'email: ', link('mailto:' + R.email, R.email), '\n',
        'phone: ', R.phone, '\n',
        'linkedin: ', link('https://' + R.linkedin, R.linkedin, true)),
    },
    resume: {
      aliases: ['cv'],
      run: () => h('span', null, 'downloading resume... ', link(R.resumeFile, '[ get it here ]')),
    },
  };
}

function CommandLine() {
  const commands = buildCommands();
  const resolve = (name) =>
    commands[name] || Object.values(commands).find((c) => (c.aliases || []).includes(name));

  const logEl = h('div', { class: 'cli-log' });
  const input = h('input', {
    class: 'cli-input', spellcheck: 'false', autocomplete: 'off',
    'aria-label': 'command input', placeholder: "type 'help'...",
  });

  const appendEntry = (cmd, node) => {
    logEl.append(h('div', null,
      h('div', { class: 'out-cmd' },
        h('span', { class: 'prompt-sym' }, '➜'),
        h('span', { class: 'prompt-path' }, '~/portfolio'), ' ', cmd),
      h('div', { class: 'out-text' }, node),
    ));
    body.scrollTop = body.scrollHeight; // keep newest output in view
  };

  const submit = (raw) => {
    const name = raw.trim().toLowerCase();
    if (!name) return;
    if (name === 'clear') { logEl.replaceChildren(); return; }
    const cmd = resolve(name);
    const node = cmd ? cmd.run()
      : h('span', null, 'command not found: ', name, '. type ', h('span', { class: 'k' }, 'help'), ' for options.');
    appendEntry(raw.trim(), node);
  };

  const body = h('div', { class: 'cli-body', onclick: () => input.focus() },
    logEl,
    h('form', { class: 'cli-inputline', onsubmit: (e) => { e.preventDefault(); submit(input.value); input.value = ''; } },
      h('span', { class: 'prompt-sym' }, '➜'), input),
  );

  appendEntry('whoami', commands.whoami.run()); // seed the log

  // "/" focuses the prompt from anywhere on the page.
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
  });

  const chips = ['help', 'work', 'experience', 'skills', 'contact', 'resume'];
  return h('section', { class: 'wrap', style: { paddingTop: '6px' } },
    h('div', { class: 'cli' },
      h('div', { class: 'cli-head' },
        h('span', { class: 'prompt-sym' }, '●'),
        h('span', null, 'Prefer the command line? Type a command or tap one below.'),
        h('span', { class: 'hint' }, 'press ', h('b', { style: { color: 'var(--fg)' } }, '/'), ' to focus'),
      ),
      body,
    ),
    h('div', { class: 'cli-chips' },
      chips.map((c) => h('button', { class: 'chip', onclick: () => submit(c) }, c)),
    ),
  );
}

// --- impact metrics ----------------------------------------------------
function Readouts() {
  return h('section', { class: 'section wrap', id: 'impact' },
    sectionCmd('cat impact.log'),
    h('div', { class: 'readouts reveal' },
      R.readouts.map((m) => h('div', { class: 'readout' },
        h('div', { class: 'val' }, m.value),
        h('div', { class: 'lbl' }, m.label),
        h('div', { class: 'note' }, m.note),
      )),
    ),
    h('p', { class: 'comment', style: { fontSize: '12.5px', marginTop: '12px' } },
      '// every figure above is from the resume, shown with its context'),
  );
}

// --- career git-graph --------------------------------------------------
// Branch colors map to the four domains, kept inside the project palette.
const INDUSTRY_COLOR = {
  'Aviation': 'var(--acc)',
  'Healthcare': 'var(--amber)',
  'Telecom': 'var(--blue)',
};
// Roles without an industry (ProGineer) fall back to the muted rail colour and
// render no branch segment.
const industryColor = (name) => INDUSTRY_COLOR[name] || 'var(--mut)';

// One commit node + connecting trunk per role. first/last trim the trunk so
// the line starts and ends at the end nodes instead of running off-edge.
function Rail({ color, first, last, current }) {
  const NODE_Y = 16, NODE = 14, CENTER = 7;
  const trunk = h('div', { style: {
    position: 'absolute', left: (CENTER - 1) + 'px', width: '2px', background: 'var(--line-2)',
    top: first ? (NODE_Y + NODE) + 'px' : '0',
    bottom: last ? `calc(100% - ${NODE_Y}px)` : '0',
  } });
  const node = h('div', { style: {
    position: 'absolute', left: '0', top: NODE_Y + 'px', width: NODE + 'px', height: NODE + 'px',
    borderRadius: NODE + 'px', background: 'var(--bg)', border: `2px solid ${color}`,
    boxShadow: current ? `0 0 9px ${color}` : 'none',
  } },
    h('div', { style: { position: 'absolute', inset: '3px', borderRadius: '4px', background: current ? color : 'transparent' } }),
  );
  return h('div', { style: { position: 'absolute', inset: '0' } }, trunk, node);
}

function CareerGraph() {
  const roles = R.experience;
  const branchName = (industry) => industry.toLowerCase().replace(/\s+/g, '-');
  return h('section', { class: 'section wrap', id: 'career' },
    sectionCmd('git log --graph --career'),
    h('div', { class: 'graph' },
      roles.map((e, i) => {
        const color = industryColor(e.industry);
        return h('div', { class: 'graph-row reveal' },
          h('div', { class: 'graph-rail' },
            Rail({ color, first: i === 0, last: i === roles.length - 1, current: i === 0 })),
          h('div', { class: 'graph-meta' },
            h('div', { class: 'branch-label' },
              h('span', { class: 'dotmark', style: { color } }, '●'), ' ',
              (e.industry ? `branch: ${branchName(e.industry)}, ` : '') +
              `${e.dates}${i === 0 ? '  (HEAD)' : ''}`),
            h('h3', { class: 'role-title' }, e.role),
            h('div', { class: 'role-co' }, e.company, h('span', { class: 'place' }, ', ' + e.place)),
            h('p', { class: 'role-blurb' }, e.blurb),
            h('div', { class: 'stack-row' }, h('span', { class: 'chip chip-static' }, 'stack: ' + e.stack)),
          ),
        );
      }),
    ),
  );
}

// --- selected work / case studies --------------------------------------
function Case(p, defaultOpen) {
  const cs = R.caseStudies[p.name] || {};
  let open = !!defaultOpen;

  const card = h('div', { class: 'case', 'data-open': String(open) });
  const toggleText = document.createTextNode(open ? 'collapse' : 'read case study');

  const head = h('button', {
    class: 'case-head', 'aria-expanded': String(open),
    onclick: () => {
      open = !open;
      card.setAttribute('data-open', String(open));
      head.setAttribute('aria-expanded', String(open));
      toggleText.textContent = open ? 'collapse' : 'read case study';
    },
  },
    h('div', null,
      h('div', null, h('span', { class: 'case-id' }, p.tag), h('span', { class: 'case-org' }, ', ' + p.org)),
      h('h3', { class: 'case-title' }, p.name),
    ),
    h('span', { class: 'case-toggle' }, h('span', { class: 'glyph' }, '▸'), toggleText),
  );

  const body = h('div', { class: 'case-body' },
    h('div', { class: 'case-body-inner' },
      h('div', { class: 'case-body-pad' },
        h('div', { class: 'cs-block' }, h('div', { class: 'cs-key' }, '// problem'), h('p', null, cs.problem)),
        h('div', { class: 'cs-block' }, h('div', { class: 'cs-key' }, '// what I did'),
          h('ul', null, (cs.approach || []).map((a) => h('li', null, a)))),
        h('div', { class: 'cs-block' }, h('div', { class: 'cs-key' }, '// outcome'), h('p', null, cs.outcome)),
        h('div', { class: 'cs-stack' }, p.stack.map((s) => h('span', { class: 'chip chip-static' }, s))),
      ),
    ),
  );

  card.append(head, body);
  return card;
}

function Work() {
  return h('section', { class: 'section wrap', id: 'work' },
    sectionCmd('ls -la ./selected-work'),
    h('div', { class: 'work-list' }, R.projects.map((p, i) => Case(p, i === 0))),
  );
}

// --- how I work --------------------------------------------------------
// One panel, one row per habit, each naming the case study above that backs
// it. Reuses the .case panel and existing tokens, so no new styles.
function HowIWork() {
  return h('section', { class: 'section wrap', id: 'how-i-work' },
    sectionCmd('cat how-i-work.txt'),
    h('div', { class: 'case reveal' },
      R.habits.map((hb, i) => h('div', {
        style: {
          padding: '16px 24px',
          borderTop: i === 0 ? 'none' : '1px solid var(--line)',
        },
      },
        h('div', { style: { color: 'var(--fg-strong)', fontSize: '14.5px', lineHeight: '1.6' } }, hb.text),
        h('div', { class: 'comment', style: { fontSize: '12.5px', marginTop: '2px' } }, '// ' + hb.ref),
      )),
    ),
  );
}

// --- skills ------------------------------------------------------------
function Skills() {
  return h('section', { class: 'section wrap', id: 'skills' },
    sectionCmd('cat stack.json'),
    h('div', { class: 'skills-grid reveal' },
      R.skills.map((s) => h('div', { class: 'skill-card' },
        h('div', { class: 'grp' }, h('span', { class: 'hash' }, '#'), ' ', s.group),
        h('div', { class: 'skill-tags' }, s.items.map((it) => h('span', { class: 'skill-tag' }, it))),
      )),
    ),
    h('div', { class: 'edu-row reveal' },
      R.education.map((ed) => h('div', { class: 'chip chip-static', style: { padding: '10px 14px' } },
        h('span', { style: { color: 'var(--amber)' } }, ed.kind + ':'), ` ${ed.title}, ${ed.org}, ${ed.dates}`)),
    ),
  );
}

// --- contact + footer --------------------------------------------------
function DubaiClock() {
  const value = h('span', { class: 'acc' });
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const tick = () => { value.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
  // Availability is stated once, in the contact block above.
  return h('span', { class: 'clock' }, 'Dubai ', value, ' GST');
}

function Contact() {
  return h('section', { class: 'section wrap', id: 'contact', style: { paddingBottom: '0' } },
    sectionCmd('./contact.sh'),
    h('div', { class: 'contact reveal' },
      h('div', null,
        h('h2', null, "Let's talk quality."),
        h('div', { class: 'avail' }, R.availability),
      ),
      h('div', { class: 'contact-cta' },
        h('a', { class: 'btn btn-primary', href: 'mailto:' + R.email }, R.email),
        h('a', { class: 'btn', href: 'tel:' + R.phone.replace(/\s/g, '') }, R.phone),
      ),
    ),
    h('div', { class: 'footer' },
      DubaiClock(),
      h('span', null, `Copyright ${new Date().getFullYear()} ${R.name}, ${R.location}`),
    ),
  );
}

// --- scroll reveal -----------------------------------------------------
// A scroll/resize sweep is the source of truth; IntersectionObserver is only a
// progressive enhancement (it doesn't fire in every embedded context). The
// hidden state is gated behind .reveal-ready, and a no-paint guard reveals
// everything outright where CSS transitions can't advance — so content is
// never left stuck at opacity 0.
function initReveal() {
  const root = document.documentElement;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('reveal-ready');

  // Reduced motion: skip animation entirely, show everything.
  if (reduce) { root.classList.remove('reveal-ready'); return; }

  const pending = () => Array.from(document.querySelectorAll('.reveal:not(.in)'));
  const show = (el) => el.classList.add('in');

  // If requestAnimationFrame never fires, the context isn't painting and CSS
  // transitions won't advance — reveal everything immediately, no animation.
  let painted = false;
  requestAnimationFrame(() => { painted = true; });
  setTimeout(() => {
    if (painted) return;
    document.querySelectorAll('.reveal').forEach((el) => { el.style.transition = 'none'; el.classList.add('in'); });
    root.classList.remove('reveal-ready');
  }, 250);

  // Reveal anything whose top edge is within the lower 90% of the viewport.
  const sweep = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    pending().forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.9) show(el); });
  };
  sweep(); // catch whatever's already on screen at load
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep);

  if (typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) show(en.target); });
    }, { threshold: 0.12 });
    pending().forEach((el) => io.observe(el));
  }
}

// --- mount -------------------------------------------------------------
// Selected work sits directly below the hero block, ahead of the metrics, so
// the first thing after the intro is the work itself.
const root = document.getElementById('root');
root.append(
  Topbar(),
  h('main', null, Hero(), CommandLine(), Work(), HowIWork(), Readouts(), CareerGraph(), Skills(), Contact()),
);
initReveal();
