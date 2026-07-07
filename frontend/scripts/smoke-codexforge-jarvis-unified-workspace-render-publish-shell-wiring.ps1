param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3732 Jarvis Unified Workspace Render Publish Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-render-publish-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-render-publish-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Render Publish Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-render-publish-shell-wiring'
  Phase = '3732'
  Title = 'Jarvis Unified Workspace Render Publish Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
