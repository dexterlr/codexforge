param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3753 Jarvis Unified Workspace Completion'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-completion.ps1'
  Route = 'jarvis-unified-workspace-completion'
  CommandLabel = 'Go to Jarvis Unified Workspace Completion'
  RouteHref = '/jarvis-unified-workspace-completion'
  Phase = '3753'
  Title = 'Jarvis Unified Workspace Completion'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
