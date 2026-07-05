param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3218 Primary Navigation Trading Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-trading-area-wiring.ps1' `
  -Route 'primary-navigation-trading-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Trading Area Wiring' `
  -RouteHref '/primary-navigation-trading-area-wiring' `
  -Phase 'Phase 3218' `
  -Title 'Primary Navigation Trading Area Wiring'
