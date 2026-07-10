# CodexForge Smoke Historical Archive

## Current Release Gate
Current release gate is `scripts/smoke-codexforge-all.ps1`.
It runs only the current required release smokes and current critical regressions for `4650-4681 - CodexForge Full Smoke Harness Triage and Required Release Gate`.

## Historical Archive
Historical phase smokes are preserved as evidence.
Historical phase smokes are non-gating by default.
Archived historical smokes can be inspected manually or inventoried with `powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-historical-archive-inventory.ps1`.
Demoting stale historical smokes from the default gate does not prove those old phases are currently product-valid.
Historical phase smokes do not prove those old phases are currently product-valid.
This batch does not claim archived historical smokes pass.
The prior full aggregate failed because archived historical phase scripts were still being executed as if they were the current release gate.

## Current Quality Bar
Current release quality is determined by the current required release smokes only.
No prompt sending.
No LLM/model calls.
No frontend provider call.
No frontend fetch/network call.
No autonomous execution.
No plugin execution.
No provider execution.
No live video generation.
No queue dispatch.
No worker dispatch.
No job execution.
No result persistence.
No audit persistence.
No approval persistence.
No persistent memory.
No browser storage.
No database writes.
Backend-only execution path required.
Operator approval required.
Kill switch required.
Audit required.
Next likely batch: `4682-4713 - AI Model Provider Registry and Capability Matrix`.
