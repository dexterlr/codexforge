param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2205 Interactive Workspace Review State Mock"
  ScriptFile = "smoke-codexforge-interactive-workspace-review-state-mock.ps1"
  Domain = "src\lib\codexforge\interactive-workspace-review-state-mock"
  Route = "src\app\interactive-workspace-review-state-mock"
  CommandLabel = "Go to Interactive Workspace Review State Mock"
  RouteHref = "/interactive-workspace-review-state-mock"
  Markers = @("Interactive workspace review state mock", "Interactive workspace review state mock uses local React state only and does not persist review state approve actions or trigger backend workflows", "Interactive workspace review state mock shows review checklist progress and blocked approval capture", "Interactive workspace review state mock keeps export publish render blocked until backend approval capture exists", "Denied review state persistence paths remain blocked", "Interactive workspace review state mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
