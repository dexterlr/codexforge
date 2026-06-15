param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate",
  "/daily-beta-1-controlled-trial-result-review",
  "/daily-beta-1-controlled-trial-recovery-review",
  "/daily-beta-1-controlled-trial-hardening",
  "/live-backend-boundary-inventory",
  "/provider-execution-boundary-readiness-review",
  "/local-model-execution-boundary-readiness-review",
  "/connector-execution-boundary-readiness-review",
  "/automation-execution-boundary-readiness-review",
  "/file-mutation-boundary-readiness-review",
  "/test-execution-boundary-readiness-review",
  "/unified-execution-boundary-gap-report",
  "/first-approved-provider-execution-trial",
  "/first-approved-local-model-execution-trial",
  "/first-approved-connector-access-trial",
  "/first-approved-automation-dry-run-trial",
  "/first-approved-file-patch-dry-run",
  "/first-approved-test-execution-trial",
  "/first-real-end-to-end-workflow-trial-plan",
  "/first-real-end-to-end-workflow-trial-review",
  "/end-to-end-workflow-evidence-review",
  "/end-to-end-workflow-result-review",
  "/end-to-end-workflow-recovery-review",
  "/end-to-end-workflow-hardening-pass",
  "/codexforge-end-to-end-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 552 End-to-End Workflow Hardening Pass" `
  -ScriptFile "smoke-codexforge-end-to-end-workflow-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\end-to-end-workflow-hardening-pass" `
  -Route "src\app\end-to-end-workflow-hardening-pass" `
  -MainPanel "EndToEndWorkflowHardeningPassPanel" `
  -CommandLabel "Go to End-to-End Workflow Hardening Pass" `
  -Modules @("end-to-end-workflow-hardening-pass-types.ts", "end-to-end-workflow-hardening-pass-summary.ts", "index.ts") `
  -Components @("EndToEndWorkflowHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndWorkflowHardeningPassStableKey", "buildEndToEndWorkflowHardeningPass", "buildEndToEndWorkflowHardeningPasses", "buildEndToEndWorkflowHardeningPassBoundary", "buildEndToEndWorkflowHardeningPassModel", "summarizeEndToEndWorkflowHardeningPass", "END_TO_END_WORKFLOW_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("End-to-end workflow hardening pass", "End-to-end workflow hardening pass does not apply changes", "Hardening changes require explicit operator approval", "Unresolved hardening blockers stay blocked", "Hardening groups", "Boundary readiness status") `
  -PlainEnglish @("End-to-end workflow hardening identity", "Trial/evidence/result/recovery status", "Release candidate readiness checklist", "Denied hardening actions", "Unresolved hardening blockers", "Release candidate route", "Unified execution gap report route", "next recommended action") `
  -RouteHref "/end-to-end-workflow-hardening-pass" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 552 end-to-end workflow hardening pass smoke passed."
