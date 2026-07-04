param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2837 Video Dry Run Worker Orchestration Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-worker-orchestration-handoff-wiring.ps1" `
  -Route "video-dry-run-worker-orchestration-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Worker Orchestration Handoff Wiring" `
  -RouteHref "/video-dry-run-worker-orchestration-handoff-wiring" `
  -Phase "2837" `
  -Title "Video Dry Run Worker Orchestration Handoff Wiring"
