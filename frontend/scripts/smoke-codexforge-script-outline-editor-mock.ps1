param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2189 Script Outline Editor Mock"
  ScriptFile = "smoke-codexforge-script-outline-editor-mock.ps1"
  Domain = "src\lib\codexforge\script-outline-editor-mock"
  Route = "src\app\script-outline-editor-mock"
  CommandLabel = "Go to Script Outline Editor Mock"
  RouteHref = "/script-outline-editor-mock"
  Markers = @("Script outline editor mock", "Script outline editor mock uses local React state only and does not generate scripts send prompts call models persist text or write files", "Script outline editor mock includes hook problem proof offer call to action and closing sections", "Script outline editor mock allows local text edits and shows generation blocked until provider gateway wiring exists", "Denied script generation paths remain blocked", "Script outline editor mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
