param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3154 Live Provider Token Scope Review Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-token-scope-review-wiring.ps1' `
  -Route 'live-provider-token-scope-review-wiring' `
  -CommandLabel 'Go to Live Provider Token Scope Review Wiring' `
  -RouteHref '/live-provider-token-scope-review-wiring' `
  -Phase 'Phase 3154' `
  -Title 'Live Provider Token Scope Review Wiring'
