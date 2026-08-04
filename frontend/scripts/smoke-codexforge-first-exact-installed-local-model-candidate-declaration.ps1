$ErrorActionPreference = "Stop"

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-NoGitDiff([string]$Path, [string]$Message) {
  $diff = ((& git -c core.safecrlf=false diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

function Assert-PowerShellParses([string]$Path) {
  $tokens = $null
  $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile((Resolve-Path $Path), [ref]$tokens, [ref]$errors) | Out-Null
  Assert-True ($errors.Count -eq 0) "PowerShell parses: $Path"
}

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "=== CodexForge first exact installed local model candidate declaration smoke ==="

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
foreach ($path in $macroPhaseCPaths) {
  Assert-True (Test-Path -LiteralPath $path -PathType Leaf) "Historical Macro Phase C.1 source remains present: $path"
}

foreach ($file in $sliceRFiles) {
  Assert-True (Test-Path -LiteralPath $file -PathType Leaf) "Slice R file exists: $file"
}

$candidateServerPath = "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-installed-candidate.server.ts"
$candidateTypesPath = "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-installed-candidate-types.ts"
$candidateSource = Get-Content -Raw -LiteralPath $candidateServerPath
$candidateTypes = Get-Content -Raw -LiteralPath $candidateTypesPath
$documentation = Get-Content -Raw -LiteralPath "docs/codexforge-first-exact-installed-local-model-candidate-declaration-v0.md"

Assert-True ((Get-Content -LiteralPath $candidateServerPath -TotalCount 1) -eq 'import "server-only";') "Slice Q candidate module is server-only"
Assert-True ($candidateTypes -match 'CodexForgeModelOnboardingPacket') "Slice Q reuses the Slice P model packet type"
Assert-True ($candidateTypes -match 'CodexForgeOnboardingAdapterAuthority') "Slice Q reuses the Slice P adapter authority type"
Assert-True ($candidateTypes -match 'CodexForgeOnboardingContentDigest') "Slice Q reuses the Slice P content digest type"
Assert-True ($candidateSource -match 'freezeCodexForgeOnboardingValue') "Slice Q reuses Slice P deep freezing"
Assert-True ($candidateSource -match 'CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS') "Slice Q reuses Slice P complexity limits"
Assert-True ($candidateSource -notmatch '\bfetch\s*\(') "Slice Q candidate source contains no fetch"
Assert-True ($candidateSource -notmatch 'process\.env') "Slice Q candidate source contains no environment read"
Assert-True ($candidateSource -notmatch '\b(?:writeFile|appendFile|rename|spawn|exec|fork)\s*\(') "Slice Q candidate source contains no mutation or process primitive"
Assert-True ($candidateSource -notmatch '/api/(?:tags|show|ps)|ollama\s+(?:list|show|ps|run|pull|cp|create)') "Slice Q candidate source contains no Ollama inspection or command"
$candidateImports = ([regex]::Matches($candidateSource, '(?m)^import .*;$') | ForEach-Object { $_.Value }) -join "`n"
Assert-True ($candidateImports -notmatch '(?:private-alpha|ollama-provider|groq-provider|provider-client|model-routing-(?:catalog|provider-registry|policy))') "Slice Q candidate source imports no provider-capable module"

$onboardingIndex = Get-Content -Raw -LiteralPath "src/lib/codexforge/model-routing/onboarding/index.ts"
$onboardingServer = Get-Content -Raw -LiteralPath "src/lib/codexforge/model-routing/onboarding/server.ts"
$modelRoutingIndex = Get-Content -Raw -LiteralPath "src/lib/codexforge/model-routing/index.ts"
Assert-True (($onboardingIndex + $onboardingServer + $modelRoutingIndex) -notmatch 'qwen2-5-coder-32b-installed-candidate') "No onboarding or model-routing barrel exports Slice Q"

$changedPaths = @(
  (& git status --short --untracked-files=all) |
    Where-Object { $_.Length -ge 4 } |
    ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } |
    Sort-Object -Unique
)

foreach ($protectedPath in @(
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "src/lib/codexforge/model-routing/model-routing-types.ts",
  "src/lib/codexforge/model-routing/model-routing-policy.server.ts",
  "src/lib/codexforge/model-routing/index.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-types.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-constants.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts",
  "src/lib/codexforge/model-routing/onboarding/index.ts",
  "src/lib/codexforge/model-routing/onboarding/server.ts",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  ".codexforge/private-alpha"
)) {
  Assert-NoGitDiff $protectedPath "Protected production/Slice P path remains unchanged: $protectedPath"
}

$expectedPrivateAlphaLibraryChanges = @(
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/private-alpha/private-alpha-http.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-native-filesystem.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-store.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-types.ts",
  "src/lib/codexforge/private-alpha/private-alpha-validation.ts"
)
$actualPrivateAlphaLibraryChanges = @(
  $changedPaths |
    Where-Object { $_ -like "src/lib/codexforge/private-alpha/*" } |
    Sort-Object
)
Assert-True (@(Compare-Object -ReferenceObject @($expectedPrivateAlphaLibraryChanges | Sort-Object) -DifferenceObject $actualPrivateAlphaLibraryChanges).Count -eq 0) "Authorized Private Alpha library ownership migration is limited to the exact seven security and persistence files"

$expectedPrivateAlphaRouteChanges = @(
  "src/app/api/codexforge/private-alpha/routing/free-first/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts",
  "src/app/api/codexforge/private-alpha/runs/[runId]/route.ts",
  "src/app/api/codexforge/private-alpha/runs/route.ts",
  "src/app/api/codexforge/private-alpha/status/route.ts"
)
$actualPrivateAlphaRouteChanges = @(
  $changedPaths |
    Where-Object { $_ -like "src/app/api/codexforge/private-alpha/*" } |
    Sort-Object
)
Assert-True (@(Compare-Object -ReferenceObject @($expectedPrivateAlphaRouteChanges | Sort-Object) -DifferenceObject $actualPrivateAlphaRouteChanges).Count -eq 0) "Authorized Private Alpha API ownership migration is limited to the exact seven HTTP routes"
foreach ($providerBoundary in @(
  "src/lib/codexforge/private-alpha/private-alpha-provider-runtime.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts"
)) {
  Assert-NoGitDiff $providerBoundary "Private Alpha provider/runtime boundary remains unchanged: $providerBoundary"
}

$protectedHashes = @{
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts" = "51b8b4f9a4a50ec61c77979f6bdac9c7dd4fe2486ee247a093326a4439d7ff38"
  "src/lib/codexforge/model-routing/model-routing-catalog.ts" = "157b60f46251f24daa62ca414f5bb05648454caaf196f79d482a7733dff97db5"
  "src/lib/codexforge/model-routing/model-routing-types.ts" = "907ad18ada630d2be33439e9d073932e49b5428904057eb71ac736331ea32294"
  "src/lib/codexforge/model-routing/model-routing-policy.server.ts" = "3b68d0cc2e79175f740d73d002dd7a554c54133a10d8e46901dccee0763ec201"
  "src/lib/codexforge/model-routing/index.ts" = "608b2c2459fd8a5174176266164f31b83b3b879d7f16211289b171067d4626f4"
  "src/lib/codexforge/model-routing/onboarding/onboarding-types.ts" = "1f7b274961161f17ebd1e0975c082f982d885200a345da4ff5ebd12e7ce06e6e"
  "src/lib/codexforge/model-routing/onboarding/onboarding-constants.ts" = "7895d552e6eb73981e4ff173512d0d037b1b36f39114214e11d2498073f6dbba"
  "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts" = "8bdc94f17c0cb9ca8e27ad5a5d0f952aad8c354134758d6ac8f8ed9a894d16bc"
  "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts" = "cef4aedee649db7af1a02dae97220fc47fdb9ec7f700a391afbdd662758c4b32"
  "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts" = "f069cd801ed5e4d8126292add0118a4d2f09eef575b7b015fdeac7b9b9f00d8f"
  "src/lib/codexforge/model-routing/onboarding/index.ts" = "8a215de2421e62c3d05c32a74c67311d7c262a6415b89d3d9ed78d306b3a343f"
  "src/lib/codexforge/model-routing/onboarding/server.ts" = "522b93983f27e1b85bf7ae8e98e5f1703b4383828ba0eb8809b93b2300fd0b82"
}
foreach ($entry in $protectedHashes.GetEnumerator()) {
  $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $entry.Key).Hash.ToLowerInvariant()
  Assert-True ($actual -eq $entry.Value) "Protected file SHA-256 is unchanged: $($entry.Key)"
}

$candidateNeedles = @(
  "qwen2.5-coder:32b",
  "ollama-local::qwen2.5-coder:32b",
  "b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41"
)
$productionFiles = @(
  Get-ChildItem -LiteralPath "src/app" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/private-alpha" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/ollama-provider" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/groq-provider" -Recurse -File -Include "*.ts", "*.tsx"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-provider-registry.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-catalog.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-policy.server.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/index.ts"
)
$productionText = ($productionFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_.FullName }) -join "`n"
foreach ($needle in $candidateNeedles) {
  Assert-True ($productionText -notmatch [regex]::Escape($needle)) "Candidate identity is absent from production source: $needle"
}

