param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3174 Live Provider Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-operator-review-wiring.ps1' `
  -Route 'live-provider-operator-review-wiring' `
  -CommandLabel 'Go to Live Provider Operator Review Wiring' `
  -RouteHref '/live-provider-operator-review-wiring' `
  -Phase 'Phase 3174' `
  -Title 'Live Provider Operator Review Wiring'
