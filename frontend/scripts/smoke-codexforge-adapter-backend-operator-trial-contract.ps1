param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 808 Adapter Backend Operator Trial Contract" `
  -ScriptFile "smoke-codexforge-adapter-backend-operator-trial-contract.ps1" `
  -Domain "src\lib\codexforge\adapter-backend-operator-trial-contract" `
  -Route "src\app\adapter-backend-operator-trial-contract" `
  -MainPanel "AdapterBackendOperatorTrialContractPanel" `
  -CommandLabel "Go to Adapter Backend Operator Trial Contract" `
  -Modules @("adapter-backend-operator-trial-contract-model.ts", "index.ts") `
  -Components @("AdapterBackendOperatorTrialContractPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackendOperatorTrialContractStableKey", "buildAdapterBackendOperatorTrialContract", "buildAdapterBackendOperatorTrialContractItems", "buildAdapterBackendOperatorTrialContractBoundary", "buildAdapterBackendOperatorTrialContractModel", "summarizeAdapterBackendOperatorTrialContract", "ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Adapter Backend Operator Trial Contract", "Adapter backend operator trial contract does not execute adapters", "Backend operator trials require explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "operator checklist", "approval review", "dry-run review", "sandbox review", "observation", "validation", "rollback", "handoff", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Adapter backend operator trial contract does not execute adapters") `
  -RouteHref "/adapter-backend-operator-trial-contract"

Write-Host "[OK] CodexForge Phase 808 adapter backend operator trial contract smoke passed."
