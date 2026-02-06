# Operator v3 – Scope & Intent

## What v2 already guarantees (do NOT break)
- Build passes: `npm run build`
- Dev works: `npm run dev`
- Operator loop works end-to-end:
  snapshot → plan → approve → diff → approve → apply → test
- Checkpoints:
  - list
  - restore (dry-run + apply)
- History page is fully local-first and stable
- No writes outside repoPath allowlist
- Atomic apply with before-files saved

## Operator v3 goals (NEW work only)

### 1. Multi-file diffs (real)
- One plan → many diffs
- Diffs must be:
  - explicit
  - repo-relative
  - allowlisted
- UI shows per-file approval (not all-or-nothing)

### 2. Deterministic planning upgrades
- Plan must include:
  - target files
  - intent per file
- No AI required yet (rules-based OK)

### 3. Safer apply UX
- Show:
  - before / after preview
  - bytes changed
- Enforce:
  - dryRun default = true
  - explicit human confirmation

### 4. Operator UI hardening
- No state desync if:
  - refresh
  - API error
  - partial failure
- Resume run from disk state

### 5. Audit trail
- Persist:
  - last plan
  - last diff(s)
  - last apply
  - last test output
- Viewable in UI
- Exportable as JSON

## Explicit non-goals (for v3)
- No LLM dependency
- No background jobs
- No repo mutation outside allowlist
- No UI redesign for beauty

## Success definition
- Can stop mid-run, reload page, and continue safely
- Can apply multi-file changes with confidence
- Can explain every write the operator makes
