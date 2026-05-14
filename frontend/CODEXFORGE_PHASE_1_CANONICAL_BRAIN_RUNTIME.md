# CodexForge Brain Runtime

## Current State

The Brain runtime foundation exists under:

```text
src/lib/codexforge/brain/runtime
```

It uses canonical graph types from:

```text
src/lib/codexforge/brain/graph/types.ts
```

## Runtime Responsibilities

- Append and list runtime events.
- Reduce graph state from runtime signals.
- Assemble compact runtime context.
- Rank memory by useful deterministic signals.
- Create episodes.
- Synthesize candidate concepts.
- Extract execution lineage.
- Score semantic relationship candidates.
- Support deterministic Brain memory ingestion.

## Related Brain Surfaces

- `/brain` command center.
- Visual Brain graph.
- Memory clusters.
- Runtime health.
- Topology and semantic heatmap.
- Replay and lineage.
- Recommendations and focus drilldown.

## Safety Notes

The Brain runtime informs planning and memory. It is not an autonomous executor and does not mutate files without an approved operator path.

## Validation

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-runtime.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-memory-ingestion.ps1
git diff --check
```
