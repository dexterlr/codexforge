param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2829 Video Dry Run Prompt Review Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-prompt-review-wiring.ps1" `
  -Route "video-dry-run-prompt-review-wiring" `
  -CommandLabel "Go to Video Dry Run Prompt Review Wiring" `
  -RouteHref "/video-dry-run-prompt-review-wiring" `
  -Phase "2829" `
  -Title "Video Dry Run Prompt Review Wiring"
