param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2841 Video Dry Run Execution Block Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-execution-block-wiring.ps1" `
  -Route "video-dry-run-execution-block-wiring" `
  -CommandLabel "Go to Video Dry Run Execution Block Wiring" `
  -RouteHref "/video-dry-run-execution-block-wiring" `
  -Phase "2841" `
  -Title "Video Dry Run Execution Block Wiring"
