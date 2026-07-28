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

Write-Host ""
Write-Host "=== CodexForge Private Alpha cloud approval binding foundation smoke ==="

$allowedChangedFiles = @(
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/private-alpha/private-alpha-free-first-routing-types.ts"
)

$requiredFiles = @(
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "docs/codexforge-jarvis-manual-provider-model-selector-v0.md"
) | ForEach-Object { $_ -replace '/', '\' }
foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

foreach ($scriptPath in @(
  "scripts\smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts\smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts\smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "scripts\smoke-codexforge-jarvis-live-command-center-ui.ps1"
)) {
  Assert-PowerShellParses $scriptPath
}

$statusLines = @(
  (& git status --short --untracked-files=all 2>$null) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)
$changedPaths = $statusLines |
  ForEach-Object {
    if ($_.Length -lt 4) {
      throw "[FAIL] Unexpected git status line: $_"
    }

    $_.Substring(3).Trim() -replace "\\", "/"
  } |
  Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git changed scope contains exactly the ten allowed routing-repair files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git changed scope stays within the allowed smoke-repair files: $path"
}

Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-types.ts") 'groqFreeTierExecutionConfirmation?: true;' "Private-alpha types add the exact execution-time Groq Free-tier confirmation input"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-validation.ts") 'groqFreeTierExecutionConfirmation' "Private-alpha validation enforces the execution-time Groq Free-tier confirmation"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts") 'buildPrivateAlphaApprovalScopeHash' "Private-alpha store still binds approvals to the exact approval-scope hash"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Private-alpha runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts") "approvedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS" "Groq adapter identities enforce the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Ollama transport client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "State machine remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Kill-switch implementation remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-api-client.ts") '${PRIVATE_ALPHA_API_BASE_PATH}/routing/free-first' "Private-alpha API client includes the free-first routing endpoint"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq transport client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-FileExists "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
Assert-NoGitDiff "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx" "Athena live UI remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx" "Jarvis shell remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$typesSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$validationSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-validation.ts"
$storeSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
$runtimeSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
$privateAlphaIndexSource = Get-Content -Raw "src\lib\codexforge\private-alpha\index.ts"
$privateAlphaPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$privateAlphaCssSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
$apiClientSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-api-client.ts"
$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
$jarvisVideoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$combinedChangedTypeScriptSource = (
  @(
    "src\lib\codexforge\private-alpha\private-alpha-types.ts",
    "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
    "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
    "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
  ) | ForEach-Object { Get-Content -Raw $_ }
) -join "`n"

Assert-Contains $typesSource "export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;" "Record version remains 1"
Assert-Contains $typesSource "export const PRIVATE_ALPHA_APPROVAL_BINDING_VERSION = 1 as const;" "Binding version remains 1"
Assert-Contains $typesSource 'provider: "ollama-local";' "Persisted execution provider remains local-Ollama-specific"
Assert-Contains $typesSource 'model: "gpt-oss:20b";' "Persisted execution model remains local-Ollama-specific"
Assert-Contains $runtimeSource 'from "./private-alpha-types"' "Runtime module sources model-key constants from private-alpha-types.ts"
Assert-Contains $storeSource 'createPrivateAlphaProviderAdapterForModelKey' "Store uses createPrivateAlphaProviderAdapterForModelKey"
Assert-Contains $storeSource 'resolveExecutionTargetFromRequestAndApprovalScope' "Store resolves the exact execution target from the persisted request and approval scope"
Assert-Contains $storeSource 'providerAdapterResolver' "Store supports deterministic adapter identity checks"
Assert-NotMatches $storeSource 'routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store introduces no routing, retry, or fallback orchestration"
Assert-NotMatches $combinedChangedTypeScriptSource "localStorage|sessionStorage|indexedDB" "No browser storage exists in the Slice I TypeScript files"
Assert-NotMatches $combinedChangedTypeScriptSource 'from\s+["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']|require\(["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']\)' "No provider SDK is introduced"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $jarvisVideoPanelSource $marker "/jarvis-video retains marker $marker"
}
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"
Assert-Contains $privateAlphaIndexSource "PrivateAlphaRuntimeModelKey" "Client-safe private-alpha index exports the runtime model key"
Assert-Contains $privateAlphaIndexSource "PRIVATE_ALPHA_RUNTIME_MODEL_KEYS" "Client-safe private-alpha index exports the runtime model key list"
Assert-Contains $privateAlphaIndexSource "PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE" "Client-safe private-alpha index exports the cloud approval execution mode"
Assert-Contains $privateAlphaIndexSource "resolvePrivateAlphaBoundConfiguration" "Client-safe private-alpha index exports the bound-configuration resolver"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-provider-selector="manual"' "Jarvis UI exposes a manual provider selector"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-model-selector="manual"' "Jarvis UI exposes a manual model selector"
Assert-Contains $privateAlphaPanelSource 'selectedProviderId === "groq-cloud"' "Selecting Groq requires an explicit provider branch"
Assert-Contains $privateAlphaPanelSource 'selectedTarget?.modelKey ?? ""' "No default Groq model is assigned"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-cloud-acknowledgement="required"' "Groq approval has a separate cloud acknowledgement"
Assert-Contains $privateAlphaPanelSource 'cloudDataTransferAcknowledgement: true' "Groq approval sends the cloud transfer acknowledgement"
Assert-NotMatches $privateAlphaPanelSource 'cloudDataTransferAcknowledgement:\s*undefined' "Local approval omits an undefined cloud acknowledgement"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Cloud execution requires a separate acknowledgement"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Cloud execution UI remains manual-only"
Assert-Contains $privateAlphaPanelSource 'Execute once on Groq Cloud' "Cloud execution UI exposes the manual execute control"
Assert-Contains $privateAlphaPanelSource 'Execute once on local Ollama' "Local execution UI remains present"
Assert-Contains $privateAlphaPanelSource 'modelKey: exactTarget.modelKey' "UI creates exact bound requests"
Assert-NotMatches $privateAlphaPanelSource '\bfetch\s*\(' "PrivateAlphaRunPanel contains no raw provider call"
Assert-Contains $privateAlphaCssSource '.privateAlphaTargetSelectorGrid' "Private-alpha CSS includes the target selector layout"
Assert-Contains $privateAlphaCssSource '.privateAlphaCloudApprovalNotice' "Private-alpha CSS includes the cloud approval notice"
Assert-True ((& git -c core.safecrlf=false diff --name-only -- src/app/api/codexforge/private-alpha/status src/app/api/codexforge/private-alpha/runs 2>$null | Measure-Object).Count -eq 0) "Existing private-alpha status and run routes remain unchanged"
Assert-True ((& git -c core.safecrlf=false diff --name-only -- src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx 2>$null | Measure-Object).Count -gt 0) "PrivateAlphaRunPanel changed for the client-side routing repair"
Assert-True ((& git -c core.safecrlf=false diff --name-only -- src/lib/codexforge/private-alpha/index.ts 2>$null | Measure-Object).Count -gt 0) "Private-alpha index changed to export the create-safety guard"
Assert-True ((& git -c core.safecrlf=false diff --name-only -- src/lib/codexforge/private-alpha/private-alpha-free-first-routing-types.ts 2>$null | Measure-Object).Count -gt 0) "Free-first routing types changed for the create-safety guard"

$plainTokenPattern = '\b' + 'a' + 'ny' + '\b'
$asTokenPattern = '\b' + 'as ' + 'a' + 'ny' + '\b'
$noCheckPattern = 'ts-' + 'nocheck'
$expectErrorPattern = 'ts-' + 'expect-error'
foreach ($sourcePath in @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
)) {
  $sourceText = Get-Content -Raw $sourcePath
  Assert-NotMatches $sourceText $asTokenPattern "$sourcePath excludes the as-token escape"
  Assert-NotMatches $sourceText $noCheckPattern "$sourcePath excludes the no-check directive"
  Assert-NotMatches $sourceText $expectErrorPattern "$sourcePath excludes the expect-error directive"
  Assert-NotMatches $sourceText $plainTokenPattern "$sourcePath excludes the plain token escape"
}

