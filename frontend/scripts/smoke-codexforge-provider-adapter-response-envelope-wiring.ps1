param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2937 Provider Adapter Response Envelope Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-response-envelope-wiring.ps1" `
  -Route "provider-adapter-response-envelope-wiring" `
  -CommandLabel "Go to Provider Adapter Response Envelope Wiring" `
  -RouteHref "/provider-adapter-response-envelope-wiring" `
  -Phase "2937" `
  -Title "Provider Adapter Response Envelope Wiring"
