param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3147 Live Provider Secret Reference Contract Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-secret-reference-contract-wiring.ps1' `
  -Route 'live-provider-secret-reference-contract-wiring' `
  -CommandLabel 'Go to Live Provider Secret Reference Contract Wiring' `
  -RouteHref '/live-provider-secret-reference-contract-wiring' `
  -Phase 'Phase 3147' `
  -Title 'Live Provider Secret Reference Contract Wiring'
