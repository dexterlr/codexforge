param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1840 Version Approval State Preview"
  ScriptFile = "smoke-codexforge-version-approval-state-preview.ps1"
  Domain = "src\lib\codexforge\version-approval-state-preview"
  Route = "src\app\version-approval-state-preview"
  CommandLabel = "Go to Version Approval State Preview"
  RouteHref = "/version-approval-state-preview"
  Markers = @("Version approval state preview", "Version approval state preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI", "Version approval state preview requires backend-owned approval capture", "Version approval state preview shows simulated pending approval simulated requested changes simulated approval expired simulated replay protection simulated explicit operator approval requirement", "Denied version approval state paths remain blocked", "Version approval state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
