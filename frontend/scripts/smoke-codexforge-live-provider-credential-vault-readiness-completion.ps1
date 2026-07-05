param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3177 Live Provider Credential Vault Readiness Completion' `
  -ScriptFile 'smoke-codexforge-live-provider-credential-vault-readiness-completion.ps1' `
  -Route 'live-provider-credential-vault-readiness-completion' `
  -CommandLabel 'Go to Live Provider Credential Vault Readiness Completion' `
  -RouteHref '/live-provider-credential-vault-readiness-completion' `
  -Phase 'Phase 3177' `
  -Title 'Live Provider Credential Vault Readiness Completion'
