param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-primary-navigation-readme-workspace-layout-upgrade-batch-smoke-helper.ps1')

Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke `
  -SmokeName 'Phase 3223 Workspace Layout Generation Chat First Wiring' `
  -ScriptFile 'smoke-codexforge-workspace-layout-generation-chat-first-wiring.ps1' `
  -Route 'workspace-layout-generation-chat-first-wiring' `
  -CommandLabel 'Go to Workspace Layout Generation Chat First Wiring' `
  -RouteHref '/workspace-layout-generation-chat-first-wiring' `
  -Phase 'Phase 3223' `
  -Title 'Workspace Layout Generation Chat First Wiring'
