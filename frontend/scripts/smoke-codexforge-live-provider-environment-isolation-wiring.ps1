param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3157 Live Provider Environment Isolation Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-environment-isolation-wiring.ps1' `
  -Route 'live-provider-environment-isolation-wiring' `
  -CommandLabel 'Go to Live Provider Environment Isolation Wiring' `
  -RouteHref '/live-provider-environment-isolation-wiring' `
  -Phase 'Phase 3157' `
  -Title 'Live Provider Environment Isolation Wiring'
