param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3803 Jarvis Video Dry Run Workspace Result Ledger Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-result-ledger-preview-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-result-ledger-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Result Ledger Preview Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-result-ledger-preview-wiring' `
  -Phase 'Phase 3803' `
  -Title 'Jarvis Video Dry Run Workspace Result Ledger Preview Wiring'
