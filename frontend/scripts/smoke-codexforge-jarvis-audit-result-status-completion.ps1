param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3721 Jarvis Audit Result Status Completion' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-result-status-completion.ps1' `
  -Route 'jarvis-audit-result-status-completion' `
  -CommandLabel 'Go to Jarvis Audit Result Status Completion' `
  -RouteHref '/jarvis-audit-result-status-completion' `
  -Phase '3721' `
  -Title 'Jarvis Audit Result Status Completion'
