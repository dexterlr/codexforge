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
  -PhaseName "Phase 553 CodexForge End-to-End Workflow Release Candidate" `
  -ScriptFile "smoke-codexforge-end-to-end-workflow-release-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-end-to-end-workflow-release-candidate" `
  -Route "src\app\codexforge-end-to-end-workflow-release-candidate" `
  -MainPanel "CodexForgeEndToEndWorkflowReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge End-to-End Workflow Release Candidate" `
  -Modules @("codexforge-end-to-end-workflow-release-candidate-types.ts", "codexforge-end-to-end-workflow-release-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeEndToEndWorkflowReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeEndToEndWorkflowReleaseCandidateStableKey", "buildCodexForgeEndToEndWorkflowReleaseCandidate", "buildCodexForgeEndToEndWorkflowReleaseCandidates", "buildCodexForgeEndToEndWorkflowReleaseCandidateBoundary", "buildCodexForgeEndToEndWorkflowReleaseCandidateModel", "summarizeCodexForgeEndToEndWorkflowReleaseCandidate", "CODEXFORGE_END_TO_END_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge end-to-end workflow release candidate", "CodexForge end-to-end workflow release candidate does not go live", "End-to-end release requires explicit operator approval", "Unresolved end-to-end release blockers stay blocked", "End-to-end release candidate identity", "Workflow plan trial status") `
  -PlainEnglish @("Test execution status", "Evidence/result/recovery/hardening status", "Boundary readiness status", "Denied release candidate actions", "Unresolved release candidate blockers", "Next controlled rollout route", "Checkpoint docs route", "next recommended action") `
  -RouteHref "/codexforge-end-to-end-workflow-release-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 553 end-to-end workflow release candidate smoke passed."
