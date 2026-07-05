param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3217 Primary Navigation Workflows Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-workflows-area-wiring.ps1' `
  -Route 'primary-navigation-workflows-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Workflows Area Wiring' `
  -RouteHref '/primary-navigation-workflows-area-wiring' `
  -Phase 'Phase 3217' `
  -Title 'Primary Navigation Workflows Area Wiring'
