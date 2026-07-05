param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3230 README Live Readiness Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-readme-live-readiness-boundary-wiring.ps1' `
  -Route 'readme-live-readiness-boundary-wiring' `
  -CommandLabel 'Go to README Live Readiness Boundary Wiring' `
  -RouteHref '/readme-live-readiness-boundary-wiring' `
  -Phase 'Phase 3230' `
  -Title 'README Live Readiness Boundary Wiring'
