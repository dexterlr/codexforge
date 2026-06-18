param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 699 File Write Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-file-write-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\file-write-adapter-implementation-plan" `
  -Route "src\app\file-write-adapter-implementation-plan" `
  -MainPanel "FileWriteAdapterImplementationPlanPanel" `
  -CommandLabel "Go to File Write Adapter Implementation Plan" `
  -Modules @("file-write-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("FileWriteAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteAdapterImplementationPlanStableKey", "buildFileWriteAdapterImplementationPlan", "buildFileWriteAdapterImplementationPlans", "buildFileWriteAdapterImplementationPlanBoundary", "buildFileWriteAdapterImplementationPlanModel", "summarizeFileWriteAdapterImplementationPlan", "FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("File Write Adapter Implementation Plan", "File write adapter implementation plan does not write files", "File write adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Path policy", "Diff policy", "Rollback policy", "Audit policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("File write adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/file-write-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 699 file write adapter implementation plan smoke passed."
