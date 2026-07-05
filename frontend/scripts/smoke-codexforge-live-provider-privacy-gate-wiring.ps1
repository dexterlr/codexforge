param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3164 Live Provider Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-privacy-gate-wiring.ps1' `
  -Route 'live-provider-privacy-gate-wiring' `
  -CommandLabel 'Go to Live Provider Privacy Gate Wiring' `
  -RouteHref '/live-provider-privacy-gate-wiring' `
  -Phase 'Phase 3164' `
  -Title 'Live Provider Privacy Gate Wiring'
