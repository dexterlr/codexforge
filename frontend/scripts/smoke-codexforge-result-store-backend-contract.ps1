param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 800 Result Store Backend Contract" `
  -ScriptFile "smoke-codexforge-result-store-backend-contract.ps1" `
  -Domain "src\lib\codexforge\result-store-backend-contract" `
  -Route "src\app\result-store-backend-contract" `
  -MainPanel "ResultStoreBackendContractPanel" `
  -CommandLabel "Go to Result Store Backend Contract" `
  -Modules @("result-store-backend-contract-model.ts", "index.ts") `
  -Components @("ResultStoreBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreBackendContractStableKey", "buildResultStoreBackendContract", "buildResultStoreBackendContractItems", "buildResultStoreBackendContractBoundary", "buildResultStoreBackendContractModel", "summarizeResultStoreBackendContract", "RESULT_STORE_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Result Store Backend Contract", "Result store backend contract does not store or reuse results", "Result backend storage and reuse require explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "result source", "acceptance state", "reuse scope", "privacy/safety", "retention", "audit", "evidence linkage", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Result store backend contract does not store or reuse results") `
  -RouteHref "/result-store-backend-contract"

Write-Host "[OK] CodexForge Phase 800 result store backend contract smoke passed."
