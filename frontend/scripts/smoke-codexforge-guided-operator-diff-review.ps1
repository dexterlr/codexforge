param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1261 Guided Operator Diff Review" `
  -ScriptFile "smoke-codexforge-guided-operator-diff-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-diff-review" `
  -Route "src\app\guided-operator-diff-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Diff Review" `
  -RouteHref "/guided-operator-diff-review" `
  -Markers @("Guided operator diff review", "Guided operator diff review does not write files", "Guided operator diff review requires explicit operator approval before future apply", "Diff review explains before after path guard rollback and denied mutation", "Denied guided operator diff paths remain blocked", "Guided operator diff review checklist")
