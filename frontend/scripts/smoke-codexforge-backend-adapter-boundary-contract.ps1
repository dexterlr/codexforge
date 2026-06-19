param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 794 Backend Adapter Boundary Contract" `
  -ScriptFile "smoke-codexforge-backend-adapter-boundary-contract.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-boundary-contract" `
  -Route "src\app\backend-adapter-boundary-contract" `
  -MainPanel "BackendAdapterBoundaryContractPanel" `
  -CommandLabel "Go to Backend Adapter Boundary Contract" `
  -Modules @("backend-adapter-boundary-contract-model.ts", "index.ts") `
  -Components @("BackendAdapterBoundaryContractPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterBoundaryContractStableKey", "buildBackendAdapterBoundaryContract", "buildBackendAdapterBoundaryContractItems", "buildBackendAdapterBoundaryContractBoundary", "buildBackendAdapterBoundaryContractModel", "summarizeBackendAdapterBoundaryContract", "BACKEND_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Backend Adapter Boundary Contract", "Backend adapter boundary contract does not implement or run backend adapters", "Backend adapter execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "request id", "adapter family", "approved operation", "denied operation", "sandbox profile", "audit state", "evidence state", "result state", "recovery state", "validation state", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Backend adapter boundary contract does not implement or run backend adapters") `
  -RouteHref "/backend-adapter-boundary-contract"

Write-Host "[OK] CodexForge Phase 794 backend adapter boundary contract smoke passed."
