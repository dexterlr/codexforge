param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Approved Submit Boundary" `
  -ScriptFile "smoke-codexforge-comfyui-approved-submit-boundary.ps1" `
  -Domain "src\lib\codexforge\comfyui-approved-submit-boundary" `
  -Route "src\app\comfyui-submit" `
  -MainPanel "ComfyUiApprovedSubmitBoundaryPanel" `
  -CommandLabel "Go to ComfyUI Submit Boundary" `
  -Modules @("comfyui-submit-boundary-types.ts","submit-boundary-request.ts","submit-boundary-approval.ts","submit-boundary-policy.ts","submit-boundary-safety.ts","submit-boundary-execution-posture.ts","submit-boundary-result.ts","submit-boundary-handoff.ts","submit-boundary-summary.ts","index.ts") `
  -Components @("ComfyUiApprovedSubmitBoundaryPanel.tsx","SubmitBoundaryRequestPanel.tsx","SubmitBoundaryApprovalPanel.tsx","SubmitBoundaryPolicyPanel.tsx","SubmitBoundarySafetyPanel.tsx","SubmitBoundaryExecutionPosturePanel.tsx","SubmitBoundaryResultPanel.tsx","SubmitBoundaryHandoffPanel.tsx","SubmitBoundarySummaryPanel.tsx","SubmitBoundarySafetyStrip.tsx","SubmitBoundaryEmptyState.tsx","index.ts") `
  -Exports @("buildSubmitBoundaryRequest","buildDefaultSubmitBoundaryRequest","buildSubmitBoundaryApproval","buildSubmitBoundaryPolicy","isSubmitBoundaryAllowed","buildSubmitBoundarySafety","buildSubmitBoundaryExecutionPosture","buildSubmitBoundaryResult","buildSubmitBoundaryHandoff","buildSubmitBoundarySummary","summarizeComfyUiSubmitBoundary") `
  -PlainEnglish @("ComfyUI submit boundary","Prepare the approval boundary for a future local workflow submit.","Review submit boundary","live health gate reviewed","metadata reviewed","workflow imported","safety inspected","parameters mapped","job package built","dry run contract passed","render queue preview ready","artifact destination planned","recovery path planned","explicit approval required","no-auto-run default","no secret exposure","no cloud URL","local-only ComfyUI target","preview-only","approved-submit-boundary-prepared","blocked-no-executor","blocked-policy","blocked-missing-approval","future-approved-executor-required","result-supplied","Copy submit packet allowed","Copy safety report allowed","Copy next implementation handoff allowed","execution blocked","no ComfyUI queue submit","no job queue mutation") `
  -ExtraRoutes @("/comfyui-workflows/dry-run","/comfyui-jobs/package","/render-queue","/video-final-render","/video-recovery")
