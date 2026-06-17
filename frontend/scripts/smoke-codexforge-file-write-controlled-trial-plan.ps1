param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 639 File Write Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-file-write-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\file-write-controlled-trial-plan" `
  -Route "src\app\file-write-controlled-trial-plan" `
  -MainPanel "FileWriteControlledTrialPlanPanel" `
  -CommandLabel "Go to File Write Controlled Trial Plan" `
  -Modules @("file-write-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("FileWriteControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteControlledTrialPlanStableKey", "buildFileWriteControlledTrialPlan", "buildFileWriteControlledTrialPlans", "buildFileWriteControlledTrialPlanBoundary", "buildFileWriteControlledTrialPlanModel", "summarizeFileWriteControlledTrialPlan", "FILE_WRITE_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("File write controlled trial plan", "File write controlled trial plan does not write files", "File write controlled trials require explicit operator approval", "Path allowlist/denylist", "Diff preview", "Rollback checklist", "Audit checklist") `
  -PlainEnglish @("File write controlled trial plan identity", "Path allowlist/denylist", "Diff preview", "Rollback checklist", "Audit checklist", "Next recommended action") `
  -RouteHref "/file-write-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 639 file write controlled trial plan smoke passed."
