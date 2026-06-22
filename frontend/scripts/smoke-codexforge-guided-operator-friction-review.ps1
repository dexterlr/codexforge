param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1269 Guided Operator Friction Review" `
  -ScriptFile "smoke-codexforge-guided-operator-friction-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-friction-review" `
  -Route "src\app\guided-operator-friction-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Friction Review" `
  -RouteHref "/guided-operator-friction-review" `
  -Markers @("Guided operator friction review", "Guided operator friction review does not mutate workflow state", "Guided operator friction review requires explicit operator approval before future workflow changes", "Friction review identifies confusing labels missing next steps unsafe ambiguity and overloaded phase navigation", "Denied guided operator friction paths remain blocked", "Guided operator friction review checklist")
