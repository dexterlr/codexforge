param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3224 Workspace Layout Approval State Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-approval-state-wiring.ps1' `
  -Route 'workspace-layout-approval-state-wiring' `
  -CommandLabel 'Go to Workspace Layout Approval State Wiring' `
  -RouteHref '/workspace-layout-approval-state-wiring' `
  -Phase 'Phase 3224' `
  -Title 'Workspace Layout Approval State Wiring'
