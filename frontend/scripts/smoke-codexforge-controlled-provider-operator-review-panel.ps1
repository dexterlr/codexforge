param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2451 Controlled Provider Operator Review Panel"
  ScriptFile = "smoke-codexforge-controlled-provider-operator-review-panel.ps1"
  Domain = "controlled-provider-operator-review-panel"
  Route = "controlled-provider-operator-review-panel"
  CommandLabel = "Go to Controlled Provider Operator Review Panel"
  RouteHref = "/controlled-provider-operator-review-panel"
  Phase = 2451
  Title = "Controlled Provider Operator Review Panel"
  Markers = @(
  'Controlled provider operator review panel'
  'Controlled provider operator review panel shows synthetic operator review states without approving real provider execution or persisting review decisions'
  'Controlled provider operator review panel keeps review actions disabled pending backend execution readiness'
  'Controlled provider operator review panel blocks approval mutation'
  'Denied controlled provider operator review paths remain blocked'
  'Controlled provider operator review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
