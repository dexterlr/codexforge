param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  Assert-True ($Haystack.IndexOf($Needle, [StringComparison]::Ordinal) -ge 0) $Message
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  Assert-True (-not [regex]::IsMatch($Haystack, $Pattern)) $Message
}

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

Write-Host ""
Write-Host "=== CodexForge Macro Phase D1 shared creator lifecycle foundation ==="

$requiredFiles = @(
  "src/lib/codexforge/creator/creator-types.ts",
  "src/lib/codexforge/creator/creator-policy.ts",
  "src/lib/codexforge/creator/creator-state-machine.ts",
  "src/lib/codexforge/creator/creator-native-filesystem.server.ts",
  "native/codexforge_creator_filesystem.cc",
  "src/lib/codexforge/creator/creator-filesystem.server.ts",
  "src/lib/codexforge/creator/creator-persistence.server.ts",
  "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts",
  "src/lib/codexforge/creator/creator-service.server.ts",
  "src/lib/codexforge/creator/creator-http.server.ts",
  "src/app/api/codexforge/creator/projects/route.ts",
  "src/app/api/codexforge/creator/projects/[projectId]/actions/route.ts",
  "scripts/codexforge-creator-deterministic-activity-trap.cjs",
  "scripts/smoke-codexforge-creator-lock-concurrency.cjs",
  "docs/codexforge-macro-phase-d1-shared-creator-lifecycle-foundation.md"
)
foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file)) "D1 file exists: $file"
}

$types = Get-Text "src/lib/codexforge/creator/creator-types.ts"
$policy = Get-Text "src/lib/codexforge/creator/creator-policy.ts"
$stateMachine = Get-Text "src/lib/codexforge/creator/creator-state-machine.ts"
$persistence = Get-Text "src/lib/codexforge/creator/creator-persistence.server.ts"
$nativeFilesystem = Get-Text "src/lib/codexforge/creator/creator-native-filesystem.server.ts"
$nativeFilesystemImplementation = Get-Text "native/codexforge_creator_filesystem.cc"
$filesystem = Get-Text "src/lib/codexforge/creator/creator-filesystem.server.ts"
$adapter = Get-Text "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"
$service = Get-Text "src/lib/codexforge/creator/creator-service.server.ts"
$http = Get-Text "src/lib/codexforge/creator/creator-http.server.ts"

foreach ($state in @(
  '"draft"',
  '"awaiting_generation_approval"',
  '"approved"',
  '"generating"',
  '"validating"',
  '"rejected_output"',
  '"ready"',
  '"preview_available"',
  '"repair_requested"',
  '"awaiting_repair_approval"',
  '"repair_approved"',
  '"repairing"',
  '"failed"',
  '"canceled"',
  '"exported"'
)) {
  Assert-Contains $types $state "D1 typed state exists: $state"
}

Assert-Contains $stateMachine "CREATOR_TRANSITION_TABLE" "D1 state transitions are explicit"
Assert-Contains $stateMachine "CreatorTransitionError" "D1 illegal transitions fail closed"
Assert-Contains $policy 'providerKey: "ollama-local"' "D1 exact local provider is fixed"
Assert-Contains $policy 'modelKey: "ollama-local::gpt-oss:20b"' "D1 exact model key is fixed"
Assert-Contains $policy 'maximumOutputTokens: 4096' "D1 4096-token envelope is fixed"
Assert-Contains $policy 'dataBoundary: "local-machine"' "D1 local-machine data boundary is fixed"
Assert-Contains $policy 'fallback: "disabled"' "D1 fallback is disabled"
Assert-Contains $policy 'retry: "disabled"' "D1 retry is disabled"
Assert-Contains $adapter "createPrivateAlphaStore" "D1 reuses the established Private Alpha store"
Assert-Contains $adapter "approveRun" "D1 delegates approval to Private Alpha"
Assert-Contains $adapter "executeRun" "D1 delegates execution to Private Alpha"
Assert-Contains $service 'eventType: "approval.recorded"' "D1 approval audit is explicit"
Assert-Contains $service 'eventType: "execution.requested"' "D1 execution audit is explicit"
Assert-Contains $service "assertRevisionOrRecovery" "D1 interruption recovery is revision-bound"
Assert-Contains $service "assertBoundLifecycleRun(result.run, binding)" "D1 terminal lifecycle results are checked against the exact approved run binding"
Assert-Contains $service "sourceRunRevision: canceledRun.revision" "D1 cancellation propagates the exact returned Private Alpha revision into the creator binding"
Assert-Contains $service "assertIdempotencyMutationConsistency(current, keyHash, mutationDigest)" "D1 in-progress and completed idempotency keys remain bound to one exact mutation"
Assert-Contains $service "the validated result remains recoverable" "D1 post-validation kill-switch refusal preserves the validated recovery boundary"
Assert-Contains $service "assertProjectPublicationBinding" "D1 preview and export recheck the complete immutable publication binding"
Assert-Contains $persistence "Creator export provenance is inconsistent." "D1 persisted export provenance fails closed on an identity mismatch"
Assert-Contains $persistence "filesystem.writeAtomicExclusive(lockSegments, exactBytes)" "D1 filesystem locks publish one exact exclusive owner file"
Assert-Contains $persistence "filesystem.compareDeleteExact" "D1 stale takeover and release are fenced to exact owner bytes"
Assert-Contains $nativeFilesystem "publishTreeExclusive" "D1 native binding requires one whole-tree publication operation"
Assert-Contains $nativeFilesystem '"persistent" | "removable" | "existing"' "D1 native roots support fail-closed inspection without create semantics"
Assert-Contains $filesystem "normalizeTreePublicationEntries" "D1 whole-tree publication validates bounds and collisions before mutation"
Assert-Contains $filesystem "this.native().publishTreeExclusive(target, entries)" "D1 Windows whole-tree publication crosses the native boundary exactly once"
Assert-Contains $filesystem 'process.platform !== "win32"' "D1 creator mutation fails closed outside the audited Windows native boundary"
Assert-Contains $filesystem 'code === "helper_unavailable"' "D1 native capability failures are classified explicitly"
Assert-Contains $persistence "Rebuild the bundled Windows filesystem helper" "D1 unavailable native capability returns bounded actionable persistence guidance"
Assert-Contains $filesystem "realpath" "D1 filesystem boundary revalidates resolved paths"
Assert-Contains $filesystem "stat.isSymbolicLink()" "D1 rejects symbolic-link and junction components"
Assert-Contains $persistence "writeAtomicExclusive" "D1 state revisions use atomic exclusive publication"
Assert-Contains $nativeFilesystemImplementation "void WriteAtomicExclusive(" "D1 state publication uses the audited native atomic no-replace primitive"
Assert-Contains $nativeFilesystemImplementation 'CommitTransaction' "D1 native publication commits only through the Windows filesystem transaction boundary"
Assert-Contains $persistence "hashCreatorCanonicalJson" "D1 persisted records carry checksums"
Assert-Contains $http "CREATOR_MAX_MUTATION_BODY_BYTES" "D1 API body limit is server-owned"
Assert-Contains $http "If-Match" "D1 API requires revision preconditions"
Assert-Contains $http "same-origin" "D1 API enforces same-origin mutations"
Assert-Contains $http "readActiveNetworkListenerAddresses" "D1 API audits the actual active server listener"
Assert-Contains $http "bound only to loopback" "D1 API fails closed unless transport is loopback-bound"
Assert-NotMatches $service "GROQ_API_KEY|process\.env\.[A-Z_]*(?:KEY|TOKEN|SECRET|PASSWORD)|child_process|exec\(|spawn\(" "D1 service has no credential or arbitrary process path"
Assert-NotMatches $adapter "fetch\(|axios|http\.request|https\.request" "D1 adapter does not duplicate provider transport"

$nodeScript = @'
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const Module = require("module");
const repoRoot = process.argv[2];
const activityTrap = require(path.join(repoRoot, "scripts", "codexforge-creator-deterministic-activity-trap.cjs")).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d1-shared-creator-lifecycle"),
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d1-shared-creator-lifecycle-trust-backup"),
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d1-absent-read"),
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d1-cleanup-retry"),
    path.join(repoRoot, ".codexforge", "creator-tests", "macro-d1-cleanup-retry-backup"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests", "macro-d1-shared-creator-lifecycle"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests", "macro-d1-missing-transport-trap"),
    path.join(repoRoot, ".codexforge", "creator-escape-macro-d1-shared-creator-lifecycle"),
  ],
  allowedMkdirPaths: [
    path.join(repoRoot, ".codexforge"),
    path.join(repoRoot, ".codexforge", "creator-tests"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests"),
  ],
});
const activityCounters = activityTrap.counters;
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
let fixtureAvailabilityCalls = 0;
let fixtureDeliveries = 0;
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  const resolvedFilename = Module._resolveFilename(request, parent, isMain);
  return activityTrap.wrapLoadedModule(
    resolvedFilename,
    originalLoad.apply(this, arguments)
  );
};
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};
function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}
async function expectFailure(operation, code, message) {
  try {
    await operation();
  } catch (error) {
    assert(
      error && error.code === code,
      `${message} (${code}; observed ${error?.code ?? error?.message ?? "unknown"})`
    );
    return error;
  }
  throw new Error(`${message}: expected ${code}`);
}
function buildFixtureAdapter() {
  return {
    identity: {
      providerId: "ollama-local",
      providerLabel: "Local Ollama",
      modelId: "gpt-oss:20b",
      modelLabel: "gpt-oss:20b",
      modelKey: "ollama-local::gpt-oss:20b",
      locality: "local",
      dataBoundary: "local-machine",
      costClass: "local-no-provider-token-charge",
      approvedMaximumOutputTokens: 4096,
    },
    async getAvailability() {
      fixtureAvailabilityCalls += 1;
      throw new Error("D1 must not inspect provider availability");
    },
    async generateApprovedText() {
      fixtureDeliveries += 1;
      throw new Error("D1 must not execute generation");
    },
  };
}
function safePrivateAlphaRoot(storeModule, suffix) {
  const label = storeModule.buildPrivateAlphaTestingDataRootLabel(suffix);
  const base = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
  const target = path.resolve(repoRoot, ...label.split("/"));
  const relative = path.relative(base, target);
  assert(relative && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), "Private Alpha cleanup target is one owned deterministic suffix");
  return target;
}
async function getExactCreatorRun(lifecycle, project, binding) {
  return lifecycle.getRun({
    projectId: project.identity.projectId,
    purpose: binding.purpose,
    runId: binding.sourceRunId,
    ownershipBindingId: binding.ownershipBindingId,
  });
}

