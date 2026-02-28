import { useMemo, useState } from 'react';
import skills from './data/skills.json';

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

  const internalCount = useMemo(() => {
    return skills.filter((skill) => skill.category === 'internal').length;
  }, []);

  const openSourceCount = useMemo(() => {
    return skills.filter((skill) => skill.category === 'opensource').length;
  }, []);

  return (
    <div className="market">
      <header className="market-header rise-in">
        <div className="market-brand">
          <span className="brand-dot" />
          Skills.so
        </div>
        <nav className="market-nav">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button type="button" className="market-cta">Sync</button>
      </header>

      <main className="market-main">
        <section id="home" className="hero rise-in">
          <p className="hero-pill">Skills Marketplace</p>
          <h1>Find Awesome Skills for Your Agent Stack</h1>
          <p className="hero-subtitle">
            统一管理开源与内部 skills，支持搜索、筛选与快速浏览。
          </p>

          <div className="search-row">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 skill 名称、描述、路径、团队"
            />
            <span className="count-pill">{filteredSkills.length} / {skills.length}</span>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <strong>{skills.length}</strong>
              <span>Total Skills</span>
            </div>
            <div className="stat-card">
              <strong>{openSourceCount}</strong>
              <span>Open Source</span>
            </div>
            <div className="stat-card">
              <strong>{internalCount}</strong>
              <span>Internal</span>
            </div>
            <div className="stat-card">
              <strong>{categories.length - 1}</strong>
              <span>Categories</span>
            </div>
          </div>
        </section>

        <section id="skills" className="tabs-wrap rise-in">
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
        </section>

        <section className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <article
              className="skill-card rise-in"
              key={skill.id}
              style={{ animationDelay: `${index * 0.025 + 0.06}s` }}
            >
              <div className="skill-head">
                <span className="skill-avatar">{skill.name.slice(0, 1).toUpperCase()}</span>
                <div className="skill-title-wrap">
                  <h3>{skill.name}</h3>
                  <span className="skill-path">{skill.path}</span>
                </div>
                <span className="badge">{skill.category}</span>
              </div>

              <p>{skill.description || 'No description'}</p>

              <div className="meta-row">
                {skill.team ? <span className="meta">team: {skill.team}</span> : null}
              </div>
            </article>
          ))}

          {filteredSkills.length === 0 ? (
            <div className="empty rise-in">
              <h4>没有匹配结果</h4>
              <p>换个关键词试试，或清空分类筛选。</p>
            </div>
          ) : null}
        </section>

        <section id="faq" className="faq rise-in">
          <h2>FAQ</h2>
          <div className="faq-item">
            <h4>这些 skills 来自哪里？</h4>
            <p>来源于 `skills/opensource` 和 `skills/internal`，页面会自动扫描 `SKILL.md` 生成列表。</p>
          </div>
          <div className="faq-item">
            <h4>如何新增 skill？</h4>
            <p>在对应目录创建新 skill 并补充 `SKILL.md`，运行 `npm run skills:sync` 即可刷新。</p>
          </div>
        </section>
      </main>

      <footer className="market-footer">
        <p>Built for Skills Registry · opensource + internal</p>
      </footer>
    </div>
  );
}

export default App;
