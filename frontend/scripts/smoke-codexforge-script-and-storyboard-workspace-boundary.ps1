param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1930 Script And Storyboard Workspace Boundary"
  ScriptFile = "smoke-codexforge-script-and-storyboard-workspace-boundary.ps1"
  Domain = "src\lib\codexforge\script-and-storyboard-workspace-boundary"
  Route = "src\app\script-and-storyboard-workspace-boundary"
  CommandLabel = "Go to Script And Storyboard Workspace Boundary"
  RouteHref = "/script-and-storyboard-workspace-boundary"
  Markers = @("Script and storyboard workspace boundary", "Script and storyboard workspace boundary does not generate final scripts render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards or write files from the UI", "Script and storyboard workspace boundary requires explicit operator approval", "Script and storyboard workspace boundary prepares deterministic synthetic script and storyboard planning workflows without frontend generation rendering export provider calls asset persistence or publishing", "Denied script and storyboard workspace paths remain blocked", "Script and storyboard workspace boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

