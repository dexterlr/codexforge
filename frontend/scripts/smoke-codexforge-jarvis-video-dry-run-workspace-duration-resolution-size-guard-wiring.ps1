param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3798 Jarvis Video Dry Run Workspace Duration Resolution Size Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-duration-resolution-size-guard-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-duration-resolution-size-guard-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Duration Resolution Size Guard Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-duration-resolution-size-guard-wiring' `
  -Phase 'Phase 3798' `
  -Title 'Jarvis Video Dry Run Workspace Duration Resolution Size Guard Wiring'
