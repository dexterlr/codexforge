param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2855 Video Dry Run Privacy Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-privacy-guard-wiring.ps1" `
  -Route "video-dry-run-privacy-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Privacy Guard Wiring" `
  -RouteHref "/video-dry-run-privacy-guard-wiring" `
  -Phase "2855" `
  -Title "Video Dry Run Privacy Guard Wiring"
