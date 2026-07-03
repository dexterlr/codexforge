param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2408 Controlled Provider Mock Result Harness Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-mock-result-harness-release-candidate.ps1"
  Domain = "controlled-provider-mock-result-harness-release-candidate"
  Route = "controlled-provider-mock-result-harness-release-candidate"
  CommandLabel = "Go to Controlled Provider Mock Result Harness Release Candidate"
  RouteHref = "/controlled-provider-mock-result-harness-release-candidate"
  Phase = 2408
  Title = "Controlled Provider Mock Result Harness Release Candidate"
  Markers = @(
  'Controlled provider mock result harness release candidate',
  'Controlled provider mock result harness release candidate does not call providers call models send prompts stream responses store credentials store tokens persist outputs write browser storage upload download render export publish schedule dispatch queues spawn workers run commands create APIs create services import SDKs or call connectors',
  'Controlled provider mock result harness release candidate adds review-only mock result diagnostics and deterministic synthetic fixture handling',
  'Controlled provider mock result harness release candidate requires approval audit enforcement before future provider execution',
  'Denied controlled provider mock result harness paths remain blocked',
  'Controlled provider mock result harness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
