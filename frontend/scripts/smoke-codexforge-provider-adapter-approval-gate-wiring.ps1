param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2939 Provider Adapter Approval Gate Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-approval-gate-wiring.ps1" `
  -Route "provider-adapter-approval-gate-wiring" `
  -CommandLabel "Go to Provider Adapter Approval Gate Wiring" `
  -RouteHref "/provider-adapter-approval-gate-wiring" `
  -Phase "2939" `
  -Title "Provider Adapter Approval Gate Wiring"
