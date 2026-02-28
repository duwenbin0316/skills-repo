# 项目熟悉笔记（skills-repo）

## 1. 项目定位
- 这是一个 **Skills 仓库模板**，用于集中维护可被 OpenSkills 安装与发现的技能集合。
- 技能以目录形式组织，任何包含 `SKILL.md` 的目录都会被识别为可安装 skill。

## 2. 顶层结构
- `skills/`：核心技能目录。
  - `skills/opensource/`：同步/收录开源通用 skills。
  - `skills/internal/`：团队内部 skills（按 frontend/backend 再分层）。
- `skills-site/`：React + Vite 静态站点，用于浏览与检索仓库里的 skills。
- `spec/agent-skills-spec.md`：Agent Skills 规范说明（含 `SKILL.md` frontmatter 约束）。
- `template/SKILL.md`：新 skill 的模板文件。

## 3. 关键约定
- 内部 skill 命名约定：`team-<domain>-<skill-name>`（如 frontend/backend）。
- `SKILL.md` frontmatter 的 `name` 应与目录名一致。
- `description` 需要描述“做什么 + 何时使用”，便于 agent 触发。

## 4. skills-site 工作方式
- 数据来源：`skills-site/scripts/generate-skills-json.mjs` 递归扫描 `../skills`。
- 扫描规则：目录中存在 `SKILL.md` 即纳入索引。
- 产物文件：`skills-site/src/data/skills.json`。
- 页面能力：按分类浏览、关键词搜索、使用文档与贡献文档展示。

## 5. 常用命令
- 仓库安装：
  - `npx openskills install git@github.com:<org-or-user>/skills.git`
- 站点本地开发：
  - `cd skills-site`
  - `npm install`
  - `npm run skills:sync`
  - `npm run dev`
- 构建：
  - `npm run build`

## 6. 新同学快速上手建议
1. 先阅读根目录 `README.md` 了解仓库目标与命名规范。
2. 按 `template/SKILL.md` 或 skill-creator 脚本创建内部 skill。
3. 运行 `npm run skills:sync` 刷新站点索引并在 `skills-site` 验证展示。
4. 提交前检查 skill 目录名与 frontmatter `name` 一致。
