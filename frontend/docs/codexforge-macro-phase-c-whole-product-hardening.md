# CodexForge Macro Phase C - Whole-Product Hardening

This document records the internal-alpha product contract implemented by Macro Phase C. It describes normal product routes, honest capability status, safety boundaries, and the dependency-ordered creator work that follows. It does not enable a provider, execute a run, apply a patch, run a command, or claim that an unfinished creator pipeline works.

## Canonical normal product

`/jarvis` is the single conversational workspace. `/athena` is a server-owned compatibility redirect and never mounts a second workspace or run panel.

| Product area | Route | Product status | Primary next action |
| --- | --- | --- | --- |
| CodexForge Home | `/` | Available | Build with Jarvis |
| Build with Jarvis | `/jarvis` | Working for guarded text and code tasks | Describe a task |
| Projects | `/video-projects` | Available with a repository-configured project boundary | Continue in Jarvis |
| Assets | `/video-assets` | Review only; no connected inventory scan or generation | Open Projects |
| Providers | `/provider-adapters` | Read-only server readiness | Build with Jarvis |
| Workflows | `/video-workflows` | Boundary guidance; no connected template inventory | Plan with Jarvis |
| Trading | `/jarvis-trading` | Research only | Research with Jarvis |
| Audit and Runs | `/jarvis-audit` | Read-only persisted run summaries | Return to Jarvis |
| Safety and Settings | `/jarvis-safety` | Read-only current safety posture | Review Providers |
| Project Files | `/files` | Bounded read-only browsing and copy-only patch preview | Prepare or review a patch preview |
| Patch Review | `/patch-preview-workbench` | No active proposal unless prepared from Files; no application | Choose a project file |
| Validation | `/validation` | Allowlisted preparation and pasted-output review | Prepare an allowlisted check |

Developer Diagnostics, historical phases, wiring previews, and compatibility surfaces remain separate from normal desktop navigation, mobile navigation, and the command palette's default group.

## Current capability inventory

### Working

- Jarvis accepts a bounded text or code objective, shows the selected provider/model/data boundary, records manual approval, exposes a separate execution action, and presents result/audit state.
- The admitted local identity remains `ollama-local::gpt-oss:20b` with the 4,096-token local ceiling.
- Files performs a bounded, server-owned, read-only project scan and file preview.
- Existing run history and status APIs support read-only Audit, Provider readiness, and Safety presentations.
- `/athena` redirects to `/jarvis` without mounting a duplicate assistant.

### Partial

- Projects reflects the configured project root but does not provide a browser-wide project chooser, second project store, or automatic import.
- Files can prepare review context, but Patch Review does not persist an active cross-route proposal.
- Patch application remains a separate approval boundary outside the normal review page.
- Provider readiness is visible, but availability can still block execution.
- Audit presents bounded summaries rather than a full event-by-event technical trace.

### Review or planning only

- Assets presents an honest empty state plus clearly labelled planning examples; it performs no scan, upload, generation, or licensing action.
- Workflows explains planning and approval boundaries; no connected workflow or template inventory is claimed.
- Validation supports allowlisted selection, exact approval, command copying, and pasted-output review; the guarded execution API is unavailable.
- Trading supports research organization only. It provides no advice, live market data, broker connection, automation, order placement, or live-money action.
- Existing video and website pages outside the normal journey are retained planning/diagnostic surfaces, not working generators.

### Absent

- Complete website/application generation, live local preview, automated repair, and export.
- Full-stack application and server/API generation with launch and health verification.
- Playable browser-game generation and gameplay-loop testing.
- Connected video asset generation, timeline construction, rendering, revision, and export.
- User-controlled long-term memory, local voice conversation, email/communication connectors, explicitly initiated screen-understanding sessions, and supervised security remediation.
- General-purpose tool execution, schedules, event triggers, deployment, publishing, payments, accounts, telemetry, and paid-provider routing.

## Master-charter gap analysis

Jarvis has the correct singular-workspace and guarded-run shape, but it is not yet the broad personal AI operating system promised by the charter. The largest missing dependency is a shared tool and permission runtime that can bind an approved plan to exact project artifacts, commands, previews, validation evidence, recovery, and audit without arbitrary execution.

Creator modes also lack a common project lifecycle. Specialized pages must not be promoted until they can prove real artifact creation, local preview or launch, validation, repair, and export. Voice, communication, screen understanding, security operations, and automation each need explicit permission profiles, visible session indicators or side-effect previews, immediate stop controls, and auditable results before release.

Paid routing remains intentionally deferred. Free/local-first routing, cost disclosure, provider/task budgets, and global/provider kill switches must exist before paid execution can be enabled.

## Dependency-ordered implementation sequence

