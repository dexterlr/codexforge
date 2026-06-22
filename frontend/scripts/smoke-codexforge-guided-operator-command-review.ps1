param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1262 Guided Operator Command Review" `
  -ScriptFile "smoke-codexforge-guided-operator-command-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-command-review" `
  -Route "src\app\guided-operator-command-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Command Review" `
  -RouteHref "/guided-operator-command-review" `
  -Markers @("Guided operator command review", "Guided operator command review does not run commands", "Guided operator command review requires explicit operator approval before future execution", "Command review explains allowlist arguments working directory environment evidence result and recovery", "Denied guided operator command paths remain blocked", "Guided operator command review checklist")