$aggregate = Get-Content -Raw -LiteralPath "scripts/smoke-codexforge-all.ps1"
$releaseBlock = [regex]::Match($aggregate, '(?s)\$currentReleaseGateScripts = @\((.*?)\r?\n\)').Groups[1].Value
$entries = @($releaseBlock -split "`n" | Where-Object { $_ -match '^  @\{' })
Assert-True ($entries.Count -eq 74) "Aggregate executable entry count is 74"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$true' }).Count -eq 71) "Aggregate required count is 71"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$false' }).Count -eq 3) "Aggregate optional count is 3"
Assert-True (@($entries | Where-Object { $_ -match 'smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1' }).Count -eq 1) "Slice Q smoke is registered exactly once"
Assert-True ($releaseBlock -match 'Registry-Backed Free/Local Provider Onboarding and Admission Foundation"; File = "smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation\.ps1"; Required = \$true \},\r?\n  @\{ Name = "First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},') "Slice Q smoke follows Slice P and is required"
Assert-True ($releaseBlock -match 'First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Exact Qwen 2\.5 Coder 32B Qualification and Controlled Acceptance Contract"; File = "smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract\.ps1"; Required = \$true \},') "Slice R smoke follows Slice Q and is required"

Assert-True ($candidateSource -match 'dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90') "Evidence digest is pinned in source"
Assert-True ($candidateSource -match 'a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f') "Candidate digest is pinned in source"
Assert-True ($documentation -match 'dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90') "Evidence digest is pinned in documentation"
Assert-True ($documentation -match 'a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f') "Candidate digest is pinned in documentation"

