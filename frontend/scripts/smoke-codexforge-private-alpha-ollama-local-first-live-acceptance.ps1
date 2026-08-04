param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-NotMatches {
  param([string]$Text, [string]$Pattern, [string]$Message)
  Assert-True (-not [regex]::IsMatch($Text, $Pattern)) $Message
}

function Assert-PowerShellParses {
  param([string]$Path)
  $tokens = $null
  $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile((Join-Path $root $Path), [ref]$tokens, [ref]$errors) | Out-Null
  Assert-True ($errors.Count -eq 0) "PowerShell parses: $Path"
}

Write-Host "=== CodexForge Ollama local-first live acceptance smoke ==="

$sliceRFiles = @(
  "docs/codexforge-exact-installed-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract-v0.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/qualify-codexforge-qwen2-5-coder-32b-installed-candidate.ps1",
  "scripts/run-codexforge-qwen2-5-coder-32b-controlled-live-acceptance.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
)
$macroPhaseCPaths = @(
  "docs/codexforge-macro-phase-c-1-rendered-accessibility-repair.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-command-palette.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts/smoke-codexforge-macro-phase-c-1-rendered-accessibility-repair.ps1",
  "scripts/smoke-codexforge-macro-phase-c-whole-product-hardening.ps1",
  "scripts/smoke-codexforge-openai-compatible-adapter.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "src/app/patch-preview-workbench/page-client.tsx",
  "src/app/provider-adapters/page-client.tsx",
  "src/app/video-assets/page-client.tsx",
  "src/app/video-projects/page-client.tsx",
  "src/lib/codexforge/approved-patch-apply/components/ApprovedPatchApplyPanel.tsx",
  "src/lib/codexforge/asset-dependency-tracker/components/AssetDependencyTrackerPanel.tsx",
  "src/lib/codexforge/command-palette/components/CodexForgeCommandPalette.tsx",
  "src/lib/codexforge/command-palette/components/CommandPaletteOverlay.tsx",
  "src/lib/codexforge/local-project-reader/components/ProjectTreePanel.tsx",
  "src/lib/codexforge/patch-preview-workbench/components/PatchPreviewWorkbenchPanel.tsx",
  "src/lib/codexforge/real-patch-preview/components/PatchChangeRequestPanel.tsx",
  "src/lib/codexforge/validation-runner/components/ValidationRunnerPanel.tsx",
  "src/lib/codexforge/video-foundation-ui.tsx",
  "src/lib/codexforge/video-project-workspace/components/VideoProjectWorkspacePanel.tsx"
)
Assert-True ($macroPhaseCPaths.Count -eq 30) "Historical Macro Phase C.1 source inventory declares exactly thirty files"
Assert-True (@($macroPhaseCPaths | Sort-Object -Unique).Count -eq 30) "Historical Macro Phase C.1 source inventory contains thirty unique files"
Assert-True (@($macroPhaseCPaths | Where-Object { $_ -like "src/lib/codexforge/creator/*" }).Count -eq 0) "Historical Macro Phase C.1 source inventory excludes later creator-owned paths"
foreach ($path in $sliceRFiles) {
  Assert-True (Test-Path -LiteralPath $path -PathType Leaf) "Historical Slice R file remains present: $path"
}
foreach ($path in $macroPhaseCPaths) {
  Assert-True (Test-Path -LiteralPath $path -PathType Leaf) "Historical Macro Phase C.1 source remains present: $path"
}

