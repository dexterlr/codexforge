param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2026 Video Backend Service Contract Boundary"
  ScriptFile = "smoke-codexforge-video-backend-service-contract-boundary.ps1"
  Domain = "src\lib\codexforge\video-backend-service-contract-boundary"
  Route = "src\app\video-backend-service-contract-boundary"
  CommandLabel = "Go to Video Backend Service Contract Boundary"
  RouteHref = "/video-backend-service-contract-boundary"
  Markers = @("Video backend service contract boundary", "Video backend service contract boundary does not create backend services create APIs bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials render videos export files upload files download files publish posts schedule content persist jobs persist artifacts persist approvals persist assets persist rights or write files from the UI", "Video backend service contract boundary requires explicit operator approval", "Video backend service contract boundary prepares deterministic synthetic backend service contract review without frontend service creation provider calls worker dispatch persistence export or publishing", "Denied video backend service contract paths remain blocked", "Video backend service contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

