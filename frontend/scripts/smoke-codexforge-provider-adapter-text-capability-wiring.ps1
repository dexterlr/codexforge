param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2926 Provider Adapter Text Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-text-capability-wiring.ps1" `
  -Route "provider-adapter-text-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Text Capability Wiring" `
  -RouteHref "/provider-adapter-text-capability-wiring" `
  -Phase "2926" `
  -Title "Provider Adapter Text Capability Wiring"
