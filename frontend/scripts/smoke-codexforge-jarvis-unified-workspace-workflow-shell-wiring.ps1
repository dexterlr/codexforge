param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3731 Jarvis Unified Workspace Workflow Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-workflow-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-workflow-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Workflow Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-workflow-shell-wiring'
  Phase = '3731'
  Title = 'Jarvis Unified Workspace Workflow Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
