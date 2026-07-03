param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2258 Worker Orchestration Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-worker-orchestration-wiring-boundary-preview.ps1"
  Domain = "worker-orchestration-wiring-boundary-preview"
  Route = "worker-orchestration-wiring-boundary-preview"
  CommandLabel = "Go to Worker Orchestration Wiring Boundary Preview"
  RouteHref = "/worker-orchestration-wiring-boundary-preview"
  Markers = @("Worker Orchestration Wiring Boundary", "worker orchestration boundary", "No worker dispatch", "No command execution", "No service creation")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
