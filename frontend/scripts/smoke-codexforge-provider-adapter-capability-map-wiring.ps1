param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2925 Provider Adapter Capability Map Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-capability-map-wiring.ps1" `
  -Route "provider-adapter-capability-map-wiring" `
  -CommandLabel "Go to Provider Adapter Capability Map Wiring" `
  -RouteHref "/provider-adapter-capability-map-wiring" `
  -Phase "2925" `
  -Title "Provider Adapter Capability Map Wiring"
