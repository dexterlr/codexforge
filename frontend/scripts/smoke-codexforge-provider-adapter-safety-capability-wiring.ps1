param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2933 Provider Adapter Safety Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-safety-capability-wiring.ps1" `
  -Route "provider-adapter-safety-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Safety Capability Wiring" `
  -RouteHref "/provider-adapter-safety-capability-wiring" `
  -Phase "2933" `
  -Title "Provider Adapter Safety Capability Wiring"
