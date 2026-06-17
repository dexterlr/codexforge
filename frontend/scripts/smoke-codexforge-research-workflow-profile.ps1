param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 631 Research Workflow Profile" `
  -ScriptFile "smoke-codexforge-research-workflow-profile.ps1" `
  -Domain "src\lib\codexforge\research-workflow-profile" `
  -Route "src\app\research-workflow-profile" `
  -MainPanel "ResearchWorkflowProfilePanel" `
  -CommandLabel "Go to Research Workflow Profile" `
  -Modules @("research-workflow-profile-types.ts", "research-workflow-profile-summary.ts", "index.ts") `
  -Components @("ResearchWorkflowProfilePanel.tsx", "index.ts") `
  -Exports @("buildResearchWorkflowProfileStableKey", "buildResearchWorkflowProfile", "buildResearchWorkflowProfiles", "buildResearchWorkflowProfileBoundary", "buildResearchWorkflowProfileModel", "summarizeResearchWorkflowProfile", "RESEARCH_WORKFLOW_PROFILE_LANGUAGE") `
  -PhaseMarkers @("Research workflow profile", "Research workflow profile does not browse, search, or fetch sources", "Research execution requires explicit operator approval", "Unsafe research workflows stay blocked", "Research groups", "Live research lane") `
  -PlainEnglish @("Research workflow profile identity", "Static research lane", "Source/citation boundary checklist", "Connector/web/search boundary checklist", "Evidence/result/recovery/export checklist", "Denied research actions", "Unresolved research blockers", "Workflow profile registry route", "Evidence boundary route", "Next recommended action") `
  -RouteHref "/research-workflow-profile"

Write-Host "[OK] CodexForge Phase 631 research workflow profile smoke passed."
