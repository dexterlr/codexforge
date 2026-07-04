param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2949 Provider Adapter Fallback Policy Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-fallback-policy-wiring.ps1" `
  -Route "provider-adapter-fallback-policy-wiring" `
  -CommandLabel "Go to Provider Adapter Fallback Policy Wiring" `
  -RouteHref "/provider-adapter-fallback-policy-wiring" `
  -Phase "2949" `
  -Title "Provider Adapter Fallback Policy Wiring"
