param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3168 Live Provider Timeout Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-timeout-policy-wiring.ps1' `
  -Route 'live-provider-timeout-policy-wiring' `
  -CommandLabel 'Go to Live Provider Timeout Policy Wiring' `
  -RouteHref '/live-provider-timeout-policy-wiring' `
  -Phase 'Phase 3168' `
  -Title 'Live Provider Timeout Policy Wiring'
