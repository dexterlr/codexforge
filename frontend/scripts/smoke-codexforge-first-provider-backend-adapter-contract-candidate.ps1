param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2341 First Provider Backend Adapter Contract Candidate"
  ScriptFile = "smoke-codexforge-first-provider-backend-adapter-contract-candidate.ps1"
  Domain = "first-provider-backend-adapter-contract-candidate"
  Route = "first-provider-backend-adapter-contract-candidate"
  CommandLabel = "Go to First Provider Backend Adapter Contract Candidate"
  RouteHref = "/first-provider-backend-adapter-contract-candidate"
  Markers = @("First provider backend adapter contract candidate", "First provider backend adapter contract candidate assembles interface manifest request mapping response mapping error mapping audit mapping approval mapping credential token streaming retry fallback timeout sandbox and disabled catalog contracts", "First provider backend adapter contract candidate does not call providers call models send prompts store credentials store tokens stream responses persist outputs or dispatch workers", "First provider backend adapter contract candidate keeps adapter execution blocked", "Denied first provider backend adapter contract paths remain blocked", "First provider backend adapter contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
