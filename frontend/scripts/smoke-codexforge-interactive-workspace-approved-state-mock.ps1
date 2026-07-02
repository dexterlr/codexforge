param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2206 Interactive Workspace Approved State Mock"
  ScriptFile = "smoke-codexforge-interactive-workspace-approved-state-mock.ps1"
  Domain = "src\lib\codexforge\interactive-workspace-approved-state-mock"
  Route = "src\app\interactive-workspace-approved-state-mock"
  CommandLabel = "Go to Interactive Workspace Approved State Mock"
  RouteHref = "/interactive-workspace-approved-state-mock"
  Markers = @("Interactive workspace approved state mock", "Interactive workspace approved state mock uses local React state only and does not persist approvals trigger render export publish or call services", "Interactive workspace approved state mock shows what a locally complete planning state looks like while backend execution remains blocked", "Interactive workspace approved state mock keeps protected actions disabled", "Denied approved state execution paths remain blocked", "Interactive workspace approved state mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