Assert-PowerShellParses "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1"

$nodeScript = @'
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const net = require("net");
const path = require("path");
const Module = require("module");
const childProcess = require("child_process");
const repoRoot = process.argv[2];
const ts = require(path.join(repoRoot, "node_modules", "typescript"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepFrozen(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return true;
  seen.add(value);
  return Object.isFrozen(value) && Reflect.ownKeys(value).every((key) => deepFrozen(value[key], seen));
}

const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};

const catalog = require(path.join(repoRoot, "src/lib/codexforge/model-routing/model-routing-catalog.ts")).CODEXFORGE_PRODUCTION_MODEL_CATALOG;
const catalogJson = JSON.stringify(catalog);
const catalogSha256 = crypto.createHash("sha256").update(catalogJson, "utf8").digest("hex");
assert(catalog.catalogVersion === "codexforge-model-routing-v4", "catalog version changed");
assert(catalogSha256 === "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b", "catalog hash changed");
assert(JSON.stringify(catalog.providers.map((value) => value.providerId)) === JSON.stringify(["ollama-local", "groq-cloud"]), "provider order changed");
assert(JSON.stringify(catalog.models.map((value) => value.modelKey)) === JSON.stringify(["ollama-local::gpt-oss:20b", "groq-cloud::openai/gpt-oss-20b", "groq-cloud::openai/gpt-oss-120b"]), "model order changed");

const counters = {
  externalNetwork: 0,
  localhostMetadataRequests: 0,
  fetch: 0,
  childProcesses: 0,
  environmentReads: 0,
  credentialReads: 0,
  fileMutations: 0,
  browserStorage: 0,
  providerCapableImports: 0,
  approvalOrPersistenceImports: 0,
  generationOrExecutionImports: 0,
};

function blockedNetwork() {
  counters.externalNetwork += 1;
  throw new Error("network forbidden");
}
global.fetch = function() { counters.fetch += 1; throw new Error("fetch forbidden"); };
http.request = blockedNetwork;
http.get = blockedNetwork;
https.request = blockedNetwork;
https.get = blockedNetwork;
net.connect = blockedNetwork;
net.createConnection = blockedNetwork;

const originalEnvironment = process.env;
process.env = new Proxy(originalEnvironment, {
  get(target, property, receiver) {
    counters.environmentReads += 1;
    if (typeof property === "string" && /KEY|SECRET|TOKEN|PASSWORD|CREDENTIAL|AUTH/i.test(property)) {
      counters.credentialReads += 1;
    }
    throw new Error("environment read forbidden");
  },
});

for (const name of ["writeFileSync", "appendFileSync", "renameSync", "writeFile", "appendFile", "rename"]) {
  fs[name] = function() { counters.fileMutations += 1; throw new Error("filesystem mutation forbidden"); };
}
for (const name of ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]) {
  childProcess[name] = function() { counters.childProcesses += 1; throw new Error("child process forbidden"); };
}
for (const name of ["localStorage", "sessionStorage", "indexedDB"]) {
  Object.defineProperty(global, name, {
    configurable: true,
    get() { counters.browserStorage += 1; throw new Error("browser storage forbidden"); },
  });
}

