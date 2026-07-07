param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3790 Jarvis Video Dry Run Workspace Adapter Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-adapter-route-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-adapter-route-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Adapter Route Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-adapter-route-wiring' `
  -Phase 'Phase 3790' `
  -Title 'Jarvis Video Dry Run Workspace Adapter Route Wiring'
