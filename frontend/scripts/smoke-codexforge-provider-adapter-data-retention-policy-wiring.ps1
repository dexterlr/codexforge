param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2947 Provider Adapter Data Retention Policy Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-data-retention-policy-wiring.ps1" `
  -Route "provider-adapter-data-retention-policy-wiring" `
  -CommandLabel "Go to Provider Adapter Data Retention Policy Wiring" `
  -RouteHref "/provider-adapter-data-retention-policy-wiring" `
  -Phase "2947" `
  -Title "Provider Adapter Data Retention Policy Wiring"
