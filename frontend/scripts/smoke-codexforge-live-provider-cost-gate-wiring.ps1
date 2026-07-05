param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3162 Live Provider Cost Gate Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-cost-gate-wiring.ps1' `
  -Route 'live-provider-cost-gate-wiring' `
  -CommandLabel 'Go to Live Provider Cost Gate Wiring' `
  -RouteHref '/live-provider-cost-gate-wiring' `
  -Phase 'Phase 3162' `
  -Title 'Live Provider Cost Gate Wiring'
