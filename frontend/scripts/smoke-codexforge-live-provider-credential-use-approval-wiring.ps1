param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3152 Live Provider Credential Use Approval Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-credential-use-approval-wiring.ps1' `
  -Route 'live-provider-credential-use-approval-wiring' `
  -CommandLabel 'Go to Live Provider Credential Use Approval Wiring' `
  -RouteHref '/live-provider-credential-use-approval-wiring' `
  -Phase 'Phase 3152' `
  -Title 'Live Provider Credential Use Approval Wiring'
