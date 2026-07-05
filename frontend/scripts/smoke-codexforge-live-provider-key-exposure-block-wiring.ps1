param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3148 Live Provider Key Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-key-exposure-block-wiring.ps1' `
  -Route 'live-provider-key-exposure-block-wiring' `
  -CommandLabel 'Go to Live Provider Key Exposure Block Wiring' `
  -RouteHref '/live-provider-key-exposure-block-wiring' `
  -Phase 'Phase 3148' `
  -Title 'Live Provider Key Exposure Block Wiring'
