# Repo Hygiene Audit

Audit date: 2026-06-02

Scope: CodexForge frontend hygiene pass from `C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend`.

## Git status at audit time

`git status --short` returned clean before this cleanup pass.

`git ls-files --others --exclude-standard` returned no untracked files before this cleanup pass.

Latest observed commit:

```text
b40adfa Add CodexForge local GPU render queue planning
```

## Generated and local categories found

Ignored/generated local folders present in or near the frontend included:

- `.checkpoints/`
- `.codexforge/`
- `.next/`
- `.operator/`
- `node_modules/`
- `_codexforge-backups/`
- `unpushed-patches/`
- `.env.local`
- `tsconfig.tsbuildinfo`
- `codexforge-unpushed-commits.bundle`

The Git root also had local ignored cache/runtime categories such as `.pytest_cache/` and `tests/__pycache__/`.

## Tracked generated or local-looking files

The Git root already tracks `.operator` checkpoint/run files and several odd root-level files with mojibake-like names. This pass did not delete or untrack them.

The frontend also tracks `docs/scratch/*.txt` map files. They were left in place and documented as a manual cleanup candidate because deleting tracked files was outside this mission.

## Untracked file summary

No untracked files were reported by `git ls-files --others --exclude-standard` before edits.

## Potential duplicate project paths

Canonical frontend path:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

Unverified duplicate or scratch candidate:

```text
C:\ai-lab\projects\tools\health-tracker
```

The tools copy exists but was not a Git repository during inspection.

## Current checkpoint note

Checkpoint repair date: 2026-06-13.

The current canonical checkpoint is through highest detected phase 905 from `frontend/scripts/smoke-codexforge-all.ps1`. The checkpoint remains documentation and review-surface alignment only: review-only surfaces, explicit operator approval, no silent mutation, no provider/local/connector/automation execution without approval, no credential/output storage, no memory auto-promotion, and preview-only model/provider/router/controlled-model-use surfaces remain required unless explicitly approved.

Current validation commands from `frontend`:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
npm run smoke:codexforge:server
git diff --check
git status --short
git diff --stat
```

## Placeholder test status

The frontend package initially used:

```text
"test": "echo Operator test OK"
```

That placeholder needed replacement with a real local validation script.

## Secret and env safety status

No tracked `.env` files were found by the tracked-file check.

`.env.local` exists locally and remains ignored. This audit did not read or print its contents.

Repo hygiene UI must not read environment values into the browser, print `process.env` values, store API keys in `localStorage`, call provider APIs, or call local creative providers.

## Docs status

The root and frontend READMEs were useful but behind the current route surface. The repo also needed a concise workspace map and structure map so reviewers can distinguish canonical source from generated or duplicate workspace state.

## Suggested manual cleanup

- Review whether tracked root `.operator` checkpoint/run files should be removed from version control in a separate explicit cleanup.
- Review the odd root-level files with mojibake-like names and decide whether they are accidental command-output captures.
- Review `frontend/docs/scratch/*.txt` and decide whether those generated maps should stay tracked as historical docs.
- Decide whether `C:\ai-lab\projects\tools\<current-project>` should be archived, deleted, or documented as a separate scratch copy.
- Keep generated folders ignored and out of PRs.
