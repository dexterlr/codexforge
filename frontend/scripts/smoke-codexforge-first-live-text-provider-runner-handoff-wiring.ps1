param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3207 First Live Text Provider Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-runner-handoff-wiring.ps1' `
  -Route 'first-live-text-provider-runner-handoff-wiring' `
  -CommandLabel 'Go to First Live Text Provider Runner Handoff Wiring' `
  -RouteHref '/first-live-text-provider-runner-handoff-wiring' `
  -Phase 'Phase 3207' `
  -Title 'First Live Text Provider Runner Handoff Wiring'