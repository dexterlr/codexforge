param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2187 Project Brief Editor Mock"
  ScriptFile = "smoke-codexforge-project-brief-editor-mock.ps1"
  Domain = "src\lib\codexforge\project-brief-editor-mock"
  Route = "src\app\project-brief-editor-mock"
  CommandLabel = "Go to Project Brief Editor Mock"
  RouteHref = "/project-brief-editor-mock"
  Markers = @("Project brief editor mock", "Project brief editor mock uses local React state only and does not save briefs persist projects send prompts call providers call models or write browser storage", "Project brief editor mock includes editable fields for title objective audience tone duration platform and success criteria", "Project brief editor mock shows unsaved local-only state and backend persistence required", "Denied project brief persistence paths remain blocked", "Project brief editor mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
