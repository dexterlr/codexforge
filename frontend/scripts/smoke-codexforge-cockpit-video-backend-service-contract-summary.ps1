param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2039 Cockpit Video Backend Service Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-video-backend-service-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-video-backend-service-contract-summary"
  Route = "src\app\cockpit-video-backend-service-contract-summary"
  CommandLabel = "Go to Cockpit Video Backend Service Contract Summary"
  RouteHref = "/cockpit-video-backend-service-contract-summary"
  Markers = @("Cockpit video backend service contract summary", "Cockpit video backend service contract summary keeps the cockpit as the normal user surface", "Cockpit video backend service contract summary does not create backend services create APIs bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials render videos export files upload files download files publish posts schedule content persist jobs persist artifacts persist approvals persist assets persist rights or write files from the cockpit", "Cockpit video backend service contract summary shows provider gateway asset storage audio storage render queue worker orchestration artifact storage export service publish gateway rights consent review approval capture audit telemetry frontend execution blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit video backend service contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

