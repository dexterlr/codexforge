param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3214 Primary Navigation Projects Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-projects-area-wiring.ps1' `
  -Route 'primary-navigation-projects-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Projects Area Wiring' `
  -RouteHref '/primary-navigation-projects-area-wiring' `
  -Phase 'Phase 3214' `
  -Title 'Primary Navigation Projects Area Wiring'
