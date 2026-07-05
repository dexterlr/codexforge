param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3236 Docs Safety Boundary Summary Wiring' `
  -ScriptFile 'smoke-codexforge-docs-safety-boundary-summary-wiring.ps1' `
  -Route 'docs-safety-boundary-summary-wiring' `
  -CommandLabel 'Go to Docs Safety Boundary Summary Wiring' `
  -RouteHref '/docs-safety-boundary-summary-wiring' `
  -Phase 'Phase 3236' `
  -Title 'Docs Safety Boundary Summary Wiring'
