param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3169 Live Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-retry-policy-wiring.ps1' `
  -Route 'live-provider-retry-policy-wiring' `
  -CommandLabel 'Go to Live Provider Retry Policy Wiring' `
  -RouteHref '/live-provider-retry-policy-wiring' `
  -Phase 'Phase 3169' `
  -Title 'Live Provider Retry Policy Wiring'
