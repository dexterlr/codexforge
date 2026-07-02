param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2056 First Provider Gateway Contract Candidate"
  ScriptFile = "smoke-codexforge-first-provider-gateway-contract-candidate.ps1"
  Domain = "src\lib\codexforge\first-provider-gateway-contract-candidate"
  Route = "src\app\first-provider-gateway-contract-candidate"
  CommandLabel = "Go to First Provider Gateway Contract Candidate"
  RouteHref = "/first-provider-gateway-contract-candidate"
  Markers = @("First provider gateway contract candidate", "First provider gateway contract candidate does not enable provider integration model integration connector calls prompt sending credential storage API key storage generation request dispatch response persistence quota mutation audit persistence API creation service deployment command execution or frontend persistence from the UI", "First provider gateway contract candidate requires explicit operator approval", "Candidate combines provider selection model routing prompt review credential vault request schema response schema safety review rate limits quota policy audit event failure retry frontend provider blocked cockpit summary and denied paths", "Denied first provider gateway contract paths remain blocked", "First provider gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

