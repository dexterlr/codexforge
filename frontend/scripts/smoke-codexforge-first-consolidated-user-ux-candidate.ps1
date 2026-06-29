param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1736 First Consolidated User UX Candidate" `
  -ScriptFile "smoke-codexforge-first-consolidated-user-ux-candidate.ps1" `
  -Domain "src\lib\codexforge\first-consolidated-user-ux-candidate" `
  -Route "src\app\first-consolidated-user-ux-candidate" `
  -CommandLabel "Go to First Consolidated User UX Candidate" `
  -RouteHref "/first-consolidated-user-ux-candidate" `
  -Markers @("First consolidated user UX candidate", "First consolidated user UX candidate does not remove diagnostics break direct phase access remove smokes or enable execution from the UI", "First consolidated user UX candidate requires explicit operator approval", "Candidate combines user cockpit home trading workspace build workspace approvals evidence diagnostics route grouping feature labels quick actions next action rail command grouping status and onboarding", "Denied first consolidated user UX paths remain blocked", "First consolidated user UX checklist")
