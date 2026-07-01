param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1986 Render Queue Blocked Preview"
  ScriptFile = "smoke-codexforge-render-queue-blocked-preview.ps1"
  Domain = "src\lib\codexforge\render-queue-blocked-preview"
  Route = "src\app\render-queue-blocked-preview"
  CommandLabel = "Go to Render Queue Blocked Preview"
  RouteHref = "/render-queue-blocked-preview"
  Markers = @("Render queue blocked preview", "Render queue blocked preview does not create queues persist jobs dispatch workers retry jobs or start runtimes from the UI", "Render queue blocked preview requires backend-owned render queue and worker orchestration", "Render queue blocked preview shows denied queue creation denied job persistence denied worker dispatch denied retry path denied runtime start and backend prerequisite", "Denied render queue paths remain blocked", "Render queue blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

