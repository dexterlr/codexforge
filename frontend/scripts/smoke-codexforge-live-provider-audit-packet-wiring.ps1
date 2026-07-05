param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3159 Live Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-audit-packet-wiring.ps1' `
  -Route 'live-provider-audit-packet-wiring' `
  -CommandLabel 'Go to Live Provider Audit Packet Wiring' `
  -RouteHref '/live-provider-audit-packet-wiring' `
  -Phase 'Phase 3159' `
  -Title 'Live Provider Audit Packet Wiring'
