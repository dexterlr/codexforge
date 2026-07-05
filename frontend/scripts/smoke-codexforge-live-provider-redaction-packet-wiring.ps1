param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3160 Live Provider Redaction Packet Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-redaction-packet-wiring.ps1' `
  -Route 'live-provider-redaction-packet-wiring' `
  -CommandLabel 'Go to Live Provider Redaction Packet Wiring' `
  -RouteHref '/live-provider-redaction-packet-wiring' `
  -Phase 'Phase 3160' `
  -Title 'Live Provider Redaction Packet Wiring'
