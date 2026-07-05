param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3166 Live Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-region-policy-wiring.ps1' `
  -Route 'live-provider-region-policy-wiring' `
  -CommandLabel 'Go to Live Provider Region Policy Wiring' `
  -RouteHref '/live-provider-region-policy-wiring' `
  -Phase 'Phase 3166' `
  -Title 'Live Provider Region Policy Wiring'
