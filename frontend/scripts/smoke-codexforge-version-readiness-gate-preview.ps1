param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1855 Version Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-version-readiness-gate-preview.ps1"
  Domain = "src\lib\codexforge\version-readiness-gate-preview"
  Route = "src\app\version-readiness-gate-preview"
  CommandLabel = "Go to Version Readiness Gate Preview"
  RouteHref = "/version-readiness-gate-preview"
  Markers = @("Version readiness gate preview", "Version readiness gate preview does not persist versions promote strategy versions write files apply diffs or approve execution from the UI", "Version readiness gate preview requires backend-owned version registry workflow", "Version readiness gate preview shows simulated draft version simulated reviewed version simulated blocked version simulated retired version simulated rollback note and denied frontend persistence", "Denied version readiness gate paths remain blocked", "Version readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
