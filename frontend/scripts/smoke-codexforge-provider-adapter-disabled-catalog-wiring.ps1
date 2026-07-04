param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2924 Provider Adapter Disabled Catalog Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-disabled-catalog-wiring.ps1" `
  -Route "provider-adapter-disabled-catalog-wiring" `
  -CommandLabel "Go to Provider Adapter Disabled Catalog Wiring" `
  -RouteHref "/provider-adapter-disabled-catalog-wiring" `
  -Phase "2924" `
  -Title "Provider Adapter Disabled Catalog Wiring"
