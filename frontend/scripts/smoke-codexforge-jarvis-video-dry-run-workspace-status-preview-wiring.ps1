param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3804 Jarvis Video Dry Run Workspace Status Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-status-preview-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-status-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Status Preview Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-status-preview-wiring' `
  -Phase 'Phase 3804' `
  -Title 'Jarvis Video Dry Run Workspace Status Preview Wiring'
