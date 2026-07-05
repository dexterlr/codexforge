param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3241 Primary Navigation README Workspace Layout Upgrade Completion' `
  -ScriptFile 'smoke-codexforge-primary-navigation-readme-workspace-layout-upgrade-completion.ps1' `
  -Route 'primary-navigation-readme-workspace-layout-upgrade-completion' `
  -CommandLabel 'Go to Primary Navigation README Workspace Layout Upgrade Completion' `
  -RouteHref '/primary-navigation-readme-workspace-layout-upgrade-completion' `
  -Phase 'Phase 3241' `
  -Title 'Primary Navigation README Workspace Layout Upgrade Completion'
