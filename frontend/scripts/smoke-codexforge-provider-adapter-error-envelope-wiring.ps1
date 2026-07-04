param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2938 Provider Adapter Error Envelope Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-error-envelope-wiring.ps1" `
  -Route "provider-adapter-error-envelope-wiring" `
  -CommandLabel "Go to Provider Adapter Error Envelope Wiring" `
  -RouteHref "/provider-adapter-error-envelope-wiring" `
  -Phase "2938" `
  -Title "Provider Adapter Error Envelope Wiring"
