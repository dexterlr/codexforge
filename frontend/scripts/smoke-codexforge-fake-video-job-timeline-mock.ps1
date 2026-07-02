param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2201 Fake Video Job Timeline Mock"
  ScriptFile = "smoke-codexforge-fake-video-job-timeline-mock.ps1"
  Domain = "src\lib\codexforge\fake-video-job-timeline-mock"
  Route = "src\app\fake-video-job-timeline-mock"
  CommandLabel = "Go to Fake Video Job Timeline Mock"
  RouteHref = "/fake-video-job-timeline-mock"
  Markers = @("Fake video job timeline mock", "Fake video job timeline mock uses deterministic synthetic timeline data and local state only and does not create jobs run workers render video export files publish content or persist telemetry", "Fake video job timeline mock shows planned draft review render export publish stages as mock statuses", "Fake video job timeline mock clearly marks all backend execution as not wired", "Denied job execution paths remain blocked", "Fake video job timeline mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
