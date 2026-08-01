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

function Assert-PowerShellParses {
  param([string]$Path)
  $tokens = $null
  $parseErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $Path),
    [ref]$tokens,
    [ref]$parseErrors
  ) | Out-Null
  Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $Path"
}

function Get-Text {
  param([string]$Path)
  return Get-Content -Raw -LiteralPath (Join-Path $root $Path)
}

function Get-Window {
  param(
    [string]$Text,
    [string]$Marker,
    [int]$Length
  )

  $index = $Text.IndexOf($Marker)
  if ($index -lt 0) {
    return ""
  }

  $maxLength = [Math]::Min($Length, $Text.Length - $index)
  return $Text.Substring($index, $maxLength)
}

Write-Host ""
Write-Host "=== CodexForge Private Alpha free-first automatic routing policy integration smoke ==="

$requiredFiles = @(
  "docs\codexforge-private-alpha-free-first-automatic-routing-policy-integration-v0.md",
  "scripts\smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "src\app\api\codexforge\private-alpha\routing\free-first\route.ts",
  "src\lib\codexforge\groq-provider\groq-provider-automatic-routing-admission.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\lib\codexforge\private-alpha\private-alpha-free-first-routing-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-free-first-routing.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\model-routing\model-routing-types.ts",
  "src\lib\codexforge\model-routing\model-routing-catalog.ts",
  "src\lib\codexforge\model-routing\model-routing-policy.server.ts",
  "src\lib\codexforge\groq-provider\groq-provider-types.ts",
  "src\lib\codexforge\groq-provider\groq-provider-qualification.ts",
  "src\lib\codexforge\groq-provider\groq-provider-live-execution-acceptance.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css",
  "scripts\smoke-codexforge-all.ps1"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

Assert-PowerShellParses "scripts\smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1"

$acceptancePath = "src\lib\codexforge\groq-provider\groq-provider-live-execution-acceptance.ts"
$privateAlphaIndexPath = "src\lib\codexforge\private-alpha\index.ts"
$routingTypesPath = "src\lib\codexforge\private-alpha\private-alpha-free-first-routing-types.ts"
$routingServerPath = "src\lib\codexforge\private-alpha\private-alpha-free-first-routing.server.ts"
$routingRoutePath = "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
$apiClientPath = "src\lib\codexforge\private-alpha\private-alpha-api-client.ts"
$panelPath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$cssPath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$groqClientPath = "src\lib\codexforge\groq-provider\groq-provider-client.server.ts"
$groqQualificationPath = "src\lib\codexforge\groq-provider\groq-provider-qualification.ts"
$catalogPath = "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$aggregatePath = "scripts\smoke-codexforge-all.ps1"

$acceptanceSource = Get-Text $acceptancePath
$privateAlphaIndexSource = Get-Text $privateAlphaIndexPath
$routingTypesSource = Get-Text $routingTypesPath
$routingServerSource = Get-Text $routingServerPath
$routingRouteSource = Get-Text $routingRoutePath
$apiClientSource = Get-Text $apiClientPath
$panelSource = Get-Text $panelPath
$cssSource = Get-Text $cssPath
$groqClientSource = Get-Text $groqClientPath
$groqQualificationSource = Get-Text $groqQualificationPath
$catalogSource = Get-Text $catalogPath
$providerRegistrySource = Get-Text "src\lib\codexforge\model-routing\model-routing-provider-registry.ts"
$aggregateSource = Get-Text $aggregatePath
$routeWindow = Get-Window $panelSource 'const routingResult = await routePrivateAlphaFreeFirst({' 700
$automaticGuardWindow = Get-Window $panelSource 'if (!isPrivateAlphaFreeFirstRoutingResultSafeForCreate(routingResult)) {' 400
$automaticCreateWindow = Get-Window $panelSource 'const result = await createPrivateAlphaRun({' 900
$automaticTargetWindow = Get-Window $panelSource 'function resolveAutomaticSelectedTarget(' 400
$panelGuardIndex = $panelSource.IndexOf('if (!isPrivateAlphaFreeFirstRoutingResultSafeForCreate(routingResult)) {')
$panelCreateIndex = $panelSource.IndexOf('const result = await createPrivateAlphaRun({')
$aggregateExecutableCount = 0
$countCurrentReleaseGateEntries = $false
foreach ($line in Get-Content -LiteralPath (Join-Path $root $aggregatePath)) {
  if ($line -eq '$currentReleaseGateScripts = @(') {
    $countCurrentReleaseGateEntries = $true
    continue
  }

  if ($countCurrentReleaseGateEntries -and $line -eq ')') {
    break
  }

  if (
    $countCurrentReleaseGateEntries -and
    $line -match '^\s*@\{ Name = ".*"; File = .*; Required = \$(?:true|false) \},?$'
  ) {
    $aggregateExecutableCount += 1
  }
}

Assert-NoGitDiff $acceptancePath "Historical live-execution acceptance file remains unchanged"
Assert-Contains $acceptanceSource 'automaticRoutingUsed: false' "Historical live acceptance still records automaticRoutingUsed: false"

Assert-Contains $routingServerSource 'import "server-only";' "Routing orchestrator is server-only"
Assert-Contains $routingRouteSource 'routePrivateAlphaFreeFirst' "Routing API route imports the free-first server orchestrator"
Assert-Contains $routingTypesSource 'PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION =' "Routing types define the exact Slice M policy version"
Assert-Contains $routingTypesSource 'PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS = [' "Routing types define the exact automatic candidate allowlist"
Assert-Contains $routingTypesSource 'export function isPrivateAlphaFreeFirstRoutingResultSafeForCreate(' "Routing types export the create-safety result guard"
Assert-Contains $routingTypesSource 'cloudRouting.metadataProbeAcknowledgement must be exactly true when cloud routing is allowed.' "Routing validator requires exact metadata-probe acknowledgement"
Assert-Contains $routingTypesSource 'cloudRouting.freeTierConfirmation must be exactly true when cloud routing is allowed.' "Routing validator requires exact Free-tier confirmation"
Assert-Contains $privateAlphaIndexSource 'isPrivateAlphaFreeFirstRoutingResultSafeForCreate,' "Private-alpha index re-exports the create-safety result guard"
Assert-NotMatches $routingServerSource 'createPrivateAlphaStore|createRun\(|approveRun\(|executeRun\(|generateApprovedText|writeJsonFileAtomically|mkdir|writeFile|appendFile|\.codexforge/private-alpha' "Routing orchestrator performs no persistence or generation work"
Assert-NotMatches $routingRouteSource 'createPrivateAlphaStore|createRun\(|approveRun\(|executeRun\(|generateApprovedText|\.codexforge/private-alpha' "Routing API route performs no persistence or generation work"
Assert-Contains $routingRouteSource 'return NextResponse.json({ ok: true, result });' "Routing API route returns HTTP 200 with the safe result payload"
Assert-Contains $routingRouteSource 'return failure(400, "Invalid JSON payload.");' "Routing API route keeps malformed JSON on HTTP 400"
Assert-Contains $routingRouteSource 'return failure(error.status, error.message);' "Routing API route keeps validated routing failures on HTTP 400"

Assert-Contains $apiClientSource 'kind: "route-free-first"' "API client declares the free-first routing operation"
Assert-Contains $apiClientSource '/routing/free-first' "API client targets the free-first routing endpoint"
Assert-Contains $apiClientSource 'export function routePrivateAlphaFreeFirst(' "API client exports the free-first routing call"

Assert-Contains $panelSource 'data-codexforge-private-alpha-request-mode=' "UI exposes explicit request-mode controls"
Assert-Contains $panelSource 'data-codexforge-private-alpha-automatic-cloud-routing="free-first"' "UI exposes the automatic cloud-routing selector"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-metadata-probe="required"' "UI exposes the metadata-probe acknowledgement"
Assert-Contains $panelSource 'data-codexforge-private-alpha-free-tier-confirmation="required"' "UI exposes the request-scoped routing Free-tier confirmation"
Assert-Contains $panelSource 'data-codexforge-private-alpha-groq-free-tier-execution-confirmation="required"' "UI exposes the execution-time Groq Free-tier confirmation"
Assert-Contains $panelSource 'Route then create approval request' "UI exposes the route-then-create action"
Assert-Contains $panelSource 'routePrivateAlphaFreeFirst({' "UI calls the routing endpoint before automatic create"
Assert-Contains $panelSource 'setAutomaticRoutingResult(routingResult);' "UI preserves routing results for blocked and no-eligible visibility"
Assert-Contains $automaticGuardWindow 'if (!isPrivateAlphaFreeFirstRoutingResultSafeForCreate(routingResult)) {' "UI guards automatic create with the safe-result validator"
Assert-True (($panelGuardIndex -ge 0) -and ($panelCreateIndex -gt $panelGuardIndex)) "PrivateAlphaRunPanel uses the guard before createPrivateAlphaRun"
Assert-NotMatches $routeWindow 'requestText\s*:|modelKey\s*:|modelPreferenceLabel\s*:|candidateModelKeys\s*:|maximumEstimatedCostUsd\s*:|paidApprovalState\s*:|paidExecutionAdmission\s*:|freeTierConfirmationState\s*:' "Routing request payload sends no prompt text, model key, or policy knobs from the browser"
Assert-Contains $automaticCreateWindow 'requestText: capturedDraft.requestText' "Automatic create payload includes the captured request text"
Assert-Contains $automaticCreateWindow 'capability: "text"' "Automatic create payload includes the fixed text capability"
Assert-Contains $automaticCreateWindow 'modelKey: exactTarget.modelKey' "Automatic create payload includes the selected exact model key"
Assert-Contains $automaticCreateWindow 'modelPreferenceLabel: exactTarget.modelLabel' "Automatic create payload derives the exact label from the allowlisted mapping"
Assert-Contains $automaticCreateWindow 'maximumOutputTokens: capturedDraft.maximumOutputTokens' "Automatic create payload includes the captured output-token limit"
Assert-Contains $automaticTargetWindow 'case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:' "Automatic selected-key mapping keeps the exact local case"
Assert-Contains $automaticTargetWindow 'case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:' "Automatic selected-key mapping keeps the exact Groq 20B case"
Assert-NotMatches $automaticTargetWindow 'PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY' "Groq 120B remains outside the automatic selected-key mapping"
Assert-NotMatches $automaticCreateWindow 'routingMode|cloudRouting|candidateModelKeys|maximumEstimatedCostUsd|paidApprovalState|paidExecutionAdmission|freeTierConfirmation|metadataProbeAcknowledgement' "Automatic create payload contains no routing metadata"
Assert-NotMatches $panelSource 'localStorage|sessionStorage|indexedDB|document\.cookie' "UI stores routing state only in React state"
Assert-Contains $panelSource 'groqFreeTierExecutionConfirmation: true' "Groq execute payload includes the execution-time Free-tier confirmation"
Assert-NotMatches $panelSource 'groqFreeTierExecutionConfirmation:\s*undefined' "Local execute payload does not send a Groq Free-tier confirmation"
Assert-Contains $cssSource '.privateAlphaRequestModeGrid' "CSS includes request-mode layout styling"
Assert-Contains $cssSource '.privateAlphaRequestModeSelected' "CSS includes selected request-mode styling"
Assert-NotMatches ($groqClientSource + "`n" + $groqQualificationSource + "`n" + $routingServerSource) 'service_tier' "Slice M introduces no service_tier field"
Assert-NotMatches ($groqClientSource + "`n" + $groqQualificationSource + "`n" + $routingServerSource) '/tiers|tierApi|account-plan|planApi' "Slice M introduces no provider tier endpoint"
Assert-Contains $groqQualificationSource 'request-scoped-operator-confirmation' "Groq qualification records request-scoped operator confirmation"
Assert-Contains $providerRegistrySource 'Automatic routing remains disabled for ${CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.manualOnlyModelKey}.' "Production registry keeps the exact Groq 120B manual-only"
Assert-Contains $aggregateSource 'smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1' "Aggregate smoke suite registers the Slice M smoke"
Assert-True ($aggregateExecutableCount -eq 72) "Aggregate executable count is 72 after Macro Phase C.1 smoke registration"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const Module = require("module");
const ts = require("typescript");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
  console.log(`[PASS] ${message}`);
}

