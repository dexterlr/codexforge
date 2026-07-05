param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3212 Primary Navigation Operator Cockpit Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-operator-cockpit-wiring.ps1' `
  -Route 'primary-navigation-operator-cockpit-wiring' `
  -CommandLabel 'Go to Primary Navigation Operator Cockpit Wiring' `
  -RouteHref '/primary-navigation-operator-cockpit-wiring' `
  -Phase 'Phase 3212' `
  -Title 'Primary Navigation Operator Cockpit Wiring'
