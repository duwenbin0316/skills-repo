import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..', '..');
const skillsRoot = join(repoRoot, 'skills');
const outputFile = join(repoRoot, 'skills-site', 'src', 'data', 'skills.json');

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { name: '', description: '' };
  }

  const frontmatter = match[1];
  const name = extractScalar(frontmatter, 'name');
  const description = extractDescription(frontmatter);

  return {
    name,
    description,
  };
}

function extractScalar(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(.+)$`, 'm');
  const match = frontmatter.match(regex);
  if (!match) {
    return '';
  }
  const value = match[1].trim();
  return unquote(value);
}

function extractDescription(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  let descIndex = -1;
  let indicator = '';

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^description:\s*(.*)$/);
    if (match) {
      descIndex = index;
      indicator = match[1].trim();
      break;
    }
  }

  if (descIndex === -1) {
    return '';
  }

  // Single-line scalar: description: text...
  if (indicator && !/^[|>][-+]?$/.test(indicator)) {
    return unquote(indicator);
  }

  const blockLines = [];
  for (let index = descIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === '') {
      blockLines.push('');
      continue;
    }

    // Stop at next top-level key (e.g. license:, metadata:)
    if (/^[A-Za-z0-9_-]+:\s*/.test(line)) {
      break;
    }

    // Keep only lines indented under description
    if (/^\s+/.test(line)) {
      blockLines.push(line);
      continue;
    }

    break;
  }

  if (blockLines.length === 0) {
    return '';
  }

  const nonEmptyLines = blockLines.filter((line) => line.trim() !== '');
  const minIndent = Math.min(
    ...nonEmptyLines.map((line) => (line.match(/^(\s*)/)?.[1].length ?? 0))
  );
  const normalized = blockLines.map((line) =>
    line.trim() === '' ? '' : line.slice(minIndent).trimEnd()
  );

  // Literal block scalar: preserve line breaks.
  if (/^\|[-+]?$/.test(indicator)) {
    return normalized.join('\n').trim();
  }

  // Folded style (including "description:" followed by indented lines):
  // collapse wrapped lines into one paragraph, keep blank-line paragraph breaks.
  const folded = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      folded.push(paragraph.join(' '));
      paragraph = [];
    }
  };

  for (const line of normalized) {
    if (line === '') {
      flushParagraph();
      if (folded.length > 0 && folded[folded.length - 1] !== '') {
        folded.push('');
      }
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();

  return folded.join('\n').trim();
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function findSkillDirs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const hasSkillFile = entries.some((entry) => entry.isFile() && entry.name === 'SKILL.md');

  if (hasSkillFile) {
    return [dir];
  }

  const result = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    result.push(...findSkillDirs(join(dir, entry.name)));
  }

  return result;
}

function normalizeSkill(skillDir) {
  const skillMdPath = join(skillDir, 'SKILL.md');
  const content = readFileSync(skillMdPath, 'utf-8');
  const frontmatter = extractFrontmatter(content);

  const relPath = relative(repoRoot, skillDir).replaceAll('\\', '/');
  const segments = relative(skillsRoot, skillDir).split(/[/\\]/).filter(Boolean);
  const category = segments[0] || 'unknown';
  const team = category === 'internal' && segments.length >= 3 ? segments[1] : null;
  const dirName = segments[segments.length - 1] || frontmatter.name || 'unknown-skill';

  return {
    id: relPath,
    name: frontmatter.name || dirName,
    description: frontmatter.description,
    path: relPath,
    category,
    team,
  };
}

function main() {
  if (!statSync(skillsRoot).isDirectory()) {
    throw new Error(`skills directory not found: ${skillsRoot}`);
  }

  const skills = findSkillDirs(skillsRoot)
    .map((skillDir) => normalizeSkill(skillDir))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  writeFileSync(outputFile, `${JSON.stringify(skills, null, 2)}\n`, 'utf-8');
  console.log(`Generated ${skills.length} skills -> ${relative(repoRoot, outputFile)}`);
}

main();
