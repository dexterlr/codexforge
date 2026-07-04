param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2935 Provider Adapter Token Boundary Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-token-boundary-wiring.ps1" `
  -Route "provider-adapter-token-boundary-wiring" `
  -CommandLabel "Go to Provider Adapter Token Boundary Wiring" `
  -RouteHref "/provider-adapter-token-boundary-wiring" `
  -Phase "2935" `
  -Title "Provider Adapter Token Boundary Wiring"
