# Code Review Checklist

## Correctness

- Does behavior match the stated requirement?
- Are boundary conditions handled?
- Are null/undefined/empty inputs handled safely?

## Security

- Any injection vectors (SQL, shell, template, HTML)?
- Any auth/authz bypass possibilities?
- Any secret leakage in logs or responses?

## Data Safety

- Any destructive operation without guardrails?
- Are migrations backward compatible?
- Is rollback strategy clear?

## Reliability

- Are retries/timeouts/circuit behavior defined where needed?
- Are async race conditions possible?
- Are errors surfaced and handled consistently?

## Performance

- Any obvious N+1 or repeated heavy work?
- Any unbounded loops/memory growth risks?
- Any blocking operations on hot paths?

## Maintainability

- Is naming clear and intention-revealing?
- Is control flow understandable?
- Are abstractions appropriate and not overengineered?

## Test Coverage

- Are critical paths covered?
- Are negative and edge cases tested?
- Are regression tests added for changed behavior?
