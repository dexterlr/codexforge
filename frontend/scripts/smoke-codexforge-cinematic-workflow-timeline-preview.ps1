param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2222 Cinematic Workflow Timeline Preview"
  ScriptFile = "smoke-codexforge-cinematic-workflow-timeline-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cinematic Workflow Timeline Preview"
  RouteHref = "/cinematic-workflow-timeline-preview"
  Markers = @("Cinematic workflow timeline preview", "Cinematic workflow timeline preview adds a polished workflow timeline for brief script storyboard assets audio captions approvals render export publish", "Cinematic workflow timeline preview uses deterministic synthetic timeline state only and does not create jobs render export publish or persist telemetry", "Cinematic workflow timeline preview keeps execution blocked", "Denied cinematic timeline execution paths remain blocked", "Cinematic workflow timeline checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
