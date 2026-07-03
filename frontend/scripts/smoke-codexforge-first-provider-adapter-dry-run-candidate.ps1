param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2375 First Provider Adapter Dry Run Candidate"
  ScriptFile = "smoke-codexforge-first-provider-adapter-dry-run-candidate.ps1"
  Domain = "first-provider-adapter-dry-run-candidate"
  Route = "first-provider-adapter-dry-run-candidate"
  CommandLabel = "Go to First Provider Adapter Dry Run Candidate"
  RouteHref = "/first-provider-adapter-dry-run-candidate"
  Phase = 2375
  Title = "First Provider Adapter Dry Run Candidate"
  Markers = @(
  'First provider adapter dry run candidate',
  'First provider adapter dry run candidate assembles request packet response packet fixture registry transcript validation denial audit approval redaction cost rate timeout retry fallback observability result review and recovery into one review-only candidate',
  'First provider adapter dry run candidate does not call providers call models send prompts store credentials store tokens stream responses persist outputs or dispatch workers',
  'First provider adapter dry run candidate keeps provider execution blocked',
  'Denied first provider adapter dry run paths remain blocked',
  'First provider adapter dry run checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

