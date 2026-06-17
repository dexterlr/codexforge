param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 630 Creative Workflow Profile" `
  -ScriptFile "smoke-codexforge-creative-workflow-profile.ps1" `
  -Domain "src\lib\codexforge\creative-workflow-profile" `
  -Route "src\app\creative-workflow-profile" `
  -MainPanel "CreativeWorkflowProfilePanel" `
  -CommandLabel "Go to Creative Workflow Profile" `
  -Modules @("creative-workflow-profile-types.ts", "creative-workflow-profile-summary.ts", "index.ts") `
  -Components @("CreativeWorkflowProfilePanel.tsx", "index.ts") `
  -Exports @("buildCreativeWorkflowProfileStableKey", "buildCreativeWorkflowProfile", "buildCreativeWorkflowProfiles", "buildCreativeWorkflowProfileBoundary", "buildCreativeWorkflowProfileModel", "summarizeCreativeWorkflowProfile", "CREATIVE_WORKFLOW_PROFILE_LANGUAGE") `
  -PhaseMarkers @("Creative workflow profile", "Creative workflow profile does not generate images, video, or 3D assets", "Creative execution requires explicit operator approval", "Unsafe creative workflows stay blocked", "Creative groups", "Storyboard lanes") `
  -PlainEnglish @("Creative workflow profile identity", "Image/video/3D/storyboard lanes", "Provider/model boundary checklist", "Local runtime/tool boundary checklist", "Evidence/result/recovery/export checklist", "Denied creative actions", "Unresolved creative blockers", "Workflow profile registry route", "Universal execution inventory route", "Next recommended action") `
  -RouteHref "/creative-workflow-profile"

Write-Host "[OK] CodexForge Phase 630 creative workflow profile smoke passed."
