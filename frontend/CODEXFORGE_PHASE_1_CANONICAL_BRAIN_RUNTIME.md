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

Open **Project memory** on `/brain` or `/local-project-decision-log` to see the local workspace's decisions and the evidence for what happened afterward.

- Saved operator messages in Jarvis. For example, “We decided to use SQLite,” followed by “That worked,” records a decision and a reported outcome. A later “The SQLite migration failed” keeps the contrary evidence visible. Explicit labels such as “Decision:” and “What worked:” are also recognized.
- Website Creator's recorded approvals, validated artifact revisions, and failed operations. Each outcome describes the particular operation and links to its project.
- The linked Codex development chat. The Brain recognizes clear directions and decisions in user messages and reported outcomes in user messages and final replies. Entries identify the speaker. While the page is visible, the chat feed refreshes every 15 seconds. Opening the Brain again picks up changes made while it was closed.
- Dated, explicitly labeled entries in the repository's [development memory](docs/development/project-memory.md) can capture decisions made outside the connected software.

Typing a related topic in Jarvis shows matching evidence locally. **Add to draft** includes the selected text and its source in the editable message. Submitting the draft and approving a provider run are separate actions.

Each read uses the retained source records, including history from before this feature. Deleting a Jarvis conversation removes its derived entries on the next read. Operator reports and Creator checks have distinct provenance. Reviewed graph promotion continues through `/memory`.

The Codex connection is local to this checkout. The ignored file `.codexforge/brain/development-chat.json` stores its version and linked thread ID. The server verifies the thread's workspace and reads its retained visible messages from Codex's local paginated history using Node's built-in SQLite reader. Reverting a turn or deleting the chat removes that evidence from subsequent reads. Removing the binding disconnects the chat. If Codex history is unavailable or its storage format changes, the Brain shows a connection notice and continues to display its other sources.

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
node scripts/smoke-codexforge-codex-chat-memory.cjs
git diff --check
```
