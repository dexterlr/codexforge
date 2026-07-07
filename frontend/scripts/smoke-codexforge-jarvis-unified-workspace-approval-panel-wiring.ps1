param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3739 Jarvis Unified Workspace Approval Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-approval-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-approval-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Approval Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-approval-panel-wiring'
  Phase = '3739'
  Title = 'Jarvis Unified Workspace Approval Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
