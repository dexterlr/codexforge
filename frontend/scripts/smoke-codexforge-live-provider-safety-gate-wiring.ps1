param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3165 Live Provider Safety Gate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-safety-gate-wiring.ps1' `
  -Route 'live-provider-safety-gate-wiring' `
  -CommandLabel 'Go to Live Provider Safety Gate Wiring' `
  -RouteHref '/live-provider-safety-gate-wiring' `
  -Phase 'Phase 3165' `
  -Title 'Live Provider Safety Gate Wiring'
