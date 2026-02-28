import { useMemo, useState } from 'react';
import skills from './data/skills.json';

const MENU_ITEMS = [
  { key: 'browse', label: '浏览所有 Skills' },
  { key: 'usage', label: 'Skills 使用文档' },
  { key: 'contrib', label: 'Skills 贡献文档' },
];

const USAGE_DOCS = [
  {
    title: '安装仓库 Skills',
    content: '从私有仓库安装并在项目中使用 skills。',
    code: 'npx openskills install git@github.com:duwenbin0316/skills-repo.git',
  },
  {
    title: '读取 Skill 指令',
    content: '查看指定 skill 的内容，便于排查触发逻辑。',
    code: 'npx openskills read <skill-name>',
  },
  {
    title: '同步到 AGENTS.md',
    content: '把当前可用 skills 汇总写入 AGENTS.md。',
    code: 'npx openskills sync',
  },
  {
    title: '刷新站点索引',
    content: '重新扫描 skills 目录并更新站点数据。',
    code: 'cd skills-site && npm run skills:sync',
  },
];

const CONTRIBUTION_DOCS = [
  {
    title: '目录选择',
    content: '开源 skill 放到 skills/opensource；内部 skill 放到 skills/internal/<team>。',
  },
  {
    title: '命名规范',
    content: '内部 skill 使用前缀：cmbc-apollo-* 或 cmbc-tesla-*；目录名与 SKILL.md 中 name 必须一致。',
  },
  {
    title: '最小结构',
    content: '每个 skill 至少包含 SKILL.md；可按需增加 scripts/ references/ assets/。',
  },
  {
    title: '提交前检查',
    content: '执行 npm run skills:sync，确认站点能搜索到新增 skill，再提交并推送。',
  },
];

function App() {
  const [activeMenu, setActiveMenu] = useState('browse');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => {
    const names = Array.from(new Set(skills.map((s) => s.category))).sort();
    return ['all', ...names];
  }, []);

  const filteredSkills = useMemo(() => {
    const term = query.trim().toLowerCase();

    return skills.filter((skill) => {
      if (activeCategory !== 'all' && skill.category !== activeCategory) {
        return false;
      }

      if (!term) {
        return true;
      }

      const haystack = [
        skill.name,
        skill.description,
        skill.path,
        skill.category,
        skill.team || '',
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [query, activeCategory]);

  const totalCategories = categories.length - 1;

  const browseView = (
    <>
      <section className="hero-box rise-in">
        <h1>Find Awesome Skills for Your Agent Workspace</h1>
        <p>统一管理开源与内部 skills，支持搜索、分类筛选和快速浏览。</p>

        <div className="search-row">
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search with keywords"
          />
        </div>

        <div className="tag-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`tag ${activeCategory === category ? 'tag-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="stats-row">
          <span>{skills.length} Skills</span>
          <span>{filteredSkills.length} Matched</span>
          <span>{totalCategories} Categories</span>
        </div>
      </section>

      <section className="skills-panel rise-in">
        <div className="panel-head">
          <h2>Skills Directory</h2>
          <span>{filteredSkills.length} items</span>
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <article
              className="skill-card rise-in"
              key={skill.id}
              style={{ animationDelay: `${index * 0.02 + 0.05}s` }}
            >
              <div className="skill-head">
                <div className="skill-avatar">{skill.name.slice(0, 1).toUpperCase()}</div>
                <div className="skill-title-wrap">
                  <h3>{skill.name}</h3>
                  <span>{skill.path}</span>
                </div>
                <span className="category-pill">{skill.category}</span>
              </div>

              <p>{skill.description || 'No description'}</p>

              <div className="meta-row">
                {skill.team ? <span className="meta">team: {skill.team}</span> : null}
              </div>
            </article>
          ))}

          {filteredSkills.length === 0 ? (
            <div className="empty-box">
              <h4>没有匹配结果</h4>
              <p>可以尝试更换关键字，或切换分类标签。</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );

  const usageView = (
    <section className="doc-panel rise-in">
      <h2>Skills 使用文档</h2>
      <p className="doc-intro">以下是常用操作命令，覆盖安装、读取、同步和站点刷新。</p>

      <div className="doc-grid">
        {USAGE_DOCS.map((item) => (
          <article key={item.title} className="doc-card">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <pre>{item.code}</pre>
          </article>
        ))}
      </div>
    </section>
  );

  const contribView = (
    <section className="doc-panel rise-in">
      <h2>Skills 贡献文档</h2>
      <p className="doc-intro">贡献前先确认目录归属、命名规范和最小结构，确保后续维护一致。</p>

      <div className="doc-grid">
        {CONTRIBUTION_DOCS.map((item) => (
          <article key={item.title} className="doc-card">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mcp-layout">
      <div className="top-strip">Skills Registry · MCP-style Directory</div>

      <div className="page-shell">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <span className="brand-box">S</span>
            <div>
              <strong>Skills.so</strong>
              <p>Registry Portal</p>
            </div>
          </div>

          <nav className="menu-list">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`menu-item ${activeMenu === item.key ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-foot">
            <span>Total: {skills.length}</span>
            <span>Categories: {totalCategories}</span>
          </div>
        </aside>

        <main className="content">
          <header className="content-topbar">
            <button type="button">+ Submit</button>
            <span>English</span>
          </header>

          {activeMenu === 'browse' ? browseView : null}
          {activeMenu === 'usage' ? usageView : null}
          {activeMenu === 'contrib' ? contribView : null}
        </main>
      </div>
    </div>
  );
}

export default App;
