param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3237 Docs Live Provider Bridge Summary Wiring' `
  -ScriptFile 'smoke-codexforge-docs-live-provider-bridge-summary-wiring.ps1' `
  -Route 'docs-live-provider-bridge-summary-wiring' `
  -CommandLabel 'Go to Docs Live Provider Bridge Summary Wiring' `
  -RouteHref '/docs-live-provider-bridge-summary-wiring' `
  -Phase 'Phase 3237' `
  -Title 'Docs Live Provider Bridge Summary Wiring'
