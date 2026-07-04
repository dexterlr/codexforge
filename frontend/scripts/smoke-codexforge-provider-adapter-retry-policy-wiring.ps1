param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2948 Provider Adapter Retry Policy Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-retry-policy-wiring.ps1" `
  -Route "provider-adapter-retry-policy-wiring" `
  -CommandLabel "Go to Provider Adapter Retry Policy Wiring" `
  -RouteHref "/provider-adapter-retry-policy-wiring" `
  -Phase "2948" `
  -Title "Provider Adapter Retry Policy Wiring"
