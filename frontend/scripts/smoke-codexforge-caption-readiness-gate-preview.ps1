param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1982 Caption Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-caption-readiness-gate-preview.ps1"
  Domain = "src\lib\codexforge\caption-readiness-gate-preview"
  Route = "src\app\caption-readiness-gate-preview"
  CommandLabel = "Go to Caption Readiness Gate Preview"
  RouteHref = "/caption-readiness-gate-preview"
  Markers = @("Caption readiness gate preview", "Caption readiness gate preview does not transcribe audio burn captions export subtitle files or persist captions from the UI", "Caption readiness gate preview requires backend-owned caption workflow", "Caption readiness gate preview shows simulated caption style ready simulated subtitle timing ready simulated accessibility note ready simulated transcript review ready simulated caption export blocked state", "Denied caption readiness gate paths remain blocked", "Caption readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

