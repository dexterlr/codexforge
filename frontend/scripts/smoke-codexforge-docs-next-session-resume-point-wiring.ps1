param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3239 Docs Next Session Resume Point Wiring' `
  -ScriptFile 'smoke-codexforge-docs-next-session-resume-point-wiring.ps1' `
  -Route 'docs-next-session-resume-point-wiring' `
  -CommandLabel 'Go to Docs Next Session Resume Point Wiring' `
  -RouteHref '/docs-next-session-resume-point-wiring' `
  -Phase 'Phase 3239' `
  -Title 'Docs Next Session Resume Point Wiring'
