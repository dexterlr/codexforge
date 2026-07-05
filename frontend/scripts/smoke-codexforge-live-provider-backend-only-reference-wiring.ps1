param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3151 Live Provider Backend Only Reference Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-backend-only-reference-wiring.ps1' `
  -Route 'live-provider-backend-only-reference-wiring' `
  -CommandLabel 'Go to Live Provider Backend Only Reference Wiring' `
  -RouteHref '/live-provider-backend-only-reference-wiring' `
  -Phase 'Phase 3151' `
  -Title 'Live Provider Backend Only Reference Wiring'
