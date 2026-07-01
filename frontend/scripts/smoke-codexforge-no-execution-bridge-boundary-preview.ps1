param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1878 No Execution Bridge Boundary Preview"
  ScriptFile = "smoke-codexforge-no-execution-bridge-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-execution-bridge-boundary-preview"
  Route = "src\app\no-execution-bridge-boundary-preview"
  CommandLabel = "Go to No Execution Bridge Boundary Preview"
  RouteHref = "/no-execution-bridge-boundary-preview"
  Markers = @("No execution bridge boundary preview", "No execution bridge boundary preview blocks frontend order placement frontend broker calls frontend paper execution frontend live execution frontend approval persistence frontend version persistence and frontend evidence persistence", "No execution bridge boundary preview requires backend-owned execution service and explicit operator approval", "No execution bridge boundary preview shows denied order route denied broker call denied paper execution denied live execution denied frontend approval persistence and operator approval gate", "Denied no execution bridge paths remain blocked", "No execution bridge boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