function hasCode(values, expected) {
  return Array.isArray(values) && values.includes(expected);
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeJsonResponse(payload, status, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: Object.assign({ "Content-Type": "application/json" }, headers || {}),
  });
}

async function main() {
  const repoRoot = process.argv[2];
  const testSuffix = process.argv[3];
  let fetchCallCount = 0;
  let groqCredentialReadCount = 0;
  const killSwitchStateByLabel = new Map();
  const killSwitchModulePath = path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-kill-switch.server.ts"
  );
  const groqCredentialModulePath = path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-credential.server.ts"
  );

  global.fetch = async function () {
    fetchCallCount += 1;
    throw new Error("global.fetch must not be reached by the deterministic Slice M smoke");
  };

  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function (request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const originalLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    const resolved = Module._resolveFilename(request, parent, isMain);
    if (resolved === killSwitchModulePath) {
      return {
        async readPrivateAlphaKillSwitchState({ dataRootLabel }) {
          const entry =
            killSwitchStateByLabel.get(dataRootLabel) ||
            { queue: [], fallback: false, reads: 0 };
          entry.reads += 1;
          killSwitchStateByLabel.set(dataRootLabel, entry);
          const engaged =
            entry.queue.length > 0 ? entry.queue.shift() === true : entry.fallback === true;
          return {
            killSwitchEngaged: engaged,
            killSwitchSources: engaged ? ["file"] : [],
          };
        },
      };
    }

    if (resolved === groqCredentialModulePath) {
      return {
        readCodexForgeGroqCredential() {
          groqCredentialReadCount += 1;
          throw new Error("Groq credential resolution was not expected in the deterministic Slice M smoke");
        },
      };
    }

    return originalLoad.apply(this, arguments);
  };

  const compileTypeScript = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
      },
      fileName: filename,
    });

    module._compile(transpiled.outputText, filename);
  };

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;

  const modelRoutingIndex = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "model-routing",
    "index.ts"
  ));
  const modelRoutingPolicy = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "model-routing",
    "model-routing-policy.server.ts"
  ));
  const privateAlpha = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "index.ts"
  ));
  const routingTypes = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-free-first-routing-types.ts"
  ));
  const routingServer = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-free-first-routing.server.ts"
  ));
  const groqQualification = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-qualification.ts"
  ));
  const groqAdmission = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-automatic-routing-admission.ts"
  ));
  const groqAcceptance = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-live-execution-acceptance.ts"
  ));
  const validation = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-validation.ts"
  ));
  const storeModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-store.server.ts"
  ));
  const providerModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-provider.server.ts"
  ));

  assert(
    typeof routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate === "function",
    "Routing types export the create-safety guard at runtime."
  );
  assert(
    privateAlpha.isPrivateAlphaFreeFirstRoutingResultSafeForCreate ===
      routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate,
    "Private-alpha index re-exports the exact create-safety guard."
  );

  function provider(id, locality, catalogState) {
    return {
      providerId: id,
      label: id,
      locality,
      dataBoundary: locality === "local" ? "local-machine" : "cloud-provider",
      catalogState: catalogState || "enabled",
      adapterId: `${id}-adapter`,
      notes: [],
    };
  }

  function pricing(costClass, options) {
    const config = options || {};
    if (costClass === "local-no-provider-token-charge") {
      return {
        costClass,
        currency: "USD",
        inputUsdPerMillionTokens: 0,
        outputUsdPerMillionTokens: 0,
        pricingAsOf: null,
        sourceLabel: "local test",
      };
    }

    if (costClass === "free-tier") {
      return {
        costClass,
        currency: "USD",
        inputUsdPerMillionTokens: 0,
        outputUsdPerMillionTokens: 0,
        pricingAsOf: null,
        sourceLabel: "free test",
      };
    }

    if (costClass === "paid") {
      return {
        costClass,
        currency: "USD",
        inputUsdPerMillionTokens:
          Object.prototype.hasOwnProperty.call(config, "input") ? config.input : 1,
        outputUsdPerMillionTokens:
          Object.prototype.hasOwnProperty.call(config, "output") ? config.output : 1,
        pricingAsOf:
          Object.prototype.hasOwnProperty.call(config, "pricingAsOf")
            ? config.pricingAsOf
            : "2026-07-28",
        sourceLabel: "paid test",
      };
    }

    return {
      costClass,
      currency: "USD",
      inputUsdPerMillionTokens: null,
      outputUsdPerMillionTokens: null,
      pricingAsOf: null,
      sourceLabel: "unknown test",
    };
  }

  function admission(id, modes) {
    return {
      admissionId: id,
      modes: modes.slice(),
    };
  }

  function model(buildKey, input) {
    return {
      modelKey: buildKey(input.providerId, input.modelId),
      providerId: input.providerId,
      modelId: input.modelId,
      label: input.label || input.modelId,
      routingState:
        Object.prototype.hasOwnProperty.call(input, "routingState")
          ? input.routingState
          : "automatic",
      automaticRoutingAdmission:
        Object.prototype.hasOwnProperty.call(input, "automaticRoutingAdmission")
          ? input.automaticRoutingAdmission
          : admission(`${input.modelId}-automatic`, ["free-first"]),
      qualificationState:
        Object.prototype.hasOwnProperty.call(input, "qualificationState")
          ? input.qualificationState
          : "live-verified",
      capabilities:
        Object.prototype.hasOwnProperty.call(input, "capabilities")
          ? input.capabilities
          : ["text-generation"],
      approvedMaximumOutputTokens:
        Object.prototype.hasOwnProperty.call(input, "approvedMaximumOutputTokens")
          ? input.approvedMaximumOutputTokens
          : 512,
      contextWindowTokens:
        Object.prototype.hasOwnProperty.call(input, "contextWindowTokens")
          ? input.contextWindowTokens
          : null,
      pricing:
        Object.prototype.hasOwnProperty.call(input, "pricing")
          ? input.pricing
          : pricing("free-tier"),
      taskProfileScores:
        Object.prototype.hasOwnProperty.call(input, "taskProfileScores")
          ? input.taskProfileScores
          : { "general-text": 50 },
      evidence:
        Object.prototype.hasOwnProperty.call(input, "evidence")
          ? input.evidence
          : ["test evidence"],
    };
  }

  function snapshot(version, providers, models) {
    return {
      catalogVersion: version,
      providers,
      models,
    };
  }

  function runtimeForModels(models, overrides) {
    const overrideMap = overrides || {};
    return models.map((entry) => {
      const override = overrideMap[entry.modelKey] || {};
      const costClass = entry.pricing.costClass;
      const defaultQuotaState = costClass === "free-tier" ? "available" : "not-applicable";
      return {
        modelKey: entry.modelKey,
        availability:
          Object.prototype.hasOwnProperty.call(override, "availability")
            ? override.availability
            : "available",
        quotaState:
          Object.prototype.hasOwnProperty.call(override, "quotaState")
            ? override.quotaState
            : defaultQuotaState,
        observedLatencyMs:
          Object.prototype.hasOwnProperty.call(override, "observedLatencyMs")
            ? override.observedLatencyMs
            : 25,
        observedAt:
          Object.prototype.hasOwnProperty.call(override, "observedAt")
            ? override.observedAt
            : "2026-07-28T00:00:00.000Z",
      };
    });
  }

  function policy(mode, options) {
    const config = options || {};
    return {
      mode,
      privacyRequirement: config.privacyRequirement || "cloud-allowed",
      maximumEstimatedCostUsd:
        Object.prototype.hasOwnProperty.call(config, "maximumEstimatedCostUsd")
          ? config.maximumEstimatedCostUsd
          : 1,
      paidApprovalState: config.paidApprovalState || "granted-for-request",
      paidExecutionAdmission: config.paidExecutionAdmission || "request-scoped",
      freeTierConfirmationState:
        config.freeTierConfirmationState || "confirmed-for-request",
      manualModelKey:
        Object.prototype.hasOwnProperty.call(config, "manualModelKey")
          ? config.manualModelKey
          : null,
    };
  }

  function routeRequest(policyInput, runtimeSnapshots, options) {
    const config = options || {};
    return {
      taskProfile: config.taskProfile || "general-text",
      requiredCapabilities: config.requiredCapabilities || ["text-generation"],
      estimatedInputTokens:
        Object.prototype.hasOwnProperty.call(config, "estimatedInputTokens")
          ? config.estimatedInputTokens
          : 1000,
      maximumOutputTokens:
        Object.prototype.hasOwnProperty.call(config, "maximumOutputTokens")
          ? config.maximumOutputTokens
          : 512,
      candidateModelKeys:
        Object.prototype.hasOwnProperty.call(config, "candidateModelKeys")
          ? config.candidateModelKeys
          : null,
      policy: policyInput,
      runtimeSnapshots,
    };
  }

  function candidateByKey(decision, modelKey) {
    const found = decision.candidates.find((candidate) => candidate.modelKey === modelKey);
    assert(Boolean(found), `missing candidate ${modelKey}`);
    return found;
  }

  function resolveAutomaticSelectedTarget(modelKey) {
    switch (modelKey) {
      case privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
        return {
          modelKey: privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          modelLabel: "gpt-oss:20b",
        };
      case privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
        return {
          modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
          modelLabel: "openai/gpt-oss-20b",
        };
      default:
        throw new Error(`Unexpected automatic selected model key ${modelKey}`);
    }
  }

  function simulateAutomaticCreateHandoff(routingResult, capturedDraft) {
    const observed = {
      preservedRoutingResult: routingResult,
      createHandoffs: [],
      errorMessage: null,
    };

    if (routingResult.status !== "selected-for-approval") {
      return observed;
    }

    if (!routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate(routingResult)) {
      observed.errorMessage = "Automatic routing returned an unsafe selected result.";
      return observed;
    }

    const exactTarget = resolveAutomaticSelectedTarget(routingResult.selectedModelKey);
    observed.createHandoffs.push({
      requestText: capturedDraft.requestText,
      capability: "text",
      modelKey: exactTarget.modelKey,
      modelPreferenceLabel: exactTarget.modelLabel,
      maximumOutputTokens: capturedDraft.maximumOutputTokens,
    });

    return observed;
  }

  function assertUnsafeAutomaticCreateScenario(result, message) {
    const simulated = simulateAutomaticCreateHandoff(result, {
      requestText: "simulated request",
      maximumOutputTokens: 512,
    });
    assert(
      routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate(result) === false,
      `${message} fails the new create-safety guard.`
    );
    assert(
      simulated.createHandoffs.length === 0,
      `${message} produces zero create handoffs.`
    );
    assert(
      simulated.errorMessage === "Automatic routing returned an unsafe selected result.",
      `${message} yields the bounded unsafe-result error.`
    );
  }

  function buildIdentity(modelKey, approvedMaximumOutputTokens) {
    switch (modelKey) {
      case privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
        return {
          providerId: "ollama-local",
          providerLabel: "Local Ollama",
          modelId: "gpt-oss:20b",
          modelLabel: "gpt-oss:20b",
          modelKey,
          locality: "local",
          dataBoundary: "local-machine",
          costClass: "local-no-provider-token-charge",
          approvedMaximumOutputTokens:
            approvedMaximumOutputTokens === undefined ? 4096 : approvedMaximumOutputTokens,
        };
      case privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
        return {
          providerId: "groq-cloud",
          providerLabel: "Groq Cloud",
          modelId: "openai/gpt-oss-20b",
          modelLabel: "openai/gpt-oss-20b",
          modelKey,
          locality: "cloud",
          dataBoundary: "cloud-provider",
          costClass: "free-tier",
          approvedMaximumOutputTokens:
            approvedMaximumOutputTokens === undefined ? 512 : approvedMaximumOutputTokens,
        };
      case privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
        return {
          providerId: "groq-cloud",
          providerLabel: "Groq Cloud",
          modelId: "openai/gpt-oss-120b",
          modelLabel: "openai/gpt-oss-120b",
          modelKey,
          locality: "cloud",
          dataBoundary: "cloud-provider",
          costClass: "free-tier",
          approvedMaximumOutputTokens:
            approvedMaximumOutputTokens === undefined ? 512 : approvedMaximumOutputTokens,
        };
      default:
        throw new Error(`Unsupported model key ${modelKey}`);
    }
  }

  function buildInspection(modelKey, input) {
    const config = input || {};
    const quotaState =
      Object.prototype.hasOwnProperty.call(config, "quotaState")
        ? config.quotaState
        : modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
          ? "not-applicable"
          : "available";
    const providerAvailable =
      Object.prototype.hasOwnProperty.call(config, "providerAvailable")
        ? config.providerAvailable
        : true;
    const modelAvailable =
      Object.prototype.hasOwnProperty.call(config, "modelAvailable")
        ? config.modelAvailable
        : true;
    return {
      identity: buildIdentity(
        modelKey,
        Object.prototype.hasOwnProperty.call(config, "approvedMaximumOutputTokens")
          ? config.approvedMaximumOutputTokens
          : undefined
      ),
      availability: {
        providerAvailable,
        modelAvailable,
        quotaState,
        errorCode:
          Object.prototype.hasOwnProperty.call(config, "errorCode")
            ? config.errorCode
            : null,
        safeErrorMessage:
          Object.prototype.hasOwnProperty.call(config, "safeErrorMessage")
            ? config.safeErrorMessage
            : null,
      },
      snapshot: {
        modelKey,
        availability:
          Object.prototype.hasOwnProperty.call(config, "availability")
            ? config.availability
            : providerAvailable && modelAvailable
              ? "available"
              : "unavailable",
        quotaState,
        observedLatencyMs:
          Object.prototype.hasOwnProperty.call(config, "observedLatencyMs")
            ? config.observedLatencyMs
            : 25,
        observedAt:
          Object.prototype.hasOwnProperty.call(config, "observedAt")
            ? config.observedAt
            : "2026-07-28T00:00:00.000Z",
      },
    };
  }

  async function expectRoutingError(work, expectedMessagePart) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof routingServer.PrivateAlphaFreeFirstRoutingError,
        "Expected PrivateAlphaFreeFirstRoutingError."
      );
      assert(error.status === 400, "Routing validation preserves HTTP 400.");
      if (expectedMessagePart) {
        assert(
          String(error.message).includes(expectedMessagePart),
          `Routing validation includes ${expectedMessagePart}.`
        );
      }
      return;
    }

    throw new Error("Expected PrivateAlphaFreeFirstRoutingError.");
  }

  async function expectStoreError(work, expectedStatus, expectedMessagePart) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof storeModule.PrivateAlphaStoreError,
        "Expected PrivateAlphaStoreError."
      );
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      if (expectedMessagePart) {
        assert(
          String(error.message).includes(expectedMessagePart),
          `Store error includes ${expectedMessagePart}.`
        );
      }
      return error;
    }

    throw new Error(`Expected PrivateAlphaStoreError status ${expectedStatus}.`);
  }

  function getKillSwitchEntry(label) {
    const entry =
      killSwitchStateByLabel.get(label) || { queue: [], fallback: false, reads: 0 };
    killSwitchStateByLabel.set(label, entry);
    return entry;
  }

  function setKillSwitchSequence(label, sequence, fallback) {
    const entry = getKillSwitchEntry(label);
    entry.queue = sequence.slice();
    entry.fallback = fallback === true;
    entry.reads = 0;
  }

  function toAbsolutePath(relativeLabel) {
    return path.join(repoRoot, ...relativeLabel.split("/"));
  }

  function idKey(label) {
    return `${label}-idempotency-key`;
  }

  async function resetLabel(label) {
    assert(
      label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`),
      "Only test roots may be used."
    );
    await fsp.rm(toAbsolutePath(label), { recursive: true, force: true });
  }

  async function prepareLabel(name) {
    const label = storeModule.buildPrivateAlphaTestingDataRootLabel(
      `${testSuffix}-${name}`
    );
    await resetLabel(label);
    setKillSwitchSequence(label, [], false);
    return label;
  }

  function createStore(label, options) {
    return storeModule.createPrivateAlphaStore({
      dataRootLabel: label,
      providerAdapterResolver:
        options && Object.prototype.hasOwnProperty.call(options, "providerAdapterResolver")
          ? options.providerAdapterResolver
          : undefined,
    });
  }

  function createAdapterHarness(config) {
    let availabilityCalls = 0;
    let generationCalls = 0;
    const generationInputs = [];
    const adapter = {
      identity: config.identity,
      async getAvailability() {
        availabilityCalls += 1;
        if (config.availabilityError) {
          throw config.availabilityError;
        }

        return (
          config.availability || {
            providerAvailable: true,
            modelAvailable: true,
            quotaState:
              config.identity.providerId === "groq-cloud" ? "available" : "not-applicable",
            errorCode: null,
            safeErrorMessage: null,
          }
        );
      },
      async generateApprovedText(input) {
        generationCalls += 1;
        generationInputs.push(input);
        if (typeof config.onGenerate === "function") {
          await config.onGenerate(input);
        }
        if (config.generationError) {
          throw config.generationError;
        }
        return (
          config.generationResult || {
            outputText: "visible output",
            doneReason: "stop",
            totalDurationNanoseconds: 11,
            loadDurationNanoseconds: 1,
            promptEvalCount: 2,
            evalCount: 3,
          }
        );
      },
    };

    return {
      adapter,
      getStats() {
        return {
          availabilityCalls,
          generationCalls,
          generationInputs: generationInputs.slice(),
        };
      },
    };
  }

  async function createApprovedRun(store, modelKey, name, maximumOutputTokens) {
    const boundConfiguration = privateAlpha.resolvePrivateAlphaBoundConfiguration(modelKey);
    const created = await store.createRun(
      {
        requestText: `Request ${name}`,
        capability: "text",
        modelKey,
        modelPreferenceLabel: boundConfiguration.modelPreferenceLabel,
        maximumOutputTokens:
          maximumOutputTokens === undefined ? 512 : maximumOutputTokens,
      },
      `${name}-create-idempotency`
    );
    const approved = await store.approveRun(created.run.runId, {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: created.run.revision,
      ...(boundConfiguration.dataBoundary === "cloud-provider"
        ? { cloudDataTransferAcknowledgement: true }
        : {}),
    });
    return {
      created: created.run,
      approved,
    };
  }

  async function readRunJson(label, runId) {
    return JSON.parse(
      await fsp.readFile(
        path.join(toAbsolutePath(label), "runs", `${runId}.json`),
        "utf8"
      )
    );
  }

  async function writeRunJson(label, run) {
    await fsp.writeFile(
      path.join(toAbsolutePath(label), "runs", `${run.runId}.json`),
      JSON.stringify(run, null, 2),
      "utf8"
    );
  }

  async function runRoutingScenario(config) {
    const inspectCalls = [];
    let killSwitchReads = 0;
    const result = await routingServer.routePrivateAlphaFreeFirst(
      config.input,
      {
        dataRootLabel:
          config.dataRootLabel ||
          `${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/${testSuffix}-routing`,
        readKillSwitchState: async () => {
          const sequence = config.killSwitchSequence || [false];
          const engaged =
            killSwitchReads < sequence.length ? sequence[killSwitchReads] === true : false;
          killSwitchReads += 1;
          return {
            killSwitchEngaged: engaged,
            killSwitchSources: engaged ? ["file"] : [],
          };
        },
        inspectRuntime: async (modelKey) => {
          inspectCalls.push(modelKey);
          if (modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY) {
            if (config.localInspectionError) {
              throw config.localInspectionError;
            }
            return cloneJson(config.localInspection);
          }

          if (modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY) {
            if (config.groqInspectionError) {
              throw config.groqInspectionError;
            }
            return cloneJson(config.groqInspection);
          }

          throw new Error(`Unexpected inspection key ${modelKey}`);
        },
        catalogSnapshot: config.catalogSnapshot || modelRoutingIndex.getCodexForgeProductionModelCatalog(),
        groqQualificationRecord:
          config.groqQualificationRecord || groqQualification.CODEXFORGE_GROQ_PROVIDER_QUALIFICATION,
        groqAutomaticRoutingAdmissionRecord:
          config.groqAutomaticRoutingAdmissionRecord || groqAdmission.CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION,
      }
    );

    return {
      result,
      inspectCalls,
      killSwitchReads,
    };
  }

  const productionCatalog = modelRoutingIndex.getCodexForgeProductionModelCatalog();
  const productionLocalModel = productionCatalog.models.find(
    (entry) => entry.modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
  );
  const productionGroq20Model = productionCatalog.models.find(
    (entry) => entry.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
  );
  const productionGroq120Model = productionCatalog.models.find(
    (entry) => entry.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  );
  assert(productionCatalog.catalogVersion === "codexforge-model-routing-v4", "Catalog v4 validates.");
  assert(Boolean(productionLocalModel), "Production catalog still includes the exact local model.");
  assert(Boolean(productionGroq20Model), "Production catalog includes the exact Groq 20B model.");
  assert(Boolean(productionGroq120Model), "Production catalog includes the exact Groq 120B model.");
  assert(
    productionLocalModel.automaticRoutingAdmission.admissionId ===
      "codexforge-ollama-local-automatic-routing-v1",
    "Local admission keeps the exact admission id."
  );
  assert(
    JSON.stringify(productionLocalModel.automaticRoutingAdmission.modes) ===
      JSON.stringify(["local-only", "free-only", "free-first", "best-within-budget"]),
    "Local admission contains all automatic modes."
  );
  assert(productionGroq20Model.routingState === "automatic", "Groq 20B becomes automatic.");
  assert(
    productionGroq20Model.automaticRoutingAdmission &&
      JSON.stringify(productionGroq20Model.automaticRoutingAdmission.modes) ===
        JSON.stringify(["free-first"]),
    "Groq 20B admits exactly free-first."
  );
  assert(
    productionGroq120Model.routingState === "manual-only" &&
      productionGroq120Model.automaticRoutingAdmission === null,
    "Groq 120B remains manual-only."
  );

  const qualificationRecord = groqQualification.CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;
  assert(
    qualificationRecord.qualificationVersion === "codexforge-groq-qualification-v3",
    "Groq qualification version is v3."
  );
  assert(
    qualificationRecord.automaticRoutingAdmissionId ===
      "codexforge-groq-automatic-routing-admission-v1",
    "Groq qualification links the automatic admission."
  );
  assert(
    qualificationRecord.automaticRoutingModes.length === 1 &&
      qualificationRecord.automaticRoutingModes[0] === "free-first",
    "Groq qualification exposes only free-first automatic routing."
  );
  assert(
    qualificationRecord.models.find(
      (entry) => entry.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
    ).automaticRoutingState === "admitted-for-free-first",
    "Groq 20B qualification is automatic-admitted for free-first."
  );
  assert(
    qualificationRecord.models.find(
      (entry) => entry.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
    ).automaticRoutingState === "disabled",
    "Groq 120B qualification remains manual-only."
  );
  assert(
    groqAcceptance.CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.automaticRoutingUsed === false,
    "Historical live acceptance still records automaticRoutingUsed as false."
  );

  const freeOnlyDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-only", {
        freeTierConfirmationState: "confirmed-for-request",
      }),
      runtimeForModels(productionCatalog.models, {
        [privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]: {
          availability: "unavailable",
          quotaState: "not-applicable",
        },
      }),
      {
        candidateModelKeys: [
          privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        ],
      }
    ),
    productionCatalog
  );
  assert(
    freeOnlyDecision.status === "no-eligible-model",
    "free-only does not automatically select Groq."
  );
  assert(
    hasCode(
      candidateByKey(
        freeOnlyDecision,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).rejectionCodes,
      "routing-mode-not-admitted"
    ),
    "Wrong automatic mode receives routing-mode-not-admitted."
  );

  const bestWithinBudgetDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", {
        freeTierConfirmationState: "confirmed-for-request",
      }),
      runtimeForModels(productionCatalog.models, {
        [privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]: {
          availability: "unavailable",
          quotaState: "not-applicable",
        },
      }),
      {
        candidateModelKeys: [
          privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        ],
      }
    ),
    productionCatalog
  );
  assert(
    bestWithinBudgetDecision.status === "no-eligible-model",
    "best-within-budget does not automatically select Groq."
  );

  const manual20Decision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        freeTierConfirmationState: "confirmed-for-request",
        maximumEstimatedCostUsd: null,
      }),
      runtimeForModels(productionCatalog.models),
      {
        candidateModelKeys: null,
      }
    ),
    productionCatalog
  );
  assert(
    manual20Decision.selectedModelKey ===
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "Manual exact selection still permits Groq 20B."
  );

  const manual120Decision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        freeTierConfirmationState: "confirmed-for-request",
        maximumEstimatedCostUsd: null,
      }),
      runtimeForModels(productionCatalog.models),
      {
        candidateModelKeys: null,
      }
    ),
    productionCatalog
  );
  assert(
    manual120Decision.selectedModelKey ===
      privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    "Manual exact selection still permits Groq 120B."
  );

  const candidateAllowlistDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        freeTierConfirmationState: "confirmed-for-request",
        maximumEstimatedCostUsd: null,
      }),
      runtimeForModels(productionCatalog.models),
      {
        candidateModelKeys: [
          privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        ],
      }
    ),
    productionCatalog
  );
  assert(
    hasCode(
      candidateByKey(
        candidateAllowlistDecision,
        privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
      ).rejectionCodes,
      "candidate-not-allowed"
    ),
    "Candidate allowlist rejects Groq 120B with candidate-not-allowed."
  );

  const unconfirmedFreeTierDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-first", {
        freeTierConfirmationState: "not-confirmed",
      }),
      runtimeForModels(productionCatalog.models, {
        [privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]: {
          availability: "unavailable",
          quotaState: "not-applicable",
        },
      }),
      {
        candidateModelKeys: [
          privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        ],
      }
    ),
    productionCatalog
  );
  assert(
    hasCode(
      candidateByKey(
        unconfirmedFreeTierDecision,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).rejectionCodes,
      "free-tier-not-confirmed"
    ),
    "Unconfirmed Free tier receives free-tier-not-confirmed."
  );

  const buildKey = modelRoutingIndex.buildCodexForgeModelKey;
  const paidProvider = provider("paid-cloud", "cloud", "enabled");
  const paidModel = model(buildKey, {
    providerId: "paid-cloud",
    modelId: "paid-model",
    pricing: pricing("paid", { input: 1, output: 1 }),
    automaticRoutingAdmission: admission("paid-automatic-v1", ["free-first"]),
    taskProfileScores: { "general-text": 99 },
  });
  const paidCatalog = snapshot("slice-m-paid-test", [paidProvider], [paidModel]);
  const paidDisabledDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-first", {
        maximumEstimatedCostUsd: 5,
        paidApprovalState: "granted-for-request",
        paidExecutionAdmission: "disabled",
      }),
      runtimeForModels(paidCatalog.models)
    ),
    paidCatalog
  );
  assert(
    hasCode(candidateByKey(paidDisabledDecision, paidModel.modelKey).rejectionCodes, "paid-execution-disabled"),
    "Paid execution disabled receives paid-execution-disabled."
  );
  assert(
    paidDisabledDecision.selectedModelKey === null,
    "A malicious budget and paid approval cannot make a Slice M paid candidate eligible."
  );

  const paidRequestScopedDecision = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-first", {
        maximumEstimatedCostUsd: 5,
        paidApprovalState: "granted-for-request",
        paidExecutionAdmission: "request-scoped",
      }),
      runtimeForModels(paidCatalog.models)
    ),
    paidCatalog
  );
  assert(
    paidRequestScopedDecision.selectedModelKey === paidModel.modelKey,
    "Generic request-scoped paid routing remains available for future use."
  );

  const orderedRejectionProvider = provider("ordered-cloud", "cloud", "enabled");
  const orderedRejectionModel = model(buildKey, {
    providerId: "ordered-cloud",
    modelId: "ordered-model",
    pricing: pricing("free-tier"),
    automaticRoutingAdmission: admission("ordered-automatic-v1", ["free-first"]),
  });
  const orderedCatalog = snapshot("ordered-catalog", [orderedRejectionProvider], [orderedRejectionModel]);
  const orderedDecisionA = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-only", {
        freeTierConfirmationState: "not-confirmed",
      }),
      runtimeForModels(orderedCatalog.models),
      {
        candidateModelKeys: ["somewhere-else::other-model"],
      }
    ),
    orderedCatalog
  );
  const orderedDecisionB = modelRoutingPolicy.routeCodexForgeModel(
    routeRequest(
      policy("free-only", {
        freeTierConfirmationState: "not-confirmed",
      }),
      runtimeForModels(orderedCatalog.models),
      {
        candidateModelKeys: ["somewhere-else::other-model"],
      }
    ),
    orderedCatalog
  );
  assert(
    JSON.stringify(candidateByKey(orderedDecisionA, orderedRejectionModel.modelKey).rejectionCodes) ===
      JSON.stringify([
        "candidate-not-allowed",
        "routing-mode-not-admitted",
        "free-tier-not-confirmed",
      ]),
    "Rejection-code ordering is deterministic."
  );
  assert(
    JSON.stringify(orderedDecisionA) === JSON.stringify(orderedDecisionB),
    "Identical inputs produce deeply equal decisions."
  );
  assert(
    Object.isFrozen(orderedDecisionA) &&
      Object.isFrozen(orderedDecisionA.reasonCodes) &&
      Object.isFrozen(orderedDecisionA.candidates),
    "Identical routing decisions remain deeply frozen."
  );

  const validDisallowedRouting = routingTypes.validatePrivateAlphaFreeFirstRoutingInput({
    routingMode: "free-first",
    capability: "text",
    maximumOutputTokens: 512,
    cloudRouting: {
      state: "disallowed",
    },
  });
  assert(validDisallowedRouting.ok === true, "Cloud-disallowed free-first intent validates without acknowledgement fields.");
  assert(validDisallowedRouting.value.maximumOutputTokens === 512, "Automatic 512-token requests validate.");

  const validHighLocalOnlyRouting = routingTypes.validatePrivateAlphaFreeFirstRoutingInput({
    routingMode: "free-first",
    capability: "text",
    maximumOutputTokens: 4096,
    cloudRouting: {
      state: "disallowed",
    },
  });
  assert(validHighLocalOnlyRouting.ok === true, "Automatic requests keep the local 4096-token ceiling.");

  await expectRoutingError(
    () =>
      routingServer.routePrivateAlphaFreeFirst({
        routingMode: "free-first",
        capability: "text",
        maximumOutputTokens: 512,
        cloudRouting: {
          state: "disallowed",
          metadataProbeAcknowledgement: true,
        },
      }),
    "Unknown cloudRouting fields are not allowed"
  );
  await expectRoutingError(
    () =>
      routingServer.routePrivateAlphaFreeFirst({
        routingMode: "free-first",
        capability: "text",
        maximumOutputTokens: 512,
        cloudRouting: {
          state: "allowed-free-tier-only",
          metadataProbeAcknowledgement: false,
          freeTierConfirmation: true,
        },
      }),
    "metadataProbeAcknowledgement"
  );
  await expectRoutingError(
    () =>
      routingServer.routePrivateAlphaFreeFirst({
        routingMode: "free-first",
        capability: "text",
        maximumOutputTokens: 512,
        cloudRouting: {
          state: "allowed-free-tier-only",
          metadataProbeAcknowledgement: true,
          freeTierConfirmation: "true",
        },
      }),
    "freeTierConfirmation"
  );
  await expectRoutingError(
    () =>
      routingServer.routePrivateAlphaFreeFirst({
        routingMode: "free-first",
        capability: "code",
        maximumOutputTokens: 512,
        cloudRouting: {
          state: "disallowed",
        },
      }),
    'capability must be exactly "text"'
  );
  await expectRoutingError(
    () =>
      routingServer.routePrivateAlphaFreeFirst({
        routingMode: "free-first",
        capability: "text",
        maximumOutputTokens: 512,
        requestText: "forbidden",
        cloudRouting: {
          state: "disallowed",
        },
      }),
    "Unknown fields are not allowed"
  );

  const routeOnlyLabel = `${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/${testSuffix}-routing-no-write`;
  await resetLabel(routeOnlyLabel);
  const localFirstSelection = await runRoutingScenario({
    dataRootLabel: routeOnlyLabel,
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(
    localFirstSelection.result.status === "selected-for-approval" &&
      localFirstSelection.result.selectedModelKey ===
        privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "Local and Groq available selects local first."
  );
  assert(
    localFirstSelection.inspectCalls.length === 1 &&
      localFirstSelection.inspectCalls[0] ===
        privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "Local selection performs zero Groq inspection calls."
  );
  assert(
    localFirstSelection.result.cloudProviderInspected === false,
    "Local selection reports that cloud metadata was not inspected."
  );
  assert(
    localFirstSelection.result.promptTransferredToCloud === false &&
      localFirstSelection.result.providerGenerationPerformed === false,
    "Routing remains selection-only with explicit false transfer and generation facts."
  );
  assert(
    localFirstSelection.result.decision.recommendedPaidModelKey === null &&
      localFirstSelection.result.decision.requiresPaidApproval === false,
    "Slice M routing results never recommend paid execution."
  );
  assert(
    !fs.existsSync(toAbsolutePath(routeOnlyLabel)),
    "Automatic routing selection alone performs no store write."
  );
  const localFirstGroq120Candidate = candidateByKey(
    localFirstSelection.result.decision,
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  );
  assert(
    localFirstGroq120Candidate.eligible === false &&
      hasCode(localFirstGroq120Candidate.rejectionCodes, "candidate-not-allowed"),
    "Valid local-first selected results keep Groq 120B visible, ineligible, and candidate-not-allowed."
  );
  assert(
    routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate(localFirstSelection.result) ===
      true,
    "Valid local-first selected result is safe for create."
  );
  const simulatedLocalFirstCreate = simulateAutomaticCreateHandoff(
    localFirstSelection.result,
    {
      requestText: "route-only local",
      maximumOutputTokens: 512,
    }
  );
  assert(
    simulatedLocalFirstCreate.preservedRoutingResult === localFirstSelection.result &&
      simulatedLocalFirstCreate.createHandoffs.length === 1,
    "Valid local-first selected result produces exactly one simulated create handoff."
  );
  assert(
    JSON.stringify(localFirstSelection.inspectCalls) ===
      JSON.stringify([privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]),
    "Valid local-first selected result inspects only the local runtime."
  );
  assert(
    groqCredentialReadCount === 0 && fetchCallCount === 0,
    "Valid local-first selected result performs zero Groq credential and network calls."
  );

  const higherGroqCatalog = cloneJson(productionCatalog);
  higherGroqCatalog.models = higherGroqCatalog.models.map((entry) => {
    if (entry.modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY) {
      return {
        ...entry,
        taskProfileScores: { ...entry.taskProfileScores, "general-text": 1 },
      };
    }

    if (entry.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY) {
      return {
        ...entry,
        taskProfileScores: { ...entry.taskProfileScores, "general-text": 99 },
      };
    }

    return entry;
  });
  const localStillWins = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    catalogSnapshot: higherGroqCatalog,
  });
  assert(
    localStillWins.result.selectedModelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "Local selection is unaffected by a higher Groq task score."
  );

  const localUnavailableCloudDisallowed = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "disallowed",
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(
    localUnavailableCloudDisallowed.result.status === "no-eligible-model",
    "Local unavailable plus cloud disallowed returns no eligible model."
  );
  assert(
    localUnavailableCloudDisallowed.inspectCalls.length === 1,
    "Local unavailable plus cloud disallowed makes zero Groq calls."
  );
  assert(
    routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate(
      localUnavailableCloudDisallowed.result
    ) === false,
    "Cloud-disallowed no-eligible result is not safe for create."
  );
  const simulatedCloudDisallowedCreate = simulateAutomaticCreateHandoff(
    localUnavailableCloudDisallowed.result,
    {
      requestText: "cloud disallowed",
      maximumOutputTokens: 512,
    }
  );
  assert(
    simulatedCloudDisallowedCreate.preservedRoutingResult ===
      localUnavailableCloudDisallowed.result &&
      simulatedCloudDisallowedCreate.createHandoffs.length === 0 &&
      simulatedCloudDisallowedCreate.errorMessage === null,
    "Cloud-disallowed no-eligible result performs zero create handoffs."
  );
  assert(
    JSON.stringify(localUnavailableCloudDisallowed.inspectCalls) ===
      JSON.stringify([privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]) &&
      groqCredentialReadCount === 0,
    "Cloud-disallowed no-eligible result keeps Groq inspection and credential counts at zero."
  );

  const localMissingBlocks = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_model_missing",
      safeErrorMessage: "missing",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(localMissingBlocks.result.status === "blocked", "Local model missing fails closed.");
  assert(localMissingBlocks.inspectCalls.length === 1, "Local model missing makes zero Groq calls.");

  const localInspectionException = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspectionError: new Error("local inspection failed"),
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(localInspectionException.result.status === "blocked", "Local inspection exceptions fail closed.");

  const localUnknownState = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: true,
      modelAvailable: false,
      errorCode: null,
      availability: "unknown",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(localUnknownState.result.status === "blocked", "Unknown local state fails closed.");

  const firstKillSwitchBlocks = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    killSwitchSequence: [true],
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(firstKillSwitchBlocks.result.status === "blocked", "First routing kill switch blocks immediately.");
  assert(firstKillSwitchBlocks.inspectCalls.length === 0, "First routing kill switch makes zero adapter calls.");

  const secondKillSwitchBlocks = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    killSwitchSequence: [false, true],
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(secondKillSwitchBlocks.result.status === "blocked", "Second routing kill switch blocks cloud consideration.");
  assert(
    JSON.stringify(secondKillSwitchBlocks.inspectCalls) ===
      JSON.stringify([privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY]),
    "Second routing kill switch allows local inspection but zero Groq credential or discovery calls."
  );

  const groqSelected = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(
    groqSelected.result.selectedModelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "Local unavailability plus exact acknowledgements selects Groq 20B."
  );
  assert(
    JSON.stringify(groqSelected.inspectCalls) ===
      JSON.stringify([
        privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      ]),
    "Automatic routing inspects the exact Groq 20B model once and never 120B."
  );
  assert(groqSelected.result.cloudProviderInspected === true, "Successful Groq selection records cloud metadata inspection.");
  assert(
    !JSON.stringify(groqSelected.result).includes("requestText") &&
      !JSON.stringify(groqSelected.result).includes("Authorization") &&
      !JSON.stringify(groqSelected.result).includes("outputText"),
    "Safe routing results contain no prompt text, credentials, or output."
  );
  const groqSelectedGroq120Candidate = candidateByKey(
    groqSelected.result.decision,
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  );
  assert(
    groqSelectedGroq120Candidate.eligible === false &&
      hasCode(groqSelectedGroq120Candidate.rejectionCodes, "candidate-not-allowed"),
    "Valid Groq 20B selected results keep Groq 120B visible, ineligible, and candidate-not-allowed."
  );
  assert(
    routingTypes.isPrivateAlphaFreeFirstRoutingResultSafeForCreate(groqSelected.result) ===
      true,
    "Valid Groq 20B selected result is safe for create."
  );
  const simulatedGroqSelectedCreate = simulateAutomaticCreateHandoff(
    groqSelected.result,
    {
      requestText: "route-only groq",
      maximumOutputTokens: 512,
    }
  );
  assert(
    simulatedGroqSelectedCreate.createHandoffs.length === 1 &&
      simulatedGroqSelectedCreate.createHandoffs[0].modelKey ===
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "Valid Groq 20B selected result produces exactly one simulated create handoff for exact Groq 20B."
  );
  assert(
    !groqSelected.inspectCalls.includes(privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY) &&
      groqSelected.result.selectedModelKey !==
        privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    "Groq 120B is never inspected or selected automatically."
  );
  assert(
    groqSelected.result.providerGenerationPerformed === false,
    "Valid Groq 20B selected result performs no generation."
  );

  const maliciousOutsideEligible = cloneJson(localFirstSelection.result);
  candidateByKey(
    maliciousOutsideEligible.decision,
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  ).eligible = true;
  assertUnsafeAutomaticCreateScenario(
    maliciousOutsideEligible,
    "Outside candidate changed to eligible"
  );

  const maliciousOutsideMissingCandidateNotAllowed = cloneJson(localFirstSelection.result);
  candidateByKey(
    maliciousOutsideMissingCandidateNotAllowed.decision,
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  ).rejectionCodes = candidateByKey(
    maliciousOutsideMissingCandidateNotAllowed.decision,
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  ).rejectionCodes.filter((code) => code !== "candidate-not-allowed");
  assertUnsafeAutomaticCreateScenario(
    maliciousOutsideMissingCandidateNotAllowed,
    "Outside candidate missing candidate-not-allowed"
  );

  const maliciousMissingSelectedCandidate = cloneJson(localFirstSelection.result);
  maliciousMissingSelectedCandidate.decision.candidates =
    maliciousMissingSelectedCandidate.decision.candidates.filter(
      (candidate) =>
        candidate.modelKey !== maliciousMissingSelectedCandidate.selectedModelKey
    );
  assertUnsafeAutomaticCreateScenario(
    maliciousMissingSelectedCandidate,
    "Selected candidate missing"
  );

  const maliciousDuplicateSelectedCandidate = cloneJson(localFirstSelection.result);
  maliciousDuplicateSelectedCandidate.decision.candidates.push(
    cloneJson(
      candidateByKey(
        maliciousDuplicateSelectedCandidate.decision,
        maliciousDuplicateSelectedCandidate.selectedModelKey
      )
    )
  );
  assertUnsafeAutomaticCreateScenario(
    maliciousDuplicateSelectedCandidate,
    "Selected candidate duplicated"
  );

  const maliciousSelectedCandidateIneligible = cloneJson(localFirstSelection.result);
  candidateByKey(
    maliciousSelectedCandidateIneligible.decision,
    maliciousSelectedCandidateIneligible.selectedModelKey
  ).eligible = false;
  assertUnsafeAutomaticCreateScenario(
    maliciousSelectedCandidateIneligible,
    "Selected candidate changed to ineligible"
  );

  const maliciousSelectedCandidateRejected = cloneJson(localFirstSelection.result);
  candidateByKey(
    maliciousSelectedCandidateRejected.decision,
    maliciousSelectedCandidateRejected.selectedModelKey
  ).rejectionCodes = ["candidate-not-allowed"];
  assertUnsafeAutomaticCreateScenario(
    maliciousSelectedCandidateRejected,
    "Selected candidate given a rejection code"
  );

  const maliciousGroq120Selected = cloneJson(groqSelected.result);
  maliciousGroq120Selected.selectedModelKey =
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
  maliciousGroq120Selected.decision.selectedModelKey =
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
  assertUnsafeAutomaticCreateScenario(
    maliciousGroq120Selected,
    "Selected key changed to Groq 120B"
  );

  const maliciousSelectedKeyMismatch = cloneJson(localFirstSelection.result);
  maliciousSelectedKeyMismatch.decision.selectedModelKey =
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY;
  assertUnsafeAutomaticCreateScenario(
    maliciousSelectedKeyMismatch,
    "Decision and top-level selected keys mismatch"
  );

  const maliciousRecommendedPaidModel = cloneJson(localFirstSelection.result);
  maliciousRecommendedPaidModel.decision.recommendedPaidModelKey =
    privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
  assertUnsafeAutomaticCreateScenario(
    maliciousRecommendedPaidModel,
    "recommendedPaidModelKey made non-null"
  );

  const maliciousRequiresPaidApproval = cloneJson(localFirstSelection.result);
  maliciousRequiresPaidApproval.decision.requiresPaidApproval = true;
  assertUnsafeAutomaticCreateScenario(
    maliciousRequiresPaidApproval,
    "requiresPaidApproval changed to true"
  );

  const groqUnavailableNoFallback = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "available",
      errorCode: "groq_model_unavailable",
      safeErrorMessage: "cloud unavailable",
    }),
  });
  assert(
    groqUnavailableNoFallback.result.status === "no-eligible-model",
    "Groq 20B unavailable returns no eligible model and never inspects 120B."
  );

  const quotaExhausted = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, {
      quotaState: "exhausted",
      availability: "available",
    }),
  });
  assert(
    hasCode(
      candidateByKey(
        quotaExhausted.result.decision,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).rejectionCodes,
      "quota-unavailable"
    ),
    "Quota exhausted is rejected."
  );

  const quotaUnknown = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 512,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, {
      quotaState: "unknown",
      availability: "available",
    }),
  });
  assert(
    hasCode(
      candidateByKey(
        quotaUnknown.result.decision,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).rejectionCodes,
      "quota-unavailable"
    ),
    "Unknown free-tier quota is rejected."
  );

  const auto513LocalSelected = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 513,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(
    auto513LocalSelected.result.selectedModelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "Automatic 513-token requests may still select local."
  );
  assert(
    auto513LocalSelected.inspectCalls.length === 1,
    "Automatic 513-token local success makes zero Groq metadata calls."
  );

  const auto513NoGroqProbe = await runRoutingScenario({
    input: {
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: 513,
      cloudRouting: {
        state: "allowed-free-tier-only",
        metadataProbeAcknowledgement: true,
        freeTierConfirmation: true,
      },
    },
    localInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY, {
      providerAvailable: false,
      modelAvailable: false,
      errorCode: "ollama_unavailable",
      safeErrorMessage: "local unavailable",
    }),
    groqInspection: buildInspection(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  assert(
    auto513NoGroqProbe.result.status === "no-eligible-model",
    "Automatic 513-token requests with local unavailable return no eligible model."
  );
  assert(
    auto513NoGroqProbe.inspectCalls.length === 1,
    "Automatic 513-token requests with local unavailable make zero Groq metadata calls."
  );

  const create512Label = await prepareLabel("create-groq-512");
  const create512Store = createStore(create512Label, {});
  const createdGroq512 = await create512Store.createRun(
    {
      requestText: "Create at 512.",
      capability: "text",
      modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      modelPreferenceLabel: privateAlpha.resolvePrivateAlphaBoundConfiguration(
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).modelPreferenceLabel,
      maximumOutputTokens: 512,
      },
      idKey("create-groq-512")
    );
  assert(createdGroq512.run.state === "awaiting_approval", "Direct/manual Groq create at 512 succeeds and remains awaiting_approval.");

  const create513Label = await prepareLabel("create-groq-513");
  let create513ResolverCalls = 0;
  const create513Store = createStore(create513Label, {
    providerAdapterResolver() {
      create513ResolverCalls += 1;
      throw new Error("resolver should not be called during create validation");
    },
  });
  await expectStoreError(
    () =>
      create513Store.createRun(
        {
          requestText: "Create at 513.",
          capability: "text",
          modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
          modelPreferenceLabel: privateAlpha.resolvePrivateAlphaBoundConfiguration(
            privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
          ).modelPreferenceLabel,
          maximumOutputTokens: 513,
        },
        idKey("create-groq-513")
      ),
    400,
    "between 1 and 512"
  );
  assert(create513ResolverCalls === 0, "Direct/manual Groq create at 513 fails before provider work.");
  assert(!fs.existsSync(path.join(toAbsolutePath(create513Label), "runs")), "Direct/manual Groq create at 513 fails before persistence.");

  const createLocal4096Label = await prepareLabel("create-local-4096");
  const createLocal4096Store = createStore(createLocal4096Label, {});
  const createdLocal4096 = await createLocal4096Store.createRun(
    {
      requestText: "Create local at 4096.",
      capability: "code",
      modelKey: privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      modelPreferenceLabel: privateAlpha.resolvePrivateAlphaBoundConfiguration(
        privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
      ).modelPreferenceLabel,
      maximumOutputTokens: 4096,
    },
    idKey("create-local-4096")
  );
  assert(createdLocal4096.run.state === "awaiting_approval", "Local create at 4096 remains accepted.");

  const missingExecutionFreeTierLabel = await prepareLabel("missing-exec-free-tier");
  const missingExecutionResolverCalls = [];
  const missingExecutionStore = createStore(missingExecutionFreeTierLabel, {
    providerAdapterResolver(modelKey) {
      missingExecutionResolverCalls.push(modelKey);
      return createAdapterHarness({
        identity: buildIdentity(modelKey),
      }).adapter;
    },
  });
  const missingExecutionApproved = await createApprovedRun(
    missingExecutionStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "missing-exec-free-tier"
  );
  await expectStoreError(
    () =>
      missingExecutionStore.executeRun(
        missingExecutionApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: missingExecutionApproved.approved.approvalScopeHash,
          expectedRevision: missingExecutionApproved.approved.revision,
          cloudExecutionAcknowledgement: true,
        },
        idKey("missing-exec-free-tier")
      ),
    409,
    "Groq Free-tier execution confirmation is required"
  );
  assert(
    getKillSwitchEntry(missingExecutionFreeTierLabel).reads === 0 &&
      missingExecutionResolverCalls.length === 0,
    "Missing Groq execution Free-tier confirmation blocks before kill-switch and resolver work."
  );

  const malformedExecutionConfirmationLabel = await prepareLabel("malformed-exec-free-tier");
  const malformedExecutionStore = createStore(malformedExecutionConfirmationLabel, {});
  const malformedExecutionApproved = await createApprovedRun(
    malformedExecutionStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "malformed-exec-free-tier"
  );
  await expectStoreError(
    () =>
      malformedExecutionStore.executeRun(
        malformedExecutionApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: malformedExecutionApproved.approved.approvalScopeHash,
          expectedRevision: malformedExecutionApproved.approved.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: "true",
        },
        idKey("malformed-exec-free-tier")
      ),
    400,
    "must be exactly true"
  );

  const localConfirmationRejectedLabel = await prepareLabel("local-free-tier-rejected");
  const localConfirmationStore = createStore(localConfirmationRejectedLabel, {});
  const localConfirmationApproved = await createApprovedRun(
    localConfirmationStore,
    privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "local-free-tier-rejected"
  );
  await expectStoreError(
    () =>
      localConfirmationStore.executeRun(
        localConfirmationApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: localConfirmationApproved.approved.approvalScopeHash,
          expectedRevision: localConfirmationApproved.approved.revision,
          groqFreeTierExecutionConfirmation: true,
        },
        idKey("local-free-tier-rejected")
      ),
    409,
    "not allowed for local execution"
  );

  const cloudTransferRequiredLabel = await prepareLabel("cloud-transfer-required");
  const cloudTransferRequiredStore = createStore(cloudTransferRequiredLabel, {});
  const createdCloudTransferRun = await cloudTransferRequiredStore.createRun(
    {
      requestText: "approval required",
      capability: "text",
      modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      modelPreferenceLabel: privateAlpha.resolvePrivateAlphaBoundConfiguration(
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).modelPreferenceLabel,
      maximumOutputTokens: 512,
    },
    "cloud-transfer-required"
  );
  await expectStoreError(
    () =>
      cloudTransferRequiredStore.approveRun(createdCloudTransferRun.run.runId, {
        approvalScopeHash: createdCloudTransferRun.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: createdCloudTransferRun.run.revision,
      }),
    409,
    "Cloud data transfer acknowledgement is required"
  );

  const manualApprovalRequiredLabel = await prepareLabel("manual-approval-required");
  const manualApprovalRequiredStore = createStore(manualApprovalRequiredLabel, {});
  const createdManualApprovalRun = await manualApprovalRequiredStore.createRun(
    {
      requestText: "manual approval required",
      capability: "text",
      modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      modelPreferenceLabel: privateAlpha.resolvePrivateAlphaBoundConfiguration(
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
      ).modelPreferenceLabel,
      maximumOutputTokens: 512,
    },
    "manual-approval-required"
  );
  await expectStoreError(
    () =>
      manualApprovalRequiredStore.executeRun(
        createdManualApprovalRun.run.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: createdManualApprovalRun.run.approvalScopeHash,
          expectedRevision: createdManualApprovalRun.run.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: true,
        },
        idKey("manual-approval-required")
      ),
    409,
    "Run is not eligible for execution."
  );

  const cloudExecutionRequiredLabel = await prepareLabel("cloud-execution-required");
  const cloudExecutionRequiredStore = createStore(cloudExecutionRequiredLabel, {});
  const cloudExecutionRequiredApproved = await createApprovedRun(
    cloudExecutionRequiredStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "cloud-execution-required"
  );
  await expectStoreError(
    () =>
      cloudExecutionRequiredStore.executeRun(
        cloudExecutionRequiredApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: cloudExecutionRequiredApproved.approved.approvalScopeHash,
          expectedRevision: cloudExecutionRequiredApproved.approved.revision,
          groqFreeTierExecutionConfirmation: true,
        },
        idKey("cloud-execution-required")
      ),
    409,
    "Cloud execution acknowledgement is required"
  );

  const killSwitchBeforeResolverLabel = await prepareLabel("kill-switch-before-resolver");
  setKillSwitchSequence(killSwitchBeforeResolverLabel, [true], false);
  const killSwitchBeforeResolverHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  let killSwitchBeforeResolverCalls = 0;
  const killSwitchBeforeResolverStore = createStore(killSwitchBeforeResolverLabel, {
    providerAdapterResolver() {
      killSwitchBeforeResolverCalls += 1;
      return killSwitchBeforeResolverHarness.adapter;
    },
  });
  const killSwitchBeforeResolverApproved = await createApprovedRun(
    killSwitchBeforeResolverStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "kill-switch-before-resolver"
  );
  const killSwitchBeforeResolverResult = await killSwitchBeforeResolverStore.executeRun(
    killSwitchBeforeResolverApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: killSwitchBeforeResolverApproved.approved.approvalScopeHash,
      expectedRevision: killSwitchBeforeResolverApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("kill-switch-before-resolver")
  );
  assert(
    killSwitchBeforeResolverResult.errorCode === "kill_switch_blocked" &&
      killSwitchBeforeResolverCalls === 0,
    "Existing first kill-switch check remains before resolver and credential work."
  );

  const identityMismatchLabel = await prepareLabel("identity-mismatch");
  const identityMismatchHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY),
  });
  let identityMismatchResolverCalls = 0;
  const identityMismatchStore = createStore(identityMismatchLabel, {
    providerAdapterResolver() {
      identityMismatchResolverCalls += 1;
      return identityMismatchHarness.adapter;
    },
  });
  const identityMismatchApproved = await createApprovedRun(
    identityMismatchStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "identity-mismatch"
  );
  const identityMismatchError = await expectStoreError(
    () =>
      identityMismatchStore.executeRun(
        identityMismatchApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: identityMismatchApproved.approved.approvalScopeHash,
          expectedRevision: identityMismatchApproved.approved.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: true,
        },
        idKey("identity-mismatch")
      ),
    409,
    "Resolved provider adapter does not match the approved execution scope."
  );
  assert(
    identityMismatchResolverCalls === 1 &&
      identityMismatchHarness.getStats().availabilityCalls === 0 &&
      identityMismatchHarness.getStats().generationCalls === 0 &&
      identityMismatchError.status === 409,
    "Adapter identity mismatch remains blocked."
  );

  const successGroqLabel = await prepareLabel("groq-success");
  let executingSnapshot = null;
  const successGroqHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    async onGenerate() {
      const runFiles = await fsp.readdir(path.join(toAbsolutePath(successGroqLabel), "runs"));
      executingSnapshot = JSON.parse(
        await fsp.readFile(
          path.join(toAbsolutePath(successGroqLabel), "runs", runFiles[0]),
          "utf8"
        )
      );
    },
    generationResult: {
      outputText: "  exact cloud output  ",
      doneReason: "stop",
      totalDurationNanoseconds: 101,
      loadDurationNanoseconds: 11,
      promptEvalCount: 12,
      evalCount: 13,
    },
  });
  const successGroqResolverKeys = [];
  const successGroqStore = createStore(successGroqLabel, {
    providerAdapterResolver(modelKey) {
      successGroqResolverKeys.push(modelKey);
      return successGroqHarness.adapter;
    },
  });
  const successGroqApproved = await createApprovedRun(
    successGroqStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "groq-success"
  );
  const successGroqResult = await successGroqStore.executeRun(
    successGroqApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: successGroqApproved.approved.approvalScopeHash,
      expectedRevision: successGroqApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("groq-success")
  );
  assert(
    successGroqResolverKeys.length === 1 &&
      successGroqResolverKeys[0] === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "Selected Groq 20B execution never calls local or 120B."
  );
  assert(successGroqHarness.getStats().availabilityCalls === 1, "Availability is called exactly once.");
  assert(successGroqHarness.getStats().generationCalls === 1, "Generation occurs exactly once.");
  assert(
    executingSnapshot !== null && executingSnapshot.state === "executing",
    "Executing record exists before generation."
  );
  assert(
    successGroqHarness.getStats().generationInputs[0].approvedRequestText ===
      successGroqApproved.approved.request.normalizedRequestText &&
      successGroqHarness.getStats().generationInputs[0].model === "openai/gpt-oss-20b" &&
      successGroqHarness.getStats().generationInputs[0].maximumOutputTokens ===
        successGroqApproved.approved.request.maximumOutputTokens,
    "Generation uses the exact approved prompt, model, and token limit."
  );
  assert(
    successGroqResult.run.execution.groqFreeTierExecutionConfirmation ===
      "operator-confirmed-current-free-tier",
    "Successful Groq execution records the normalized Free-tier confirmation literal."
  );
  const replayWithoutFreshConfirmation = await successGroqStore.executeRun(
    successGroqApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: successGroqApproved.approved.approvalScopeHash,
      expectedRevision: successGroqApproved.approved.revision,
    },
    idKey("groq-success")
  );
  assert(
    replayWithoutFreshConfirmation.replayed === true &&
      successGroqHarness.getStats().generationCalls === 1,
    "Same Groq idempotency key replays without a fresh confirmation and makes no extra call."
  );
  await expectStoreError(
    () =>
      successGroqStore.executeRun(
        successGroqApproved.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: successGroqApproved.approved.approvalScopeHash,
          expectedRevision: successGroqApproved.approved.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: true,
        },
        idKey("groq-success-other-key")
      ),
    409,
    "one allowed execution attempt"
  );

  const secondKillSwitchLabel = await prepareLabel("second-kill-switch");
  setKillSwitchSequence(secondKillSwitchLabel, [false, true], false);
  const secondKillHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  const secondKillStore = createStore(secondKillSwitchLabel, {
    providerAdapterResolver() {
      return secondKillHarness.adapter;
    },
  });
  const secondKillApproved = await createApprovedRun(
    secondKillStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "second-kill-switch"
  );
  const secondKillResult = await secondKillStore.executeRun(
    secondKillApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: secondKillApproved.approved.approvalScopeHash,
      expectedRevision: secondKillApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("second-kill-switch")
  );
  assert(
    secondKillResult.errorCode === "kill_switch_blocked" &&
      getKillSwitchEntry(secondKillSwitchLabel).reads === 2 &&
      secondKillHarness.getStats().generationCalls === 0,
    "Existing second kill-switch check remains before generation."
  );

  const failureNoFallbackLabel = await prepareLabel("groq-failure-no-fallback");
  const failureNoFallbackHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    generationError: new providerModule.PrivateAlphaProviderError(
      "groq_unavailable",
      "safe groq failure",
      503
    ),
  });
  const failureNoFallbackResolverKeys = [];
  const failureNoFallbackStore = createStore(failureNoFallbackLabel, {
    providerAdapterResolver(modelKey) {
      failureNoFallbackResolverKeys.push(modelKey);
      return failureNoFallbackHarness.adapter;
    },
  });
  const failureNoFallbackApproved = await createApprovedRun(
    failureNoFallbackStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "groq-failure-no-fallback"
  );
  const failureNoFallbackResult = await failureNoFallbackStore.executeRun(
    failureNoFallbackApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: failureNoFallbackApproved.approved.approvalScopeHash,
      expectedRevision: failureNoFallbackApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("groq-failure-no-fallback")
  );
  assert(
    JSON.stringify(failureNoFallbackResolverKeys) ===
      JSON.stringify([privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY]) &&
      failureNoFallbackHarness.getStats().generationCalls === 1 &&
      failureNoFallbackResult.errorCode === "groq_unavailable",
    "Groq 20B failure never retries, falls back, or substitutes another provider."
  );

  const historicalLabel = await prepareLabel("historical-groq-over-envelope");
  const historicalHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
  });
  let historicalResolverCalls = 0;
  const historicalStore = createStore(historicalLabel, {
    providerAdapterResolver() {
      historicalResolverCalls += 1;
      return historicalHarness.adapter;
    },
  });
  const historicalApproved = await createApprovedRun(
    historicalStore,
    privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    "historical-groq-over-envelope"
  );
  const historicalRun = await readRunJson(historicalLabel, historicalApproved.approved.runId);
  historicalRun.request.maximumOutputTokens = 700;
  historicalRun.approvalScope.normalizedRequestHash =
    storeModule.buildPrivateAlphaNormalizedRequestHash(historicalRun.request);
  historicalRun.approvalScope.maximumOutputTokens = 700;
  historicalRun.approvalScopeHash = storeModule.buildPrivateAlphaApprovalScopeHash(
    historicalRun.approvalScope
  );
  historicalRun.approval.approvalScopeHash = historicalRun.approvalScopeHash;
  await writeRunJson(historicalLabel, historicalRun);
  const historicalReadable = await historicalStore.getRun(historicalApproved.approved.runId);
  assert(
    historicalReadable.request.maximumOutputTokens === 700,
    "Historical Groq 513-4096 records remain readable."
  );

  setKillSwitchSequence(historicalLabel, [true], false);
  const historicalKillSwitchResult = await historicalStore.executeRun(
    historicalApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: historicalRun.approvalScopeHash,
      expectedRevision: historicalApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("historical-groq-kill-switch")
  );
  assert(
    historicalKillSwitchResult.errorCode === "kill_switch_blocked",
    "Historical over-envelope execution preserves the first kill-switch result when engaged."
  );

  await writeRunJson(historicalLabel, historicalRun);
  setKillSwitchSequence(historicalLabel, [false], false);
  historicalResolverCalls = 0;
  const historicalOverEnvelopeResult = await historicalStore.executeRun(
    historicalApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: historicalRun.approvalScopeHash,
      expectedRevision: historicalApproved.approved.revision,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    },
    idKey("historical-groq-over-envelope")
  );
  assert(
    historicalOverEnvelopeResult.responseStatus === 409 &&
      historicalOverEnvelopeResult.errorCode === "groq_output_too_large",
    "Historical over-envelope execution returns 409 with groq_output_too_large."
  );
  assert(
    getKillSwitchEntry(historicalLabel).reads === 1,
    "Historical over-envelope execution reads the kill switch exactly once."
  );
  assert(
    historicalResolverCalls === 0 &&
      historicalHarness.getStats().availabilityCalls === 0 &&
      historicalHarness.getStats().generationCalls === 0,
    "Historical over-envelope execution performs zero adapter, credential, availability, and generation calls."
  );
  assert(
    historicalOverEnvelopeResult.run.execution.status === "blocked",
    "Historical over-envelope execution persists one blocked attempt."
  );

  const localSuccessLabel = await prepareLabel("local-success");
  const localSuccessHarness = createAdapterHarness({
    identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    generationResult: {
      outputText: "local output",
      doneReason: "stop",
      totalDurationNanoseconds: 11,
      loadDurationNanoseconds: 1,
      promptEvalCount: 2,
      evalCount: 3,
    },
  });
  const localSuccessStore = createStore(localSuccessLabel, {
    providerAdapterResolver() {
      return localSuccessHarness.adapter;
    },
  });
  const localSuccessApproved = await createApprovedRun(
    localSuccessStore,
    privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    "local-success",
    4096
  );
  const localSuccessResult = await localSuccessStore.executeRun(
    localSuccessApproved.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: localSuccessApproved.approved.approvalScopeHash,
      expectedRevision: localSuccessApproved.approved.revision,
    },
    idKey("local-success")
  );
  assert(localSuccessResult.run.execution.provider === "ollama-local", "Local execution path still works after Slice M.");

  assert(fetchCallCount === 0, "global.fetch was never reached.");
  assert(groqCredentialReadCount === 0, "No deterministic test path resolved a Groq credential.");

  await Promise.all(
    [
      create512Label,
      create513Label,
      createLocal4096Label,
      missingExecutionFreeTierLabel,
      malformedExecutionConfirmationLabel,
      localConfirmationRejectedLabel,
      cloudTransferRequiredLabel,
      manualApprovalRequiredLabel,
      cloudExecutionRequiredLabel,
      killSwitchBeforeResolverLabel,
      identityMismatchLabel,
      successGroqLabel,
      secondKillSwitchLabel,
      failureNoFallbackLabel,
      historicalLabel,
      localSuccessLabel,
      routeOnlyLabel,
    ].map((label) => resetLabel(label))
  );
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$nodeScriptDirectory = Join-Path $root ".codexforge\private-alpha-tests\slice-m-smoke-tmp"
$nodeScriptPath = Join-Path $nodeScriptDirectory "codexforge-slice-m-smoke.js"
New-Item -ItemType Directory -Path $nodeScriptDirectory -Force | Out-Null
Set-Content -LiteralPath $nodeScriptPath -Value $nodeScript -Encoding ASCII

try {
  & node $nodeScriptPath $root "slice-m-free-first-automatic-routing"
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Node harness exited with code $LASTEXITCODE"
  }
} finally {
  Remove-Item -LiteralPath $nodeScriptPath -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $nodeScriptDirectory -Force -ErrorAction SilentlyContinue
}

Write-Host "[PASS] CodexForge Private Alpha free-first automatic routing policy integration smoke complete."
