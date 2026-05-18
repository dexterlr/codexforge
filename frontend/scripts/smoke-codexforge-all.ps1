param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

# Coverage metadata for legacy smoke assertions. The executable suite below runs
# grouped runners only; these entries keep existing smoke scripts able to verify
# their coverage without re-flattening all-smoke.
# Name = "Global Navigation"; Path = "smoke-codexforge-global-navigation.ps1"
# Name = "Header Dedupe"; Path = "smoke-codexforge-header-dedupe.ps1"
# Name = "Product surface UI"; Path = "smoke-codexforge-product-surface-ui.ps1"
# Name = "Product surface planning"; Path = "smoke-codexforge-product-surface-planning.ps1"
# Name = "Tool adapter registry"; Path = "smoke-codexforge-tool-adapter-registry.ps1"
# Name = "Capability bridge"; Path = "smoke-codexforge-capability-bridge.ps1"
# Name = "Capability Cockpit"; Path = "smoke-codexforge-capability-cockpit.ps1"
# Name = "Web research executor"; Path = "smoke-codexforge-web-research.ps1"
# Name = "Self-upgrade backlog"; Path = "smoke-codexforge-self-upgrade.ps1"
# Name = "Self-upgrade console UI"; Path = "smoke-codexforge-self-upgrade-console-ui.ps1"
# Name = "Tool-policy UI"; Path = "smoke-codexforge-tool-policy-ui.ps1"
# Name = "Tool approval retry API"; Path = "smoke-codexforge-tool-approval-retry-api.ps1"
# Name = "Capability routing"; Path = "smoke-codexforge-capability-routing.ps1"
# Name = "Latest-message authority"; Path = "smoke-codexforge-latest-message-authority.ps1"
# Name = "Premium response composer"; Path = "smoke-codexforge-premium-response-composer.ps1"
# Name = "Final response validation"; Path = "smoke-codexforge-final-response-validation.ps1"
# Name = "Domain alignment"; Path = "smoke-codexforge-domain-alignment.ps1"
# Name = "Route override visible meta"; Path = "smoke-codexforge-route-override-visible-meta.ps1"
# Name = "Brain graph UI"; Path = "smoke-codexforge-brain-graph-ui.ps1"
# Name = "Brain Graph 3D Navigation"; Path = "smoke-codexforge-brain-graph-3d-navigation.ps1"
# Name = "Brain Graph Real 3D"; Path = "smoke-codexforge-brain-graph-real-3d.ps1"
# Name = "Brain command center"; Path = "smoke-codexforge-brain-command-center.ps1"
# Name = "Brain command palette"; Path = "smoke-codexforge-brain-command-palette.ps1"
# Name = "Brain layout polish"; Path = "smoke-codexforge-brain-layout-polish.ps1"
# Name = "Brain replay lineage"; Path = "smoke-codexforge-brain-replay-lineage.ps1"
# Name = "Brain semantic topology"; Path = "smoke-codexforge-brain-semantic-topology.ps1"
# Name = "Brain recommendations"; Path = "smoke-codexforge-brain-recommendations.ps1"
# Name = "Brain runtime health dashboard"; Path = "smoke-codexforge-brain-runtime-health-dashboard.ps1"
# Name = "Brain panel data integration"; Path = "smoke-codexforge-brain-panel-data-integration.ps1"
# Name = "Brain quality gates"; Path = "smoke-codexforge-brain-quality-gates.ps1"
# Name = "Brain first-run onboarding"; Path = "smoke-codexforge-brain-first-run-onboarding.ps1"
# Name = "Brain focus drilldown"; Path = "smoke-codexforge-brain-focus-drilldown.ps1"
# Name = "Brain memory ingestion"; Path = "smoke-codexforge-brain-memory-ingestion.ps1"
# Name = "Brain runtime"; Path = "smoke-codexforge-brain-runtime.ps1"
# Name = "Brain Merge"; Path = "smoke-codexforge-brain-merge.ps1"
# Name = "Approved Brain Merge"; Path = "smoke-codexforge-approved-brain-merge.ps1"
# Name = "Brain Recall"; Path = "smoke-codexforge-brain-recall.ps1"
# Name = "Chat Recall Context"; Path = "smoke-codexforge-chat-recall-context.ps1"
# Name = "Task Autopilot"; Path = "smoke-codexforge-task-autopilot.ps1"
# Name = "Reviewed Task Activation"; Path = "smoke-codexforge-task-activation.ps1"
# Name = "Execution Readiness"; Path = "smoke-codexforge-execution-readiness.ps1"
# Name = "Step Runner Preview"; Path = "smoke-codexforge-step-runner-preview.ps1"
# Name = "Read-Only Step Execution"; Path = "smoke-codexforge-read-only-step-execution.ps1"
# Name = "Evidence Memory"; Path = "smoke-codexforge-evidence-memory.ps1"
# Name = "Evidence-Grounded Chat"; Path = "smoke-codexforge-evidence-grounded-chat.ps1"
# Name = "Agent runtime"; Path = "smoke-codexforge-agent-runtime.ps1"
# Name = "Agent runtime UX"; Path = "smoke-codexforge-agent-runtime-ux.ps1"
# Name = "Cognitive memory"; Path = "smoke-codexforge-cognitive-memory.ps1"
# Name = "Cognitive memory runtime integration"; Path = "smoke-codexforge-cognitive-memory-runtime-integration.ps1"
# Name = "Files UX"; Path = "smoke-codexforge-files-ux.ps1"
# Name = "Files runtime"; Path = "smoke-codexforge-files-runtime.ps1"
# Name = "Files Command Center"; Path = "smoke-codexforge-files-command-center.ps1"
# Name = "File workflow"; Path = "smoke-codexforge-file-workflow.ps1"
# Name = "File Brain Chat workflow"; Path = "smoke-codexforge-file-brain-chat-workflow.ps1"
# Name = "Patch Preview"; Path = "smoke-codexforge-patch-preview.ps1"
# Name = "Patch Preview Queue"; Path = "smoke-codexforge-patch-preview-queue.ps1"
# Name = "Preview Diff Composer"; Path = "smoke-codexforge-preview-diff-composer.ps1"
# Name = "Patch Application Gate"; Path = "smoke-codexforge-patch-application-gate.ps1"
# Name = "Apply-Diff Dry Run"; Path = "smoke-codexforge-apply-diff-dry-run.ps1"
# Name = "Apply-Diff Execution Gate"; Path = "smoke-codexforge-apply-diff-execution-gate.ps1"
# Name = "Apply Evidence Pack"; Path = "smoke-codexforge-apply-evidence-pack.ps1"
# Name = "Grounded Fix Recommendation"; Path = "smoke-codexforge-grounded-fix-recommendation.ps1"
# Name = "Creative Production Studio"; Path = "smoke-codexforge-creative-production-studio.ps1"
# Name = "Operator Run Center"; Path = "smoke-codexforge-operator-run-center.ps1"
# Name = "Local Bridge"; Path = "smoke-codexforge-local-bridge.ps1"
# Name = "Artifact Executor"; Path = "smoke-codexforge-artifact-executor.ps1"
# Name = "Artifact Workspace"; Path = "smoke-codexforge-artifact-workspace.ps1"
# Name = "Production Pack"; Path = "smoke-codexforge-production-pack.ps1"
# Name = "Artifact Export Flow"; Path = "smoke-codexforge-artifact-export-flow.ps1"
# Name = "Artifact Ingestion"; Path = "smoke-codexforge-artifact-ingestion.ps1"
# Name = "Memory Review"; Path = "smoke-codexforge-memory-review.ps1"
# Name = "Memory Persistence"; Path = "smoke-codexforge-memory-persistence.ps1"
# Name = "Mission Control"; Path = "smoke-codexforge-mission-control.ps1"
# Name = "Predictive context"; Path = "smoke-codexforge-predictive-context.ps1"
# Name = "Predictive context UX"; Path = "smoke-codexforge-predictive-context-ux.ps1"
# Name = "Model router"; Path = "smoke-codexforge-model-router.ps1"
# Name = "Brand cleanup"; Path = "smoke-codexforge-brand-clean.ps1"

