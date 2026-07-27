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
  $diff = ((& git diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

Write-Host ""
Write-Host "=== CodexForge Groq provider qualification foundation smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\groq-provider\groq-provider-types.ts",
  "src\lib\codexforge\groq-provider\groq-provider-qualification.ts",
  "src\lib\codexforge\groq-provider\groq-provider-credential.server.ts",
  "src\lib\codexforge\groq-provider\groq-provider-client.server.ts",
  "src\lib\codexforge\groq-provider\index.ts",
  "src\lib\codexforge\model-routing\model-routing-catalog.ts",
  "docs\codexforge-groq-provider-qualification-foundation-v0.md",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1"
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

$credentialPath = "src\lib\codexforge\groq-provider\groq-provider-credential.server.ts"
$clientPath = "src\lib\codexforge\groq-provider\groq-provider-client.server.ts"
$qualificationPath = "src\lib\codexforge\groq-provider\groq-provider-qualification.ts"
$typesPath = "src\lib\codexforge\groq-provider\groq-provider-types.ts"
$indexPath = "src\lib\codexforge\groq-provider\index.ts"
$docPath = "docs\codexforge-groq-provider-qualification-foundation-v0.md"
$groqAdapterPath = "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts"
$runtimePath = "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"

Assert-NoGitDiff $credentialPath "Groq credential module remains unchanged by this slice"
Assert-NoGitDiff $clientPath "Groq client module remains unchanged by this slice"

$credentialFirstLine = Get-Content $credentialPath -TotalCount 1
$clientFirstLine = Get-Content $clientPath -TotalCount 1
Assert-True ($credentialFirstLine -eq 'import "server-only";') 'Credential module begins with import "server-only";'
Assert-True ($clientFirstLine -eq 'import "server-only";') 'Client module begins with import "server-only";'

foreach ($runtimeFile in @($groqAdapterPath, $runtimePath)) {
  Assert-FileExists $runtimeFile
  $runtimeFirstLine = Get-Content $runtimeFile -TotalCount 1
  Assert-True ($runtimeFirstLine -eq 'import "server-only";') "$runtimeFile begins with import ""server-only"";"
}

$credentialSource = Get-Content -Raw $credentialPath
$clientSource = Get-Content -Raw $clientPath
$qualificationSource = Get-Content -Raw $qualificationPath
$typesSource = Get-Content -Raw $typesPath
$indexSource = Get-Content -Raw $indexPath
$docSource = Get-Content -Raw $docPath
$groqAdapterSource = Get-Content -Raw $groqAdapterPath
$runtimeSource = Get-Content -Raw $runtimePath
$groqSource = $credentialSource + "`n" + $clientSource + "`n" + $qualificationSource + "`n" + $typesSource + "`n" + $indexSource
$runtimeBoundarySource = $groqAdapterSource + "`n" + $runtimeSource

$groqDirectoryFiles = Get-ChildItem -LiteralPath "src\lib\codexforge\groq-provider" -File -Filter "*.ts"
$envReadCount = 0
foreach ($file in $groqDirectoryFiles) {
  $fileText = Get-Content -Raw $file.FullName
  $envReadCount += ([regex]::Matches($fileText, 'process\.env\.GROQ_API_KEY')).Count
}
Assert-True ($envReadCount -eq 1) "Exactly one production read of process.env.GROQ_API_KEY exists"

Assert-True (-not $indexSource.Contains("groq-provider-credential.server")) "Client-safe index excludes the credential module"
Assert-True (-not $indexSource.Contains("groq-provider-client.server")) "Client-safe index excludes the server client"
Assert-Contains $clientSource 'CODEXFORGE_GROQ_ORIGIN = "https://api.groq.com"' "Fixed origin is exactly https://api.groq.com"

$declaredProviderPaths = [regex]::Matches($clientSource, '/openai/v1/[A-Za-z/]+') |
  ForEach-Object { $_.Value } |
  Sort-Object -Unique
Assert-True ($declaredProviderPaths.Count -eq 2) "Only two provider paths are declared"
Assert-True ($declaredProviderPaths[0] -eq "/openai/v1/chat/completions") "Declared provider path includes /openai/v1/chat/completions"
Assert-True ($declaredProviderPaths[1] -eq "/openai/v1/models") "Declared provider path includes /openai/v1/models"

foreach ($pattern in @(
  'origin\s*\?:',
  'host\s*\?:',
  'hostname\s*\?:',
  'port\s*\?:',
  'baseUrl',
  'baseURL'
)) {
  Assert-NotMatches $clientSource $pattern "Client excludes caller-supplied $pattern"
}

foreach ($forbiddenToken in @(
  'from\s+["'']groq-sdk["'']',
  'from\s+["'']openai["'']',
  'from\s+["'']axios["'']',
  'require\(["'']groq-sdk["'']\)',
  'require\(["'']openai["'']\)',
  'require\(["'']axios["'']\)'
)) {
  Assert-NotMatches $groqSource $forbiddenToken "Groq source excludes $forbiddenToken"
}

Assert-Contains $typesSource 'CODEXFORGE_GROQ_MODEL_IDS = [' "Allowlisted model identifiers are declared"
Assert-Contains $docSource "Groq is not admitted to the production routing catalog." "Documentation keeps production routing disabled"

Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "Current private-alpha state machine remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Current Ollama client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Current private-alpha kill switch remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "Current private-alpha API client remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "Current private-alpha API routes remain unchanged"
Assert-NoGitDiff "src/app/jarvis" "Jarvis route entry remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/ai-provider-registry" "Historical provider-registry directory remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/athena-model-routing-provider-selection-preview" "Historical routing-preview directory remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"
Assert-NotMatches $runtimeBoundarySource "routeCodexForgeModel|runtimeSnapshots|manualModelKey|createPrivateAlphaStore|executeRun|/api/codexforge/private-alpha" "Runtime boundary performs no routing or execution integration"

$jarvisSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$storeSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-store.server.ts"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-provider-selector="manual"' "Jarvis UI exposes the manual provider selector"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-model-selector="manual"' "Jarvis UI exposes the manual model selector"
Assert-Contains $jarvisSource 'selectedTarget?.modelKey ?? ""' "Jarvis selector keeps exact Groq model selection manual"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Jarvis UI exposes manual Groq execution"
Assert-Contains $storeSource 'createPrivateAlphaProviderAdapterForModelKey' "Store resolves the exact provider adapter from the persisted model key"
Assert-NotMatches $storeSource 'routeCodexForgeModel|retryCount|retryAttempts|Promise\.all\(' "Store introduces no routing, retry, or fallback orchestration"

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

foreach ($sourcePath in $requiredFiles) {
  $sourceText = Get-Content -Raw $sourcePath
  Assert-NotMatches $sourceText $asTokenPattern "$sourcePath excludes the as-token escape"
  Assert-NotMatches $sourceText $noCheckPattern "$sourcePath excludes the no-check directive"
  Assert-NotMatches $sourceText $expectErrorPattern "$sourcePath excludes the expect-error directive"
  Assert-NotMatches $sourceText $plainTokenPattern "$sourcePath excludes the plain token escape"
}

$longestNewPathLength = ($requiredFiles | ForEach-Object { $_.Length } | Measure-Object -Maximum).Maximum
Assert-True ($longestNewPathLength -lt 220) "Longest new source path remains below 220 characters"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function compileTypeScript(module, filename) {
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
}

function loadModules(repoRoot) {
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

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;
}

function makeJsonResponse(payload, status, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: Object.assign(
      {
        "Content-Type": "application/json",
      },
      headers || {}
    ),
  });
}