Module._load = function(request, parent, isMain) {
  if (request === "server-only") return {};
  if (/ollama-provider|groq-provider|provider-client|model-routing-(?:catalog|provider-registry|policy)/.test(request)) {
    counters.providerCapableImports += 1;
    throw new Error("provider-capable import forbidden");
  }
  if (/private-alpha-(?:store|state-machine)|approval/.test(request)) {
    counters.approvalOrPersistenceImports += 1;
    throw new Error("approval or persistence import forbidden");
  }
  if (/generate|execution|provider-runtime|ollama\.server/.test(request)) {
    counters.generationOrExecutionImports += 1;
    throw new Error("generation or execution import forbidden");
  }
  return originalLoad.apply(this, arguments);
};

const candidateModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-installed-candidate.server.ts"));
const validate = candidateModule.validateCodexForgeQwen25Coder32BInstalledCandidate;
const canonicalEvidence = candidateModule.canonicalizeCodexForgeQwen25Coder32BInstallationEvidence;
const canonicalCandidate = candidateModule.canonicalizeCodexForgeQwen25Coder32BCandidate;
const sha256 = (value) => crypto.createHash("sha256").update(value, "utf8").digest("hex");

function resign(candidate) {
  candidate.installationEvidence.artifactDigest.sha256 = sha256(canonicalEvidence(candidate.installationEvidence));
  candidate.contentDigest.sha256 = sha256(canonicalCandidate(candidate));
  return candidate;
}

function expectRejected(label, mutate, expectedCode) {
  const candidate = clone(candidateModule.getCodexForgeQwen25Coder32BInstalledCandidate());
  mutate(candidate);
  resign(candidate);
  const result = validate(candidate);
  assert(!result.ok, `${label} must be rejected`);
  if (expectedCode) assert(result.rejection.codes.includes(expectedCode), `${label} must report ${expectedCode}`);
}

const first = candidateModule.getCodexForgeQwen25Coder32BInstalledCandidate();
const second = candidateModule.getCodexForgeQwen25Coder32BInstalledCandidate();
assert(validate(first).ok, "exact candidate rejected");
assert(first.modelPacket.limits.requestedAdmissionMaximumOutputTokens === 4096, "4096 envelope missing");
assert(first.installationEvidence.installedModelDigestSha256 === "b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41", "full digest changed");
assert(first.installationEvidence.observedDigestPrefix12 === "b92d6a0bd47e", "display digest prefix changed");
assert(first.installationEvidence.artifactDigest.sha256 === "dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90", "evidence digest changed");
assert(first.contentDigest.sha256 === "a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f", "candidate digest changed");
assert(deepFrozen(first) && deepFrozen(second), "getter results must be deeply frozen");
assert(first !== second && first.modelPacket !== second.modelPacket && first.installationEvidence !== second.installationEvidence, "getter graphs must be clone-isolated");

const sourceIsolationInput = clone(first);
const sourceIsolationResult = validate(sourceIsolationInput);
assert(sourceIsolationResult.ok, "source-isolation validation failed");
sourceIsolationInput.modelPacket.identity.displayName = "mutated after validation";
assert(sourceIsolationResult.value.modelPacket.identity.displayName === "Qwen2.5 Coder 32B", "validated result aliases input");

function reverseKeys(value) {
  if (Array.isArray(value)) return value.map(reverseKeys);
  if (value && typeof value === "object") {
    const result = {};
    for (const key of Object.keys(value).reverse()) result[key] = reverseKeys(value[key]);
    return result;
  }
  return value;
}
const reversed = reverseKeys(clone(first));
assert(canonicalEvidence(reversed.installationEvidence) === canonicalEvidence(first.installationEvidence), "evidence canonical JSON depends on insertion order");
assert(canonicalCandidate(reversed) === canonicalCandidate(first), "candidate canonical JSON depends on insertion order");
assert(validate(reversed).ok, "equivalent property insertion order rejected");

