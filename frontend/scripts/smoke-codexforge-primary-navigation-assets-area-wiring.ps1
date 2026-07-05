param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3215 Primary Navigation Assets Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-assets-area-wiring.ps1' `
  -Route 'primary-navigation-assets-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Assets Area Wiring' `
  -RouteHref '/primary-navigation-assets-area-wiring' `
  -Phase 'Phase 3215' `
  -Title 'Primary Navigation Assets Area Wiring'
