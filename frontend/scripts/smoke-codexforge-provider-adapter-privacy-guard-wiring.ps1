param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2944 Provider Adapter Privacy Guard Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-privacy-guard-wiring.ps1" `
  -Route "provider-adapter-privacy-guard-wiring" `
  -CommandLabel "Go to Provider Adapter Privacy Guard Wiring" `
  -RouteHref "/provider-adapter-privacy-guard-wiring" `
  -Phase "2944" `
  -Title "Provider Adapter Privacy Guard Wiring"
