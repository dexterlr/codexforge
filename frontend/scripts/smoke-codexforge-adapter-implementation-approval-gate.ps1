param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 739 Adapter Implementation Approval Gate" `
  -ScriptFile "smoke-codexforge-adapter-implementation-approval-gate.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-approval-gate" `
  -Route "src\app\adapter-implementation-approval-gate" `
  -MainPanel "AdapterImplementationApprovalGatePanel" `
  -CommandLabel "Go to Adapter Implementation Approval Gate" `
  -Modules @("adapter-implementation-approval-gate-model.ts", "index.ts") `
  -Components @("AdapterImplementationApprovalGatePanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationApprovalGateStableKey", "buildAdapterImplementationApprovalGate", "buildAdapterImplementationApprovalGateItems", "buildAdapterImplementationApprovalGateBoundary", "buildAdapterImplementationApprovalGateModel", "summarizeAdapterImplementationApprovalGate", "ADAPTER_IMPLEMENTATION_APPROVAL_GATE_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Approval Gate", "Adapter implementation approval gate does not approve or execute adapters", "Adapter implementation approval requires explicit operator approval", "Approval gate states", "Denied actions", "Reviewer checklist", "Evidence requirements", "Rollback requirements", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Approval Gate identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "approval decisions are not persisted from UI") `
  -RouteHref "/adapter-implementation-approval-gate"

Write-Host "[OK] CodexForge Phase 739 adapter implementation approval gate smoke passed."
