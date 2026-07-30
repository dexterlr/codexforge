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

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
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

function Get-GitChangedPaths {
  $statusLines = @(
  (& git status --short --untracked-files=all 2>$null) |
      Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  )

  return $statusLines |
    ForEach-Object {
      if ($_.Length -lt 4) {
        throw "[FAIL] Unexpected git status line: $_"
      }

      $_.Substring(3).Trim() -replace "\\", "/"
    } |
    Sort-Object -Unique
}

Write-Host ""
Write-Host "=== CodexForge Private Alpha manual Groq execution foundation smoke ==="

$allowedChangedFiles = @(
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
$productFiles = @(
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
)
$parsedScripts = @(
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-live-execution-admission.ps1"
)

foreach ($path in $allowedChangedFiles) {
  Assert-FileExists ($path -replace '/', '\')
}

foreach ($path in $parsedScripts) {
  Assert-PowerShellParses $path
}

$changedPaths = Get-GitChangedPaths
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git scope contains exactly the twenty allowed Slice R files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git scope stays within the allowed Slice R files: $path"
}

$changedProductFiles = $changedPaths | Where-Object { $productFiles -contains $_ }
Assert-True ($changedProductFiles.Count -eq $productFiles.Count) "Only the intended Slice R qualification and controlled acceptance source paths changed"
foreach ($path in $productFiles) {
  Assert-True ($changedPaths -contains $path) "Intended Slice R source file changed: $path"
}

Assert-FileExists "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
Assert-Contains (Get-Text "src\lib\codexforge\private-alpha\private-alpha-api-client.ts") '${PRIVATE_ALPHA_API_BASE_PATH}/routing/free-first' "API client includes the free-first routing endpoint"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-Contains (Get-Text "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts") "approvedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS" "Groq adapter identities enforce the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq provider client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential resolver remains unchanged"
Assert-Contains (Get-Text "src\lib\codexforge\model-routing\model-routing-policy.server.ts") 'freeTierConfirmationState' "Model-routing policy applies the Free-tier confirmation gate"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$panelSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$cssSource = Get-Text "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$typesSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$validationSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-validation.ts"
$storeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$indexSource = Get-Text "src\lib\codexforge\private-alpha\index.ts"
$providerSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts"
$runtimeSource = Get-Text "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
$catalogSource = Get-Text "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$providerRegistrySource = Get-Text "src\lib\codexforge\model-routing\model-routing-provider-registry.ts"
$athenaAliasSource = Get-Text "src\app\athena\page.tsx"
$jarvisVideoSource = Get-Text "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Text "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$docSource = Get-Text "docs\codexforge-private-alpha-manual-groq-execution-foundation-v0.md"

Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "UI contains the cloud execution acknowledgement marker"
Assert-Contains $panelSource 'data-codexforge-private-alpha-cloud-execute="manual"' "UI contains the manual cloud execute marker"
Assert-Contains $panelSource 'cloudExecutionAcknowledgement: true' "Cloud execute payload includes cloudExecutionAcknowledgement true"
Assert-NotMatches $panelSource 'cloudExecutionAcknowledgement:\s*undefined' "Local execute payload omits an undefined cloud execution acknowledgement"
Assert-Contains $panelSource 'Execute once on Groq Cloud' "Approved Groq UI exposes the cloud execute control"
Assert-Contains $panelSource 'Execute once on local Ollama' "Approved local UI preserves the local execute control"
Assert-Contains $panelSource 'Checked server-side at execution' "UI does not claim Groq availability"
Assert-NotMatches $panelSource '\bfetch\s*\(' "UI contains no raw fetch"
Assert-NotMatches $panelSource 'https?://|api\.groq|api\.openai|process\.env|localStorage|sessionStorage|indexedDB' "UI contains no provider URL, env access, or browser storage"
Assert-Contains $cssSource '.privateAlphaCloudExecutionNotice' "CSS contains cloud execution notice styling"
Assert-Contains $cssSource '.privateAlphaCloudExecutionToggle' "CSS contains cloud execution toggle styling"
Assert-Contains $cssSource '.privateAlphaCloudExecutionMeta' "CSS contains cloud execution metadata styling"
Assert-Contains $cssSource '@media (max-width: 920px)' "CSS retains the 920px responsive layout"
Assert-NotMatches $cssSource '(?s)\{[^{}]*border\s*:[^{}]*border-(color|top|right|bottom|left)\s*:' "CSS avoids mixing border shorthand with border longhand"
Assert-Contains $typesSource 'export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;' "Record version remains 1"
Assert-Contains $typesSource 'export const PRIVATE_ALPHA_APPROVAL_BINDING_VERSION = 1 as const;' "Approval binding version remains 1"
Assert-Contains $typesSource 'export type PrivateAlphaCloudExecutionAcknowledgement =' "Cloud execution acknowledgement type is exported"
Assert-Contains $validationSource 'Execution still requires a separate explicit operator acknowledgement and action.' "Cloud approval statement is updated"
Assert-Contains $validationSource 'isPrivateAlphaCloudExecutionConfiguration' "Cloud execution configuration predicate is exported"
Assert-Contains $indexSource 'PrivateAlphaCloudExecutionAcknowledgement' "Client-safe index exports the cloud execution acknowledgement type"
Assert-Contains $indexSource 'PrivateAlphaLocalExecutionRecord' "Client-safe index exports the local execution record type"
Assert-Contains $indexSource 'PrivateAlphaGroq20bExecutionRecord' "Client-safe index exports the Groq 20B execution record type"
Assert-Contains $indexSource 'PrivateAlphaGroq120bExecutionRecord' "Client-safe index exports the Groq 120B execution record type"
Assert-Contains $providerSource 'PrivateAlphaProviderExecutionErrorCode = PrivateAlphaProviderExecutionErrorCode' "Provider error default generic carries the full provider execution domain"
Assert-Contains $storeSource 'createPrivateAlphaProviderAdapterForModelKey' "Store imports the exact-model runtime resolver"
Assert-Contains $storeSource 'providerAdapterResolver' "Store supports the deterministic adapter resolver hook"
Assert-NotMatches $storeSource 'routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store introduces no routing or retry orchestration"
Assert-Contains $catalogSource '"codexforge-model-routing-v4"' "Model-routing catalog is v4"
Assert-Contains $providerRegistrySource 'automaticRoutingAdmission: automatic ?' "Groq registry admission construction uses the automatic conditional"
Assert-Contains $providerRegistrySource 'const automatic = acceptedModel.modelKey === CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.automaticModelKey;' "Groq registry binds automatic admission to the exact Groq 20B key"
Assert-Contains $providerRegistrySource 'if (model.modelKey === "groq-cloud::openai/gpt-oss-20b" && (model.approvedMaximumOutputTokens !== 512 || model.routingState !== "automatic" || model.automaticRoutingAdmission?.admissionId !== "codexforge-groq-automatic-routing-admission-v1" || !hasExactOrder(model.automaticRoutingAdmission.modes, ["free-first"]))) errors.push("Groq 20B admission is invalid");' "Groq 20B registry entry is automatic, free-first, and retains the admitted 512-token envelope"
Assert-Contains $providerRegistrySource 'if (model.modelKey === "groq-cloud::openai/gpt-oss-120b" && (model.approvedMaximumOutputTokens !== 512 || model.routingState !== "manual-only" || model.automaticRoutingAdmission !== null)) errors.push("Groq 120B admission is invalid");' "Groq 120B registry entry is manual-only, non-admitted, and retains the admitted 512-token envelope"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"
foreach ($marker in @("Mission brief", "Blocked action command deck", "Release summary")) {
  Assert-Contains $jarvisVideoSource $marker "/jarvis-video retains marker $marker"
}
Assert-Contains $navigationTypesSource 'commandDeckRole: CodexForgeCommandDeckRole;' "commandDeckRole remains strongly typed"
Assert-Contains $docSource 'The next step is live acceptance of the exact 20B and 120B paths' "Documentation does not claim live acceptance already happened"

$modifiedSourcePaths = @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
)
$plainTokenPattern = '(:\s*any\b|<\s*any\s*>|\bArray<\s*any\s*>|\bReadonlyArray<\s*any\s*>|\bRecord<[^>]*,\s*any\s*>)'
$asTokenPattern = '\b' + 'as ' + 'a' + 'ny' + '\b'
$noCheckPattern = 'ts-' + 'nocheck'
$expectErrorPattern = 'ts-' + 'expect-error'
foreach ($path in $modifiedSourcePaths) {
  $sourceText = Get-Text $path
  Assert-NotMatches $sourceText $plainTokenPattern "$path excludes the plain any token"
  Assert-NotMatches $sourceText $asTokenPattern "$path excludes the as any escape"
  Assert-NotMatches $sourceText $noCheckPattern "$path excludes ts-nocheck"
  Assert-NotMatches $sourceText $expectErrorPattern "$path excludes ts-expect-error"
}

