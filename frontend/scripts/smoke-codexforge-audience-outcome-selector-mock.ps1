param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2188 Audience Outcome Selector Mock"
  ScriptFile = "smoke-codexforge-audience-outcome-selector-mock.ps1"
  Domain = "src\lib\codexforge\audience-outcome-selector-mock"
  Route = "src\app\audience-outcome-selector-mock"
  CommandLabel = "Go to Audience Outcome Selector Mock"
  RouteHref = "/audience-outcome-selector-mock"
  Markers = @("Audience outcome selector mock", "Audience outcome selector mock uses local React state only and does not persist audience data send prompts call providers call models or create jobs", "Audience outcome selector mock includes selectable audience segments outcomes formats and platform intent", "Audience outcome selector mock updates visible planning summary locally without backend execution", "Denied audience outcome persistence paths remain blocked", "Audience outcome selector mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
