# Documentation Templates

## README Template

```md
# Project Name

One-line value proposition.

## Prerequisites

- Requirement 1
- Requirement 2

## Quick Start

```bash
command-1
command-2
```

## Usage

### Common Tasks

- Task A
- Task B

## Configuration

| Key | Default | Description |
| --- | --- | --- |
| EXAMPLE_KEY | value | Description |

## Troubleshooting

### Problem A
Cause and fix.

## Contributing

Contribution flow summary.
```

## API Guide Template

```md
# API Name

## Endpoint

`POST /v1/example`

## Request

### Headers

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | Bearer token |

### Body

```json
{
  "field": "value"
}
```

## Response

```json
{
  "ok": true
}
```

## Errors

| Code | Meaning | Action |
| --- | --- | --- |
| 400 | Bad request | Fix payload |
| 401 | Unauthorized | Refresh token |
```

## Migration Note Template

```md
# Migration: X to Y

## Why this change

Reason and impact.

## Breaking changes

- Change A
- Change B

## Upgrade steps

1. Step one
2. Step two
3. Verify

## Rollback

Exact rollback commands.
```
