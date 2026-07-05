param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3158 Live Provider Dev Prod Separation Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-dev-prod-separation-wiring.ps1' `
  -Route 'live-provider-dev-prod-separation-wiring' `
  -CommandLabel 'Go to Live Provider Dev Prod Separation Wiring' `
  -RouteHref '/live-provider-dev-prod-separation-wiring' `
  -Phase 'Phase 3158' `
  -Title 'Live Provider Dev Prod Separation Wiring'
