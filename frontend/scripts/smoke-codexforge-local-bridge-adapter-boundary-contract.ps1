param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 795 Local Bridge Adapter Boundary Contract" `
  -ScriptFile "smoke-codexforge-local-bridge-adapter-boundary-contract.ps1" `
  -Domain "src\lib\codexforge\local-bridge-adapter-boundary-contract" `
  -Route "src\app\local-bridge-adapter-boundary-contract" `
  -MainPanel "LocalBridgeAdapterBoundaryContractPanel" `
  -CommandLabel "Go to Local Bridge Adapter Boundary Contract" `
  -Modules @("local-bridge-adapter-boundary-contract-model.ts", "index.ts") `
  -Components @("LocalBridgeAdapterBoundaryContractPanel.tsx", "index.ts") `
  -Exports @("buildLocalBridgeAdapterBoundaryContractStableKey", "buildLocalBridgeAdapterBoundaryContract", "buildLocalBridgeAdapterBoundaryContractItems", "buildLocalBridgeAdapterBoundaryContractBoundary", "buildLocalBridgeAdapterBoundaryContractModel", "summarizeLocalBridgeAdapterBoundaryContract", "LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Local Bridge Adapter Boundary Contract", "Local bridge adapter boundary contract does not call the local bridge", "Local bridge adapter execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "bridge status", "handshake", "operator consent", "allowed adapters", "denied adapters", "sandbox profile", "network policy", "process policy", "audit/evidence/result states", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Local bridge adapter boundary contract does not call the local bridge") `
  -RouteHref "/local-bridge-adapter-boundary-contract"

Write-Host "[OK] CodexForge Phase 795 local bridge adapter boundary contract smoke passed."
