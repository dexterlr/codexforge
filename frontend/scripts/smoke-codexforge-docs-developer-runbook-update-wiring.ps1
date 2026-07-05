param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3235 Docs Developer Runbook Update Wiring' `
  -ScriptFile 'smoke-codexforge-docs-developer-runbook-update-wiring.ps1' `
  -Route 'docs-developer-runbook-update-wiring' `
  -CommandLabel 'Go to Docs Developer Runbook Update Wiring' `
  -RouteHref '/docs-developer-runbook-update-wiring' `
  -Phase 'Phase 3235' `
  -Title 'Docs Developer Runbook Update Wiring'
