param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2940 Provider Adapter Audit Envelope Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-audit-envelope-wiring.ps1" `
  -Route "provider-adapter-audit-envelope-wiring" `
  -CommandLabel "Go to Provider Adapter Audit Envelope Wiring" `
  -RouteHref "/provider-adapter-audit-envelope-wiring" `
  -Phase "2940" `
  -Title "Provider Adapter Audit Envelope Wiring"