$productionPath = Join-Path $root ".codexforge\private-alpha"
$productionSnapshotBefore = @()
if (Test-Path -LiteralPath $productionPath) {
  $productionSnapshotBefore = Get-ChildItem -LiteralPath $productionPath -Recurse -File |
    Sort-Object FullName |
    ForEach-Object { "$($_.FullName)|$($_.Length)|$($_.LastWriteTimeUtc.Ticks)" }
}

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const Module = require("module");
const ts = require("typescript");

async function main() {
  const repoRoot = process.argv[2];
  const testSuffix = process.argv[3];
  const killSwitchStateByLabel = new Map();
  let fetchCallCount = 0;
  let groqCredentialLoadCount = 0;
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
    throw new Error("fetch should not run in the Slice K smoke");
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
      groqCredentialLoadCount += 1;
      return originalLoad.apply(this, arguments);
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

  const typesModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-types.ts"
  ));
  const privateAlpha = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "index.ts"
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
  groqCredentialLoadCount = 0;

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
    console.log(`[PASS] ${message}`);
  }

  async function expectStoreError(work, expectedStatus, expectedMessage) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof storeModule.PrivateAlphaStoreError,
        "Expected PrivateAlphaStoreError."
      );
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      if (expectedMessage) {
        assert(error.message === expectedMessage, `Expected exact message ${expectedMessage}.`);
      }
      return error;
    }

    throw new Error(`Expected PrivateAlphaStoreError status ${expectedStatus}.`);
  }

  function expectValidationFailure(result, expectedStatus) {
    assert(result && result.ok === false, `Expected validation failure with status ${expectedStatus}.`);
    assert(result.status === expectedStatus, `Validation status ${expectedStatus} is preserved.`);
  }

  function sha256(value) {
    return crypto.createHash("sha256").update(value, "utf8").digest("hex");
  }

  function toAbsolutePath(relativeLabel) {
    return path.join(repoRoot, ...relativeLabel.split("/"));
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

  async function resetLabel(label) {
    assert(
      label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`),
      "Only private-alpha test roots may be used."
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
            approvedMaximumOutputTokens === undefined ? 4096 : approvedMaximumOutputTokens,
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
            approvedMaximumOutputTokens === undefined ? 4096 : approvedMaximumOutputTokens,
        };
      default:
        throw new Error(`Unsupported model key ${modelKey}`);
    }
  }

  function createAdapterHarness(options) {
    let availabilityCalls = 0;
    let generationCalls = 0;
    const generationInputs = [];

    const adapter = {
      identity: options.identity,
      async getAvailability() {
        availabilityCalls += 1;
        if (options.onAvailability) {
          await options.onAvailability();
        }
        if (options.availabilityError) {
          throw options.availabilityError;
        }

        return (
          options.availability || {
            providerAvailable: true,
            modelAvailable: true,
            quotaState: "available",
            errorCode: null,
            safeErrorMessage: null,
          }
        );
      },
      async generateApprovedText(input) {
        generationCalls += 1;
        generationInputs.push({
          approvedRequestText: input.approvedRequestText,
          model: input.model,
          maximumOutputTokens: input.maximumOutputTokens,
        });
        if (options.onGenerate) {
          await options.onGenerate(input);
        }
        if (options.generationError) {
          throw options.generationError;
        }

        return (
          options.generationResult || {
            outputText: " visible output \n",
            doneReason: "stop",
            totalDurationNanoseconds: 111,
            loadDurationNanoseconds: 22,
            promptEvalCount: 33,
            evalCount: 44,
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
          generationInputs: generationInputs.map((entry) => ({ ...entry })),
        };
      },
    };
  }

  function createStore(label, options) {
    return storeModule.createPrivateAlphaStore({
      dataRootLabel: label,
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      providerAdapter: options.providerAdapter,
      providerAdapterResolver: options.providerAdapterResolver,
    });
  }

  function getRunFileAbsolutePath(label, runId) {
    return path.join(toAbsolutePath(label), "runs", `${runId}.json`);
  }

  async function readRunJson(label, runId) {
    return JSON.parse(await fsp.readFile(getRunFileAbsolutePath(label, runId), "utf8"));
  }

  async function writeRunJson(label, run) {
    await fsp.writeFile(
      getRunFileAbsolutePath(label, run.runId),
      `${JSON.stringify(run, null, 2)}\n`,
      "utf8"
    );
  }

  async function createApprovedRun(store, modelKey, scenarioName) {
    const created = await store.createRun(
      {
        requestText:
          modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
            ? "Local request body."
            : "Approved Groq request.",
        capability:
          modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ? "code" : "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 256,
        ...(modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
          ? {}
          : { modelKey }),
      },
      `${scenarioName}-create-0001`
    );

    const approved = await store.approveRun(created.run.runId, {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: created.run.revision,
      ...(modelKey === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
        ? {}
        : { cloudDataTransferAcknowledgement: true }),
    });

    return { created, approved };
  }

  try {
    assert(
      typesModule.PRIVATE_ALPHA_RECORD_VERSION === 1,
      "Record version remains 1."
    );
    assert(
      typesModule.PRIVATE_ALPHA_APPROVAL_BINDING_VERSION === 1,
      "Approval binding version remains 1."
    );
    assert(
      JSON.stringify(typesModule.PRIVATE_ALPHA_RUNTIME_MODEL_KEYS) ===
        JSON.stringify([
          "ollama-local::gpt-oss:20b",
          "groq-cloud::openai/gpt-oss-20b",
          "groq-cloud::openai/gpt-oss-120b",
        ]),
      "Runtime model-key values and ordering remain unchanged."
    );
    assert(
      JSON.stringify(typesModule.PRIVATE_ALPHA_PROVIDER_PREFERENCES) ===
        JSON.stringify(["auto", "ollama-local", "groq-cloud"]),
      "Provider-preference ordering remains unchanged."
    );
    assert(
      JSON.stringify(typesModule.PRIVATE_ALPHA_EXECUTION_MODES) ===
        JSON.stringify([
          "locked-until-provider-slice",
          "manual-approved-local-provider",
          "manual-approved-cloud-provider-locked",
        ]),
      "Execution-mode values and ordering remain unchanged."
    );
    assert(
      JSON.stringify(typesModule.PRIVATE_ALPHA_EXECUTION_ERROR_CODES) ===
        JSON.stringify([
          "kill_switch_blocked",
          "ollama_unavailable",
          "ollama_model_missing",
          "ollama_timeout",
          "ollama_http_error",
          "ollama_malformed_response",
          "ollama_empty_response",
          "ollama_output_too_large",
        ]),
      "Local execution errors remain in exact original order."
    );

    const executeValidationOmitted = privateAlpha.validatePrivateAlphaExecuteInput({
      execute: true,
      acknowledgement: true,
      approvalScopeHash: "a".repeat(64),
      expectedRevision: 2,
    });
    assert(executeValidationOmitted.ok, "Execute input accepts omitted cloud acknowledgement.");
    assert(
      !Object.prototype.hasOwnProperty.call(
        executeValidationOmitted.value,
        "cloudExecutionAcknowledgement"
      ),
      "Local execute payload remains unchanged when the cloud property is absent."
    );

    const executeValidationTrue = privateAlpha.validatePrivateAlphaExecuteInput({
      execute: true,
      acknowledgement: true,
      approvalScopeHash: "b".repeat(64),
      expectedRevision: 3,
      cloudExecutionAcknowledgement: true,
      groqFreeTierExecutionConfirmation: true,
    });
    assert(executeValidationTrue.ok, "Execute input accepts cloud acknowledgement true.");
    expectValidationFailure(
      privateAlpha.validatePrivateAlphaExecuteInput({
        execute: true,
        acknowledgement: true,
        approvalScopeHash: "c".repeat(64),
        expectedRevision: 4,
        cloudExecutionAcknowledgement: false,
      }),
      400
    );
    expectValidationFailure(
      privateAlpha.validatePrivateAlphaExecuteInput({
        execute: true,
        acknowledgement: true,
        approvalScopeHash: "d".repeat(64),
        expectedRevision: 4,
        cloudExecutionAcknowledgement: null,
      }),
      400
    );
    expectValidationFailure(
      privateAlpha.validatePrivateAlphaExecuteInput({
        execute: true,
        acknowledgement: true,
        approvalScopeHash: "e".repeat(64),
        expectedRevision: 4,
        cloudExecutionAcknowledgement: "true",
      }),
      400
    );
    expectValidationFailure(
      privateAlpha.validatePrivateAlphaExecuteInput({
        execute: true,
        acknowledgement: true,
        approvalScopeHash: "f".repeat(64),
        expectedRevision: 4,
        cloudExecutionAcknowledgement: 1,
      }),
      400
    );

    const serializedGroqRequest = privateAlpha.serializePrivateAlphaRunRequest(
      privateAlpha.buildPrivateAlphaRunRequest({
        requestText: "Exact Groq request.",
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 64,
        modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      })
    );
    assert(
      serializedGroqRequest ===
        '{"normalizedRequestText":"Exact Groq request.","redactedPreview":"Exact Groq request.","capability":"text","providerPreference":"groq-cloud","modelPreferenceLabel":"openai/gpt-oss-20b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-cloud-provider-locked","bindingVersion":1,"modelKey":"groq-cloud::openai/gpt-oss-20b","dataBoundary":"cloud-provider","cloudDataTransferRequirement":"explicit-operator-acknowledgement-required"}',
      "Existing request serialization is unchanged."
    );
    const serializationRequest = privateAlpha.buildPrivateAlphaRunRequest({
      requestText: "Exact scope request.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    });
    const serializationScope = privateAlpha.buildPrivateAlphaApprovalScope({
      runId: "111111111111111111111111",
      request: serializationRequest,
      normalizedRequestHash:
        storeModule.buildPrivateAlphaNormalizedRequestHash(serializationRequest),
    });
    assert(
      privateAlpha.serializePrivateAlphaApprovalScope(serializationScope) ===
        `{"runId":"111111111111111111111111","capability":"text","normalizedRequestHash":"${storeModule.buildPrivateAlphaNormalizedRequestHash(serializationRequest)}","providerPreference":"groq-cloud","modelPreferenceLabel":"openai/gpt-oss-120b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-cloud-provider-locked","bindingVersion":1,"modelKey":"groq-cloud::openai/gpt-oss-120b","dataBoundary":"cloud-provider","cloudDataTransferRequirement":"explicit-operator-acknowledgement-required"}`,
      "Existing approval-scope serialization is unchanged."
    );
    assert(
      storeModule.buildPrivateAlphaApprovalScopeHash(serializationScope) ===
        sha256(privateAlpha.serializePrivateAlphaApprovalScope(serializationScope)),
      "Existing approval-scope hashes remain valid."
    );

    const statusLabel = await prepareLabel("status");
    const localStatusHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
      availability: {
        providerAvailable: true,
        modelAvailable: true,
        quotaState: "not-applicable",
        errorCode: null,
        safeErrorMessage: null,
      },
    });
    const statusResolverKeys = [];
    const statusStore = createStore(statusLabel, {
      providerAdapterResolver(modelKey) {
        statusResolverKeys.push(modelKey);
        return localStatusHarness.adapter;
      },
    });
    const statusResult = await statusStore.getStatus();
    assert(statusResult.providerExecution === "local-ollama", "getStatus remains local only.");
    assert(statusResolverKeys.length === 1, "getStatus resolves only one local adapter.");
    assert(
      statusResolverKeys[0] === privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      "getStatus never resolves a Groq adapter."
    );
    assert(groqCredentialLoadCount === 0, "getStatus never reads a Groq credential.");

    const localAckLabel = await prepareLabel("local-ack");
    const localAckHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
    });
    const localAckStore = createStore(localAckLabel, {
      providerAdapterResolver() {
        return localAckHarness.adapter;
      },
    });
    const localApproved = await createApprovedRun(
      localAckStore,
      privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      "local-ack"
    );
    await expectStoreError(
      () =>
        localAckStore.executeRun(
          localApproved.approved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: localApproved.approved.approvalScopeHash,
            expectedRevision: localApproved.approved.revision,
            cloudExecutionAcknowledgement: true,
          },
          "local-ack-execute-0001"
        ),
      409,
      "Cloud execution acknowledgement is not allowed for local execution."
    );

    const missingAckLabel = await prepareLabel("missing-cloud-ack");
    const missingAckResolverKeys = [];
    const missingAckHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    });
    const missingAckStore = createStore(missingAckLabel, {
      providerAdapterResolver(modelKey) {
        missingAckResolverKeys.push(modelKey);
        return missingAckHarness.adapter;
      },
    });
    const missingAckRun = await createApprovedRun(
      missingAckStore,
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "missing-cloud-ack"
    );
    const beforeMissingAck = await missingAckStore.getRun(missingAckRun.approved.runId);
    await expectStoreError(
      () =>
        missingAckStore.executeRun(
          missingAckRun.approved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: missingAckRun.approved.approvalScopeHash,
            expectedRevision: missingAckRun.approved.revision,
            groqFreeTierExecutionConfirmation: true,
          },
          "missing-cloud-ack-execute-0001"
        ),
      409,
      "Cloud execution acknowledgement is required for this exact approved scope."
    );
    const afterMissingAck = await missingAckStore.getRun(missingAckRun.approved.runId);
    assert(
      getKillSwitchEntry(missingAckLabel).reads === 0,
      "Cloud acknowledgement failure occurs before kill-switch inspection."
    );
    assert(
      missingAckResolverKeys.length === 0,
      "Cloud acknowledgement failure occurs before adapter resolution."
    );
    assert(afterMissingAck.execution === null, "Cloud acknowledgement failure creates no execution record.");
    assert(
      afterMissingAck.auditEvents.length === beforeMissingAck.auditEvents.length,
      "Cloud acknowledgement failure creates no execution audit event."
    );
    assert(afterMissingAck.state === "approved", "Cloud acknowledgement failure leaves the approved run unchanged.");

    const blockedLabel = await prepareLabel("pre-resolver-kill-switch");
    setKillSwitchSequence(blockedLabel, [true], true);
    const blockedResolverKeys = [];
    const blockedHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    });
    const blockedStore = createStore(blockedLabel, {
      providerAdapterResolver(modelKey) {
        blockedResolverKeys.push(modelKey);
        return blockedHarness.adapter;
      },
    });
    const blockedApproved = await createApprovedRun(
      blockedStore,
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "pre-resolver-kill-switch"
    );
    const blockedResult = await blockedStore.executeRun(
      blockedApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: blockedApproved.approved.approvalScopeHash,
        expectedRevision: blockedApproved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "pre-resolver-kill-switch-execute-0001"
    );
    assert(blockedResolverKeys.length === 0, "Pre-resolver kill-switch block makes no adapter call.");
    assert(blockedResult.responseStatus === 409, "Pre-resolver kill-switch block returns 409.");
    assert(blockedResult.run.state === "blocked", "Pre-resolver kill-switch block persists blocked state.");
    assert(
      blockedResult.run.execution.provider === "groq-cloud" &&
        blockedResult.run.execution.model === "openai/gpt-oss-20b" &&
        blockedResult.run.execution.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "Pre-resolver kill-switch block persists exact Groq target identity."
    );
    assert(blockedResult.run.execution.status === "blocked", "Pre-resolver kill-switch block consumes one attempt.");

    for (const mismatch of [
      { name: "provider", identity: { ...buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY), providerId: "ollama-local" } },
      { name: "model", identity: { ...buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY), modelId: "openai/gpt-oss-120b" } },
      { name: "modelKey", identity: { ...buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY), modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY } },
      { name: "dataBoundary", identity: { ...buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY), dataBoundary: "local-machine" } },
      { name: "outputLimit", identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, 32) },
    ]) {
      const label = await prepareLabel(`identity-${mismatch.name}`);
      const harness = createAdapterHarness({ identity: mismatch.identity });
      const store = createStore(label, {
        providerAdapterResolver() {
          return harness.adapter;
        },
      });
      const approvedRun = await createApprovedRun(
        store,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        `identity-${mismatch.name}`
      );
      await expectStoreError(
        () =>
          store.executeRun(
            approvedRun.approved.runId,
            {
              execute: true,
              acknowledgement: true,
              approvalScopeHash: approvedRun.approved.approvalScopeHash,
              expectedRevision: approvedRun.approved.revision,
              cloudExecutionAcknowledgement: true,
              groqFreeTierExecutionConfirmation: true,
            },
            `identity-${mismatch.name}-execute-0001`
          ),
        409,
        "Resolved provider adapter does not match the approved execution scope."
      );
      assert(harness.getStats().availabilityCalls === 0, `Identity mismatch ${mismatch.name} makes no availability call.`);
      assert(harness.getStats().generationCalls === 0, `Identity mismatch ${mismatch.name} makes no generation call.`);
      const identityRun = await store.getRun(approvedRun.approved.runId);
      assert(identityRun.execution === null, `Identity mismatch ${mismatch.name} creates no execution record.`);
    }

    const availabilityCases = [
      { code: "groq_credential_missing", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_authentication_failed", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_rate_limited", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_quota_exhausted", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_unavailable", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_model_unavailable", status: 503, providerAvailable: true, modelAvailable: false },
      { code: "groq_timeout", status: 504, providerAvailable: false, modelAvailable: false },
      { code: "groq_http_error", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_malformed_response", status: 503, providerAvailable: false, modelAvailable: false },
      { code: "groq_output_too_large", status: 503, providerAvailable: false, modelAvailable: false },
    ];
    for (const entry of availabilityCases) {
      const label = await prepareLabel(`availability-${entry.code}`);
      const harness = createAdapterHarness({
        identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
        availability: {
          providerAvailable: entry.providerAvailable,
          modelAvailable: entry.modelAvailable,
          quotaState: entry.code === "groq_quota_exhausted" ? "exhausted" : "unknown",
          errorCode: entry.code,
          safeErrorMessage: `safe ${entry.code}`,
        },
      });
      const resolverKeys = [];
      const store = createStore(label, {
        providerAdapterResolver(modelKey) {
          resolverKeys.push(modelKey);
          return harness.adapter;
        },
      });
      const approvedRun = await createApprovedRun(
        store,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        `availability-${entry.code}`
      );
      const result = await store.executeRun(
        approvedRun.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedRun.approved.approvalScopeHash,
          expectedRevision: approvedRun.approved.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: true,
        },
        `availability-${entry.code}-execute-0001`
      );
      assert(resolverKeys.length === 1, `Resolver is called exactly once for ${entry.code}.`);
      assert(harness.getStats().availabilityCalls === 1, `Availability is called exactly once for ${entry.code}.`);
      assert(harness.getStats().generationCalls === 0, `Availability block performs no generation call for ${entry.code}.`);
      assert(result.responseStatus === entry.status, `Availability block maps ${entry.code} to the expected status.`);
      assert(result.run.state === "blocked", `Availability block persists blocked state for ${entry.code}.`);
      assert(result.run.execution.errorCode === entry.code, `Availability block persists exact error code for ${entry.code}.`);
      assert(result.run.execution.safeErrorMessage === `safe ${entry.code}`, `Availability block persists exact safe message for ${entry.code}.`);
      assert(result.run.execution.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, `Availability block preserves exact modelKey for ${entry.code}.`);
    }

    const secondKillLabel = await prepareLabel("second-kill-switch");
    setKillSwitchSequence(secondKillLabel, [false, true], true);
    const secondKillHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    });
    const secondKillStore = createStore(secondKillLabel, {
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
      "second-kill-switch-execute-0001"
    );
    assert(secondKillHarness.getStats().availabilityCalls === 1, "Availability is checked before the second kill-switch block.");
    assert(secondKillHarness.getStats().generationCalls === 0, "Second kill-switch block creates no generation call.");
    assert(secondKillResult.run.execution.status === "blocked", "Second kill-switch block persists blocked state.");
    assert(getKillSwitchEntry(secondKillLabel).reads === 2, "Second kill-switch check occurs before generation.");

    const success20Label = await prepareLabel("groq-success-20");
    let executingSnapshot = null;
    const success20Harness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
      async onGenerate() {
        const runFiles = await fsp.readdir(path.join(toAbsolutePath(success20Label), "runs"));
        executingSnapshot = JSON.parse(
          await fsp.readFile(
            path.join(toAbsolutePath(success20Label), "runs", runFiles[0]),
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
    const success20ResolverKeys = [];
    const success20Store = createStore(success20Label, {
      providerAdapterResolver(modelKey) {
        success20ResolverKeys.push(modelKey);
        return success20Harness.adapter;
      },
    });
    const success20Approved = await createApprovedRun(
      success20Store,
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "groq-success-20"
    );
    const success20Result = await success20Store.executeRun(
      success20Approved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: success20Approved.approved.approvalScopeHash,
        expectedRevision: success20Approved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "groq-success-20-execute-0001"
    );
    assert(success20ResolverKeys.length === 1, "Resolver is called exactly once per new 20B attempt.");
    assert(success20ResolverKeys[0] === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, "Exact Groq 20B approved run resolves only the 20B key.");
    assert(success20Harness.getStats().availabilityCalls === 1, "20B availability is called exactly once.");
    assert(success20Harness.getStats().generationCalls === 1, "Successful 20B execution calls generation exactly once.");
    assert(executingSnapshot !== null && executingSnapshot.state === "executing", "Executing record is written before generation.");
    assert(executingSnapshot.auditEvents.some((event) => event.eventType === "execution.started"), "execution.started is persisted before generation.");
    assert(success20Result.run.execution.outputText === "  exact cloud output  ", "Output text is preserved exactly, including surrounding whitespace.");
    assert(success20Result.run.execution.outputSha256 === sha256("  exact cloud output  "), "Output SHA-256 matches the exact output.");
    assert(success20Result.run.execution.doneReason === "stop", "doneReason is persisted.");
    assert(success20Result.run.execution.totalDurationNanoseconds === 101, "totalDurationNanoseconds is persisted.");
    assert(success20Result.run.execution.loadDurationNanoseconds === 11, "loadDurationNanoseconds is persisted.");
    assert(success20Result.run.execution.promptEvalCount === 12, "promptEvalCount is persisted.");
    assert(success20Result.run.execution.evalCount === 13, "evalCount is persisted.");
    assert(success20Result.run.execution.bindingVersion === 1, "Groq execution record contains bindingVersion 1.");
    assert(success20Result.run.execution.modelKey === privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY, "Groq execution record contains the exact modelKey.");
    assert(success20Result.run.execution.dataBoundary === "cloud-provider", "Groq execution record contains the cloud-provider boundary.");
    assert(success20Result.run.execution.cloudExecutionAcknowledgement === "granted-for-approved-scope-execution", "Groq execution record contains the exact execution acknowledgement.");
    assert(success20Harness.getStats().generationInputs[0].approvedRequestText === success20Approved.approved.request.normalizedRequestText, "Generation receives the exact persisted normalized request text.");
    assert(success20Harness.getStats().generationInputs[0].model === "openai/gpt-oss-20b", "Generation receives the exact 20B model.");
    assert(success20Harness.getStats().generationInputs[0].maximumOutputTokens === success20Approved.approved.request.maximumOutputTokens, "Generation receives the exact approved maximum output tokens.");
    assert(success20Result.run.auditEvents.some((event) => event.summary.includes("openai/gpt-oss-20b")), "Success audit names the exact safe Groq model.");
    const replay20 = await success20Store.executeRun(
      success20Approved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: success20Approved.approved.approvalScopeHash,
        expectedRevision: success20Approved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "groq-success-20-execute-0001"
    );
    assert(replay20.replayed === true, "Same idempotency key replays success.");
    assert(success20Harness.getStats().generationCalls === 1, "Replay success makes no additional generation call.");
    await expectStoreError(
      () =>
        success20Store.executeRun(
          success20Approved.approved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: success20Approved.approved.approvalScopeHash,
            expectedRevision: success20Approved.approved.revision,
            cloudExecutionAcknowledgement: true,
            groqFreeTierExecutionConfirmation: true,
          },
          "groq-success-20-execute-0002"
        ),
      409,
      "This run has already started its one allowed execution attempt."
    );

    const success120Label = await prepareLabel("groq-success-120");
    const success120Harness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY),
      generationResult: {
        outputText: "120b output",
        doneReason: "stop",
        totalDurationNanoseconds: 202,
        loadDurationNanoseconds: 22,
        promptEvalCount: 23,
        evalCount: 24,
      },
    });
    const success120ResolverKeys = [];
    const success120Store = createStore(success120Label, {
      providerAdapterResolver(modelKey) {
        success120ResolverKeys.push(modelKey);
        return success120Harness.adapter;
      },
    });
    const success120Approved = await createApprovedRun(
      success120Store,
      privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
      "groq-success-120"
    );
    const success120Result = await success120Store.executeRun(
      success120Approved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: success120Approved.approved.approvalScopeHash,
        expectedRevision: success120Approved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "groq-success-120-execute-0001"
    );
    assert(success120ResolverKeys[0] === privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY, "Exact Groq 120B approved run resolves only the 120B key.");
    assert(success120Harness.getStats().generationCalls === 1, "Successful 120B execution calls generation exactly once.");
    assert(success120Result.run.execution.model === "openai/gpt-oss-120b", "Successful 120B execution persists the exact model.");

    const generationCodes = [
      "groq_credential_missing",
      "groq_authentication_failed",
      "groq_rate_limited",
      "groq_quota_exhausted",
      "groq_unavailable",
      "groq_model_unavailable",
      "groq_timeout",
      "groq_http_error",
      "groq_malformed_response",
      "groq_empty_response",
      "groq_output_too_large",
    ];
    for (const code of generationCodes) {
      const label = await prepareLabel(`groq-error-${code}`);
      const harness = createAdapterHarness({
        identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
        generationError: new providerModule.PrivateAlphaProviderError(
          code,
          `safe ${code}`,
          code === "groq_timeout" ? 504 : 503
        ),
      });
      const store = createStore(label, {
        providerAdapterResolver() {
          return harness.adapter;
        },
      });
      const approvedRun = await createApprovedRun(
        store,
        privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        `groq-error-${code}`
      );
      const result = await store.executeRun(
        approvedRun.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: approvedRun.approved.approvalScopeHash,
          expectedRevision: approvedRun.approved.revision,
          cloudExecutionAcknowledgement: true,
          groqFreeTierExecutionConfirmation: true,
        },
        `groq-error-${code}-execute-0001`
      );
      assert(result.run.execution.errorCode === code, `Known Groq generation error ${code} is persisted with the exact code.`);
      assert(result.run.execution.safeErrorMessage === `safe ${code}`, `Known Groq generation error ${code} preserves the safe message.`);
      if (code === "groq_timeout") {
        assert(result.responseStatus === 504, "Groq timeout maps to 504.");
      }
      if (
        code === "groq_credential_missing" ||
        code === "groq_authentication_failed" ||
        code === "groq_rate_limited" ||
        code === "groq_quota_exhausted" ||
        code === "groq_unavailable" ||
        code === "groq_model_unavailable" ||
        code === "groq_empty_response"
      ) {
        assert(result.responseStatus === 503, `Safe 503 mapping is preserved for ${code}.`);
      }
    }

    const unknownGroqLabel = await prepareLabel("groq-unknown-error");
    const unknownGroqHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
      generationError: new Error("unexpected"),
    });
    const unknownGroqStore = createStore(unknownGroqLabel, {
      providerAdapterResolver() {
        return unknownGroqHarness.adapter;
      },
    });
    const unknownGroqApproved = await createApprovedRun(
      unknownGroqStore,
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "groq-unknown-error"
    );
    const unknownGroqResult = await unknownGroqStore.executeRun(
      unknownGroqApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: unknownGroqApproved.approved.approvalScopeHash,
        expectedRevision: unknownGroqApproved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "groq-unknown-error-execute-0001"
    );
    assert(unknownGroqResult.errorCode === "groq_http_error", "Unknown Groq error maps to groq_http_error.");
    assert(unknownGroqResult.safeErrorMessage === "Groq Cloud execution failed unexpectedly.", "Unknown Groq error uses the bounded unexpected-failure message.");
    assert(unknownGroqResult.responseStatus === 500, "Unknown Groq error returns 500.");
    const unknownReplay = await unknownGroqStore.executeRun(
      unknownGroqApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: unknownGroqApproved.approved.approvalScopeHash,
        expectedRevision: unknownGroqApproved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "groq-unknown-error-execute-0001"
    );
    assert(unknownReplay.replayed === true, "Same idempotency key replays failure.");

    const localSuccessLabel = await prepareLabel("local-success");
    const localSuccessHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
      availability: {
        providerAvailable: true,
        modelAvailable: true,
        quotaState: "not-applicable",
        errorCode: null,
        safeErrorMessage: null,
      },
      generationResult: {
        outputText: "local visible output",
        doneReason: "stop",
        totalDurationNanoseconds: 303,
        loadDurationNanoseconds: 33,
        promptEvalCount: 34,
        evalCount: 35,
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
      "local-success"
    );
    const localSuccessResult = await localSuccessStore.executeRun(
      localSuccessApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: localSuccessApproved.approved.approvalScopeHash,
        expectedRevision: localSuccessApproved.approved.revision,
      },
      "local-success-execute-0001"
    );
    assert(localSuccessResult.run.execution.provider === "ollama-local", "Existing local fake-adapter success still passes.");
    assert(localSuccessResult.run.execution.outputSha256 === sha256("local visible output"), "Existing local output hashing remains unchanged.");
    assert(localSuccessResult.run.auditEvents.some((event) => event.summary === "Local Ollama execution succeeded and output was persisted."), "Existing local audit wording remains unchanged.");

    const localBlockedLabel = await prepareLabel("local-blocked");
    const localBlockedHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
      availability: {
        providerAvailable: false,
        modelAvailable: false,
        quotaState: "not-applicable",
        errorCode: "ollama_unavailable",
        safeErrorMessage: "local unavailable",
      },
    });
    const localBlockedStore = createStore(localBlockedLabel, {
      providerAdapterResolver() {
        return localBlockedHarness.adapter;
      },
    });
    const localBlockedApproved = await createApprovedRun(
      localBlockedStore,
      privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      "local-blocked"
    );
    const localBlockedResult = await localBlockedStore.executeRun(
      localBlockedApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: localBlockedApproved.approved.approvalScopeHash,
        expectedRevision: localBlockedApproved.approved.revision,
      },
      "local-blocked-execute-0001"
    );
    assert(localBlockedResult.run.state === "blocked", "Existing local availability block still passes.");

    const localFailedLabel = await prepareLabel("local-failed");
    const localFailedHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY),
      generationError: new providerModule.PrivateAlphaProviderError(
        "ollama_http_error",
        "local safe error",
        503
      ),
    });
    const localFailedStore = createStore(localFailedLabel, {
      providerAdapterResolver() {
        return localFailedHarness.adapter;
      },
    });
    const localFailedApproved = await createApprovedRun(
      localFailedStore,
      privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      "local-failed"
    );
    const localFailedResult = await localFailedStore.executeRun(
      localFailedApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: localFailedApproved.approved.approvalScopeHash,
        expectedRevision: localFailedApproved.approved.revision,
      },
      "local-failed-execute-0001"
    );
    assert(localFailedResult.run.state === "failed", "Existing local failure still passes.");

    const malformedLabel = await prepareLabel("malformed");
    const malformedHarness = createAdapterHarness({
      identity: buildIdentity(privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY),
    });
    const malformedStore = createStore(malformedLabel, {
      providerAdapterResolver() {
        return malformedHarness.adapter;
      },
    });
    const malformedApproved = await createApprovedRun(
      malformedStore,
      privateAlpha.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      "malformed"
    );
    const malformedSuccess = await malformedStore.executeRun(
      malformedApproved.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: malformedApproved.approved.approvalScopeHash,
        expectedRevision: malformedApproved.approved.revision,
        cloudExecutionAcknowledgement: true,
        groqFreeTierExecutionConfirmation: true,
      },
      "malformed-execute-0001"
    );
    const malformedBaseRun = await readRunJson(malformedLabel, malformedSuccess.run.runId);
    const malformedVariants = [
      (run) => ({ ...run, execution: { ...run.execution, provider: "ollama-local", model: "openai/gpt-oss-20b" } }),
      (run) => ({ ...run, execution: { ...run.execution, dataBoundary: "local-machine" } }),
      (run) => ({ ...run, execution: { ...run.execution, modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY } }),
      (run) => ({ ...run, execution: { ...run.execution, cloudExecutionAcknowledgement: "wrong-value" } }),
      (run) => ({ ...run, execution: { ...run.execution, bindingVersion: 2 } }),
      (run) => ({ ...run, execution: { ...run.execution, errorCode: "ollama_http_error" } }),
      (run) => ({ ...run, approvalScope: { ...run.approvalScope, modelKey: privateAlpha.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY } }),
    ];
    for (let index = 0; index < malformedVariants.length; index += 1) {
      await writeRunJson(malformedLabel, malformedVariants[index](malformedBaseRun));
      await expectStoreError(
        () => malformedStore.getRun(malformedSuccess.run.runId),
        500,
        "Persisted run record is malformed."
      );
    }

    assert(fetchCallCount === 0, "No live provider call occurs.");
    assert(groqCredentialLoadCount === 0, "No Groq credential is read by the fake-adapter smoke.");

    await Promise.all(
      [
        statusLabel,
        localAckLabel,
        missingAckLabel,
        blockedLabel,
        secondKillLabel,
        success20Label,
        success120Label,
        localSuccessLabel,
        localBlockedLabel,
        localFailedLabel,
        malformedLabel,
        unknownGroqLabel,
      ].map((label) => resetLabel(label))
    );
  } finally {
    Module._load = originalLoad;
    Module._resolveFilename = originalResolveFilename;
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$nodeScriptDirectory = Join-Path $root ".codexforge\private-alpha-tests\slice-k-smoke-tmp"
$nodeScriptPath = Join-Path $nodeScriptDirectory "codexforge-slice-k-smoke.js"
New-Item -ItemType Directory -Path $nodeScriptDirectory -Force | Out-Null
Set-Content -LiteralPath $nodeScriptPath -Value $nodeScript -Encoding ASCII
try {
  & node $nodeScriptPath $root "slice-k-manual-groq-execution-foundation"
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Node harness exited with code $LASTEXITCODE"
  }
} finally {
  Remove-Item -LiteralPath $nodeScriptPath -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $nodeScriptDirectory -Force -ErrorAction SilentlyContinue
}

$productionSnapshotAfter = @()
if (Test-Path -LiteralPath $productionPath) {
  $productionSnapshotAfter = Get-ChildItem -LiteralPath $productionPath -Recurse -File |
    Sort-Object FullName |
    ForEach-Object { "$($_.FullName)|$($_.Length)|$($_.LastWriteTimeUtc.Ticks)" }
}
Assert-True (
  ($productionSnapshotBefore -join "`n") -eq ($productionSnapshotAfter -join "`n")
) "Production private-alpha data remains untouched after the smoke"

Write-Host "[PASS] CodexForge Private Alpha manual Groq execution foundation smoke complete."
