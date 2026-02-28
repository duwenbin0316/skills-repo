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

  return (
    <div className="page">
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />

      <main className="content">
        <header className="hero rise-in">
          <p className="eyebrow">Skills Registry</p>
          <h1>可用 Skills 展示台</h1>
          <p className="hero-text">
            自动读取仓库中的 <code>SKILL.md</code>，支持关键词搜索与分类筛选。
          </p>
        </header>

        <section className="panel rise-in delay-1">
          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 skill 名称、描述、路径、团队"
            />
            <span className="count-pill">{filteredSkills.length} / {skills.length}</span>
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
        </section>

        <section className="grid">
          {filteredSkills.map((skill, index) => (
            <article
              className="card rise-in"
              key={skill.id}
              style={{ animationDelay: `${index * 0.04 + 0.08}s` }}
            >
              <div className="card-head">
                <h2>{skill.name}</h2>
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
              <h3>没有匹配结果</h3>
              <p>换个关键词试试，或清空分类筛选。</p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
