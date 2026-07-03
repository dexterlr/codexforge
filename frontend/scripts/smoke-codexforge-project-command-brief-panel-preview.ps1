param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2223 Project Command Brief Panel Preview"
  ScriptFile = "smoke-codexforge-project-command-brief-panel-preview.ps1"
  Domain = "project-command-brief-panel-preview"
  Route = "project-command-brief-panel-preview"
  CommandLabel = "Go to Project Command Brief Panel Preview"
  RouteHref = "/project-command-brief-panel-preview"
  Markers = @("Project command brief panel preview", "Project command brief panel preview visually upgrades the project brief editor area with premium panel hierarchy and clear local-only editing language", "Project command brief panel preview does not save briefs persist projects send prompts call providers call models or write browser storage", "Project command brief panel preview keeps backend persistence required", "Denied project command brief execution paths remain blocked", "Project command brief panel checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
