# Principles

- AI is optional.
- Local deterministic logic is preferred for core planning.
- The system must remain useful without a remote provider.
- No hidden behavior.
- No silent mutation.
- File mutation is approval-gated.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless a future explicit approval path exists.
- Preview and review surfaces must be labeled honestly.
- Apply gate surfaces prepare evidence and approvals; they are not uncontrolled apply executors.
- External execution must be policy-backed before it becomes available.
- Broker execution is blocked.
- PC/camera features require explicit future consent.
- Creative external tools remain approval-gated.
- Graph visual layers must not mutate graph state.
- 3D graph features must remain fallback-safe.
- Blocked or planned capabilities must not be described as production-ready.
- Smoke coverage should guard major product surfaces.
