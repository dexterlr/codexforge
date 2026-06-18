param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 736 Recovery Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-recovery-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\recovery-adapter-implementation-slice" `
  -Route "src\app\recovery-adapter-implementation-slice" `
  -MainPanel "RecoveryAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Recovery Adapter Implementation Slice" `
  -Modules @("recovery-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("RecoveryAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildRecoveryAdapterImplementationSliceStableKey", "buildRecoveryAdapterImplementationSlice", "buildRecoveryAdapterImplementationSliceItems", "buildRecoveryAdapterImplementationSliceBoundary", "buildRecoveryAdapterImplementationSliceModel", "summarizeRecoveryAdapterImplementationSlice", "RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Recovery Adapter Implementation Slice", "Recovery adapter implementation slice does not trigger recovery or retry", "Recovery adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Retry policy", "Rollback policy", "Cleanup policy", "Escalation policy", "Audit policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Recovery Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "idempotency proof") `
  -RouteHref "/recovery-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 736 recovery adapter implementation slice smoke passed."
