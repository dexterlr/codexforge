param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 798 Local Runtime Adapter Backend Contract" `
  -ScriptFile "smoke-codexforge-local-runtime-adapter-backend-contract.ps1" `
  -Domain "src\lib\codexforge\local-runtime-adapter-backend-contract" `
  -Route "src\app\local-runtime-adapter-backend-contract" `
  -MainPanel "LocalRuntimeAdapterBackendContractPanel" `
  -CommandLabel "Go to Local Runtime Adapter Backend Contract" `
  -Modules @("local-runtime-adapter-backend-contract-model.ts", "index.ts") `
  -Components @("LocalRuntimeAdapterBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeAdapterBackendContractStableKey", "buildLocalRuntimeAdapterBackendContract", "buildLocalRuntimeAdapterBackendContractItems", "buildLocalRuntimeAdapterBackendContractBoundary", "buildLocalRuntimeAdapterBackendContractModel", "summarizeLocalRuntimeAdapterBackendContract", "LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Local Runtime Adapter Backend Contract", "Local runtime adapter backend contract does not start local runtimes", "Local runtime backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "runtime name", "process lifecycle", "port/network", "stop policy", "logs", "recovery", "audit/evidence/result", "sandbox profile", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Local runtime adapter backend contract does not start local runtimes") `
  -RouteHref "/local-runtime-adapter-backend-contract"

Write-Host "[OK] CodexForge Phase 798 local runtime adapter backend contract smoke passed."
