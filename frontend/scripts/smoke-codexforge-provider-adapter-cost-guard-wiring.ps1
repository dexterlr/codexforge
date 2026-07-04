param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2942 Provider Adapter Cost Guard Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-cost-guard-wiring.ps1" `
  -Route "provider-adapter-cost-guard-wiring" `
  -CommandLabel "Go to Provider Adapter Cost Guard Wiring" `
  -RouteHref "/provider-adapter-cost-guard-wiring" `
  -Phase "2942" `
  -Title "Provider Adapter Cost Guard Wiring"
