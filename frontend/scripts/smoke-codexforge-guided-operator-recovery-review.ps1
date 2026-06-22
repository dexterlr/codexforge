param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1267 Guided Operator Recovery Review" `
  -ScriptFile "smoke-codexforge-guided-operator-recovery-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-recovery-review" `
  -Route "src\app\guided-operator-recovery-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Recovery Review" `
  -RouteHref "/guided-operator-recovery-review" `
  -Markers @("Guided operator recovery review", "Guided operator recovery review does not execute recovery", "Guided operator recovery review requires explicit operator approval before future recovery", "Recovery review explains rollback retry stop restore explain-failure and manual-review options as blocked previews", "Denied guided operator recovery paths remain blocked", "Guided operator recovery review checklist")
