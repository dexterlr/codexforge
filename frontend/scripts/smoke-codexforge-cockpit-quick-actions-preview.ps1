param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1731 Cockpit Quick Actions Preview" `
  -ScriptFile "smoke-codexforge-cockpit-quick-actions-preview.ps1" `
  -Domain "src\lib\codexforge\cockpit-quick-actions-preview" `
  -Route "src\app\cockpit-quick-actions-preview" `
  -CommandLabel "Go to Cockpit Quick Actions Preview" `
  -RouteHref "/cockpit-quick-actions-preview" `
  -Markers @("Cockpit quick actions preview", "Cockpit quick actions preview shows user actions Start with a goal Open Trading Workspace Review Approvals Review Evidence Open Diagnostics and Continue Next Action", "Cockpit quick actions preview requires explicit operator approval", "Cockpit quick actions preview does not dispatch workers call models run commands write files place trades or move money", "Denied cockpit quick action paths remain blocked", "Cockpit quick actions checklist")
