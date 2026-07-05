param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3150 Live Provider Frontend Secret Block Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-frontend-secret-block-wiring.ps1' `
  -Route 'live-provider-frontend-secret-block-wiring' `
  -CommandLabel 'Go to Live Provider Frontend Secret Block Wiring' `
  -RouteHref '/live-provider-frontend-secret-block-wiring' `
  -Phase 'Phase 3150' `
  -Title 'Live Provider Frontend Secret Block Wiring'
