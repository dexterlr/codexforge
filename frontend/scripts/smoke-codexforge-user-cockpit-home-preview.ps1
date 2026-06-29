param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1723 User Cockpit Home Preview" `
  -ScriptFile "smoke-codexforge-user-cockpit-home-preview.ps1" `
  -Domain "src\lib\codexforge\user-cockpit-home-preview" `
  -Route "src\app\user-cockpit-home-preview" `
  -CommandLabel "Go to User Cockpit Home Preview" `
  -RouteHref "/user-cockpit-home-preview" `
  -Markers @("User cockpit home preview", "User cockpit home preview keeps /codexforge-cockpit as the one normal user homepage", "User cockpit home preview requires explicit operator approval", "User cockpit home preview shows goal input trading workspace build workspace approvals evidence audit next action and diagnostics entry without phase spam", "Denied user cockpit home paths remain blocked", "User cockpit home checklist")
