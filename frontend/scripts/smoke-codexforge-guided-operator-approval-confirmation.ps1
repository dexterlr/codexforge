param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1263 Guided Operator Approval Confirmation" `
  -ScriptFile "smoke-codexforge-guided-operator-approval-confirmation.ps1" `
  -Domain "src\lib\codexforge\guided-operator-approval-confirmation" `
  -Route "src\app\guided-operator-approval-confirmation" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Approval Confirmation" `
  -RouteHref "/guided-operator-approval-confirmation" `
  -Markers @("Guided operator approval confirmation", "Guided operator approval confirmation does not approve actions", "Guided operator approval confirmation requires explicit human approval", "Approval confirmation explains exactly what would be approved and what remains blocked", "Denied guided operator approval paths remain blocked", "Guided operator approval confirmation checklist")
