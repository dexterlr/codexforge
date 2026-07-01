param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1844 Version Review Checklist Preview"
  ScriptFile = "smoke-codexforge-version-review-checklist-preview.ps1"
  Domain = "src\lib\codexforge\version-review-checklist-preview"
  Route = "src\app\version-review-checklist-preview"
  CommandLabel = "Go to Version Review Checklist Preview"
  RouteHref = "/version-review-checklist-preview"
  Markers = @("Version review checklist preview", "Version review checklist preview does not approve versions persist checklist state write files or promote strategies from the UI", "Version review checklist preview requires backend-owned review checklist workflow", "Version review checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated operator check simulated rollback check and denied frontend persistence", "Denied version review checklist paths remain blocked", "Version review checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
