param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1549 Prompt Payload Approval Preview" `
  -ScriptFile "smoke-codexforge-prompt-payload-approval-preview.ps1" `
  -Domain "src\lib\codexforge\prompt-payload-approval-preview" `
  -Route "src\app\prompt-payload-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Prompt Payload Approval Preview" `
  -RouteHref "/prompt-payload-approval-preview" `
  -Markers @("Prompt payload approval preview", "Prompt payload approval preview does not send prompt payloads", "Prompt payload approval preview requires explicit operator approval", "Prompt payload approval preview shows goal context files commands evidence redaction privacy and denied payload sections before provider use", "Denied prompt payload approval paths remain blocked", "Prompt payload approval checklist")
