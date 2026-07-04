param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2936 Provider Adapter Request Envelope Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-request-envelope-wiring.ps1" `
  -Route "provider-adapter-request-envelope-wiring" `
  -CommandLabel "Go to Provider Adapter Request Envelope Wiring" `
  -RouteHref "/provider-adapter-request-envelope-wiring" `
  -Phase "2936" `
  -Title "Provider Adapter Request Envelope Wiring"
