# Operator v3 – Working Boundary

This file marks the start of Operator v3 implementation work.

## Locked (do not change without intent)
- Operator v2 APIs
- Diff/apply safety model
- Allowlist enforcement
- No background jobs
- No mutations outside repoPath allowlist
- No hidden writes
- No LLM dependency

## v3 Focus Areas
- Multi-file diff generation (atomic)
- Improved planning structure (still deterministic)
- Safer apply UX (preview, confirm, resume)
- Audit trail persistence
- UI hardening + resumability

## Rule
If a change feels like “fixing v2”, stop.
v2 is stable. v3 is additive.
