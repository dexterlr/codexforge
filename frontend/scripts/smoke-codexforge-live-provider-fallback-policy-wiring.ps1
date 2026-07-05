param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3170 Live Provider Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-fallback-policy-wiring.ps1' `
  -Route 'live-provider-fallback-policy-wiring' `
  -CommandLabel 'Go to Live Provider Fallback Policy Wiring' `
  -RouteHref '/live-provider-fallback-policy-wiring' `
  -Phase 'Phase 3170' `
  -Title 'Live Provider Fallback Policy Wiring'
