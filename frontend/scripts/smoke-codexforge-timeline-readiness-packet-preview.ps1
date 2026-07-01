param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1980 Timeline Readiness Packet Preview"
  ScriptFile = "smoke-codexforge-timeline-readiness-packet-preview.ps1"
  Domain = "src\lib\codexforge\timeline-readiness-packet-preview"
  Route = "src\app\timeline-readiness-packet-preview"
  CommandLabel = "Go to Timeline Readiness Packet Preview"
  RouteHref = "/timeline-readiness-packet-preview"
  Markers = @("Timeline readiness packet preview", "Timeline readiness packet preview does not render timelines write files persist timelines or create artifacts from the UI", "Timeline readiness packet preview requires backend-owned timeline and render workflow", "Timeline readiness packet preview shows simulated scene order simulated duration target simulated overlay note simulated audio sync note simulated render blocked state", "Denied timeline readiness packet paths remain blocked", "Timeline readiness packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

