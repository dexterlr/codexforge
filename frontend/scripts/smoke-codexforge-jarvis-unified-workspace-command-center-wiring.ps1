param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3725 Jarvis Unified Workspace Command Center Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-command-center-wiring.ps1'
  Route = 'jarvis-unified-workspace-command-center-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Command Center Wiring'
  RouteHref = '/jarvis-unified-workspace-command-center-wiring'
  Phase = '3725'
  Title = 'Jarvis Unified Workspace Command Center Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
