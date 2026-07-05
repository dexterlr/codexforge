param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3233 Docs Checkpoint History Preservation Wiring' `
  -ScriptFile 'smoke-codexforge-docs-checkpoint-history-preservation-wiring.ps1' `
  -Route 'docs-checkpoint-history-preservation-wiring' `
  -CommandLabel 'Go to Docs Checkpoint History Preservation Wiring' `
  -RouteHref '/docs-checkpoint-history-preservation-wiring' `
  -Phase 'Phase 3233' `
  -Title 'Docs Checkpoint History Preservation Wiring'
