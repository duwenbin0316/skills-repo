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
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  return {
    name: (nameMatch?.[1] || '').trim(),
    description: (descMatch?.[1] || '').trim(),
  };
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
