param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3171 Live Provider Kill Switch Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-kill-switch-wiring.ps1' `
  -Route 'live-provider-kill-switch-wiring' `
  -CommandLabel 'Go to Live Provider Kill Switch Wiring' `
  -RouteHref '/live-provider-kill-switch-wiring' `
  -Phase 'Phase 3171' `
  -Title 'Live Provider Kill Switch Wiring'