expectRejected("short full digest", (c) => { c.installationEvidence.installedModelDigestSha256 = "b92d6a0bd47e"; }, "full-digest-required");
expectRejected("one-character digest mismatch", (c) => { c.installationEvidence.installedModelDigestSha256 = "a" + c.installationEvidence.installedModelDigestSha256.slice(1); }, "installation-digest-mismatch");
expectRejected("wrong model key", (c) => { c.modelPacket.modelKey = "ollama-local::wrong"; });
expectRejected("wrong model ID", (c) => { c.modelPacket.identity.modelId = "wrong:32b"; });
expectRejected("wrong provider", (c) => { c.modelPacket.providerKey = "wrong-provider"; });
expectRejected("wrong adapter ID", (c) => { c.modelPacket.adapter.adapterId = "wrong-adapter"; });
expectRejected("wrong adapter protocol", (c) => { c.modelPacket.adapter.protocol = "openai-compatible-chat-completions-v1"; });
expectRejected("wrong family", (c) => { c.installationEvidence.family = "wrong"; });
expectRejected("wrong families", (c) => { c.installationEvidence.families = ["wrong"]; });
expectRejected("wrong parameter size", (c) => { c.installationEvidence.parameterSize = "33B"; });
expectRejected("wrong parameter count", (c) => { c.installationEvidence.parameterCount += 1; });
expectRejected("wrong quantization", (c) => { c.installationEvidence.quantizationLevel = "Q8_0"; });
expectRejected("wrong context", (c) => { c.installationEvidence.contextLengthTokens = 4096; });
expectRejected("wrong embedding length", (c) => { c.installationEvidence.embeddingLength = 4096; });
expectRejected("wrong template digest", (c) => { c.installationEvidence.content.template.sha256 = "a".repeat(64); });
expectRejected("wrong template byte length", (c) => { c.installationEvidence.content.template.utf8Bytes += 1; });
expectRejected("wrong license digest", (c) => { c.installationEvidence.content.license.sha256 = "a".repeat(64); });
expectRejected("wrong license byte length", (c) => { c.installationEvidence.content.license.utf8Bytes += 1; });
expectRejected("wrong system digest", (c) => { c.installationEvidence.content.system.sha256 = "a".repeat(64); });
expectRejected("wrong system byte length", (c) => { c.installationEvidence.content.system.utf8Bytes += 1; });
expectRejected("wrong Modelfile digest", (c) => { c.installationEvidence.content.modelfile.sha256 = "a".repeat(64); });
expectRejected("wrong Modelfile byte length", (c) => { c.installationEvidence.content.modelfile.utf8Bytes += 1; });
expectRejected("parameters content invented", (c) => { c.installationEvidence.content.parameters = { sha256: "a".repeat(64), utf8Bytes: 1 }; });
expectRejected("wrong capability", (c) => { c.modelPacket.capabilities = ["image-generation"]; });
expectRejected("tool capability escalation", (c) => { c.modelPacket.capabilities = ["text-generation", "tools"]; });
expectRejected("insert capability escalation", (c) => { c.modelPacket.capabilities = ["text-generation", "insert"]; });
expectRejected("wrong input modality", (c) => { c.modelPacket.inputModalities = ["image"]; });
expectRejected("wrong output modality", (c) => { c.modelPacket.outputModalities = ["image"]; });
expectRejected("4097 output envelope", (c) => { c.modelPacket.limits.requestedAdmissionMaximumOutputTokens = 4097; });
expectRejected("cloud locality", (c) => { c.modelPacket.locality = "cloud"; });
expectRejected("cloud boundary", (c) => { c.modelPacket.dataBoundary = "cloud-provider"; });
expectRejected("credentials", (c) => { c.modelPacket.credentialMode = "server-environment-only"; });
expectRejected("mutable latest model", (c) => { c.modelPacket.identity.modelId = "qwen2.5-coder:latest"; }, "mutable-model-id-rejected");
expectRejected("qualification mutation", (c) => { c.modelPacket.modelQualification.state = "qualified"; });
expectRejected("acceptance mutation", (c) => { c.modelPacket.liveAcceptance.state = "accepted"; });
expectRejected("manual admission mutation", (c) => { c.modelPacket.manualExecutionAdmission.state = "admitted"; });
expectRejected("automatic admission mutation", (c) => { c.modelPacket.automaticRoutingAdmission.state = "admitted"; });
expectRejected("visibility mutation", (c) => { c.activation.uiVisibility = "visible"; });
expectRejected("registry activation mutation", (c) => { c.activation.registryActivation = "possible"; });
expectRejected("catalog activation mutation", (c) => { c.activation.catalogActivation = "possible"; });
expectRejected("approval mutation", (c) => { c.requestApproval = "recorded"; });
expectRejected("execution mutation", (c) => { c.execution = "possible"; });
expectRejected("download mutation", (c) => { c.modelPacket.installationPosture.automaticModelDownloadAllowed = true; });
expectRejected("retry mutation", (c) => { c.modelPacket.executionPosture.retryAllowed = true; });
expectRejected("fallback mutation", (c) => { c.modelPacket.executionPosture.fallbackAllowed = true; });
expectRejected("rerouting mutation", (c) => { c.modelPacket.executionPosture.reroutingAfterPersistenceAllowed = true; });
expectRejected("provider substitution mutation", (c) => { c.modelPacket.executionPosture.providerSubstitutionAllowed = true; });
expectRejected("model substitution mutation", (c) => { c.modelPacket.executionPosture.modelSubstitutionAllowed = true; });
expectRejected("model-size switching mutation", (c) => { c.modelPacket.executionPosture.automaticModelSizeSwitchingAllowed = true; });
expectRejected("paid execution mutation", (c) => { c.modelPacket.executionPosture.paidExecutionAllowed = true; });
expectRejected("unknown nested field", (c) => { c.installationEvidence.content.template.unexpected = true; }, "unknown-field");
const secretCandidate = clone(first);
secretCandidate.installationEvidence.apiKey = "sk-abcdefghijklmnop";
const secretResult = validate(secretCandidate);
assert(!secretResult.ok && secretResult.rejection.codes.includes("secret-material-detected"), "secret-shaped material accepted");

