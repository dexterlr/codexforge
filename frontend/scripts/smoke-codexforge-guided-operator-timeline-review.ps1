param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1268 Guided Operator Timeline Review" `
  -ScriptFile "smoke-codexforge-guided-operator-timeline-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-timeline-review" `
  -Route "src\app\guided-operator-timeline-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Timeline Review" `
  -RouteHref "/guided-operator-timeline-review" `
  -Markers @("Guided operator timeline review", "Guided operator timeline review does not persist audit logs", "Guided operator timeline review requires explicit operator approval before future persistence", "Timeline review shows goal plan diff command risk approval holds evidence result recovery and completion", "Denied guided operator timeline paths remain blocked", "Guided operator timeline review checklist")
