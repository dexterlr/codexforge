param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1266 Guided Operator Result Review" `
  -ScriptFile "smoke-codexforge-guided-operator-result-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-result-review" `
  -Route "src\app\guided-operator-result-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Result Review" `
  -RouteHref "/guided-operator-result-review" `
  -Markers @("Guided operator result review", "Guided operator result review does not persist results", "Guided operator result review requires explicit operator approval before future persistence", "Result review explains success denied blocked failed timeout needs-review and manual-review states", "Denied guided operator result paths remain blocked", "Guided operator result review checklist")
