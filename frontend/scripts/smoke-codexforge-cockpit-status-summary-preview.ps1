param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1734 Cockpit Status Summary Preview" `
  -ScriptFile "smoke-codexforge-cockpit-status-summary-preview.ps1" `
  -Domain "src\lib\codexforge\cockpit-status-summary-preview" `
  -Route "src\app\cockpit-status-summary-preview" `
  -CommandLabel "Go to Cockpit Status Summary Preview" `
  -RouteHref "/cockpit-status-summary-preview" `
  -Markers @("Cockpit status summary preview", "Cockpit status summary preview shows current phase checkpoint latest batch latest release candidate smoke posture user UX readiness and blocked execution boundaries", "Cockpit status summary preview requires explicit operator approval", "Cockpit status summary preview does not claim full smoke passed unless full smoke has passed", "Denied cockpit status summary paths remain blocked", "Cockpit status summary checklist")
