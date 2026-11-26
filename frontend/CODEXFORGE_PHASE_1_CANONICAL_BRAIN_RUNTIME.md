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

The Brain derives Jarvis entries from saved conversations, including earlier history. Deleting a Jarvis conversation removes its derived entries on the next read. Operator reports and Creator checks have distinct provenance. Reviewed graph promotion continues through `/memory`.

The Codex connection is local to this checkout. The ignored file `.codexforge/brain/development-chat.json` identifies the linked chat. A Windows background worker starts at sign-in and captures decisions and reported outcomes even with the local server off. On startup it also checks earlier messages still available in Codex history. The local server continues to capture independently when running.

The Brain saves each recognized decision or outcome in `.codexforge/brain/retained-chats/`, with its source, timestamp and any link to the decision it concerns. Repeated reads reuse existing entries, and a correction can add another version. Saved entries remain available in the Brain, Decision Log and Jarvis after a chat is rolled back, deleted or disconnected. Removing the binding stops further capture from that chat.

#### Windows background capture

From this checkout, run `.\scripts\manage-codexforge-brain-worker.ps1 -Action Status` to see the Windows task state, worker process and last confirmed save. `Install` starts the worker immediately and registers it for sign-in under the current user's account. `Restart` reloads updated worker code. `Remove` stops automatic capture and preserves the archive.

When status shows `DeletionGuard = True`, the worker holds a read-only handle to the linked chat's verified local history. If that chat is deleted before Windows delivers a change notification, the worker can still read the final completed messages, save recognized entries and release the handle. Only the extracted entries go into the workspace archive. Removing the project binding stops this capture as well.

The checkout also provides a Codex `SessionEnd` hook for a final save when an open chat closes or is deleted. Review the checkout's hook in **Codex Settings → Hooks** and choose **Trust** to enable it. Codex gives this hook up to three seconds. The running Windows worker operates independently of hook approval. If every capture process is stopped before a message is created and deleted, it cannot be recovered from the Brain archive. [Codex hook lifecycle and trust](https://learn.chatgpt.com/docs/hooks)

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
node scripts/smoke-codexforge-retained-chat-memory.cjs
node scripts/smoke-codexforge-background-chat-capture.cjs
node scripts/smoke-codexforge-offline-brain-worker.cjs
node scripts/smoke-codexforge-brain-immediate-delete.cjs
node scripts/smoke-codexforge-brain-session-end.cjs
git diff --check
```