Invoke-CodexForgeSmokeGroup -GroupName "All Suites" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Scripts @(
  @{ Name = "Core"; File = "smoke-codexforge-core.ps1"; Required = $true },
  @{ Name = "UI"; File = "smoke-codexforge-ui.ps1"; Required = $true },
  @{ Name = "Operator Home Dashboard"; File = "smoke-codexforge-operator-home-dashboard.ps1"; Required = $true },
  @{ Name = "Stabilization Command Center"; File = "smoke-codexforge-stabilization-command-center.ps1"; Required = $true },
  @{ Name = "Regression Triage"; File = "smoke-codexforge-regression-triage.ps1"; Required = $true },
  @{ Name = "Regression Fix Queue"; File = "smoke-codexforge-regression-fix-queue.ps1"; Required = $true },
  @{ Name = "Brain Suite"; File = "smoke-codexforge-brain-suite.ps1"; Required = $true },
  @{ Name = "Memory Suite"; File = "smoke-codexforge-memory-suite.ps1"; Required = $true },
  @{ Name = "Files Suite"; File = "smoke-codexforge-files-suite.ps1"; Required = $true },
  @{ Name = "Execution Suite"; File = "smoke-codexforge-execution-suite.ps1"; Required = $true },
  @{ Name = "Artifacts Suite"; File = "smoke-codexforge-artifacts-suite.ps1"; Required = $true },
  @{ Name = "Creative Suite"; File = "smoke-codexforge-creative-suite.ps1"; Required = $true }
)
