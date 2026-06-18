param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 711 Chatbot Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-chatbot-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\chatbot-adapter-implementation-plan" `
  -Route "src\app\chatbot-adapter-implementation-plan" `
  -MainPanel "ChatbotAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Chatbot Adapter Implementation Plan" `
  -Modules @("chatbot-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("ChatbotAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildChatbotAdapterImplementationPlanStableKey", "buildChatbotAdapterImplementationPlan", "buildChatbotAdapterImplementationPlans", "buildChatbotAdapterImplementationPlanBoundary", "buildChatbotAdapterImplementationPlanModel", "summarizeChatbotAdapterImplementationPlan", "CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Chatbot Adapter Implementation Plan", "Chatbot adapter implementation plan does not create or deploy chatbots agents", "Chatbot/agent adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Persona/policy handling", "Knowledge scope", "Tool access", "Test conversation", "Deployment/export", "Monitoring policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Chatbot adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/chatbot-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 711 chatbot adapter implementation plan smoke passed."
