param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1447 Cockpit Work Proposal Summary" `
  -ScriptFile "smoke-codexforge-cockpit-work-proposal-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-work-proposal-summary" `
  -Route "src\app\cockpit-work-proposal-summary" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Cockpit Work Proposal Summary" `
  -RouteHref "/cockpit-work-proposal-summary" `
  -Markers @("Cockpit work proposal summary", "Cockpit work proposal summary keeps the cockpit as the normal user surface", "Cockpit work proposal summary does not broaden execution", "Cockpit work proposal summary shows plan files diff commands risks approval hold evidence result recovery timeline and model tool handoff", "Phase pages remain dev test diagnostics only", "Cockpit work proposal checklist")
