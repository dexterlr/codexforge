param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 632 Chatbot Workflow Profile" `
  -ScriptFile "smoke-codexforge-chatbot-workflow-profile.ps1" `
  -Domain "src\lib\codexforge\chatbot-workflow-profile" `
  -Route "src\app\chatbot-workflow-profile" `
  -MainPanel "ChatbotWorkflowProfilePanel" `
  -CommandLabel "Go to Chatbot Workflow Profile" `
  -Modules @("chatbot-workflow-profile-types.ts", "chatbot-workflow-profile-summary.ts", "index.ts") `
  -Components @("ChatbotWorkflowProfilePanel.tsx", "index.ts") `
  -Exports @("buildChatbotWorkflowProfileStableKey", "buildChatbotWorkflowProfile", "buildChatbotWorkflowProfiles", "buildChatbotWorkflowProfileBoundary", "buildChatbotWorkflowProfileModel", "summarizeChatbotWorkflowProfile", "CHATBOT_WORKFLOW_PROFILE_LANGUAGE") `
  -PhaseMarkers @("Chatbot workflow profile", "Chatbot workflow profile does not create or deploy chatbots agents", "Chatbot/agent execution requires explicit operator approval", "Unsafe chatbot workflows stay blocked", "Chatbot agent groups", "Test conversation lane") `
  -PlainEnglish @("Chatbot workflow profile identity", "Persona/policy lane", "Knowledge lane", "Tool access lane", "Deployment/export lane", "Denied chatbot actions", "Unresolved chatbot blockers", "Workflow profile registry route", "Provider/model boundary route", "Connector boundary route", "Next recommended action") `
  -RouteHref "/chatbot-workflow-profile"

Write-Host "[OK] CodexForge Phase 632 chatbot workflow profile smoke passed."