const wrongEvidenceDigest = clone(first);
wrongEvidenceDigest.installationEvidence.artifactDigest.sha256 = "a".repeat(64);
wrongEvidenceDigest.contentDigest.sha256 = sha256(canonicalCandidate(wrongEvidenceDigest));
let rejected = validate(wrongEvidenceDigest);
assert(!rejected.ok && rejected.rejection.codes.includes("artifact-digest-mismatch"), "evidence digest mismatch accepted");
const wrongCandidateDigest = clone(first);
wrongCandidateDigest.contentDigest.sha256 = "a".repeat(64);
rejected = validate(wrongCandidateDigest);
assert(!rejected.ok && rejected.rejection.codes.includes("content-digest-mismatch"), "candidate digest mismatch accepted");

let getterInvocations = 0;
const accessorCandidate = clone(first);
Object.defineProperty(accessorCandidate.installationEvidence, "family", { enumerable: true, get() { getterInvocations += 1; return "qwen2"; } });
rejected = validate(accessorCandidate);
assert(!rejected.ok && rejected.rejection.codes.includes("accessor-property-rejected") && getterInvocations === 0, "accessor was not rejected safely");

assert(Object.values(counters).every((value) => value === 0), `side effect counter changed: ${JSON.stringify(counters)}`);

process.stdout.write(JSON.stringify({
  success: true,
  evidenceArtifactSha256: first.installationEvidence.artifactDigest.sha256,
  candidateContentSha256: first.contentDigest.sha256,
  catalogSha256,
  providerOrder: catalog.providers.map((value) => value.providerId),
  modelOrder: catalog.models.map((value) => value.modelKey),
  counters,
}));
'@

$validationJson = $nodeScript | node - $root
if ($LASTEXITCODE -ne 0) { throw "[FAIL] Slice Q Node validation failed" }
$validation = $validationJson | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Slice Q Node validation passed"
Assert-True ($validation.evidenceArtifactSha256 -eq "dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90") "Evidence artifact digest is exact"
Assert-True ($validation.candidateContentSha256 -eq "a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f") "Candidate content digest is exact"
Assert-True ($validation.catalogSha256 -eq "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b") "Production catalog hash is unchanged"
foreach ($property in $validation.counters.PSObject.Properties) {
  Assert-True ([int]$property.Value -eq 0) "Zero side-effect counter: $($property.Name)"
}

Write-Host "PASS: CodexForge first exact installed local model candidate declaration smoke"
