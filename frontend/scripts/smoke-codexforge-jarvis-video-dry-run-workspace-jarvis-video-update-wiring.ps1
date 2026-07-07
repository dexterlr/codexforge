param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3812 Jarvis Video Dry Run Workspace Jarvis Video Update Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-jarvis-video-update-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-jarvis-video-update-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Jarvis Video Update Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-jarvis-video-update-wiring' `
  -Phase 'Phase 3812' `
  -Title 'Jarvis Video Dry Run Workspace Jarvis Video Update Wiring'
