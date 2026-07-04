param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2931 Provider Adapter Editing Capability Wiring" `
  -ScriptFile "smoke-codexforge-provider-adapter-editing-capability-wiring.ps1" `
  -Route "provider-adapter-editing-capability-wiring" `
  -CommandLabel "Go to Provider Adapter Editing Capability Wiring" `
  -RouteHref "/provider-adapter-editing-capability-wiring" `
  -Phase "2931" `
  -Title "Provider Adapter Editing Capability Wiring"
