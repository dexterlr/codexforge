param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2929 Provider Adapter Video Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-video-capability-wiring.ps1" `
  -Route "provider-adapter-video-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Video Capability Wiring" `
  -RouteHref "/provider-adapter-video-capability-wiring" `
  -Phase "2929" `
  -Title "Provider Adapter Video Capability Wiring"
