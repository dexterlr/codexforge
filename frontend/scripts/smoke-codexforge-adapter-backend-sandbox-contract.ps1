param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 806 Adapter Backend Sandbox Contract" `
  -ScriptFile "smoke-codexforge-adapter-backend-sandbox-contract.ps1" `
  -Domain "src\lib\codexforge\adapter-backend-sandbox-contract" `
  -Route "src\app\adapter-backend-sandbox-contract" `
  -MainPanel "AdapterBackendSandboxContractPanel" `
  -CommandLabel "Go to Adapter Backend Sandbox Contract" `
  -Modules @("adapter-backend-sandbox-contract-model.ts", "index.ts") `
  -Components @("AdapterBackendSandboxContractPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackendSandboxContractStableKey", "buildAdapterBackendSandboxContract", "buildAdapterBackendSandboxContractItems", "buildAdapterBackendSandboxContractBoundary", "buildAdapterBackendSandboxContractModel", "summarizeAdapterBackendSandboxContract", "ADAPTER_BACKEND_SANDBOX_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Adapter Backend Sandbox Contract", "Adapter backend sandbox contract does not run adapters", "Backend sandbox execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "allowed paths", "denied paths", "process policy", "network policy", "provider/connector/automation exclusions", "file/command/runtime boundaries", "evidence/result boundaries", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Adapter backend sandbox contract does not run adapters") `
  -RouteHref "/adapter-backend-sandbox-contract"

Write-Host "[OK] CodexForge Phase 806 adapter backend sandbox contract smoke passed."
