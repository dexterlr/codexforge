param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3149 Live Provider Token Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-token-exposure-block-wiring.ps1' `
  -Route 'live-provider-token-exposure-block-wiring' `
  -CommandLabel 'Go to Live Provider Token Exposure Block Wiring' `
  -RouteHref '/live-provider-token-exposure-block-wiring' `
  -Phase 'Phase 3149' `
  -Title 'Live Provider Token Exposure Block Wiring'
