param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3729 Jarvis Unified Workspace Chatbot Brain Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-chatbot-brain-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-chatbot-brain-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Chatbot Brain Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-chatbot-brain-shell-wiring'
  Phase = '3729'
  Title = 'Jarvis Unified Workspace Chatbot Brain Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
