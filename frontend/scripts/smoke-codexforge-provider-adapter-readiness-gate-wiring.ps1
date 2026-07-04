param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2952 Provider Adapter Readiness Gate Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-readiness-gate-wiring.ps1" `
  -Route "provider-adapter-readiness-gate-wiring" `
  -CommandLabel "Go to Provider Adapter Readiness Gate Wiring" `
  -RouteHref "/provider-adapter-readiness-gate-wiring" `
  -Phase "2952" `
  -Title "Provider Adapter Readiness Gate Wiring"
