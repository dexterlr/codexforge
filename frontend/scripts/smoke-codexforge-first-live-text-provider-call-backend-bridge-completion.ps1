param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3209 First Live Text Provider Call Backend Bridge Completion' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-call-backend-bridge-completion.ps1' `
  -Route 'first-live-text-provider-call-backend-bridge-completion' `
  -CommandLabel 'Go to First Live Text Provider Call Backend Bridge Completion' `
  -RouteHref '/first-live-text-provider-call-backend-bridge-completion' `
  -Phase 'Phase 3209' `
  -Title 'First Live Text Provider Call Backend Bridge Completion'