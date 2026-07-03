param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2556 Approved Provider Trial Operator Review Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-operator-review-preview.ps1"
  Domain = "approved-provider-trial-operator-review-preview"
  Route = "approved-provider-trial-operator-review-preview"
  CommandLabel = "Go to Approved Provider Trial Operator Review Preview"
  RouteHref = "/approved-provider-trial-operator-review-preview"
  Phase = 2556
  Title = "Approved Provider Trial Operator Review Preview"
  Markers = @(
  'Approved provider trial operator review preview'
  'Approved provider trial operator review preview shows synthetic operator review states without approving live provider execution or persisting review decisions'
  'Approved provider trial operator review preview keeps review actions disabled pending result review and recovery hardening'
  'Approved provider trial operator review preview blocks approval mutation'
  'Denied approved provider operator review paths remain blocked'
  'Approved provider operator review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
