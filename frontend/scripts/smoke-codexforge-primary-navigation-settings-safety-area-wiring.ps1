param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3220 Primary Navigation Settings Safety Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-settings-safety-area-wiring.ps1' `
  -Route 'primary-navigation-settings-safety-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Settings Safety Area Wiring' `
  -RouteHref '/primary-navigation-settings-safety-area-wiring' `
  -Phase 'Phase 3220' `
  -Title 'Primary Navigation Settings Safety Area Wiring'