1. **Shared tool and permission runtime.** Define Advice only, Read-only assistant, Local project operator, Communication assistant, Trusted workflow, and Full supervised operator profiles; exact tool manifests; revocation; stop; rollback; bounded retries; and audit events.
2. **D1 — Creator project lifecycle and artifact contract.** Establish specification, plan, approval packet, artifact manifest, project sandbox, preview status, validation evidence, repair proposal, export packet, and recovery contract.
3. **D2 — Website/application builder.** Deliver the first genuinely working creator mode with frontend-first generation, local preview, allowlisted build/validation, bounded repair, and export. Add full-stack work only after the server boundary is proven.
4. **D3 — Server/API builder.** Add routes, input validation, storage configuration, tests, environment-variable documentation, health checks, and approved local start/stop controls without client secrets.
5. **D4 — Browser-game builder.** Add code, UI, rules, locally generated or properly licensed assets, playable local preview, basic gameplay-loop checks, repair, and packaging.
6. **Email and communication tools.** Add approved-provider read/search/summarise/draft first, then exact preview and confirmation for send, forward, delete, and mailbox mutation.
7. **Voice conversation.** Add local speech-to-text and text-to-speech where practical, push-to-talk, visibly enabled continuous mode, mute, and global stop. Never record or transmit invisibly.
8. **Explicit screen-understanding sessions.** Add user-initiated capture, persistent observation indicator, permission-scoped actions, immediate stop, and no hidden monitoring or credential capture.
9. **Security inspection and supervised remediation.** Separate evidence-backed observation from exact, backed-up, rollback-ready repair and post-repair validation.
10. **D5 — Local/free-first video pipeline.** Connect script, storyboard, shot plan, licensed/local assets, timeline, review, rendering, revision, and export before calling video generation operational.
11. **Paid-provider routing, budgets, and cost controls.** Add only after explicit enablement, exact cost preview, budget enforcement, cloud acknowledgement, and no silent substitution are proven.
12. **D6 — Unified one-button Jarvis creation and cross-capability automation.** Orchestrate the proven creators through request → clarify → plan → boundary → approve → build → preview → validate → repair → export, then add inspectable scheduled/event workflows with side-effect and spend bounds.

## Proposed next macro phase

Macro Phase D should begin with D1 and D2 as one coherent **Push-Button Creator Foundation** release: the shared creator lifecycle plus a genuinely working frontend website/application builder. It should reuse Jarvis, the existing approval record, Files, Patch Review, allowlisted Validation, Audit, both kill-switch checkpoints, and the server-only credential boundary. It must not add a second assistant, second project store, arbitrary shell, paid routing, deployment, model download, telemetry, or silent file mutation.

### Required Phase D acceptance tests

1. A user enters a plain-language frontend website request in `/jarvis` and receives a bounded specification and plan.
2. The plan shows exact tools, provider/model identity, local or cloud data boundary, output limits, requested project root, expected files, commands, and estimated paid cost (`£0` while paid execution is disabled).
3. No artifact, command, or provider action occurs before exact approval; execution is a separate action and both kill-switch checkpoints are tested.
4. One approved creation attempt writes only to a newly approved project sandbox or exact approved files, with a rollback-safe checkpoint and no unrelated changes.
5. A real local preview starts through an allowlisted control, exposes a health/readiness state, and has an immediate stop action.
6. The generated page is rendered at desktop and mobile widths and basic accessibility checks cover heading order, landmarks, labels, keyboard use, focus, contrast, reduced motion, and overflow.
7. Allowlisted build, type, and smoke validation runs only after command approval; output is captured readably in Validation and Audit.
8. A deterministic injected defect produces a bounded repair proposal, requires approval for changed files, applies once, and revalidates without retry storms or provider substitution.
9. Success is claimed only when real files exist, the preview responds, validations pass, and the export package matches the artifact manifest.
10. Failure, cancellation, provider unavailable, model unavailable, kill switch, validation failure, no-change, and rollback states preserve the project and recommend one clear recovery action.
11. Audit proves provider/model/data boundary, approval, exact file writes, commands, preview lifecycle, validation, repair, export, cancellation, and rollback without exposing secrets or raw credentials.
12. No Ollama/Groq contact occurs in deterministic tests; all provider behavior is isolated and mock-safe. A separately authorized live acceptance is required before any live-generation claim.

## Preserved safety invariants

Macro Phase C does not change the provider registry, production model catalog, routing policy, provider adapters, Private Alpha store or execution semantics, kill switches, credential resolution, Groq runtime, Ollama runtime identity/envelope, or candidate qualification material. Local-first selection, exact manual approval, separate execution, cloud acknowledgements, both kill-switch checkpoints, one attempt, no paid execution, no retry, no fallback, no rerouting after persistence, no substitution, no automatic download, server-only credentials, explicit patch approval, and allowlisted validation remain release requirements.
