param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3789 Jarvis Video Dry Run Workspace Capability Selection Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-capability-selection-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-capability-selection-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Capability Selection Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-capability-selection-wiring' `
  -Phase 'Phase 3789' `
  -Title 'Jarvis Video Dry Run Workspace Capability Selection Wiring'
