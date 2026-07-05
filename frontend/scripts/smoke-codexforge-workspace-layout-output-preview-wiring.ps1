param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3225 Workspace Layout Output Preview Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-output-preview-wiring.ps1' `
  -Route 'workspace-layout-output-preview-wiring' `
  -CommandLabel 'Go to Workspace Layout Output Preview Wiring' `
  -RouteHref '/workspace-layout-output-preview-wiring' `
  -Phase 'Phase 3225' `
  -Title 'Workspace Layout Output Preview Wiring'
