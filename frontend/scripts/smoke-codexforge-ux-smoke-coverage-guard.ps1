param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2214 UX Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-ux-smoke-coverage-guard.ps1"
  Domain = "src\lib\codexforge\ux-smoke-coverage-guard"
  Route = "src\app\ux-smoke-coverage-guard"
  CommandLabel = "Go to UX Smoke Coverage Guard"
  RouteHref = "/ux-smoke-coverage-guard"
  Markers = @("UX smoke coverage guard", "UX smoke coverage guard verifies the UX batch has targeted smoke scripts and full smoke registration without removing previous smoke coverage", "UX smoke coverage guard keeps smoke scanning scoped to UX batch-owned files to avoid false positives from old helper rules", "UX smoke coverage guard preserves checkpoint smoke coverage", "Denied UX smoke coverage regression paths remain blocked", "UX smoke coverage guard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
