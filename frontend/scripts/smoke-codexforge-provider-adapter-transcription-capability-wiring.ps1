param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2930 Provider Adapter Transcription Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-transcription-capability-wiring.ps1" `
  -Route "provider-adapter-transcription-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Transcription Capability Wiring" `
  -RouteHref "/provider-adapter-transcription-capability-wiring" `
  -Phase "2930" `
  -Title "Provider Adapter Transcription Capability Wiring"
