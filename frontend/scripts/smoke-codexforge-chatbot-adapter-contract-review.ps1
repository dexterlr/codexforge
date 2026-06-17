param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 679 Chatbot Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-chatbot-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\chatbot-adapter-contract-review" `
  -Route "src\app\chatbot-adapter-contract-review" `
  -MainPanel "ChatbotAdapterContractReviewPanel" `
  -CommandLabel "Go to Chatbot Adapter Contract Review" `
  -Modules @("chatbot-adapter-contract-review-model.ts", "index.ts") `
  -Components @("ChatbotAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildChatbotAdapterContractReviewStableKey", "buildChatbotAdapterContractReview", "buildChatbotAdapterContractReviews", "buildChatbotAdapterContractReviewBoundary", "buildChatbotAdapterContractReviewModel", "summarizeChatbotAdapterContractReview", "CHATBOT_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Chatbot adapter contract review", "Chatbot adapter contract review does not create or deploy chatbots agents", "Chatbot/agent adapters require explicit operator approval", "Adapter not executable from UI", "Persona/policy", "Knowledge", "Tool access", "Test conversation", "Deployment/export", "Monitoring", "Denied chatbot adapter actions") `
  -PlainEnglish @("Chatbot adapter contract review identity", "Persona/policy", "Knowledge", "Tool access", "Test conversation", "Deployment/export", "Monitoring", "Denied chatbot adapter actions", "Unresolved chatbot adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/chatbot-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 679 chatbot adapter contract review smoke passed."
