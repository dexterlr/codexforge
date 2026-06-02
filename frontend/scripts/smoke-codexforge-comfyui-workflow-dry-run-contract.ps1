param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Workflow Dry Run Contract" `
  -ScriptFile "smoke-codexforge-comfyui-workflow-dry-run-contract.ps1" `
  -Domain "src\lib\codexforge\comfyui-workflow-dry-run-contract" `
  -Route "src\app\comfyui-workflows\dry-run" `
  -MainPanel "ComfyUiWorkflowDryRunContractPanel" `
  -CommandLabel "Go to Workflow Dry Run" `
  -Modules @("comfyui-dry-run-types.ts","dry-run-contract.ts","dry-run-check.ts","dry-run-package-review.ts","dry-run-parameter-review.ts","dry-run-artifact-review.ts","dry-run-decision.ts","dry-run-handoff.ts","dry-run-summary.ts","index.ts") `
  -Components @("ComfyUiWorkflowDryRunContractPanel.tsx","DryRunContractPanel.tsx","DryRunCheckPanel.tsx","DryRunPackageReviewPanel.tsx","DryRunParameterReviewPanel.tsx","DryRunArtifactReviewPanel.tsx","DryRunDecisionPanel.tsx","DryRunHandoffPanel.tsx","DryRunSummaryPanel.tsx","DryRunSafetyStrip.tsx","DryRunEmptyState.tsx","index.ts") `
  -Exports @("buildDryRunContract","buildDefaultDryRunContract","buildDryRunCheck","buildDefaultDryRunChecks","buildDryRunPackageReview","buildDryRunParameterReview","buildDryRunArtifactReview","buildDryRunDecision","buildDryRunHandoff","buildDryRunSummary","summarizeComfyUiDryRunContract") `
  -PlainEnglish @("Workflow dry run","Review whether a ComfyUI job is complete before any future submit.","Review dry run","verify package completeness","verify safety checks","verify parameters","verify artifact plan","verify queue plan","verify approval posture","workflow imported","safety inspected","parameters mapped","package built","metadata reviewed","local provider ready or unknown","render queue preview ready","artifact destination planned","recovery path planned","approval required","no-auto-run guarantee","ready-for-approved-submit-review","needs-workflow-import","needs-safety-inspection","needs-parameter-map","needs-metadata-review","needs-artifact-plan","blocked","unknown","Copy dry run report allowed","no ComfyUI queue submit","no job queue mutation") `
  -ExtraRoutes @("/comfyui-jobs/package","/comfyui-metadata","/render-queue","/video-final-render","/comfyui-submit")
