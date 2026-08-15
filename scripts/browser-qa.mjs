import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const host = '127.0.0.1';
const previewPort = Number(process.env.HUESTEPS_QA_PORT || 4399);
const devtoolsPort = Number(process.env.HUESTEPS_CDP_PORT || 9333);
const baseUrl = `http://${host}:${previewPort}`;
const outputDir = path.resolve('.qa');
const profileDir = path.join(outputDir, 'chrome-profile');
const expectedPrimaryNavigation = ['Occasion', 'Eye Shape', 'Skin Tone', 'Everyday', 'About'];
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));

if (!chromePath) {
  throw new Error('Chrome was not found. Set CHROME_PATH to run browser QA.');
}

const cases = [
  { name: 'home-375-light', path: '/', width: 375, height: 812, colorScheme: 'light', reducedMotion: false },
  { name: 'home-768-dark-reduced', path: '/', width: 768, height: 900, colorScheme: 'dark', reducedMotion: true },
  { name: 'home-1024-light', path: '/', width: 1024, height: 900, colorScheme: 'light', reducedMotion: false },
  { name: 'home-1440-light', path: '/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false },
  { name: 'home-1440-light-lower', path: '/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false, scrollY: 700 },
  { name: 'home-1440-dark', path: '/', width: 1440, height: 900, colorScheme: 'dark', reducedMotion: false },
  { name: 'home-812-landscape', path: '/', width: 812, height: 375, colorScheme: 'light', reducedMotion: false },
  { name: 'hub-375-light', path: '/eye-shape-makeup/', width: 375, height: 812, colorScheme: 'light', reducedMotion: false },
  { name: 'hub-eye-1440-light', path: '/eye-shape-makeup/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false },
  { name: 'hub-eye-1440-light-lower', path: '/eye-shape-makeup/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false, scrollY: 650 },
  { name: 'hub-skin-1440-light', path: '/skin-tone-undertone/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false },
  { name: 'hub-skin-1440-light-lower', path: '/skin-tone-undertone/', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false, scrollY: 650 },
  { name: 'hub-1440-dark', path: '/occasion-makeup/', width: 1440, height: 900, colorScheme: 'dark', reducedMotion: false },
  {
    name: 'recipe-375-light',
    path: '/occasion-makeup/soft-glam-wedding-guest-makeup/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'recipe-1440-light',
    path: '/occasion-makeup/soft-glam-wedding-guest-makeup/',
    width: 1440,
    height: 900,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'recipe-eye-shape-768-dark',
    path: '/eye-shape-makeup/soft-glam-hooded-eyes/',
    width: 768,
    height: 900,
    colorScheme: 'dark',
    reducedMotion: true,
  },
  {
    name: 'recipe-steps-375-light',
    path: '/eye-shape-makeup/soft-glam-hooded-eyes/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
    selector: '#steps',
  },
  {
    name: 'recipe-steps-1440-light',
    path: '/eye-shape-makeup/soft-glam-hooded-eyes/',
    width: 1440,
    height: 900,
    colorScheme: 'light',
    reducedMotion: false,
    selector: '#steps',
  },
  {
    name: 'recipe-skin-tone-1024-light',
    path: '/skin-tone-undertone/rich-berry-gold-makeup-deep-skin/',
    width: 1024,
    height: 900,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'recipe-everyday-375-light',
    path: '/everyday-makeup/5-minute-everyday-makeup/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'day-01-no-makeup-375-light',
    path: '/everyday-makeup/natural-no-makeup-makeup/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'day-01-no-makeup-1440-light',
    path: '/everyday-makeup/natural-no-makeup-makeup/',
    width: 1440,
    height: 900,
    colorScheme: 'light',
    reducedMotion: false,
  },
  {
    name: 'day-01-no-makeup-steps-375-light',
    path: '/everyday-makeup/natural-no-makeup-makeup/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
    selector: '#steps',
  },
  {
    name: 'tutorial-interaction-375-light',
    path: '/eye-shape-makeup/soft-glam-hooded-eyes/',
    width: 375,
    height: 812,
    colorScheme: 'light',
    reducedMotion: false,
    selector: '#steps',
    tutorialInteraction: true,
  },
  { name: 'trust-375-light', path: '/about/', width: 375, height: 812, colorScheme: 'light', reducedMotion: false },
  { name: 'admin-demo-375-light', path: '/admin/?demo=1', width: 375, height: 812, colorScheme: 'light', reducedMotion: false },
  { name: 'admin-demo-1440-light', path: '/admin/?demo=1', width: 1440, height: 900, colorScheme: 'light', reducedMotion: false },
];

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitFor(url, attempts = 50) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The local process may still be starting.
    }
    await delay(200);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class DevToolsSession {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
    this.events = new Map();
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const listeners = this.events.get(message.method) || [];
      this.events.delete(message.method);
      listeners.forEach((resolve) => resolve(message.params));
    });
  }

  send(method, params = {}) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const listeners = this.events.get(method) || [];
      listeners.push(resolve);
      this.events.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(profileDir, { recursive: true });

const preview = spawn(process.execPath, ['scripts/preview-dist.mjs'], {
  env: { ...process.env, HOST: host, PORT: String(previewPort) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${devtoolsPort}`,
    `--user-data-dir=${profileDir}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

try {
  await Promise.all([
    waitFor(`${baseUrl}/`),
    waitFor(`http://${host}:${devtoolsPort}/json/version`),
  ]);

  const results = [];

  for (const testCase of cases) {
    const targetResponse = await fetch(
      `http://${host}:${devtoolsPort}/json/new?${encodeURIComponent(baseUrl + testCase.path)}`,
      { method: 'PUT' },
    );
    const target = await targetResponse.json();
    const session = new DevToolsSession(target.webSocketDebuggerUrl);
    await session.open();
    await session.send('Page.enable');
    await session.send('Runtime.enable');
    await session.send('Emulation.setDeviceMetricsOverride', {
      width: testCase.width,
      height: testCase.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await session.send('Emulation.setEmulatedMedia', {
      features: [
        { name: 'prefers-color-scheme', value: testCase.colorScheme },
        { name: 'prefers-reduced-motion', value: testCase.reducedMotion ? 'reduce' : 'no-preference' },
      ],
    });
    await session.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        window.__huestepsVitals = { cls: 0, lcp: 0 };
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) window.__huestepsVitals.cls += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            if (last) window.__huestepsVitals.lcp = last.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch {}
      })()`,
    });

    const loaded = session.once('Page.loadEventFired');
    await session.send('Page.navigate', { url: baseUrl + testCase.path });
    await loaded;
    await delay(500);

    if (testCase.selector) {
      await session.send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `(async () => {
          const element = document.querySelector(${JSON.stringify(testCase.selector)});
          if (!element) return;
          const images = [...element.querySelectorAll('img')];
          images.forEach((image) => { image.loading = 'eager'; });
          element.scrollIntoView({ block: 'start' });
          await Promise.all(images.slice(0, 2).map((image) => image.decode?.().catch(() => {})));
        })()`,
      });
      await delay(250);
    } else if (testCase.scrollY) {
      await session.send('Runtime.evaluate', { expression: `window.scrollTo(0, ${testCase.scrollY})` });
      await delay(100);
    }

    let tutorialInteraction = null;
    if (testCase.tutorialInteraction) {
      const interaction = await session.send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const root = document.querySelector('[data-tutorial-root]');
          const firstStep = root?.querySelector('[data-tutorial-step]');
          const complete = firstStep?.querySelector('[data-step-complete]');
          const fix = firstStep?.querySelector('[data-step-fix]');
          complete?.click();
          fix?.click();
          const saved = JSON.parse(localStorage.getItem('huesteps:tutorial:soft-glam-hooded-eyes') || '[]');
          return {
            progress: root?.querySelector('[data-progress-copy]')?.textContent?.trim(),
            completed: firstStep?.classList.contains('is-complete') || false,
            fixOpen: firstStep?.querySelector('[data-step-details]')?.open || false,
            saved: Array.isArray(saved) && saved.includes(1),
          };
        })()`,
      });
      tutorialInteraction = interaction.result.value;
    }

    const evaluation = await session.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const root = document.documentElement;
        const body = document.body;
        const contentWidth = Math.max(root.scrollWidth, body?.scrollWidth || 0);
        const h1s = [...document.querySelectorAll('h1')];
        const images = [...document.querySelectorAll('img')];
        const siteHeader = document.querySelector('.site-header');
        const headerInner = siteHeader?.querySelector('.header-inner');
        const brandIcon = siteHeader?.querySelector('.brand-icon');
        const brandWordmark = siteHeader?.querySelector('.brand-wordmark');
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
        return {
          title: document.title,
          viewportWidth: window.innerWidth,
          contentWidth,
          horizontalOverflow: contentWidth > window.innerWidth + 1,
          h1Count: h1s.length,
          emptyH1Count: h1s.filter((element) => !element.textContent.trim()).length,
          imageCount: images.length,
          imagesWithoutAlt: images.filter((image) => !image.hasAttribute('alt')).length,
          adScriptCount: [...document.scripts].filter((script) => /pagead2|adsbygoogle/i.test(script.src || script.textContent || '')).length,
          fcp: Math.round(fcp),
          lcp: Math.round(window.__huestepsVitals?.lcp || 0),
          cls: Number((window.__huestepsVitals?.cls || 0).toFixed(4)),
          colorSchemeDark: matchMedia('(prefers-color-scheme: dark)').matches,
          reducedMotionMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
          primaryNavigation: siteHeader
            ? [...siteHeader.querySelectorAll('.desktop-nav a')].map((link) => link.textContent.trim())
            : null,
          headerUsesGlobalSkin: siteHeader
            ? Boolean(
              brandIcon
              && getComputedStyle(brandIcon).display !== 'none'
              && brandWordmark
              && getComputedStyle(brandWordmark).fontFamily.toLowerCase().includes('allura')
              && headerInner
              && Number.parseFloat(getComputedStyle(headerInner).borderRadius) > 100
            )
            : null,
        };
      })()`,
    });

    let screenshotOptions = {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    };
    if (testCase.selector) {
      const targetBox = await session.send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const element = document.querySelector(${JSON.stringify(testCase.selector)});
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { x: 0, y: rect.top + window.scrollY, width: window.innerWidth, height: Math.min(rect.height, ${testCase.height}) };
        })()`,
      });
      if (targetBox.result.value) screenshotOptions = { ...screenshotOptions, captureBeyondViewport: true, clip: { ...targetBox.result.value, scale: 1 } };
    }
    const screenshot = await session.send('Page.captureScreenshot', screenshotOptions);
    await writeFile(path.join(outputDir, `${testCase.name}.png`), Buffer.from(screenshot.data, 'base64'));

    await session.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Tab',
      code: 'Tab',
      windowsVirtualKeyCode: 9,
    });
    await session.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Tab',
      code: 'Tab',
      windowsVirtualKeyCode: 9,
    });
    const focus = await session.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const active = document.activeElement;
        const style = getComputedStyle(active);
        return {
          tag: active?.tagName || null,
          text: active?.textContent?.trim().slice(0, 80) || null,
          href: active?.getAttribute?.('href') || null,
          outlineWidth: style.outlineWidth,
          outlineStyle: style.outlineStyle,
        };
      })()`,
    });

    results.push({
      ...testCase,
      ...evaluation.result.value,
      tutorialInteraction,
      firstTabFocus: focus.result.value,
    });

    session.close();
    await fetch(`http://${host}:${devtoolsPort}/json/close/${target.id}`);
  }

  const failures = results.filter(
    (result) =>
      result.horizontalOverflow ||
      result.h1Count !== 1 ||
      result.emptyH1Count !== 0 ||
      result.imagesWithoutAlt !== 0 ||
      result.adScriptCount !== 0 ||
      result.lcp > 2500 ||
      result.cls > 0.1 ||
      result.colorSchemeDark !== (result.colorScheme === 'dark') ||
      result.reducedMotionMatches !== result.reducedMotion ||
      (result.primaryNavigation && result.primaryNavigation.join('|') !== expectedPrimaryNavigation.join('|')) ||
      result.headerUsesGlobalSkin === false ||
      (result.tutorialInteraction && (
        result.tutorialInteraction.progress !== '1 of 8 complete'
        || !result.tutorialInteraction.completed
        || !result.tutorialInteraction.fixOpen
        || !result.tutorialInteraction.saved
      )) ||
      Number.parseFloat(result.firstTabFocus.outlineWidth) < 2 ||
      result.firstTabFocus.outlineStyle === 'none',
  );

  await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(results, null, 2)}\n`);
  console.table(
    results.map((result) => ({
      case: result.name,
      viewport: `${result.viewportWidth}px`,
      content: `${result.contentWidth}px`,
      overflow: result.horizontalOverflow,
      h1: result.h1Count,
      missingAlt: result.imagesWithoutAlt,
      lcp: `${result.lcp}ms`,
      cls: result.cls,
      firstFocus: `${result.firstTabFocus.tag} ${result.firstTabFocus.href || ''}`.trim(),
    })),
  );

  if (failures.length > 0) {
    throw new Error(`Browser QA failed for: ${failures.map((result) => result.name).join(', ')}`);
  }
} finally {
  preview.kill();
  chrome.kill();
}
