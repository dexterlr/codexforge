param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1732 Next Action Rail Cleanup Preview" `
  -ScriptFile "smoke-codexforge-next-action-rail-cleanup-preview.ps1" `
  -Domain "src\lib\codexforge\next-action-rail-cleanup-preview" `
  -Route "src\app\next-action-rail-cleanup-preview" `
  -CommandLabel "Go to Next Action Rail Cleanup Preview" `
  -RouteHref "/next-action-rail-cleanup-preview" `
  -Markers @("Next action rail cleanup preview", "Next action rail cleanup preview shows a clean next action rail with current checkpoint latest safe workspace pending approvals validation reminders and diagnostics link", "Next action rail cleanup preview requires explicit operator approval", "Next action rail cleanup preview does not auto-advance execute workflows release approvals or hide blocked states", "Denied next action rail cleanup paths remain blocked", "Next action rail cleanup checklist")
