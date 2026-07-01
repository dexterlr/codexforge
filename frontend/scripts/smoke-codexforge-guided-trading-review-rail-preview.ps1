param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1884 Guided Trading Review Rail Preview"
  ScriptFile = "smoke-codexforge-guided-trading-review-rail-preview.ps1"
  Domain = "src\lib\codexforge\guided-trading-review-rail-preview"
  Route = "src\app\guided-trading-review-rail-preview"
  CommandLabel = "Go to Guided Trading Review Rail Preview"
  RouteHref = "/guided-trading-review-rail-preview"
  Markers = @("Guided trading review rail preview", "Guided trading review rail preview does not approve strategies execute paper trades route orders or persist review state from the UI", "Guided trading review rail preview requires backend-owned review workflow", "Guided trading review rail preview shows simulated review step simulated evidence step simulated risk step simulated version step simulated operator decision step and denied frontend persistence", "Denied guided trading review rail paths remain blocked", "Guided trading review rail checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
