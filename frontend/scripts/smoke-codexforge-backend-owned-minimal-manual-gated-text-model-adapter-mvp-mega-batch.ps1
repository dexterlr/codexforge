param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$parentRoot = Resolve-Path (Join-Path $root "..")
if (Test-Path (Join-Path $parentRoot "README.md")) {
  $repoRoot = $parentRoot
} else {
  $repoRoot = Resolve-Path $root
}
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Unexpected $Name with pattern $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-Equal {
  param(
    [AllowEmptyString()][string]$Actual,
    [string]$Expected,
    [string]$Name
  )
  if ($Actual -ne $Expected) {
    throw "[FAIL] $Name expected '$Expected' found '$Actual'"
  }
  Write-Host "[PASS] $Name"
}

function Get-SourceFiles {
  param([string[]]$Paths)

  $files = @()
  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) {
      continue
    }

    $item = Get-Item $path
    if ($item.PSIsContainer) {
      $files += Get-ChildItem -Path $item.FullName -Recurse -File | Where-Object {
        @(".ts", ".tsx", ".js", ".jsx") -contains $_.Extension
      }
    } else {
      $files += $item
    }
  }

  return @($files | Sort-Object -Property FullName -Unique)
}

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
}

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

function Invoke-TextAdapterFixtureRun {
  param([string]$RepoRootPath)

  $nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const repoRoot = process.argv[process.argv.length - 1];
const moduleCache = new Map();

function resolveModule(basePath) {
  const candidates = [
    basePath,
    basePath + ".server.ts",
    basePath + ".server.tsx",
    basePath + ".ts",
    basePath + ".tsx",
    basePath + ".js",
    basePath + ".jsx",
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.js"),
    path.join(basePath, "index.jsx")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const stat = fs.statSync(candidate);
      if (stat.isFile()) {
        return candidate;
      }
    }
  }

  throw new Error("Unable to resolve module: " + basePath);
}

function loadModule(modulePath) {
  const filename = resolveModule(modulePath);
  if (moduleCache.has(filename)) {
    return moduleCache.get(filename).exports;
  }

  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs
    },
    fileName: filename
  }).outputText;

  const module = { exports: {} };
  moduleCache.set(filename, module);
  const dirname = path.dirname(filename);

  function localRequire(specifier) {
    if (specifier === "server-only") {
      return {};
    }

    if (specifier.startsWith("@/")) {
      return loadModule(path.join(repoRoot, "src", specifier.slice(2)));
    }

    if (specifier.startsWith(".")) {
      return loadModule(path.resolve(dirname, specifier));
    }

    return require(specifier);
  }

  const evaluator = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transpiled
  );
  evaluator(localRequire, module, module.exports, filename, dirname);
  return module.exports;
}

const helper = loadModule(
  path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "min-text-adapter",
    "min-text-adapter-helper.server"
  )
);

const result = helper.runMinimalManualGatedTextModelAdapterMvpForStaticFixture();
process.stdout.write(JSON.stringify(result));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute the server-only text adapter helper."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter MVP Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPagePath = Join-Path $root "src\app\ai-providers\page.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisIaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$textAdapterTypesPath = Join-Path $root "src\lib\codexforge\min-text-adapter\min-text-adapter-types.ts"
$textAdapterCatalogPath = Join-Path $root "src\lib\codexforge\min-text-adapter\min-text-adapter-catalog.ts"
$textAdapterIndexPath = Join-Path $root "src\lib\codexforge\min-text-adapter\index.ts"
$textAdapterHelperPath = Join-Path $root "src\lib\codexforge\min-text-adapter\min-text-adapter-helper.server.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPagePath,
  $providersPageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath,
  $navigationTypesPath,
  $textAdapterTypesPath,
  $textAdapterCatalogPath,
  $textAdapterIndexPath,
  $textAdapterHelperPath,
  $allSmokePath,
  $checkpointCurrentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $textAdapterTypesPath,
  $textAdapterCatalogPath,
  $textAdapterIndexPath
)
$serverHelperSource = Get-Content -Raw $textAdapterHelperPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$serverHelperNormalized = Normalize-Whitespace $serverHelperSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP",
  "5673",
  "Backend-Owned Minimal Manual-Gated Text Model Adapter MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal synthetic end-to-end packet review",
  "Synthetic end-to-end packet acceptance posture",
  "Backend-owned minimal manual-gated text model adapter MVP",
  "Text adapter input",
  "Text adapter redacted prompt envelope",
  "Text adapter deterministic fixture response",
  "Text adapter response envelope",
  "Text adapter gates",
  "Text adapter readiness matrix",
  "Text adapter evidence preview",
  "Athena can preview the backend-owned minimal manual-gated text model adapter MVP",
  "minimal text model adapter MVP is backend-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "text adapter review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated text model adapter MVP",
  "minimal text model adapter MVP is backend-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "text adapter review and recovery preview comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video contains $needle"
}