Assert-PowerShellParses "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1"
$acceptanceSource = Get-Content -Raw "src/lib/codexforge/ollama-provider/ollama-provider-local-first-live-acceptance.ts"
$qualificationSource = Get-Content -Raw "src/lib/codexforge/ollama-provider/ollama-provider-qualification.ts"
$documentSource = Get-Content -Raw "docs/codexforge-private-alpha-ollama-local-first-live-acceptance-v0.md"
$serializedSource = $acceptanceSource + "`n" + $qualificationSource + "`n" + $documentSource
foreach ($forbidden in @("requestText", "normalizedRequestText", "redactedPreview", "approvedRequestText", "outputText", "runId", "approvalScopeHash", "normalizedRequestHash", "GROQ_API_KEY", "Authorization", "Bearer", "provider credentials", "raw provider responses")) {
  Assert-NotMatches $serializedSource ([regex]::Escape($forbidden)) "Serialized source excludes $forbidden"
}
Assert-NotMatches $serializedSource "\b[0-9a-f]{24}\b" "Serialized source excludes 24-character hexadecimal run identifiers"
Assert-NotMatches $serializedSource "[A-Za-z]:\\" "Serialized source excludes Windows drive paths"
Assert-NotMatches $serializedSource "(?i)temp\\|/tmp/" "Serialized source excludes temporary paths"

