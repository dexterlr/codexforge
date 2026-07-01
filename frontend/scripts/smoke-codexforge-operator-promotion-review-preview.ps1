param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1858 Operator Promotion Review Preview"
  ScriptFile = "smoke-codexforge-operator-promotion-review-preview.ps1"
  Domain = "src\lib\codexforge\operator-promotion-review-preview"
  Route = "src\app\operator-promotion-review-preview"
  CommandLabel = "Go to Operator Promotion Review Preview"
  RouteHref = "/operator-promotion-review-preview"
  Markers = @("Operator promotion review preview", "Operator promotion review preview does not persist approvals release locks dispatch workers approve execution or promote strategy versions from the UI", "Operator promotion review preview requires backend-owned operator review workflow", "Operator promotion review preview shows simulated promote to paper review simulated request changes simulated reject simulated hold simulated retire and explicit approval requirement", "Denied operator promotion review paths remain blocked", "Operator promotion review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
