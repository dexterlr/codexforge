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

Write-Host ""
Write-Host "=== CodexForge Private Alpha GPT-OSS visible-response smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\private-alpha\private-alpha-types.ts",
  "src\lib\codexforge\private-alpha\private-alpha-validation.ts",
  "src\lib\codexforge\private-alpha\private-alpha-state-machine.ts",
  "src\lib\codexforge\private-alpha\private-alpha-store.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-kill-switch.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts",
  "src\lib\codexforge\private-alpha\private-alpha-api-client.ts",
  "src\lib\codexforge\private-alpha\index.ts",
  "src\app\api\codexforge\private-alpha\status\route.ts",
  "src\app\api\codexforge\private-alpha\runs\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\approve\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\cancel\route.ts",
  "src\app\api\codexforge\private-alpha\runs\[runId]\execute\route.ts",
  "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx",
  "src\lib\codexforge\navigation-shell\navigation-shell-types.ts",
  "src\app\athena\page.tsx",
  "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx",
  "docs\codexforge-private-alpha-local-ollama-execution-v0.md",
  "scripts\smoke-codexforge-private-alpha-local-ollama-execution.ps1",
  "scripts\smoke-codexforge-private-alpha-gpt-oss-visible-response.ps1"
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

$ollamaSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts"
$ollamaFirstLine = (Get-Content "src\lib\codexforge\private-alpha\private-alpha-ollama.server.ts" -TotalCount 1)
Assert-True ($ollamaFirstLine -eq 'import "server-only";') 'Ollama module remains server-only.'
Assert-Contains $ollamaSource 'http://127.0.0.1:11434' "Origin remains the fixed loopback endpoint"
Assert-Contains $ollamaSource 'PRIVATE_ALPHA_OLLAMA_TAGS_PATH = "/api/tags"' "Only the fixed /api/tags path is declared"
Assert-Contains $ollamaSource 'PRIVATE_ALPHA_OLLAMA_CHAT_PATH = "/api/chat"' "Only the fixed /api/chat path is declared"
Assert-Contains $ollamaSource 'PRIVATE_ALPHA_OLLAMA_THINK_LEVEL = "low" as const;' 'Fixed GPT-OSS think level is declared as "low"'
Assert-Contains $ollamaSource '"ollama_empty_response"' "Empty visible-response error code is wired into the Ollama client"

$docSource = Get-Content -Raw "docs\codexforge-private-alpha-local-ollama-execution-v0.md"
Assert-Contains $docSource 'think: "low"' 'Documentation records the corrected think contract'
Assert-Contains $docSource "ollama_empty_response" "Documentation records the empty visible-response failure code"

$stateMachineDiff = ((& git diff --name-only -- "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" 2>$null) | Out-String).Trim()
Assert-True ([string]::IsNullOrWhiteSpace($stateMachineDiff)) "State-machine source file remains unchanged"

