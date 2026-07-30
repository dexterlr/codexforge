param(
  [Parameter(Mandatory = $true)][string]$EvidenceDirectory,
  [Parameter(Mandatory = $true)][string]$ExpectedCheckpointCommit,
  [Parameter(Mandatory = $true)][switch]$ExplicitReadOnlyQualification
)

$ErrorActionPreference = "Stop"

if (-not $ExplicitReadOnlyQualification) {
  throw "ExplicitReadOnlyQualification is required."
}
if ($ExpectedCheckpointCommit -notmatch '^[a-f0-9]{40}$') {
  throw "ExpectedCheckpointCommit must be a complete lowercase commit ID."
}

$sliceRRoot = Split-Path -Parent $PSScriptRoot
$sliceRRootPath = [System.IO.Path]::GetFullPath($sliceRRoot)
$sliceREvidencePath = [System.IO.Path]::GetFullPath($EvidenceDirectory)
$sliceRRootPrefix = $sliceRRootPath.TrimEnd('\') + '\'
if (-not (Test-Path -LiteralPath $sliceREvidencePath -PathType Container)) {
  throw "EvidenceDirectory must already exist."
}
if ($sliceREvidencePath -eq $sliceRRootPath -or $sliceREvidencePath.StartsWith($sliceRRootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "EvidenceDirectory must be outside the repository."
}

$sliceRHead = (& git -C $sliceRRootPath rev-parse HEAD).Trim()
if ($sliceRHead -ne $ExpectedCheckpointCommit) {
  throw "Current HEAD does not match ExpectedCheckpointCommit."
}
if (-not [string]::IsNullOrWhiteSpace(((& git -C $sliceRRootPath status --porcelain=v1 --untracked-files=all) | Out-String))) {
  throw "Manual qualification requires a clean worktree."
}

$sliceRNodeSource = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const repoRoot = process.argv[2];
const evidenceDirectory = process.argv[3];
const checkpoint = process.argv[4];
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};
(async () => {
  const qualification = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts"));
  const result = await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate();
  const fileName = result.ok
    ? `qualification-${result.value.contentDigest.sha256}.json`
    : `qualification-rejected-${Date.now()}.json`;
  const output = { implementationCheckpointCommit: checkpoint, result };
  const descriptor = fs.openSync(path.join(evidenceDirectory, fileName), "wx", 0o600);
  try { fs.writeFileSync(descriptor, JSON.stringify(output, null, 2), "utf8"); }
  finally { fs.closeSync(descriptor); }
  process.stdout.write(result.ok ? "QUALIFIED\n" : "REJECTED\n");
  if (!result.ok) process.exitCode = 1;
})().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
'@

$sliceRTempScript = Join-Path $env:TEMP "codexforge-qwen32b-qualification-runner.js"
Set-Content -LiteralPath $sliceRTempScript -Value $sliceRNodeSource -Encoding ASCII
try {
  & node $sliceRTempScript $sliceRRootPath $sliceREvidencePath $ExpectedCheckpointCommit
  if ($LASTEXITCODE -ne 0) { throw "Controlled read-only qualification was rejected." }
} finally {
  if (Test-Path -LiteralPath $sliceRTempScript) {
    Remove-Item -LiteralPath $sliceRTempScript -Force
  }
}
