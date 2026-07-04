param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2827 Video Dry Run Contract Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-contract-wiring.ps1" `
  -Route "video-dry-run-contract-wiring" `
  -CommandLabel "Go to Video Dry Run Contract Wiring" `
  -RouteHref "/video-dry-run-contract-wiring" `
  -Phase "2827" `
  -Title "Video Dry Run Contract Wiring"
