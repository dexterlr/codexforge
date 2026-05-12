Do PHASES 1-6 for CodexForge, but do them safely as a staged implementation.

FIRST:
Inspect the repo. Do not blindly create massive new systems. Identify current architecture and build constraints.

MISSION:
Turn CodexForge into a clean AI-native cognitive engineering runtime.

PHASE 1:
Create a canonical brain runtime layer.
- Remove schema drift.
- Make src/lib/codexforge/brain/graph/types.ts the canonical graph schema.
- Quarantine or replace older graph model remnants.
- Add src/lib/codexforge/brain/runtime/
- Add runtime-types.ts, event-store.ts, graph-reducer.ts, context-assembler.ts, memory-ranker.ts, episode-manager.ts, concept-synthesizer.ts, execution-lineage.ts, semantic-links.ts, runtime.ts.
- Move cognition logic toward runtime boundaries.
- Preserve /brain and chat behavior.

PHASE 2:
Upgrade memory.
- confidence scoring
- importance scoring
- recency scoring
- memory ranking
- semantic dedupe stubs
- contradiction detection stubs
- concept promotion stubs

PHASE 3:
Build Files UX vertical slice.
- FilesCommandCenter
- FileTree
- FileInspector
- FileActionBar
- SafeEditPreview
- FileRiskBadge
- Search/filter files
- Premium dark UI
- No overwrite without preview

PHASE 4:
Add autonomous context engine stubs.
- predictive context
- relevance engine
- architectural retrieval
- risk prioritizer

PHASE 5:
Add multi-agent runtime stubs.
- PlannerAgent
- ExecutionAgent
- VerificationAgent
- RefactorAgent
- ResearchAgent
- MemoryCuratorAgent
- GraphOptimizerAgent
- RiskAnalysisAgent

PHASE 6:
Improve /brain command center.
- Keep existing inspector working.
- Add sections for memory, tasks, concepts, executions, risks, runtime health, agent activity.
- Do not break build.

STRICT RULES:
- Keep changes incremental and buildable.
- Prefer useful foundations over huge fake complexity.
- Do not delete working behavior unless replaced.
- Avoid overengineering UI before runtime is stable.
- npm run build must pass.
- If all six phases are too much, complete Phase 1 fully and scaffold Phases 2-6 cleanly.

Final output:
- summarize files changed
- summarize architecture changes
- list follow-up tasks
- report build result
