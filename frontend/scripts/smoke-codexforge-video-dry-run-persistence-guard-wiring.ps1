param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2842 Video Dry Run Persistence Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-persistence-guard-wiring.ps1" `
  -Route "video-dry-run-persistence-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Persistence Guard Wiring" `
  -RouteHref "/video-dry-run-persistence-guard-wiring" `
  -Phase "2842" `
  -Title "Video Dry Run Persistence Guard Wiring"
