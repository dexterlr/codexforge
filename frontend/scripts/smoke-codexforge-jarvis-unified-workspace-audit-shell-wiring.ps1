param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3733 Jarvis Unified Workspace Audit Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-audit-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-audit-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Audit Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-audit-shell-wiring'
  Phase = '3733'
  Title = 'Jarvis Unified Workspace Audit Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
