param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3178 First Live Text Provider Bridge Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-bridge-boundary-wiring.ps1' `
  -Route 'first-live-text-provider-bridge-boundary-wiring' `
  -CommandLabel 'Go to First Live Text Provider Bridge Boundary Wiring' `
  -RouteHref '/first-live-text-provider-bridge-boundary-wiring' `
  -Phase 'Phase 3178' `
  -Title 'First Live Text Provider Bridge Boundary Wiring'