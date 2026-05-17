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
- Real 3D Brain graph with WebGL/Three/Fiber/Drei.
- 2D Brain graph fallback.
- Memory clusters.
- Runtime health.
- Topology and semantic heatmap.
- Replay and lineage.
- Recommendations and focus drilldown.
- Brain memory recall and chat recall handoff.

## Safety Notes

The Brain runtime informs planning and memory. The graph visual layer does not mutate graph state, and the runtime is not an autonomous executor. File mutation remains behind explicit policy and approval boundaries.

## Validation

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-runtime.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-memory-ingestion.ps1
git diff --check
```
