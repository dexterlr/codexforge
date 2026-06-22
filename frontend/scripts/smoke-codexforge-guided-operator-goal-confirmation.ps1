param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1259 Guided Operator Goal Confirmation" `
  -ScriptFile "smoke-codexforge-guided-operator-goal-confirmation.ps1" `
  -Domain "src\lib\codexforge\guided-operator-goal-confirmation" `
  -Route "src\app\guided-operator-goal-confirmation" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Goal Confirmation" `
  -RouteHref "/guided-operator-goal-confirmation" `
  -Markers @("Guided operator goal confirmation", "Guided operator goal confirmation does not send prompts or call models", "Guided operator goal confirmation requires explicit operator approval before future model routing", "Goal confirmation explains what the operator asked for before any action", "Denied guided operator goal paths remain blocked", "Guided operator goal confirmation checklist")
