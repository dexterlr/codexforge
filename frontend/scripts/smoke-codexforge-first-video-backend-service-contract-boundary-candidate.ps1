param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2040 First Video Backend Service Contract Boundary Candidate"
  ScriptFile = "smoke-codexforge-first-video-backend-service-contract-boundary-candidate.ps1"
  Domain = "src\lib\codexforge\first-video-backend-service-contract-boundary-candidate"
  Route = "src\app\first-video-backend-service-contract-boundary-candidate"
  CommandLabel = "Go to First Video Backend Service Contract Boundary Candidate"
  RouteHref = "/first-video-backend-service-contract-boundary-candidate"
  Markers = @("First video backend service contract boundary candidate", "First video backend service contract boundary candidate does not enable backend implementation API creation service deployment command execution provider calls model calls connector calls prompt sending credential storage generation rendering queue creation worker dispatch artifact creation export download upload publishing scheduling file writes or frontend persistence from the UI", "First video backend service contract boundary candidate requires explicit operator approval", "Candidate combines provider gateway asset storage audio storage render queue worker orchestration artifact storage export service publish gateway rights consent review approval capture audit telemetry frontend execution blocked cockpit summary and denied paths", "Denied first video backend service contract paths remain blocked", "First video backend service contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

