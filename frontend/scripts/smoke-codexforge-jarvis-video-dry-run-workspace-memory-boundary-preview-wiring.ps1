param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3805 Jarvis Video Dry Run Workspace Memory Boundary Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-memory-boundary-preview-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-memory-boundary-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Memory Boundary Preview Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-memory-boundary-preview-wiring' `
  -Phase 'Phase 3805' `
  -Title 'Jarvis Video Dry Run Workspace Memory Boundary Preview Wiring'
