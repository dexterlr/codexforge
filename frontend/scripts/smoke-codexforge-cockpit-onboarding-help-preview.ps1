param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1735 Cockpit Onboarding Help Preview" `
  -ScriptFile "smoke-codexforge-cockpit-onboarding-help-preview.ps1" `
  -Domain "src\lib\codexforge\cockpit-onboarding-help-preview" `
  -Route "src\app\cockpit-onboarding-help-preview" `
  -CommandLabel "Go to Cockpit Onboarding Help Preview" `
  -RouteHref "/cockpit-onboarding-help-preview" `
  -Markers @("Cockpit onboarding help preview", "Cockpit onboarding help preview explains one user cockpit trading workspace build workspace approvals evidence diagnostics and why phase pages exist", "Cockpit onboarding help preview requires explicit operator approval", "Cockpit onboarding help preview explains that phase pages are diagnostics and the cockpit is the normal user surface", "Denied cockpit onboarding help paths remain blocked", "Cockpit onboarding help checklist")
