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
Write-Host "=== CodexForge Private Alpha Groq adapter runtime foundation smoke ==="

$allowedChangedFiles = @(
  "docs/codexforge-free-local-provider-registry-foundation-v0.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-live-execution-admission.ps1",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "src/lib/codexforge/model-routing/index.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts",
  "src/lib/codexforge/model-routing/model-routing-types.ts"
)

$requiredFiles = @(
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "docs/codexforge-jarvis-manual-provider-model-selector-v0.md"
) | ForEach-Object { $_ -replace '/', '\' }
foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

foreach ($scriptPath in @(
  "scripts\smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts\smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts\smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1"
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
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git changed scope contains exactly the sixteen allowed Slice O files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git changed scope stays within the allowed smoke-repair files: $path"
}

Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-types.ts") 'groqFreeTierExecutionConfirmation?: true;' "Private-alpha types add the exact execution-time Groq Free-tier confirmation input"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-validation.ts") 'PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS' "Private-alpha validation enforces the admitted Groq 512-token envelope"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts") 'groq_output_too_large' "Private-alpha store hardens historical Groq executions above the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts" "Private-alpha runtime resolver remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts") "approvedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS" "Groq adapter identities enforce the admitted 512-token envelope"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "Current private-alpha state machine remains unchanged"
Assert-FileExists "src\app\api\codexforge\private-alpha\routing\free-first\route.ts"
Assert-NoGitDiff "src/app/jarvis" "Jarvis route entry remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq client module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Current Ollama client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Current private-alpha kill switch remains unchanged"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-api-client.ts") '${PRIVATE_ALPHA_API_BASE_PATH}/routing/free-first' "Current private-alpha API client includes the free-first routing endpoint"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-policy.server.ts") 'freeTierConfirmationState' "Model-routing policy applies the Free-tier confirmation gate"
Assert-Contains (Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-types.ts") 'candidateModelKeys:' "Model-routing types expose the exact candidate allowlist"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$typesPath = "src\lib\codexforge\private-alpha\private-alpha-types.ts"
$providerPath = "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts"
$ollamaAdapterPath = "src\lib\codexforge\private-alpha\private-alpha-ollama-adapter.server.ts"
$groqAdapterPath = "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts"
$runtimePath = "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"

$typesSource = Get-Content -Raw $typesPath
$providerSource = Get-Content -Raw $providerPath
$ollamaAdapterSource = Get-Content -Raw $ollamaAdapterPath
$groqAdapterSource = Get-Content -Raw $groqAdapterPath
$runtimeSource = Get-Content -Raw $runtimePath
$privateAlphaPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$privateAlphaIndexSource = Get-Content -Raw "src\lib\codexforge\private-alpha\index.ts"
$combinedChangedTypeScriptSource = (
  @(
    "src/lib/codexforge/private-alpha/index.ts",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
  ) | ForEach-Object { Get-Content -Raw ($_ -replace '/', '\') }
) -join "`n"
$runtimeBoundarySource = $groqAdapterSource + "`n" + $runtimeSource

Assert-True ((Get-Content $providerPath -TotalCount 1) -eq 'import "server-only";') 'Provider contract begins with import "server-only";'
Assert-True ((Get-Content $ollamaAdapterPath -TotalCount 1) -eq 'import "server-only";') 'Ollama adapter begins with import "server-only";'
Assert-True ((Get-Content $groqAdapterPath -TotalCount 1) -eq 'import "server-only";') 'Groq adapter begins with import "server-only";'
Assert-True ((Get-Content $runtimePath -TotalCount 1) -eq 'import "server-only";') 'Runtime boundary begins with import "server-only";'

Assert-Contains $typesSource 'export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;' "Record version remains 1"
Assert-Contains $typesSource 'provider: "ollama-local";' "Persisted execution provider remains local-Ollama-specific"
Assert-Contains $typesSource 'model: "gpt-oss:20b";' "Persisted execution model remains local-Ollama-specific"
Assert-Contains $providerSource "providerId: CodexForgeProviderId;" "Provider identity contains providerId"
Assert-Contains $providerSource "providerLabel: string;" "Provider identity contains providerLabel"
Assert-Contains $providerSource "modelId: CodexForgeModelId;" "Provider identity contains modelId"
Assert-Contains $providerSource "modelLabel: string;" "Provider identity contains modelLabel"
Assert-Contains $providerSource "modelKey: CodexForgeModelKey;" "Provider identity contains modelKey"
Assert-Contains $providerSource "locality: CodexForgeProviderLocality;" "Provider identity contains locality"
Assert-Contains $providerSource "dataBoundary: CodexForgeModelDataBoundary;" "Provider identity contains dataBoundary"
Assert-Contains $providerSource "costClass: CodexForgeModelCostClass;" "Provider identity contains costClass"
Assert-Contains $providerSource "approvedMaximumOutputTokens: number;" "Provider identity contains approvedMaximumOutputTokens"
Assert-Contains $providerSource "quotaState: CodexForgeQuotaState;" "Availability contains quotaState"
Assert-Contains $providerSource '"kill_switch_blocked" | "ollama_empty_response" | "groq_empty_response"' "Availability errors exclude kill switch and both empty-response codes"
Assert-Contains $providerSource '"kill_switch_blocked"' "Execution errors exclude only kill switch"
Assert-Contains $ollamaAdapterSource 'modelKey: "ollama-local::gpt-oss:20b"' "Ollama identity model key is exact in source"
Assert-Contains $groqAdapterSource 'model: CodexForgeGroqModelId;' "Groq adapter requires an explicit model"
Assert-Contains $groqAdapterSource "createCodexForgeGroqClient" "Groq adapter imports the existing Groq client"
Assert-Contains $groqAdapterSource "getConfigurationStatus()" "Groq adapter delegates configuration status to the existing client"
Assert-Contains $groqAdapterSource "discoverAllowedModels()" "Groq adapter delegates discovery to the existing client"
Assert-Contains $groqAdapterSource "generateApprovedText({" "Groq adapter delegates generation to the existing client"
Assert-NotMatches $groqAdapterSource "process\.env" "Groq adapter does not read process.env"
Assert-NotMatches $groqAdapterSource "\bfetch\s*\(" "Groq adapter contains no raw fetch"
Assert-NotMatches $groqAdapterSource "api\.groq\.com|/openai/v1/" "Groq adapter contains no Groq URL or endpoint path"
Assert-NotMatches $combinedChangedTypeScriptSource "localStorage|sessionStorage|indexedDB" "No browser storage exists in the Slice H TypeScript files"
Assert-NotMatches $combinedChangedTypeScriptSource 'from\s+["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']|require\(["''](?:groq-sdk|openai|axios|@anthropic-ai\/sdk|anthropic|@google\/genai|google-genai|openrouter)["'']\)' "No provider SDK is introduced"
Assert-NotMatches $runtimeBoundarySource "routeCodexForgeModel|runtimeSnapshots|manualModelKey|createPrivateAlphaStore|executeRun|/api/codexforge/private-alpha" "Runtime boundary performs no routing or execution integration"
Assert-Contains $privateAlphaIndexSource "PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE" "Client-safe private-alpha index exports the cloud approval execution mode"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-provider-selector="manual"' "Jarvis panel exposes the manual provider selector"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-model-selector="manual"' "Jarvis panel exposes the manual model selector"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Jarvis panel requires the separate cloud execution acknowledgement"
Assert-Contains $privateAlphaPanelSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Jarvis panel keeps Groq execution manual"
Assert-Contains $privateAlphaPanelSource 'Execute once on Groq Cloud' "Jarvis panel exposes the Groq execute control"

$ollamaExecutionNormalizerMatch = [regex]::Match(
  $ollamaAdapterSource,
  'function normalizeProviderExecutionErrorCode\([\s\S]*?\r?\n\}'
)
Assert-True $ollamaExecutionNormalizerMatch.Success "Ollama execution error normalizer exists in source"
$ollamaExecutionNormalizerSource = $ollamaExecutionNormalizerMatch.Value
$expectedOllamaNormalizationSourceCodes = @(
  "kill_switch_blocked",
  "ollama_unavailable",
  "ollama_model_missing",
  "ollama_timeout",
  "ollama_http_error",
  "ollama_malformed_response",
  "ollama_empty_response",
  "ollama_output_too_large"
)
Assert-NotMatches $ollamaExecutionNormalizerSource '(?m)^\s*default\s*:' "Ollama execution error normalizer contains no default branch"
Assert-True (
  ([regex]::Matches($ollamaExecutionNormalizerSource, 'return "ollama_http_error";')).Count -eq 1
) "Ollama execution error normalizer contains no catch-all ollama_http_error return"
Assert-True (
  ([regex]::Matches($ollamaExecutionNormalizerSource, '(?m)^\s*case "')).Count -eq
    $expectedOllamaNormalizationSourceCodes.Count
) "Ollama execution error normalizer covers exactly the eight Ollama source codes"
foreach ($code in $expectedOllamaNormalizationSourceCodes) {
  Assert-Contains $ollamaExecutionNormalizerSource "case `"$code`":" "Ollama execution error normalizer handles $code"
}
Assert-Contains $ollamaExecutionNormalizerSource 'return code;' "Identity-preserving Ollama mappings return code"
Assert-NotMatches $ollamaExecutionNormalizerSource '\?\?|\|\|' "Ollama execution error normalizer contains no fallback error mapping"
Assert-NotMatches $ollamaAdapterSource 'provider(?:Id|Label):\s*[^,\r\n]+(?:\?\?|\|\|)[^,\r\n]+' "Ollama adapter introduces no fallback provider mapping"
Assert-NotMatches $ollamaAdapterSource 'model(?:Id|Label|Key):\s*[^,\r\n]+(?:\?\?|\|\|)[^,\r\n]+' "Ollama adapter introduces no fallback model mapping"

$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"

$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $videoPanelSource $marker "/jarvis-video retains marker $marker"
}

$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"

$plainTokenPattern = '\b' + 'a' + 'ny' + '\b'
$asTokenPattern = '\b' + 'as ' + 'a' + 'ny' + '\b'
$noCheckPattern = 'ts-' + 'nocheck'
$expectErrorPattern = 'ts-' + 'expect-error'
$typeScriptFiles = $requiredFiles | Where-Object { $_ -like "*.ts" }
foreach ($sourcePath in $typeScriptFiles) {
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
const Module = require("module");
const ts = require("typescript");

async function main() {
  const repoRoot = process.argv[2];
  let fetchCallCount = 0;

  global.fetch = async function() {
    fetchCallCount += 1;
    throw new Error("fetch should not run in the Slice H smoke");
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
        jsx: ts.JsxEmit.ReactJSX,
      },
      fileName: filename,
    });

    module._compile(transpiled.outputText, filename);
  };

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;

  const privateAlpha = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "index.ts"
  ));
  const providerModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-provider.server.ts"
  ));
  const ollamaAdapterModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama-adapter.server.ts"
  ));
  const groqAdapterModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-groq-adapter.server.ts"
  ));
  const runtimeModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-provider-runtime.server.ts"
  ));
  const groqClientModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-client.server.ts"
  ));
  const ollamaTransportModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama.server.ts"
  ));
  const storeModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-store.server.ts"
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

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  async function expectProviderError(
    work,
    expectedCode,
    expectedStatus,
    expectedSafeMessage
  ) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof providerModule.PrivateAlphaProviderError,
        "Expected PrivateAlphaProviderError."
      );
      assert(error.code === expectedCode, `Expected code ${expectedCode}.`);
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      assert(
        error.safeMessage === expectedSafeMessage,
        "Expected bounded provider safe message."
      );
      return error;
    }

    throw new Error(`Expected PrivateAlphaProviderError code ${expectedCode}.`);
  }

  async function expectRuntimeError(work) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof runtimeModule.PrivateAlphaProviderRuntimeError,
        "Expected PrivateAlphaProviderRuntimeError."
      );
      assert(
        error.name === "PrivateAlphaProviderRuntimeError",
        "Runtime error name is stable."
      );
      assert(
        error.code === "unsupported_model_key",
        "Runtime error code is unsupported_model_key."
      );
      assert(
        error.safeMessage ===
          "The requested provider model is not supported by the private-alpha runtime.",
        "Runtime error safe message is exact."
      );
      return error;
    }

    throw new Error("Expected PrivateAlphaProviderRuntimeError.");
  }

  function createFakeOllamaClient(options = {}) {
    const stats = {
      availabilityCalls: 0,
      generationCalls: 0,
      generationInputs: [],
    };

    return {
      client: {
        async getAvailability() {
          stats.availabilityCalls += 1;
          if (options.availabilityError) {
            throw options.availabilityError;
          }

          return (
            options.availability || {
              providerAvailable: true,
              modelAvailable: true,
              errorCode: null,
              safeErrorMessage: null,
            }
          );
        },

        async generateApprovedText(input) {
          stats.generationCalls += 1;
          stats.generationInputs.push({
            approvedRequestText: input.approvedRequestText,
            model: input.model,
            maximumOutputTokens: input.maximumOutputTokens,
          });
          if (options.generationError) {
            throw options.generationError;
          }

          return (
            options.generationResult || {
              model: "gpt-oss:20b",
              outputText: "visible local output",
              doneReason: "stop",
              totalDurationNanoseconds: 10,
              loadDurationNanoseconds: 2,
              promptEvalCount: 3,
              evalCount: 4,
            }
          );
        },
      },
      stats,
    };
  }

  function createFakeGroqClient(options = {}) {
    const stats = {
      configurationCalls: 0,
      discoveryCalls: 0,
      generationCalls: 0,
      generationInputs: [],
    };

    return {
      client: {
        getConfigurationStatus() {
          stats.configurationCalls += 1;
          return (
            options.configurationStatus || {
              configured: true,
              credentialSource: "environment",
              safeMessage: "Groq credential is configured in the server environment.",
            }
          );
        },

        async discoverAllowedModels() {
          stats.discoveryCalls += 1;
          if (options.discoveryError) {
            throw options.discoveryError;
          }

          return (
            options.discoveryResult || {
              providerId: "groq-cloud",
              discoveredModels: [
                {
                  modelId: "openai/gpt-oss-20b",
                  active: true,
                  contextWindowTokens: 131072,
                  maximumOutputTokens: 4096,
                  ownedBy: "openai",
                },
                {
                  modelId: "openai/gpt-oss-120b",
                  active: true,
                  contextWindowTokens: 131072,
                  maximumOutputTokens: 4096,
                  ownedBy: "openai",
                },
              ],
              missingAllowedModels: [],
              observedRateLimitHeaders: {},
              safeWarning: null,
            }
          );
        },

        async generateApprovedText(input) {
          stats.generationCalls += 1;
          stats.generationInputs.push({
            approvedRequestText: input.approvedRequestText,
            model: input.model,
            maximumOutputTokens: input.maximumOutputTokens,
          });
          if (options.generationError) {
            throw options.generationError;
          }

          return (
            options.generationResult || {
              model: input.model,
              outputText: "  groq output  \n",
              finishReason: "stop",
              promptTokens: 11,
              outputTokens: 17,
              totalTokens: 28,
              totalDurationNanoseconds: 123,
            }
          );
        },
      },
      stats,
    };
  }

  function createFakeLocalProviderAdapter(options = {}) {
    const stats = {
      availabilityCalls: 0,
      generationCalls: 0,
    };

    return {
      providerAdapter: {
        identity: Object.freeze({
          providerId: "ollama-local",
          providerLabel: "Local Ollama",
          modelId: "gpt-oss:20b",
          modelLabel: "gpt-oss:20b",
          modelKey: "ollama-local::gpt-oss:20b",
          locality: "local",
          dataBoundary: "local-machine",
          costClass: "local-no-provider-token-charge",
          approvedMaximumOutputTokens: 4096,
        }),

        async getAvailability() {
          stats.availabilityCalls += 1;
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

        async generateApprovedText() {
          stats.generationCalls += 1;
          if (options.generationError) {
            throw options.generationError;
          }

          return (
            options.generationResult || {
              outputText: "visible local output",
              doneReason: "stop",
              totalDurationNanoseconds: 10,
              loadDurationNanoseconds: 2,
              promptEvalCount: 3,
              evalCount: 4,
            }
          );
        },
      },
      stats,
    };
  }

  function routeRequest(policy, runtimeSnapshots, maximumOutputTokens) {
    return {
      taskProfile: "general-text",
      requiredCapabilities: ["text-generation"],
      estimatedInputTokens: 1000,
      maximumOutputTokens:
        Object.prototype.hasOwnProperty.call(arguments.length > 2 ? { maximumOutputTokens } : {}, "maximumOutputTokens")
          ? maximumOutputTokens
          : 4096,
      candidateModelKeys: null,
      policy,
      runtimeSnapshots,
    };
  }

  function routePolicy(mode, manualModelKey) {
    return {
      mode,
      privacyRequirement: "cloud-allowed",
      maximumEstimatedCostUsd: 1,
      paidApprovalState: "not-granted",
      manualModelKey:
        Object.prototype.hasOwnProperty.call(arguments.length > 1 ? { manualModelKey } : {}, "manualModelKey")
          ? manualModelKey
          : null,
      paidExecutionAdmission: "request-scoped",
      freeTierConfirmationState: "confirmed-for-request",
    };
  }

  const touchedDataRoots = new Set();
  const createdDataRoots = new Set();

  function toAbsolutePath(relativePath) {
    return path.join(repoRoot, ...relativePath.split("/"));
  }

  function assertTestingDataRoot(label) {
    assert(
      label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`),
      "Only private-alpha test data roots may be touched."
    );
    assert(
      label !== privateAlpha.PRIVATE_ALPHA_DATA_ROOT_LABEL,
      "Production private-alpha data root must stay untouched."
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
    createdDataRoots.add(label);
    await resetDataRoot(label);
    return label;
  }

  async function cleanupCreatedDataRoots() {
    for (const label of createdDataRoots) {
      await resetDataRoot(label);
    }
  }

  function getRunFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "runs", `${runId}.json`);
  }

  async function createApprovedRun(store, scenarioName) {
    const created = await store.createRun(
      {
        requestText: `${scenarioName} request.`,
        capability: "code",
        modelPreferenceLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: 64,
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

  const originalOllamaErrorCodes = [
    "kill_switch_blocked",
    "ollama_unavailable",
    "ollama_model_missing",
    "ollama_timeout",
    "ollama_http_error",
    "ollama_malformed_response",
    "ollama_empty_response",
    "ollama_output_too_large",
  ];
  const groqErrorCodes = [
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
  const typesSource = fs.readFileSync(
    path.join(
      repoRoot,
      "src",
      "lib",
      "codexforge",
      "private-alpha",
      "private-alpha-types.ts"
    ),
    "utf8"
  );
  const persistedErrorCodesMatch = typesSource.match(
    /const PRIVATE_ALPHA_PERSISTED_EXECUTION_ERROR_CODES = \[([\s\S]*?)\] as const;/
  );
  assert(Boolean(persistedErrorCodesMatch), "Persisted execution error code block exists.");
  const persistedErrorCodes = Array.from(
    persistedErrorCodesMatch[1].matchAll(/"([^"]+)"/g),
    (match) => match[1]
  );

  assert(
    JSON.stringify(privateAlpha.PRIVATE_ALPHA_EXECUTION_ERROR_CODES) ===
      JSON.stringify(originalOllamaErrorCodes),
    "Execution error codes remain Ollama-only and in the historical order."
  );
  assert(
    JSON.stringify(persistedErrorCodes) ===
      JSON.stringify([...originalOllamaErrorCodes, ...groqErrorCodes]),
    "Persisted provider error codes append the Groq codes in the required order."
  );

  const ollamaIdentityHarness = createFakeOllamaClient();
  const ollamaIdentityAdapter =
    ollamaAdapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: ollamaIdentityHarness.client,
    });
  assert(Object.isFrozen(ollamaIdentityAdapter), "Ollama adapter is frozen.");
  assert(Object.isFrozen(ollamaIdentityAdapter.identity), "Ollama identity is frozen.");
  assert(
    JSON.stringify(ollamaIdentityAdapter.identity) ===
      JSON.stringify({
        providerId: "ollama-local",
        providerLabel: "Local Ollama",
        modelId: "gpt-oss:20b",
        modelLabel: "gpt-oss:20b",
        modelKey: "ollama-local::gpt-oss:20b",
        locality: "local",
        dataBoundary: "local-machine",
        costClass: "local-no-provider-token-charge",
        approvedMaximumOutputTokens: 4096,
      }),
    "Ollama identity is exact."
  );
  const ollamaAvailability = await ollamaIdentityAdapter.getAvailability();
  assert(
    ollamaAvailability.quotaState === "not-applicable",
    "Ollama availability uses quotaState not-applicable."
  );
  const ollamaDelegatedOutput = "  local visible output  \n";
  const ollamaGenerationHarness = createFakeOllamaClient({
    generationResult: {
      model: "gpt-oss:20b",
      outputText: ollamaDelegatedOutput,
      doneReason: "stop",
      totalDurationNanoseconds: 101,
      loadDurationNanoseconds: 17,
      promptEvalCount: 23,
      evalCount: 29,
    },
  });
  const ollamaGenerationAdapter =
    ollamaAdapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: ollamaGenerationHarness.client,
    });
  const ollamaGenerated = await ollamaGenerationAdapter.generateApprovedText({
    approvedRequestText: "approved request",
    model: "gpt-oss:20b",
    maximumOutputTokens: 32,
  });
  assert(
    ollamaGenerated.outputText === ollamaDelegatedOutput &&
      ollamaGenerated.doneReason === "stop" &&
      ollamaGenerated.totalDurationNanoseconds === 101 &&
      ollamaGenerated.loadDurationNanoseconds === 17 &&
      ollamaGenerated.promptEvalCount === 23 &&
      ollamaGenerated.evalCount === 29,
    "Ollama delegation and metric mapping remain unchanged."
  );
  const knownOllamaCodes = [
    "ollama_unavailable",
    "ollama_model_missing",
    "ollama_timeout",
    "ollama_http_error",
    "ollama_malformed_response",
    "ollama_empty_response",
    "ollama_output_too_large",
  ];
  const expectedOllamaExecutionMappings = [
    ["kill_switch_blocked", "ollama_http_error"],
    ["ollama_unavailable", "ollama_unavailable"],
    ["ollama_model_missing", "ollama_model_missing"],
    ["ollama_timeout", "ollama_timeout"],
    ["ollama_http_error", "ollama_http_error"],
    ["ollama_malformed_response", "ollama_malformed_response"],
    ["ollama_empty_response", "ollama_empty_response"],
    ["ollama_output_too_large", "ollama_output_too_large"],
  ];
  assert(
    JSON.stringify(expectedOllamaExecutionMappings.map(([sourceCode]) => sourceCode)) ===
      JSON.stringify(originalOllamaErrorCodes),
    "Ollama execution mapping source coverage remains exact."
  );
  const nonIdentityOllamaMappings = expectedOllamaExecutionMappings.filter(
    ([sourceCode, mappedCode]) => sourceCode !== mappedCode
  );
  assert(
    nonIdentityOllamaMappings.length === 1 &&
      nonIdentityOllamaMappings[0][0] === "kill_switch_blocked" &&
      nonIdentityOllamaMappings[0][1] === "ollama_http_error",
    "kill_switch_blocked remains the only non-identity Ollama execution mapping."
  );
  for (const code of knownOllamaCodes) {
    const safeMessage = `safe-${code}`;
    const status = code === "ollama_timeout" ? 504 : 503;
    const errorAdapter = ollamaAdapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: createFakeOllamaClient({
        generationError: new ollamaTransportModule.PrivateAlphaOllamaError(
          code,
          safeMessage,
          status
        ),
      }).client,
    });
    await expectProviderError(
      () =>
        errorAdapter.generateApprovedText({
          approvedRequestText: "known Ollama failure",
          model: "gpt-oss:20b",
          maximumOutputTokens: 12,
        }),
      code,
      status,
      safeMessage
    );
  }
  const normalizedKillSwitchAdapter =
    ollamaAdapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: createFakeOllamaClient({
        generationError: new ollamaTransportModule.PrivateAlphaOllamaError(
          "kill_switch_blocked",
          "safe-kill-switch",
          503
        ),
      }).client,
    });
  await expectProviderError(
    () =>
      normalizedKillSwitchAdapter.generateApprovedText({
        approvedRequestText: "kill-switch normalization",
        model: "gpt-oss:20b",
        maximumOutputTokens: 12,
      }),
    "ollama_http_error",
    503,
    "safe-kill-switch"
  );

  const groq20Harness = createFakeGroqClient();
  const groq20Adapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-20b",
    groqClient: groq20Harness.client,
  });
  const groq120Harness = createFakeGroqClient();
  const groq120Adapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-120b",
    groqClient: groq120Harness.client,
  });
  assert(Object.isFrozen(groq20Adapter.identity), "Groq 20b identity is frozen.");
  assert(Object.isFrozen(groq120Adapter.identity), "Groq 120b identity is frozen.");
  assert(
    JSON.stringify(groq20Adapter.identity) ===
      JSON.stringify({
        providerId: "groq-cloud",
        providerLabel: "Groq Cloud",
        modelId: "openai/gpt-oss-20b",
        modelLabel: "openai/gpt-oss-20b",
        modelKey: "groq-cloud::openai/gpt-oss-20b",
        locality: "cloud",
        dataBoundary: "cloud-provider",
        costClass: "free-tier",
        approvedMaximumOutputTokens: 512,
      }),
    "Groq 20b identity is exact."
  );
  assert(
    JSON.stringify(groq120Adapter.identity) ===
      JSON.stringify({
        providerId: "groq-cloud",
        providerLabel: "Groq Cloud",
        modelId: "openai/gpt-oss-120b",
        modelLabel: "openai/gpt-oss-120b",
        modelKey: "groq-cloud::openai/gpt-oss-120b",
        locality: "cloud",
        dataBoundary: "cloud-provider",
        costClass: "free-tier",
        approvedMaximumOutputTokens: 512,
      }),
    "Groq 120b identity is exact."
  );

  const unconfiguredHarness = createFakeGroqClient({
    configurationStatus: {
      configured: false,
      credentialSource: "none",
      safeMessage: "Groq credential is not configured.",
    },
  });
  const unconfiguredAdapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-20b",
    groqClient: unconfiguredHarness.client,
  });
  const unconfiguredAvailability = await unconfiguredAdapter.getAvailability();
  assert(
    unconfiguredAvailability.providerAvailable === false &&
      unconfiguredAvailability.modelAvailable === false &&
      unconfiguredAvailability.quotaState === "unknown" &&
      unconfiguredAvailability.errorCode === "groq_credential_missing" &&
      unconfiguredAvailability.safeErrorMessage === "Groq credential is not configured." &&
      unconfiguredHarness.stats.discoveryCalls === 0,
    "Unconfigured Groq availability makes no discovery call and returns groq_credential_missing."
  );

  const activeDiscoveryHarness = createFakeGroqClient({
    discoveryResult: {
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
    },
  });
  const activeDiscoveryAdapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-20b",
    groqClient: activeDiscoveryHarness.client,
  });
  const activeAvailability = await activeDiscoveryAdapter.getAvailability();
  assert(
    activeAvailability.providerAvailable === true &&
      activeAvailability.modelAvailable === true &&
      activeAvailability.quotaState === "available" &&
      activeAvailability.errorCode === null &&
      activeAvailability.safeErrorMessage === null &&
      activeDiscoveryHarness.stats.discoveryCalls === 1,
    "Active discovered Groq model is available and discovery runs once."
  );

  const missingDiscoveryHarness = createFakeGroqClient({
    discoveryResult: {
      providerId: "groq-cloud",
      discoveredModels: [],
      missingAllowedModels: ["openai/gpt-oss-20b", "openai/gpt-oss-120b"],
      observedRateLimitHeaders: {},
      safeWarning: null,
    },
  });
  const missingDiscoveryAvailability =
    await groqAdapterModule
      .createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: missingDiscoveryHarness.client,
      })
      .getAvailability();
  assert(
    missingDiscoveryAvailability.errorCode === "groq_model_unavailable" &&
      missingDiscoveryAvailability.providerAvailable === true &&
      missingDiscoveryAvailability.modelAvailable === false,
    "Missing discovered model maps to groq_model_unavailable."
  );

  const inactiveDiscoveryHarness = createFakeGroqClient({
    discoveryResult: {
      providerId: "groq-cloud",
      discoveredModels: [
        {
          modelId: "openai/gpt-oss-20b",
          active: false,
          contextWindowTokens: 131072,
          maximumOutputTokens: 4096,
          ownedBy: "openai",
        },
      ],
      missingAllowedModels: ["openai/gpt-oss-120b"],
      observedRateLimitHeaders: {},
      safeWarning: null,
    },
  });
  const inactiveDiscoveryAvailability =
    await groqAdapterModule
      .createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: inactiveDiscoveryHarness.client,
      })
      .getAvailability();
  assert(
    inactiveDiscoveryAvailability.errorCode === "groq_model_unavailable" &&
      inactiveDiscoveryAvailability.providerAvailable === true &&
      inactiveDiscoveryAvailability.modelAvailable === false,
    "Inactive discovered model maps to groq_model_unavailable."
  );

  const availabilityErrorExpectations = {
    groq_credential_missing: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_authentication_failed: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_unavailable: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_timeout: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 504,
    },
    groq_http_error: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_malformed_response: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_output_too_large: {
      providerAvailable: false,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_model_unavailable: {
      providerAvailable: true,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_rate_limited: {
      providerAvailable: true,
      modelAvailable: false,
      quotaState: "unknown",
      status: 503,
    },
    groq_quota_exhausted: {
      providerAvailable: true,
      modelAvailable: false,
      quotaState: "exhausted",
      status: 503,
    },
  };
  for (const code of Object.keys(availabilityErrorExpectations)) {
    const expectation = availabilityErrorExpectations[code];
    const safeMessage = `safe-${code}`;
    const availabilityError = new groqClientModule.CodexForgeGroqError(
      code,
      safeMessage,
      expectation.status
    );
    const errorHarness = createFakeGroqClient({
      discoveryError: availabilityError,
    });
    const mappedAvailability =
      await groqAdapterModule
        .createPrivateAlphaGroqProviderAdapter({
          model: "openai/gpt-oss-20b",
          groqClient: errorHarness.client,
        })
        .getAvailability();
    assert(
      mappedAvailability.providerAvailable === expectation.providerAvailable &&
        mappedAvailability.modelAvailable === expectation.modelAvailable &&
        mappedAvailability.quotaState === expectation.quotaState &&
        mappedAvailability.errorCode === code &&
        mappedAvailability.safeErrorMessage === safeMessage,
      `Availability mapping is exact for ${code}.`
    );
  }

  const emptyAvailabilityError = new groqClientModule.CodexForgeGroqError(
    "groq_empty_response",
    "safe-groq-empty-response",
    503
  );
  const emptyAvailabilityHarness = createFakeGroqClient({
    discoveryError: emptyAvailabilityError,
  });
  try {
    await groqAdapterModule
      .createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: emptyAvailabilityHarness.client,
      })
      .getAvailability();
    throw new Error("Expected groq_empty_response to be rethrown.");
  } catch (error) {
    assert(
      error === emptyAvailabilityError,
      "groq_empty_response is not returned from availability."
    );
  }

  const unknownAvailabilityError = new Error("unexpected availability failure");
  const unknownAvailabilityHarness = createFakeGroqClient({
    discoveryError: unknownAvailabilityError,
  });
  try {
    await groqAdapterModule
      .createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: unknownAvailabilityHarness.client,
      })
      .getAvailability();
    throw new Error("Expected unknown availability failure to be rethrown.");
  } catch (error) {
    assert(error === unknownAvailabilityError, "Unknown availability failures are rethrown.");
  }

  const mismatchHarness = createFakeGroqClient();
  const mismatchAdapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-20b",
    groqClient: mismatchHarness.client,
  });
  await expectProviderError(
    () =>
      mismatchAdapter.generateApprovedText({
        approvedRequestText: "mismatch request",
        model: "openai/gpt-oss-120b",
        maximumOutputTokens: 16,
      }),
    "groq_model_unavailable",
    503,
    "Groq adapter is bound to a different model."
  );
  assert(
    mismatchHarness.stats.generationCalls === 0,
    "Groq model mismatch is rejected before generation."
  );

  const exactGroqOutput = "  groq visible output  \n";
  const groqGenerationHarness = createFakeGroqClient({
    generationResult: {
      model: "openai/gpt-oss-20b",
      outputText: exactGroqOutput,
      finishReason: "stop",
      promptTokens: 12,
      outputTokens: 34,
      totalTokens: 46,
      totalDurationNanoseconds: 1250000000,
    },
  });
  const groqGenerationAdapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
    model: "openai/gpt-oss-20b",
    groqClient: groqGenerationHarness.client,
  });
  const groqGenerated = await groqGenerationAdapter.generateApprovedText({
    approvedRequestText: "bounded request",
    model: "openai/gpt-oss-20b",
    maximumOutputTokens: 77,
  });
  assert(
    groqGenerated.outputText === exactGroqOutput &&
      groqGenerated.doneReason === "stop" &&
      groqGenerated.totalDurationNanoseconds === 1250000000 &&
      groqGenerated.loadDurationNanoseconds === null &&
      groqGenerated.promptEvalCount === 12 &&
      groqGenerated.evalCount === 34,
    "Groq generation preserves output and maps metrics exactly."
  );

  for (const code of groqErrorCodes) {
    const safeMessage = `safe-${code}`;
    const status = code === "groq_timeout" ? 504 : 503;
    const generationErrorHarness = createFakeGroqClient({
      generationError: new groqClientModule.CodexForgeGroqError(
        code,
        safeMessage,
        status
      ),
    });
    const generationErrorAdapter = groqAdapterModule.createPrivateAlphaGroqProviderAdapter({
      model: "openai/gpt-oss-20b",
      groqClient: generationErrorHarness.client,
    });
    await expectProviderError(
      () =>
        generationErrorAdapter.generateApprovedText({
          approvedRequestText: "generation failure",
          model: "openai/gpt-oss-20b",
          maximumOutputTokens: 12,
        }),
      code,
      status,
      safeMessage
    );
  }

  const unknownGenerationError = new Error("unexpected generation failure");
  const unknownGenerationHarness = createFakeGroqClient({
    generationError: unknownGenerationError,
  });
  try {
    await groqAdapterModule
      .createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: unknownGenerationHarness.client,
      })
      .generateApprovedText({
        approvedRequestText: "generation failure",
        model: "openai/gpt-oss-20b",
        maximumOutputTokens: 12,
      });
    throw new Error("Expected unknown generation failure to be rethrown.");
  } catch (error) {
    assert(error === unknownGenerationError, "Unknown generation failures are rethrown.");
  }

  assert(
    JSON.stringify(runtimeModule.PRIVATE_ALPHA_RUNTIME_MODEL_KEYS) ===
      JSON.stringify([
        "ollama-local::gpt-oss:20b",
        "groq-cloud::openai/gpt-oss-20b",
        "groq-cloud::openai/gpt-oss-120b",
      ]),
    "Runtime model-key ordering is exact."
  );
  assert(
    runtimeModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ===
      "ollama-local::gpt-oss:20b" &&
      runtimeModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY ===
        "groq-cloud::openai/gpt-oss-20b" &&
      runtimeModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY ===
        "groq-cloud::openai/gpt-oss-120b",
    "Runtime model-key constants are exact."
  );

  const factoryOllamaHarness = createFakeOllamaClient();
  const factoryOllamaAdapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      {
        ollamaClient: factoryOllamaHarness.client,
      }
    );
  assert(
    factoryOllamaAdapter.identity.modelKey === "ollama-local::gpt-oss:20b",
    "Runtime factory resolves Ollama exactly."
  );
  const factoryGroq20Harness = createFakeGroqClient();
  const factoryGroq20Adapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      {
        groqClient: factoryGroq20Harness.client,
      }
    );
  assert(
    factoryGroq20Adapter.identity.modelKey === "groq-cloud::openai/gpt-oss-20b",
    "Runtime factory resolves Groq 20b exactly."
  );
  const factoryGroq120Harness = createFakeGroqClient();
  const factoryGroq120Adapter =
    runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
      runtimeModule.PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
      {
        groqClient: factoryGroq120Harness.client,
      }
    );
  assert(
    factoryGroq120Adapter.identity.modelKey === "groq-cloud::openai/gpt-oss-120b",
    "Runtime factory resolves Groq 120b exactly."
  );
  assert(
    factoryOllamaHarness.stats.availabilityCalls === 0 &&
      factoryOllamaHarness.stats.generationCalls === 0 &&
      factoryGroq20Harness.stats.discoveryCalls === 0 &&
      factoryGroq20Harness.stats.generationCalls === 0 &&
      factoryGroq120Harness.stats.discoveryCalls === 0 &&
      factoryGroq120Harness.stats.generationCalls === 0,
    "Adapter construction performs no provider call."
  );

  let optionReads = 0;
  const unreadOllamaHarness = createFakeOllamaClient();
  const unreadGroqHarness = createFakeGroqClient();
  const lazyOptions = {};
  Object.defineProperty(lazyOptions, "ollamaClient", {
    enumerable: true,
    get() {
      optionReads += 1;
      return unreadOllamaHarness.client;
    },
  });
  Object.defineProperty(lazyOptions, "groqClient", {
    enumerable: true,
    get() {
      optionReads += 1;
      return unreadGroqHarness.client;
    },
  });
  await expectRuntimeError(() =>
    Promise.resolve(
      runtimeModule.createPrivateAlphaProviderAdapterForModelKey(
        "unsupported-provider::unsupported-model",
        lazyOptions
      )
    )
  );
  assert(
    optionReads === 0 &&
      unreadOllamaHarness.stats.availabilityCalls === 0 &&
      unreadOllamaHarness.stats.generationCalls === 0 &&
      unreadGroqHarness.stats.discoveryCalls === 0 &&
      unreadGroqHarness.stats.generationCalls === 0,
    "Unknown model key performs no client access or provider call."
  );

  const inspectAvailableHarness = createFakeGroqClient({
    discoveryResult: {
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
    },
  });
  const availableInspection =
    await runtimeModule.inspectPrivateAlphaProviderRuntime(
      runtimeModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      {
        groqClient: inspectAvailableHarness.client,
        now: () => "2026-07-26T12:00:00.000Z",
        monotonicNowMs: (() => {
          const readings = [10, 18];
          return () => readings.shift();
        })(),
      }
    );
  assert(
    inspectAvailableHarness.stats.discoveryCalls === 1 &&
      inspectAvailableHarness.stats.generationCalls === 0,
    "Runtime inspection calls availability once and never calls generation."
  );
  assert(
    availableInspection.snapshot.availability === "available" &&
      availableInspection.snapshot.quotaState === "available" &&
      availableInspection.snapshot.observedAt === "2026-07-26T12:00:00.000Z" &&
      availableInspection.snapshot.observedLatencyMs === 8,
    "Available runtime inspection produces the expected snapshot."
  );
  assert(
    Object.isFrozen(availableInspection) &&
      Object.isFrozen(availableInspection.identity) &&
      Object.isFrozen(availableInspection.availability) &&
      Object.isFrozen(availableInspection.snapshot),
    "Runtime inspection objects are frozen."
  );

  const inspectUnavailableHarness = createFakeOllamaClient({
    availability: {
      providerAvailable: true,
      modelAvailable: false,
      errorCode: "ollama_model_missing",
      safeErrorMessage: "The required local Ollama model is not installed.",
    },
  });
  const unavailableInspection =
    await runtimeModule.inspectPrivateAlphaProviderRuntime(
      runtimeModule.PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      {
        ollamaClient: inspectUnavailableHarness.client,
        now: () => "2026-07-26T12:05:00.000Z",
        monotonicNowMs: (() => {
          const readings = [50, 59];
          return () => readings.shift();
        })(),
      }
    );
  assert(
    inspectUnavailableHarness.stats.availabilityCalls === 1 &&
      inspectUnavailableHarness.stats.generationCalls === 0,
    "Unavailable runtime inspection also performs one availability call."
  );
  assert(
    unavailableInspection.snapshot.availability === "unavailable" &&
      unavailableInspection.snapshot.quotaState === "not-applicable" &&
      unavailableInspection.snapshot.observedAt === "2026-07-26T12:05:00.000Z" &&
      unavailableInspection.snapshot.observedLatencyMs === 9,
    "Unavailable runtime inspection preserves quota state and marks the snapshot unavailable."
  );

  const invalidLatencyHarness = createFakeGroqClient();
  const invalidLatencyInspection =
    await runtimeModule.inspectPrivateAlphaProviderRuntime(
      runtimeModule.PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      {
        groqClient: invalidLatencyHarness.client,
        now: () => "2026-07-26T12:10:00.000Z",
        monotonicNowMs: (() => {
          const readings = [20, 10];
          return () => readings.shift();
        })(),
      }
    );
  assert(
    invalidLatencyInspection.snapshot.observedLatencyMs === null,
    "Invalid latency clocks return null."
  );

  const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  assert(
    modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
      "codexforge-model-routing-v4",
    "Production catalog version remains v4."
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
    "Groq production routing preserves free-first 20B automation and manual-only 120B."
  );

  const localModel = productionCatalog.models.find(
    (entry) => entry.modelKey === "ollama-local::gpt-oss:20b"
  );
  const runtimeSnapshots = productionCatalog.models.map((model) => ({
    modelKey: model.modelKey,
    availability: "available",
    quotaState:
      model.providerId === "groq-cloud" ? "available" : "not-applicable",
    observedLatencyMs: 1,
    observedAt: "2026-07-26T00:00:00.000Z",
  }));
  const localOnlyDecision = routingModule.routeCodexForgeModel(
    routeRequest(routePolicy("local-only"), runtimeSnapshots),
    productionCatalog
  );
  const freeOnlyDecision = routingModule.routeCodexForgeModel(
    routeRequest(routePolicy("free-only"), runtimeSnapshots),
    productionCatalog
  );
  const freeFirstDecision = routingModule.routeCodexForgeModel(
    routeRequest(routePolicy("free-first"), runtimeSnapshots),
    productionCatalog
  );
  const bestBudgetDecision = routingModule.routeCodexForgeModel(
    routeRequest(routePolicy("best-within-budget"), runtimeSnapshots),
    productionCatalog
  );
  assert(
    localOnlyDecision.selectedModelKey === localModel.modelKey &&
      freeOnlyDecision.selectedModelKey === localModel.modelKey &&
      freeFirstDecision.selectedModelKey === localModel.modelKey &&
      bestBudgetDecision.selectedModelKey === localModel.modelKey,
    "Automatic routing remains local-first when local Ollama is available."
  );
  const noLocalRuntimeSnapshots = productionCatalog.models.map((model) => ({
    modelKey: model.modelKey,
    availability:
      model.modelKey === localModel.modelKey ? "unavailable" : "available",
    quotaState:
      model.providerId === "groq-cloud" ? "available" : "not-applicable",
    observedLatencyMs: 1,
    observedAt: "2026-07-26T00:00:00.000Z",
  }));
  const noLocalDecision = routingModule.routeCodexForgeModel(
    routeRequest(routePolicy("free-first"), noLocalRuntimeSnapshots, 512),
    productionCatalog
  );
  assert(
    noLocalDecision.status === "selected" &&
      noLocalDecision.selectedModelKey === groq20CatalogModel.modelKey,
    "Automatic free-first routing selects the exact Groq 20B model only after local is unavailable."
  );

  try {
    const storeLabel = await prepareTestDataRoot("slice-h-runtime-store");
    const localProviderHarness = createFakeLocalProviderAdapter({
      generationResult: {
        outputText: "visible local output",
        doneReason: "stop",
        totalDurationNanoseconds: 10,
        loadDurationNanoseconds: 2,
        promptEvalCount: 3,
        evalCount: 4,
      },
    });
    const store = storeModule.createPrivateAlphaStoreForTesting(
      "slice-h-runtime-store",
      {
        runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
        providerAdapter: localProviderHarness.providerAdapter,
      }
    );
    const preparedRun = await createApprovedRun(store, "slice-h-runtime-store");
    assert(
      preparedRun.created.run.request.providerPreference === "ollama-local" &&
        preparedRun.created.run.request.modelPreferenceLabel === "gpt-oss:20b",
      "Current private-alpha store still creates only local Ollama runs."
    );
    const executedRun = await store.executeRun(
      preparedRun.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: preparedRun.approved.approvalScopeHash,
        expectedRevision: preparedRun.approved.revision,
      },
      "slice-h-runtime-store-execute-0001"
    );
    const persistedText = await fsp.readFile(
      getRunFileAbsolutePath(storeLabel, preparedRun.approved.runId),
      "utf8"
    );
    const persistedRun = JSON.parse(persistedText);
    assert(
      executedRun.run.execution.provider === "ollama-local" &&
        executedRun.run.execution.model === "gpt-oss:20b" &&
        persistedRun.execution.provider === "ollama-local" &&
        persistedRun.execution.model === "gpt-oss:20b",
      "No Groq execution record is produced."
    );
    assert(
      !persistedText.includes("groq-cloud") &&
        !persistedText.includes("openai/gpt-oss-20b") &&
        !persistedText.includes("openai/gpt-oss-120b") &&
        !persistedText.includes("GROQ_API_KEY") &&
        !persistedText.includes("groq-test-secret-key") &&
        !persistedText.includes("acceptance_token"),
      "No credential, API key, or acceptance token is stored."
    );
  } finally {
    await cleanupCreatedDataRoots();
  }

  assert(
    touchedDataRoots.size > 0 &&
      Array.from(touchedDataRoots).every((label) =>
        label.startsWith(`${privateAlpha.PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/`)
      ) &&
      !touchedDataRoots.has(privateAlpha.PRIVATE_ALPHA_DATA_ROOT_LABEL),
    "Production private-alpha data root stays untouched."
  );
  assert(fetchCallCount === 0, "No provider fetch runs in the Slice H smoke.");

  return {
    success: true,
    touchedTestDataRoots: touchedDataRoots.size,
    fetchCallCount,
  };
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
  throw "[FAIL] Slice H runtime validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.touchedTestDataRoots -gt 0) "Only private-alpha test data roots were touched"
Assert-True ($validation.fetchCallCount -eq 0) "The Slice H smoke performs no provider fetch"

Write-Host "[PASS] CodexForge Private Alpha Groq adapter runtime foundation smoke complete."
