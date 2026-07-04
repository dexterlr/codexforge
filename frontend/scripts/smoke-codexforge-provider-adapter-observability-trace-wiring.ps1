param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2950 Provider Adapter Observability Trace Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-observability-trace-wiring.ps1" `
  -Route "provider-adapter-observability-trace-wiring" `
  -CommandLabel "Go to Provider Adapter Observability Trace Wiring" `
  -RouteHref "/provider-adapter-observability-trace-wiring" `
  -Phase "2950" `
  -Title "Provider Adapter Observability Trace Wiring"
