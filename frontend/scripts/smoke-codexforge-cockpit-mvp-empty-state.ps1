param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1207 Cockpit MVP Empty State" `
  -ScriptFile "smoke-codexforge-cockpit-mvp-empty-state.ps1" `
  -Domain "src\lib\codexforge\cockpit-mvp-empty-state" `
  -Route "src\app\cockpit-mvp-empty-state" `
  -MainPanel "CockpitMvpEmptyStatePanel" `
  -CommandLabel "Go to Cockpit MVP Empty State" `
  -RouteHref "/cockpit-mvp-empty-state" `
  -Markers @("Cockpit MVP empty state", "Cockpit MVP empty state does not call models or run commands", "MVP empty state requires explicit operator approval before future execution", "Empty state guides the operator to enter a goal and review plan before action", "Denied cockpit empty state paths remain blocked", "Cockpit MVP empty state checklist")
