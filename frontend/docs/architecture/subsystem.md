# Subsystems

## Brain

Location:

```text
src/lib/codexforge/brain
```

Responsibilities:

- Brain runtime.
- Cognitive memory.
- Graph schema and storage.
- Real deterministic memory ingestion.
- Context assembly and memory ranking.
- Runtime health, topology, lineage, replay, recommendations, and focus panels.

## Files

Location:

```text
src/lib/codexforge/files
```

Responsibilities:

- Files Command Center.
- File inspector and file tree.
- File risk and safe next action.
- Dependency and predictive context.
- File to Brain to Chat bridge.

## Patch Preview

Location:

```text
src/lib/codexforge/patch-preview
```

Responsibilities:

- Patch plan preview.
- Diff preview.
- Risk review.
- Approval boundary.
- Rollback and test plan preview.

This subsystem is preview-only and does not apply changes by itself.

## Capabilities

Location:

```text
src/lib/codexforge/capabilities
```

Responsibilities:

- Capability Cockpit.
- Adapter readiness.
- Artifact ledger preview.
- Approval boundary and blocked execution status.
- Future execution roadmap.

It does not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera control.

## Creative

Location:

```text
src/lib/codexforge/creative
```

Responsibilities:

- Creative Production Studio.
- Creative brief planning.
- Blender scene plan preview.
- ComfyUI workflow plan preview.
- Unreal level plan preview.
- Storyboard and render queue preview.
- Artifact handoff preview.

Creative production is preview-only.

## Tools And Operator

Locations:

```text
src/lib/codexforge/tools
src/app/api/codexforge/tools
src/app/api/operator
```

Responsibilities:

- Tool adapter registry.
- Policy guard.
- Approval lifecycle.
- Safe read/search/test helpers.
- Operator plan, diff, apply, snapshot, checkpoint, and test APIs.

Mutation-capable actions must remain approval-gated.
