param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2199 Export Readiness Panel Mock"
  ScriptFile = "smoke-codexforge-export-readiness-panel-mock.ps1"
  Domain = "src\lib\codexforge\export-readiness-panel-mock"
  Route = "src\app\export-readiness-panel-mock"
  CommandLabel = "Go to Export Readiness Panel Mock"
  RouteHref = "/export-readiness-panel-mock"
  Markers = @("Export readiness panel mock", "Export readiness panel mock uses local React state only and does not create artifacts export files download files create signed URLs or persist export state", "Export readiness panel mock computes export readiness from local render artifact rights approval and format mock states", "Export readiness panel mock keeps export blocked until backend artifact export wiring exists", "Denied export paths remain blocked", "Export readiness panel mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
