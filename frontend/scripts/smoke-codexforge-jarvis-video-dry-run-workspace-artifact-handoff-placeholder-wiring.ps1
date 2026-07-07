param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3801 Jarvis Video Dry Run Workspace Artifact Handoff Placeholder Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-artifact-handoff-placeholder-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-artifact-handoff-placeholder-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Artifact Handoff Placeholder Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-artifact-handoff-placeholder-wiring' `
  -Phase 'Phase 3801' `
  -Title 'Jarvis Video Dry Run Workspace Artifact Handoff Placeholder Wiring'
