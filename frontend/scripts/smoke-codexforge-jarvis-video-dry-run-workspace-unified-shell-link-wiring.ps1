param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3813 Jarvis Video Dry Run Workspace Unified Shell Link Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-unified-shell-link-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-unified-shell-link-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Unified Shell Link Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-unified-shell-link-wiring' `
  -Phase 'Phase 3813' `
  -Title 'Jarvis Video Dry Run Workspace Unified Shell Link Wiring'
