param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3173 Live Provider Blocked Live Call Candidate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-blocked-live-call-candidate-wiring.ps1' `
  -Route 'live-provider-blocked-live-call-candidate-wiring' `
  -CommandLabel 'Go to Live Provider Blocked Live Call Candidate Wiring' `
  -RouteHref '/live-provider-blocked-live-call-candidate-wiring' `
  -Phase 'Phase 3173' `
  -Title 'Live Provider Blocked Live Call Candidate Wiring'
