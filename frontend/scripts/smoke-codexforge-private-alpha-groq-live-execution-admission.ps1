param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing $Message`: $Needle"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  if ([regex]::IsMatch($Haystack, $Pattern)) {
    throw "[FAIL] Unexpected $Message with pattern $Pattern"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NoGitDiff {
  param([string]$Path, [string]$Message)
  $diff = ((& git -c core.safecrlf=false diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

Write-Host ""
Write-Host "=== CodexForge Private Alpha Groq live execution admission smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\groq-provider\groq-provider-types.ts",
  "src\lib\codexforge\groq-provider\groq-provider-live-execution-acceptance.ts",
  "src\lib\codexforge\groq-provider\groq-provider-qualification.ts",
  "src\lib\codexforge\groq-provider\index.ts",
  "src\lib\codexforge\model-routing\model-routing-catalog.ts",
  "src\lib\codexforge\model-routing\model-routing-provider-registry.ts",
  "src\lib\codexforge\model-routing\model-routing-policy.server.ts",
  "docs\codexforge-private-alpha-groq-live-execution-admission-v0.md",
  "scripts\smoke-codexforge-private-alpha-groq-live-execution-admission.ps1"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

Assert-FileExists "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts") 'groq_output_too_large' "Private-alpha store blocks historical Groq executions above the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Private-alpha runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Private-alpha provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts") "approvedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS" "Groq adapter identities enforce the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential resolver remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx") 'groqFreeTierExecutionConfirmation: true' "Jarvis private-alpha UI sends the execution-time Groq Free-tier confirmation"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$acceptanceSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-live-execution-acceptance.ts"
$typesSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-types.ts"
$qualificationSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-qualification.ts"
$catalogSource = Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$providerRegistrySource = Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-provider-registry.ts"
$docSource = Get-Content -Raw "docs\codexforge-private-alpha-groq-live-execution-admission-v0.md"
$metadataSource = ($acceptanceSource, $typesSource, $qualificationSource, $catalogSource) -join "`n"
$admissionRecordSource = ($acceptanceSource, $qualificationSource, $catalogSource) -join "`n"

Assert-Contains $typesSource 'CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION =' "Acceptance version constant exists"
Assert-Contains $typesSource 'CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS = 512 as const;' "Admitted 512-token limit is typed"
Assert-Contains $acceptanceSource 'getCodexForgeGroqLiveExecutionAcceptance' "Acceptance getter exists"
Assert-Contains $qualificationSource 'liveExecutionAcceptance:' "Qualification record links to the typed acceptance record"
Assert-Contains $providerRegistrySource 'CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId' "Registry links to the typed acceptance evidence"
Assert-Contains $docSource 'codexforge-groq-private-alpha-live-execution-20260727-165043' "Documentation records the sanitized acceptance ID"
Assert-Contains $docSource 'no automatic routing' "Documentation records that automatic routing remains disabled"

Assert-NotMatches $metadataSource 'localStorage|sessionStorage|indexedDB' "Admission metadata excludes browser storage"
Assert-NotMatches $metadataSource 'process\.env' "Admission metadata excludes process.env access"
Assert-NotMatches $metadataSource '\bfetch\s*\(' "Admission metadata performs no fetch"
Assert-NotMatches $metadataSource 'https?://|api\.groq|/openai/v1/' "Admission metadata contains no provider endpoint"
Assert-NotMatches $metadataSource 'from\s+["''](?:groq-sdk|openai|axios|@anthropic-ai/sdk|anthropic|@google/genai|google-genai|openrouter)["'']|require\(["''](?:groq-sdk|openai|axios|@anthropic-ai/sdk|anthropic|@google/genai|google-genai|openrouter)["'']\)' "Admission metadata imports no provider SDK"
Assert-NotMatches $metadataSource 'GROQ_API_KEY|Authorization|Bearer |x-groq-request-id|x-ratelimit-|acceptance_token' "Admission metadata excludes credential and header values"
Assert-NotMatches $admissionRecordSource 'outputText|approvedRequestText|normalizedRequestText' "Admission metadata excludes raw prompt and output fields"
Assert-NotMatches $metadataSource '[A-Z]:\\|\\Temp\\|/tmp/' "Admission metadata excludes local path values"
Assert-NotMatches $metadataSource '\b[0-9a-f]{24}\b' "Admission metadata excludes local run IDs"

$nodeScript = @'
"use strict";
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasCode(candidate, code) {
  return candidate.rejectionCodes.includes(code) || candidate.reasonCodes.includes(code);
}

