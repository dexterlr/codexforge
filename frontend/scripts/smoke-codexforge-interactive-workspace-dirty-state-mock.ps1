param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2204 Interactive Workspace Dirty State Mock"
  ScriptFile = "smoke-codexforge-interactive-workspace-dirty-state-mock.ps1"
  Domain = "src\lib\codexforge\interactive-workspace-dirty-state-mock"
  Route = "src\app\interactive-workspace-dirty-state-mock"
  CommandLabel = "Go to Interactive Workspace Dirty State Mock"
  RouteHref = "/interactive-workspace-dirty-state-mock"
  Markers = @("Interactive workspace dirty state mock", "Interactive workspace dirty state mock uses local React state only and does not save changes persist drafts or write browser storage", "Interactive workspace dirty state mock shows unsaved local-only changes and backend persistence required", "Interactive workspace dirty state mock includes safe reset or local edit indicators only", "Denied dirty state persistence paths remain blocked", "Interactive workspace dirty state mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
