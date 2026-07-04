param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2856 Video Dry Run Safety Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-safety-guard-wiring.ps1" `
  -Route "video-dry-run-safety-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Safety Guard Wiring" `
  -RouteHref "/video-dry-run-safety-guard-wiring" `
  -Phase "2856" `
  -Title "Video Dry Run Safety Guard Wiring"
