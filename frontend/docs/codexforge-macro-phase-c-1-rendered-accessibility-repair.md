# Macro Phase C.1 rendered accessibility repair

## Authoritative evidence

This focused repair responds to the two P2 findings recorded in `.codexforge/acceptance/macro-c1-20260801T081220Z/acceptance-report.md` and `.codexforge/acceptance/macro-c1-20260801T081220Z/browser-results.json`, plus the command-palette focus-return P2 recorded in `.codexforge/acceptance/macro-c1-repair-20260801T174302Z`. Both earlier evidence directories remain immutable.

The rendered baseline found ten captures with two DOM H1 elements: Projects at 1440×900, 1024×768, and 390×844; Assets at 1440×900 and 390×844; Providers at 1440×900 and 390×844; and Patch Review at 1440×900, 1024×768, and 390×844. It also found six distinct unavailable controls whose resolved accessible descriptions were empty.

## Repair map

Normal-product pages keep the visible H1 owned by `NormalProductFrame`. Projects, Assets, and Patch Review retain their hidden historical diagnostic mounts without explicit `aria-hidden`; each embedded panel requests an H2 through a bounded heading-level contract, while the same component defaults to standalone H1 ownership. The normal Providers route removes only its hidden historical mount so its protected provider-adapter module stays byte-identical; the historical component retains standalone H1 ownership and its complete hierarchy. In all four cases, historical source ownership, safety language, route behavior, provider behavior, and runtime behavior remain intact.

Files and Validation keep every original disabled predicate. Each unavailable action now references a visible, truthful explanation. No control was enabled and no capability was added.

The command palette captures the exact focused element immediately before opening and passes that target, together with the stable palette opener fallback, into the overlay lifecycle. Closing the overlay restores only a connected, enabled, visible, focusable target; an invalid captured target falls back to the opener and `body` is never selected intentionally. The search field retains initial focus, while Escape closing, focus trapping, and keyboard selection remain unchanged.

## Programmatic explanation relationships

The exact six relationships from the failed browser evidence are:

| Route | Disabled control | Explanation ID | Visible reason contract |
|---|---|---|---|
| Files | `docs` | `codexforge-files-project-tree-docs-explanation` | The directory is a grouping; choose a file inside it for read-only preview. |
| Files | `logs` | `codexforge-files-project-tree-logs-explanation` | The directory is a grouping; choose a file inside it for read-only preview. |
| Files | `scripts` | `codexforge-files-project-tree-scripts-explanation` | The directory is a grouping; choose a file inside it for read-only preview. |
| Files | `Prepare preview` | `codexforge-files-prepare-preview-explanation` | Select a file and enter requested-change text; preparation is preview-only with no writes or commands. |
| Files | `Prepare apply request` | `codexforge-files-prepare-apply-request-explanation` | A preview diff is required before an apply request can be prepared. |
| Validation | `Copy full validation checklist` | `codexforge-validation-copy-full-checklist-explanation` | Prepare an allowlisted request first; preparation runs no command and persists no approval. |

Directory IDs are derived deterministically from the exact node path with `encodeURIComponent`, so each rendered directory explanation remains path-specific. The prepared Validation view additionally associates `Copy approved commands` with `codexforge-validation-copy-approved-commands-explanation`, closing the same relationship invariant for the interactive journey state.

## Safety invariants

- No provider transport, credential, catalog, registry, routing, onboarding, Qwen, Private Alpha, approval, kill-switch, persistence, execution, or generation behavior changes.
- Patch preview remains preview-only. Patch application remains separately guarded and unavailable without its existing prerequisites.
- Validation remains allowlisted, manual-only, non-executing, and non-persisting in this UI.
- No package, lockfile, framework configuration, TypeScript configuration, schema, migration, or deployment file changes.
- No task submission, run creation, approval, model generation, provider execution, file write, external validation execution, or deployment is part of this repair.

## Validation and rendered acceptance

The required deterministic smoke is `scripts/smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1`. It pins the exact 30-path authorization, parses every changed PowerShell script, protects provider/runtime/catalog/registry scopes, verifies the catalog digest, preserves historical assertion floors, proves the heading, explanation, and focus-return relationships, and requires aggregate order Macro A → Macro B → Macro C → Macro C.1 with 72 total, 69 required, and 3 optional entries. The existing `scripts/smoke-codexforge-command-palette.ps1` owns deterministic pre-open focus capture, close-unmount restoration, safe fallback, search focus, focus trapping, and keyboard selection coverage; no additional aggregate smoke is registered.

Rendered acceptance must repeat all 15 routes and 34 captures in a new evidence directory, inspect every PNG, prove exactly one DOM H1 and zero unexplained disabled controls, and complete all 20 interactive and keyboard steps without submitting, approving, generating, applying, executing, or deploying anything. Only after that rendered acceptance passes may the full validation wrapper run exactly once.
