param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 695 Chatbot Adapter Preview" `
  -ScriptFile "smoke-codexforge-chatbot-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\chatbot-adapter-preview" `
  -Route "src\\app\\chatbot-adapter-preview" `
  -MainPanel "ChatbotAdapterPreviewPanel" `
  -CommandLabel "Go to Chatbot Adapter Preview" `
  -Modules @("chatbot-adapter-preview-model.ts", "index.ts") `
  -Components @("ChatbotAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildChatbotAdapterPreviewStableKey", "buildChatbotAdapterPreview", "buildChatbotAdapterPreviews", "buildChatbotAdapterPreviewBoundary", "buildChatbotAdapterPreviewModel", "summarizeChatbotAdapterPreview", "CHATBOT_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Chatbot adapter preview", "Chatbot adapter preview does not create or deploy chatbots agents", "Chatbot/agent execution requires explicit operator approval", "Bot purpose", "Persona/policy", "Knowledge scope", "Tool access", "Test conversation", "Deployment/export", "Monitoring", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Chatbot adapter preview identity", "Bot purpose", "Persona/policy", "Knowledge scope", "Tool access", "Test conversation", "Deployment/export", "Monitoring", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/chatbot-adapter-preview"

Write-Host "[OK] CodexForge Phase 695 chatbot adapter preview smoke passed."
