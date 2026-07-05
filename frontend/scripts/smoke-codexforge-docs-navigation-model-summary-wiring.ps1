param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3238 Docs Navigation Model Summary Wiring' `
  -ScriptFile 'smoke-codexforge-docs-navigation-model-summary-wiring.ps1' `
  -Route 'docs-navigation-model-summary-wiring' `
  -CommandLabel 'Go to Docs Navigation Model Summary Wiring' `
  -RouteHref '/docs-navigation-model-summary-wiring' `
  -Phase 'Phase 3238' `
  -Title 'Docs Navigation Model Summary Wiring'
