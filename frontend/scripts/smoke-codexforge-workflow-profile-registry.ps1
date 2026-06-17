param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 629 Workflow Profile Registry" `
  -ScriptFile "smoke-codexforge-workflow-profile-registry.ps1" `
  -Domain "src\lib\codexforge\workflow-profile-registry" `
  -Route "src\app\workflow-profile-registry" `
  -MainPanel "WorkflowProfileRegistryPanel" `
  -CommandLabel "Go to Workflow Profile Registry" `
  -Modules @("workflow-profile-registry-types.ts", "workflow-profile-registry-summary.ts", "index.ts") `
  -Components @("WorkflowProfileRegistryPanel.tsx", "index.ts") `
  -Exports @("buildWorkflowProfileRegistryStableKey", "buildWorkflowProfileRegistry", "buildWorkflowProfileRegistries", "buildWorkflowProfileRegistryBoundary", "buildWorkflowProfileRegistryModel", "summarizeWorkflowProfileRegistry", "WORKFLOW_PROFILE_REGISTRY_LANGUAGE") `
  -PhaseMarkers @("Workflow profile registry", "Workflow profile registry does not execute workflow profiles", "Profile execution requires explicit operator approval", "Unresolved workflow profile blockers stay blocked", "Profile groups", "Video-call meeting profile") `
  -PlainEnglish @("Workflow profile registry identity", "Creative/video profile", "Research/live research profile", "Chatbot/agent profile", "Game/server profile", "Monitoring/automation profile", "Video-call/meeting profile", "Denied profile actions", "Unresolved profile blockers", "Creative profile route", "Research profile route", "Chatbot profile route", "Game server profile route", "Next recommended action") `
  -RouteHref "/workflow-profile-registry"

Write-Host "[OK] CodexForge Phase 629 workflow profile registry smoke passed."
