param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1563 Local Runtime Identity Preview" `
  -ScriptFile "smoke-codexforge-local-runtime-identity-preview.ps1" `
  -Domain "src\lib\codexforge\local-runtime-identity-preview" `
  -Route "src\app\local-runtime-identity-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Runtime Identity Preview" `
  -RouteHref "/local-runtime-identity-preview" `
  -Markers @("Local runtime identity preview", "Local runtime identity preview does not start runtimes", "Local runtime identity preview requires explicit operator approval", "Local runtime identity preview shows Ollama LM Studio llama.cpp vLLM OpenAI-compatible localhost and manual runtime classes as review-only options", "Denied local runtime identity paths remain blocked", "Local runtime identity checklist")
