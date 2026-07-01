param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1842 Version Rollback Note Preview"
  ScriptFile = "smoke-codexforge-version-rollback-note-preview.ps1"
  Domain = "src\lib\codexforge\version-rollback-note-preview"
  Route = "src\app\version-rollback-note-preview"
  CommandLabel = "Go to Version Rollback Note Preview"
  RouteHref = "/version-rollback-note-preview"
  Markers = @("Version rollback note preview", "Version rollback note preview does not execute rollback apply diffs write files mutate strategies or recover live execution from the UI", "Version rollback note preview requires backend-owned rollback workflow", "Version rollback note preview shows simulated rollback candidate simulated rollback reason simulated prior version simulated evidence requirement simulated operator signoff and denied frontend rollback", "Denied version rollback note paths remain blocked", "Version rollback note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