function candidateByKey(decision, modelKey) {
  return decision.candidates.find((candidate) => candidate.modelKey === modelKey);
}

function loadModules(repoRoot) {
  let fetchCallCount = 0;
  global.fetch = async function() {
    fetchCallCount += 1;
    throw new Error("fetch should not run in the Slice L smoke");
  };

  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    return originalLoad.apply(this, arguments);
  };

  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const compileTypeScript = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
      },
      fileName: filename,
    });

    module._compile(transpiled.outputText, filename);
  };

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;

  return {
    getFetchCallCount() {
      return fetchCallCount;
    },
    restore() {
      Module._load = originalLoad;
      Module._resolveFilename = originalResolveFilename;
    },
  };
}

function buildRouteRequest(mode, runtimeSnapshots, manualModelKey, maximumOutputTokens) {
  return {
    taskProfile: "general-text",
    requiredCapabilities: ["text-generation"],
    estimatedInputTokens: 1000,
    maximumOutputTokens,
    candidateModelKeys: null,
    policy: {
      mode,
      privacyRequirement: "cloud-allowed",
      maximumEstimatedCostUsd: 1,
      paidApprovalState: "not-granted",
      manualModelKey: manualModelKey || null,
      paidExecutionAdmission: "request-scoped",
      freeTierConfirmationState: "confirmed-for-request",
    },
    runtimeSnapshots,
  };
}

