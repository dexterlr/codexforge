param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3175 Live Provider Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-runner-handoff-wiring.ps1' `
  -Route 'live-provider-runner-handoff-wiring' `
  -CommandLabel 'Go to Live Provider Runner Handoff Wiring' `
  -RouteHref '/live-provider-runner-handoff-wiring' `
  -Phase 'Phase 3175' `
  -Title 'Live Provider Runner Handoff Wiring'
