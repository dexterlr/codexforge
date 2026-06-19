param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 807 Adapter Backend Validation Contract" `
  -ScriptFile "smoke-codexforge-adapter-backend-validation-contract.ps1" `
  -Domain "src\lib\codexforge\adapter-backend-validation-contract" `
  -Route "src\app\adapter-backend-validation-contract" `
  -MainPanel "AdapterBackendValidationContractPanel" `
  -CommandLabel "Go to Adapter Backend Validation Contract" `
  -Modules @("adapter-backend-validation-contract-model.ts", "index.ts") `
  -Components @("AdapterBackendValidationContractPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackendValidationContractStableKey", "buildAdapterBackendValidationContract", "buildAdapterBackendValidationContractItems", "buildAdapterBackendValidationContractBoundary", "buildAdapterBackendValidationContractModel", "summarizeAdapterBackendValidationContract", "ADAPTER_BACKEND_VALIDATION_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Adapter Backend Validation Contract", "Adapter backend validation contract does not run validation from UI", "Backend validation execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "smokes", "build", "repo hygiene", "route coverage", "command UI simplification", "checkpoint docs", "server smoke", "evidence/result links", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Adapter backend validation contract does not run validation from UI") `
  -RouteHref "/adapter-backend-validation-contract"

Write-Host "[OK] CodexForge Phase 807 adapter backend validation contract smoke passed."
