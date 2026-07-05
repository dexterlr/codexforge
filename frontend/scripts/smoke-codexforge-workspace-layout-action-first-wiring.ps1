param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3222 Workspace Layout Action First Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-action-first-wiring.ps1' `
  -Route 'workspace-layout-action-first-wiring' `
  -CommandLabel 'Go to Workspace Layout Action First Wiring' `
  -RouteHref '/workspace-layout-action-first-wiring' `
  -Phase 'Phase 3222' `
  -Title 'Workspace Layout Action First Wiring'
