param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3146 Live Provider Credential Vault Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-credential-vault-boundary-wiring.ps1' `
  -Route 'live-provider-credential-vault-boundary-wiring' `
  -CommandLabel 'Go to Live Provider Credential Vault Boundary Wiring' `
  -RouteHref '/live-provider-credential-vault-boundary-wiring' `
  -Phase 'Phase 3146' `
  -Title 'Live Provider Credential Vault Boundary Wiring'
