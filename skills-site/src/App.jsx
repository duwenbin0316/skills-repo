import { useMemo, useState } from 'react';
import skills from './data/skills.json';

const featureCards = [
  {
    key: 'import',
    title: 'Skills 引入',
    description: '支持从 opensource 与 internal 两类仓库统一纳管，降低接入成本。',
    icon: 'IN',
  },
  {
    key: 'manage',
    title: 'Skills 管理',
    description: '按分类和团队组织 skills，保持目录清晰并支持持续扩展。',
    icon: 'MG',
  },
  {
    key: 'search',
    title: 'Skills 搜索',
    description: '支持按名称、描述、路径和团队快速检索，定位更高效。',
    icon: 'SR',
  },
  {
    key: 'browse',
    title: 'Skills 浏览',
    description: '卡片化展示关键信息，便于快速理解 skill 用途与归属。',
    icon: 'UI',
  },
];

function App() {
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

  const internalCount = useMemo(
    () => skills.filter((skill) => skill.category === 'internal').length,
    []
  );

  return (
    <div className="portal">
      <header className="topbar rise-in">
        <div className="brand">
          <span className="brand-dot" />
          Skills Hub
        </div>
        <nav className="top-nav">
          <a href="#overview">总览</a>
          <a href="#features">功能</a>
          <a href="#registry">Skills 列表</a>
        </nav>
        <button type="button" className="top-cta">立即体验</button>
      </header>

      <main className="main">
        <section id="overview" className="hero rise-in">
          <div className="hero-copy">
            <p className="hero-tag">AI SKILLS PORTAL</p>
            <h1>AI Skills 管理中心</h1>
            <p className="hero-subtitle">
              统一展示并检索可用 skills，支持智能化沉淀、复用与协作。
            </p>
            <div className="hero-stats">
              <div className="stat">
                <strong>{skills.length}</strong>
                <span>总 Skills</span>
              </div>
              <div className="stat">
                <strong>{categories.length - 1}</strong>
                <span>分类数</span>
              </div>
              <div className="stat">
                <strong>{internalCount}</strong>
                <span>内部 Skills</span>
              </div>
            </div>
          </div>
          <svg className="network-bg" viewBox="0 0 1200 460" aria-hidden="true">
            <path d="M30 340 C190 240, 280 360, 440 275 S740 210, 1160 300" />
            <path d="M20 365 C210 270, 350 390, 520 290 S820 220, 1180 332" />
            <path d="M90 325 C300 250, 470 360, 625 285 S900 225, 1130 280" />
            <line x1="160" y1="315" x2="260" y2="235" />
            <line x1="260" y1="235" x2="410" y2="270" />
            <line x1="410" y1="270" x2="515" y2="205" />
            <line x1="515" y1="205" x2="650" y2="252" />
            <line x1="650" y1="252" x2="780" y2="192" />
            <line x1="780" y1="192" x2="915" y2="245" />
            <line x1="915" y1="245" x2="1040" y2="198" />
            <circle cx="160" cy="315" r="9" />
            <circle cx="260" cy="235" r="11" />
            <circle cx="410" cy="270" r="8" />
            <circle cx="515" cy="205" r="12" />
            <circle cx="650" cy="252" r="9" />
            <circle cx="780" cy="192" r="10" />
            <circle cx="915" cy="245" r="12" />
            <circle cx="1040" cy="198" r="10" />
          </svg>
        </section>

        <section id="features" className="feature-grid">
          {featureCards.map((item, index) => (
            <article
              key={item.key}
              className="feature-card rise-in"
              style={{ animationDelay: `${index * 0.05 + 0.08}s` }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section id="registry" className="registry-panel rise-in">
          <div className="panel-head">
            <h3>可用 Skills</h3>
            <span className="count-pill">{filteredSkills.length} / {skills.length}</span>
          </div>

          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 skill 名称、描述、路径、团队"
            />
          </div>

          <div className="chips">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${activeCategory === category ? 'chip-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <article
                className="skill-card rise-in"
                key={skill.id}
                style={{ animationDelay: `${index * 0.03 + 0.1}s` }}
              >
                <div className="card-head">
                  <h4>{skill.name}</h4>
                  <span className="badge">{skill.category}</span>
                </div>
                <p>{skill.description || 'No description'}</p>
                <div className="meta-row">
                  {skill.team ? <span className="meta">team: {skill.team}</span> : null}
                  <span className="meta path">{skill.path}</span>
                </div>
              </article>
            ))}

            {filteredSkills.length === 0 ? (
              <div className="empty rise-in">
                <h4>没有匹配结果</h4>
                <p>换个关键词试试，或清空分类筛选。</p>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h5>系统模块</h5>
          <p>Skills Registry</p>
          <p>Skills Site</p>
          <p>OpenSkills</p>
        </div>
        <div>
          <h5>内部团队</h5>
          <p>Apollo</p>
          <p>Tesla</p>
          <p>Platform</p>
        </div>
        <div>
          <h5>开源来源</h5>
          <p>anthropics/skills</p>
          <p>skill-creator</p>
          <p>docx / pdf / xlsx</p>
        </div>
        <div>
          <h5>关于</h5>
          <p>AI 提示词管理</p>
          <p>静态化展示</p>
          <p>可搜索可扩展</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
