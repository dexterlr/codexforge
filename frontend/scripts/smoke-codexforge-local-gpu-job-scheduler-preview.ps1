param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local GPU Job Scheduler Preview" `
  -ScriptFile "smoke-codexforge-local-gpu-job-scheduler-preview.ps1" `
  -Domain "src\lib\codexforge\local-gpu-job-scheduler-preview" `
  -Route "src\app\gpu-scheduler" `
  -MainPanel "LocalGpuJobSchedulerPreviewPanel" `
  -CommandLabel "Go to GPU Scheduler" `
  -Modules @("local-gpu-scheduler-types.ts","gpu-job-profile.ts","gpu-job-priority.ts","gpu-job-resource-plan.ts","gpu-job-schedule-preview.ts","gpu-job-scheduler-safety.ts","gpu-job-scheduler-handoff.ts","gpu-job-scheduler-summary.ts","index.ts") `
  -Components @("LocalGpuJobSchedulerPreviewPanel.tsx","GpuJobProfilePanel.tsx","GpuJobPriorityPanel.tsx","GpuJobResourcePlanPanel.tsx","GpuJobSchedulePreviewPanel.tsx","GpuJobSchedulerSafetyPanel.tsx","GpuJobSchedulerHandoffPanel.tsx","GpuJobSchedulerSummaryPanel.tsx","GpuJobSchedulerSafetyStrip.tsx","GpuJobSchedulerEmptyState.tsx","index.ts") `
  -Exports @("buildGpuJobProfile","buildDefaultGpuJobProfiles","buildGpuJobPriority","buildGpuJobResourcePlan","buildGpuJobSchedulePreview","buildGpuJobSchedulerSafety","buildGpuJobSchedulerHandoff","buildGpuJobSchedulerSummary","summarizeGpuSchedulerPreview") `
  -PlainEnglish @("GPU job scheduler","Plan local creative jobs so your workstation is used safely.","Preview schedule","This is a plan, not execution","Heavy jobs should be queued","No start job button","No system command","No ComfyUI call") `
  -ExtraRoutes @("/video-jobs","/local-machine","/creative-cost-router","/dual-gpu","/render-queue","/video-final-render")
