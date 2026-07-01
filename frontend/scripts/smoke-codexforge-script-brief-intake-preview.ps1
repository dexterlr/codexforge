param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1931 Script Brief Intake Preview"
  ScriptFile = "smoke-codexforge-script-brief-intake-preview.ps1"
  Domain = "src\lib\codexforge\script-brief-intake-preview"
  Route = "src\app\script-brief-intake-preview"
  CommandLabel = "Go to Script Brief Intake Preview"
  RouteHref = "/script-brief-intake-preview"
  Markers = @("Script brief intake preview", "Script brief intake preview does not persist briefs send prompts call models generate scripts or create files from the UI", "Script brief intake preview requires deterministic synthetic brief rows only", "Script brief intake preview shows simulated video title simulated objective simulated target audience simulated tone simulated review status and denied frontend persistence", "Denied script brief intake paths remain blocked", "Script brief intake checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

