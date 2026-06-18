import fs from 'fs';
import path from 'path';

const redirectsTsPath = path.join(process.cwd(), 'src/data/redirects.ts');
const redirectsFile = path.join(process.cwd(), 'public/_redirects');

let hasErrors = false;

function reportError(msg) {
  console.error(`❌ ERROR: ${msg}`);
  hasErrors = true;
}

console.log('Validating public/_redirects...');
if (fs.existsSync(redirectsFile)) {
  const content = fs.readFileSync(redirectsFile, 'utf8');
  const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

  const fromSet = new Set();

  lines.forEach(line => {
    const parts = line.split(/\s+/);
    if (parts.length !== 3) {
      reportError(`Invalid format in _redirects: ${line}`);
      return;
    }

    const [from, to, statusStr] = parts;
    const status = parseInt(statusStr, 10);

    if (fromSet.has(from)) {
      reportError(`Duplicate from path: ${from}`);
    }
    fromSet.add(from);

    if (from === to) {
      reportError(`from and to are identical: ${from}`);
    }

    if (!from.startsWith('/')) {
      reportError(`from must start with /: ${from}`);
    }

    if (!to.startsWith('/') && !to.startsWith('https://')) {
      reportError(`to must start with / or https://: ${to}`);
    }

    if (status !== 301 && status !== 302) {
      reportError(`status must be 301 or 302: ${status} for ${from}`);
    }

    if (from === '/' || from === '/*') {
      reportError(`Catch-all homepage redirect is not allowed: ${from}`);
    }

    // Obvious loop check
    if (to === from || to === `${from}/`) {
      reportError(`Obvious redirect loop: ${from} -> ${to}`);
    }
  });
} else {
  console.log('public/_redirects not found, skipping file validation.');
}

// Basic regex parse of TS file to check for catch-all and loops
console.log('Validating src/data/redirects.ts (basic checks)...');
if (fs.existsSync(redirectsTsPath)) {
  const content = fs.readFileSync(redirectsTsPath, 'utf8');

  // A naive regex to extract { from: "...", to: "...", status: ..., migrationStatus: "ready" }
  // This is a basic fallback without setting up ts-node
  const redirectMatches = content.match(/\{[^}]+\}/g);
  if (redirectMatches) {
    const fromSet = new Set();

    for (const match of redirectMatches) {
      if (!match.includes('from:') || !match.includes('to:')) continue;

      const fromMatch = match.match(/from:\s*['"]([^'"]+)['"]/);
      const toMatch = match.match(/to:\s*['"]([^'"]*)['"]/);
      const statusMatch = match.match(/status:\s*(\d+)/);
      const migrationMatch = match.match(/migrationStatus:\s*['"]([^'"]+)['"]/);

      if (!fromMatch || !toMatch) continue;

      const from = fromMatch[1];
      const to = toMatch[1];
      const status = statusMatch ? parseInt(statusMatch[1], 10) : 301;
      const migrationStatus = migrationMatch ? migrationMatch[1] : '';

      if (fromSet.has(from)) {
        reportError(`Duplicate from path in redirects.ts: ${from}`);
      }
      fromSet.add(from);

      if (migrationStatus === 'ready' && from === to) {
        reportError(`from and to are identical in redirects.ts: ${from}`);
      }

      if (!from.startsWith('/')) {
        reportError(`from must start with / in redirects.ts: ${from}`);
      }

      if (to && !to.startsWith('/') && !to.startsWith('https://')) {
        reportError(`to must start with / or https:// in redirects.ts: ${to}`);
      }

      if (status !== 301 && status !== 302) {
        reportError(`status must be 301 or 302 in redirects.ts: ${status} for ${from}`);
      }

      if (from === '/' || from === '/*') {
        reportError(`Catch-all homepage redirect is not allowed in redirects.ts: ${from}`);
      }

      if (migrationStatus === 'ready' && !to) {
        reportError(`Ready redirect must have a target in redirects.ts: ${from}`);
      }
    }
  }
} else {
  console.log('src/data/redirects.ts not found, skipping.');
}

if (hasErrors) {
  console.error('❌ Validation failed.');
  process.exit(1);
} else {
  console.log('✅ Validation passed.');
  process.exit(0);
}
