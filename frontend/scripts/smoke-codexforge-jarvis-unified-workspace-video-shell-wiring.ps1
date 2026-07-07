param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3726 Jarvis Unified Workspace Video Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-video-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-video-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Video Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-video-shell-wiring'
  Phase = '3726'
  Title = 'Jarvis Unified Workspace Video Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
