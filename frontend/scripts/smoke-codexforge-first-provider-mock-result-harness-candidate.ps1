param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2407 First Provider Mock Result Harness Candidate"
  ScriptFile = "smoke-codexforge-first-provider-mock-result-harness-candidate.ps1"
  Domain = "first-provider-mock-result-harness-candidate"
  Route = "first-provider-mock-result-harness-candidate"
  CommandLabel = "Go to First Provider Mock Result Harness Candidate"
  RouteHref = "/first-provider-mock-result-harness-candidate"
  Phase = 2407
  Title = "First Provider Mock Result Harness Candidate"
  Markers = @(
  'First provider mock result harness candidate',
  'First provider mock result harness candidate assembles mock output packet fixture catalog transcript quality review safety review redaction review audit approval rejection recovery cost rate timeout fallback observability comparison and acceptance criteria into one review-only candidate',
  'First provider mock result harness candidate does not call providers call models send prompts store credentials store tokens stream responses persist outputs or dispatch workers',
  'First provider mock result harness candidate keeps provider execution blocked',
  'Denied first provider mock result harness paths remain blocked',
  'First provider mock result harness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
