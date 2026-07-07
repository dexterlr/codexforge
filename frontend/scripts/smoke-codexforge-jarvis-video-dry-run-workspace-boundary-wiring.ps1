param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3786 Jarvis Video Dry Run Workspace Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-boundary-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-boundary-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Boundary Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-boundary-wiring' `
  -Phase 'Phase 3786' `
  -Title 'Jarvis Video Dry Run Workspace Boundary Wiring'
