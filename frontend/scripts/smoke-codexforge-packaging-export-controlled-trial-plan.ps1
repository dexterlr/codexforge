param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 648 Packaging Export Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-packaging-export-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\packaging-export-controlled-trial-plan" `
  -Route "src\app\packaging-export-controlled-trial-plan" `
  -MainPanel "PackagingExportControlledTrialPlanPanel" `
  -CommandLabel "Go to Packaging Export Controlled Trial Plan" `
  -Modules @("packaging-export-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("PackagingExportControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildPackagingExportControlledTrialPlanStableKey", "buildPackagingExportControlledTrialPlan", "buildPackagingExportControlledTrialPlans", "buildPackagingExportControlledTrialPlanBoundary", "buildPackagingExportControlledTrialPlanModel", "summarizePackagingExportControlledTrialPlan", "PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Packaging/export controlled trial plan", "Packaging/export controlled trial plan does not create packages or exports", "Packaging/export requires explicit operator approval", "Bundle checklist", "Destination checklist", "Redaction/license checklist", "Rollback checklist") `
  -PlainEnglish @("Packaging/export controlled trial plan identity", "Bundle checklist", "Destination checklist", "Redaction/license checklist", "Rollback checklist", "Next recommended action") `
  -RouteHref "/packaging-export-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 648 packaging export controlled trial plan smoke passed."