$aggregateSource = Get-Content -Raw "scripts/smoke-codexforge-all.ps1"
$aggregateExecutableCount = 0
$inCurrentReleaseGateScripts = $false
$newSmokeOccurrences = 0
foreach ($line in Get-Content "scripts/smoke-codexforge-all.ps1") {
  if ($line -eq '$currentReleaseGateScripts = @(') { $inCurrentReleaseGateScripts = $true; continue }
  if ($inCurrentReleaseGateScripts -and $line -eq ')') { $inCurrentReleaseGateScripts = $false }
  if ($inCurrentReleaseGateScripts -and $line -match '^\s*@\{ Name = ".*"; File = .*; Required = \$(?:true|false) \},?$') {
    $aggregateExecutableCount += 1
    if ($line -match 'smoke-codexforge-private-alpha-ollama-local-first-live-acceptance\.ps1' -and $line -match 'Required = \$true') { $newSmokeOccurrences += 1 }
  }
}
Assert-True ($aggregateExecutableCount -eq 74) "Aggregate executable count is 74 after Macro Phase D1 and D2 smoke registration"
Assert-True ($newSmokeOccurrences -eq 1) "New smoke is registered exactly once and is required"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const repoRoot = process.argv[2];
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
let fetchCallCount = 0;
let credentialAccessCount = 0;
global.fetch = function() { fetchCallCount += 1; throw new Error("fetch must not run"); };
const originalEnvironment = process.env;
process.env = new Proxy(originalEnvironment, {
  get(target, property, receiver) {
    if (property === "GROQ_API_KEY") { credentialAccessCount += 1; throw new Error("credential access must not run"); }
    return Reflect.get(target, property, receiver);
  },
});
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }, fileName: filename });
  module._compile(output.outputText, filename);
};
function assert(condition, message) { if (!condition) throw new Error(message); }
function deepFrozen(value) {
  if (value === null || typeof value !== "object") return true;
  if (!Object.isFrozen(value)) return false;
  return Object.keys(value).every((key) => deepFrozen(value[key]));
}
const acceptanceModule = require(path.join(repoRoot, "src/lib/codexforge/ollama-provider/ollama-provider-local-first-live-acceptance.ts"));
const qualificationModule = require(path.join(repoRoot, "src/lib/codexforge/ollama-provider/ollama-provider-qualification.ts"));
const catalogModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/model-routing-catalog.ts"));
const providerRegistryModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/model-routing-provider-registry.ts"));
const acceptance = acceptanceModule.CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE;
assert(acceptance.acceptanceId === "codexforge-ollama-local-private-alpha-local-first-live-acceptance-20260728", "acceptance identity");
assert(acceptance.acceptedOn === "2026-07-28" && acceptance.acceptanceCheckpointCommit === "041a36d39858ee90f7c7bd320f73c4c0e820d8c8", "acceptance date and checkpoint");
assert(acceptance.providerId === "ollama-local" && acceptance.modelId === "gpt-oss:20b" && acceptance.modelKey === "ollama-local::gpt-oss:20b", "provider and model identity");
const lane1 = acceptance.localFirstSelection;
assert(lane1.laneId === "local-first-selection-create-cancel" && lane1.policyVersion === "codexforge-private-alpha-free-first-routing-v1" && lane1.routingMode === "free-first" && lane1.status === "selected-for-approval", "lane 1 selection facts");
assert(lane1.requestMaximumOutputTokens === 512 && lane1.runtimeSnapshotCount === 1 && !lane1.cloudProviderInspected && !lane1.promptTransferredToCloud && !lane1.providerGenerationPerformed, "lane 1 envelope and isolation");
assert(lane1.createHttpStatus === 201 && lane1.createdState === "awaiting_approval" && lane1.finalState === "canceled" && lane1.finalRevision === 2 && !lane1.approvalRecorded && !lane1.executionRecorded && lane1.cancellationRecorded, "lane 1 lifecycle");
assert(JSON.stringify(lane1.orderedAuditEvents) === JSON.stringify(["run.created", "approval.requested", "run.canceled"]), "lane 1 audit order");
const lane2 = acceptance.liveExecution;
assert(lane2.laneId === "manual-approved-local-execution" && lane2.requestMaximumOutputTokens === 64 && lane2.initialCreatedState === "awaiting_approval" && lane2.initialRevision === 1 && lane2.approvedState === "approved" && lane2.approvedRevision === 2 && lane2.finalState === "succeeded" && lane2.finalRevision === 4, "lane 2 lifecycle");
assert(lane2.manualApprovalRecorded && lane2.separateExplicitOperatorExecutionAction && lane2.executionAttemptCount === 1 && lane2.providerGenerationPerformed && lane2.outputLength === 27 && lane2.outputSha256 === "a9d18133e6f4aedfbe07c1fb7c0291f3be3d98d730de2908f5494f1c63fe6db7" && lane2.doneReason === "stop" && lane2.persistedErrorState === "none", "lane 2 execution facts");
assert(!lane2.cloudTransferRequired && !lane2.cloudExecutionAcknowledgementPresent && lane2.groqCredentialMode === "none" && !lane2.paidExecutionPerformed && !lane2.retryPerformed && !lane2.fallbackPerformed && !lane2.modelSubstitutionPerformed, "lane 2 safety facts");
assert(JSON.stringify(lane2.orderedAuditEvents) === JSON.stringify(["run.created", "approval.requested", "approval.granted", "execution.started", "execution.succeeded"]), "lane 2 audit order");
assert(acceptance.acceptanceState === "admitted" && acceptance.localProviderModelAvailabilityConfirmed && acceptance.manualApprovalRemainsRequired && acceptance.executionRequiresSeparateExplicitAction && acceptance.liveLocalGenerationOccurredOnlyInLane2 && !acceptance.cloudProviderRequestOccurred && !acceptance.cloudPromptTransferOccurred && !acceptance.groqCredentialReadOrStored && !acceptance.rawPromptOrOutputStored && !acceptance.providerRequestPerformedDuringSourceAdmission && !acceptance.paidExecution && !acceptance.retryPerformed && !acceptance.fallbackPerformed && !acceptance.modelSubstitutionPerformed, "acceptance safety facts");
assert(deepFrozen(acceptance), "canonical acceptance is deeply frozen");
const firstAcceptanceClone = acceptanceModule.getCodexForgeOllamaLocalFirstLiveAcceptance();
const secondAcceptanceClone = acceptanceModule.getCodexForgeOllamaLocalFirstLiveAcceptance();
assert(firstAcceptanceClone !== acceptance && firstAcceptanceClone !== secondAcceptanceClone && firstAcceptanceClone.localFirstSelection !== acceptance.localFirstSelection && firstAcceptanceClone.liveExecution !== acceptance.liveExecution, "acceptance getter isolates clones");
assert(deepFrozen(firstAcceptanceClone) && deepFrozen(secondAcceptanceClone), "acceptance getter clones are deeply frozen");
try { firstAcceptanceClone.liveExecution.outputLength = 1; } catch (_) {}
assert(acceptanceModule.getCodexForgeOllamaLocalFirstLiveAcceptance().liveExecution.outputLength === 27 && acceptance.liveExecution.outputLength === 27, "clone mutation cannot affect later or canonical reads");
const qualification = qualificationModule.CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION;
assert(qualification.qualificationVersion === "codexforge-ollama-local-qualification-v1" && qualification.transportQualification === "live-verified" && qualification.manualPrivateAlphaExecutionAdmission === "admitted" && qualification.routingState === "automatic" && qualification.automaticAdmissionId === "codexforge-ollama-local-automatic-routing-v1", "qualification identity");
assert(JSON.stringify(qualification.automaticModes) === JSON.stringify(["local-only", "free-only", "free-first", "best-within-budget"]), "qualification automatic modes");
assert(qualification.liveAcceptance.acceptanceId === acceptance.acceptanceId && qualification.liveAcceptance.acceptedOn === acceptance.acceptedOn && qualification.liveAcceptance.acceptanceCheckpointCommit === acceptance.acceptanceCheckpointCommit, "qualification links acceptance");
assert(qualification.model.capability === "text-generation" && qualification.model.dataBoundary === "local-machine" && qualification.model.costClass === "local-no-provider-token-charge" && qualification.model.catalogApprovedMaximumOutputTokens === 4096 && !qualification.model.credentialRequired && !qualification.model.paidExecutionEnabled && !qualification.model.retryAllowed && !qualification.model.fallbackAllowed && !qualification.model.modelSubstitutionAllowed, "qualification model facts");
assert(deepFrozen(qualification), "canonical qualification is deeply frozen");
const firstQualificationClone = qualificationModule.getCodexForgeOllamaLocalProviderQualification();
const secondQualificationClone = qualificationModule.getCodexForgeOllamaLocalProviderQualification();
assert(firstQualificationClone !== qualification && firstQualificationClone !== secondQualificationClone && firstQualificationClone.model !== qualification.model && deepFrozen(firstQualificationClone) && deepFrozen(secondQualificationClone), "qualification getter isolates frozen clones");
try { firstQualificationClone.model.catalogApprovedMaximumOutputTokens = 1; } catch (_) {}
assert(qualificationModule.getCodexForgeOllamaLocalProviderQualification().model.catalogApprovedMaximumOutputTokens === 4096 && qualification.model.catalogApprovedMaximumOutputTokens === 4096, "qualification clone mutation cannot affect later or canonical reads");
const catalog = catalogModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
const local = providerRegistryModule.CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY.flatMap((entry) => entry.models).find((model) => model.modelKey === "ollama-local::gpt-oss:20b");
assert(catalog.catalogVersion === "codexforge-model-routing-v4" && catalog.providers.length === 2 && catalog.models.length === 3, "catalog version and counts");
assert(local && local.approvedMaximumOutputTokens === 4096 && local.routingState === "automatic" && local.qualificationState === "live-verified" && local.automaticRoutingAdmission.admissionId === "codexforge-ollama-local-automatic-routing-v1" && JSON.stringify(local.automaticRoutingAdmission.modes) === JSON.stringify(["local-only", "free-only", "free-first", "best-within-budget"]), "local registry metadata remains exact");
assert(fetchCallCount === 0 && credentialAccessCount === 0, "no provider or credential access");
'@
$tempNodeScript = Join-Path $env:TEMP "codexforge-ollama-local-first-live-acceptance-smoke.js"
Set-Content -LiteralPath $tempNodeScript -Value $nodeScript -Encoding ASCII
try {
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] Node smoke execution failed" }
} finally {
  if (Test-Path -LiteralPath $tempNodeScript) { Remove-Item -LiteralPath $tempNodeScript -Force }
}

Write-Host "[PASS] CodexForge Ollama local-first live acceptance smoke complete."
