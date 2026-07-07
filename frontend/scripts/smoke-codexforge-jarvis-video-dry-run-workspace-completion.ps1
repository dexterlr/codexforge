param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3817 Jarvis Video Dry Run Workspace Completion' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-completion.ps1' `
  -Route 'jarvis-video-dry-run-workspace-completion' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Completion' `
  -RouteHref '/jarvis-video-dry-run-workspace-completion' `
  -Phase 'Phase 3817' `
  -Title 'Jarvis Video Dry Run Workspace Completion'
