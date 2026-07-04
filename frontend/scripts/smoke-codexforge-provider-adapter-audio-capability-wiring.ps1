param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2928 Provider Adapter Audio Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-audio-capability-wiring.ps1" `
  -Route "provider-adapter-audio-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Audio Capability Wiring" `
  -RouteHref "/provider-adapter-audio-capability-wiring" `
  -Phase "2928" `
  -Title "Provider Adapter Audio Capability Wiring"
