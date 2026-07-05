param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3234 Docs Operator Runbook Update Wiring' `
  -ScriptFile 'smoke-codexforge-docs-operator-runbook-update-wiring.ps1' `
  -Route 'docs-operator-runbook-update-wiring' `
  -CommandLabel 'Go to Docs Operator Runbook Update Wiring' `
  -RouteHref '/docs-operator-runbook-update-wiring' `
  -Phase 'Phase 3234' `
  -Title 'Docs Operator Runbook Update Wiring'
