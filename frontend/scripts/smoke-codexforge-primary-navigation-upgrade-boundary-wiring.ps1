param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3210 Primary Navigation Upgrade Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-upgrade-boundary-wiring.ps1' `
  -Route 'primary-navigation-upgrade-boundary-wiring' `
  -CommandLabel 'Go to Primary Navigation Upgrade Boundary Wiring' `
  -RouteHref '/primary-navigation-upgrade-boundary-wiring' `
  -Phase 'Phase 3210' `
  -Title 'Primary Navigation Upgrade Boundary Wiring'
