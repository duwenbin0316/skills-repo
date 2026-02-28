# Agent Skills 规范

Agent Skills 的完整格式规范。

本文档定义了 Agent Skills 的格式。

来源：<https://agentskills.io/specification>

## 目录结构

一个 skill 至少是一个包含 `SKILL.md` 文件的目录：

```text
skill-name/
└── SKILL.md          # 必需
```

你也可以按需添加额外目录来支撑 skill，例如 `scripts/`、`references/` 和 `assets/`。

## SKILL.md 格式

`SKILL.md` 必须包含 YAML frontmatter，后接 Markdown 内容。

### Frontmatter（必需）

```yaml
---
name: skill-name
description: 这个 skill 做什么、何时使用的说明。
---
```

带可选字段的示例：

```yaml
---
name: pdf-processing
description: 从 PDF 中提取文本和表格、填写表单、合并文档。
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---
```

字段约束：

| 字段 | 必需 | 约束 |
| --- | --- | --- |
| `name` | 是 | 最长 64 个字符。仅允许小写字母、数字和连字符。不能以连字符开头或结尾。 |
| `description` | 是 | 最长 1024 个字符。非空。描述 skill 做什么、以及何时使用。 |
| `license` | 否 | 许可证名称或指向随包附带许可证文件的引用。 |
| `compatibility` | 否 | 最长 500 个字符。用于说明环境要求（目标产品、系统依赖、网络访问等）。 |
| `metadata` | 否 | 任意键值映射，用于附加元数据。 |
| `allowed-tools` | 否 | 以空格分隔的预批准工具列表（实验性）。 |

#### `name` 字段

必需的 `name` 字段：

- 长度必须为 1-64 个字符
- 只能包含小写字母、数字和连字符（`a-z`、`0-9`、`-`）
- 不能以 `-` 开头或结尾
- 不能包含连续连字符（`--`）
- 必须与父目录名称一致

有效示例：

```yaml
name: pdf-processing
```

```yaml
name: data-analysis
```

```yaml
name: code-review
```

无效示例：

```yaml
name: PDF-Processing  # 不允许大写
```

```yaml
name: -pdf  # 不能以连字符开头
```

```yaml
name: pdf--processing  # 不允许连续连字符
```

#### `description` 字段

必需的 `description` 字段：

- 长度必须为 1-1024 个字符
- 应同时描述 skill 做什么，以及何时使用
- 应包含有助于 agent 识别任务场景的关键词

较好示例：

```yaml
description: 从 PDF 文件提取文本和表格，填写 PDF 表单，并合并多个 PDF。当处理 PDF 文档，或用户提到 PDF、表单、文档提取时使用。
```

较差示例：

```yaml
description: 帮助处理 PDF。
```

#### `license` 字段

可选的 `license` 字段：

- 指定该 skill 采用的许可证
- 建议保持简短（许可证名称，或附带许可证文件名）

示例：

```yaml
license: Proprietary. LICENSE.txt has complete terms
```

#### `compatibility` 字段

可选的 `compatibility` 字段：

- 提供时长度必须为 1-500 个字符
- 仅当 skill 有明确环境要求时才建议填写
- 可描述目标产品、系统依赖、网络访问需求等

示例：

```yaml
compatibility: Designed for Claude Code (or similar products)
```

```yaml
compatibility: Requires git, docker, jq, and access to the internet
```

大多数 skill 不需要 `compatibility` 字段。

#### `metadata` 字段

可选的 `metadata` 字段：

- 由字符串键到字符串值组成的映射
- 客户端可用它保存 Agent Skills 规范未定义的附加属性
- 建议键名具备一定唯一性，避免冲突

示例：

```yaml
metadata:
  author: example-org
  version: "1.0"
```

#### `allowed-tools` 字段

可选的 `allowed-tools` 字段：

- 以空格分隔的工具列表，表示这些工具被预批准可执行
- 实验性字段，不同 agent 实现对其支持程度可能不同

示例：

```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

### Body 内容

frontmatter 之后的 Markdown 正文用于写 skill 指令。正文没有固定格式限制，应写入能帮助 agent 更有效执行任务的内容。建议包含：

- 分步骤说明
- 输入/输出示例
- 常见边界情况

注意：一旦 agent 决定激活某个 skill，会加载整个 `SKILL.md`。对于较长内容，建议拆分到外部引用文件。

## 可选目录

### `scripts/`

包含 agent 可执行的代码。脚本应：

- 尽量自包含，或清晰说明依赖
- 提供清晰可读的错误信息
- 对边界情况有合理处理

支持的脚本语言取决于具体 agent 实现。常见包括 Python、Bash、JavaScript。

### `references/`

包含按需读取的补充文档，例如：

- `REFERENCE.md`：详细技术参考
- `FORMS.md`：表单模板或结构化数据格式
- 领域文件（如 `finance.md`、`legal.md`）

建议将单个引用文件保持聚焦。agent 按需加载这些文件，文件越小，上下文占用越低。

### `assets/`

包含静态资源，例如：

- 模板（文档模板、配置模板）
- 图片（示意图、示例图）
- 数据文件（查找表、schema）

## 逐级披露（Progressive disclosure）

skill 应按高效上下文使用原则组织：

1. 元数据（约 100 tokens）：启动时加载所有 skill 的 `name` 与 `description`
2. 指令（建议小于 5000 tokens）：skill 被激活时加载完整 `SKILL.md` 正文
3. 资源（按需）：仅在需要时加载文件（如 `scripts/`、`references/`、`assets/`）

建议将主 `SKILL.md` 控制在 500 行以内；详细参考内容放入独立文件。

## 文件引用

在 skill 内引用其他文件时，请使用从 skill 根目录开始的相对路径：

```md
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

保持从 `SKILL.md` 出发的一层引用深度，避免过深的嵌套引用链。

## 校验

使用 `skills-ref` 参考库校验你的 skill：

```bash
skills-ref validate ./my-skill
```

该命令会检查 `SKILL.md` frontmatter 是否有效，并验证是否符合命名规范。