function main() {
  const repoRoot = process.argv[2];
  const runtime = loadModules(repoRoot);

  try {
    const groqIndex = require(path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "groq-provider",
      "index.ts"
    ));
    const acceptanceModule = require(path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "groq-provider",
      "groq-provider-live-execution-acceptance.ts"
    ));
    const qualificationModule = require(path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "groq-provider",
      "groq-provider-qualification.ts"
    ));
    const modelRoutingIndexModule = require(path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "model-routing",
      "index.ts"
    ));
    const routingModule = require(path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "model-routing",
      "model-routing-policy.server.ts"
    ));

    const acceptance = acceptanceModule.CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE;
    assert(
      groqIndex.CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION ===
        "codexforge-groq-live-execution-acceptance-v1",
      "acceptance version is exact"
    );
    assert(
      acceptance.acceptanceVersion === "codexforge-groq-live-execution-acceptance-v1",
      "canonical acceptance schema is exact"
    );
    assert(
      acceptance.acceptanceId ===
        "codexforge-groq-private-alpha-live-execution-20260727-165043",
      "acceptance ID is exact"
    );
    assert(acceptance.acceptedOn === "2026-07-27", "accepted date is exact");
    assert(
      acceptance.acceptanceCheckpointCommit ===
        "b17311bb5720a5037edd756d91c266eee7ce6947",
      "acceptance checkpoint is exact"
    );
    assert(acceptance.providerId === "groq-cloud", "provider ID is exact");
    assert(
      acceptance.serverMode === "next-start-production",
      "server mode is exact"
    );
    assert(
      acceptance.verificationMode === "read-only-persisted-record-verification",
      "verification mode is exact"
    );
    assert(acceptance.executionAdmissionState === "admitted", "execution admission state is exact");
    assert(acceptance.admittedExecutionEnvelope === "text-only", "execution envelope is text-only");
    assert(
      JSON.stringify(acceptance.requiredOperatorAcknowledgements) ===
        JSON.stringify([
          "explicit-manual-approval",
          "cloud-transfer-acknowledgement",
          "cloud-execution-acknowledgement",
        ]),
      "required operator acknowledgements are exact"
    );
    assert(acceptance.acceptedModels.length === 2, "accepted model count is exact");
    assert(
      new Set(acceptance.acceptedModels.map((record) => record.modelKey)).size === 2,
      "accepted model keys are unique"
    );

    const model20 = acceptance.acceptedModels[0];
    const model120 = acceptance.acceptedModels[1];
    assert(
      model20.modelId === "openai/gpt-oss-20b" &&
        model20.modelKey === "groq-cloud::openai/gpt-oss-20b",
      "20B model identity is exact"
    );
    assert(
      model120.modelId === "openai/gpt-oss-120b" &&
        model120.modelKey === "groq-cloud::openai/gpt-oss-120b",
      "120B model identity is exact"
    );
    assert(
      model20.executionState === "succeeded" &&
        model120.executionState === "succeeded",
      "accepted execution states are exact"
    );
    assert(
      model20.acceptedMaximumOutputTokens === 512 &&
        model120.acceptedMaximumOutputTokens === 512,
      "accepted maximum output tokens are exact"
    );
    assert(
      model20.promptTokens === 107 &&
        model20.outputTokens === 34 &&
        model20.durationMilliseconds === 43.6 &&
        model20.outputSha256 ===
          "7260eac34af33fdbf6c21ad8633820e0ef6152036b2217d8026170b7b8b01553",
      "20B safe metrics are exact"
    );
    assert(
      model120.promptTokens === 107 &&
        model120.outputTokens === 46 &&
        model120.durationMilliseconds === 99.67 &&
        model120.outputSha256 ===
          "015dc137038a67c0055c2702def41ec2b3673d46fe714d80c9f57075f015ac76",
      "120B safe metrics are exact"
    );
    assert(acceptance.manualProviderSelectionUsed === true, "manual provider selection fact is exact");
    assert(acceptance.exactModelSelectionUsed === true, "exact model selection fact is exact");
    assert(acceptance.genericManualApprovalRecorded === true, "manual approval fact is exact");
    assert(acceptance.cloudTransferAcknowledgementRecorded === true, "cloud-transfer acknowledgement fact is exact");
    assert(acceptance.cloudExecutionAcknowledgementRecorded === true, "cloud-execution acknowledgement fact is exact");
    assert(acceptance.exactApprovedPromptsUsed === true, "exact approved prompt fact is exact");
    assert(acceptance.exactProviderModelBindingsPersisted === true, "exact provider-model binding fact is exact");
    assert(acceptance.exactVisibleOutputsAndHashesPersisted === true, "exact output-and-hash fact is exact");
    assert(
      acceptance.successfulAuditSequenceState === "complete-and-ordered",
      "successful audit sequence fact is exact"
    );
    assert(acceptance.persistedErrorState === "none", "persisted error state is exact");
    assert(acceptance.credentialStored === false, "credentialStored is false");
    assert(acceptance.automaticRoutingUsed === false, "automaticRoutingUsed is false");
    assert(acceptance.retryUsed === false, "retryUsed is false");
    assert(acceptance.fallbackUsed === false, "fallbackUsed is false");
    assert(acceptance.modelSubstitutionUsed === false, "modelSubstitutionUsed is false");
    assert(
      acceptance.providerRequestPerformedDuringVerification === false,
      "providerRequestPerformedDuringVerification is false"
    );

    assert(Object.isFrozen(acceptance), "canonical acceptance record is frozen");
    assert(
      Object.isFrozen(acceptance.requiredOperatorAcknowledgements),
      "canonical acceptance acknowledgements are frozen"
    );
    assert(Object.isFrozen(acceptance.acceptedModels), "canonical accepted-model list is frozen");
    assert(Object.isFrozen(acceptance.acceptedModels[0]), "canonical accepted-model records are frozen");

    const cloneA = acceptanceModule.getCodexForgeGroqLiveExecutionAcceptance();
    const cloneB = acceptanceModule.getCodexForgeGroqLiveExecutionAcceptance();
    assert(cloneA !== acceptance, "acceptance getter returns a distinct record");
    assert(cloneA !== cloneB, "acceptance getter returns distinct clones");
    assert(cloneA.acceptedModels !== acceptance.acceptedModels, "acceptance getter clones the model list");
    assert(cloneA.acceptedModels[0] !== acceptance.acceptedModels[0], "acceptance getter clones nested model records");
    assert(
      cloneA.requiredOperatorAcknowledgements !== acceptance.requiredOperatorAcknowledgements,
      "acceptance getter clones acknowledgement arrays"
    );

    let cloneMutationBlocked = false;
    try {
      cloneA.acceptedModels[0].outputSha256 = "mutated";
    } catch (error) {
      cloneMutationBlocked = true;
    }
    assert(cloneMutationBlocked === true, "returned acceptance clone resists mutation");
    const freshClone = acceptanceModule.getCodexForgeGroqLiveExecutionAcceptance();
    assert(
      freshClone.acceptedModels[0].outputSha256 ===
        "7260eac34af33fdbf6c21ad8633820e0ef6152036b2217d8026170b7b8b01553",
      "mutating a returned clone cannot change canonical data"
    );

    const serializedAcceptance = JSON.stringify(acceptance);
    assert(!serializedAcceptance.includes("outputText"), "acceptance stores no raw output field");
    assert(!serializedAcceptance.includes("approvedRequestText"), "acceptance stores no raw prompt field");
    assert(!serializedAcceptance.includes("C:\\\\"), "acceptance stores no Windows path");
    assert(!serializedAcceptance.includes("\\\\Temp\\\\"), "acceptance stores no Temp path");
    assert(!serializedAcceptance.match(/\b[0-9a-f]{24}\b/), "acceptance stores no local run ID");
    assert(!serializedAcceptance.includes("GROQ_API_KEY"), "acceptance stores no API key reference");
    assert(!serializedAcceptance.includes("Authorization"), "acceptance stores no authorization header");
    assert(!serializedAcceptance.includes("Bearer "), "acceptance stores no bearer token");
    assert(!serializedAcceptance.includes("acceptance_token"), "acceptance stores no acceptance token");

    const qualification = qualificationModule.CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;
    assert(
      qualification.qualificationVersion === "codexforge-groq-qualification-v3",
      "qualification version is exact"
    );
    assert(
      qualification.providerTransportQualificationState === "live-verified",
      "qualification transport state is exact"
    );
    assert(
      qualification.manualPrivateAlphaExecutionAdmissionState === "admitted",
      "qualification manual admission state is exact"
    );
    assert(
      qualification.productionRoutingState === "mixed" &&
        qualification.automaticRoutingState === "partially-admitted",
      "qualification routing posture is exact"
    );
    assert(
      qualification.liveExecutionAcceptance.acceptanceId === acceptance.acceptanceId &&
        qualification.liveExecutionAcceptance.acceptanceVersion === acceptance.acceptanceVersion &&
        qualification.liveExecutionAcceptance.acceptedOn === acceptance.acceptedOn &&
        qualification.liveExecutionAcceptance.acceptanceCheckpointCommit ===
          acceptance.acceptanceCheckpointCommit,
      "qualification links to the typed acceptance record"
    );
    assert(qualification.paidExecutionEnabled === false, "qualification keeps paid execution disabled");
    assert(qualification.accountTierRevalidationRequired === true, "qualification keeps account-tier revalidation required");
    const qualification20Model = qualification.models.find(
      (model) => model.modelId === "openai/gpt-oss-20b"
    );
    const qualification120Model = qualification.models.find(
      (model) => model.modelId === "openai/gpt-oss-120b"
    );
    assert(Boolean(qualification20Model), "qualification contains the exact 20B model");
    assert(Boolean(qualification120Model), "qualification contains the exact 120B model");
    assert(
      qualification.models.length === 2 &&
        qualification.models.every(
          (model) =>
            model.transportQualificationState === "live-verified" &&
            model.manualPrivateAlphaExecutionAdmissionState === "admitted" &&
            model.admittedExecutionEnvelope === "text-only" &&
            model.admittedMaximumOutputTokens === 512 &&
            model.manualPrivateAlphaExecutionAcceptedOn === "2026-07-27" &&
            model.liveExecutionAcceptanceId === acceptance.acceptanceId
        ),
      "qualification model metadata remains bounded and live-linked"
    );
    assert(
      qualification20Model.routingState === "automatic" &&
        qualification20Model.automaticRoutingState === "admitted-for-free-first",
      "qualification admits automatic free-first routing only for the exact Groq 20B model"
    );
    assert(
      qualification120Model.routingState === "manual-only" &&
        qualification120Model.automaticRoutingState === "disabled",
      "qualification keeps the exact Groq 120B model manual-only"
    );

    const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
    assert(
      modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
        "codexforge-model-routing-v4",
      "catalog version is exact"
    );
    const groqProvider = productionCatalog.providers.find(
      (provider) => provider.providerId === "groq-cloud"
    );
    const localModel = productionCatalog.models.find(
      (model) => model.modelKey === "ollama-local::gpt-oss:20b"
    );
    const groq20CatalogModel = productionCatalog.models.find(
      (model) => model.modelKey === "groq-cloud::openai/gpt-oss-20b"
    );
    const groq120CatalogModel = productionCatalog.models.find(
      (model) => model.modelKey === "groq-cloud::openai/gpt-oss-120b"
    );
    assert(Boolean(groqProvider), "catalog contains the Groq provider");
    assert(Boolean(localModel), "catalog contains the local model");
    assert(Boolean(groq20CatalogModel), "catalog contains the Groq 20B model");
    assert(Boolean(groq120CatalogModel), "catalog contains the Groq 120B model");
    assert(
      groqProvider.notes.includes(
        `Acceptance evidence links to ${acceptance.acceptanceId}.`
      ),
      "catalog provider notes link to the acceptance evidence"
    );
    assert(
      groqProvider.notes.includes(
        `Automatic free-first routing is admitted only for ${groq20CatalogModel.modelKey}.`
      ),
      "catalog provider notes admit automatic free-first routing only for the exact Groq 20B key"
    );
    assert(
      groq20CatalogModel.routingState === "automatic",
      "catalog Groq 20B routing state is automatic"
    );
    assert(
      groq120CatalogModel.routingState === "manual-only",
      "catalog Groq 120B routing state is manual-only"
    );
    for (const groqModel of [groq20CatalogModel, groq120CatalogModel]) {
      assert(groqModel.qualificationState === "live-verified", "catalog Groq qualification state is live-verified");
      assert(
        groqModel.capabilities.length === 1 &&
          groqModel.capabilities[0] === "text-generation",
        "catalog Groq capability is text-generation only"
      );
      assert(
        groqModel.approvedMaximumOutputTokens === 512,
        "catalog Groq admitted output limit is 512"
      );
      assert(
        groqModel.evidence.includes(acceptance.acceptanceId),
        "catalog Groq model evidence links to the acceptance record"
      );
    }

    const runtimeSnapshots = productionCatalog.models.map((model) => ({
      modelKey: model.modelKey,
      availability: "available",
      quotaState: model.providerId === "groq-cloud" ? "available" : "not-applicable",
      observedLatencyMs: 1,
      observedAt: "2026-07-28T00:00:00.000Z",
    }));

    const automaticDecisions = [
      routingModule.routeCodexForgeModel(
        buildRouteRequest("local-only", runtimeSnapshots, null, 512),
        productionCatalog
      ),
      routingModule.routeCodexForgeModel(
        buildRouteRequest("free-only", runtimeSnapshots, null, 512),
        productionCatalog
      ),
      routingModule.routeCodexForgeModel(
        buildRouteRequest("free-first", runtimeSnapshots, null, 512),
        productionCatalog
      ),
      routingModule.routeCodexForgeModel(
        buildRouteRequest("best-within-budget", runtimeSnapshots, null, 512),
        productionCatalog
      ),
    ];
    assert(
      automaticDecisions.every(
        (decision) => decision.selectedModelKey === localModel.modelKey
      ),
      "automatic routing remains local-first while local Ollama is available"
    );

    const noLocalRuntimeSnapshots = productionCatalog.models.map((model) => ({
      modelKey: model.modelKey,
      availability:
        model.modelKey === localModel.modelKey ? "unavailable" : "available",
      quotaState: model.providerId === "groq-cloud" ? "available" : "not-applicable",
      observedLatencyMs: 1,
      observedAt: "2026-07-28T00:00:00.000Z",
    }));
    const freeFirstNoLocalDecision = routingModule.routeCodexForgeModel(
      buildRouteRequest("free-first", noLocalRuntimeSnapshots, null, 512),
      productionCatalog
    );
    assert(
      freeFirstNoLocalDecision.status === "selected" &&
        freeFirstNoLocalDecision.selectedModelKey === groq20CatalogModel.modelKey,
      "automatic free-first routing selects the exact Groq 20B model after affirmative local unavailability"
    );

    const manual512Decision = routingModule.routeCodexForgeModel(
      buildRouteRequest("manual", runtimeSnapshots, groq20CatalogModel.modelKey, 512),
      productionCatalog
    );
    assert(
      manual512Decision.status === "selected" &&
        manual512Decision.selectedModelKey === groq20CatalogModel.modelKey,
      "manual routing admits the exact Groq 20B model at 512 tokens"
    );

    const manual513Decision = routingModule.routeCodexForgeModel(
      buildRouteRequest("manual", runtimeSnapshots, groq20CatalogModel.modelKey, 513),
      productionCatalog
    );
    assert(
      manual513Decision.status === "manual-selection-invalid",
      "manual routing rejects output above the admitted 512-token limit"
    );
    assert(
      hasCode(candidateByKey(manual513Decision, groq20CatalogModel.modelKey), "output-limit-exceeded"),
      "manual routing reports output-limit-exceeded above the admitted 512-token limit"
    );

    assert(runtime.getFetchCallCount() === 0, "slice L smoke performs no fetch or network request");
  } finally {
    runtime.restore();
  }
}

main();
'@

$validationRaw = $nodeScript | & node - $root 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Slice L admission validation failed: $validationRaw"
}

Write-Host "[PASS] CodexForge Private Alpha Groq live execution admission smoke complete."
