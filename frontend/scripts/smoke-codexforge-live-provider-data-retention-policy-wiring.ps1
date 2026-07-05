param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3167 Live Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-data-retention-policy-wiring.ps1' `
  -Route 'live-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to Live Provider Data Retention Policy Wiring' `
  -RouteHref '/live-provider-data-retention-policy-wiring' `
  -Phase 'Phase 3167' `
  -Title 'Live Provider Data Retention Policy Wiring'
