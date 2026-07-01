param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1894 No Hidden Execution Affordance Boundary Preview"
  ScriptFile = "smoke-codexforge-no-hidden-execution-affordance-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-hidden-execution-affordance-boundary-preview"
  Route = "src\app\no-hidden-execution-affordance-boundary-preview"
  CommandLabel = "Go to No Hidden Execution Affordance Boundary Preview"
  RouteHref = "/no-hidden-execution-affordance-boundary-preview"
  Markers = @("No hidden execution affordance boundary preview", "No hidden execution affordance boundary preview blocks hidden broker buttons hidden order forms hidden paper execution controls hidden live execution controls hidden approval persistence and hidden credential storage", "No hidden execution affordance boundary preview requires backend-owned execution service and explicit operator approval", "No hidden execution affordance boundary preview shows denied hidden order route denied hidden broker call denied hidden paper execution denied hidden live execution denied hidden approval persistence and operator approval gate", "Denied no hidden execution affordance paths remain blocked", "No hidden execution affordance boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
