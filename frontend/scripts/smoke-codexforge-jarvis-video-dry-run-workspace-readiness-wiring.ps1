param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3815 Jarvis Video Dry Run Workspace Readiness Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-readiness-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-readiness-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Readiness Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-readiness-wiring' `
  -Phase 'Phase 3815' `
  -Title 'Jarvis Video Dry Run Workspace Readiness Wiring'
