param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2922 Provider Adapter Registry Boundary Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-registry-boundary-wiring.ps1" `
  -Route "provider-adapter-registry-boundary-wiring" `
  -CommandLabel "Go to Provider Adapter Registry Boundary Wiring" `
  -RouteHref "/provider-adapter-registry-boundary-wiring" `
  -Phase "2922" `
  -Title "Provider Adapter Registry Boundary Wiring"
