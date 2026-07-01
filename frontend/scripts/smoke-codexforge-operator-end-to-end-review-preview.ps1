param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1877 Operator End-to-End Review Preview"
  ScriptFile = "smoke-codexforge-operator-end-to-end-review-preview.ps1"
  Domain = "src\lib\codexforge\operator-end-to-end-review-preview"
  Route = "src\app\operator-end-to-end-review-preview"
  CommandLabel = "Go to Operator End-to-End Review Preview"
  RouteHref = "/operator-end-to-end-review-preview"
  Markers = @("Operator end-to-end review preview", "Operator end-to-end review preview does not persist approvals release locks dispatch workers execute paper trades or promote versions from the UI", "Operator end-to-end review preview requires backend-owned operator review workflow", "Operator end-to-end review preview shows simulated continue review simulated request evidence simulated hold simulated reject simulated approve for backend paper review and explicit approval requirement", "Denied operator end-to-end review paths remain blocked", "Operator end-to-end review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
