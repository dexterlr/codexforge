param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2923 Provider Adapter Registry Contract Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-registry-contract-wiring.ps1" `
  -Route "provider-adapter-registry-contract-wiring" `
  -CommandLabel "Go to Provider Adapter Registry Contract Wiring" `
  -RouteHref "/provider-adapter-registry-contract-wiring" `
  -Phase "2923" `
  -Title "Provider Adapter Registry Contract Wiring"
