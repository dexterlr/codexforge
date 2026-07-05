param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3240 Product Shell Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-product-shell-readiness-gate-wiring.ps1' `
  -Route 'product-shell-readiness-gate-wiring' `
  -CommandLabel 'Go to Product Shell Readiness Gate Wiring' `
  -RouteHref '/product-shell-readiness-gate-wiring' `
  -Phase 'Phase 3240' `
  -Title 'Product Shell Readiness Gate Wiring'
