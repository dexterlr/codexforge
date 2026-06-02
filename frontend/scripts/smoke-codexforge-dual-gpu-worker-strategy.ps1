param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Dual-GPU Worker Strategy" `
  -ScriptFile "smoke-codexforge-dual-gpu-worker-strategy.ps1" `
  -Domain "src\lib\codexforge\dual-gpu-worker-strategy" `
  -Route "src\app\dual-gpu" `
  -MainPanel "DualGpuWorkerStrategyPanel" `
  -CommandLabel "Go to Dual-GPU Strategy" `
  -Modules @("dual-gpu-worker-types.ts","dual-gpu-profile.ts","gpu-worker-role.ts","gpu-worker-assignment.ts","gpu-worker-safety.ts","gpu-worker-routing-strategy.ts","gpu-worker-handoff.ts","dual-gpu-worker-summary.ts","index.ts") `
  -Components @("DualGpuWorkerStrategyPanel.tsx","DualGpuProfilePanel.tsx","GpuWorkerRolePanel.tsx","GpuWorkerAssignmentPanel.tsx","GpuWorkerSafetyPanel.tsx","GpuWorkerRoutingStrategyPanel.tsx","GpuWorkerHandoffPanel.tsx","DualGpuWorkerSummaryPanel.tsx","DualGpuWorkerSafetyStrip.tsx","DualGpuWorkerEmptyState.tsx","index.ts") `
  -Exports @("buildDualGpuProfile","buildDefaultDualGpuProfile","buildGpuWorkerRole","buildDefaultGpuWorkerRoles","buildGpuWorkerAssignment","buildGpuWorkerSafety","buildGpuWorkerRoutingStrategy","buildGpuWorkerHandoff","buildDualGpuWorkerSummary","summarizeDualGpuStrategy") `
  -PlainEnglish @("Dual-GPU strategy","Use two GPUs as reviewed workers for local creative jobs.","Review GPU strategy","Two GPUs are best treated as parallel workers","Do not assume combined VRAM","GPU 1 primary draft worker","GPU 2 upscale/interpolation worker","No automatic GPU selection") `
  -ExtraRoutes @("/local-machine","/gpu-scheduler","/creative-cost-router","/render-queue","/video-final-render")
