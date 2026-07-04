param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2945 Provider Adapter Safety Guard Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-safety-guard-wiring.ps1" `
  -Route "provider-adapter-safety-guard-wiring" `
  -CommandLabel "Go to Provider Adapter Safety Guard Wiring" `
  -RouteHref "/provider-adapter-safety-guard-wiring" `
  -Phase "2945" `
  -Title "Provider Adapter Safety Guard Wiring"
