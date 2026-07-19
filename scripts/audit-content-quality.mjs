import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const stepAssetRoot = path.join(root, 'src', 'assets', 'tutorial-steps');
const visualMigrationPath = path.join(root, 'src', 'data', 'tutorial-visual-migrations.json');
const recipes = JSON.parse(await readFile(recipesPath, 'utf8'));
const visualMigration = JSON.parse(await readFile(visualMigrationPath, 'utf8'));
const legacyFocusGuideRecipeIds = new Set(visualMigration.legacyFocusGuideRecipeIds);
const fail = [];
const warn = [];

const STEP_TEXT_MINIMUMS = {
  title: 5,
  imageAlt: 30,
  imageCaption: 24,
  outcome: 20,
  tool: 3,
  productRole: 8,
  action: 36,
  placement: 14,
  motion: 8,
  amount: 5,
  whyItWorks: 30,
  completeWhen: 20,
  ifWrong: 24,
  proTip: 20,
  avoid: 20,
};

const VISUAL_FOCUS_VALUES = new Set([
  'full-face',
  'complexion',
  'brows',
  'both-eyes',
  'lid',
  'upper-lash',
  'lower-lash',
  'cheeks',
  'lips',
  'final',
]);

const VISUAL_FOCUS_PLACEMENT_RULES = {
  brows: { required: /\bbrow/i },
  'upper-lash': {
    required: /\bupper\s+lash/i,
    forbidden: /\blower\s+(?:lash|eye)|\bcheeks?\b|\blips?\b/i,
  },
  'lower-lash': {
    required: /\blower\s+lash/i,
    forbidden: /\bupper\s+lash|\bcheeks?\b|\blips?\b/i,
  },
  cheeks: { required: /\bcheeks?\b/i },
  lips: { required: /\blips?\b/i },
};

const PLACEHOLDER_PATTERNS = [
  /\b(?:todo|tbd|placeholder|lorem ipsum|coming soon|replace me|n\/?a|xxx)\b/i,
  /\b(?:insert|add) (?:copy|text|image|details?) here\b/i,
  /\bto be (?:added|written|completed|generated)\b/i,
  /待补|待完善|占位|稍后补充|即将上线|示例文本/,
];

const DUPLICATE_EXACT_WARN = 0.25;
const DUPLICATE_EXACT_FAIL = 0.35;
const SIMILARITY_WARN = 0.42;
const SIMILARITY_FAIL = 0.60;

const wordTokens = (value) => String(value).match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) ?? [];
const wordCount = (value) => wordTokens(value).length;
const normalizeText = (value) => String(value)
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const SIMILARITY_STOPWORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'before',
  'between',
  'both',
  'but',
  'by',
  'can',
  'for',
  'from',
  'has',
  'have',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'not',
  'of',
  'on',
  'only',
  'or',
  'so',
  'than',
  'that',
  'the',
  'then',
  'this',
  'to',
  'with',
  'without',
  'while',
  'when',
  'where',
  'which',
  'who',
  'will',
  'you',
  'your',
]);

const shingleTokens = (value) => wordTokens(value).filter((token) => token.length > 1 && !SIMILARITY_STOPWORDS.has(token));

const isMeaningfulString = (value, minLength) => typeof value === 'string' && value.trim().length >= minLength;
const hasPlaceholder = (value) => typeof value === 'string' && PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));

const requireString = (value, minLength, label) => {
  if (typeof value !== 'string' || !value.trim()) {
    fail.push(`${label} is missing.`);
    return false;
  }
  if (value.trim().length < minLength) fail.push(`${label} is too short (${value.trim().length} characters; minimum ${minLength}).`);
  if (hasPlaceholder(value)) fail.push(`${label} contains placeholder text.`);
  return true;
};

const requireStringList = (value, minimum, label, itemMinLength) => {
  if (!Array.isArray(value) || value.length < minimum) {
    fail.push(`${label} must contain at least ${minimum} items.`);
    return;
  }
  const normalized = new Set();
  value.forEach((item, index) => {
    if (requireString(item, itemMinLength, `${label}[${index}]`)) {
      const text = normalizeText(item);
      if (normalized.has(text)) fail.push(`${label}[${index}] duplicates another item in the same recipe.`);
      normalized.add(text);
    }
  });
};

