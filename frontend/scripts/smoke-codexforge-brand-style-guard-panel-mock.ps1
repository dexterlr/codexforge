param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2195 Brand Style Guard Panel Mock"
  ScriptFile = "smoke-codexforge-brand-style-guard-panel-mock.ps1"
  Domain = "src\lib\codexforge\brand-style-guard-panel-mock"
  Route = "src\app\brand-style-guard-panel-mock"
  CommandLabel = "Go to Brand Style Guard Panel Mock"
  RouteHref = "/brand-style-guard-panel-mock"
  Markers = @("Brand style guard panel mock", "Brand style guard panel mock uses local React state only and does not approve legal review persist brand decisions or call providers", "Brand style guard panel mock includes brand tone visual rules restricted claims colour notes and compliance warnings", "Brand style guard panel mock keeps brand/legal approval blocked until backend approval capture exists", "Denied brand approval paths remain blocked", "Brand style guard panel mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
