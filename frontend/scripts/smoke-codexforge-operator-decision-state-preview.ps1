param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1827 Operator Decision State Preview"
  ScriptFile = "smoke-codexforge-operator-decision-state-preview.ps1"
  Domain = "src\lib\codexforge\operator-decision-state-preview"
  Route = "src\app\operator-decision-state-preview"
  CommandLabel = "Go to Operator Decision State Preview"
  RouteHref = "/operator-decision-state-preview"
  Markers = @("Operator decision state preview", "Operator decision state preview does not persist approvals release locks dispatch workers or approve live execution from the UI", "Operator decision state preview requires backend-owned operator decision capture", "Operator decision state preview shows simulated approve for review simulated request changes simulated reject simulated pause simulated retire and explicit approval requirement", "Denied operator decision state paths remain blocked", "Operator decision state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params