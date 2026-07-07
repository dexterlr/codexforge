param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3791 Jarvis Video Dry Run Workspace Permission Decision Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-permission-decision-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-permission-decision-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Permission Decision Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-permission-decision-wiring' `
  -Phase 'Phase 3791' `
  -Title 'Jarvis Video Dry Run Workspace Permission Decision Wiring'
