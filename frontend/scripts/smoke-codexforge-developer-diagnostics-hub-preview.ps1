param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1728 Developer Diagnostics Hub Preview" `
  -ScriptFile "smoke-codexforge-developer-diagnostics-hub-preview.ps1" `
  -Domain "src\lib\codexforge\developer-diagnostics-hub-preview" `
  -Route "src\app\developer-diagnostics-hub-preview" `
  -CommandLabel "Go to Developer Diagnostics Hub Preview" `
  -RouteHref "/developer-diagnostics-hub-preview" `
  -Markers @("Developer diagnostics hub preview", "Developer diagnostics hub preview groups phase pages smoke routes route families and diagnostic deep links under Developer Diagnostics", "Developer diagnostics hub preview requires explicit operator approval", "Developer diagnostics hub preview keeps diagnostics accessible without polluting normal user navigation", "Denied developer diagnostics paths remain blocked", "Developer diagnostics hub checklist")
