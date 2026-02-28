import { useEffect, useMemo, useState } from 'react';
import skills from './data/skills.json';

const MENU_ITEMS = [
  { key: 'home', label: '首页', hash: '#/' },
  { key: 'usage', label: 'Skills 使用文档', hash: '#/usage' },
  { key: 'contrib', label: 'Skills 贡献文档', hash: '#/contrib' },
];

function getMenuFromHash(hash) {
  const normalized = (hash || '').trim();
  if (normalized === '' || normalized === '#' || normalized === '#/') {
    return 'home';
  }
  if (normalized.startsWith('#/usage')) {
    return 'usage';
  }
  if (normalized.startsWith('#/contrib')) {
    return 'contrib';
  }
  return 'home';
}

function App() {
  const [activeMenu, setActiveMenu] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    return getMenuFromHash(window.location.hash);
  });
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncFromHash = () => {
      setActiveMenu(getMenuFromHash(window.location.hash));
    };

    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    }

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);

    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

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
        <h1>Skills 市场</h1>
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
          {filteredSkills.map((skill, index) => {
            const fullDescription = skill.description || 'No description';

            return (
              <article
                className="skill-card rise-in"
                key={`${activeCategory}-${skill.id}`}
                style={{ animationDelay: `${index * 0.02 + 0.05}s` }}
              >
                <div className="skill-head">
                  <div className="skill-avatar">{skill.name.slice(0, 1).toUpperCase()}</div>
                  <div className="skill-title-wrap">
                    <h3 title={skill.name}>{skill.name}</h3>
                    <span title={skill.path}>{skill.path}</span>
                  </div>
                </div>

                <div className="badge-row">
                  <span className="category-pill">{skill.category}</span>
                  {skill.team ? <span className="meta">team: {skill.team}</span> : null}
                </div>

                <div className="desc-wrap">
                  <p>{fullDescription}</p>
                  <div className="desc-tooltip" role="tooltip">
                    {fullDescription}
                  </div>
                </div>
              </article>
            );
          })}

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
    <section className="markdown-page rise-in">
      <article className="markdown-doc">
        <h1>Skills 使用文档（基于 OpenSkills）</h1>
        <p>
          本文档说明如何在项目中安装、读取、同步和更新 skills。默认推荐项目级安装，避免污染全局环境。
        </p>

        <h2>1. 安装 Skills</h2>
        <p>从你的私有 skills 仓库安装（默认安装到当前项目的 <code>.agent/skills</code>）。</p>
        <pre>
          <code>npx openskills install git@github.com:duwenbin0316/skills-repo.git</code>
        </pre>
        <p>如果要安装到全局目录（<code>~/.agent/skills</code>），使用：</p>
        <pre>
          <code>npx openskills install git@github.com:duwenbin0316/skills-repo.git --global</code>
        </pre>

        <h2>2. 查看已安装 Skills</h2>
        <p>列出当前可用 skills：</p>
        <pre>
          <code>npx openskills list</code>
        </pre>
        <p>读取某个 skill 的指令内容：</p>
        <pre>
          <code>npx openskills read &lt;skill-name&gt;</code>
        </pre>

        <h2>3. 同步到 AGENTS.md</h2>
        <p>把已安装 skills 写入 AGENTS.md，供 Agent 自动发现：</p>
        <pre>
          <code>npx openskills sync</code>
        </pre>
        <p>非交互全量同步：</p>
        <pre>
          <code>npx openskills sync --yes</code>
        </pre>

        <h2>4. 更新与移除</h2>
        <p>更新所有已安装 skills：</p>
        <pre>
          <code>npx openskills update</code>
        </pre>
        <p>移除指定 skill：</p>
        <pre>
          <code>npx openskills remove &lt;skill-name&gt;</code>
        </pre>

        <h2>5. 站点数据刷新</h2>
        <p>当新增或调整 skills 后，刷新站点索引：</p>
        <pre>
          <code>{`cd skills-site\nnpm run skills:sync`}</code>
        </pre>
      </article>
    </section>
  );

  const contribView = (
    <section className="markdown-page rise-in">
      <article className="markdown-doc">
        <h1>Skills 贡献文档</h1>
        <p>本规范用于保证仓库内 skills 结构统一、命名一致、可持续维护。</p>

        <h2>1. 目录归属</h2>
        <ul>
          <li>开源技能放在 <code>skills/opensource</code></li>
          <li>内部技能放在 <code>skills/internal/frontend</code> 或 <code>skills/internal/backend</code></li>
        </ul>

        <h2>2. 命名规则</h2>
        <ul>
          <li>前端团队：<code>team-frontend-&lt;skill-name&gt;</code></li>
          <li>后端团队：<code>team-backend-&lt;skill-name&gt;</code></li>
          <li>目录名必须与 <code>SKILL.md</code> frontmatter 里的 <code>name</code> 完全一致</li>
        </ul>

        <h2>3. 最小文件结构</h2>
        <pre>
          <code>{`<skill-name>/\n└── SKILL.md`}</code>
        </pre>
        <p>按需增加：</p>
        <ul>
          <li><code>scripts/</code>：可执行脚本</li>
          <li><code>references/</code>：参考文档</li>
          <li><code>assets/</code>：模板或资源文件</li>
        </ul>

        <h2>4. SKILL.md 编写要求</h2>
        <ul>
          <li>必须包含 YAML frontmatter：<code>name</code>、<code>description</code></li>
          <li><code>description</code> 需要清楚写明“做什么”和“何时触发”</li>
          <li>正文建议按 Workflow 输出，优先写可执行步骤</li>
        </ul>

        <h2>5. 提交流程</h2>
        <ol>
          <li>创建/修改 skill 文件</li>
          <li>刷新站点索引：<code>npm run skills:sync</code></li>
          <li>本地检查页面显示与搜索结果</li>
          <li>提交并推送代码</li>
        </ol>

        <h2>6. 推荐检查命令</h2>
        <pre>
          <code>{`npx openskills list\nnpx openskills read <skill-name>\ncd skills-site && npm run build`}</code>
        </pre>
      </article>
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
              <strong>Skills 市场</strong>
              <p>Registry Portal</p>
            </div>
          </div>

          <nav className="menu-list">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.key}
                className={`menu-item ${activeMenu === item.key ? 'active' : ''}`}
                href={item.hash}
              >
                {item.label}
              </a>
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

          {activeMenu === 'home' ? browseView : null}
          {activeMenu === 'usage' ? usageView : null}
          {activeMenu === 'contrib' ? contribView : null}
        </main>
      </div>
    </div>
  );
}

export default App;
