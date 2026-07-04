param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2941 Provider Adapter Redaction Envelope Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-redaction-envelope-wiring.ps1" `
  -Route "provider-adapter-redaction-envelope-wiring" `
  -CommandLabel "Go to Provider Adapter Redaction Envelope Wiring" `
  -RouteHref "/provider-adapter-redaction-envelope-wiring" `
  -Phase "2941" `
  -Title "Provider Adapter Redaction Envelope Wiring"
