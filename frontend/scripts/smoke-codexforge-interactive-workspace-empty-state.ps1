param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2203 Interactive Workspace Empty State"
  ScriptFile = "smoke-codexforge-interactive-workspace-empty-state.ps1"
  Domain = "src\lib\codexforge\interactive-workspace-empty-state"
  Route = "src\app\interactive-workspace-empty-state"
  CommandLabel = "Go to Interactive Workspace Empty State"
  RouteHref = "/interactive-workspace-empty-state"
  Markers = @("Interactive workspace empty state", "Interactive workspace empty state uses local React state only and does not create projects persist state call providers or create jobs", "Interactive workspace empty state guides the user into project brief script storyboard asset audio caption rights and approval setup", "Interactive workspace empty state keeps backend actions blocked", "Denied empty state execution paths remain blocked", "Interactive workspace empty state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
