param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1981 Asset Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-asset-readiness-gate-preview.ps1"
  Domain = "src\lib\codexforge\asset-readiness-gate-preview"
  Route = "src\app\asset-readiness-gate-preview"
  CommandLabel = "Go to Asset Readiness Gate Preview"
  RouteHref = "/asset-readiness-gate-preview"
  Markers = @("Asset readiness gate preview", "Asset readiness gate preview does not upload assets download assets store media persist rights or render assets from the UI", "Asset readiness gate preview requires backend-owned asset storage and rights review", "Asset readiness gate preview shows simulated visual asset ready simulated b-roll ready simulated brand asset ready simulated music asset ready simulated missing asset blocker and denied frontend persistence", "Denied asset readiness gate paths remain blocked", "Asset readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

