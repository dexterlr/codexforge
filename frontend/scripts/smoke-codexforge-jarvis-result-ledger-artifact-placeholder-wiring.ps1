param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3702 Jarvis Result Ledger Artifact Placeholder Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-result-ledger-artifact-placeholder-wiring.ps1' `
  -Route 'jarvis-result-ledger-artifact-placeholder-wiring' `
  -CommandLabel 'Go to Jarvis Result Ledger Artifact Placeholder Wiring' `
  -RouteHref '/jarvis-result-ledger-artifact-placeholder-wiring' `
  -Phase '3702' `
  -Title 'Jarvis Result Ledger Artifact Placeholder Wiring'
