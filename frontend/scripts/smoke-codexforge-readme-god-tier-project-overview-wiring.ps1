param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3228 README God Tier Project Overview Wiring' `
  -ScriptFile 'smoke-codexforge-readme-god-tier-project-overview-wiring.ps1' `
  -Route 'readme-god-tier-project-overview-wiring' `
  -CommandLabel 'Go to README God Tier Project Overview Wiring' `
  -RouteHref '/readme-god-tier-project-overview-wiring' `
  -Phase 'Phase 3228' `
  -Title 'README God Tier Project Overview Wiring'
