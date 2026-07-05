param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3153 Live Provider Credential Scope Review Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-credential-scope-review-wiring.ps1' `
  -Route 'live-provider-credential-scope-review-wiring' `
  -CommandLabel 'Go to Live Provider Credential Scope Review Wiring' `
  -RouteHref '/live-provider-credential-scope-review-wiring' `
  -Phase 'Phase 3153' `
  -Title 'Live Provider Credential Scope Review Wiring'
