param(
  [Parameter(Mandatory = $true)][string]$EvidenceDirectory,
  [Parameter(Mandatory = $true)][string]$QualificationEvidenceFile,
  [Parameter(Mandatory = $true)][string]$ApprovalFile,
  [Parameter(Mandatory = $true)][string]$ExpectedCheckpointCommit,
  [Parameter(Mandatory = $true)][switch]$ExplicitOneAttemptLocalAcceptance
)

$ErrorActionPreference = "Stop"

if (-not $ExplicitOneAttemptLocalAcceptance) {
  throw "ExplicitOneAttemptLocalAcceptance is required."
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
foreach ($sliceRInputFile in @($QualificationEvidenceFile, $ApprovalFile)) {
  $sliceRInputPath = [System.IO.Path]::GetFullPath($sliceRInputFile)
  if (-not (Test-Path -LiteralPath $sliceRInputPath -PathType Leaf)) {
    throw "Qualification and approval inputs must be existing files."
  }
  if (-not $sliceRInputPath.StartsWith($sliceREvidencePath.TrimEnd('\') + '\', [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Qualification and approval inputs must be inside EvidenceDirectory."
  }
}

$sliceRHead = (& git -C $sliceRRootPath rev-parse HEAD).Trim()
if ($sliceRHead -ne $ExpectedCheckpointCommit) {
  throw "Current HEAD does not match ExpectedCheckpointCommit."
}
if (-not [string]::IsNullOrWhiteSpace(((& git -C $sliceRRootPath status --porcelain=v1 --untracked-files=all) | Out-String))) {
  throw "Manual acceptance requires a clean worktree."
}

$sliceRNodeSource = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const repoRoot = process.argv[2];
const evidenceDirectory = process.argv[3];
const qualificationPath = process.argv[4];
const approvalPath = process.argv[5];
const checkpoint = process.argv[6];
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolve.call(this, request, parent, isMain, options);
};
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
  const acceptance = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"));
  const qualificationEnvelope = JSON.parse(fs.readFileSync(qualificationPath, "utf8"));
  const approval = JSON.parse(fs.readFileSync(approvalPath, "utf8"));
  const store = acceptance.createCodexForgeQwen25Coder32BFileApprovalConsumptionStore({ evidenceDirectory, repositoryRoot: repoRoot });
  const result = await acceptance.runCodexForgeQwen25Coder32BControlledLiveAcceptance({
    qualification: qualificationEnvelope.result?.value ?? null,
    approval,
    implementationCheckpointCommit: checkpoint,
  }, { approvalConsumptionStore: store });
  const fileName = result.ok
    ? `acceptance-${result.value.contentDigest.sha256}.json`
    : `acceptance-rejected-${approval.contentDigest?.sha256 ?? Date.now()}.json`;
  const descriptor = fs.openSync(path.join(evidenceDirectory, fileName), "wx", 0o600);
  try { fs.writeFileSync(descriptor, JSON.stringify(result, null, 2), "utf8"); }
  finally { fs.closeSync(descriptor); }
  process.stdout.write(result.ok ? "ACCEPTED_PENDING_MANUAL_REVIEW\n" : "REJECTED\n");
  if (!result.ok) process.exitCode = 1;
})().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
'@

$sliceRTempScript = Join-Path $env:TEMP "codexforge-qwen32b-acceptance-runner.js"
Set-Content -LiteralPath $sliceRTempScript -Value $sliceRNodeSource -Encoding ASCII
try {
  & node $sliceRTempScript $sliceRRootPath $sliceREvidencePath ([System.IO.Path]::GetFullPath($QualificationEvidenceFile)) ([System.IO.Path]::GetFullPath($ApprovalFile)) $ExpectedCheckpointCommit
  if ($LASTEXITCODE -ne 0) { throw "Controlled local live acceptance was rejected." }
} finally {
  if (Test-Path -LiteralPath $sliceRTempScript) {
    Remove-Item -LiteralPath $sliceRTempScript -Force
  }
}
