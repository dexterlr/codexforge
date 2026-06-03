param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$Interactive,
  [switch]$ContinueOnMissingOptional,
  [switch]$StopOnFirstFailure
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
# Name = "Local Project Reader"; Path = "smoke-codexforge-local-project-reader.ps1"
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
# Name = "Memory Promotion Gate"; Path = "smoke-codexforge-memory-promotion-gate.ps1"
# Name = "Memory Persistence"; Path = "smoke-codexforge-memory-persistence.ps1"
# Name = "Mission Control"; Path = "smoke-codexforge-mission-control.ps1"
# Name = "Predictive context"; Path = "smoke-codexforge-predictive-context.ps1"
# Name = "Predictive context UX"; Path = "smoke-codexforge-predictive-context-ux.ps1"
# Name = "Model router"; Path = "smoke-codexforge-model-router.ps1"
# Name = "AI Router"; Path = "smoke-codexforge-ai-router.ps1"
# Name = "Brand cleanup"; Path = "smoke-codexforge-brand-clean.ps1"

Invoke-CodexForgeSmokeGroup -GroupName "All Suites" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Interactive:$Interactive -ContinueOnMissingOptional:$ContinueOnMissingOptional -StopOnFirstFailure:$StopOnFirstFailure -Scripts @(
  @{ Name = "Core"; File = "smoke-codexforge-core.ps1"; Required = $true },
  @{ Name = "UI"; File = "smoke-codexforge-ui.ps1"; Required = $true },
  @{ Name = "Operator Home Dashboard"; File = "smoke-codexforge-operator-home-dashboard.ps1"; Required = $true },
  @{ Name = "Navigation Shell"; File = "smoke-codexforge-navigation-shell.ps1"; Required = $true },
  @{ Name = "Home Grade Unified Shell"; File = "smoke-codexforge-home-grade-unified-shell.ps1"; Required = $true },
  @{ Name = "Command UI Simplification"; File = "smoke-codexforge-command-ui-simplification.ps1"; Required = $true },
  @{ Name = "UX Unification"; File = "smoke-codexforge-ux-unification.ps1"; Required = $true },
  @{ Name = "UX Layout Rescue"; File = "smoke-codexforge-ux-layout-rescue.ps1"; Required = $true },
  @{ Name = "Focus Mode UX"; File = "smoke-codexforge-focus-mode-ux.ps1"; Required = $true },
  @{ Name = "Product Simplification"; File = "smoke-codexforge-product-simplification.ps1"; Required = $true },
  @{ Name = "Workflow Wizard"; File = "smoke-codexforge-workflow-wizard.ps1"; Required = $true },
  @{ Name = "Real Coding Flow"; File = "smoke-codexforge-real-coding-flow.ps1"; Required = $true },
  @{ Name = "Coding Flow Live Trial"; File = "smoke-codexforge-coding-flow-live-trial.ps1"; Required = $true },
  @{ Name = "Coding Flow Trial Review"; File = "smoke-codexforge-coding-flow-trial-review.ps1"; Required = $true },
  @{ Name = "Coding Flow UX Fix"; File = "smoke-codexforge-coding-flow-ux-fix.ps1"; Required = $true },
  @{ Name = "Apply Validation Hardening"; File = "smoke-codexforge-apply-validation-hardening.ps1"; Required = $true },
  @{ Name = "Real Apply Guard Review"; File = "smoke-codexforge-real-apply-guard-review.ps1"; Required = $true },
  @{ Name = "Guarded Apply Candidate"; File = "smoke-codexforge-guarded-apply-candidate.ps1"; Required = $true },
  @{ Name = "Guarded Apply MVP"; File = "smoke-codexforge-guarded-apply-mvp.ps1"; Required = $true },
  @{ Name = "Apply Evidence Capture MVP"; File = "smoke-codexforge-apply-evidence-capture-mvp.ps1"; Required = $true },
  @{ Name = "Validation Result Capture MVP"; File = "smoke-codexforge-validation-result-capture-mvp.ps1"; Required = $true },
  @{ Name = "Coding Flow Live Run MVP"; File = "smoke-codexforge-coding-flow-live-run-mvp.ps1"; Required = $true },
  @{ Name = "Coding Flow MVP Release Audit"; File = "smoke-codexforge-coding-flow-mvp-release-audit.ps1"; Required = $true },
  @{ Name = "Full System Quality Audit"; File = "smoke-codexforge-full-system-quality-audit.ps1"; Required = $true },
  @{ Name = "Coding Flow Live Manual Trial"; File = "smoke-codexforge-coding-flow-live-manual-trial.ps1"; Required = $true },
  @{ Name = "Trial Friction Fix Pass"; File = "smoke-codexforge-trial-friction-fix-pass.ps1"; Required = $true },
  @{ Name = "MVP Working Path Lock"; File = "smoke-codexforge-mvp-working-path-lock.ps1"; Required = $true },
  @{ Name = "Release Readiness Smoke Pack"; File = "smoke-codexforge-release-readiness-smoke-pack.ps1"; Required = $true },
  @{ Name = "Operator Demo Mode"; File = "smoke-codexforge-operator-demo-mode.ps1"; Required = $true },
  @{ Name = "Workflow Result Persistence"; File = "smoke-codexforge-workflow-result-persistence.ps1"; Required = $true },
  @{ Name = "Run History"; File = "smoke-codexforge-run-history.ps1"; Required = $true },
  @{ Name = "Stabilization Command Center"; File = "smoke-codexforge-stabilization-command-center.ps1"; Required = $true },
  @{ Name = "Global Activity Feed"; File = "smoke-codexforge-global-activity-feed.ps1"; Required = $true },
  @{ Name = "Operator Memory Inbox"; File = "smoke-codexforge-operator-memory-inbox.ps1"; Required = $true },
  @{ Name = "Runtime Event Executor"; File = "smoke-codexforge-runtime-event-executor.ps1"; Required = $true },
  @{ Name = "Runtime Event Journal"; File = "smoke-codexforge-runtime-event-journal.ps1"; Required = $true },
  @{ Name = "Runtime Event Replay"; File = "smoke-codexforge-runtime-event-replay.ps1"; Required = $true },
  @{ Name = "Brain Snapshot Manager"; File = "smoke-codexforge-brain-snapshot-manager.ps1"; Required = $true },
  @{ Name = "Snapshot Restore Gate"; File = "smoke-codexforge-snapshot-restore-gate.ps1"; Required = $true },
  @{ Name = "Brain Continuity"; File = "smoke-codexforge-brain-continuity.ps1"; Required = $true },
  @{ Name = "Continuity Handoff"; File = "smoke-codexforge-continuity-handoff.ps1"; Required = $true },
  @{ Name = "Product Readiness Audit"; File = "smoke-codexforge-product-readiness-audit.ps1"; Required = $true },
  @{ Name = "Consolidation Pass"; File = "smoke-codexforge-consolidation-pass.ps1"; Required = $true },
  @{ Name = "Repo Hygiene"; File = "smoke-codexforge-repo-hygiene.ps1"; Required = $true },
  @{ Name = "Real Patch Preview"; File = "smoke-codexforge-real-patch-preview.ps1"; Required = $true },
  @{ Name = "Approved Patch Apply"; File = "smoke-codexforge-approved-patch-apply.ps1"; Required = $true },
  @{ Name = "Validation Runner"; File = "smoke-codexforge-validation-runner.ps1"; Required = $true },
  @{ Name = "Brain Mutation Governance"; File = "smoke-codexforge-brain-mutation-governance.ps1"; Required = $true },
  @{ Name = "Command Palette"; File = "smoke-codexforge-command-palette.ps1"; Required = $true },
  @{ Name = "Regression Triage"; File = "smoke-codexforge-regression-triage.ps1"; Required = $true },
  @{ Name = "Regression Fix Queue"; File = "smoke-codexforge-regression-fix-queue.ps1"; Required = $true },
  @{ Name = "Noninteractive Smoke Runner"; File = "smoke-codexforge-noninteractive-smoke-runner.ps1"; Required = $true },
  @{ Name = "Brain Suite"; File = "smoke-codexforge-brain-suite.ps1"; Required = $true },
  @{ Name = "Memory Suite"; File = "smoke-codexforge-memory-suite.ps1"; Required = $true },
  @{ Name = "Files Suite"; File = "smoke-codexforge-files-suite.ps1"; Required = $true },
  @{ Name = "Turbopack Warning Cleanup"; File = "smoke-codexforge-turbopack-warning-cleanup.ps1"; Required = $true },
  @{ Name = "Execution Suite"; File = "smoke-codexforge-execution-suite.ps1"; Required = $true },
  @{ Name = "AI Provider Account Registry"; File = "smoke-codexforge-ai-provider-registry.ps1"; Required = $true },
  @{ Name = "Secure Credential Strategy"; File = "smoke-codexforge-secure-credential-strategy.ps1"; Required = $true },
  @{ Name = "Provider Setup Wizard"; File = "smoke-codexforge-provider-setup-wizard.ps1"; Required = $true },
  @{ Name = "Token Efficiency Router"; File = "smoke-codexforge-token-efficiency-router.ps1"; Required = $true },
  @{ Name = "WebRequest Noninteractive"; File = "smoke-codexforge-webrequest-noninteractive.ps1"; Required = $true },
  @{ Name = "Provider Health Checks"; File = "smoke-codexforge-provider-health-checks.ps1"; Required = $true },
  @{ Name = "Model Capability Matrix"; File = "smoke-codexforge-model-capability-matrix.ps1"; Required = $true },
  @{ Name = "Task Model Router"; File = "smoke-codexforge-task-model-router.ps1"; Required = $true },
  @{ Name = "OpenAI-Compatible Provider Adapter"; File = "smoke-codexforge-openai-compatible-adapter.ps1"; Required = $true },
  @{ Name = "Claude-Compatible Provider Adapter"; File = "smoke-codexforge-claude-compatible-adapter.ps1"; Required = $true },
  @{ Name = "Gemini / DeepSeek Provider Adapters"; File = "smoke-codexforge-gemini-deepseek-adapters.ps1"; Required = $true },
  @{ Name = "Local Model Adapters"; File = "smoke-codexforge-local-model-adapters.ps1"; Required = $true },
  @{ Name = "Local Machine Capability"; File = "smoke-codexforge-local-machine-capability.ps1"; Required = $true },
  @{ Name = "Local Creative Provider Registry"; File = "smoke-codexforge-local-creative-provider-registry.ps1"; Required = $true },
  @{ Name = "ComfyUI Local Health Check"; File = "smoke-codexforge-comfyui-local-health-check.ps1"; Required = $true },
  @{ Name = "ComfyUI Live Health Probe Gate"; File = "smoke-codexforge-comfyui-live-health-probe-gate.ps1"; Required = $true },
  @{ Name = "ComfyUI Metadata Probe"; File = "smoke-codexforge-comfyui-metadata-probe.ps1"; Required = $true },
  @{ Name = "Local Video Workflow Catalog"; File = "smoke-codexforge-local-video-workflow-catalog.ps1"; Required = $true },
  @{ Name = "Video Job Queue Preview"; File = "smoke-codexforge-video-job-queue-preview.ps1"; Required = $true },
  @{ Name = "Video Prompt Builder"; File = "smoke-codexforge-video-prompt-builder.ps1"; Required = $true },
  @{ Name = "Storyboard Planner"; File = "smoke-codexforge-storyboard-planner.ps1"; Required = $true },
  @{ Name = "Keyframe Plan Builder"; File = "smoke-codexforge-keyframe-plan-builder.ps1"; Required = $true },
  @{ Name = "Local Draft Render Review"; File = "smoke-codexforge-local-draft-render-review.ps1"; Required = $true },
  @{ Name = "ComfyUI Workflow Import Preview"; File = "smoke-codexforge-comfyui-workflow-import-preview.ps1"; Required = $true },
  @{ Name = "ComfyUI Workflow Safety Inspector"; File = "smoke-codexforge-comfyui-workflow-safety-inspector.ps1"; Required = $true },
  @{ Name = "ComfyUI Workflow Parameter Mapper"; File = "smoke-codexforge-comfyui-workflow-parameter-mapper.ps1"; Required = $true },
  @{ Name = "ComfyUI Job Package Builder"; File = "smoke-codexforge-comfyui-job-package-builder.ps1"; Required = $true },
  @{ Name = "ComfyUI Workflow Dry Run Contract"; File = "smoke-codexforge-comfyui-workflow-dry-run-contract.ps1"; Required = $true },
  @{ Name = "ComfyUI Approved Submit Boundary"; File = "smoke-codexforge-comfyui-approved-submit-boundary.ps1"; Required = $true },
  @{ Name = "Local Image Generation MVP"; File = "smoke-codexforge-local-image-generation-mvp.ps1"; Required = $true },
  @{ Name = "Local Keyframe Generation MVP"; File = "smoke-codexforge-local-keyframe-generation-mvp.ps1"; Required = $true },
  @{ Name = "Local Video Draft MVP"; File = "smoke-codexforge-local-video-draft-mvp.ps1"; Required = $true },
  @{ Name = "Local Video Artifact Capture MVP"; File = "smoke-codexforge-local-video-artifact-capture-mvp.ps1"; Required = $true },
  @{ Name = "Local Video Artifact Gallery"; File = "smoke-codexforge-local-video-artifact-gallery.ps1"; Required = $true },
  @{ Name = "Video Result Review Inbox"; File = "smoke-codexforge-video-result-review-inbox.ps1"; Required = $true },
  @{ Name = "Creative Prompt Memory"; File = "smoke-codexforge-creative-prompt-memory.ps1"; Required = $true },
  @{ Name = "Style Preset Library"; File = "smoke-codexforge-style-preset-library.ps1"; Required = $true },
  @{ Name = "Character Brand Consistency Kit"; File = "smoke-codexforge-character-brand-consistency-kit.ps1"; Required = $true },
  @{ Name = "Shot Library Reuse System"; File = "smoke-codexforge-shot-library-reuse-system.ps1"; Required = $true },
  @{ Name = "Video Project Workspace"; File = "smoke-codexforge-video-project-workspace.ps1"; Required = $true },
  @{ Name = "Asset Dependency Tracker"; File = "smoke-codexforge-asset-dependency-tracker.ps1"; Required = $true },
  @{ Name = "Render Version History"; File = "smoke-codexforge-render-version-history.ps1"; Required = $true },
  @{ Name = "Video Export Handoff"; File = "smoke-codexforge-video-export-handoff.ps1"; Required = $true },
  @{ Name = "Cloud Video Provider Fallback Registry"; File = "smoke-codexforge-cloud-video-provider-fallback-registry.ps1"; Required = $true },
  @{ Name = "Cloud Final Render Review"; File = "smoke-codexforge-cloud-final-render-review.ps1"; Required = $true },
  @{ Name = "Local vs Cloud Decision Explainer"; File = "smoke-codexforge-local-vs-cloud-decision-explainer.ps1"; Required = $true },
  @{ Name = "Video Generation Safety Audit"; File = "smoke-codexforge-video-generation-safety-audit.ps1"; Required = $true },
  @{ Name = "Real Local ComfyUI Health Probe"; File = "smoke-codexforge-real-local-comfyui-health-probe.ps1"; Required = $true },
  @{ Name = "Real Local ComfyUI Metadata Reader"; File = "smoke-codexforge-real-local-comfyui-metadata-reader.ps1"; Required = $true },
  @{ Name = "Real Workflow Package Validator"; File = "smoke-codexforge-real-workflow-package-validator.ps1"; Required = $true },
  @{ Name = "Real Approved ComfyUI Submit Trial"; File = "smoke-codexforge-real-approved-comfyui-submit-trial.ps1"; Required = $true },
  @{ Name = "Real Local Image Generation Trial"; File = "smoke-codexforge-real-local-image-generation-trial.ps1"; Required = $true },
  @{ Name = "Real Local Keyframe Generation Trial"; File = "smoke-codexforge-real-local-keyframe-generation-trial.ps1"; Required = $true },
  @{ Name = "Real Local Video Draft Trial"; File = "smoke-codexforge-real-local-video-draft-trial.ps1"; Required = $true },
  @{ Name = "Real Local Output Artifact Capture"; File = "smoke-codexforge-real-local-output-artifact-capture.ps1"; Required = $true },
  @{ Name = "Video Failure Recovery Flow"; File = "smoke-codexforge-video-failure-recovery-flow.ps1"; Required = $true },
  @{ Name = "Video Draft Comparison Mode"; File = "smoke-codexforge-video-draft-comparison-mode.ps1"; Required = $true },
  @{ Name = "Local Upscale Workflow Planner"; File = "smoke-codexforge-local-upscale-workflow-planner.ps1"; Required = $true },
  @{ Name = "Frame Interpolation Workflow Planner"; File = "smoke-codexforge-frame-interpolation-workflow-planner.ps1"; Required = $true },
  @{ Name = "Video Finishing Pipeline"; File = "smoke-codexforge-video-finishing-pipeline.ps1"; Required = $true },
  @{ Name = "Local Draft to Final Render Pipeline"; File = "smoke-codexforge-local-draft-to-final-render-pipeline.ps1"; Required = $true },
  @{ Name = "Creative Cost Saver Router"; File = "smoke-codexforge-creative-cost-saver-router.ps1"; Required = $true },
  @{ Name = "Local GPU Job Scheduler Preview"; File = "smoke-codexforge-local-gpu-job-scheduler-preview.ps1"; Required = $true },
  @{ Name = "Dual-GPU Worker Strategy"; File = "smoke-codexforge-dual-gpu-worker-strategy.ps1"; Required = $true },
  @{ Name = "Local Render Queue Controls"; File = "smoke-codexforge-local-render-queue-controls.ps1"; Required = $true },
  @{ Name = "Local Render Queue Persistence"; File = "smoke-codexforge-local-render-queue-persistence.ps1"; Required = $true },
  @{ Name = "Render Job Status Polling"; File = "smoke-codexforge-render-job-status-polling.ps1"; Required = $true },
  @{ Name = "Render Job Control Boundary"; File = "smoke-codexforge-render-job-control-boundary.ps1"; Required = $true },
  @{ Name = "Render Queue Recovery and Retry"; File = "smoke-codexforge-render-queue-recovery-retry.ps1"; Required = $true },
  @{ Name = "Local Video Preview Player"; File = "smoke-codexforge-local-video-preview-player.ps1"; Required = $true },
  @{ Name = "Artifact Thumbnail Generator"; File = "smoke-codexforge-artifact-thumbnail-generator.ps1"; Required = $true },
  @{ Name = "Draft Side-by-Side Playback Review"; File = "smoke-codexforge-draft-side-by-side-playback-review.ps1"; Required = $true },
  @{ Name = "Export Package Builder MVP"; File = "smoke-codexforge-export-package-builder-mvp.ps1"; Required = $true },
  @{ Name = "ComfyUI Workflow Library"; File = "smoke-codexforge-comfyui-workflow-library.ps1"; Required = $true },
  @{ Name = "Workflow Template Import Shelf"; File = "smoke-codexforge-workflow-template-import-shelf.ps1"; Required = $true },
  @{ Name = "Workflow Compatibility Checker"; File = "smoke-codexforge-workflow-compatibility-checker.ps1"; Required = $true },
  @{ Name = "Missing Model / Node Resolver"; File = "smoke-codexforge-missing-model-node-resolver.ps1"; Required = $true },
  @{ Name = "Local Model Manager"; File = "smoke-codexforge-local-model-manager.ps1"; Required = $true },
  @{ Name = "Ollama Model Pull/Status Planner"; File = "smoke-codexforge-ollama-model-pull-status-planner.ps1"; Required = $true },
  @{ Name = "LM Studio Runtime Planner"; File = "smoke-codexforge-lm-studio-runtime-planner.ps1"; Required = $true },
  @{ Name = "Local LLM Prompt Assistant for Creative Work"; File = "smoke-codexforge-local-llm-creative-assistant.ps1"; Required = $true },
  @{ Name = "Safe Env-Key Detection"; File = "smoke-codexforge-safe-env-key-detection.ps1"; Required = $true },
  @{ Name = "Local Provider Probe Preview"; File = "smoke-codexforge-local-provider-probe-preview.ps1"; Required = $true },
  @{ Name = "Provider Connection Test UX"; File = "smoke-codexforge-provider-connection-test-ux.ps1"; Required = $true },
  @{ Name = "Artifacts Suite"; File = "smoke-codexforge-artifacts-suite.ps1"; Required = $true },
  @{ Name = "Creative Suite"; File = "smoke-codexforge-creative-suite.ps1"; Required = $true },
  @{ Name = "Creative Local Bridge"; File = "smoke-codexforge-creative-local-bridge.ps1"; Required = $true },
  @{ Name = "Local Bridge Health"; File = "smoke-codexforge-local-bridge-health.ps1"; Required = $true },
  @{ Name = "Future Guarded Health Probe"; File = "smoke-codexforge-future-guarded-health-probe.ps1"; Required = $true },
  @{ Name = "Real Creative Executor MVP Design"; File = "smoke-codexforge-real-creative-executor-mvp.ps1"; Required = $true },
  @{ Name = "Creative Execution Sandbox"; File = "smoke-codexforge-creative-execution-sandbox.ps1"; Required = $true },
  @{ Name = "Real Creative Executor Readiness"; File = "smoke-codexforge-real-creative-executor-readiness.ps1"; Required = $true },
  @{ Name = "Video Render Job Preview"; File = "smoke-codexforge-video-render-job-preview.ps1"; Required = $true },
  @{ Name = "Guarded Creative Executor"; File = "smoke-codexforge-guarded-creative-executor.ps1"; Required = $true },
  @{ Name = "Blender Adapter Preview"; File = "smoke-codexforge-blender-adapter-preview.ps1"; Required = $true },
  @{ Name = "Unreal Adapter Preview"; File = "smoke-codexforge-unreal-adapter-preview.ps1"; Required = $true },
  @{ Name = "ComfyUI Adapter Preview"; File = "smoke-codexforge-comfyui-adapter-preview.ps1"; Required = $true },
  @{ Name = "Real Manual MVP Trial"; File = "smoke-codexforge-real-manual-mvp-trial.ps1"; Required = $true },
  @{ Name = "Real Trial Friction Patch"; File = "smoke-codexforge-real-trial-friction-patch.ps1"; Required = $true },
  @{ Name = "Guarded Apply MVP Hardening"; File = "smoke-codexforge-guarded-apply-mvp-hardening.ps1"; Required = $true },
  @{ Name = "Manual Product Trial"; File = "smoke-codexforge-manual-product-trial.ps1"; Required = $true },
  @{ Name = "First Guarded Apply Trial Hardening"; File = "smoke-codexforge-first-guarded-apply-trial-hardening.ps1"; Required = $true },
  @{ Name = "Operator Runbook"; File = "smoke-codexforge-operator-runbook.ps1"; Required = $true },
  @{ Name = "MVP Experience Lock"; File = "smoke-codexforge-mvp-experience-lock.ps1"; Required = $true },
  @{ Name = "Assisted Coding Mode"; File = "smoke-codexforge-assisted-coding-mode.ps1"; Required = $true },
  @{ Name = "Result Review Inbox"; File = "smoke-codexforge-result-review-inbox.ps1"; Required = $true },
  @{ Name = "Guided Recovery Flow"; File = "smoke-codexforge-guided-recovery-flow.ps1"; Required = $true },
  @{ Name = "MVP Onboarding"; File = "smoke-codexforge-mvp-onboarding.ps1"; Required = $true },
  @{ Name = "Novice First Task"; File = "smoke-codexforge-novice-first-task.ps1"; Required = $true },
  @{ Name = "Plain-English Safety Coach"; File = "smoke-codexforge-plain-english-safety-coach.ps1"; Required = $true },
  @{ Name = "Smart Empty States"; File = "smoke-codexforge-smart-empty-states.ps1"; Required = $true },
  @{ Name = "Assisted MVP Quality Sweep"; File = "smoke-codexforge-assisted-mvp-quality-sweep.ps1"; Required = $true },
  @{ Name = "Validation Capture Hardening"; File = "smoke-codexforge-validation-capture-hardening.ps1"; Required = $true },
  @{ Name = "First Successful Coding Run"; File = "smoke-codexforge-first-successful-coding-run.ps1"; Required = $true },
  @{ Name = "Coding MVP Release Candidate"; File = "smoke-codexforge-coding-mvp-release-candidate.ps1"; Required = $true },
  @{ Name = "MVP Polish Demo Final"; File = "smoke-codexforge-mvp-polish-demo-final.ps1"; Required = $true }
)
