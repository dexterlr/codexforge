param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1264 Guided Operator Hold State Review" `
  -ScriptFile "smoke-codexforge-guided-operator-hold-state-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-hold-state-review" `
  -Route "src\app\guided-operator-hold-state-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Hold State Review" `
  -RouteHref "/guided-operator-hold-state-review" `
  -Markers @("Guided operator hold state review", "Guided operator hold state review does not release execution locks", "Guided operator hold state review requires explicit operator approval", "Hold state review keeps file mutation command execution persistence export recovery and queues blocked", "Denied guided operator hold paths remain blocked", "Guided operator hold state checklist")