foreach ($needle in @(
  "backend-owned-minimal-manual-gated-text-model-adapter-mvp-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-input-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-response-envelope-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-error-envelope-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-gate-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-readiness-matrix-v1",
  "Backend-owned minimal manual-gated text model adapter MVP",
  "Text adapter input",
  "Text adapter redacted prompt envelope",
  "Text adapter deterministic fixture response",
  "Text adapter response envelope",
  "Text adapter error envelope",
  "Text adapter gates",
  "Text adapter readiness matrix",
  "no LLM/model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'import "server-only";',
  "runMinimalManualGatedTextModelAdapterMvpForStaticFixture",
  "completed-text-adapter-fixture-only",
  "static placeholder only",
  "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only text adapter helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic text adapter source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic text adapter source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic text adapter source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic text adapter source excludes browser storage"
}

$fixtureRun = Invoke-TextAdapterFixtureRun $root
Assert-Equal $fixtureRun.adapterState "completed-text-adapter-fixture-only" "server-only text adapter helper returns fixture-only adapter state"
Assert-Equal $fixtureRun.textAdapterId "text-model-adapter-preview:conversational-planning-request" "server-only text adapter helper returns deterministic preview adapter id"
Assert-Equal $fixtureRun.requestId "text-model-adapter-request-preview:conversational-planning-request" "server-only text adapter helper returns deterministic request id"
Assert-Equal $fixtureRun.responseId "text-model-adapter-response-preview:conversational-planning-request" "server-only text adapter helper returns deterministic response id"
Assert-Equal $fixtureRun.adapterDigest "text-model-adapter-digest-preview:conversational-planning-request:fixture-only" "server-only text adapter helper returns deterministic adapter digest"
Assert-Equal $fixtureRun.normalizedOperatorIntent "static fixture only" "server-only text adapter helper returns static fixture operator intent"
Assert-Equal $fixtureRun.redactedPromptPreview "static placeholder only" "server-only text adapter helper returns redacted prompt placeholder"
Assert-Equal $fixtureRun.deterministicFixtureResponse "static placeholder only" "server-only text adapter helper returns deterministic fixture response placeholder"
Assert-Equal $fixtureRun.providerResponseState "not received" "server-only text adapter helper keeps provider response blocked"
Assert-Equal $fixtureRun.modelOutputState "not generated" "server-only text adapter helper keeps model output blocked"
Assert-Equal $fixtureRun.persistenceState "not implemented" "server-only text adapter helper keeps persistence blocked"
Assert-Equal $fixtureRun.currentReadiness "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent" "server-only text adapter helper reports current readiness"
if (($fixtureRun.nextTextAdapterReviewRecoveryChecklist | Measure-Object).Count -lt 1) {
  throw "[FAIL] server-only text adapter helper did not return a next review/recovery checklist"
}
Write-Host "[PASS] server-only text adapter helper returns next review/recovery checklist"

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 5673 Backend-Owned Minimal Manual-Gated Text Model Adapter MVP" "scripts/smoke-codexforge-all.ps1 contains phase 5673 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 5673" "checkpoint current doc reports Highest detected phase: 5673"
Assert-Contains $checkpointNormalized "Latest completed batch: 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP" "checkpoint current doc reports latest completed text adapter batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview" "checkpoint current doc reports next likely text adapter review batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"text-adapter-routing"' "AthenaCommandCenterPanel uses scoped text adapter routing keys"
Assert-Contains $athenaPanelSource '"text-adapter-gates"' "AthenaCommandCenterPanel uses scoped text adapter gate keys"
Assert-Contains $athenaPanelSource '"text-adapter-readiness"' "AthenaCommandCenterPanel uses scoped text adapter readiness keys"

Write-Host "[PASS] CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter MVP smoke completed."
