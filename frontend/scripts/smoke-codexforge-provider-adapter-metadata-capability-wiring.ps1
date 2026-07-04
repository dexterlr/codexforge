param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2932 Provider Adapter Metadata Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-metadata-capability-wiring.ps1" `
  -Route "provider-adapter-metadata-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Metadata Capability Wiring" `
  -RouteHref "/provider-adapter-metadata-capability-wiring" `
  -Phase "2932" `
  -Title "Provider Adapter Metadata Capability Wiring"