async function main() {
  const suffix = "macro-d1-shared-creator-lifecycle";
  const persistenceModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-persistence.server.ts"));
  const filesystemModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-filesystem.server.ts"));
  const cryptoModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-crypto.ts"));
  const policyModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-policy.ts"));
  const adapterModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"));
  const serviceModule = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-service.server.ts"));
  const stateMachine = require(path.join(repoRoot, "src/lib/codexforge/creator/creator-state-machine.ts"));
  const storeModule = require(path.join(repoRoot, "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"));
  const platformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
  assert(platformDescriptor?.configurable === true, "test runtime exposes a reversible process-platform probe boundary");
  Object.defineProperty(process, "platform", { ...platformDescriptor, value: "linux" });
  try {
    await expectFailure(
      () => new filesystemModule.CreatorOwnedFilesystem(".codexforge/creator-tests/macro-d1-platform-probe"),
      "unsafe_creator_root",
      "creator mutation fails closed before filesystem initialization outside Windows"
    );
  } finally {
    Object.defineProperty(process, "platform", platformDescriptor);
  }
  const cleanupPersistence = persistenceModule.createCreatorPersistenceForTesting(suffix);
  const privateAlphaRoot = safePrivateAlphaRoot(storeModule, suffix);
  const productionCreatorRoot = path.join(repoRoot, ".codexforge", "creator");
  const productionCreatorBefore = fs.existsSync(productionCreatorRoot);
  const productionPrivateAlphaRoot = path.join(repoRoot, ".codexforge", "private-alpha");
  const productionPrivateAlphaBefore = fs.existsSync(productionPrivateAlphaRoot)
    ? (await fsp.readdir(productionPrivateAlphaRoot)).sort().join("\n")
    : "absent";
  const outsideEscape = path.join(repoRoot, ".codexforge", `creator-escape-${suffix}`);
  const interruptedRoot = path.resolve(repoRoot, ".codexforge", "creator-tests", suffix);
  const interruptedBackup = path.resolve(repoRoot, ".codexforge", "creator-tests", `${suffix}-trust-backup`);
  const interruptedBackupStat = await fsp.lstat(interruptedBackup).catch((error) => {
    if (error && error.code === "ENOENT") return null;
    throw error;
  });
  if (interruptedBackupStat) {
    assert(interruptedBackupStat.isDirectory() && !interruptedBackupStat.isSymbolicLink(), "interrupted root-swap backup remains an owned directory");
    const interruptedRootStat = await fsp.lstat(interruptedRoot).catch((error) => {
      if (error && error.code === "ENOENT") return null;
      throw error;
    });
    if (interruptedRootStat) {
      assert(interruptedRootStat.isSymbolicLink(), "interrupted root-swap recovery refuses to replace a non-link creator root");
      await fsp.unlink(interruptedRoot);
    }
    await fsp.rename(interruptedBackup, interruptedRoot);
  }
  await cleanupPersistence.cleanupTestRoot().catch(() => undefined);
  await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
  await fsp.rm(outsideEscape, { recursive: true, force: true });
  const persistence = persistenceModule.createCreatorPersistenceForTesting(suffix);
  const helperUnavailableFilesystem = new filesystemModule.CreatorOwnedFilesystem(
    ".codexforge/creator-tests/macro-d1-shared-creator-lifecycle"
  );
  helperUnavailableFilesystem.nativeRoot = {
    ensureDirectory() {
      const error = new Error("test-owned unavailable native transaction capability");
      error.code = "helper_unavailable";
      throw error;
    },
  };
  const helperUnavailableError = await expectFailure(
    () => helperUnavailableFilesystem.ensureDirectory(["unavailable-probe"]),
    "unsafe_creator_root",
    "native transaction capability failure disables creator mutation at the public filesystem boundary"
  );
  assert(
    helperUnavailableError.message.includes("native helper") &&
      helperUnavailableError.message.includes("NTFS") &&
      helperUnavailableError.message.includes("transaction support"),
    "native capability refusal is honest, bounded, and actionable"
  );
  const renameConflictFilesystem = new filesystemModule.CreatorOwnedFilesystem(
    ".codexforge/creator-tests/macro-d1-shared-creator-lifecycle"
  );
  renameConflictFilesystem.nativeRoot = {
    renameExclusive() {
      const error = new Error("test-owned native transaction conflict");
      error.code = "conflict";
      throw error;
    },
  };
  await expectFailure(
    () => renameConflictFilesystem.renameDirectoryExclusive(["locks", "claim"], ["locks", "target"]),
    "already_exists",
    "native rename transaction conflict is classified as safe concurrent target ownership"
  );

  const absentReadSuffix = "macro-d1-absent-read";
  const absentReadCleanupPersistence = persistenceModule.createCreatorPersistenceForTesting(absentReadSuffix);
  await absentReadCleanupPersistence.cleanupTestRoot().catch(() => undefined);
  const absentReadPersistence = persistenceModule.createCreatorPersistenceForTesting(absentReadSuffix);
  const absentReadRoot = path.resolve(repoRoot, ".codexforge", "creator-tests", absentReadSuffix);
  assert((await absentReadPersistence.readProjectIfPresent("ffffffffffffffffffffffff")) === null, "missing creator project read returns absent without initializing storage");
  assert((await absentReadPersistence.listProjects()).length === 0 && !fs.existsSync(absentReadRoot), "read-only creator listing does not create an absent deterministic root");

  try {
    const missingAdapterSuffix = "macro-d1-missing-transport-trap";
    const missingAdapterRoot = safePrivateAlphaRoot(storeModule, missingAdapterSuffix);
    let missingAdapterRejected = false;
    try {
      adapterModule.createCreatorGenerationLifecycleAdapterForTesting(missingAdapterSuffix, undefined);
    } catch (_) {
      missingAdapterRejected = true;
    }
    assert(missingAdapterRejected && !fs.existsSync(missingAdapterRoot), "deterministic lifecycle rejects a missing adapter before any real provider fallback can be constructed");

    const lifecycle = adapterModule.createCreatorGenerationLifecycleAdapterForTesting(suffix, buildFixtureAdapter());
    const service = serviceModule.createCreatorService({ persistence, lifecycle });

    let remainingPlanPublicationFailures = 2;
    const planFailurePersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          remainingPlanPublicationFailures > 0 &&
          project.stateRevision === 2 &&
          project.status === "draft" &&
          project.plan !== null
        ) {
          remainingPlanPublicationFailures -= 1;
          throw new Error("Injected deterministic plan publication failure.");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const planFailureService = serviceModule.createCreatorService({
      persistence: planFailurePersistence,
      lifecycle,
    });
    const planlessTitle = "D1 Planless Draft Recovery Site";
    let planFailureObserved = false;
    try {
      await planFailureService.createProject({
        creatorKind: "website-browser-app",
        projectTitle: planlessTitle,
        description: "Exercise exact cancellation recovery after deterministic plan persistence failure.",
      }, "macro-d1-planless-create");
    } catch (_) {
      planFailureObserved = true;
    }
    const planlessDraft = (await persistence.listProjects()).find(
      (project) => project.identity.projectTitle === planlessTitle
    );
    assert(
      planFailureObserved &&
        planlessDraft?.status === "draft" &&
        planlessDraft.stateRevision === 1 &&
        planlessDraft.plan === null &&
        planlessDraft.runBindings.length === 0,
      "plan publication failure preserves one legitimate planless initial draft without binding a lifecycle run"
    );
    const planlessCanceled = (await service.actOnProject(
      planlessDraft.identity.projectId,
      { action: "cancel", expectedRevision: planlessDraft.stateRevision },
      "macro-d1-planless-cancel"
    )).project;
    assert(
      planlessCanceled.status === "canceled" &&
        planlessCanceled.stateRevision === 3 &&
        planlessCanceled.plan === null &&
        planlessCanceled.runBindings.length === 0 &&
        JSON.stringify(planlessCanceled.auditEvents.map((event) => event.eventType)) ===
          JSON.stringify(["request.created", "cancellation.requested", "creator.canceled"]) &&
        planlessCanceled.idempotencyRecords.length === 1 &&
        planlessCanceled.idempotencyRecords[0].mutationKind === "cancel",
      "the exact planless draft remains explicitly cancelable with bounded audit and idempotency evidence"
    );

    let competingPlanPublicationFailures = 2;
    let competingCancellationPublicationFailures = 4;
    const competingIntentTitle = "D1 Competing Draft Intent Site";
    const competingIntentCreateKey = "macro-d1-competing-draft-create";
    const competingIntentInput = {
      creatorKind: "website-browser-app",
      projectTitle: competingIntentTitle,
      description: "Prove cancellation and recovery ownership fence an interrupted draft continuation.",
    };
    const competingIntentPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          project.identity.projectTitle === competingIntentTitle &&
          project.status === "draft" &&
          project.plan !== null &&
          competingPlanPublicationFailures > 0
        ) {
          competingPlanPublicationFailures -= 1;
          throw new Error("Injected competing-intent plan publication failure.");
        }
        if (
          project.identity.projectTitle === competingIntentTitle &&
          project.status === "canceled" &&
          competingCancellationPublicationFailures > 0
        ) {
          competingCancellationPublicationFailures -= 1;
          throw new Error("Injected competing-intent cancellation publication failure.");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const competingIntentService = serviceModule.createCreatorService({
      persistence: competingIntentPersistence,
      lifecycle,
    });
    await expectFailure(
      () => competingIntentService.createProject(
        competingIntentInput,
        competingIntentCreateKey
      ),
      "internal_failure",
      "interrupted draft setup fails after preserving only its initial request"
    );
    const competingIntentProjectId = cryptoModule
      .hashCreatorSha256(`creator-project:${competingIntentCreateKey}`)
      .slice(0, 24);
    let competingIntentDraft = await persistence.readProject(competingIntentProjectId);
    await expectFailure(
      () => competingIntentService.actOnProject(
        competingIntentProjectId,
        { action: "cancel", expectedRevision: competingIntentDraft.stateRevision },
        "macro-d1-competing-draft-cancel"
      ),
      "internal_failure",
      "interrupted cancellation preserves its exact durable ownership intent"
    );
    competingIntentDraft = await persistence.readProject(competingIntentProjectId);
    const pendingCancellation = competingIntentDraft.auditEvents.at(-1);
    assert(
      competingIntentDraft.status === "draft" &&
        competingIntentDraft.plan === null &&
        competingIntentDraft.runBindings.length === 0 &&
        pendingCancellation?.eventType === "cancellation.requested" &&
        pendingCancellation.sourceRunId === null,
      "planless draft cancellation intent has canonical no-source provenance before any latent run exists"
    );
    await expectFailure(
      () => competingIntentService.createProject(
        competingIntentInput,
        competingIntentCreateKey
      ),
      "idempotency_conflict",
      "pending cancellation ownership blocks same-key draft plan and run continuation"
    );
    let competingRecoveryExpectedRevision = competingIntentDraft.stateRevision;
    await expectFailure(
      () => competingIntentService.actOnProject(
        competingIntentProjectId,
        { action: "recover", expectedRevision: competingRecoveryExpectedRevision },
        "macro-d1-competing-draft-recover"
      ),
      "internal_failure",
      "interrupted explicit recovery preserves its own durable lifecycle ownership"
    );
    competingIntentDraft = await persistence.readProject(competingIntentProjectId);
    assert(
      competingIntentDraft.status === "draft" &&
        competingIntentDraft.auditEvents.at(-1)?.eventType === "recovery.requested" &&
        competingIntentDraft.auditEvents.at(-1)?.sourceRunId === null,
      "pending recovery remains bound to the canonical no-source cancellation intent"
    );
    await expectFailure(
      () => competingIntentService.createProject(
        competingIntentInput,
        competingIntentCreateKey
      ),
      "idempotency_conflict",
      "pending recovery ownership blocks same-key draft plan and run continuation"
    );
    const competingIntentRecovered = await competingIntentService.actOnProject(
      competingIntentProjectId,
      { action: "recover", expectedRevision: competingRecoveryExpectedRevision },
      "macro-d1-competing-draft-recover"
    );
    assert(
      competingIntentRecovered.project.status === "canceled" &&
        competingIntentRecovered.project.plan === null &&
        competingIntentRecovered.project.runBindings.length === 0 &&
        competingIntentRecovered.project.auditEvents
          .filter((event) => event.eventType === "recovery.requested").length === 1 &&
        competingIntentRecovered.project.auditEvents
          .filter((event) => event.eventType === "recovery.completed").length === 1,
      "same recovery key deterministically completes cancellation without advancing the draft or binding a run"
    );
    const competingIntentReplay = await competingIntentService.actOnProject(
      competingIntentProjectId,
      { action: "recover", expectedRevision: competingRecoveryExpectedRevision },
      "macro-d1-competing-draft-recover"
    );
    assert(
      competingIntentReplay.replayed &&
        competingIntentReplay.project.stateRevision === competingIntentRecovered.project.stateRevision,
      "completed draft recovery replays without a second cancellation or lifecycle mutation"
    );

    const rollbackCreateKey = "macro-d1-clock-rollback-create";
    const rollbackInitialClock = [
      "2099-01-01T00:00:10.000Z",
      "2000-01-01T00:00:00.000Z",
      "1999-01-01T00:00:00.000Z",
      "1998-01-01T00:00:00.000Z",
      "1997-01-01T00:00:00.000Z",
    ];
    const rollbackNoRunLifecycle = {
      ...lifecycle,
      async bindRun() {
        throw new Error("Clock rollback fixture intentionally leaves the planned draft unbound.");
      },
      async recoverBoundRun() {
        return null;
      },
    };
    const rollbackCreateService = serviceModule.createCreatorService({
      persistence,
      lifecycle: rollbackNoRunLifecycle,
      now: () => rollbackInitialClock.shift() ?? "1990-01-01T00:00:00.000Z",
    });
    const rollbackInput = {
        creatorKind: "website-browser-app",
        projectTitle: "D1 Clock Rollback Site",
        description: "Prove persisted creator time never decreases when the wall clock rolls back.",
    };
    await expectFailure(
      () => rollbackCreateService.createProject(rollbackInput, rollbackCreateKey),
      "run_binding_failed",
      "clock rollback fixture preserves its exact planned draft without a source run"
    );
    const rollbackProjectId = cryptoModule
      .hashCreatorSha256(`creator-project:${rollbackCreateKey}`)
      .slice(0, 24);
    let rollbackProject = await persistence.readProject(rollbackProjectId);
    assert(
      rollbackProject.createdAt === "2099-01-01T00:00:10.000Z" &&
        rollbackProject.updatedAt === rollbackProject.createdAt &&
        rollbackProject.plan?.preparedAt === rollbackProject.createdAt &&
        rollbackProject.runBindings.length === 0 &&
        rollbackProject.approvalPacket === null &&
        rollbackProject.auditEvents.every((event) => event.occurredAt === rollbackProject.createdAt) &&
        rollbackProject.idempotencyRecords.every((record) => record.recordedAt === rollbackProject.createdAt),
      "in-process wall-clock rollback cannot decrease request, plan, audit, or idempotency timestamps"
    );
    const rollbackRestartService = serviceModule.createCreatorService({
      persistence,
      lifecycle: rollbackNoRunLifecycle,
      now: () => "1980-01-01T00:00:00.000Z",
    });
    rollbackProject = (await rollbackRestartService.actOnProject(
      rollbackProject.identity.projectId,
      { action: "cancel", expectedRevision: rollbackProject.stateRevision },
      "macro-d1-clock-rollback-cancel"
    )).project;
    assert(
      rollbackProject.status === "canceled" &&
        rollbackProject.updatedAt === rollbackProject.createdAt &&
        rollbackProject.auditEvents.every(
          (event, index, events) => index === 0 || event.occurredAt >= events[index - 1].occurredAt
        ) &&
        rollbackProject.idempotencyRecords.every(
          (record, index, records) => index === 0 || record.recordedAt >= records[index - 1].recordedAt
        ),
      "creator timestamps remain valid and nondecreasing across service restart under wall-clock rollback"
    );

    let remainingBoundStatePublicationFailures = 2;
    const latentBindPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          remainingBoundStatePublicationFailures > 0 &&
          project.status === "awaiting_generation_approval" &&
          project.identity.projectTitle === "D1 Latent Bind Cancellation Site"
        ) {
          remainingBoundStatePublicationFailures -= 1;
          throw new Error("Injected deterministic bound-state publication failure.");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const latentBindService = serviceModule.createCreatorService({
      persistence: latentBindPersistence,
      lifecycle,
    });
    await expectFailure(
      () => latentBindService.createProject({
        creatorKind: "website-browser-app",
        projectTitle: "D1 Latent Bind Cancellation Site",
        description: "Exercise exact source-run reconciliation after both bounded creator publications fail.",
      }, "macro-d1-latent-bind-create"),
      "internal_failure",
      "both failed bound-state publications expose one bounded creator failure"
    );
    const latentBindDraft = (await persistence.listProjects()).find(
      (project) => project.identity.projectTitle === "D1 Latent Bind Cancellation Site"
    );
    assert(
      latentBindDraft?.status === "draft" &&
        latentBindDraft.plan !== null &&
        latentBindDraft.runBindings.length === 0,
      "lost creator bind publication preserves the exact durable plan without false run evidence"
    );
    const latentBindCanceled = (await service.actOnProject(
      latentBindDraft.identity.projectId,
      { action: "cancel", expectedRevision: latentBindDraft.stateRevision },
      "macro-d1-latent-bind-cancel"
    )).project;
    const latentBindRun = await getExactCreatorRun(lifecycle, latentBindCanceled, latentBindCanceled.runBindings[0]);
    assert(
      latentBindCanceled.status === "canceled" &&
        latentBindCanceled.runBindings.length === 1 &&
        latentBindCanceled.approvalPacket.status === "canceled" &&
        latentBindCanceled.runBindings[0].sourceRunRevision === latentBindRun.revision &&
        latentBindRun.state === "canceled" &&
        JSON.stringify(latentBindCanceled.auditEvents.map((event) => event.eventType).slice(-2)) ===
          JSON.stringify(["run.bound", "creator.canceled"]),
      "explicit cancellation atomically reconciles and cancels one latent initial source run without execution"
    );
    const latentBindCancelReplay = await service.actOnProject(
      latentBindDraft.identity.projectId,
      { action: "cancel", expectedRevision: latentBindDraft.stateRevision },
      "macro-d1-latent-bind-cancel"
    );
    assert(
      latentBindCancelReplay.replayed &&
        latentBindCancelReplay.project.stateRevision === latentBindCanceled.stateRevision,
      "latent-bind cancellation replay creates no second run or creator revision"
    );

    const statuses = [
      "draft",
      "awaiting_generation_approval",
      "approved",
      "generating",
      "validating",
      "rejected_output",
      "ready",
      "preview_available",
      "repair_requested",
      "awaiting_repair_approval",
      "repair_approved",
      "repairing",
      "failed",
      "canceled",
      "exported",
    ];
    const expectedTransitions = {
      draft: ["awaiting_generation_approval", "failed", "canceled"],
      awaiting_generation_approval: ["approved", "failed", "canceled"],
      approved: ["generating", "failed", "canceled"],
      generating: ["validating", "rejected_output", "failed"],
      validating: ["rejected_output", "ready", "failed"],
      rejected_output: ["repair_requested", "canceled"],
      ready: ["preview_available", "repair_requested", "exported", "canceled"],
      preview_available: ["ready", "canceled"],
      repair_requested: ["awaiting_repair_approval", "failed", "canceled"],
      awaiting_repair_approval: ["repair_approved", "failed", "canceled"],
      repair_approved: ["repairing", "failed", "canceled"],
      repairing: ["validating", "failed"],
      failed: ["canceled", "exported"],
      canceled: [],
      exported: [],
    };
    assert(
      JSON.stringify(Object.keys(stateMachine.CREATOR_TRANSITION_TABLE)) === JSON.stringify(statuses),
      "state machine exposes the exact complete CreatorProjectStatus inventory"
    );
    let transitionPairsChecked = 0;
    for (const previousState of statuses) {
      assert(
        JSON.stringify(stateMachine.CREATOR_TRANSITION_TABLE[previousState]) ===
          JSON.stringify(expectedTransitions[previousState]),
        `transition table is exact for ${previousState}`
      );
      for (const requestedState of statuses) {
        const expected = expectedTransitions[previousState].includes(requestedState);
        const observed = stateMachine.canTransitionCreatorProject(previousState, requestedState);
        if (observed !== expected) {
          throw new Error(`transition predicate mismatch for ${previousState} -> ${requestedState}`);
        }
        let rejection = null;
        try {
          stateMachine.assertCreatorTransition(previousState, requestedState);
        } catch (error) {
          rejection = error;
        }
        if (expected && rejection !== null) {
          throw new Error(`legal transition rejected for ${previousState} -> ${requestedState}`);
        }
        if (
          !expected &&
          !(
            rejection instanceof stateMachine.CreatorTransitionError &&
            rejection.previousState === previousState &&
            rejection.requestedState === requestedState
          )
        ) {
          throw new Error(`illegal transition did not fail closed for ${previousState} -> ${requestedState}`);
        }
        transitionPairsChecked += 1;
      }
    }
    assert(transitionPairsChecked === statuses.length * statuses.length, "all 225 CreatorProjectStatus pairs exercise both transition APIs against the exact matrix");

    const input = {
      creatorKind: "website-browser-app",
      projectTitle: "D1 Lifecycle Site",
      description: "Create an accessible one-page static project status site with no remote resources.",
    };
    let terminalBindCalls = 0;
    const terminalBindLifecycle = {
      ...lifecycle,
      async bindRun(bindInput) {
        terminalBindCalls += 1;
        const run = await lifecycle.bindRun(bindInput);
        return {
          ...run,
          state: "succeeded",
          revision: 77,
          updatedAt: new Date(Date.parse(run.updatedAt) + 1).toISOString(),
        };
      },
    };
    const terminalBindService = serviceModule.createCreatorService({
      persistence,
      lifecycle: terminalBindLifecycle,
    });
    const terminalBindResult = await terminalBindService.createProject(
      { ...input, projectTitle: "D1 Terminal Bind Substitution Site" },
      "macro-d1-terminal-bind-substitution"
    );
    assert(
      terminalBindResult.project.status === "awaiting_generation_approval" &&
        terminalBindResult.project.failureCode === null &&
        terminalBindResult.project.runBindings.length === 1 &&
        terminalBindResult.project.runBindings[0].sourceRunRevision === 1 &&
        terminalBindResult.project.approvalPacket.privateAlphaRunId ===
          terminalBindResult.project.runBindings[0].sourceRunId &&
        terminalBindCalls === 1,
      "a substituted bind response is discarded and the one exact initial lifecycle run is reconciled without a second run"
    );
    const createKey = "macro-d1-create-0001";
    const created = await service.createProject(input, createKey);
    assert(created.created && created.project.status === "awaiting_generation_approval", "create prepares a plan and binds one awaiting-approval run");
    assert(created.project.stateRevision === 3, "create persists monotonic request, plan, and run-bound revisions");
    assert(created.project.plan.modelEnvelope.modelKey === "ollama-local::gpt-oss:20b" && created.project.plan.modelEnvelope.maximumOutputTokens === 4096, "plan exposes the exact local model envelope");
    assert(created.project.plan.destinationBoundary.includes(created.project.identity.projectId) && !path.isAbsolute(created.project.plan.destinationBoundary), "plan exposes an exact relative creator-owned destination");
    assert(JSON.stringify(created.project.auditEvents.map((event) => event.eventType)) === JSON.stringify(["request.created", "plan.prepared", "run.bound"]), "create audit order is exact");
    assert(fixtureAvailabilityCalls === 0 && fixtureDeliveries === 0, "planning performs zero availability and fixture generation calls");
    const contradictoryApprovalLifecycle = {
      ...lifecycle,
      async approveRun(approvalInput) {
        const approvedRun = await lifecycle.approveRun(approvalInput);
        return {
          ...approvedRun,
          cancellation: {
            cancellationId: "contradictory-cancellation",
            canceledAt: approvedRun.updatedAt,
            actor: "local-operator",
            reason: "Contradictory deterministic approval response.",
            previousRevision: approvedRun.revision,
            resultingRevision: approvedRun.revision + 1,
          },
        };
      },
    };
    const contradictoryApprovalService = serviceModule.createCreatorService({
      persistence,
      lifecycle: contradictoryApprovalLifecycle,
    });
    let contradictoryApprovalProject = (await contradictoryApprovalService.createProject(
      { ...input, projectTitle: "D1 Contradictory Approval Response Site" },
      "macro-d1-contradictory-approval-create"
    )).project;
    contradictoryApprovalProject = (await contradictoryApprovalService.actOnProject(
        contradictoryApprovalProject.identity.projectId,
        { action: "approve-generation", expectedRevision: contradictoryApprovalProject.stateRevision },
        "macro-d1-contradictory-approval-action"
      )).project;
    assert(
      contradictoryApprovalProject.status === "approved" &&
        contradictoryApprovalProject.approvalPacket.status === "approved" &&
        contradictoryApprovalProject.idempotencyRecords.at(-1).mutationKind === "approve-generation" &&
        contradictoryApprovalProject.runBindings.at(-1).sourceRunRevision === 2 &&
        fixtureDeliveries === 0,
      "a contradictory approval response is discarded in favor of the exact persisted approved run without execution"
    );
    contradictoryApprovalProject = await persistence.readProject(
      contradictoryApprovalProject.identity.projectId
    );
    const contradictoryApprovalSnapshot = JSON.stringify(contradictoryApprovalProject);
    contradictoryApprovalProject = await service.getProject(contradictoryApprovalProject.identity.projectId);
    assert(
      JSON.stringify(contradictoryApprovalProject) === contradictoryApprovalSnapshot,
      "read-only reload does not reconcile or otherwise mutate an already completed approval"
    );

    let remainingApprovedStatePublicationFailures = 2;
    const latentApprovalPersistence = {
      ...persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          remainingApprovedStatePublicationFailures > 0 &&
          project.status === "approved" &&
          project.identity.projectTitle === "D1 Latent Approval Cancellation Site"
        ) {
          remainingApprovedStatePublicationFailures -= 1;
          throw new Error("Injected deterministic approved-state publication failure.");
        }
        return persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const latentApprovalService = serviceModule.createCreatorService({
      persistence: latentApprovalPersistence,
      lifecycle,
    });
    const latentApprovalAwaiting = (await latentApprovalService.createProject(
      { ...input, projectTitle: "D1 Latent Approval Cancellation Site" },
      "macro-d1-latent-approval-create"
    )).project;
    await expectFailure(
      () => latentApprovalService.actOnProject(
        latentApprovalAwaiting.identity.projectId,
        { action: "approve-generation", expectedRevision: latentApprovalAwaiting.stateRevision },
        "macro-d1-latent-approval-action"
      ),
      "internal_failure",
      "both failed approved-state publications expose one bounded creator failure"
    );
    const latentApprovalDurable = await persistence.readProject(latentApprovalAwaiting.identity.projectId);
    assert(
      latentApprovalDurable.status === "awaiting_generation_approval" &&
        latentApprovalDurable.approvalPacket.status === "awaiting",
      "lost creator approval publication preserves the exact durable awaiting packet"
    );
    const latentApprovalReadOnly = await service.getProject(
      latentApprovalDurable.identity.projectId
    );
    assert(
      JSON.stringify(latentApprovalReadOnly) === JSON.stringify(latentApprovalDurable),
      "GET leaves an interrupted approval byte-for-byte unchanged and performs no implicit lifecycle mutation"
    );
    const latentApprovalReconciled = (await service.actOnProject(
      latentApprovalDurable.identity.projectId,
      { action: "recover", expectedRevision: latentApprovalDurable.stateRevision },
      "macro-d1-latent-approval-explicit-recover"
    )).project;
    assert(
      latentApprovalReconciled.status === "approved" &&
        latentApprovalReconciled.approvalPacket.status === "approved" &&
        latentApprovalReconciled.idempotencyRecords.at(-2).mutationKind === "approve-generation" &&
        latentApprovalReconciled.idempotencyRecords.at(-1).mutationKind === "recover" &&
        fixtureDeliveries === 0,
      "separate explicit recovery finalizes the exact original approval intent without execution"
    );
    await expectFailure(
      () => service.actOnProject(
        latentApprovalDurable.identity.projectId,
        { action: "cancel", expectedRevision: latentApprovalDurable.stateRevision },
        "macro-d1-latent-approval-stale-cancel"
      ),
      "revision_conflict",
      "stale alternate cancellation cannot take over the reconciled approval revision"
    );
    const latentApprovalCanceled = (await service.actOnProject(
      latentApprovalDurable.identity.projectId,
      { action: "cancel", expectedRevision: latentApprovalReconciled.stateRevision },
      "macro-d1-latent-approval-cancel"
    )).project;
    const latentApprovalBinding = latentApprovalCanceled.runBindings.find(
      (binding) => binding.sourceRunId === latentApprovalCanceled.approvalPacket.privateAlphaRunId
    );
    const latentApprovalRun = await getExactCreatorRun(lifecycle, latentApprovalCanceled, latentApprovalBinding);
    assert(
      latentApprovalCanceled.status === "canceled" &&
        latentApprovalCanceled.approvalPacket.status === "canceled" &&
        latentApprovalCanceled.approvalPacket.approvedAt === latentApprovalRun.approval.approvedAt &&
        latentApprovalCanceled.approvalPacket.privateAlphaRunRevision === latentApprovalRun.revision &&
        latentApprovalCanceled.runBindings.at(-1).sourceRunRevision === latentApprovalRun.revision &&
        JSON.stringify(latentApprovalCanceled.auditEvents.map((event) => event.eventType).slice(-2)) ===
          JSON.stringify(["cancellation.requested", "creator.canceled"]),
      "separate explicit cancellation records its own intent after approval reconciliation and preserves exact terminal provenance"
    );
    const latentApprovalCancelReplay = await service.actOnProject(
      latentApprovalDurable.identity.projectId,
      { action: "cancel", expectedRevision: latentApprovalReconciled.stateRevision },
      "macro-d1-latent-approval-cancel"
    );
    assert(latentApprovalCancelReplay.replayed, "latent-approval cancellation replay creates no additional lifecycle mutation");
    const illegalTransitionAt = new Date(Date.parse(created.project.updatedAt) + 1).toISOString();

    function successorEvent(project, updatedAt, overrides = {}) {
      return {
        eventId: overrides.eventId || cryptoModule.hashCreatorSha256(`d1-successor:${project.identity.projectId}:${updatedAt}:${overrides.summary || "semantic"}`).slice(0, 24),
        eventType: "validation.completed",
        occurredAt: updatedAt,
        actor: "system",
        previousState: project.status,
        resultingState: project.status,
        stateRevision: project.stateRevision + 1,
        sourceRunId: project.runBindings.at(-1)?.sourceRunId ?? null,
        artifactRevision: null,
        idempotencyKeyHash: "f".repeat(64),
        mutationDigest: project.request.requestDigest,
        summary: overrides.summary || "Deterministic semantic persistence evidence.",
        ...overrides,
      };
    }
    async function expectSemanticSuccessorRejected(project, updates, label) {
      const updatedAt = new Date(Date.parse(project.updatedAt) + 1).toISOString();
      await expectFailure(
        () => persistence.writeNextProject({
          ...project,
          ...updates,
          stateRevision: project.stateRevision + 1,
          updatedAt,
          auditEvents: [...project.auditEvents, successorEvent(project, updatedAt)],
        }, project.stateRevision),
        "record_corrupt",
        label
      );
    }
    await expectSemanticSuccessorRejected(
      created.project,
      { approvalPacket: { ...created.project.approvalPacket, status: "approved", approvedAt: null } },
      "persistence rejects an approved packet without exact approval time evidence"
    );
    await expectSemanticSuccessorRejected(
      created.project,
      { approvalPacket: { ...created.project.approvalPacket, approvedAt: illegalTransitionAt } },
      "persistence rejects an awaiting packet carrying contradictory approval time evidence"
    );
    await expectSemanticSuccessorRejected(
      created.project,
      {
        preview: {
          status: "inactive",
          previewId: "8".repeat(32),
          artifactRevision: null,
          startedAt: illegalTransitionAt,
          stoppedAt: illegalTransitionAt,
        },
      },
      "persistence rejects inactive preview state carrying live or stopped session evidence"
    );
    await expectSemanticSuccessorRejected(
      created.project,
      { preview: { status: "stopped", previewId: null, artifactRevision: null, startedAt: null, stoppedAt: null } },
      "persistence rejects stopped preview state without its exact session evidence"
    );
    await expectSemanticSuccessorRejected(
      created.project,
      { failureCode: "internal_failure", failureMessage: null },
      "persistence rejects a failure code without its bounded failure message"
    );
    await expectSemanticSuccessorRejected(
      created.project,
      { failureCode: null, failureMessage: "Contradictory failure message." },
      "persistence rejects a failure message without its bounded failure code"
    );
    await expectFailure(
      () => persistence.writeNextProject({
        ...created.project,
        stateRevision: created.project.stateRevision + 1,
        status: "approved",
        updatedAt: illegalTransitionAt,
        auditEvents: [
          ...created.project.auditEvents,
          successorEvent(created.project, illegalTransitionAt, {
            eventId: "7".repeat(24),
            previousState: "awaiting_generation_approval",
            resultingState: "approved",
            summary: "Contradictory approved phase with awaiting packet.",
          }),
        ],
      }, created.project.stateRevision),
      "record_corrupt",
      "persistence rejects an approved project phase that still carries an awaiting packet"
    );

    const illegalTransitionEvent = {
      eventId: "9".repeat(24),
      eventType: "plan.prepared",
      occurredAt: illegalTransitionAt,
      actor: "system",
      previousState: "awaiting_generation_approval",
      resultingState: "exported",
      stateRevision: created.project.stateRevision + 1,
      sourceRunId: created.project.runBindings[0].sourceRunId,
      artifactRevision: null,
      idempotencyKeyHash: null,
      mutationDigest: null,
      summary: "Deterministic illegal transition evidence.",
    };
    await expectFailure(
      () => persistence.writeNextProject({
        ...created.project,
        stateRevision: created.project.stateRevision + 1,
        status: "exported",
        updatedAt: illegalTransitionAt,
        auditEvents: [...created.project.auditEvents, illegalTransitionEvent],
      }, created.project.stateRevision),
      "record_corrupt",
      "persistence rejects a schema-valid successor that skips the fail-closed transition table"
    );
    const createdRevisionTwo = await persistence.readProjectRevision(created.project.identity.projectId, 2);
    const createdLatestPath = await persistence.filesystem.resolve([
      "projects", created.project.identity.projectId, "state-revisions", "000003.json",
    ]);
    const createdLatestBytes = await fsp.readFile(createdLatestPath);
    const illegalReadEvent = {
      ...illegalTransitionEvent,
      previousState: createdRevisionTwo.status,
      stateRevision: 3,
    };
    const illegalReadProject = {
      ...createdRevisionTwo,
      stateRevision: 3,
      status: "exported",
      updatedAt: illegalTransitionAt,
      auditEvents: [...createdRevisionTwo.auditEvents, illegalReadEvent],
    };
    await fsp.writeFile(
      createdLatestPath,
      `${cryptoModule.serializeCreatorCanonicalJson({
        checksum: cryptoModule.hashCreatorCanonicalJson(illegalReadProject),
        project: illegalReadProject,
      })}\n`,
      { flag: "w" }
    );
    try {
      await expectFailure(
        () => persistence.readProject(created.project.identity.projectId),
        "record_corrupt",
        "read-time chain validation rejects a self-checksummed illegal latest-state jump"
      );
    } finally {
      await fsp.writeFile(createdLatestPath, createdLatestBytes, { flag: "w" });
    }
    const createdLatestEnvelope = JSON.parse(createdLatestBytes.toString("utf8"));
    const falseOutputEventProject = {
      ...createdLatestEnvelope.project,
      auditEvents: [
        ...createdLatestEnvelope.project.auditEvents,
        {
          ...createdLatestEnvelope.project.auditEvents.at(-1),
          eventId: "5".repeat(24),
          eventType: "output.received",
          summary: "Contradictory extra output event without output evidence.",
        },
      ],
    };
    await fsp.writeFile(
      createdLatestPath,
      `${cryptoModule.serializeCreatorCanonicalJson({ checksum: cryptoModule.hashCreatorCanonicalJson(falseOutputEventProject), project: falseOutputEventProject })}\n`,
      { flag: "w" }
    );
    try {
      await expectFailure(
        () => persistence.readProject(created.project.identity.projectId),
        "record_corrupt",
        "read-time continuity rejects a self-checksummed semantically false extra output audit event"
      );
    } finally {
      await fsp.writeFile(createdLatestPath, createdLatestBytes, { flag: "w" });
    }
    const jumpedInitialBindingProject = {
      ...createdLatestEnvelope.project,
      runBindings: createdLatestEnvelope.project.runBindings.map((binding) => ({
        ...binding,
        sourceRunRevision: binding.sourceRunRevision + 4,
      })),
    };
    await fsp.writeFile(
      createdLatestPath,
      `${cryptoModule.serializeCreatorCanonicalJson({ checksum: cryptoModule.hashCreatorCanonicalJson(jumpedInitialBindingProject), project: jumpedInitialBindingProject })}\n`,
      { flag: "w" }
    );
    try {
      await expectFailure(
        () => persistence.readProject(created.project.identity.projectId),
        "record_corrupt",
        "read-time continuity rejects a self-checksummed new binding with a non-initial source-run revision"
      );
    } finally {
      await fsp.writeFile(createdLatestPath, createdLatestBytes, { flag: "w" });
    }
    async function expectSelfChecksummedLatestRejected(tamperedProject, label) {
      await fsp.writeFile(
        createdLatestPath,
        `${cryptoModule.serializeCreatorCanonicalJson({ checksum: cryptoModule.hashCreatorCanonicalJson(tamperedProject), project: tamperedProject })}\n`,
        { flag: "w" }
      );
      try {
        await expectFailure(
          () => persistence.readProject(created.project.identity.projectId),
          "record_corrupt",
          label
        );
      } finally {
        await fsp.writeFile(createdLatestPath, createdLatestBytes, { flag: "w" });
      }
    }
    await expectSelfChecksummedLatestRejected({
      ...createdLatestEnvelope.project,
      runBindings: createdLatestEnvelope.project.runBindings.map((binding) => ({
        ...binding,
        requestEnvelopeDigest: "0".repeat(64),
      })),
    }, "read-time provenance rejects a self-checksummed generation binding with a forged instruction digest");
    await expectSelfChecksummedLatestRejected({
      ...createdLatestEnvelope.project,
      auditEvents: createdLatestEnvelope.project.auditEvents.map((event) =>
        event.eventType === "run.bound"
          ? { ...event, actor: "local-operator" }
          : event
      ),
    }, "read-time provenance rejects a self-checksummed run-bound event with a forged actor");
    await expectSelfChecksummedLatestRejected({
      ...createdLatestEnvelope.project,
      auditEvents: createdLatestEnvelope.project.auditEvents.map((event) =>
        event.eventType === "run.bound"
          ? { ...event, artifactRevision: 1 }
          : event
      ),
    }, "read-time provenance rejects a self-checksummed run-bound event with a false artifact revision");

    const replay = await service.createProject(input, createKey);
    assert(!replay.created && replay.project.identity.projectId === created.project.identity.projectId && replay.project.stateRevision === created.project.stateRevision, "duplicate create idempotency replays without a new revision");
    await expectFailure(
      () => service.createProject({ ...input, description: "A conflicting request." }, createKey),
      "idempotency_conflict",
      "conflicting create idempotency fails closed"
    );

    const approved = await service.actOnProject(
      created.project.identity.projectId,
      { action: "approve-generation", expectedRevision: created.project.stateRevision },
      "macro-d1-approve-0001"
    );
    assert(approved.project.status === "approved" && approved.project.approvalPacket.status === "approved", "approval records the exact creator and Private Alpha scope");
    assert(!approved.project.runBindings[0].executionAttempted, "approval never executes generation");
    const orphanBindingAt = new Date(Date.parse(approved.project.updatedAt) + 1).toISOString();
    await expectFailure(
      () => persistence.writeNextProject({
        ...approved.project,
        stateRevision: approved.project.stateRevision + 1,
        updatedAt: orphanBindingAt,
        runBindings: approved.project.runBindings.map((binding) => ({
          ...binding,
          executionRequestedAt: orphanBindingAt,
          outputReceivedAt: orphanBindingAt,
          executionAttempted: true,
        })),
        artifactProposalBinding: {
          purpose: "generation",
          sourceRunId: approved.project.runBindings[0].sourceRunId,
        },
        validation: null,
        auditEvents: [
          ...approved.project.auditEvents,
          successorEvent(approved.project, orphanBindingAt, {
            eventId: "6".repeat(24),
            summary: "Contradictory output binding without validation.",
          }),
        ],
      }, approved.project.stateRevision),
      "record_corrupt",
      "persistence rejects an output proposal binding without exact validation evidence"
    );
    const approvalReplay = await service.actOnProject(
      created.project.identity.projectId,
      { action: "approve-generation", expectedRevision: created.project.stateRevision },
      "macro-d1-approve-0001"
    );
    assert(approvalReplay.replayed && approvalReplay.project.stateRevision === approved.project.stateRevision, "duplicate approval idempotency replays exactly");
    await expectFailure(
      () => service.actOnProject(
        approved.project.identity.projectId,
        { action: "cancel", expectedRevision: approved.project.stateRevision },
        "macro-d1-approve-0001"
      ),
      "idempotency_conflict",
      "an idempotency key already bound to approval cannot be rebound to cancellation"
    );
    assert((await service.getProject(approved.project.identity.projectId)).stateRevision === approved.project.stateRevision, "cross-action idempotency conflict leaves the approved project revision unchanged");
    const approvedBindingBeforeCancel = approved.project.runBindings[0];
    const approvedCanceled = await service.actOnProject(
      approved.project.identity.projectId,
      { action: "cancel", expectedRevision: approved.project.stateRevision },
      "macro-d1-cancel-approved-0001"
    );
    const approvedCanceledRun = await getExactCreatorRun(lifecycle, approvedCanceled.project, approvedBindingBeforeCancel);
    assert(
      approvedCanceled.project.status === "canceled" &&
        approvedCanceled.project.approvalPacket.status === "canceled" &&
        approvedCanceled.project.approvalPacket.privateAlphaRunRevision === approvedCanceledRun.revision &&
        approvedCanceled.project.runBindings[0].sourceRunRevision === approvedCanceledRun.revision &&
        approvedCanceledRun.state === "canceled" &&
        approvedCanceledRun.revision > approvedBindingBeforeCancel.sourceRunRevision,
      "approved pre-execution cancellation records the exact canceled packet and terminal run revision"
    );

    const forgedCancellationLifecycle = {
      ...lifecycle,
      async cancelRun(cancellationInput) {
        const canceledRun = await lifecycle.cancelRun(cancellationInput);
        return {
          ...canceledRun,
          cancellation: {
            ...canceledRun.cancellation,
            previousRevision: canceledRun.cancellation.previousRevision + 9,
          },
        };
      },
    };
    const forgedCancellationService = serviceModule.createCreatorService({
      persistence,
      lifecycle: forgedCancellationLifecycle,
    });
    let forgedCancellationProject = (await forgedCancellationService.createProject(
      { ...input, projectTitle: "D1 Forged Cancellation Provenance Site" },
      "macro-d1-forged-cancellation-create"
    )).project;
    forgedCancellationProject = (await forgedCancellationService.actOnProject(
        forgedCancellationProject.identity.projectId,
        { action: "cancel", expectedRevision: forgedCancellationProject.stateRevision },
        "macro-d1-forged-cancellation-action"
      )).project;
    const exactForgedCancellationBinding = forgedCancellationProject.runBindings.at(-1);
    const exactForgedCancellationRun = await getExactCreatorRun(
      lifecycle,
      forgedCancellationProject,
      exactForgedCancellationBinding
    );
    assert(
      forgedCancellationProject.status === "canceled" &&
        exactForgedCancellationRun.cancellation.previousRevision + 1 === exactForgedCancellationRun.revision &&
        forgedCancellationProject.approvalPacket.privateAlphaRunRevision === exactForgedCancellationRun.revision,
      "a forged cancellation response is discarded in favor of the exact persisted canceled run"
    );
    forgedCancellationProject = await persistence.readProject(forgedCancellationProject.identity.projectId);
    const forgedCancellationSnapshot = JSON.stringify(forgedCancellationProject);
    forgedCancellationProject = await service.getProject(
      forgedCancellationProject.identity.projectId
    );
    assert(
      JSON.stringify(forgedCancellationProject) === forgedCancellationSnapshot,
      "GET leaves the exact completed cancellation byte-for-byte unchanged"
    );

    const pending = await service.createProject(
      { ...input, projectTitle: "Execution Gate Site" },
      "macro-d1-create-0002"
    );
    await expectFailure(
      () => service.actOnProject(
        pending.project.identity.projectId,
        { action: "execute-generation", expectedRevision: pending.project.stateRevision },
        "macro-d1-execute-before-approval"
      ),
      "invalid_transition",
      "execution before approval is rejected"
    );
    await expectFailure(
      () => service.actOnProject(
        pending.project.identity.projectId,
        { action: "cancel", expectedRevision: pending.project.stateRevision - 1 },
        "macro-d1-stale-revision"
      ),
      "revision_conflict",
      "stale creator revisions are rejected"
    );
    const pendingBindingBeforeCancel = pending.project.runBindings[0];
    const canceled = await service.actOnProject(
      pending.project.identity.projectId,
      { action: "cancel", expectedRevision: pending.project.stateRevision },
      "macro-d1-cancel-pending-0001"
    );
    const canceledPrivateAlphaRun = await getExactCreatorRun(lifecycle, canceled.project, pendingBindingBeforeCancel);
    const canceledBinding = canceled.project.runBindings.find(
      (candidate) => candidate.sourceRunId === pendingBindingBeforeCancel.sourceRunId
    );
    assert(
        canceled.project.status === "canceled" &&
        canceled.project.approvalPacket.status === "canceled" &&
        canceledPrivateAlphaRun.state === "canceled" &&
        canceledBinding.sourceRunRevision === canceledPrivateAlphaRun.revision &&
        canceled.project.approvalPacket.privateAlphaRunRevision === canceledPrivateAlphaRun.revision &&
        canceledPrivateAlphaRun.revision > pendingBindingBeforeCancel.sourceRunRevision,
      "cancellation persists the exact terminal Private Alpha revision in both creator provenance records"
    );

    const secondService = serviceModule.createCreatorService({ persistence, lifecycle });
    const concurrent = await service.createProject(
      { ...input, projectTitle: "Concurrent Approval Site" },
      "macro-d1-create-0003"
    );
    const concurrentResults = await Promise.allSettled([
      service.actOnProject(
        concurrent.project.identity.projectId,
        { action: "approve-generation", expectedRevision: concurrent.project.stateRevision },
        "macro-d1-concurrent-a"
      ),
      secondService.actOnProject(
        concurrent.project.identity.projectId,
        { action: "approve-generation", expectedRevision: concurrent.project.stateRevision },
        "macro-d1-concurrent-b"
      ),
    ]);
    assert(concurrentResults.filter((result) => result.status === "fulfilled").length === 1, "concurrent creator mutations have one winner");
    assert(concurrentResults.filter((result) => result.status === "rejected").length === 1, "concurrent creator mutation loser fails closed");

    assert(!stateMachine.canTransitionCreatorProject("draft", "ready"), "draft cannot skip approval and validation to ready");
    let transitionRejected = false;
    try { stateMachine.assertCreatorTransition("exported", "ready"); } catch (_) { transitionRejected = true; }
    assert(transitionRejected, "terminal exported state rejects illegal advancement");

    const atomicId = "bbbbbbbbbbbbbbbbbbbbbbbb";
    const atomicCreatedAt = new Date().toISOString();
    const atomicBase = {
      ...pending.project,
      stateRevision: 1,
      status: "draft",
      createdAt: atomicCreatedAt,
      updatedAt: atomicCreatedAt,
      identity: { ...pending.project.identity, projectId: atomicId },
      request: { ...pending.project.request, createdAt: atomicCreatedAt },
      plan: null,
      approvalPacket: null,
      runBindings: [],
      auditEvents: [{
        eventId: "d".repeat(24),
        eventType: "request.created",
        occurredAt: atomicCreatedAt,
        actor: "local-operator",
        previousState: null,
        resultingState: "draft",
        stateRevision: 1,
        sourceRunId: null,
        artifactRevision: null,
        idempotencyKeyHash: "f".repeat(64),
        mutationDigest: pending.project.request.requestDigest,
        summary: "Deterministic atomic creator request.",
      }],
      idempotencyRecords: [],
    };
    const exactBoundaryId = "abababababababababababab";
    const exactBoundaryInitial = {
      ...atomicBase,
      identity: {
        ...atomicBase.identity,
        projectId: exactBoundaryId,
        projectSlug: "a".repeat(48),
      },
      auditEvents: [{
        ...atomicBase.auditEvents[0],
        eventId: "1".repeat(24),
        summary: "s".repeat(240),
      }],
    };
    await persistence.writeInitialProject(exactBoundaryInitial);
    assert((await persistence.readProject(exactBoundaryId)).identity.projectSlug.length === 48, "persistence accepts exact 48-character slug and 240-character audit-summary policy boundaries");
    const excessiveSlugId = "acacacacacacacacacacacac";
    await expectFailure(
      () => persistence.writeInitialProject({
        ...exactBoundaryInitial,
        identity: { ...exactBoundaryInitial.identity, projectId: excessiveSlugId, projectSlug: "a".repeat(49) },
      }),
      "record_corrupt",
      "persistence rejects a 49-character project slug beyond the declared policy"
    );
    const excessiveSummaryId = "adadadadadadadadadadadad";
    await expectFailure(
      () => persistence.writeInitialProject({
        ...exactBoundaryInitial,
        identity: { ...exactBoundaryInitial.identity, projectId: excessiveSummaryId },
        auditEvents: [{ ...exactBoundaryInitial.auditEvents[0], eventId: "2".repeat(24), summary: "s".repeat(241) }],
      }),
      "record_corrupt",
      "persistence rejects a 241-character audit summary beyond the declared policy"
    );
    const looseInitialId = "aeaeaeaeaeaeaeaeaeaeaeae";
    await expectFailure(
      () => persistence.writeInitialProject({
        ...atomicBase,
        identity: { ...atomicBase.identity, projectId: looseInitialId },
        auditEvents: [{ ...atomicBase.auditEvents[0], actor: "system", idempotencyKeyHash: null, mutationDigest: null }],
      }),
      "record_corrupt",
      "initial revision rejects non-production request-created actor and mutation evidence"
    );
    const initialRollbackId = "afafafafafafafafafafafaf";
    const initialRollbackProject = {
      ...atomicBase,
      identity: { ...atomicBase.identity, projectId: initialRollbackId, projectSlug: "initial-write-rollback" },
      auditEvents: [{ ...atomicBase.auditEvents[0], eventId: "3".repeat(24) }],
    };
    const originalWriteAtomicExclusive = persistence.filesystem.writeAtomicExclusive.bind(persistence.filesystem);
    let rejectInitialPublicationOnce = true;
    persistence.filesystem.writeAtomicExclusive = async (segments, data) => {
      if (rejectInitialPublicationOnce && segments.includes(initialRollbackId)) {
        rejectInitialPublicationOnce = false;
        throw new Error("Injected initial revision publication failure.");
      }
      return originalWriteAtomicExclusive(segments, data);
    };
    try {
      await expectFailure(
        () => persistence.writeInitialProject(initialRollbackProject),
        "internal_failure",
        "initial revision write failure remains bounded"
      );
    } finally {
      persistence.filesystem.writeAtomicExclusive = originalWriteAtomicExclusive;
    }
    assert(
      (await persistence.readProjectIfPresent(initialRollbackId)) === null &&
        (await persistence.listProjects()).every((project) => project.identity.projectId !== initialRollbackId),
      "failed initial publication removes only its exact empty owned project residue and preserves list availability"
    );
    await persistence.writeInitialProject(initialRollbackProject);
    assert((await persistence.readProject(initialRollbackId)).stateRevision === 1, "successful retry publishes the same exact initial creator revision after rollback");
    await persistence.writeInitialProject(atomicBase);
    const atomicUpdatedAt = new Date().toISOString();
    const atomicEvent = {
      eventId: "a".repeat(24),
      eventType: "plan.prepared",
      occurredAt: atomicUpdatedAt,
      actor: "system",
      previousState: "draft",
      resultingState: "draft",
      stateRevision: 2,
      sourceRunId: null,
      artifactRevision: null,
      idempotencyKeyHash: null,
      mutationDigest: null,
      summary: "Deterministic atomic publication evidence.",
    };
    const { planDigest: _pendingPlanDigest, ...atomicPlanBase } = pending.project.plan;
    const atomicPlanWithoutDigest = {
      ...atomicPlanBase,
      project: atomicBase.identity,
      requestDigest: atomicBase.request.requestDigest,
      destinationBoundary: policyModule.buildCreatorDestinationBoundary(atomicId, 1),
      preparedAt: atomicUpdatedAt,
    };
    const atomicPlan = {
      ...atomicPlanWithoutDigest,
      planDigest: cryptoModule.hashCreatorCanonicalJson(atomicPlanWithoutDigest),
    };
    const nextA = { ...atomicBase, stateRevision: 2, updatedAt: atomicUpdatedAt, plan: atomicPlan, auditEvents: [...atomicBase.auditEvents, atomicEvent] };
    const nextB = {
      ...nextA,
      auditEvents: [...atomicBase.auditEvents, { ...atomicEvent, eventId: "b".repeat(24), summary: "Alternate deterministic atomic publication evidence." }],
    };
    const atomicResults = await Promise.allSettled([
      persistence.writeNextProject(nextA, 1),
      persistence.writeNextProject(nextB, 1),
    ]);
    assert(atomicResults.filter((result) => result.status === "fulfilled").length === 1, "concurrent same-revision writes publish once");
    assert((await persistence.readProject(atomicId)).stateRevision === 2, "concurrent write failure preserves one complete revision");
    const atomicRevisionNames = await persistence.filesystem.listDirectory(["projects", atomicId, "state-revisions"]);
    assert(JSON.stringify(atomicRevisionNames) === JSON.stringify(["000001.json", "000002.json"]), "no-replace state publication leaves no overwritten revision or temporary residue");
    const atomicCurrent = await persistence.readProject(atomicId);
    const continuityUpdatedAt = new Date(Date.parse(atomicCurrent.updatedAt) + 1).toISOString();
    const continuityEvent = {
      eventId: "c".repeat(24),
      eventType: "plan.prepared",
      occurredAt: continuityUpdatedAt,
      actor: "system",
      previousState: "draft",
      resultingState: "draft",
      stateRevision: 3,
      sourceRunId: null,
      artifactRevision: null,
      idempotencyKeyHash: null,
      mutationDigest: null,
      summary: "Deterministic continuity evidence.",
    };
    const rewrittenTitle = "Rewritten Creator Identity";
    const rewrittenRequest = {
      creatorKind: atomicCurrent.request.creatorKind,
      projectTitle: rewrittenTitle,
      description: atomicCurrent.request.description,
    };
    await expectFailure(
      () => persistence.writeNextProject({
        ...atomicCurrent,
        stateRevision: 3,
        updatedAt: continuityUpdatedAt,
        identity: { ...atomicCurrent.identity, projectTitle: rewrittenTitle, projectSlug: "rewritten-creator-identity" },
        request: {
          ...atomicCurrent.request,
          ...rewrittenRequest,
          requestDigest: cryptoModule.hashCreatorCanonicalJson(rewrittenRequest),
        },
        auditEvents: [...atomicCurrent.auditEvents, continuityEvent],
      }, 2),
      "record_corrupt",
      "next-state persistence rejects schema-valid identity and request provenance rewrites"
    );
    await expectFailure(
      () => persistence.writeNextProject({
        ...atomicCurrent,
        stateRevision: 3,
        updatedAt: continuityUpdatedAt,
        auditEvents: [
          ...atomicCurrent.auditEvents.map((event, index) => index === 0 ? { ...event, summary: "Rewritten prior audit evidence." } : event),
          continuityEvent,
        ],
      }, 2),
      "record_corrupt",
      "next-state persistence rejects schema-valid rewrites of append-only audit history"
    );
    await expectFailure(
      () => persistence.writeNextProject({
        ...atomicCurrent,
        stateRevision: 3,
        updatedAt: continuityUpdatedAt,
      }, 2),
      "record_corrupt",
      "next-state persistence rejects a revision with no newly bound audit evidence"
    );
    assert((await persistence.readProject(atomicId)).stateRevision === 2, "continuity rejection preserves the exact prior durable state revision");
    const atomicLatestPath = await persistence.filesystem.resolve([
      "projects", atomicId, "state-revisions", "000002.json",
    ]);
    const atomicLatestBytes = await fsp.readFile(atomicLatestPath);
    const atomicLatestEnvelope = JSON.parse(atomicLatestBytes.toString("utf8"));
    atomicLatestEnvelope.project.auditEvents[0].summary = "Self-checksummed rewritten historical evidence.";
    atomicLatestEnvelope.checksum = cryptoModule.hashCreatorCanonicalJson(atomicLatestEnvelope.project);
    await fsp.writeFile(
      atomicLatestPath,
      `${cryptoModule.serializeCreatorCanonicalJson(atomicLatestEnvelope)}\n`,
      { flag: "w" }
    );
    try {
      await expectFailure(
        () => persistence.readProject(atomicId),
        "record_corrupt",
        "read-time contiguous revision validation rejects a self-checksummed latest-file history rewrite"
      );
    } finally {
      await fsp.writeFile(atomicLatestPath, atomicLatestBytes, { flag: "w" });
    }
    assert((await persistence.readProjectRevision(atomicId, 1)).stateRevision === 1, "read-time history validation accepts the restored exact contiguous revision chain");

    const corruptId = "eeeeeeeeeeeeeeeeeeeeeeee";
    const writeRejectedId = "adadadadadadadadadadadad";
    await expectFailure(
      () => persistence.writeInitialProject({
        ...atomicBase,
        identity: { ...atomicBase.identity, projectId: writeRejectedId },
        unexpectedField: "must fail before publication",
      }),
      "record_corrupt",
      "strict creator state schema rejects unknown fields before immutable publication"
    );
    assert((await persistence.readProjectIfPresent(writeRejectedId)) === null, "write-time schema rejection publishes no unreadable creator revision");

    await persistence.writeInitialProject({
      ...atomicBase,
      identity: { ...atomicBase.identity, projectId: corruptId },
    });
    const corruptStatePath = await persistence.filesystem.resolve([
      "projects",
      corruptId,
      "state-revisions",
      "000001.json",
    ]);
    const corruptEnvelope = JSON.parse(await fsp.readFile(corruptStatePath, "utf8"));
    corruptEnvelope.project.status = "ready";
    await fsp.writeFile(corruptStatePath, `${JSON.stringify(corruptEnvelope)}\n`, { flag: "w" });
    await expectFailure(
      () => persistence.readProject(corruptId),
      "record_corrupt",
      "creator record checksum tampering fails closed"
    );

    const writeSyntheticCreatorLock = async (lockId, value) => {
      const segments = ["locks", `${lockId}.lock.json`];
      const exactBytes = Buffer.from(
        `${cryptoModule.serializeCreatorCanonicalJson(value)}\n`,
        "utf8"
      );
      await persistence.filesystem.writeAtomicExclusive(segments, exactBytes);
      return { segments, exactBytes };
    };

    const staleLockId = "cccccccccccccccccccccccc";
    const staleLock = await writeSyntheticCreatorLock(staleLockId, {
        nonce: "c".repeat(32),
        processSessionNonce: "c".repeat(32),
        processId: 2147000000,
        createdAt: new Date().toISOString(),
      });
    let staleLockOperationRan = false;
    await persistence.withProjectLock(staleLockId, async () => {
      staleLockOperationRan = true;
    });
    assert(staleLockOperationRan, "dead-process creator lock is reclaimed through one atomic ownership handoff");
    assert(!fs.existsSync(await persistence.filesystem.resolve(staleLock.segments)), "reclaimed creator lock is released without residue");

    const futureLockId = "cdcdcdcdcdcdcdcdcdcdcdcd";
    const futureLock = await writeSyntheticCreatorLock(futureLockId, {
        nonce: "d".repeat(32),
        processSessionNonce: "d".repeat(32),
        processId: 2147000000,
        createdAt: new Date().toISOString(),
        futureField: true,
      });
    await expectFailure(
      () => persistence.withProjectLock(futureLockId, async () => undefined),
      "mutation_busy",
      "unknown lock-owner fields fail closed instead of enabling dead-process reclamation"
    );
    await persistence.filesystem.compareDeleteExact(futureLock.segments, futureLock.exactBytes);

    const reusedPidLockId = "abababababababababababab";
    const reusedPidLock = await writeSyntheticCreatorLock(reusedPidLockId, {
        nonce: "a".repeat(32),
        processSessionNonce: "0".repeat(32),
        processId: process.pid,
        createdAt: "2000-01-01T00:00:00.000Z",
      });
    await expectFailure(
      () => persistence.withProjectLock(reusedPidLockId, async () => undefined),
      "mutation_busy",
      "same-PID lock with an unknown process session fails closed instead of risking live-owner displacement"
    );
    await persistence.filesystem.compareDeleteExact(reusedPidLock.segments, reusedPidLock.exactBytes);

    const releaseFailureLockId = "acacacacacacacacacacacac";
    const originalCompareDeleteExact = persistence.filesystem.compareDeleteExact.bind(persistence.filesystem);
    let releaseFailureInjected = false;
    persistence.filesystem.compareDeleteExact = async (segments, expectedData) => {
      if (!releaseFailureInjected && segments.at(-1) === `${releaseFailureLockId}.lock.json`) {
        releaseFailureInjected = true;
        throw new Error("deterministic lock release failure");
      }
      return originalCompareDeleteExact(segments, expectedData);
    };
    await expectFailure(
      () => persistence.withProjectLock(releaseFailureLockId, async () => undefined),
      "mutation_busy",
      "creator lock release failure is reported without losing exact ownership"
    );
    persistence.filesystem.compareDeleteExact = originalCompareDeleteExact;
    let releaseRecoveryRan = false;
    await persistence.withProjectLock(releaseFailureLockId, async () => {
      releaseRecoveryRan = true;
    });
    assert(releaseFailureInjected && releaseRecoveryRan, "same-process abandoned lock is reclaimed by its exact nonce on the next mutation");

    const releaseByteMismatchLockId = "adadadadadadadadadadadad";
    let releaseOwnerBytesReencoded = false;
    await expectFailure(
      () => persistence.withProjectLock(releaseByteMismatchLockId, async () => {
        const lockPath = await persistence.filesystem.resolve([
          "locks",
          `${releaseByteMismatchLockId}.lock.json`,
        ]);
        const owner = JSON.parse(await fsp.readFile(lockPath, "utf8"));
        await fsp.writeFile(lockPath, `${JSON.stringify(owner, null, 2)}\n`, "utf8");
        releaseOwnerBytesReencoded = true;
      }),
      "mutation_busy",
      "lock release refuses owner bytes changed after acquisition"
    );
    let releaseByteRecoveryRan = false;
    await persistence.withProjectLock(releaseByteMismatchLockId, async () => {
      releaseByteRecoveryRan = true;
    });
    assert(
      releaseOwnerBytesReencoded && releaseByteRecoveryRan,
      "next mutation reclaims only the exact retained nonce and observed owner bytes"
    );

    const malformedLockId = "dddddddddddddddddddddddd";
    const malformedLockSegments = ["locks", `${malformedLockId}.lock.json`];
    const malformedLockBytes = Buffer.from('{"nonce":"not-an-owner"}\n', "utf8");
    await persistence.filesystem.writeAtomicExclusive(malformedLockSegments, malformedLockBytes);
    await expectFailure(
      () => persistence.withProjectLock(malformedLockId, async () => undefined),
      "mutation_busy",
      "malformed creator lock owner fails closed instead of being reclaimed"
    );
    assert(fs.existsSync(await persistence.filesystem.resolve(malformedLockSegments)), "malformed creator lock remains untouched for operator recovery");
    await persistence.filesystem.compareDeleteExact(malformedLockSegments, malformedLockBytes);

    const cappedId = canceled.project.identity.projectId;
    const cappedProject = {
      ...canceled.project,
      auditEvents: Array.from({ length: 128 }, (_, index) => ({
        ...canceled.project.auditEvents[index % canceled.project.auditEvents.length],
        eventId: `e${index.toString(16).padStart(23, "0")}`,
      })),
    };
    const cappedPersistence = {
      ...persistence,
      async withProjectLock(_projectId, operation) { return operation(); },
      async readProject() { return cappedProject; },
    };
    const cappedService = serviceModule.createCreatorService({ persistence: cappedPersistence, lifecycle });
    await expectFailure(
      () => cappedService.actOnProject(
        cappedId,
        { action: "cancel", expectedRevision: cappedProject.stateRevision },
        "macro-d1-audit-capacity"
      ),
      "audit_capacity_reached",
      "audit capacity fails future mutation without truncation"
    );
    const cappedAfter = await persistence.readProject(cappedId);
    assert(cappedAfter.stateRevision === canceled.project.stateRevision && cappedAfter.auditEvents.length === canceled.project.auditEvents.length && cappedAfter.status === "canceled", "audit capacity refusal preserves the exact durable project without publishing the synthetic capacity probe");

    await persistence.filesystem.ensureDirectory(["staging"]);
    await fsp.mkdir(outsideEscape, { recursive: false });
    const cleanupRetryLabel = ".codexforge/creator-tests/macro-d1-cleanup-retry";
    const cleanupRetryRoot = path.join(repoRoot, ...cleanupRetryLabel.split("/"));
    const cleanupRetryBackup = `${cleanupRetryRoot}-backup`;
    const cleanupRetryFilesystem = new filesystemModule.CreatorOwnedFilesystem(cleanupRetryLabel);
    await cleanupRetryFilesystem.ensureDirectory(["payload"]);
    const cleanupRetryJunction = path.join(cleanupRetryRoot, "payload", "unsafe-junction");
    await fsp.symlink(outsideEscape, cleanupRetryJunction, "junction");
    await expectFailure(
      () => cleanupRetryFilesystem.removeTestRoot(),
      "unsafe_artifact_path",
      "failed native test-root cleanup closes its exact retained root lifecycle"
    );
    await fsp.unlink(cleanupRetryJunction);
    await fsp.rename(cleanupRetryRoot, cleanupRetryBackup);
    await fsp.mkdir(cleanupRetryRoot);
    const cleanupRetrySentinel = path.join(cleanupRetryRoot, "substitute-sentinel.txt");
    await fsp.writeFile(cleanupRetrySentinel, "substitute must survive", "utf8");
    await expectFailure(
      () => cleanupRetryFilesystem.removeTestRoot(),
      "unsafe_creator_root",
      "closed cleanup lifecycle cannot reopen and delete a substituted root name"
    );
    assert(
      (await fsp.readFile(cleanupRetrySentinel, "utf8")) === "substitute must survive",
      "failed cleanup retry leaves every substitute-root byte unchanged"
    );
    await fsp.rm(cleanupRetryRoot, { recursive: true, force: true });
    await fsp.rename(cleanupRetryBackup, cleanupRetryRoot);
    await new filesystemModule.CreatorOwnedFilesystem(cleanupRetryLabel).removeTestRoot();
    assert(!fs.existsSync(cleanupRetryRoot), "a fresh exact lifecycle removes only the restored deterministic test root");
    const boundaryParentSegments = ["staging", "operation-boundary-parent"];
    const boundaryParentPath = await persistence.filesystem.ensureDirectory(boundaryParentSegments);
    const boundaryParentBackup = `${boundaryParentPath}-backup`;
    const outsideBoundaryParent = path.join(outsideEscape, "operation-boundary-parent");
    await fsp.mkdir(outsideBoundaryParent);
    await fsp.rename(boundaryParentPath, boundaryParentBackup);
    await fsp.symlink(outsideBoundaryParent, boundaryParentPath, "junction");
    await expectFailure(
      () => persistence.filesystem.writeExclusive(
        [...boundaryParentSegments, "must-not-escape.txt"],
        Buffer.from("must not escape", "utf8")
      ),
      "unsafe_artifact_path",
      "creator write rejects a final-parent junction through the trusted native boundary"
    );
    await fsp.unlink(boundaryParentPath);
    await fsp.rename(boundaryParentBackup, boundaryParentPath);
    assert(
      !fs.existsSync(path.join(outsideBoundaryParent, "must-not-escape.txt")),
      "final-parent junction writes no bytes outside the creator root"
    );
    const crossParentSource = ["staging", "cross-parent-publication"];
    const crossParentTarget = ["projects", atomicId, "revisions", "cross-parent-publication"];
    await persistence.filesystem.createDirectoryExclusive(crossParentSource);
    await persistence.filesystem.writeExclusive(
      [...crossParentSource, "payload.txt"],
      Buffer.from("bounded payload", "utf8")
    );
    await expectFailure(
      () => persistence.filesystem.renameDirectoryExclusive(
        crossParentSource,
        crossParentTarget
      ),
      "unsafe_artifact_path",
      "populated creator directory publication is rejected across different parents"
    );
    assert(
      (await persistence.filesystem.readBuffer([...crossParentSource, "payload.txt"]))
        .toString("utf8") === "bounded payload",
      "rejected cross-parent publication preserves the exact owned source data"
    );
    await persistence.filesystem.removeOwnedTree(crossParentSource);
    const linkPath = await persistence.filesystem.resolve(["staging", "escape-link"]);
    await fsp.symlink(outsideEscape, linkPath, "junction");
    let linkRejected = false;
    try { await persistence.filesystem.assertSafeExisting(["staging", "escape-link"], "directory"); } catch (_) { linkRejected = true; }
    assert(linkRejected, "junction or symlink escape is rejected before creator I/O");
    await fsp.unlink(linkPath);
    assert(!fs.existsSync(linkPath), "the exact test-owned junction is unlinked without following its target before root cleanup");

    const creatorRoot = path.resolve(repoRoot, ".codexforge", "creator-tests", suffix);
    const creatorRootBackup = path.resolve(repoRoot, ".codexforge", "creator-tests", `${suffix}-trust-backup`);
    assert(!fs.existsSync(creatorRootBackup), "root-swap backup target begins absent");
    let retainedRootPreventedSwap = false;
    let swappedRootRejected = false;
    let rootRenamed = false;
    let rootJunctionCreated = false;
    try {
      await fsp.rename(creatorRoot, creatorRootBackup);
      rootRenamed = true;
      await fsp.symlink(outsideEscape, creatorRoot, "junction");
      rootJunctionCreated = true;
      await persistence.filesystem.ensureDirectory(["staging"]);
    } catch (error) {
      if (!rootRenamed) {
        retainedRootPreventedSwap = ["EBUSY", "EACCES", "EPERM"].includes(error?.code);
      } else if (rootJunctionCreated) {
        swappedRootRejected = true;
      } else {
        throw error;
      }
    } finally {
      if (rootJunctionCreated) await fsp.unlink(creatorRoot).catch(() => undefined);
      if (rootRenamed) await fsp.rename(creatorRootBackup, creatorRoot);
    }
    assert(
      retainedRootPreventedSwap || swappedRootRejected,
      "retained creator trust anchor prevents or rejects a post-initialization root junction swap"
    );
    assert(!fs.existsSync(path.join(outsideEscape, "staging")), "root-swap attempt writes nothing outside the creator test root");

    assert(fixtureAvailabilityCalls === 0 && fixtureDeliveries === 0, "D1 performs zero deterministic or live generation calls");
    activityTrap.assertZeroActivity();
    assert(activityCounters.fetch === 0 && activityCounters.externalNetwork === 0 && activityCounters.credentialResolution === 0, "D1 traps and proves zero fetch, external network, and credential reads");
    assert(fs.existsSync(productionCreatorRoot) === productionCreatorBefore, "D1 does not create or mutate the production creator root");
    const productionPrivateAlphaAfter = fs.existsSync(productionPrivateAlphaRoot)
      ? (await fsp.readdir(productionPrivateAlphaRoot)).sort().join("\n")
      : "absent";
    assert(productionPrivateAlphaAfter === productionPrivateAlphaBefore, "D1 does not mutate production Private Alpha data");
  } finally {
    await persistence.cleanupTestRoot().catch(() => undefined);
    await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
    await fsp.rm(outsideEscape, { recursive: true, force: true });
  }
  assert(!fs.existsSync(path.resolve(repoRoot, ".codexforge", "creator-tests", suffix)), "D1 creator test root is cleaned");
  assert(!fs.existsSync(privateAlphaRoot), "D1 Private Alpha test root is cleaned");
  console.log(`[COUNTERS] ${activityTrap.formatCounters({ fixtureDelivery: fixtureDeliveries, fixtureAvailability: fixtureAvailabilityCalls })}`);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-macro-d1-creator-smoke.js"
[System.IO.File]::WriteAllText($tempNodeScript, $nodeScript, [System.Text.Encoding]::ASCII)
try {
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] D1 Node harness exited with code $LASTEXITCODE" }
} finally {
  Remove-Item -LiteralPath $tempNodeScript -Force -ErrorAction SilentlyContinue
}

& node (Join-Path $root "scripts/smoke-codexforge-creator-lock-concurrency.cjs")
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] D1 independent-process creator-lock fence exited with code $LASTEXITCODE"
}
Write-Host "[PASS] D1 independent processes cannot displace a newly acquired live creator lock"

Write-Host "[PASS] CodexForge Macro Phase D1 shared creator lifecycle foundation smoke complete."
