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

function Assert-NoGitDiff {
  param([string]$Path, [string]$Message)
  $diff = ((& git diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

Write-Host ""
Write-Host "=== CodexForge Private Alpha provider adapter foundation smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-state-machine.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-kill-switch.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-ollama-adapter.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\app\api\codexforge\private-alpha\status\route.ts",
  "src\app\api\codexforge\private-alpha\runs\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\approve\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\cancel\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\execute\route.ts",
  "src\app\athena\page.tsx",
  "src\lib\codexforge\navigation-shell\navigation-shell-types.ts",
  "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx",
  "docs\codexforge-private-alpha-v0.md",
  "docs\codexforge-private-alpha-local-ollama-execution-v0.md",
  "docs\codexforge-private-alpha-provider-adapter-foundation-v0.md",
  "scripts\smoke-codexforge-private-alpha-run-approval-audit-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-local-ollama-execution.ps1",
  "scripts\smoke-codexforge-private-alpha-gpt-oss-visible-response.ps1",
  "scripts\smoke-codexforge-private-alpha-provider-adapter-foundation.ps1"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

$tokens = $null
$parseErrors = $null
[System.Management.Automation.Language.Parser]::ParseFile(
  $PSCommandPath,
  [ref]$tokens,
  [ref]$parseErrors
) | Out-Null
Assert-True ($parseErrors.Count -eq 0) "PowerShell parses"

$providerPath = "src\lib\codexforge\private-alpha\private-alpha-provider.server.ts"
$adapterPath = "src\lib\codexforge\private-alpha\private-alpha-ollama-adapter.server.ts"
$storePath = "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"

$providerSource = Get-Content -Raw $providerPath
$adapterSource = Get-Content -Raw $adapterPath
$storeSource = Get-Content -Raw $storePath

$providerFirstLine = Get-Content $providerPath -TotalCount 1
$adapterFirstLine = Get-Content $adapterPath -TotalCount 1
Assert-True ($providerFirstLine -eq 'import "server-only";') 'Generic provider module begins with import "server-only";'
Assert-True ($adapterFirstLine -eq 'import "server-only";') 'Ollama adapter module begins with import "server-only";'

foreach ($forbidden in @(
  "127.0.0.1",
  "11434",
  "/api/tags",
  "/api/chat",
  "process.env",
  "localStorage",
  "sessionStorage"
)) {
  Assert-True (-not $providerSource.Contains($forbidden)) "Generic provider module excludes $forbidden"
}

$providerSdkPattern =
  '\bfrom\s+["''](?:openai|groq-sdk|@google\/genai|google-genai|openrouter|anthropic|@anthropic-ai\/sdk)["'']'
Assert-True (
  -not [regex]::IsMatch($providerSource, '\bfetch\s*\(')
) "Generic provider module contains no raw fetch"
Assert-True (
  -not [regex]::IsMatch($providerSource, $providerSdkPattern)
) "Generic provider module contains no provider SDK import"

foreach ($forbidden in @(
  "./private-alpha-ollama.server",
  "PrivateAlphaOllamaError",
  "PrivateAlphaOllamaClient",
  "createPrivateAlphaOllamaClient"
)) {
  Assert-True (-not $storeSource.Contains($forbidden)) "Store excludes $forbidden"
}
Assert-True (
  -not [regex]::IsMatch($storeSource, 'ollamaClient\s*\?:')
) "Store excludes ollamaClient store option"

Assert-Contains $providerSource "identity: PrivateAlphaProviderIdentity;" "Provider contract requires provider identity"
Assert-Contains $providerSource "quotaState: CodexForgeQuotaState;" "Provider availability requires quotaState"

foreach ($requiredToken in @(
  "PrivateAlphaProviderAdapter",
  "PrivateAlphaProviderError",
  "createPrivateAlphaOllamaProviderAdapter",
  "providerAdapter.getAvailability()",
  "providerAdapter.generateApprovedText("
)) {
  Assert-Contains $storeSource $requiredToken "Store contains $requiredToken"
}

Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-store.server.ts" "Current private-alpha store remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-validation.ts" "Current private-alpha validation remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "Current private-alpha state machine remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "Current private-alpha API routes remain unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Current private-alpha-ollama.server.ts remains unchanged"

$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"

$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $videoPanelSource $marker "/jarvis-video retains above-the-fold marker $marker"
}

$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const crypto = require("crypto");
const Module = require("module");
const ts = require("typescript");

async function main() {
  const repoRoot = process.argv[2];

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
  const adapterModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama-adapter.server.ts"
  ));
  const ollamaModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama.server.ts"
  ));

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  async function expectStoreError(work, expectedStatus, messageFragment) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof storeModule.PrivateAlphaStoreError,
        "Expected a PrivateAlphaStoreError."
      );
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      if (messageFragment) {
        assert(
          String(error.message).includes(messageFragment),
          `Expected error to include ${messageFragment}.`
        );
      }
      return error;
    }

    throw new Error(`Expected PrivateAlphaStoreError status ${expectedStatus}.`);
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
        "Expected a PrivateAlphaProviderError."
      );
      assert(
        error.name === "PrivateAlphaProviderError",
        "Provider error name must be stable."
      );
      assert(error.code === expectedCode, `Expected provider error code ${expectedCode}.`);
      assert(error.status === expectedStatus, `Expected provider status ${expectedStatus}.`);
      assert(
        error.safeMessage === expectedSafeMessage,
        "Expected the bounded provider safe message."
      );
      return error;
    }

    throw new Error(`Expected PrivateAlphaProviderError code ${expectedCode}.`);
  }

  function readText(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  }

  function toAbsolutePath(relativePath) {
    return path.join(repoRoot, ...relativePath.split("/"));
  }

  function sha256(value) {
    return crypto.createHash("sha256").update(value, "utf8").digest("hex");
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
      "Production private-alpha data root must never be touched."
    );
  }

  async function resetDataRoot(label) {
    assertTestingDataRoot(label);
    touchedDataRoots.add(label);
    await fsp.rm(path.join(repoRoot, ...label.split("/")), {
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

  async function writeKillSwitch(label, value) {
    assertTestingDataRoot(label);
    touchedDataRoots.add(label);
    const directoryAbsolutePath = toAbsolutePath(label);
    await fsp.mkdir(directoryAbsolutePath, { recursive: true });
    await fsp.writeFile(
      path.join(directoryAbsolutePath, "KILL_SWITCH"),
      `${value}\n`,
      "utf8"
    );
  }

  function createFakeOllamaClient(options = {}) {
    return {
      async getAvailability() {
        if (options.availabilityError) {
          throw options.availabilityError;
        }

        return (
          options.availability ?? {
            providerAvailable: true,
            modelAvailable: true,
            errorCode: null,
            safeErrorMessage: null,
          }
        );
      },

      async generateApprovedText(input) {
        if (options.onGenerateInput) {
          options.onGenerateInput(input);
        }

        if (options.generationError) {
          throw options.generationError;
        }

        return (
          options.generationResult ?? {
            model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
            outputText: "default provider output",
            doneReason: null,
            totalDurationNanoseconds: null,
            loadDurationNanoseconds: null,
            promptEvalCount: null,
            evalCount: null,
          }
        );
      },
    };
  }

  function createFakeProviderHarness(options = {}) {
    let availabilityCalls = 0;
    let generationCalls = 0;
    const generationInputs = [];

    const providerAdapter = {
      async getAvailability() {
        availabilityCalls += 1;
        if (options.availabilityError) {
          throw options.availabilityError;
        }

        return (
          options.availability ?? {
            providerAvailable: true,
            modelAvailable: true,
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
          options.generationResult ?? {
            outputText: "default provider output",
            doneReason: null,
            totalDurationNanoseconds: null,
            loadDurationNanoseconds: null,
            promptEvalCount: null,
            evalCount: null,
          }
        );
      },
    };

    return {
      providerAdapter,
      getStats() {
        return {
          availabilityCalls,
          generationCalls,
          generationInputs: generationInputs.map((entry) => ({ ...entry })),
        };
      },
    };
  }

  function createLocalStore(testSuffix, providerAdapter) {
    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      providerAdapter,
    });
  }

  function getRunFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "runs", `${runId}.json`);
  }

  async function createApprovedRun(store, scenarioName, requestText, maximumOutputTokens) {
    const created = await store.createRun(
      {
        requestText,
        capability: "code",
        modelPreferenceLabel: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens,
      },
      `${scenarioName}-create-0001`
    );
    assert(created.run.state === "awaiting_approval", "Run must start awaiting approval.");

    const approved = await store.approveRun(created.run.runId, {
      approvalScopeHash: created.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: created.run.revision,
    });
    assert(approved.state === "approved", "Approved run must remain approved before execution.");

    return { created, approved };
  }

  const providerSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts"
  );
  const adapterSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts"
  );
  const storeSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
  );
  const indexSource = readText(
    "src/lib/codexforge/private-alpha/index.ts"
  );
  const changedTypeScriptFiles = [
    "src/lib/codexforge/private-alpha/private-alpha-types.ts",
    "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
  ];
  const tsEscapePattern = /@ts-nocheck|@ts-expect-error|\bas any\b|:\s*any\b/;

  assert(
    !indexSource.includes("private-alpha-provider.server.ts") &&
      !indexSource.includes("PrivateAlphaProviderError") &&
      !indexSource.includes("createPrivateAlphaOllamaProviderAdapter"),
    "Server-only provider modules must stay out of the client-safe index."
  );
  assert(
    !/\b127\.0\.0\.1\b|\b11434\b|\/api\/tags|\/api\/chat|process\.env|localStorage|sessionStorage/.test(
      providerSource
    ),
    "Generic provider source must stay transport-free."
  );
  assert(!/\bfetch\s*\(/.test(providerSource), "Generic provider source must not call fetch.");
  assert(
    !/\bfrom\s+["'](?:openai|groq-sdk|@google\/genai|google-genai|openrouter|anthropic|@anthropic-ai\/sdk)["']/.test(
      providerSource
    ),
    "Generic provider source must not import a provider SDK."
  );
  assert(
    providerSource.includes("identity: PrivateAlphaProviderIdentity;"),
    "Provider contract requires provider identity."
  );
  assert(
    providerSource.includes("quotaState: CodexForgeQuotaState;"),
    "Provider availability requires quotaState."
  );
  assert(
    storeSource.includes("PrivateAlphaProviderAdapter") &&
      storeSource.includes("PrivateAlphaProviderError") &&
      storeSource.includes("createPrivateAlphaOllamaProviderAdapter") &&
      storeSource.includes("providerAdapter.getAvailability()") &&
      storeSource.includes("providerAdapter.generateApprovedText("),
    "Store must use the provider adapter boundary."
  );
  assert(
    !storeSource.includes("./private-alpha-ollama.server") &&
      !storeSource.includes("PrivateAlphaOllamaError") &&
      !storeSource.includes("PrivateAlphaOllamaClient") &&
      !storeSource.includes("createPrivateAlphaOllamaClient") &&
      !/ollamaClient\s*\?:/.test(storeSource),
    "Store must not depend directly on the Ollama client."
  );
  assert(
    changedTypeScriptFiles.every(
      (relativePath) => !tsEscapePattern.test(readText(relativePath))
    ),
    "No ts escape hatch may be introduced."
  );
  assert(
    Math.max(
      ...[
        "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
        "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
        "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
        "docs/codexforge-private-alpha-provider-adapter-foundation-v0.md",
      ].map((relativePath) => relativePath.length)
    ) < 220,
    "Longest new source path must stay under 220 characters."
  );

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
  const appendedGroqErrorCodes = [
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
  assert(
    JSON.stringify(
      privateAlpha.PRIVATE_ALPHA_EXECUTION_ERROR_CODES.slice(
        0,
        originalOllamaErrorCodes.length
      )
    ) === JSON.stringify(originalOllamaErrorCodes),
    "Original Ollama execution error code ordering remains unchanged."
  );
  assert(
    JSON.stringify(
      privateAlpha.PRIVATE_ALPHA_EXECUTION_ERROR_CODES.slice(
        originalOllamaErrorCodes.length
      )
    ) === JSON.stringify(appendedGroqErrorCodes),
    "Groq execution error codes are appended in the required order."
  );

  const identityAdapter = adapterModule.createPrivateAlphaOllamaProviderAdapter({
    ollamaClient: createFakeOllamaClient(),
  });
  assert(Object.isFrozen(identityAdapter), "Ollama adapter is frozen.");
  assert(Object.isFrozen(identityAdapter.identity), "Ollama adapter identity is frozen.");
  assert(
    JSON.stringify(identityAdapter.identity) ===
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
    "Ollama adapter identity is exact."
  );

  const delegatedAvailability = {
    providerAvailable: true,
    modelAvailable: false,
    errorCode: "ollama_model_missing",
    safeErrorMessage: "The required local Ollama model is not installed.",
  };
  const availabilityAdapter = adapterModule.createPrivateAlphaOllamaProviderAdapter({
    ollamaClient: createFakeOllamaClient({
      availability: delegatedAvailability,
    }),
  });
  const availability = await availabilityAdapter.getAvailability();
  assert(
    availability.providerAvailable === delegatedAvailability.providerAvailable &&
      availability.modelAvailable === delegatedAvailability.modelAvailable &&
      availability.quotaState === "not-applicable" &&
      availability.errorCode === delegatedAvailability.errorCode &&
      availability.safeErrorMessage === delegatedAvailability.safeErrorMessage,
    "Ollama adapter availability preserves legacy fields and adds quotaState not-applicable."
  );

  const exactOutput = "  visible output with preserved edges  \n";
  const generationAdapter = adapterModule.createPrivateAlphaOllamaProviderAdapter({
    ollamaClient: createFakeOllamaClient({
      generationResult: {
        model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        outputText: exactOutput,
        doneReason: "stop",
        totalDurationNanoseconds: 101,
        loadDurationNanoseconds: 17,
        promptEvalCount: 23,
        evalCount: 29,
      },
    }),
  });
  const generated = await generationAdapter.generateApprovedText({
    approvedRequestText: "approved adapter request",
    model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
    maximumOutputTokens: 77,
  });
  assert(
    generated.outputText === exactOutput &&
      generated.doneReason === "stop" &&
      generated.totalDurationNanoseconds === 101 &&
      generated.loadDurationNanoseconds === 17 &&
      generated.promptEvalCount === 23 &&
      generated.evalCount === 29,
    "Ollama adapter generation must preserve exact output and provider metrics."
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
  for (const code of knownOllamaCodes) {
    const expectedStatus = code === "ollama_timeout" ? 504 : 503;
    const safeMessage = `safe-${code}`;
    const erroringAdapter = adapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: createFakeOllamaClient({
        generationError: new ollamaModule.PrivateAlphaOllamaError(
          code,
          safeMessage,
          expectedStatus
        ),
      }),
    });
    await expectProviderError(
      () =>
        erroringAdapter.generateApprovedText({
          approvedRequestText: "known failure request",
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          maximumOutputTokens: 12,
        }),
      code,
      expectedStatus,
      safeMessage
    );
  }

  const normalizedKillSwitchAdapter =
    adapterModule.createPrivateAlphaOllamaProviderAdapter({
      ollamaClient: createFakeOllamaClient({
        generationError: new ollamaModule.PrivateAlphaOllamaError(
          "kill_switch_blocked",
          "safe-kill-switch",
          503
        ),
      }),
    });
  await expectProviderError(
    () =>
      normalizedKillSwitchAdapter.generateApprovedText({
        approvedRequestText: "kill switch normalization request",
        model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: 18,
      }),
    "ollama_http_error",
    503,
    "safe-kill-switch"
  );

  const unknownAdapterError = new Error("unexpected adapter failure");
  const passthroughAdapter = adapterModule.createPrivateAlphaOllamaProviderAdapter({
    ollamaClient: createFakeOllamaClient({
      generationError: unknownAdapterError,
    }),
  });
  try {
    await passthroughAdapter.generateApprovedText({
      approvedRequestText: "unknown failure request",
      model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
      maximumOutputTokens: 15,
    });
    throw new Error("Expected the unknown adapter error to be rethrown.");
  } catch (error) {
    assert(error === unknownAdapterError, "Unknown adapter errors must be rethrown unchanged.");
  }

  try {
    const successTestSuffix = "slice-d-success";
    const successLabel = await prepareTestDataRoot(successTestSuffix);
    const successHarness = createFakeProviderHarness({
      generationResult: {
        outputText: exactOutput,
        doneReason: "stop",
        totalDurationNanoseconds: 111,
        loadDurationNanoseconds: 22,
        promptEvalCount: 33,
        evalCount: 44,
      },
    });
    const successStore = createLocalStore(
      successTestSuffix,
      successHarness.providerAdapter
    );
    const successPrepared = await createApprovedRun(
      successStore,
      "slice-d-success",
      "Slice D success request.",
      96
    );
    const successExecute = await successStore.executeRun(
      successPrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: successPrepared.approved.approvalScopeHash,
        expectedRevision: successPrepared.approved.revision,
      },
      "slice-d-success-execute-0001"
    );
    const successStats = successHarness.getStats();
    const successStoredRun = await successStore.getRun(successPrepared.approved.runId);
    const successPersisted = JSON.parse(
      await fsp.readFile(
        getRunFileAbsolutePath(successLabel, successPrepared.approved.runId),
        "utf8"
      )
    );
    assert(successExecute.replayed === false, "First successful execution must not replay.");
    assert(
      successPrepared.created.run.state === "awaiting_approval" &&
        successPrepared.approved.state === "approved" &&
        successExecute.run.state === "succeeded" &&
        successExecute.run.execution &&
        successExecute.run.execution.status === "succeeded",
      "Store must complete awaiting_approval -> approved -> executing -> succeeded."
    );
    assert(
      successExecute.run.execution.provider === privateAlpha.PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID &&
        successExecute.run.execution.model === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL &&
        successExecute.run.execution.outputText === exactOutput &&
        successExecute.run.execution.outputSha256 === sha256(exactOutput) &&
        successExecute.run.execution.doneReason === "stop" &&
        successExecute.run.execution.totalDurationNanoseconds === 111 &&
        successExecute.run.execution.loadDurationNanoseconds === 22 &&
        successExecute.run.execution.promptEvalCount === 33 &&
        successExecute.run.execution.evalCount === 44 &&
        successExecute.run.revision === 4 &&
        successExecute.run.version === privateAlpha.PRIVATE_ALPHA_RECORD_VERSION,
      "Succeeded record must preserve provider, model, output, hash, metrics, revision, and version."
    );
    assert(
      successStoredRun.execution.outputText === exactOutput &&
        successPersisted.execution.outputText === exactOutput &&
        successPersisted.execution.outputSha256 === sha256(exactOutput),
      "Succeeded output must stay persisted exactly."
    );
    assert(
      successExecute.run.auditEvents.some((event) => event.eventType === "execution.started") &&
        successExecute.run.auditEvents.some((event) => event.eventType === "execution.succeeded"),
      "Succeeded run must record execution.started and execution.succeeded."
    );
    assert(
      successStats.availabilityCalls === 1 &&
        successStats.generationCalls === 1 &&
        successStats.generationInputs.length === 1 &&
        successStats.generationInputs[0].approvedRequestText ===
          successPrepared.created.run.request.normalizedRequestText &&
        successStats.generationInputs[0].model === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL &&
        successStats.generationInputs[0].maximumOutputTokens ===
          successPrepared.created.run.request.maximumOutputTokens,
      "Successful store execution must call the injected provider adapter once with the approved payload."
    );
    const successReplay = await successStore.executeRun(
      successPrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: successPrepared.approved.approvalScopeHash,
        expectedRevision: successPrepared.approved.revision,
      },
      "slice-d-success-execute-0001"
    );
    assert(
      successReplay.replayed === true &&
        successHarness.getStats().availabilityCalls === 1 &&
        successHarness.getStats().generationCalls === 1,
      "Same-key replay must perform no second generation call."
    );
    await expectStoreError(
      () =>
        successStore.executeRun(
          successPrepared.approved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: successPrepared.approved.approvalScopeHash,
            expectedRevision: successPrepared.approved.revision,
          },
          "slice-d-success-execute-0002"
        ),
      409,
      "one allowed execution attempt"
    );
    assert(
      successHarness.getStats().availabilityCalls === 1 &&
        successHarness.getStats().generationCalls === 1,
      "Different-key replay must perform no second generation call."
    );

    const knownFailureTestSuffix = "slice-d-known-provider-failure";
    await prepareTestDataRoot(knownFailureTestSuffix);
    const knownFailureHarness = createFakeProviderHarness({
      generationError: new providerModule.PrivateAlphaProviderError(
        "ollama_timeout",
        "Local Ollama did not respond before the fixed timeout.",
        504
      ),
    });
    const knownFailureStore = createLocalStore(
      knownFailureTestSuffix,
      knownFailureHarness.providerAdapter
    );
    const knownFailurePrepared = await createApprovedRun(
      knownFailureStore,
      "slice-d-known-provider-failure",
      "Slice D known failure request.",
      72
    );
    const knownFailureExecute = await knownFailureStore.executeRun(
      knownFailurePrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: knownFailurePrepared.approved.approvalScopeHash,
        expectedRevision: knownFailurePrepared.approved.revision,
      },
      "slice-d-known-provider-failure-execute-0001"
    );
    assert(
      knownFailureExecute.run.state === "failed" &&
        knownFailureExecute.run.execution &&
        knownFailureExecute.run.execution.status === "failed" &&
        knownFailureExecute.run.execution.outputText === null &&
        knownFailureExecute.run.execution.outputSha256 === null &&
        knownFailureExecute.run.execution.errorCode === "ollama_timeout" &&
        knownFailureExecute.run.execution.safeErrorMessage ===
          "Local Ollama did not respond before the fixed timeout." &&
        knownFailureExecute.responseStatus === 504 &&
        knownFailureExecute.errorCode === "ollama_timeout" &&
        knownFailureExecute.safeErrorMessage ===
          "Local Ollama did not respond before the fixed timeout." &&
        knownFailureExecute.run.auditEvents.some(
          (event) => event.eventType === "execution.failed"
        ),
      "Known provider failure after execution starts must stay bounded and persisted."
    );
    await expectStoreError(
      () =>
        knownFailureStore.executeRun(
          knownFailurePrepared.approved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: knownFailurePrepared.approved.approvalScopeHash,
            expectedRevision: knownFailurePrepared.approved.revision,
          },
          "slice-d-known-provider-failure-execute-0002"
        ),
      409,
      "one allowed execution attempt"
    );
    assert(
      knownFailureHarness.getStats().generationCalls === 1,
      "Known provider failure must still consume the one allowed execution attempt."
    );

    const unknownFailureTestSuffix = "slice-d-unknown-provider-failure";
    await prepareTestDataRoot(unknownFailureTestSuffix);
    const unknownFailureHarness = createFakeProviderHarness({
      generationError: new Error("unknown provider crash"),
    });
    const unknownFailureStore = createLocalStore(
      unknownFailureTestSuffix,
      unknownFailureHarness.providerAdapter
    );
    const unknownFailurePrepared = await createApprovedRun(
      unknownFailureStore,
      "slice-d-unknown-provider-failure",
      "Slice D unknown failure request.",
      64
    );
    const unknownFailureExecute = await unknownFailureStore.executeRun(
      unknownFailurePrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: unknownFailurePrepared.approved.approvalScopeHash,
        expectedRevision: unknownFailurePrepared.approved.revision,
      },
      "slice-d-unknown-provider-failure-execute-0001"
    );
    assert(
      unknownFailureExecute.run.state === "failed" &&
        unknownFailureExecute.responseStatus === 500 &&
        unknownFailureExecute.errorCode === "ollama_http_error" &&
        unknownFailureExecute.safeErrorMessage ===
          "Local Ollama execution failed unexpectedly." &&
        unknownFailureExecute.run.execution &&
        unknownFailureExecute.run.execution.errorCode === "ollama_http_error" &&
        unknownFailureExecute.run.execution.safeErrorMessage ===
          "Local Ollama execution failed unexpectedly.",
      "Unknown provider failure must keep the existing 500 fallback."
    );

    const unavailableTestSuffix = "slice-d-provider-unavailable";
    await prepareTestDataRoot(unavailableTestSuffix);
    const unavailableHarness = createFakeProviderHarness({
      availability: {
        providerAvailable: false,
        modelAvailable: false,
        errorCode: "ollama_unavailable",
        safeErrorMessage: "Local Ollama is unavailable on the fixed loopback endpoint.",
      },
    });
    const unavailableStore = createLocalStore(
      unavailableTestSuffix,
      unavailableHarness.providerAdapter
    );
    const unavailablePrepared = await createApprovedRun(
      unavailableStore,
      "slice-d-provider-unavailable",
      "Slice D unavailable provider request.",
      80
    );
    const unavailableExecute = await unavailableStore.executeRun(
      unavailablePrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: unavailablePrepared.approved.approvalScopeHash,
        expectedRevision: unavailablePrepared.approved.revision,
      },
      "slice-d-provider-unavailable-execute-0001"
    );
    assert(
      unavailableExecute.run.state === "blocked" &&
        unavailableExecute.run.execution &&
        unavailableExecute.run.execution.status === "blocked" &&
        unavailableExecute.errorCode === "ollama_unavailable" &&
        unavailableExecute.responseStatus === 503 &&
        unavailableHarness.getStats().availabilityCalls === 1 &&
        unavailableHarness.getStats().generationCalls === 0,
      "Unavailable provider must block before generation."
    );

    const missingModelTestSuffix = "slice-d-provider-model-missing";
    await prepareTestDataRoot(missingModelTestSuffix);
    const missingModelHarness = createFakeProviderHarness({
      availability: {
        providerAvailable: true,
        modelAvailable: false,
        errorCode: "ollama_model_missing",
        safeErrorMessage: "The required local Ollama model is not installed.",
      },
    });
    const missingModelStore = createLocalStore(
      missingModelTestSuffix,
      missingModelHarness.providerAdapter
    );
    const missingModelPrepared = await createApprovedRun(
      missingModelStore,
      "slice-d-provider-model-missing",
      "Slice D missing model request.",
      80
    );
    const missingModelExecute = await missingModelStore.executeRun(
      missingModelPrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: missingModelPrepared.approved.approvalScopeHash,
        expectedRevision: missingModelPrepared.approved.revision,
      },
      "slice-d-provider-model-missing-execute-0001"
    );
    assert(
      missingModelExecute.run.state === "blocked" &&
        missingModelExecute.run.execution &&
        missingModelExecute.run.execution.status === "blocked" &&
        missingModelExecute.errorCode === "ollama_model_missing" &&
        missingModelExecute.responseStatus === 503 &&
        missingModelHarness.getStats().availabilityCalls === 1 &&
        missingModelHarness.getStats().generationCalls === 0,
      "Missing model must block before generation."
    );

    const killSwitchTestSuffix = "slice-d-kill-switch";
    const killSwitchLabel = await prepareTestDataRoot(killSwitchTestSuffix);
    const killSwitchHarness = createFakeProviderHarness();
    const killSwitchStore = createLocalStore(
      killSwitchTestSuffix,
      killSwitchHarness.providerAdapter
    );
    const killSwitchPrepared = await createApprovedRun(
      killSwitchStore,
      "slice-d-kill-switch",
      "Slice D kill switch request.",
      70
    );
    await writeKillSwitch(killSwitchLabel, "1");
    const killSwitchExecute = await killSwitchStore.executeRun(
      killSwitchPrepared.approved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: killSwitchPrepared.approved.approvalScopeHash,
        expectedRevision: killSwitchPrepared.approved.revision,
      },
      "slice-d-kill-switch-execute-0001"
    );
    assert(
      killSwitchExecute.run.state === "blocked" &&
        killSwitchExecute.run.execution &&
        killSwitchExecute.run.execution.status === "blocked" &&
        killSwitchExecute.errorCode === "kill_switch_blocked" &&
        killSwitchExecute.responseStatus === 409 &&
        killSwitchHarness.getStats().availabilityCalls === 0 &&
        killSwitchHarness.getStats().generationCalls === 0,
      "Kill switch must block before provider generation."
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
    "No production private-alpha data root may be read, written, or deleted."
  );

  return {
    success: true,
    touchedTestDataRoots: touchedDataRoots.size,
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
  throw "[FAIL] Private-alpha provider adapter foundation validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.touchedTestDataRoots -gt 0) "Only private-alpha test data roots were touched"

Write-Host "[PASS] CodexForge Private Alpha provider adapter foundation smoke complete."
