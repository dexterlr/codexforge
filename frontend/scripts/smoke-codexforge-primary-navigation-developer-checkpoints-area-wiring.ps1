param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3221 Primary Navigation Developer Checkpoints Area Wiring' `
  -ScriptFile 'smoke-codexforge-primary-navigation-developer-checkpoints-area-wiring.ps1' `
  -Route 'primary-navigation-developer-checkpoints-area-wiring' `
  -CommandLabel 'Go to Primary Navigation Developer Checkpoints Area Wiring' `
  -RouteHref '/primary-navigation-developer-checkpoints-area-wiring' `
  -Phase 'Phase 3221' `
  -Title 'Primary Navigation Developer Checkpoints Area Wiring'
