param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2951 Provider Adapter Runner Handoff Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-runner-handoff-wiring.ps1" `
  -Route "provider-adapter-runner-handoff-wiring" `
  -CommandLabel "Go to Provider Adapter Runner Handoff Wiring" `
  -RouteHref "/provider-adapter-runner-handoff-wiring" `
  -Phase "2951" `
  -Title "Provider Adapter Runner Handoff Wiring"
