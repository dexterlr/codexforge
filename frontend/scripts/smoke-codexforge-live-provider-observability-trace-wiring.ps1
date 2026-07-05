param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-live-provider-credential-vault-readiness-batch-smoke-helper.ps1')

Invoke-CodexForgeLiveProviderCredentialVaultReadinessBatchSmoke `
  -SmokeName 'Phase 3161 Live Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-live-provider-observability-trace-wiring.ps1' `
  -Route 'live-provider-observability-trace-wiring' `
  -CommandLabel 'Go to Live Provider Observability Trace Wiring' `
  -RouteHref '/live-provider-observability-trace-wiring' `
  -Phase 'Phase 3161' `
  -Title 'Live Provider Observability Trace Wiring'