const excludedTextKeys = new Set([
  'id',
  'slug',
  'hub',
  'heroImage',
  'image',
  'hex',
  'url',
  'merchant',
  'authorId',
  'reviewedBy',
  'publishedAt',
  'updatedAt',
  'stepImageStandard',
  'stepImagesReviewedAt',
  'visualFocus',
]);

const collectTextEntries = (value, key = '', output = []) => {
  if (typeof value === 'string') {
    if (!excludedTextKeys.has(key)) output.push(value);
    return output;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectTextEntries(item, key, output);
    return output;
  }
  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) collectTextEntries(childValue, childKey, output);
  }
  return output;
};

const shingles = (text, size = 3) => {
  const tokens = shingleTokens(normalizeText(text));
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) result.add(tokens.slice(index, index + size).join(' '));
  return result;
};

const jaccard = (left, right) => {
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  const union = left.size + right.size - intersection;
  return union ? intersection / union : 0;
};

const isInsideStepAssetRoot = (file) => {
  const relative = path.relative(stepAssetRoot, file);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

if (!Array.isArray(recipes) || !recipes.length) fail.push('recipes.json must contain at least one recipe.');

const recipeSlugs = new Set();
const imagePaths = new Map();
const imageHashes = new Map();
const imageAlts = new Map();
const imageCaptions = new Map();
const pageText = new Map();
const pageSegments = new Map();
const segmentOwners = new Map();
const faqQuestions = new Map();
let totalSteps = 0;
let recipesWithoutSources = 0;
let progressiveRecipeCount = 0;
let legacyRecipeCount = 0;

for (const recipe of recipes) {
  const slug = typeof recipe.slug === 'string' && recipe.slug ? recipe.slug : '(missing-slug)';
  if (recipeSlugs.has(slug)) fail.push(`Duplicate recipe slug: ${slug}`);
  recipeSlugs.add(slug);

  const isProgressive = recipe.stepImageStandard === visualMigration.progressiveStandard;
  const isLegacy = recipe.stepImageStandard === visualMigration.legacyStandard;
  if (!isProgressive && !isLegacy) {
    fail.push(`${slug}.stepImageStandard must be ${visualMigration.progressiveStandard} or ${visualMigration.legacyStandard}.`);
  } else if (isLegacy) {
    legacyRecipeCount += 1;
    if (!legacyFocusGuideRecipeIds.has(slug)) {
      fail.push(`${slug} is not grandfathered for legacy focus guides; new recipes require progressive high-detail step images.`);
    }
  } else {
    progressiveRecipeCount += 1;
    if (legacyFocusGuideRecipeIds.has(slug)) {
      fail.push(`${slug} claims the progressive standard but remains in legacyFocusGuideRecipeIds.`);
    }
  }

  requireStringList(recipe.whatMakesItWork, 3, `${slug}.whatMakesItWork`, 28);
  requireStringList(recipe.finishChecklist, 3, `${slug}.finishChecklist`, 18);

  if (!Array.isArray(recipe.tools) || recipe.tools.length < 3) {
    fail.push(`${slug}.tools must contain at least 3 tool entries.`);
  } else {
    const toolNames = new Set();
    recipe.tools.forEach((tool, index) => {
      const prefix = `${slug}.tools[${index}]`;
      if (!tool || typeof tool !== 'object' || Array.isArray(tool)) {
        fail.push(`${prefix} must be an object.`);
        return;
      }
      requireString(tool.name, 3, `${prefix}.name`);
      requireString(tool.purpose, 18, `${prefix}.purpose`);
      requireString(tool.substitute, 8, `${prefix}.substitute`);
      const normalizedName = normalizeText(tool.name ?? '');
      if (normalizedName && toolNames.has(normalizedName)) fail.push(`${prefix}.name duplicates another tool in the same recipe.`);
      if (normalizedName) toolNames.add(normalizedName);
    });
  }

  if (!Array.isArray(recipe.faq) || recipe.faq.length < 3) {
    fail.push(`${slug}.faq must contain at least 3 question and answer entries.`);
  } else {
    const localQuestions = new Set();
    recipe.faq.forEach((item, index) => {
      const prefix = `${slug}.faq[${index}]`;
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        fail.push(`${prefix} must be an object.`);
        return;
      }
      requireString(item.question, 12, `${prefix}.question`);
      requireString(item.answer, 45, `${prefix}.answer`);
      const question = normalizeText(item.question ?? '');
      if (question && localQuestions.has(question)) fail.push(`${prefix}.question duplicates another FAQ in the same recipe.`);
      if (question) {
        localQuestions.add(question);
        const owners = faqQuestions.get(question) ?? new Set();
        owners.add(slug);
        faqQuestions.set(question, owners);
      }
    });
  }

  if (!Array.isArray(recipe.sources) || !recipe.sources.length) recipesWithoutSources += 1;

  if (!Array.isArray(recipe.steps) || recipe.steps.length < 6 || recipe.steps.length > 10) {
    fail.push(`${slug}.steps must contain 6 to 10 complete steps.`);
  } else {
    const stepInstructionText = normalizeText(recipe.steps.flatMap((step) => [
      step?.title,
      step?.outcome,
      step?.productRole,
      step?.action,
      step?.placement,
      step?.completeWhen
    ]).filter(Boolean).join(' '));
    if (!Array.isArray(recipe.palette) || !recipe.palette.length) {
      fail.push(`${slug}.palette must contain at least one named makeup color.`);
    } else {
      recipe.palette.forEach((color, index) => {
        const name = normalizeText(color?.name ?? '');
        if (!name || !stepInstructionText.includes(name)) {
          fail.push(`${slug}.palette[${index}] (${color?.name ?? 'unnamed'}) is never introduced in the tutorial steps.`);
        }
      });
    }

    const stepFive = recipe.steps[4];
    if (recipe.hub !== 'eye-shape-makeup' && stepFive?.visualFocus !== 'upper-lash') {
      fail.push(`${slug}.steps[4] must target upper-lash definition in the full-face sequence.`);
    }
    if (recipe.hub !== 'eye-shape-makeup') {
      const cheekStepIndex = recipe.steps.findIndex((step) => step?.visualFocus === 'cheeks');
      const lipStepIndex = recipe.steps.findIndex((step) => step?.visualFocus === 'lips');
      const cheekStep = recipe.steps[cheekStepIndex];
      if (!cheekStep) {
        fail.push(`${slug} must contain a dedicated cheeks step before the lips step.`);
      } else {
        if (lipStepIndex === -1 || cheekStepIndex >= lipStepIndex) {
          fail.push(`${slug} must place its dedicated cheeks step before its dedicated lips step.`);
        }
        if (!/\blips?\s+remain(?:s)?\s+unchanged\b/i.test(cheekStep.outcome ?? '')) {
          fail.push(`${slug} cheeks step must explicitly keep the lips unchanged until the dedicated lips step.`);
        }
        if (!/\bdo not add\b.*\blips?\b.*\byet\b/i.test(cheekStep.action ?? '')) {
          fail.push(`${slug} cheeks step action must explicitly defer lip color.`);
        }
      }
    }
    if (slug === 'elongated-eye-makeup-round-eyes') {
      const stepFiveText = ['title', 'outcome', 'productRole', 'action', 'placement']
        .map((field) => stepFive?.[field] ?? '')
        .join(' ');
      if (stepFive?.visualFocus !== 'upper-lash' || /\blower\b/i.test(stepFiveText)) {
        fail.push(`${slug}.steps[4] must describe upper-lash definition only and cannot include a lower-eye target.`);
      }
    }
    totalSteps += recipe.steps.length;
    for (let index = 0; index < recipe.steps.length; index += 1) {
      const step = recipe.steps[index];
      const stepNumber = String(index + 1).padStart(2, '0');
      const prefix = `${slug}.steps[${index}]`;
      if (!step || typeof step !== 'object' || Array.isArray(step)) {
        fail.push(`${prefix} must be an object.`);
        continue;
      }

      const missingTextFields = Object.keys(STEP_TEXT_MINIMUMS).filter((field) => typeof step[field] !== 'string' || !step[field].trim());
      if (missingTextFields.length) fail.push(`${prefix} is missing required text fields: ${missingTextFields.join(', ')}.`);
      for (const [field, minLength] of Object.entries(STEP_TEXT_MINIMUMS)) {
        if (typeof step[field] === 'string' && step[field].trim()) requireString(step[field], minLength, `${prefix}.${field}`);
      }

      if (!Number.isInteger(step.durationSeconds) || step.durationSeconds < 5 || step.durationSeconds > 900) {
        fail.push(`${prefix}.durationSeconds must be an integer from 5 to 900.`);
      }
      if (!VISUAL_FOCUS_VALUES.has(step.visualFocus)) {
        fail.push(`${prefix}.visualFocus must be one of: ${[...VISUAL_FOCUS_VALUES].join(', ')}.`);
      }
      const placementRule = VISUAL_FOCUS_PLACEMENT_RULES[step.visualFocus];
      if (placementRule && typeof step.placement === 'string') {
        if (!placementRule.required.test(step.placement)) {
          fail.push(`${prefix}.placement does not name the ${step.visualFocus} target required by visualFocus.`);
        }
        if (placementRule.forbidden?.test(step.placement)) {
          fail.push(`${prefix}.placement includes an off-target region for visualFocus=${step.visualFocus}: ${step.placement}`);
        }
      }

      if (typeof step.image !== 'string' || !step.image.trim()) {
        fail.push(`${prefix}.image is missing.`);
        continue;
      }
      if (hasPlaceholder(step.image)) fail.push(`${prefix}.image contains a placeholder value.`);

      const normalizedImage = step.image.replaceAll('\\', '/').replace(/^\.\//, '');
      const expectedImage = new RegExp('^' + slug + '/step-' + stepNumber + '(?:-curated)?\\.webp$');
      if (!expectedImage.test(normalizedImage)) fail.push(`${prefix}.image should be ${slug}/step-${stepNumber}.webp (or an approved -curated variant), found ${step.image}.`);
      if (isProgressive && normalizedImage !== `${slug}/step-${stepNumber}-curated.webp`) {
        fail.push(`${prefix}.image must use the reviewed -curated filename for ${visualMigration.progressiveStandard}.`);
      }
      if (imagePaths.has(normalizedImage)) fail.push(`${prefix}.image reuses the path from ${imagePaths.get(normalizedImage)}.`);
      else imagePaths.set(normalizedImage, prefix);

      const imageFile = path.resolve(stepAssetRoot, ...normalizedImage.split('/'));
      if (!isInsideStepAssetRoot(imageFile)) {
        fail.push(`${prefix}.image resolves outside src/assets/tutorial-steps.`);
      } else if (existsSync(stepAssetRoot)) {
        if (!existsSync(imageFile)) {
          fail.push(`${prefix}.image does not exist: ${normalizedImage}`);
        } else {
          const imageStat = await stat(imageFile);
          const metadata = await sharp(imageFile).metadata();
          const minimumWidth = isProgressive ? visualMigration.minimumProgressiveWidth : 640;
          const minimumHeight = isProgressive ? visualMigration.minimumProgressiveHeight : 480;
          if (!metadata.width || !metadata.height || metadata.width < minimumWidth || metadata.height < minimumHeight) {
            fail.push(`${prefix}.image must be at least ${minimumWidth}x${minimumHeight}; found ${metadata.width ?? 0}x${metadata.height ?? 0}.`);
          }
          if (isProgressive && metadata.width && metadata.height && Math.abs(metadata.width / metadata.height - 4 / 3) > 0.02) {
            fail.push(`${prefix}.image must use a 4:3 comparison crop; found ${metadata.width}x${metadata.height}.`);
          }
          const minimumBytes = isProgressive ? 80_000 : 8_000;
          if (imageStat.size < minimumBytes) warn.push(`${prefix}.image is unusually small (${imageStat.size} bytes); verify visual quality.`);

          const hash = createHash('sha256').update(await readFile(imageFile)).digest('hex');
          if (imageHashes.has(hash)) fail.push(`${prefix}.image has identical file content to ${imageHashes.get(hash)}.`);
          else imageHashes.set(hash, prefix);
        }
      }

      const normalizedAlt = normalizeText(step.imageAlt ?? '');
      if (normalizedAlt) {
        if (imageAlts.has(normalizedAlt)) fail.push(`${prefix}.imageAlt duplicates ${imageAlts.get(normalizedAlt)}.`);
        else imageAlts.set(normalizedAlt, prefix);
      }
      const normalizedCaption = normalizeText(step.imageCaption ?? '');
      if (normalizedCaption) {
        if (imageCaptions.has(normalizedCaption)) warn.push(`${prefix}.imageCaption duplicates ${imageCaptions.get(normalizedCaption)}.`);
        else imageCaptions.set(normalizedCaption, prefix);
      }
    }
  }

  const textEntries = collectTextEntries(recipe).filter((value) => isMeaningfulString(value, 1));
  for (const value of textEntries) {
    if (hasPlaceholder(value)) fail.push(`${slug} contains placeholder text: "${value.slice(0, 80)}".`);
  }
  const substantiveWords = wordCount(textEntries.join(' '));
  if (substantiveWords < 900) fail.push(`${slug} has only ${substantiveWords} substantive source words; required fields are not providing a complete tutorial.`);
  else if (substantiveWords < 1_200) warn.push(`${slug} has ${substantiveWords} substantive source words; review it for thin explanations.`);

  pageText.set(slug, textEntries.join(' '));
  const longSegments = textEntries.filter((value) => wordCount(value) >= 8);
  pageSegments.set(slug, longSegments);
  for (const segment of new Set(longSegments.map(normalizeText))) {
    const owners = segmentOwners.get(segment) ?? new Set();
    owners.add(slug);
    segmentOwners.set(segment, owners);
  }
}

if (!existsSync(stepAssetRoot)) fail.push('Missing step asset directory: src/assets/tutorial-steps.');

for (const [slug, segments] of pageSegments) {
  let totalWords = 0;
  let repeatedWords = 0;
  for (const segment of segments) {
    const words = wordCount(segment);
    totalWords += words;
    if ((segmentOwners.get(normalizeText(segment))?.size ?? 0) > 1) repeatedWords += words;
  }
  const rate = totalWords ? repeatedWords / totalWords : 0;
  if (rate > DUPLICATE_EXACT_FAIL) fail.push(`${slug} repeats ${(rate * 100).toFixed(1)}% of its long-form text exactly across recipes (fail above ${(DUPLICATE_EXACT_FAIL * 100).toFixed(0)}%).`);
  else if (rate > DUPLICATE_EXACT_WARN) warn.push(`${slug} repeats ${(rate * 100).toFixed(1)}% of its long-form text exactly across recipes (warning above ${(DUPLICATE_EXACT_WARN * 100).toFixed(0)}%).`);
}

const pageShingles = [...pageText].map(([slug, text]) => ({ slug, shingles: shingles(text) }));
const similarPairs = [];
for (let left = 0; left < pageShingles.length; left += 1) {
  for (let right = left + 1; right < pageShingles.length; right += 1) {
    const similarity = jaccard(pageShingles[left].shingles, pageShingles[right].shingles);
    if (similarity > SIMILARITY_WARN) similarPairs.push({ left: pageShingles[left].slug, right: pageShingles[right].slug, similarity });
  }
}
similarPairs.sort((a, b) => b.similarity - a.similarity);
for (const pair of similarPairs.slice(0, 12)) {
  const message = `${pair.left} and ${pair.right} have ${(pair.similarity * 100).toFixed(1)}% three-word-shingle similarity`;
  if (pair.similarity > SIMILARITY_FAIL) fail.push(`${message} (fail above ${(SIMILARITY_FAIL * 100).toFixed(0)}%).`);
  else warn.push(`${message} (warning above ${(SIMILARITY_WARN * 100).toFixed(0)}%).`);
}
if (similarPairs.length > 12) warn.push(`${similarPairs.length - 12} additional recipe pairs exceed the similarity warning threshold.`);

const repeatedFaqQuestions = [...faqQuestions.entries()].filter(([, owners]) => owners.size > 1);
for (const [question, owners] of repeatedFaqQuestions.slice(0, 8)) {
  warn.push(`FAQ question is reused across ${owners.size} recipes: "${question}".`);
}
if (repeatedFaqQuestions.length > 8) warn.push(`${repeatedFaqQuestions.length - 8} additional FAQ questions are reused across recipes.`);
if (recipesWithoutSources) warn.push(`${recipesWithoutSources} of ${recipes.length} recipes have no editorial sources; verify that all factual or safety-sensitive claims are supportable.`);

const printIssues = (heading, issues, limit = 120) => {
  if (!issues.length) return;
  console.error(heading);
  for (const item of issues.slice(0, limit)) console.error(`- ${item}`);
  if (issues.length > limit) console.error(`- ... ${issues.length - limit} additional issues omitted.`);
};

if (fail.length) {
  printIssues('Content quality audit failed:', fail);
  if (warn.length) printIssues('Content quality audit warnings:', warn);
  process.exit(1);
}

if (warn.length) printIssues('Content quality audit warnings:', warn);
console.log(`Content quality audit passed: ${recipes.length} recipes, ${totalSteps} complete steps, ${imageHashes.size} unique step images (${progressiveRecipeCount} progressive, ${legacyRecipeCount} legacy backlog).`);
