param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3163 Live Provider Rate Gate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-rate-gate-wiring.ps1' `
  -Route 'live-provider-rate-gate-wiring' `
  -CommandLabel 'Go to Live Provider Rate Gate Wiring' `
  -RouteHref '/live-provider-rate-gate-wiring' `
  -Phase 'Phase 3163' `
  -Title 'Live Provider Rate Gate Wiring'
