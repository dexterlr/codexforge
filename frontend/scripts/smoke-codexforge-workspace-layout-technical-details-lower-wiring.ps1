param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3227 Workspace Layout Technical Details Lower Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-technical-details-lower-wiring.ps1' `
  -Route 'workspace-layout-technical-details-lower-wiring' `
  -CommandLabel 'Go to Workspace Layout Technical Details Lower Wiring' `
  -RouteHref '/workspace-layout-technical-details-lower-wiring' `
  -Phase 'Phase 3227' `
  -Title 'Workspace Layout Technical Details Lower Wiring'
