param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2828 Video Dry Run Idea Envelope Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-idea-envelope-wiring.ps1" `
  -Route "video-dry-run-idea-envelope-wiring" `
  -CommandLabel "Go to Video Dry Run Idea Envelope Wiring" `
  -RouteHref "/video-dry-run-idea-envelope-wiring" `
  -Phase "2828" `
  -Title "Video Dry Run Idea Envelope Wiring"
