param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3231 README Roadmap Next Steps Wiring' `
  -ScriptFile 'smoke-codexforge-readme-roadmap-next-steps-wiring.ps1' `
  -Route 'readme-roadmap-next-steps-wiring' `
  -CommandLabel 'Go to README Roadmap Next Steps Wiring' `
  -RouteHref '/readme-roadmap-next-steps-wiring' `
  -Phase 'Phase 3231' `
  -Title 'README Roadmap Next Steps Wiring'
