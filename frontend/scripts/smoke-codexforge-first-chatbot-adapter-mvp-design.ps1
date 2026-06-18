param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 724 First Chatbot Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-chatbot-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-chatbot-adapter-mvp-design" `
  -Route "src\app\first-chatbot-adapter-mvp-design" `
  -MainPanel "FirstChatbotAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Chatbot Adapter MVP Design" `
  -Modules @("first-chatbot-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstChatbotAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstChatbotAdapterMvpDesignStableKey", "buildFirstChatbotAdapterMvpDesign", "buildFirstChatbotAdapterMvpDesigns", "buildFirstChatbotAdapterMvpDesignBoundary", "buildFirstChatbotAdapterMvpDesignModel", "summarizeFirstChatbotAdapterMvpDesign", "FIRST_CHATBOT_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Chatbot Adapter MVP Design", "First chatbot adapter MVP design does not create or deploy chatbots agents", "Chatbot/agent adapter MVP requires explicit operator approval", "Chatbot interface shape", "Persona/policy handling", "Knowledge scope", "Tool access dependency", "Test conversation policy", "Deployment/export dependency", "Monitoring policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Chatbot Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-chatbot-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 724 first chatbot adapter mvp design smoke passed."
