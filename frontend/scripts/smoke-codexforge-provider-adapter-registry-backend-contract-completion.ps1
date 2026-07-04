param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-adapter-registry-backend-contract-smoke-helper.ps1")

Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke `
  -SmokeName "Phase 2953 Provider Adapter Registry Backend Contract Completion" `
  -ScriptFile "smoke-codexforge-provider-adapter-registry-backend-contract-completion.ps1" `
  -Route "provider-adapter-registry-backend-contract-completion" `
  -CommandLabel "Go to Provider Adapter Registry Backend Contract Completion" `
  -RouteHref "/provider-adapter-registry-backend-contract-completion" `
  -Phase "2953" `
  -Title "Provider Adapter Registry Backend Contract Completion"