$apiRouteDiff = ((& git diff --name-only -- "src/app/api/codexforge/private-alpha" 2>$null) | Out-String).Trim()
Assert-True ([string]::IsNullOrWhiteSpace($apiRouteDiff)) "API route files remain unchanged"

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
  const ollamaModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-ollama.server.ts"
  ));
  const stateMachineModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-state-machine.ts"
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

  async function expectOllamaError(
    work,
    expectedCode,
    expectedStatus,
    expectedSafeMessage
  ) {
    try {
      await work();
    } catch (error) {
      assert(
        error instanceof ollamaModule.PrivateAlphaOllamaError,
        "Expected a PrivateAlphaOllamaError."
      );
      assert(error.code === expectedCode, `Expected error code ${expectedCode}.`);
      assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
      assert(
        error.safeMessage === expectedSafeMessage,
        "Expected the bounded safe Ollama error message."
      );
      return error;
    }

    throw new Error(`Expected PrivateAlphaOllamaError code ${expectedCode}.`);
  }

  function readText(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  }

  function toAbsolutePath(relativePath) {
    return path.join(repoRoot, ...relativePath.split("/"));
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

  function makeJsonResponse(payload, status = 200) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function createHarness(options = {}) {
    const callUrls = [];
    const redirects = [];
    const requestBodies = [];
    let tagsCalls = 0;
    let chatCalls = 0;

    const fetchFn = async (input, init = {}) => {
      const url = new URL(String(input));
      callUrls.push(url.toString());
      redirects.push(init.redirect ?? null);

      assert(
        url.origin === ollamaModule.PRIVATE_ALPHA_OLLAMA_ORIGIN,
        "Only the fixed Ollama origin may be used."
      );

      if (url.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH) {
        tagsCalls += 1;
        if (options.onTags) {
          return options.onTags({ url, init, tagsCalls, chatCalls, requestBodies });
        }

        return makeJsonResponse({
          models: [{ name: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL }],
        });
      }

      if (url.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_CHAT_PATH) {
        chatCalls += 1;
        if (init.body) {
          requestBodies.push(JSON.parse(String(init.body)));
        }

        if (options.onChat) {
          return options.onChat({ url, init, tagsCalls, chatCalls, requestBodies });
        }

        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "default visible output",
          },
          done: true,
        });
      }

      throw new Error(`Unexpected Ollama path ${url.pathname}.`);
    };

    return {
      fetchFn,
      getStats() {
        return {
          tagsCalls,
          chatCalls,
          callUrls: [...callUrls],
          redirects: [...redirects],
          requestBodies: [...requestBodies],
        };
      },
    };
  }

  function createDirectClient(harness, timeouts = {}) {
    return ollamaModule.createPrivateAlphaOllamaClientForTesting({
      fetchFn: harness.fetchFn,
      availabilityTimeoutMs: timeouts.availabilityTimeoutMs ?? 25,
      generationTimeoutMs: timeouts.generationTimeoutMs ?? 25,
    });
  }

  function createLocalStore(testSuffix, harness, timeouts = {}) {
    const ollamaClient = createDirectClient(harness, timeouts);
    return storeModule.createPrivateAlphaStoreForTesting(testSuffix, {
      runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
      ollamaClient,
    });
  }

  function getRunFileAbsolutePath(testLabel, runId) {
    return path.join(toAbsolutePath(testLabel), "runs", `${runId}.json`);
  }

  const sourceFiles = [
    "src/lib/codexforge/private-alpha/private-alpha-types.ts",
    "src/lib/codexforge/private-alpha/private-alpha-validation.ts",
    "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts",
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts",
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts",
    "src/lib/codexforge/private-alpha/index.ts",
    "src/app/api/codexforge/private-alpha/status/route.ts",
    "src/app/api/codexforge/private-alpha/runs/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
    "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
    "src/lib/codexforge/navigatio" +
      "n-shell/navigation-shell-types.ts",
    "src/app/athena/page.tsx",
    "src/lib/codexforge/jarvis-video-studio-release-candidate-map/components/JarvisVideoStudioReleaseCandidatePanel.tsx",
  ];
  const sourceText = sourceFiles.map(readText).join("\n");
  const ollamaSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts"
  );
  const clientSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-api-client.ts"
  );
  const panelSource = readText(
    "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx"
  );
  const executeRouteSource = readText(
    "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts"
  );
  const killSwitchSource = readText(
    "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts"
  );

  const cloudHostnamePattern =
    /\b(?:api\.openai\.com|api\.groq\.com|generativelanguage\.googleapis\.com|openrouter\.ai|api\.anthropic\.com)\b/i;
  const providerSdkPattern =
    /\bfrom\s+["'](?:openai|groq-sdk|@google\/genai|google-genai|openrouter|anthropic|@anthropic-ai\/sdk)["']/;
  const credentialEnvPattern =
    /\b(?:OPENAI_API_KEY|GROQ_API_KEY|GEMINI_API_KEY|OPENROUTER_API_KEY)\b/;
  const browserStoragePattern =
    /\b(?:localStorage|sessionStorage|indexedDB|document\.cookie)\b/i;
  const rawTransportPattern =
    /\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\b|\bsendBeacon\b/;
  const tsEscapePattern = /@ts-nocheck|@ts-expect-error|\bas any\b|:\s*any\b/;

  assert(
    stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.awaiting_approval.approve === "approved" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.approved.execute === "executing" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.succeed === "succeeded" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.fail === "failed" &&
      stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.executing.block === "blocked",
    "The required private-alpha state machine transitions must remain unchanged."
  );
  assert(
    Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.canceled).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.blocked).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.succeeded).length === 0 &&
      Object.keys(stateMachineModule.PRIVATE_ALPHA_TRANSITION_TABLE.failed).length === 0,
    "Private-alpha terminal states must remain terminal."
  );
  assert(
    ollamaSource.includes('redirect: "error"') &&
      ollamaSource.includes('PRIVATE_ALPHA_OLLAMA_ORIGIN = "http://127.0.0.1:11434"') &&
      ollamaSource.includes('PRIVATE_ALPHA_OLLAMA_THINK_LEVEL = "low" as const;') &&
      ollamaSource.includes("message.content.trim().length === 0"),
    "The Ollama client must keep the fixed origin, redirect rejection, think level, and empty visible-response guard."
  );
  assert(
    (ollamaSource.match(/\/api\//g) ?? []).length === 2,
    "Only /api/tags and /api/chat may be used by the Ollama module."
  );
  assert(
    !/origin\??\s*:|baseUrl|baseURL|providerUrl|providerURL/.test(ollamaSource),
    "No caller-controlled production origin may be accepted."
  );
  assert(!cloudHostnamePattern.test(sourceText), "No cloud provider hostname may exist.");
  assert(!providerSdkPattern.test(sourceText), "No provider SDK import may exist.");
  assert(!credentialEnvPattern.test(sourceText), "No credential environment variable may be read.");
  assert(
    executeRouteSource.includes('request.headers.get("Idempotency-Key")') &&
      executeRouteSource.includes("store.executeRun"),
    "The execute route must continue to delegate through the store."
  );
  assert(
    killSwitchSource.includes("CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH") &&
      (killSwitchSource.match(/process\.env\./g) ?? []).length === 1,
    "Kill-switch environment reads must remain bounded."
  );
  assert(
    clientSource.includes("/execute") &&
      clientSource.includes('const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";') &&
      !/https?:\/\//i.test(clientSource),
    "Browser calls must stay on same-origin private-alpha routes."
  );
  assert(
    !clientSource.includes("127.0.0.1:11434") && !panelSource.includes("127.0.0.1:11434"),
    "Browser code must not reference the Ollama loopback port."
  );
  assert(!rawTransportPattern.test(panelSource), "PrivateAlphaRunPanel must not contain raw fetch.");
  assert(
    !browserStoragePattern.test(clientSource) && !browserStoragePattern.test(panelSource),
    "No browser storage may be used by the private-alpha browser boundary."
  );
  assert(
    panelSource.includes("GPT-OSS reasoning effort is fixed to low") &&
      panelSource.includes("uses part of") &&
      panelSource.includes("Very small limits may finish without") &&
      panelSource.includes("visible final text."),
    "The Advanced settings helper copy must explain the fixed reasoning budget."
  );
  assert(!tsEscapePattern.test(sourceText), "No any, as any, ts-nocheck, or ts-expect-error may exist.");

  const emptySafeMessage =
    "Local Ollama completed without a visible final response. Create a new run with a larger output-token budget.";
  const successRequestText = "Return the visible final response only.";
  const successVisibleOutput = "  visible final response  ";
  const successThinkingText = "internal reasoning should stay private";
  const emptyRequestText =
    "Failure prompt text that must stay out of safe errors and failure audit summaries.";
  const emptyThinkingText = "failure-path reasoning text that must stay hidden";
  let successResponseIncludedThinking = false;

  try {
    const successTestSuffix = "slice-c-success-visible-001";
    const successLabel = await prepareTestDataRoot(successTestSuffix);
    const successHarness = createHarness({
      onChat({ init }) {
        const payload = JSON.parse(String(init.body));
        successResponseIncludedThinking = true;
        assert(init.redirect === "error", "Redirects must remain rejected.");
        assert(
          payload.model === privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          "Chat request must use gpt-oss:20b."
        );
        assert(
          Object.keys(payload).sort().join(",") === "messages,model,options,stream,think",
          "Chat request body must remain exactly bounded."
        );
        assert(
          Array.isArray(payload.messages) &&
            payload.messages.length === 1 &&
            payload.messages[0].role === "user" &&
            payload.messages[0].content === successRequestText,
          "Chat request must contain exactly one approved user message."
        );
        assert(payload.stream === false, "Chat request must set stream to false.");
        assert(
          payload.think === ollamaModule.PRIVATE_ALPHA_OLLAMA_THINK_LEVEL &&
            payload.think === "low",
          "Chat request must fix GPT-OSS think to low."
        );
        assert(
          payload.options &&
            typeof payload.options === "object" &&
            !Array.isArray(payload.options) &&
            Object.keys(payload.options).length === 1 &&
            payload.options.num_predict === 37,
          "Chat request must bind options.num_predict to the exact approved maximum output tokens."
        );
        assert(
          !("system" in payload) &&
            !("tools" in payload) &&
            !("format" in payload) &&
            !("temperature" in payload),
          "Chat request must not include system prompts, tools, format, or temperature."
        );
        assert(
          !("thinking" in payload) &&
            !("reasoning" in payload) &&
            !("reasoningEffort" in payload) &&
            !("thinkLevel" in payload),
          "No caller-configurable reasoning field may exist."
        );

        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: successVisibleOutput,
            thinking: successThinkingText,
          },
          done: true,
          done_reason: "stop",
          prompt_eval_count: 12,
          eval_count: 34,
        });
      },
    });
    const successStore = createLocalStore(successTestSuffix, successHarness);
    const successRun = await successStore.createRun(
      {
        requestText: successRequestText,
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 37,
      },
      "private-alpha-slice-c-success-create-0001"
    );
    const successApproved = await successStore.approveRun(successRun.run.runId, {
      approvalScopeHash: successRun.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: successRun.run.revision,
    });
    const successResult = await successStore.executeRun(
      successApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: successApproved.approvalScopeHash,
        expectedRevision: successApproved.revision,
      },
      "private-alpha-slice-c-success-exec-0001"
    );
    const successStats = successHarness.getStats();
    assert(successResponseIncludedThinking, "A successful fake response may include message.thinking.");
    assert(
      successStats.tagsCalls === 1 && successStats.chatCalls === 1,
      "Successful execution must probe once and call chat once."
    );
    assert(
      successStats.redirects.every((value) => value === "error"),
      "Ollama redirects must remain rejected."
    );
    assert(
      successStats.callUrls.every((url) => {
        const parsed = new URL(url);
        return (
          parsed.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH ||
          parsed.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_CHAT_PATH
        );
      }),
      "Only /api/tags and /api/chat may be called."
    );
    assert(
      successResult.run.state === "succeeded",
      "A non-empty message.content must succeed."
    );
    assert(
      successResult.run.execution &&
        successResult.run.execution.outputText === successVisibleOutput,
      "The exact untrimmed visible content must be persisted."
    );
    assert(
      successResult.run.execution.outputSha256 ===
        crypto.createHash("sha256").update(successVisibleOutput, "utf8").digest("hex"),
      "The exact untrimmed visible content must be hashed."
    );
    assert(
      successResult.run.execution.outputText !== successThinkingText &&
        !Object.prototype.hasOwnProperty.call(successResult.run.execution, "thinking"),
      "message.thinking must not be returned as visible output."
    );
    assert(
      !JSON.stringify(successResult.run).includes(successThinkingText),
      "message.thinking must not appear in returned run records."
    );
    const successRunJson = fs.readFileSync(
      getRunFileAbsolutePath(successLabel, successApproved.runId),
      "utf8"
    );
    assert(
      !successRunJson.includes(successThinkingText),
      "message.thinking must not be persisted."
    );
    assert(
      successResult.run.auditEvents.every(
        (event) => !event.summary.includes(successThinkingText)
      ),
      "message.thinking must not appear in audit summaries."
    );

    const directEmptyHarness = createHarness({
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "",
            thinking: "empty-response reasoning stays private",
          },
          done: true,
          eval_count: 32,
        });
      },
    });
    const directEmptyClient = createDirectClient(directEmptyHarness);
    await expectOllamaError(
      () =>
        directEmptyClient.generateApprovedText({
          approvedRequestText: "Return nothing.",
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          maximumOutputTokens: 9,
        }),
      "ollama_empty_response",
      503,
      emptySafeMessage
    );
    assert(
      directEmptyHarness.getStats().chatCalls === 1,
      "Empty message.content must consume one chat call before failing."
    );

    const directWhitespaceHarness = createHarness({
      onChat() {
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "   \n\t  ",
            thinking: "thinking-only output must stay private",
          },
          done: true,
          eval_count: 32,
        });
      },
    });
    const directWhitespaceClient = createDirectClient(directWhitespaceHarness);
    await expectOllamaError(
      () =>
        directWhitespaceClient.generateApprovedText({
          approvedRequestText: "Return only hidden reasoning.",
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          maximumOutputTokens: 11,
        }),
      "ollama_empty_response",
      503,
      emptySafeMessage
    );
    assert(
      directWhitespaceHarness.getStats().chatCalls === 1,
      "Whitespace-only message.content must fail as ollama_empty_response."
    );

    const emptyTestSuffix = "slice-c-empty-response-001";
    const emptyLabel = await prepareTestDataRoot(emptyTestSuffix);
    let executingSnapshot = null;
    let emptyApproved = null;
    const emptyHarness = createHarness({
      onChat({ init }) {
        const payload = JSON.parse(String(init.body));
        assert(
          payload.think === "low" &&
            payload.options &&
            payload.options.num_predict === 8,
          "Empty-response execution must keep the fixed GPT-OSS request contract."
        );
        const runText = fs.readFileSync(
          getRunFileAbsolutePath(emptyLabel, emptyApproved.runId),
          "utf8"
        );
        executingSnapshot = JSON.parse(runText);
        return makeJsonResponse({
          model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
          message: {
            role: "assistant",
            content: "   \n",
            thinking: emptyThinkingText,
          },
          done: true,
          eval_count: 32,
        });
      },
    });
    const emptyStore = createLocalStore(emptyTestSuffix, emptyHarness);
    const emptyRun = await emptyStore.createRun(
      {
        requestText: emptyRequestText,
        capability: "text",
        modelPreferenceLabel: null,
        maximumOutputTokens: 8,
      },
      "private-alpha-slice-c-empty-create-0001"
    );
    emptyApproved = await emptyStore.approveRun(emptyRun.run.runId, {
      approvalScopeHash: emptyRun.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: emptyRun.run.revision,
    });
    const emptyResult = await emptyStore.executeRun(
      emptyApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: emptyApproved.approvalScopeHash,
        expectedRevision: emptyApproved.revision,
      },
      "private-alpha-slice-c-empty-exec-0001"
    );
    const emptyStats = emptyHarness.getStats();
    assert(
      executingSnapshot &&
        executingSnapshot.state === "executing" &&
        executingSnapshot.execution &&
        executingSnapshot.execution.status === "executing",
      "Empty-response execution must persist executing before it fails."
    );
    assert(
      emptyResult.run.state === "failed" &&
        emptyResult.run.execution &&
        emptyResult.run.execution.status === "failed",
      "Empty visible output must transition executing to failed."
    );
    assert(
      emptyResult.run.execution.errorCode === "ollama_empty_response",
      "Empty-response execution must persist errorCode ollama_empty_response."
    );
    assert(
      emptyResult.run.execution.safeErrorMessage === emptySafeMessage,
      "Empty-response execution must persist the exact bounded safe message."
    );
    assert(
      emptyResult.responseStatus === 503,
      "Empty-response execution must return responseStatus 503."
    );
    assert(
      emptyResult.run.execution.outputText === null &&
        emptyResult.run.execution.outputSha256 === null,
      "Thinking-only output must not become visible output or an output hash."
    );
    assert(
      Boolean(emptyResult.run.execution.completedAt),
      "Empty-response execution must populate completedAt."
    );
    const emptyEventTypes = emptyResult.run.auditEvents.map((event) => event.eventType);
    assert(
      emptyEventTypes.includes("execution.started"),
      "execution.started must exist for empty-response failures."
    );
    assert(
      emptyEventTypes.includes("execution.failed"),
      "execution.failed must exist for empty-response failures."
    );
    assert(
      !emptyEventTypes.includes("execution.succeeded"),
      "execution.succeeded must not exist for empty-response failures."
    );
    assert(
      emptyStats.chatCalls === 1,
      "The provider chat call count must be exactly one."
    );
    const failureEvents = emptyResult.run.auditEvents.filter(
      (event) => event.eventType === "execution.failed"
    );
    assert(
      failureEvents.length === 1 &&
        failureEvents[0].summary.includes("ollama_empty_response"),
      "Failure audit summaries may identify only the bounded error code."
    );
    assert(
      !failureEvents[0].summary.includes(emptyRequestText) &&
        !failureEvents[0].summary.includes(emptyThinkingText) &&
        !emptyResult.run.execution.safeErrorMessage.includes(emptyRequestText) &&
        !emptyResult.run.execution.safeErrorMessage.includes(emptyThinkingText),
      "No prompt or reasoning text may appear in safe errors or failure audit summaries."
    );
    assert(
      emptyResult.run.execution.safeErrorMessage === emptySafeMessage,
      "The empty-response safe message must stay exact."
    );
    assert(
      !JSON.stringify(emptyResult.run).includes(emptyThinkingText),
      "Reasoning text must not be returned in empty-response run records."
    );
    const emptyRunJson = fs.readFileSync(
      getRunFileAbsolutePath(emptyLabel, emptyApproved.runId),
      "utf8"
    );
    assert(
      !emptyRunJson.includes(emptyThinkingText),
      "Reasoning text must not be persisted for empty-response failures."
    );

    const sameKeyReplay = await emptyStore.executeRun(
      emptyApproved.runId,
      {
        execute: true,
        acknowledgement: true,
        approvalScopeHash: emptyApproved.approvalScopeHash,
        expectedRevision: emptyApproved.revision,
      },
      "private-alpha-slice-c-empty-exec-0001"
    );
    assert(
      sameKeyReplay.replayed === true &&
        emptyHarness.getStats().chatCalls === 1 &&
        sameKeyReplay.run.execution &&
        sameKeyReplay.run.execution.errorCode === "ollama_empty_response",
      "Same-key replay must return the persisted empty-response failure without a second chat call."
    );
    await expectStoreError(
      () =>
        emptyStore.executeRun(
          emptyApproved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: emptyApproved.approvalScopeHash,
            expectedRevision: emptyApproved.revision,
          },
          "private-alpha-slice-c-empty-exec-0002"
        ),
      409,
      "one allowed execution attempt"
    );
    assert(
      emptyHarness.getStats().chatCalls === 1,
      "Different-key conflicts must not make a second chat call."
    );

    const legacyTestSuffix = "slice-c-legacy-foundation-001";
    await prepareTestDataRoot(legacyTestSuffix);
    const legacyStore = storeModule.createPrivateAlphaStoreForTesting(
      legacyTestSuffix
    );
    const legacyRun = await legacyStore.createRun(
      {
        requestText: "Legacy foundation run remains non-executable.",
        capability: "code",
        modelPreferenceLabel: "legacy-model-label",
        maximumOutputTokens: 90,
      },
      "private-alpha-slice-c-legacy-create-0001"
    );
    assert(
      legacyRun.run.request.providerPreference ===
        privateAlpha.PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE &&
        legacyRun.run.request.executionMode ===
          privateAlpha.PRIVATE_ALPHA_LEGACY_EXECUTION_MODE,
      "Legacy Slice A behavior must remain unchanged."
    );
    const legacyApproved = await legacyStore.approveRun(legacyRun.run.runId, {
      approvalScopeHash: legacyRun.run.approvalScopeHash,
      approved: true,
      acknowledgement: true,
      expectedRevision: legacyRun.run.revision,
    });
    await expectStoreError(
      () =>
        legacyStore.executeRun(
          legacyApproved.runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: legacyApproved.approvalScopeHash,
            expectedRevision: legacyApproved.revision,
          },
          "private-alpha-slice-c-legacy-exec-0001"
        ),
      409,
      "Legacy private-alpha runs"
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
  throw "[FAIL] Private-alpha GPT-OSS visible-response validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"
Assert-True ($validation.touchedTestDataRoots -gt 0) "Only private-alpha test data roots were touched"

Write-Host "[PASS] CodexForge Private Alpha GPT-OSS visible-response smoke complete."
