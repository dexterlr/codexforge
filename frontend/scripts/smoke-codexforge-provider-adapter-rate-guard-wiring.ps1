param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2943 Provider Adapter Rate Guard Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-rate-guard-wiring.ps1" `
  -Route "provider-adapter-rate-guard-wiring" `
  -CommandLabel "Go to Provider Adapter Rate Guard Wiring" `
  -RouteHref "/provider-adapter-rate-guard-wiring" `
  -Phase "2943" `
  -Title "Provider Adapter Rate Guard Wiring"
