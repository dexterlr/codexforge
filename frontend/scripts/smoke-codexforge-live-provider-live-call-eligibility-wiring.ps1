param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3172 Live Provider Live Call Eligibility Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-live-call-eligibility-wiring.ps1' `
  -Route 'live-provider-live-call-eligibility-wiring' `
  -CommandLabel 'Go to Live Provider Live Call Eligibility Wiring' `
  -RouteHref '/live-provider-live-call-eligibility-wiring' `
  -Phase 'Phase 3172' `
  -Title 'Live Provider Live Call Eligibility Wiring'
