param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1538 Prompt Payload Preview" `
  -ScriptFile "smoke-codexforge-prompt-payload-preview.ps1" `
  -Domain "src\lib\codexforge\prompt-payload-preview" `
  -Route "src\app\prompt-payload-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Prompt Payload Preview" `
  -RouteHref "/prompt-payload-preview" `
  -Markers @("Prompt payload preview", "Prompt payload preview does not send prompts", "Prompt payload preview requires explicit operator approval", "Prompt payload preview shows goal context files commands evidence privacy redaction and denied payload sections before any provider use", "Denied prompt payload paths remain blocked", "Prompt payload checklist")
