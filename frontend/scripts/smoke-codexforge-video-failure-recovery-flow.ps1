param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Video Failure Recovery Flow" `
  -ScriptFile "smoke-codexforge-video-failure-recovery-flow.ps1" `
  -Domain "src\lib\codexforge\video-failure-recovery-flow" `
  -Route "src\app\video-recovery" `
  -MainPanel "VideoFailureRecoveryFlowPanel" `
  -CommandLabel "Go to Video Recovery" `
  -Modules @("video-failure-recovery-types.ts","video-failure-case.ts","video-failure-diagnosis.ts","video-failure-safe-next-step.ts","video-failure-retry-plan.ts","video-failure-workflow-fix.ts","video-failure-handoff.ts","video-failure-recovery-summary.ts","index.ts") `
  -Components @("VideoFailureRecoveryFlowPanel.tsx","VideoFailureCasePanel.tsx","VideoFailureDiagnosisPanel.tsx","VideoFailureSafeNextStepPanel.tsx","VideoFailureRetryPlanPanel.tsx","VideoFailureWorkflowFixPanel.tsx","VideoFailureHandoffPanel.tsx","VideoFailureRecoverySummaryPanel.tsx","VideoFailureRecoverySafetyStrip.tsx","VideoFailureRecoveryEmptyState.tsx","index.ts") `
  -Exports @("buildVideoFailureCase","buildDefaultVideoFailureCases","buildVideoFailureDiagnosis","buildVideoFailureSafeNextStep","buildVideoFailureRetryPlan","buildVideoFailureWorkflowFix","buildVideoFailureHandoff","buildVideoFailureRecoverySummary","summarizeVideoFailureRecovery") `
  -PlainEnglish @("Video recovery","When a render fails or looks wrong, follow a safe next step.","Find recovery step","missing model","out of memory","bad prompt","Copy retry plan allowed","No automatic retry") `
  -ExtraRoutes @("/video-review","/video-artifacts","/video-compare","/comfyui-workflows/safety")
