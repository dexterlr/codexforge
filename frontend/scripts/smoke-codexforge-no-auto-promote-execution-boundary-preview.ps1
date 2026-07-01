param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1862 No Auto Promote Execution Boundary Preview"
  ScriptFile = "smoke-codexforge-no-auto-promote-execution-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-auto-promote-execution-boundary-preview"
  Route = "src\app\no-auto-promote-execution-boundary-preview"
  CommandLabel = "Go to No Auto Promote Execution Boundary Preview"
  RouteHref = "/no-auto-promote-execution-boundary-preview"
  Markers = @("No auto promote execution boundary preview", "No auto promote execution boundary preview blocks automatic strategy promotion paper execution live execution order routing approval persistence version persistence and execution routing from the UI", "No auto promote execution boundary preview requires backend-owned promotion workflow and explicit operator approval", "No auto promote execution boundary preview shows denied auto promote denied paper execution denied live execution denied frontend write denied approval persistence and operator approval gate", "Denied no auto promote execution paths remain blocked", "No auto promote execution boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