async function expectGroqError(work, expectedCode, expectedStatus, messagePart) {
  try {
    await work();
  } catch (error) {
    assert(error && error.name === "CodexForgeGroqError", "Expected CodexForgeGroqError.");
    assert(error.code === expectedCode, `Expected error code ${expectedCode}.`);
    assert(error.status === expectedStatus, `Expected status ${expectedStatus}.`);
    if (messagePart) {
      assert(
        String(error.safeMessage).includes(messagePart),
        `Expected safe message to include ${messagePart}.`
      );
    }
    return error;
  }

  throw new Error(`Expected error code ${expectedCode}.`);
}

function restoreEnv(key, previousValue) {
  if (previousValue === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = previousValue;
}

async function main() {
  const repoRoot = process.argv[2];
  loadModules(repoRoot);

  const groqIndex = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "index.ts"
  ));
  const groqClientModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-client.server.ts"
  ));
  const groqCredentialModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-credential.server.ts"
  ));
  const groqQualificationModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-qualification.ts"
  ));
  const groqTypesModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-types.ts"
  ));
  const modelRoutingIndexModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "model-routing",
    "index.ts"
  ));
  const privateAlphaValidationModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "private-alpha",
    "private-alpha-validation.ts"
  ));

  const allowedModels = groqTypesModule.CODEXFORGE_GROQ_MODEL_IDS;
  const qualification = groqQualificationModule.CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;

  assert(
    groqTypesModule.CODEXFORGE_GROQ_QUALIFICATION_VERSION ===
      "codexforge-groq-qualification-v1",
    "Qualification types expose the v1 qualification version."
  );
  assert(Array.isArray(allowedModels) && allowedModels.length === 2, "Qualification types expose exactly two allowed models.");
  assert(
    qualification.qualificationVersion === "codexforge-groq-qualification-v1",
    "Qualification metadata version is v1."
  );
  assert(qualification.providerId === "groq-cloud", "Qualification provider ID is groq-cloud.");
  assert(qualification.providerLabel === "Groq Cloud", "Qualification provider label is Groq Cloud.");
  assert(
    qualification.models.length === 2 &&
      qualification.models[0].modelId === allowedModels[0] &&
      qualification.models[1].modelId === allowedModels[1],
    "Qualification metadata contains exactly the two allowed models."
  );
  assert(
    qualification.models.every((model) => model.routingState === "manual-only"),
    "Qualification metadata leaves both models manual-only."
  );
  assert(
    qualification.models.every(
      (model) => model.accountTierState === "operator-confirmed-free"
    ),
    "Qualification metadata records operator-confirmed-free account tier."
  );
  assert(
    qualification.adapterState === "live-verified" &&
      qualification.productionRoutingState === "manual-only" &&
      qualification.models.every((model) => model.qualificationState === "live-verified"),
    "Qualification metadata records live-verified manual-only routing."
  );
  assert(
    qualification.models.every((model) => model.dataBoundary === "cloud-provider"),
    "Qualification metadata records the cloud-provider boundary."
  );
  assert(
    qualification.models.every(
      (model) =>
        model.capabilities.length === 1 &&
        model.capabilities[0] === "text-generation"
    ),
    "Qualification metadata exposes only text-generation capability."
  );
  assert(
    qualification.models.every(
      (model) =>
        model.liveVerifiedOn === "2026-07-26" &&
        model.operatorTierConfirmedOn === "2026-07-26"
    ),
    "Qualification metadata records the live verification and tier confirmation dates."
  );
  assert(
    qualification.models.every(
      (model) =>
        model.providerReportedContextWindowTokens === 131072 &&
        model.providerReportedMaximumOutputTokens === 65536 &&
        model.approvedMaximumOutputTokens === 4096
    ),
    "Qualification metadata records provider limits and the lower CodexForge-approved output cap."
  );
  assert(
    qualification.models.every((model) =>
      model.evidence.includes("authenticated model discovery completed on 2026-07-26")
    ),
    "Qualification evidence records authenticated discovery."
  );
  assert(
    qualification.models.every((model) =>
      model.evidence.includes("exact visible-output qualification completed on 2026-07-26")
    ),
    "Qualification evidence records exact visible-output qualification."
  );
  assert(
    qualification.models.every((model) =>
      model.evidence.includes("reasoning was not exposed in live qualification")
    ),
    "Qualification evidence records live reasoning privacy."
  );
  assert(
    qualification.models.every((model) =>
      model.evidence.includes("operator confirmed Groq Free tier on 2026-07-26")
    ),
    "Qualification evidence records operator-confirmed Groq Free tier."
  );
  assert(Object.isFrozen(qualification), "Authoritative qualification record is frozen.");
  assert(Object.isFrozen(qualification.models), "Authoritative qualification model array is frozen.");

  const qualificationCloneA = groqQualificationModule.getCodexForgeGroqProviderQualification();
  const qualificationCloneB = groqQualificationModule.getCodexForgeGroqProviderQualification();
  assert(qualificationCloneA !== qualification, "Qualification getter returns a new record.");
  assert(qualificationCloneA !== qualificationCloneB, "Qualification getter returns distinct clones.");
  assert(qualificationCloneA.models !== qualification.models, "Qualification getter clones the model array.");
  assert(
    qualificationCloneA.models[0] !== qualification.models[0],
    "Qualification getter clones nested model records."
  );
  assert(
    qualificationCloneA.models[0].evidence !== qualification.models[0].evidence,
    "Qualification getter clones nested evidence arrays."
  );

  const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  const groqCatalogModels = productionCatalog.models.filter(
    (model) => model.providerId === "groq-cloud"
  );
  assert(
    modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
      "codexforge-model-routing-v2",
    "Production model-routing catalog version is v2."
  );
  assert(
    groqCatalogModels.length === 2 &&
      groqCatalogModels.every((model) => model.routingState === "manual-only"),
    "Groq exists in the production catalog only as manual-only."
  );
  assert(
    groqCatalogModels.every((model) => model.qualificationState === "live-verified"),
    "Groq production-catalog entries remain live-verified."
  );
  assert(
    groqCatalogModels.every(
      (model) =>
        model.pricing.costClass === "free-tier" &&
        model.pricing.inputUsdPerMillionTokens === 0 &&
        model.pricing.outputUsdPerMillionTokens === 0
    ),
    "Groq production-catalog entries remain free-tier metadata only."
  );

  assert(!Object.prototype.hasOwnProperty.call(groqIndex, "readCodexForgeGroqCredential"), "Client-safe index does not export credential access.");
  assert(!Object.prototype.hasOwnProperty.call(groqIndex, "createCodexForgeGroqClient"), "Client-safe index does not export the server client.");
  assert(!Object.prototype.hasOwnProperty.call(groqIndex, "CodexForgeGroqError"), "Client-safe index does not export the server error class.");

  const previousEnvValue = process.env.GROQ_API_KEY;
  delete process.env.GROQ_API_KEY;

  try {
    const missingCredentialClient = groqClientModule.createCodexForgeGroqClient();
    const missingStatus = missingCredentialClient.getConfigurationStatus();
    assert(
      JSON.stringify(Object.keys(missingStatus).sort()) ===
        JSON.stringify(["configured", "credentialSource", "safeMessage"]),
      "Missing credential returns only safe configuration status."
    );
    assert(
      missingStatus.configured === false &&
        missingStatus.credentialSource === "none" &&
        missingStatus.safeMessage === "Groq credential is not configured.",
      "Missing credential safe configuration status is correct."
    );

    process.env.GROQ_API_KEY = "  groq-test-secret-key-1234567890  ";
    const configuredClient = groqClientModule.createCodexForgeGroqClient();
    const configuredStatus = configuredClient.getConfigurationStatus();
    const configuredStatusJson = JSON.stringify(configuredStatus);
    assert(
      configuredStatus.configured === true &&
        configuredStatus.credentialSource === "environment" &&
        configuredStatus.safeMessage ===
          "Groq credential is configured in the server environment.",
      "Configured status remains bounded and correct."
    );
    assert(
      !configuredStatusJson.includes("groq-test-secret-key-1234567890") &&
        !configuredStatusJson.includes("prefix") &&
        !configuredStatusJson.includes("length"),
      "Configured status never exposes key content, length, or prefix."
    );

    const credentialRead = groqCredentialModule.readCodexForgeGroqCredential();
    assert(
      credentialRead.configured === true &&
        credentialRead.apiKey === "groq-test-secret-key-1234567890" &&
        credentialRead.source === "environment",
      "Credential reader trims whitespace around the key."
    );

    process.env.GROQ_API_KEY = "replace-me";
    const placeholderRead = groqCredentialModule.readCodexForgeGroqCredential();
    assert(
      placeholderRead.configured === false &&
        placeholderRead.apiKey === null &&
        placeholderRead.source === "none",
      "Credential reader rejects placeholders."
    );
  } finally {
    restoreEnv("GROQ_API_KEY", previousEnvValue);
  }

  function createHarness(config) {
    const calls = [];
    const responses = config.responses ? config.responses.slice() : [];
    let attemptCount = 0;

    const fetchFn = async (input, init) => {
      const normalizedInit = init || {};
      attemptCount += 1;

      const url = new URL(String(input));
      const headerEntries = {};
      const headerSource = normalizedInit.headers || {};
      for (const [key, value] of Object.entries(headerSource)) {
        headerEntries[String(key).toLowerCase()] = String(value);
      }

      const bodyText =
        typeof normalizedInit.body === "string" ? normalizedInit.body : null;
      const bodyJson = bodyText ? JSON.parse(bodyText) : null;

      calls.push({
        url: url.toString(),
        method: normalizedInit.method || "GET",
        redirect: normalizedInit.redirect || null,
        headers: headerEntries,
        bodyText,
        bodyJson,
      });

      if (typeof config.fetchImpl === "function") {
        return config.fetchImpl({
          url,
          init: normalizedInit,
          calls,
          attemptCount,
        });
      }

      if (responses.length === 0) {
        throw new Error("Harness ran out of fake responses.");
      }

      const next = responses.shift();
      if (typeof next === "function") {
        return next({
          url,
          init: normalizedInit,
          calls,
          attemptCount,
        });
      }

      if (next instanceof Error) {
        throw next;
      }

      return next;
    };

    return {
      fetchFn,
      calls,
      getAttemptCount() {
        return attemptCount;
      },
    };
  }

  const discoveryHarness = createHarness({
    responses: [
      makeJsonResponse(
        {
          object: "list",
          data: [
            {
              id: allowedModels[1],
              active: false,
              context_window: 8192,
              max_completion_tokens: 2048,
              owned_by: "openai",
            },
            {
              id: "ignored/model",
              active: true,
              context_window: 9999,
              max_completion_tokens: 999,
              owned_by: "ignored",
            },
            {
              id: allowedModels[0],
              active: true,
              context_window: 131072,
              max_completion_tokens: 4096,
              owned_by: "openai",
            },
          ],
        },
        200,
        {
          "x-ratelimit-limit-requests": "120",
          "x-ratelimit-remaining-requests": "118",
          "x-ratelimit-reset-requests": "9s",
          Authorization: "blocked",
          "x-groq-request-id": "blocked",
          "set-cookie": "blocked",
        }
      ),
      makeJsonResponse(
        {
          object: "list",
          data: [
            {
              id: allowedModels[0],
              active: true,
              context_window: 131072,
              max_completion_tokens: 4096,
              owned_by: "openai",
            },
            {
              id: "ignored/model",
              active: true,
              context_window: 4096,
              max_completion_tokens: 1024,
              owned_by: "ignored",
            },
          ],
        },
        200,
        {
          "x-ratelimit-limit-requests": "90",
          "x-ratelimit-remaining-requests": "89",
          "x-ratelimit-reset-requests": "8s",
          "x-not-allowlisted": "blocked",
        }
      ),
    ],
  });

  const discoveryClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: discoveryHarness.fetchFn,
  });

  const firstDiscovery = await discoveryClient.discoverAllowedModels();
  assert(
    discoveryHarness.calls[0].headers.authorization === "Bearer test-groq-api-key",
    "Fake model discovery sends the correct authorization header."
  );
  assert(discoveryHarness.calls[0].method === "GET", "Fake model discovery uses GET.");
  assert(discoveryHarness.calls[0].redirect === "error", "Fake model discovery uses redirect error.");
  assert(
    firstDiscovery.discoveredModels.length === 2 &&
      firstDiscovery.discoveredModels.every((model) =>
        allowedModels.includes(model.modelId)
      ),
    "Fake discovery filters unrelated models."
  );
  assert(
    firstDiscovery.discoveredModels[0].modelId === allowedModels[0] &&
      firstDiscovery.discoveredModels[1].modelId === allowedModels[1],
    "Fake discovery preserves allowed-model order."
  );
  assert(
    firstDiscovery.discoveredModels[0].contextWindowTokens === 131072 &&
      firstDiscovery.discoveredModels[0].maximumOutputTokens === 4096 &&
      firstDiscovery.discoveredModels[1].contextWindowTokens === 8192 &&
      firstDiscovery.discoveredModels[1].maximumOutputTokens === 2048,
    "Fake discovery parses context and output limits safely."
  );
  assert(
    JSON.stringify(firstDiscovery.observedRateLimitHeaders) ===
      JSON.stringify({
        "x-ratelimit-limit-requests": "120",
        "x-ratelimit-remaining-requests": "118",
        "x-ratelimit-reset-requests": "9s",
      }),
    "Fake discovery captures only allowlisted rate-limit headers."
  );

  const secondDiscovery = await discoveryClient.discoverAllowedModels();
  assert(
    secondDiscovery.missingAllowedModels.length === 1 &&
      secondDiscovery.missingAllowedModels[0] === allowedModels[1] &&
      secondDiscovery.safeWarning ===
        "Groq model discovery did not return every allowlisted model.",
    "Fake discovery reports a missing allowed model."
  );

  const generationHarness = createHarness({
    responses: [
      makeJsonResponse({
        object: "chat.completion",
        model: allowedModels[0],
        choices: [
          {
            finish_reason: "stop",
            message: {
              role: "assistant",
              content: "  visible Groq output  ",
              reasoning: "hidden private reasoning",
            },
          },
        ],
        usage: {
          prompt_tokens: 12,
          completion_tokens: 34,
          total_tokens: 46,
          total_time: 1.25,
        },
      }, 200),
      makeJsonResponse({
        object: "chat.completion",
        model: allowedModels[0],
        choices: [
          {
            finish_reason: null,
            message: {
              role: "assistant",
              content: "visible without timing",
            },
          },
        ],
        usage: {
          prompt_tokens: 1,
          completion_tokens: 2,
          total_tokens: 3,
        },
      }, 200),
    ],
  });

  const generationClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: generationHarness.fetchFn,
  });

  const generationResult = await generationClient.generateApprovedText({
    approvedRequestText: "Create a bounded response.",
    model: allowedModels[0],
    maximumOutputTokens: 77,
  });
  const requestBody = generationHarness.calls[0].bodyJson;

  assert(
    Array.isArray(requestBody.messages) &&
      requestBody.messages.length === 1 &&
      requestBody.messages[0].role === "user" &&
      requestBody.messages[0].content === "Create a bounded response.",
    "Generation sends exactly one user message."
  );
  assert(requestBody.model === allowedModels[0], "Generation uses the requested allowlisted model.");
  assert(requestBody.stream === false, "stream is false.");
  assert(requestBody.reasoning_effort === "low", "reasoning_effort is exactly low.");
  assert(requestBody.include_reasoning === false, "include_reasoning is false.");
  assert(requestBody.max_completion_tokens === 77, "max_completion_tokens equals the approved limit.");
  assert(requestBody.n === 1, "n is exactly 1.");
  assert(requestBody.tool_choice === "none", "tool_choice is none.");
  assert(requestBody.citation_options === "disabled", "citation_options is disabled.");
  assert(!Object.prototype.hasOwnProperty.call(requestBody, "system"), "No system message exists.");
  assert(!Object.prototype.hasOwnProperty.call(requestBody, "developer"), "No developer message exists.");
  assert(!Object.prototype.hasOwnProperty.call(requestBody, "tools"), "No tools exist in the generation request.");
  assert(!Object.prototype.hasOwnProperty.call(requestBody, "web_search"), "No web search exists in the generation request.");
  assert(!Object.prototype.hasOwnProperty.call(requestBody, "code_execution"), "No code execution exists in the generation request.");
  assert(
    JSON.stringify(Object.keys(requestBody).sort()) ===
      JSON.stringify(
        [
          "citation_options",
          "include_reasoning",
          "max_completion_tokens",
          "messages",
          "model",
          "n",
          "reasoning_effort",
          "stream",
          "tool_choice",
        ].sort()
      ),
    "Generation request contains only the approved top-level fields."
  );

  assert(
    generationResult.outputText === "  visible Groq output  ",
    "Successful visible output is returned exactly untrimmed."
  );
  assert(
    !Object.prototype.hasOwnProperty.call(generationResult, "reasoning") &&
      !JSON.stringify(generationResult).includes("hidden private reasoning"),
    "message.reasoning may exist in the fake response but is never returned."
  );
  assert(
    generationResult.promptTokens === 12 &&
      generationResult.outputTokens === 34 &&
      generationResult.totalTokens === 46,
    "Usage tokens are parsed safely."
  );
  assert(
    generationResult.totalDurationNanoseconds === 1250000000,
    "total_time converts deterministically to nanoseconds."
  );

  const timingMissingResult = await generationClient.generateApprovedText({
    approvedRequestText: "Create one more bounded response.",
    model: allowedModels[0],
    maximumOutputTokens: 12,
  });
  assert(timingMissingResult.totalDurationNanoseconds === null, "Missing timing returns null.");

  async function expectFailureResponse(payload, expectedCode, expectedStatus) {
    const harness = createHarness({
      responses: [makeJsonResponse(payload, 200)],
    });
    const client = groqClientModule.createCodexForgeGroqClientForTesting({
      apiKey: "test-groq-api-key",
      fetchFn: harness.fetchFn,
    });
    const error = await expectGroqError(
      () =>
        client.generateApprovedText({
          approvedRequestText: "Validate response failure handling.",
          model: allowedModels[0],
          maximumOutputTokens: 10,
        }),
      expectedCode,
      expectedStatus
    );
    assert(harness.getAttemptCount() === 1, "No retry occurs for the tested failure.");
    assert(harness.calls.length === 1, "No fallback occurs for the tested failure.");
    return error;
  }

  await expectFailureResponse(
    {
      object: "chat.completion",
      model: allowedModels[0],
      choices: [
        {
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "visible",
            tool_calls: [{ id: "tool-1" }],
          },
        },
      ],
    },
    "groq_malformed_response",
    503
  );
  assert(true, "Tool output is rejected.");

  await expectFailureResponse(
    {
      object: "chat.completion",
      model: allowedModels[0],
      executed_tools: [{ id: "tool-1" }],
      choices: [
        {
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "visible",
          },
        },
      ],
    },
    "groq_malformed_response",
    503
  );
  assert(true, "Executed tools are rejected.");

  await expectFailureResponse(
    {
      object: "chat.completion",
      model: allowedModels[0],
      choices: [
        {
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "",
          },
        },
      ],
    },
    "groq_empty_response",
    503
  );
  assert(true, "Empty visible output is rejected.");

  await expectFailureResponse(
    {
      object: "chat.completion",
      model: allowedModels[0],
      choices: [
        {
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "   \n\t  ",
          },
        },
      ],
    },
    "groq_empty_response",
    503
  );
  assert(true, "Whitespace-only output is rejected.");

  await expectFailureResponse(
    {
      object: "chat.completion",
      model: allowedModels[0],
      choices: [
        {
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "x".repeat(
              privateAlphaValidationModule.PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH + 1
            ),
          },
        },
      ],
    },
    "groq_output_too_large",
    503
  );
  assert(true, "Oversized output is rejected.");

  const malformedJsonHarness = createHarness({
    responses: [
      new Response("{bad json", {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ],
  });
  const malformedJsonClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: malformedJsonHarness.fetchFn,
  });
  await expectGroqError(
    () =>
      malformedJsonClient.generateApprovedText({
        approvedRequestText: "Validate malformed JSON handling.",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_malformed_response",
    503
  );
  assert(malformedJsonHarness.getAttemptCount() === 1, "Malformed JSON failure does not retry.");
  assert(true, "Malformed JSON is rejected.");

  const oversizedBodyHarness = createHarness({
    responses: [
      new Response("x".repeat(524289), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ],
  });
  const oversizedBodyClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: oversizedBodyHarness.fetchFn,
  });
  await expectGroqError(
    () =>
      oversizedBodyClient.generateApprovedText({
        approvedRequestText: "Validate oversized response handling.",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_output_too_large",
    503
  );
  assert(oversizedBodyHarness.getAttemptCount() === 1, "Oversized response-body failure does not retry.");
  assert(true, "Oversized response body is rejected.");

  let unknownModelCalls = 0;
  const unknownModelClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: async () => {
      unknownModelCalls += 1;
      return makeJsonResponse({}, 200);
    },
  });
  await expectGroqError(
    () =>
      unknownModelClient.generateApprovedText({
        approvedRequestText: "Invalid model.",
        model: "openai/not-allowlisted",
        maximumOutputTokens: 10,
      }),
    "groq_model_unavailable",
    503
  );
  assert(unknownModelCalls === 0, "Unknown model is rejected before a network call.");

  let emptyRequestCalls = 0;
  const emptyRequestClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: async () => {
      emptyRequestCalls += 1;
      return makeJsonResponse({}, 200);
    },
  });
  await expectGroqError(
    () =>
      emptyRequestClient.generateApprovedText({
        approvedRequestText: "   ",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_http_error",
    503
  );
  assert(emptyRequestCalls === 0, "Empty request is rejected before a network call.");

  let excessiveLimitCalls = 0;
  const excessiveLimitClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: async () => {
      excessiveLimitCalls += 1;
      return makeJsonResponse({}, 200);
    },
  });
  await expectGroqError(
    () =>
      excessiveLimitClient.generateApprovedText({
        approvedRequestText: "Limit check.",
        model: allowedModels[0],
        maximumOutputTokens: 4097,
      }),
    "groq_http_error",
    503
  );
  assert(excessiveLimitCalls === 0, "Excessive output limit is rejected before a network call.");

  let missingCredentialCalls = 0;
  const missingCredentialNetworkClient = groqClientModule.createCodexForgeGroqClientForTesting({
    fetchFn: async () => {
      missingCredentialCalls += 1;
      return makeJsonResponse({}, 200);
    },
  });
  await expectGroqError(
    () => missingCredentialNetworkClient.discoverAllowedModels(),
    "groq_credential_missing",
    503
  );
  await expectGroqError(
    () =>
      missingCredentialNetworkClient.generateApprovedText({
        approvedRequestText: "Credential check.",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_credential_missing",
    503
  );
  assert(missingCredentialCalls === 0, "Missing credential makes no network call.");

  async function expectHttpFailure(status, payload, expectedCode) {
    const harness = createHarness({
      responses: [makeJsonResponse(payload || { error: { code: "other_error" } }, status)],
    });
    const client = groqClientModule.createCodexForgeGroqClientForTesting({
      apiKey: "test-groq-api-key",
      fetchFn: harness.fetchFn,
    });
    const error = await expectGroqError(
      () =>
        client.generateApprovedText({
          approvedRequestText: "Validate HTTP mapping.",
          model: allowedModels[0],
          maximumOutputTokens: 10,
        }),
      expectedCode,
      expectedCode === "groq_timeout" ? 504 : 503
    );
    assert(harness.getAttemptCount() === 1, "HTTP failure does not retry.");
    assert(harness.calls.length === 1, "HTTP failure does not fall back.");
    return error;
  }

  await expectHttpFailure(401, { error: { code: "auth_error" } }, "groq_authentication_failed");
  assert(true, "HTTP 401 maps to groq_authentication_failed.");

  await expectHttpFailure(403, { error: { code: "auth_error" } }, "groq_authentication_failed");
  assert(true, "HTTP 403 maps to groq_authentication_failed.");

  await expectHttpFailure(429, { error: { code: "rate_limit_reached" } }, "groq_rate_limited");
  assert(true, "HTTP 429 rate limit maps to groq_rate_limited.");

  const quotaError = await expectHttpFailure(
    429,
    {
      error: {
        code: "insufficient_quota",
        message: "secret quota detail groq-test-secret-key-1234567890",
      },
    },
    "groq_quota_exhausted"
  );
  assert(true, "Bounded quota-exhaustion error maps to groq_quota_exhausted.");

  await expectHttpFailure(404, { error: { code: "model_missing" } }, "groq_model_unavailable");
  assert(true, "HTTP 404 model failure maps to groq_model_unavailable.");

  const timeoutHarness = createHarness({
    fetchImpl: ({ init }) =>
      new Promise((resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const abortError = new Error("Timed out");
          abortError.name = "AbortError";
          reject(abortError);
        });
      }),
  });
  const timeoutClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: timeoutHarness.fetchFn,
    generationTimeoutMs: 5,
  });
  await expectGroqError(
    () =>
      timeoutClient.generateApprovedText({
        approvedRequestText: "Timeout mapping.",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_timeout",
    504
  );
  assert(timeoutHarness.getAttemptCount() === 1, "Timeout failure does not retry.");
  assert(true, "Timeout maps to groq_timeout.");

  const networkHarness = createHarness({
    fetchImpl: async () => {
      throw new TypeError("network down with groq-test-secret-key-1234567890");
    },
  });
  const networkClient = groqClientModule.createCodexForgeGroqClientForTesting({
    apiKey: "test-groq-api-key",
    fetchFn: networkHarness.fetchFn,
  });
  await expectGroqError(
    () =>
      networkClient.generateApprovedText({
        approvedRequestText: "Network mapping.",
        model: allowedModels[0],
        maximumOutputTokens: 10,
      }),
    "groq_unavailable",
    503
  );
  assert(networkHarness.getAttemptCount() === 1, "Network failure does not retry.");
  assert(true, "Network failure maps to groq_unavailable.");

  await expectHttpFailure(500, { error: { code: "internal_error" } }, "groq_http_error");
  assert(true, "Other HTTP failure maps to groq_http_error.");

  const safeErrorChecks = [
    quotaError,
    await expectGroqError(
      () =>
        networkClient.generateApprovedText({
          approvedRequestText: "Network mapping again.",
          model: allowedModels[0],
          maximumOutputTokens: 10,
        }),
      "groq_unavailable",
      503
    ),
  ];

  for (const error of safeErrorChecks) {
    assert(
      !String(error.safeMessage).includes("secret quota detail") &&
        !String(error.safeMessage).includes("groq-test-secret-key-1234567890"),
      "Safe Groq errors exclude raw provider body and fake API keys."
    );
  }
  assert(true, "Raw provider body never appears in a safe error.");
  assert(
    !JSON.stringify(generationResult).includes("groq-test-secret-key-1234567890"),
    "Fake API key never appears in output."
  );
  assert(true, "Fake API key never appears in output or safe errors.");
}

main()
  .then(() => {
    process.stdout.write('{"success":true}\n');
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
  throw "[FAIL] Groq qualification validation failed: $validationRaw"
}

$validation = $validationRaw | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Node runtime validation passed"

Write-Host "[PASS] CodexForge Groq provider qualification foundation smoke complete."
