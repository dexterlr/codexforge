param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 804 Adapter Backend Approval Contract" `
  -ScriptFile "smoke-codexforge-adapter-backend-approval-contract.ps1" `
  -Domain "src\lib\codexforge\adapter-backend-approval-contract" `
  -Route "src\app\adapter-backend-approval-contract" `
  -MainPanel "AdapterBackendApprovalContractPanel" `
  -CommandLabel "Go to Adapter Backend Approval Contract" `
  -Modules @("adapter-backend-approval-contract-model.ts", "index.ts") `
  -Components @("AdapterBackendApprovalContractPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackendApprovalContractStableKey", "buildAdapterBackendApprovalContract", "buildAdapterBackendApprovalContractItems", "buildAdapterBackendApprovalContractBoundary", "buildAdapterBackendApprovalContractModel", "summarizeAdapterBackendApprovalContract", "ADAPTER_BACKEND_APPROVAL_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Adapter Backend Approval Contract", "Adapter backend approval contract does not approve or execute adapters", "Backend approval execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "reviewer", "approval state", "denial reason", "expiry", "audit", "evidence", "recovery", "rollback", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Adapter backend approval contract does not approve or execute adapters") `
  -RouteHref "/adapter-backend-approval-contract"

Write-Host "[OK] CodexForge Phase 804 adapter backend approval contract smoke passed."
