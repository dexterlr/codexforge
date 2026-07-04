param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2946 Provider Adapter Region Policy Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-region-policy-wiring.ps1" `
  -Route "provider-adapter-region-policy-wiring" `
  -CommandLabel "Go to Provider Adapter Region Policy Wiring" `
  -RouteHref "/provider-adapter-region-policy-wiring" `
  -Phase "2946" `
  -Title "Provider Adapter Region Policy Wiring"
