param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3156 Live Provider Secret Revocation Policy Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-secret-revocation-policy-wiring.ps1' `
  -Route 'live-provider-secret-revocation-policy-wiring' `
  -CommandLabel 'Go to Live Provider Secret Revocation Policy Wiring' `
  -RouteHref '/live-provider-secret-revocation-policy-wiring' `
  -Phase 'Phase 3156' `
  -Title 'Live Provider Secret Revocation Policy Wiring'
