param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3229 README Current Status Wiring' `
  -ScriptFile 'smoke-codexforge-readme-current-status-wiring.ps1' `
  -Route 'readme-current-status-wiring' `
  -CommandLabel 'Go to README Current Status Wiring' `
  -RouteHref '/readme-current-status-wiring' `
  -Phase 'Phase 3229' `
  -Title 'README Current Status Wiring'
