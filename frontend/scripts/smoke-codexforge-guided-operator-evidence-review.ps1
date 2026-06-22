param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1265 Guided Operator Evidence Review" `
  -ScriptFile "smoke-codexforge-guided-operator-evidence-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-evidence-review" `
  -Route "src\app\guided-operator-evidence-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Evidence Review" `
  -RouteHref "/guided-operator-evidence-review" `
  -Markers @("Guided operator evidence review", "Guided operator evidence review does not persist evidence", "Guided operator evidence review requires explicit operator approval before future persistence", "Evidence review explains what diff command stdout stderr exit code approval timestamp and audit evidence would show", "Denied guided operator evidence paths remain blocked", "Guided operator evidence review checklist")
