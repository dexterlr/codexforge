param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3155 Live Provider Secret Rotation Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-secret-rotation-policy-wiring.ps1' `
  -Route 'live-provider-secret-rotation-policy-wiring' `
  -CommandLabel 'Go to Live Provider Secret Rotation Policy Wiring' `
  -RouteHref '/live-provider-secret-rotation-policy-wiring' `
  -Phase 'Phase 3155' `
  -Title 'Live Provider Secret Rotation Policy Wiring'
