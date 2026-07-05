param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3213 Primary Navigation Generate Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-generate-area-wiring.ps1' `
  -Route 'primary-navigation-generate-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Generate Area Wiring' `
  -RouteHref '/primary-navigation-generate-area-wiring' `
  -Phase 'Phase 3213' `
  -Title 'Primary Navigation Generate Area Wiring'
