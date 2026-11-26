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

### Decisions and outcomes

Open **Project memory** on `/brain` or `/local-project-decision-log` to see the local workspace's decisions and the evidence for what happened afterward. The Brain reads three sources.

- Saved operator messages in Jarvis. For example, “We decided to use SQLite,” followed by “That worked,” records a decision and a reported outcome. A later “The SQLite migration failed” keeps the contrary evidence visible. Explicit labels such as “Decision:” and “What worked:” are also recognized.
- Website Creator's recorded approvals, validated artifact revisions, and failed operations. Each outcome describes the particular operation and links to its project.
- Dated, explicitly labeled entries in the repository's [development memory](docs/development/project-memory.md). This lets decisions recorded from development chats appear alongside app history.

Typing a related topic in Jarvis shows matching evidence locally. **Add to draft** includes the selected text and its source in the editable message. Submitting the draft and approving a provider run are separate actions.

Each read uses the retained source records, including history from before this feature. Deleting a Jarvis conversation removes its derived entries on the next read. Operator reports and Creator checks have distinct provenance. Reviewed graph promotion continues through `/memory`.

### Graph and runtime

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
node scripts/smoke-codexforge-brain-project-learning.cjs
git diff --check
```
