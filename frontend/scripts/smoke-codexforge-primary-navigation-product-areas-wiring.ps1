param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3211 Primary Navigation Product Areas Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-product-areas-wiring.ps1' `
  -Route 'primary-navigation-product-areas-wiring' `
  -CommandLabel 'Go to Primary Navigation Product Areas Wiring' `
  -RouteHref '/primary-navigation-product-areas-wiring' `
  -Phase 'Phase 3211' `
  -Title 'Primary Navigation Product Areas Wiring'
