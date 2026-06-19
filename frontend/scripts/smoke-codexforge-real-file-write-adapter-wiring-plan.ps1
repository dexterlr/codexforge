param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 778 Real File Write Adapter Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-file-write-adapter-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-file-write-adapter-wiring-plan" `
  -Route "src\app\real-file-write-adapter-wiring-plan" `
  -MainPanel "RealFileWriteAdapterWiringPlanPanel" `
  -CommandLabel "Go to Real File Write Adapter Wiring Plan" `
  -Modules @("real-file-write-adapter-wiring-plan-model.ts", "index.ts") `
  -Components @("RealFileWriteAdapterWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealFileWriteAdapterWiringPlanStableKey", "buildRealFileWriteAdapterWiringPlan", "buildRealFileWriteAdapterWiringPlanItems", "buildRealFileWriteAdapterWiringPlanBoundary", "buildRealFileWriteAdapterWiringPlanModel", "summarizeRealFileWriteAdapterWiringPlan", "REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real File Write Adapter Wiring Plan", "Real file write adapter wiring plan does not write files", "File write adapter wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "diff preview", "write operation", "rollback", "audit", "evidence", "result", "validation", "unresolved blockers") `
  -PlainEnglish @("Real File Write Adapter Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real file write adapter wiring plan does not write files") `
  -RouteHref "/real-file-write-adapter-wiring-plan"

Write-Host "[OK] CodexForge Phase 778 real file write adapter wiring plan smoke passed."
