const fs = require('fs');
const path = require('path');

const prismDir = path.dirname(require.resolve('prismjs/package.json'));
const componentsDir = path.join(prismDir, 'components');

const coreComponents = [
  'prism-core.js',
  'prism-markup.js',
  'prism-clike.js',
  'prism-c.js',
  'prism-javascript.js',
  'prism-css.js',
  'prism-ruby.js',
  'prism-cpp.js',
];

// Get all non-minified component files
const allComponents = fs.readdirSync(componentsDir)
  .filter(file => file.startsWith('prism-') && file.endsWith('.js') && !file.endsWith('.min.js'));

// Filter to ensure core components come first, then others
const orderedComponents = [
  ...coreComponents,
  ...allComponents.filter(c => !coreComponents.includes(c))
];

const outputPath = path.join(prismDir, 'prism.js');
console.log(`Building Prism.js to ${outputPath}...`);

const content = orderedComponents.map(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    console.warn(`Warning: Component ${file} not found.`);
    return '';
  }
}).join('\n');

fs.writeFileSync(outputPath, content);
console.log('Prism.js build complete.');
