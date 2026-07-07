param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3795 Jarvis Video Dry Run Workspace Provider Reference Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-provider-reference-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-provider-reference-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Provider Reference Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-provider-reference-wiring' `
  -Phase 'Phase 3795' `
  -Title 'Jarvis Video Dry Run Workspace Provider Reference Wiring'
