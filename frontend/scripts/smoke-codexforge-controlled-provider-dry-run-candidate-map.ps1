param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2442 Controlled Provider Dry Run Candidate Map"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-candidate-map.ps1"
  Domain = "controlled-provider-dry-run-candidate-map"
  Route = "controlled-provider-dry-run-candidate-map"
  CommandLabel = "Go to Controlled Provider Dry Run Candidate Map"
  RouteHref = "/controlled-provider-dry-run-candidate-map"
  Phase = 2442
  Title = "Controlled Provider Dry Run Candidate Map"
  Markers = @(
  'Controlled provider dry run candidate map'
  'Controlled provider dry run candidate map assembles provider gateway backend adapter dry run mock result and approval audit boundaries without implementing live provider execution'
  'Controlled provider dry run candidate map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'Controlled provider dry run candidate map keeps provider execution blocked pending backend execution readiness'
  'Denied controlled provider dry run candidate paths remain blocked'
  'Controlled provider dry run candidate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
