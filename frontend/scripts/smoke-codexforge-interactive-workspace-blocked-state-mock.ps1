param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2207 Interactive Workspace Blocked State Mock"
  ScriptFile = "smoke-codexforge-interactive-workspace-blocked-state-mock.ps1"
  Domain = "src\lib\codexforge\interactive-workspace-blocked-state-mock"
  Route = "src\app\interactive-workspace-blocked-state-mock"
  CommandLabel = "Go to Interactive Workspace Blocked State Mock"
  RouteHref = "/interactive-workspace-blocked-state-mock"
  Markers = @("Interactive workspace blocked state mock", "Interactive workspace blocked state mock uses local React state only and does not persist blockers create tickets dispatch workflows or call services", "Interactive workspace blocked state mock explains missing backend prerequisites for provider gateway asset storage audio storage render queue artifact export publish gateway approval capture and audit ledger", "Interactive workspace blocked state mock helps users see exactly why actions are blocked", "Denied blocked state execution paths remain blocked", "Interactive workspace blocked state mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
