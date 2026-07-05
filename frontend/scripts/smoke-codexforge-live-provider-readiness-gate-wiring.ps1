param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3176 Live Provider Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-readiness-gate-wiring.ps1' `
  -Route 'live-provider-readiness-gate-wiring' `
  -CommandLabel 'Go to Live Provider Readiness Gate Wiring' `
  -RouteHref '/live-provider-readiness-gate-wiring' `
  -Phase 'Phase 3176' `
  -Title 'Live Provider Readiness Gate Wiring'
