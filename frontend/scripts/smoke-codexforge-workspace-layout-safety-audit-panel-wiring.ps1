param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3226 Workspace Layout Safety Audit Panel Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-safety-audit-panel-wiring.ps1' `
  -Route 'workspace-layout-safety-audit-panel-wiring' `
  -CommandLabel 'Go to Workspace Layout Safety Audit Panel Wiring' `
  -RouteHref '/workspace-layout-safety-audit-panel-wiring' `
  -Phase 'Phase 3226' `
  -Title 'Workspace Layout Safety Audit Panel Wiring'
