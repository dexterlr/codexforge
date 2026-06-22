param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1195 Cockpit Goal Intake Panel" `
  -ScriptFile "smoke-codexforge-cockpit-goal-intake-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-goal-intake-panel" `
  -Route "src\app\cockpit-goal-intake-panel" `
  -MainPanel "CockpitGoalIntakePanel" `
  -CommandLabel "Go to Cockpit Goal Intake Panel" `
  -RouteHref "/cockpit-goal-intake-panel" `
  -Markers @("Cockpit goal intake panel", "Cockpit goal intake panel does not send prompts", "Goal intake requires explicit operator approval before future model routing", "Goal intake supports apps websites dashboards games research workflows data and integrations", "Denied cockpit goal intake paths remain blocked", "Cockpit goal intake checklist")
