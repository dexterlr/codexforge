param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3219 Primary Navigation Audit Runs Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-audit-runs-area-wiring.ps1' `
  -Route 'primary-navigation-audit-runs-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Audit Runs Area Wiring' `
  -RouteHref '/primary-navigation-audit-runs-area-wiring' `
  -Phase 'Phase 3219' `
  -Title 'Primary Navigation Audit Runs Area Wiring'