$longestNewPathLength = ($requiredFiles | ForEach-Object { $_.Length } | Measure-Object -Maximum).Maximum
Assert-True ($longestNewPathLength -lt 220) "Longest new path remains below 220 characters"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const Module = require("module");
const ts = require("typescript");

async function main() {
  const repoRoot = process.argv[2];
  const killSwitchStateByLabel = new Map();
  let killSwitchReadCount = 0;
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

  global.fetch = async function() {
    throw new Error("fetch should not run in the Slice I smoke");
  };

  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    const resolved = Module._resolveFilename(request, parent, isMain);
    if (resolved === killSwitchModulePath) {
      return {
        readPrivateAlphaKillSwitchState({ dataRootLabel }) {
          killSwitchReadCount += 1;
          const engaged = killSwitchStateByLabel.get(dataRootLabel) === true;
          return Promise.resolve({
            killSwitchEngaged: engaged,
            killSwitchSources: engaged ? ["file"] : [],
          });
        },
      };
    }

    if (resolved === groqCredentialModulePath) {
      groqCredentialLoadCount += 1;
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
  const validationModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-validation.ts"
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
  groqCredentialLoadCount = 0;

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
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
        assert(
          error.message === expectedMessage,
          `Expected exact message ${expectedMessage}.`
        );
      }
      return error;
    }

    throw new Error(`Expected PrivateAlphaStoreError status ${expectedStatus}.`);
  }

  function expectValidationFailure(result, expectedStatus) {
    assert(result && result.ok === false, "Expected validation failure.");
    assert(result.status === expectedStatus, `Expected validation status ${expectedStatus}.`);
    return result;
  }

  function sha256(value) {
    return crypto.createHash("sha256").update(value, "utf8").digest("hex");
  }

  function toAbsolutePath(relativeLabel) {
    return path.join(repoRoot, ...relativeLabel.split("/"));
  }

  const touchedDataRoots = new Set();
  const createdDataRoots = new Set();

  function assertTestingDataRoot(label) {
    assert(
      label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`),
      "Only private-alpha test data roots may be touched."
    );
    assert(
      label !== privateAlpha.PRIVATE_ALPHA_DATA_ROOT_LABEL,
      "Production private-alpha data root must remain untouched."
    );
  }

  async function resetDataRoot(label) {
    assertTestingDataRoot(label);
    touchedDataRoots.add(label);
    await fsp.rm(toAbsolutePath(label), {
      recursive: true,
      force: true,
    });
  }

  async function prepareTestDataRoot(testSuffix) {
    const label = storeModule.buildPrivateAlphaTestingDataRootLabel(testSuffix);
    assertTestingDataRoot(label);
    createdDataRoots.add(label);
    await resetDataRoot(label);
    return label;
  }

  async function cleanupCreatedDataRoots() {
    for (const label of createdDataRoots) {
      await resetDataRoot(label);
    }
  }

  function createFakeProviderHarness(options = {}) {
    let availabilityCalls = 0;
    let generationCalls = 0;
    const generationInputs = [];

    return {
      providerAdapter: {
        identity:
          options.identity || {
            providerId: privateAlpha.PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
            providerLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
            modelId: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
            modelLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
            modelKey: privateAlpha.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
            locality: "local",
            dataBoundary: "local-machine",
            costClass: "local-no-provider-token-charge",
            approvedMaximumOutputTokens: 4096,
          },
        async getAvailability() {
          availabilityCalls += 1;
          if (options.availabilityError) {
            throw options.availabilityError;
          }

          return (
            options.availability || {
              providerAvailable: true,
              modelAvailable: true,
              quotaState: "not-applicable",
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
          if (options.generationError) {
            throw options.generationError;
          }

          return (
            options.generationResult || {
              outputText: "visible local output",
              doneReason: "stop",
              totalDurationNanoseconds: 50,
              loadDurationNanoseconds: 7,
              promptEvalCount: 11,
              evalCount: 13,
            }
          );
        },
      },
      getStats() {
        return {
          availabilityCalls,
          generationCalls,
          generationInputs: generationInputs.map((entry) => ({ ...entry })),
        };
      },
    };
  }

  function createStore(testSuffix, providerAdapter) {
    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      providerAdapter,
    });
  }

  function createStoreWithoutInjectedProvider(testSuffix) {
    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
    });
  }

  function getRunFileAbsolutePath(label, runId) {
    return path.join(toAbsolutePath(label), "runs", `${runId}.json`);
  }

  async function writeRunRecord(label, runRecord) {
    const runsDirectory = path.join(toAbsolutePath(label), "runs");
    await fsp.mkdir(runsDirectory, { recursive: true });
    await fsp.writeFile(
      path.join(runsDirectory, `${runRecord.runId}.json`),
      JSON.stringify(runRecord, null, 2),
      "utf8"
    );
  }

  async function createApprovedLocalRun(store, scenarioName) {
    const created = await store.createRun(
      {
        requestText: "Local execution request.",
        capability: "code",
        modelPreferenceLabel: null,
        maximumOutputTokens: 96,
      },
      `${scenarioName}-create-0001`
    );
    const approved = await store.approveRun(created.run.runId, {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: created.run.revision,
    });
    return { created, approved };
  }

  async function createApprovedGroqRun(store, scenarioName, modelKey) {
    const created = await store.createRun(
      {
        requestText: "Groq approval-only request.",
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 256,
        modelKey,
      },
      `${scenarioName}-create-0001`
    );
    const approved = await store.approveRun(created.run.runId, {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      cloudDataTransferAcknowledgement: true,
      expectedRevision: created.run.revision,
    });
    return { created, approved };
  }

  try {
  const exactRuntimeKeys = [
    "ollama-local::gpt-oss:20b",
    "groq-cloud::openai/gpt-oss-20b",
    "groq-cloud::openai/gpt-oss-120b",
  ];
  assert(typesModule.PRIVATE_ALPHA_RECORD_VERSION === 1, "record version stays 1");
  assert(
    typesModule.PRIVATE_ALPHA_APPROVAL_BINDING_VERSION === 1,
    "binding version stays 1"
  );
  assert(
    JSON.stringify(typesModule.PRIVATE_ALPHA_RUNTIME_MODEL_KEYS) ===
      JSON.stringify(exactRuntimeKeys),
    "runtime model-key constants and ordering are exact"
  );
  assert(
    JSON.stringify(typesModule.PRIVATE_ALPHA_PROVIDER_PREFERENCES) ===
      JSON.stringify(["auto", "ollama-local", "groq-cloud"]),
    "provider preference ordering is preserved with groq-cloud appended"
  );
  assert(
    JSON.stringify(typesModule.PRIVATE_ALPHA_EXECUTION_MODES) ===
      JSON.stringify([
        "locked-until-provider-slice",
        "manual-approved-local-provider",
        "manual-approved-cloud-provider-locked",
      ]),
    "execution-mode ordering is preserved with the cloud mode appended"
  );

  const omittedValidation = validationModule.validatePrivateAlphaCreateRunInput(
    {
      requestText: "  Keep it local.  ",
      capability: "code",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
    },
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(omittedValidation.ok, "omitted modelKey validation preserves local input");
  assert(
    !Object.prototype.hasOwnProperty.call(omittedValidation.value, "modelKey"),
    "omitted modelKey validation does not add modelKey"
  );
  const omittedRequest = validationModule.buildPrivateAlphaRunRequest(
    omittedValidation.value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  const omittedRequestBytes = validationModule.serializePrivateAlphaRunRequest(
    omittedRequest
  );
  assert(
    omittedRequestBytes ===
      '{"normalizedRequestText":"Keep it local.","redactedPreview":"Keep it local.","capability":"code","providerPreference":"ollama-local","modelPreferenceLabel":"gpt-oss:20b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-local-provider"}',
    "omitted modelKey serialized request bytes are unchanged"
  );
  const omittedScope = validationModule.buildPrivateAlphaApprovalScope({
    runId: "00112233445566778899aabb",
    request: omittedRequest,
    normalizedRequestHash: storeModule.buildPrivateAlphaNormalizedRequestHash(
      omittedRequest
    ),
  });
  const omittedScopeBytes = validationModule.serializePrivateAlphaApprovalScope(
    omittedScope
  );
  assert(
    omittedScopeBytes ===
      `{"runId":"00112233445566778899aabb","capability":"code","normalizedRequestHash":"${storeModule.buildPrivateAlphaNormalizedRequestHash(omittedRequest)}","providerPreference":"ollama-local","modelPreferenceLabel":"gpt-oss:20b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-local-provider"}`,
    "omitted modelKey serialized approval-scope bytes are unchanged"
  );

  const explicitLocalValidation = validationModule.validatePrivateAlphaCreateRunInput(
    {
      requestText: "Bound local request.",
      capability: "code",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: typesModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    },
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(explicitLocalValidation.ok, "explicit local binding validates");
  const explicitLocalRequest = validationModule.buildPrivateAlphaRunRequest(
    explicitLocalValidation.value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(
    explicitLocalRequest.bindingVersion === 1 &&
      explicitLocalRequest.providerPreference === "ollama-local" &&
      explicitLocalRequest.modelPreferenceLabel === "gpt-oss:20b" &&
      explicitLocalRequest.modelKey ===
        "ollama-local::gpt-oss:20b" &&
      explicitLocalRequest.dataBoundary === "local-machine" &&
      explicitLocalRequest.cloudDataTransferRequirement === "not-required",
    "explicit local key creates the exact bound local request"
  );

  const explicitGroq20Validation = validationModule.validatePrivateAlphaCreateRunInput(
    {
      requestText: "Groq 20b request.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    },
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(explicitGroq20Validation.ok, "Groq 20b text validation succeeds");
  const explicitGroq20Request = validationModule.buildPrivateAlphaRunRequest(
    explicitGroq20Validation.value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(
    explicitGroq20Request.bindingVersion === 1 &&
      explicitGroq20Request.providerPreference === "groq-cloud" &&
      explicitGroq20Request.modelPreferenceLabel === "openai/gpt-oss-20b" &&
      explicitGroq20Request.modelKey ===
        "groq-cloud::openai/gpt-oss-20b" &&
      explicitGroq20Request.dataBoundary === "cloud-provider" &&
      explicitGroq20Request.cloudDataTransferRequirement ===
        "explicit-operator-acknowledgement-required",
    "explicit Groq 20b key creates the exact bound cloud request"
  );

  const explicitGroq120Validation = validationModule.validatePrivateAlphaCreateRunInput(
    {
      requestText: "Groq 120b request.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    },
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(explicitGroq120Validation.ok, "Groq 120b text validation succeeds");
  const explicitGroq120Request = validationModule.buildPrivateAlphaRunRequest(
    explicitGroq120Validation.value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  assert(
    explicitGroq120Request.bindingVersion === 1 &&
      explicitGroq120Request.providerPreference === "groq-cloud" &&
      explicitGroq120Request.modelPreferenceLabel === "openai/gpt-oss-120b" &&
      explicitGroq120Request.modelKey ===
        "groq-cloud::openai/gpt-oss-120b" &&
      explicitGroq120Request.dataBoundary === "cloud-provider" &&
      explicitGroq120Request.cloudDataTransferRequirement ===
        "explicit-operator-acknowledgement-required",
    "explicit Groq 120b key creates the exact bound cloud request"
  );

  expectValidationFailure(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Unknown key.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: "groq-cloud::unknown-model",
    }),
    400
  );
  expectValidationFailure(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Mismatch.",
      capability: "text",
      modelPreferenceLabel: "openai/gpt-oss-120b",
      maximumOutputTokens: 64,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    }),
    400
  );
  expectValidationFailure(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Code is not allowed.",
      capability: "code",
      modelPreferenceLabel: null,
      maximumOutputTokens: 64,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    }),
    400
  );
  expectValidationFailure(
    validationModule.validatePrivateAlphaApprovalInput({
      approvalScopeHash: "a".repeat(64),
      approved: true,
      acknowledgement: true,
      cloudDataTransferAcknowledgement: false,
      expectedRevision: 1,
    }),
    400
  );
  assert(
    omittedRequest.providerPreference === "ollama-local" &&
      omittedRequest.modelPreferenceLabel === "gpt-oss:20b",
    "no default Groq model exists for omitted modelKey"
  );
  assert(
    explicitGroq20Request.modelPreferenceLabel !==
      explicitGroq120Request.modelPreferenceLabel,
    "no model substitution exists between the Groq bindings"
  );

  const explicitLocalScope = validationModule.buildPrivateAlphaApprovalScope({
    runId: "111111111111111111111111",
    request: explicitLocalRequest,
    normalizedRequestHash: storeModule.buildPrivateAlphaNormalizedRequestHash(
      explicitLocalRequest
    ),
  });
  const explicitGroq20Scope = validationModule.buildPrivateAlphaApprovalScope({
    runId: "222222222222222222222222",
    request: explicitGroq20Request,
    normalizedRequestHash: storeModule.buildPrivateAlphaNormalizedRequestHash(
      explicitGroq20Request
    ),
  });
  const explicitGroq120Scope = validationModule.buildPrivateAlphaApprovalScope({
    runId: "333333333333333333333333",
    request: explicitGroq120Request,
    normalizedRequestHash: storeModule.buildPrivateAlphaNormalizedRequestHash(
      explicitGroq120Request
    ),
  });

  assert(
    validationModule.serializePrivateAlphaRunRequest(explicitGroq20Request) ===
      '{"normalizedRequestText":"Groq 20b request.","redactedPreview":"Groq 20b request.","capability":"text","providerPreference":"groq-cloud","modelPreferenceLabel":"openai/gpt-oss-20b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-cloud-provider-locked","bindingVersion":1,"modelKey":"groq-cloud::openai/gpt-oss-20b","dataBoundary":"cloud-provider","cloudDataTransferRequirement":"explicit-operator-acknowledgement-required"}',
    "bound request fields are deterministic"
  );
  assert(
    validationModule.serializePrivateAlphaApprovalScope(explicitGroq20Scope) ===
      `{"runId":"222222222222222222222222","capability":"text","normalizedRequestHash":"${storeModule.buildPrivateAlphaNormalizedRequestHash(explicitGroq20Request)}","providerPreference":"groq-cloud","modelPreferenceLabel":"openai/gpt-oss-20b","maximumOutputTokens":64,"retentionMode":"local-private-alpha","executionMode":"manual-approved-cloud-provider-locked","bindingVersion":1,"modelKey":"groq-cloud::openai/gpt-oss-20b","dataBoundary":"cloud-provider","cloudDataTransferRequirement":"explicit-operator-acknowledgement-required"}`,
    "bound approval-scope fields are deterministic"
  );
  assert(
    explicitGroq20Scope.bindingVersion === 1 &&
      explicitGroq20Request.bindingVersion === 1,
    "bound request and scope contain bindingVersion 1"
  );
  assert(
    explicitGroq20Request.dataBoundary === "cloud-provider" &&
      explicitGroq120Request.dataBoundary === "cloud-provider",
    "Groq data boundary is cloud-provider"
  );
  assert(
    explicitGroq20Request.cloudDataTransferRequirement ===
      "explicit-operator-acknowledgement-required" &&
      explicitGroq120Request.cloudDataTransferRequirement ===
        "explicit-operator-acknowledgement-required",
    "Groq cloud-transfer requirement is explicit acknowledgement"
  );
  assert(
    explicitLocalRequest.cloudDataTransferRequirement === "not-required",
    "explicit local transfer requirement is not-required"
  );

  const omittedComparableRequest = validationModule.buildPrivateAlphaRunRequest(
    validationModule.validatePrivateAlphaCreateRunInput(
      {
        requestText: "Hash basis.",
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 128,
      },
      privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
    ).value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  const explicitLocalComparableRequest = validationModule.buildPrivateAlphaRunRequest(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Hash basis.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
      modelKey: typesModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    }).value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  const groq20ComparableRequest = validationModule.buildPrivateAlphaRunRequest(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Hash basis.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    }).value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  const groq120ComparableRequest = validationModule.buildPrivateAlphaRunRequest(
    validationModule.validatePrivateAlphaCreateRunInput({
      requestText: "Hash basis.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    }).value,
    privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
  );
  const requestHashes = new Set([
    storeModule.buildPrivateAlphaCanonicalRequestHash(omittedComparableRequest),
    storeModule.buildPrivateAlphaCanonicalRequestHash(explicitLocalComparableRequest),
    storeModule.buildPrivateAlphaCanonicalRequestHash(groq20ComparableRequest),
    storeModule.buildPrivateAlphaCanonicalRequestHash(groq120ComparableRequest),
  ]);
  assert(
    requestHashes.size === 4,
    "canonical request hashes differ between omitted local, explicit local, Groq 20b, and Groq 120b"
  );

  const scopeHashes = new Set([
    storeModule.buildPrivateAlphaApprovalScopeHash(explicitLocalScope),
    storeModule.buildPrivateAlphaApprovalScopeHash(explicitGroq20Scope),
    storeModule.buildPrivateAlphaApprovalScopeHash(explicitGroq120Scope),
  ]);
  assert(scopeHashes.size === 3, "approval-scope hashes differ across bound variants");

  const baseScopeHash =
    storeModule.buildPrivateAlphaApprovalScopeHash(explicitGroq20Scope);
  const variedScopes = [
    { ...explicitGroq20Scope, modelKey: "groq-cloud::openai/gpt-oss-120b" },
    { ...explicitGroq20Scope, providerPreference: "ollama-local" },
    { ...explicitGroq20Scope, modelPreferenceLabel: "openai/gpt-oss-120b" },
    { ...explicitGroq20Scope, dataBoundary: "local-machine" },
    {
      ...explicitGroq20Scope,
      cloudDataTransferRequirement: "not-required",
    },
    {
      ...explicitGroq20Scope,
      maximumOutputTokens: explicitGroq20Scope.maximumOutputTokens + 1,
    },
    {
      ...explicitGroq20Scope,
      normalizedRequestHash: "b".repeat(64),
    },
  ];
  assert(
    variedScopes.every(
      (scope) =>
        storeModule.buildPrivateAlphaApprovalScopeHash(scope) !== baseScopeHash
    ),
    "approval-scope hashes change when each bound field changes"
  );

  const legacyLabel = await prepareTestDataRoot("slice-i-legacy-record");
  const legacyRequest = {
    normalizedRequestText: "Legacy request.",
    redactedPreview: "Legacy request.",
    capability: "text",
    providerPreference: "auto",
    modelPreferenceLabel: null,
    maximumOutputTokens: 32,
    retentionMode: "local-private-alpha",
    executionMode: "locked-until-provider-slice",
  };
  const legacyScope = {
    runId: "444444444444444444444444",
    capability: "text",
    normalizedRequestHash: sha256("Legacy request."),
    providerPreference: "auto",
    modelPreferenceLabel: null,
    maximumOutputTokens: 32,
    retentionMode: "local-private-alpha",
    executionMode: "locked-until-provider-slice",
  };
  await writeRunRecord(legacyLabel, {
    version: 1,
    runId: legacyScope.runId,
    createdAt: "2026-07-26T00:00:00.000Z",
    updatedAt: "2026-07-26T00:00:00.000Z",
    state: "awaiting_approval",
    revision: 1,
    idempotencyKeyHash: "1".repeat(64),
    request: legacyRequest,
    approvalScope: legacyScope,
    approvalScopeHash: storeModule.buildPrivateAlphaApprovalScopeHash(legacyScope),
    approval: null,
    cancellation: null,
    execution: null,
    auditEvents: [],
  });
  const legacyStore = createStoreWithoutInjectedProvider("slice-i-legacy-record");
  const loadedLegacyRun = await legacyStore.getRun(legacyScope.runId);
  assert(
    loadedLegacyRun.request.providerPreference === "auto" &&
      loadedLegacyRun.approvalScope.providerPreference === "auto",
    "historical unbound request and scope parsing remain valid"
  );
  assert(
    loadedLegacyRun.approvalScopeHash ===
      storeModule.buildPrivateAlphaApprovalScopeHash(legacyScope),
    "historical hash verification remains unchanged"
  );

  const currentLocalLabel = await prepareTestDataRoot("slice-i-unbound-local-record");
  const currentLocalRequest = {
    normalizedRequestText: "Current local request.",
    redactedPreview: "Current local request.",
    capability: "code",
    providerPreference: "ollama-local",
    modelPreferenceLabel: "gpt-oss:20b",
    maximumOutputTokens: 64,
    retentionMode: "local-private-alpha",
    executionMode: "manual-approved-local-provider",
  };
  const currentLocalScope = {
    runId: "555555555555555555555555",
    capability: "code",
    normalizedRequestHash: sha256("Current local request."),
    providerPreference: "ollama-local",
    modelPreferenceLabel: "gpt-oss:20b",
    maximumOutputTokens: 64,
    retentionMode: "local-private-alpha",
    executionMode: "manual-approved-local-provider",
  };
  await writeRunRecord(currentLocalLabel, {
    version: 1,
    runId: currentLocalScope.runId,
    createdAt: "2026-07-26T00:00:00.000Z",
    updatedAt: "2026-07-26T00:00:00.000Z",
    state: "awaiting_approval",
    revision: 1,
    idempotencyKeyHash: "2".repeat(64),
    request: currentLocalRequest,
    approvalScope: currentLocalScope,
    approvalScopeHash: storeModule.buildPrivateAlphaApprovalScopeHash(currentLocalScope),
    approval: null,
    cancellation: null,
    execution: null,
    auditEvents: [],
  });
  const currentLocalStore = createStoreWithoutInjectedProvider(
    "slice-i-unbound-local-record"
  );
  const loadedCurrentLocalRun = await currentLocalStore.getRun(currentLocalScope.runId);
  assert(
    loadedCurrentLocalRun.request.providerPreference === "ollama-local" &&
      loadedCurrentLocalRun.approvalScope.providerPreference === "ollama-local",
    "current unbound local request and scope parsing remain valid"
  );

  await prepareTestDataRoot("slice-i-groq-persistence");
  const groqHarness = createFakeProviderHarness();
  const groqStore = createStore("slice-i-groq-persistence", groqHarness.providerAdapter);
  const groqCreated = await groqStore.createRun(
    {
      requestText: "Groq create and approve.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 256,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    },
    "slice-i-groq-persistence-create-0001"
  );
  assert(groqCreated.run.state === "awaiting_approval", "Groq-bound run persists in awaiting_approval");
  assert(
    groqHarness.getStats().availabilityCalls === 0 &&
      groqHarness.getStats().generationCalls === 0,
    "Groq run persistence makes no provider call"
  );
  assert(groqCredentialLoadCount === 0, "Groq run persistence makes no credential read");
  await expectStoreError(
    () =>
      groqStore.approveRun(groqCreated.run.runId, {
        approvalScopeHash: groqCreated.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: groqCreated.run.revision,
      }),
    409,
    "Cloud data transfer acknowledgement is required for this exact approval scope."
  );
  const groqApproved = await groqStore.approveRun(groqCreated.run.runId, {
    approvalScopeHash: groqCreated.run.approvalScopeHash,
    approved: true,
    acknowledgement: true,
    cloudDataTransferAcknowledgement: true,
    expectedRevision: groqCreated.run.revision,
  });
  assert(
    groqApproved.approval.approvalScopeHash === groqApproved.approvalScopeHash,
    "Groq approval remains bound to the exact approvalScopeHash"
  );
  assert(
    groqApproved.approval.bindingVersion === 1 &&
      groqApproved.approval.cloudDataTransferAcknowledgement ===
        "granted-for-approved-scope",
    "Groq approval record persists granted-for-approved-scope"
  );
  assert(
    groqApproved.approval.executionAvailabilityStatement ===
      validationModule.PRIVATE_ALPHA_CLOUD_APPROVAL_STATEMENT,
    "Groq approval statement records transfer consent while requiring a separate execute acknowledgement and action"
  );
  const groqApprovalEvent = groqApproved.auditEvents[groqApproved.auditEvents.length - 1];
  assert(
    groqApprovalEvent.summary ===
      "Manual approval recorded for exact Groq Cloud model scope openai/gpt-oss-20b. No prompt was sent to Groq, the exact model remains fixed, and a separate execute action is required." &&
      !groqApprovalEvent.summary.includes("GROQ_API_KEY"),
    "Groq approval audit event names the exact approved model safely while preserving the manual execute posture"
  );

  await prepareTestDataRoot("slice-i-unbound-local-approval");
  const unboundLocalHarness = createFakeProviderHarness();
  const unboundLocalStore = createStore(
    "slice-i-unbound-local-approval",
    unboundLocalHarness.providerAdapter
  );
  const unboundLocalCreated = await unboundLocalStore.createRun(
    {
      requestText: "Local unbound approval.",
      capability: "code",
      modelPreferenceLabel: null,
      maximumOutputTokens: 80,
    },
    "slice-i-unbound-local-approval-create-0001"
  );
  await expectStoreError(
    () =>
      unboundLocalStore.approveRun(unboundLocalCreated.run.runId, {
        approvalScopeHash: unboundLocalCreated.run.approvalScopeHash,
        approved: true,
        acknowledgement: true,
        cloudDataTransferAcknowledgement: true,
        expectedRevision: unboundLocalCreated.run.revision,
      }),
    409,
    "Cloud data transfer acknowledgement is not allowed for local approvals."
  );
  const unboundLocalApproved = await unboundLocalStore.approveRun(
    unboundLocalCreated.run.runId,
    {
      approvalScopeHash: unboundLocalCreated.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: unboundLocalCreated.run.revision,
    }
  );
  assert(
    !("bindingVersion" in unboundLocalApproved.approval) &&
      !("cloudDataTransferAcknowledgement" in unboundLocalApproved.approval),
    "existing unbound local approval shape and behaviour remain unchanged"
  );

  await prepareTestDataRoot("slice-i-explicit-local-approval");
  const explicitLocalHarness = createFakeProviderHarness();
  const explicitLocalStore = createStore(
    "slice-i-explicit-local-approval",
    explicitLocalHarness.providerAdapter
  );
  const explicitLocalCreated = await explicitLocalStore.createRun(
    {
      requestText: "Explicit local approval.",
      capability: "code",
      modelPreferenceLabel: null,
      maximumOutputTokens: 80,
      modelKey: typesModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    },
    "slice-i-explicit-local-approval-create-0001"
  );
  const explicitLocalApproved = await explicitLocalStore.approveRun(
    explicitLocalCreated.run.runId,
    {
      approvalScopeHash: explicitLocalCreated.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: explicitLocalCreated.run.revision,
    }
  );
  assert(
    explicitLocalApproved.approval.cloudDataTransferAcknowledgement ===
      "not-required",
    "explicit local approval persists not-required"
  );

  const replayGroqStore = createStoreWithoutInjectedProvider("slice-i-groq-replay");
  await prepareTestDataRoot("slice-i-groq-replay");
  const replayCreateA = await replayGroqStore.createRun(
    {
      requestText: "Replay me.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    },
    "slice-i-groq-replay-create-0001"
  );
  const replayCreateB = await replayGroqStore.createRun(
    {
      requestText: "Replay me.",
      capability: "text",
      modelPreferenceLabel: null,
      maximumOutputTokens: 128,
      modelKey: typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    },
    "slice-i-groq-replay-create-0001"
  );
  assert(
    replayCreateA.created === true &&
      replayCreateB.created === false &&
      replayCreateA.run.runId === replayCreateB.run.runId,
    "identical Groq idempotency input replays"
  );
  await expectStoreError(
    () =>
      replayGroqStore.createRun(
        {
          requestText: "Replay me.",
          capability: "text",
          modelPreferenceLabel: null,
          maximumOutputTokens: 128,
          modelKey: typesModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        },
        "slice-i-groq-replay-create-0001"
      ),
    409,
    "Idempotency-Key conflicts with a different private-alpha request."
  );

  await prepareTestDataRoot("slice-i-groq-execute");
  const executeGroqHarness = createFakeProviderHarness();
  const executeGroqStore = createStore(
    "slice-i-groq-execute",
    executeGroqHarness.providerAdapter
  );
  const executeGroq = await createApprovedGroqRun(
    executeGroqStore,
    "slice-i-groq-execute",
    typesModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
  );
  const executeGroqLabel = storeModule.buildPrivateAlphaTestingDataRootLabel(
    "slice-i-groq-execute"
  );
  killSwitchStateByLabel.set(executeGroqLabel, true);
  const priorKillSwitchReads = killSwitchReadCount;
  const priorRevision = executeGroq.approved.revision;
  const priorAuditCount = executeGroq.approved.auditEvents.length;
  await expectStoreError(
    () =>
      executeGroqStore.executeRun(
        executeGroq.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: executeGroq.approved.approvalScopeHash,
          expectedRevision: executeGroq.approved.revision,
        },
        "slice-i-groq-execute-run-0001"
      ),
    409,
    "Cloud execution acknowledgement is required for this exact approved scope."
  );
  const postRejectGroqRun = await executeGroqStore.getRun(executeGroq.approved.runId);
  assert(
    killSwitchReadCount === priorKillSwitchReads,
    "Groq execution rejection occurs before kill-switch inspection"
  );
  assert(
    executeGroqHarness.getStats().availabilityCalls === 0,
    "Groq execution rejection makes no availability call"
  );
  assert(
    executeGroqHarness.getStats().generationCalls === 0,
    "Groq execution rejection makes no generation call"
  );
  assert(postRejectGroqRun.execution === null, "Groq execution rejection creates no execution record");
  assert(
    postRejectGroqRun.auditEvents.length === priorAuditCount &&
      !postRejectGroqRun.auditEvents.some((event) => event.eventType === "execution.started"),
    "Groq execution rejection creates no execution audit event"
  );
  assert(
    postRejectGroqRun.state === "approved" &&
      postRejectGroqRun.revision === priorRevision,
    "Groq run remains approved and revision-unchanged after rejection"
  );
  assert(
    !JSON.stringify(postRejectGroqRun).includes("groq_"),
    "No Groq provider error is persisted"
  );

  await prepareTestDataRoot("slice-i-local-success");
  const localSuccessHarness = createFakeProviderHarness({
    generationResult: {
      outputText: "  visible local output  \n",
      doneReason: "stop",
      totalDurationNanoseconds: 111,
      loadDurationNanoseconds: 17,
      promptEvalCount: 23,
      evalCount: 29,
    },
  });
  const localSuccessStore = createStore(
    "slice-i-local-success",
    localSuccessHarness.providerAdapter
  );
  const localSuccess = await createApprovedLocalRun(
    localSuccessStore,
    "slice-i-local-success"
  );
  const localExecute = await localSuccessStore.executeRun(
    localSuccess.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: localSuccess.approved.approvalScopeHash,
      expectedRevision: localSuccess.approved.revision,
    },
    "slice-i-local-success-execute-0001"
  );
  assert(
    localExecute.run.execution.provider === "ollama-local" &&
      localExecute.run.execution.model === "gpt-oss:20b" &&
      localExecute.run.execution.status === "succeeded",
    "existing local Ollama fake-adapter execution still succeeds"
  );
  assert(
    localExecute.run.execution.outputSha256 ===
      sha256("  visible local output  \n"),
    "existing local execution output hashing remains correct"
  );
  const localReplay = await localSuccessStore.executeRun(
    localSuccess.approved.runId,
    {
      execute: true,
      acknowledgement: true,
      approvalScopeHash: localSuccess.approved.approvalScopeHash,
      expectedRevision: localSuccess.approved.revision,
    },
    "slice-i-local-success-execute-0001"
  );
  assert(localReplay.replayed === true, "existing local replay still succeeds");
  await expectStoreError(
    () =>
      localSuccessStore.executeRun(
        localSuccess.approved.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: localSuccess.approved.approvalScopeHash,
          expectedRevision: localSuccess.approved.revision,
        },
        "slice-i-local-success-execute-0002"
      ),
    409,
    "This run has already started its one allowed execution attempt."
  );
  assert(
    localSuccessHarness.getStats().availabilityCalls === 1 &&
      localSuccessHarness.getStats().generationCalls === 1,
    "existing local replay and conflict guards remain correct"
  );

  const runtimeModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-provider-runtime.server.ts"
  ));
  assert(
    runtimeModule.PRIVATE_ALPHA_RUNTIME_MODEL_KEYS ===
      typesModule.PRIVATE_ALPHA_RUNTIME_MODEL_KEYS,
    "runtime module re-exports the client-safe model-key constants"
  );
  const runtimeOllamaAdapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      {
        ollamaClient: {
          async getAvailability() {
            return {
              providerAvailable: true,
              modelAvailable: true,
              errorCode: null,
              safeErrorMessage: null,
            };
          },
          async generateApprovedText() {
            return {
              model: "gpt-oss:20b",
              outputText: "runtime local output",
              doneReason: "stop",
              totalDurationNanoseconds: 1,
              loadDurationNanoseconds: 1,
              promptEvalCount: 1,
              evalCount: 1,
            };
          },
        },
      }
    );
  assert(
    runtimeOllamaAdapter.identity.modelKey ===
      "ollama-local::gpt-oss:20b",
    "runtime resolver behavior remains unchanged for Ollama"
  );
  const runtimeGroq20Adapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      {
        groqClient: {
          getConfigurationStatus() {
            return {
              configured: true,
              credentialSource: "environment",
              safeMessage: "configured",
            };
          },
          async discoverAllowedModels() {
            return {
              providerId: "groq-cloud",
              discoveredModels: [
                {
                  modelId: "openai/gpt-oss-20b",
                  active: true,
                  contextWindowTokens: 131072,
                  maximumOutputTokens: 4096,
                  ownedBy: "openai",
                },
              ],
              missingAllowedModels: ["openai/gpt-oss-120b"],
              observedRateLimitHeaders: {},
              safeWarning: null,
            };
          },
          async generateApprovedText(input) {
            return {
              model: input.model,
              outputText: "runtime groq output",
              finishReason: "stop",
              promptTokens: 1,
              outputTokens: 2,
              totalTokens: 3,
              totalDurationNanoseconds: 1,
            };
          },
        },
      }
    );
  assert(
    runtimeGroq20Adapter.identity.modelKey ===
      "groq-cloud::openai/gpt-oss-20b",
    "runtime resolver behavior remains unchanged for Groq 20b"
  );
  const runtimeGroq120Adapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
      {
        groqClient: {
          getConfigurationStatus() {
            return {
              configured: true,
              credentialSource: "environment",
              safeMessage: "configured",
            };
          },
          async discoverAllowedModels() {
            return {
              providerId: "groq-cloud",
              discoveredModels: [
                {
                  modelId: "openai/gpt-oss-120b",
                  active: true,
                  contextWindowTokens: 131072,
                  maximumOutputTokens: 4096,
                  ownedBy: "openai",
                },
              ],
              missingAllowedModels: ["openai/gpt-oss-20b"],
              observedRateLimitHeaders: {},
              safeWarning: null,
            };
          },
          async generateApprovedText(input) {
            return {
              model: input.model,
              outputText: "runtime groq output",
              finishReason: "stop",
              promptTokens: 1,
              outputTokens: 2,
              totalTokens: 3,
              totalDurationNanoseconds: 1,
            };
          },
        },
      }
    );
  assert(
    runtimeGroq120Adapter.identity.modelKey ===
      "groq-cloud::openai/gpt-oss-120b",
    "runtime resolver behavior remains unchanged for Groq 120b"
  );

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
  const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  assert(
    modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
      "codexforge-model-routing-v4",
    "model-routing catalog remains v4"
  );
  const groqCatalogModels = productionCatalog.models.filter(
    (model) => model.providerId === "groq-cloud"
  );
  const groq20CatalogModel = productionCatalog.models.find(
    (model) => model.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  const groq120CatalogModel = productionCatalog.models.find(
    (model) => model.modelKey === "groq-cloud::openai/gpt-oss-120b"
  );
  assert(
    groqCatalogModels.length === 2 &&
      groq20CatalogModel.routingState === "automatic" &&
      groq120CatalogModel.routingState === "manual-only",
    "Groq catalog preserves free-first 20B automation and manual-only 120B"
  );
  const runtimeSnapshots = productionCatalog.models.map((model) => ({
    modelKey: model.modelKey,
    availability: "available",
    quotaState:
      model.providerId === "groq-cloud" ? "available" : "not-applicable",
    observedLatencyMs: 1,
    observedAt: "2026-07-26T00:00:00.000Z",
  }));
  const automaticModes = [
    routingModule.routeCodexForgeModel(
      {
        taskProfile: "general-text",
        requiredCapabilities: [],
        estimatedInputTokens: 1000,
        maximumOutputTokens: 512,
        candidateModelKeys: null,
        policy: {
          mode: "local-only",
          privacyRequirement: "cloud-allowed",
          maximumEstimatedCostUsd: 1,
          paidApprovalState: "not-granted",
          manualModelKey: null,
          paidExecutionAdmission: "request-scoped",
          freeTierConfirmationState: "confirmed-for-request",
        },
        runtimeSnapshots,
      },
      productionCatalog
    ),
    routingModule.routeCodexForgeModel(
      {
        taskProfile: "general-text",
        requiredCapabilities: [],
        estimatedInputTokens: 1000,
        maximumOutputTokens: 512,
        candidateModelKeys: null,
        policy: {
          mode: "free-only",
          privacyRequirement: "cloud-allowed",
          maximumEstimatedCostUsd: 1,
          paidApprovalState: "not-granted",
          manualModelKey: null,
          paidExecutionAdmission: "request-scoped",
          freeTierConfirmationState: "confirmed-for-request",
        },
        runtimeSnapshots,
      },
      productionCatalog
    ),
    routingModule.routeCodexForgeModel(
      {
        taskProfile: "general-text",
        requiredCapabilities: [],
        estimatedInputTokens: 1000,
        maximumOutputTokens: 512,
        candidateModelKeys: null,
        policy: {
          mode: "free-first",
          privacyRequirement: "cloud-allowed",
          maximumEstimatedCostUsd: 1,
          paidApprovalState: "not-granted",
          manualModelKey: null,
          paidExecutionAdmission: "request-scoped",
          freeTierConfirmationState: "confirmed-for-request",
        },
        runtimeSnapshots,
      },
      productionCatalog
    ),
    routingModule.routeCodexForgeModel(
      {
        taskProfile: "general-text",
        requiredCapabilities: [],
        estimatedInputTokens: 1000,
        maximumOutputTokens: 512,
        candidateModelKeys: null,
        policy: {
          mode: "best-within-budget",
          privacyRequirement: "cloud-allowed",
          maximumEstimatedCostUsd: 1,
          paidApprovalState: "not-granted",
          manualModelKey: null,
          paidExecutionAdmission: "request-scoped",
          freeTierConfirmationState: "confirmed-for-request",
        },
        runtimeSnapshots,
      },
      productionCatalog
    ),
  ];
  assert(
    automaticModes.every(
      (decision) => decision.selectedModelKey === "ollama-local::gpt-oss:20b"
    ),
    "automatic modes still cannot select Groq"
  );

  const persistedGroqText = JSON.stringify(groqApproved);
  const persistedLocalText = JSON.stringify(localExecute.run);
  assert(
    !persistedGroqText.includes("GROQ_API_KEY") &&
      !persistedGroqText.includes("acceptance_token") &&
      !persistedLocalText.includes("GROQ_API_KEY") &&
      !persistedLocalText.includes("acceptance_token"),
    "No credential, API key, or acceptance token is stored"
  );
  assert(
    touchedDataRoots.size > 0 &&
      Array.from(touchedDataRoots).every((label) =>
        label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`)
      ) &&
      !touchedDataRoots.has(privateAlpha.PRIVATE_ALPHA_DATA_ROOT_LABEL),
    "Production private-alpha data root remains untouched"
  );

  return {
    success: true,
    touchedTestDataRoots: touchedDataRoots.size,
  };
  } finally {
    await cleanupCreatedDataRoots();
  }
}

main()
  .then((result) => {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  })
  .catch((error) => {
    const message =
      error instanceof Error && error.message ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
'@

$validationRaw = $nodeScript | & node - $root 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Slice I cloud approval binding validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.touchedTestDataRoots -gt 0) "Only private-alpha test data roots were touched"

Write-Host "[PASS] CodexForge Private Alpha cloud approval binding foundation smoke complete."
