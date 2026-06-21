param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1067 Guarded Execution Queue Item" `
  -ScriptFile "smoke-codexforge-guarded-execution-queue-item.ps1" `
  -Domain "src\lib\codexforge\guarded-execution-queue-item" `
  -Route "src\app\guarded-execution-queue-item" `
  -MainPanel "GuardedExecutionQueueItemPanel" `
  -CommandLabel "Go to Guarded Execution Queue Item" `
  -Modules @("guarded-execution-queue-item-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedExecutionQueueItemStableKey", "buildGuardedExecutionQueueItem", "buildGuardedExecutionQueueItemItems", "buildGuardedExecutionQueueItemBoundary", "buildGuardedExecutionQueueItemModel", "summarizeGuardedExecutionQueueItem", "GUARDED_EXECUTION_QUEUE_ITEM_LANGUAGE") `
  -PhaseMarkers @("Guarded execution queue item", "Guarded execution queue item does not persist queue state", "Queue item decisions require explicit operator approval", "Queue items remain preview-only until operator signoff", "Denied guarded execution queue item paths remain blocked", "Guarded execution queue item checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded execution queue item does not persist queue state", "Queue item decisions require explicit operator approval", "Denied guarded execution queue item paths remain blocked") `
  -RouteHref "/guarded-execution-queue-item"

Write-Host "[OK] CodexForge Phase 1067 Guarded Execution Queue Item smoke passed."
