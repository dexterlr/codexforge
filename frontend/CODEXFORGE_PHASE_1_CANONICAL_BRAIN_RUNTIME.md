You are working on CodexForge.

MISSION:
Add the canonical brain runtime foundation safely.

IMPORTANT:
Do not attempt all phases.
Do not build Files UX yet.
Do not rewrite /brain UI yet.
Do not delete working behavior.
Preserve build and smoke suite.

FIRST:
Inspect these areas before patching:
- src/lib/codexforge/brain
- src/lib/codexforge/brain/graph
- src/lib/codexforge/chat
- src/lib/codexforge/tools
- scripts/smoke-codexforge-all.ps1

GOAL:
Create a canonical brain runtime layer that moves CodexForge toward a cognitive engineering runtime while preserving existing behavior.

CREATE:
src/lib/codexforge/brain/runtime/
  runtime-types.ts
  event-store.ts
  graph-reducer.ts
  context-assembler.ts
  memory-ranker.ts
  episode-manager.ts
  concept-synthesizer.ts
  execution-lineage.ts
  semantic-links.ts
  runtime.ts
  index.ts

REQUIREMENTS:
1. Use src/lib/codexforge/brain/graph/types.ts as the canonical graph schema.
2. Runtime must import canonical graph types from brain/graph/types.ts.
3. Do not introduce a second graph schema.
4. Do not remove existing graph/storage behavior yet.
5. Add typed append-only events:
   - message.created
   - task.created
   - task.updated
   - execution.started
   - execution.completed
   - diff.generated
   - memory.promoted
   - concept.synthesized
   - failure.detected
   - recovery.detected
6. Add episode model:
   - goal
   - context
   - actions
   - failures
   - recovery
   - outputs
   - learnedConcepts
7. Export public runtime APIs:
   - appendEvent
   - reduceGraph
   - assembleContext
   - rankMemory
   - createEpisode
   - synthesizeConcepts
8. Keep implementations useful but conservative:
   - event-store should support append/list/filter
   - graph-reducer should accept graph + events and return graph
   - context-assembler should produce a compact runtime context from graph/events/focus IDs
   - memory-ranker should score by importance/status/recency/pinned
   - episode-manager should create typed episodes from runtime inputs
   - concept-synthesizer should produce safe candidate concepts from repeated memory/task/event signals
   - execution-lineage should extract execution/diff/snapshot links
   - semantic-links should define/score semantic relation candidates
9. Add smoke coverage:
   Create scripts/smoke-codexforge-brain-runtime.ps1

Smoke should assert:
- runtime directory exists
- all required runtime files exist
- index exports appendEvent
- index exports reduceGraph
- index exports assembleContext
- index exports rankMemory
- index exports createEpisode
- index exports synthesizeConcepts
- runtime imports canonical graph types from brain/graph/types
- runtime does not import brain-graph.ts
- no random layout dependency
- no external force simulation dependency
- /brain page still imports/renders brain graph view

10. Wire the new smoke into scripts/smoke-codexforge-all.ps1.

VALIDATION:
Run:
npm run build
npm run smoke:codexforge:server
git diff --check

Only finish if all pass.

FINAL OUTPUT:
- files changed
- architecture changes
- validation results
- recommended next step
