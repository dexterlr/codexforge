param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2308 First Provider Gateway Wiring Candidate"
  ScriptFile = "smoke-codexforge-first-provider-gateway-wiring-candidate.ps1"
  Domain = "first-provider-gateway-wiring-candidate"
  Route = "first-provider-gateway-wiring-candidate"
  CommandLabel = "Go to First Provider Gateway Wiring Candidate"
  RouteHref = "/first-provider-gateway-wiring-candidate"
  Markers = @("First provider gateway wiring candidate", "First provider gateway wiring candidate assembles provider request envelope response envelope policy catalog approval gate audit envelope and disabled adapter registry into one review-only candidate", "First provider gateway wiring candidate does not call providers call models send prompts store credentials store tokens stream responses persist data or dispatch workers", "First provider gateway wiring candidate keeps provider execution blocked", "Denied first provider gateway wiring paths remain blocked", "First provider gateway wiring checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
