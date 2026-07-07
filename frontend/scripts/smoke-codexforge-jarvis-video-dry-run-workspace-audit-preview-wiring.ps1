param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3802 Jarvis Video Dry Run Workspace Audit Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-audit-preview-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-audit-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Audit Preview Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-audit-preview-wiring' `
  -Phase 'Phase 3802' `
  -Title 'Jarvis Video Dry Run Workspace Audit Preview Wiring'
