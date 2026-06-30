param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1822 Risk Impact Assessment Preview"
  ScriptFile = "smoke-codexforge-risk-impact-assessment-preview.ps1"
  Domain = "src\lib\codexforge\risk-impact-assessment-preview"
  Route = "src\app\risk-impact-assessment-preview"
  CommandLabel = "Go to Risk Impact Assessment Preview"
  RouteHref = "/risk-impact-assessment-preview"
  Markers = @("Risk impact assessment preview", "Risk impact assessment preview does not override risk governor decisions approve execution mutate capital or place trades from the UI", "Risk impact assessment preview requires deterministic synthetic risk impact review only", "Risk impact assessment preview shows simulated position risk effect simulated drawdown effect simulated daily loss effect simulated symbol exposure effect simulated kill switch implication and operator review requirement", "Denied risk impact assessment paths remain blocked", "Risk impact assessment checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params