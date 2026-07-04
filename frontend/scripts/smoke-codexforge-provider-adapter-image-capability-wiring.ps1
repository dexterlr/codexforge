param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2927 Provider Adapter Image Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-image-capability-wiring.ps1" `
  -Route "provider-adapter-image-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Image Capability Wiring" `
  -RouteHref "/provider-adapter-image-capability-wiring" `
  -Phase "2927" `
  -Title "Provider Adapter Image Capability Wiring"
