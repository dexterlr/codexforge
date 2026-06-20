param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 957 Project Plan Model-Routing Preview" `
  -ScriptFile "smoke-codexforge-project-plan-model-routing-preview.ps1" `
  -Domain "src\lib\codexforge\project-plan-model-routing-preview" `
  -Route "src\app\project-plan-model-routing-preview" `
  -MainPanel "ProjectPlanModelRoutingPreviewPanel" `
  -CommandLabel "Go to Project Plan Model-Routing Preview" `
  -Modules @("project-plan-model-routing-preview-model.ts", "index.ts") `
  -Components @("ProjectPlanModelRoutingPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectPlanModelRoutingPreviewStableKey", "buildProjectPlanModelRoutingPreview", "buildProjectPlanModelRoutingPreviewItems", "buildProjectPlanModelRoutingPreviewBoundary", "buildProjectPlanModelRoutingPreviewModel", "summarizeProjectPlanModelRoutingPreview", "PROJECT_PLAN_MODEL_ROUTING_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project plan model-routing preview", "Project plan model-routing preview does not route live requests", "Project plan routing requires explicit operator approval", "Project plans explain model selection rationale", "Denied project plan routing paths remain blocked", "Project plan routing checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project plan model-routing preview does not route live requests", "Project plan routing requires explicit operator approval", "Denied project plan routing paths remain blocked") `
  -RouteHref "/project-plan-model-routing-preview"

Write-Host "[OK] CodexForge Phase 957 Project plan model-routing preview smoke passed."
