param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3232 Docs Handoff God Tier Update Wiring' `
  -ScriptFile 'smoke-codexforge-docs-handoff-god-tier-update-wiring.ps1' `
  -Route 'docs-handoff-god-tier-update-wiring' `
  -CommandLabel 'Go to Docs Handoff God Tier Update Wiring' `
  -RouteHref '/docs-handoff-god-tier-update-wiring' `
  -Phase 'Phase 3232' `
  -Title 'Docs Handoff God Tier Update Wiring'
