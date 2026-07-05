param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3039 First Real Provider Call Recovery Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-recovery-policy-wiring.ps1' `
  -Route 'first-real-provider-call-recovery-policy-wiring' `
  -CommandLabel 'Go to First Real Provider Call Recovery Policy Wiring' `
  -RouteHref '/first-real-provider-call-recovery-policy-wiring' `
  -Phase '3039' `
  -Title 'First Real Provider Call Recovery Policy Wiring'
