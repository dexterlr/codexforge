param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2857 End-to-End Video Creation Dry Run Completion" `
  -ScriptFile "smoke-codexforge-end-to-end-video-creation-dry-run-completion.ps1" `
  -Route "end-to-end-video-creation-dry-run-completion" `
  -CommandLabel "Go to End-to-End Video Creation Dry Run Completion" `
  -RouteHref "/end-to-end-video-creation-dry-run-completion" `
  -Phase "2857" `
  -Title "End-to-End Video Creation Dry Run Completion"
