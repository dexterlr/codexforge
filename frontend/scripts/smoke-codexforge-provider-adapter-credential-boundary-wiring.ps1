param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2934 Provider Adapter Credential Boundary Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-credential-boundary-wiring.ps1" `
  -Route "provider-adapter-credential-boundary-wiring" `
  -CommandLabel "Go to Provider Adapter Credential Boundary Wiring" `
  -RouteHref "/provider-adapter-credential-boundary-wiring" `
  -Phase "2934" `
  -Title "Provider Adapter Credential Boundary Wiring"
