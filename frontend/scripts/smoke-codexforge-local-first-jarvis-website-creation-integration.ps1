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

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  Assert-True ($Haystack.IndexOf($Needle, [StringComparison]::Ordinal) -lt 0) $Message
}

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

Write-Host ""
Write-Host "=== CodexForge local-first Jarvis website creation integration ==="

$requiredFiles = @(
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-types.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-crypto.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-persistence.server.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-service.server.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-runtime.server.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-http.server.ts",
  "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-api-client.ts",
  "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/creator-handoffs/route.ts",
  "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/creator-handoffs/[handoffId]/route.ts",
  "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx",
  "src/lib/codexforge/creator/creator-types.ts",
  "src/lib/codexforge/creator/creator-policy.ts",
  "src/lib/codexforge/creator/creator-state-machine.ts",
  "src/lib/codexforge/creator/creator-persistence.server.ts",
  "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts",
  "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts",
  "src/lib/codexforge/creator/creator-service.server.ts",
  "src/lib/codexforge/creator/creator-api-client.ts",
  "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx",
  "src/app/jarvis-chatbot/page.tsx",
  "docs/codexforge-local-first-jarvis-website-creation-integration.md"
)
foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf) "E1 file exists: $file"
}

$types = Get-Text "src/lib/codexforge/creator/creator-types.ts"
$policy = Get-Text "src/lib/codexforge/creator/creator-policy.ts"
$stateMachine = Get-Text "src/lib/codexforge/creator/creator-state-machine.ts"
$adapter = Get-Text "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"
$ollama = Get-Text "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts"
$service = Get-Text "src/lib/codexforge/creator/creator-service.server.ts"
$client = Get-Text "src/lib/codexforge/creator/creator-api-client.ts"
$handoffTypes = Get-Text "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-types.ts"
$handoffPersistence = Get-Text "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-persistence.server.ts"
$handoffService = Get-Text "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-service.server.ts"
$handoffRuntime = Get-Text "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-runtime.server.ts"
$handoffClient = Get-Text "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-api-client.ts"
$handoffRecoveryRoute = Get-Text "src/app/api/codexforge/jarvis-chat/conversations/[conversationId]/creator-handoffs/[handoffId]/route.ts"
$chatPanel = Get-Text "src/lib/codexforge/jarvis-chat/components/JarvisChatPanel.tsx"
$creatorPanel = Get-Text "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx"
$retiredChatbotRoute = Get-Text "src/app/jarvis-chatbot/page.tsx"
$documentation = Get-Text "docs/codexforge-local-first-jarvis-website-creation-integration.md"

foreach ($source in @($types, $policy, $documentation)) {
  Assert-Contains $source 'ollama-local::gpt-oss:20b' "E1 contract fixes the canonical exact local model key"
  Assert-Contains $source '4096' "E1 contract fixes the 4096-token ceiling"
}
Assert-Contains $types '"awaiting_plan_approval"' "Creator exposes the explicit Jarvis plan-approval state"
Assert-Contains $types '"awaiting_revision_plan_approval"' "Creator exposes a distinct revision-plan state"
Assert-Contains $types '"stopping"' "Creator exposes an honest stopping state"
Assert-Contains $types '"stopped"' "Creator exposes an honest stopped state"
Assert-Contains $types '"approve-plan"' "Creator exposes explicit plan approval"
Assert-Contains $types '"approve-revision-plan"' "Creator exposes explicit revision-plan approval"
Assert-Contains $types '"approve-revision-generation"' "Creator exposes separate revision generation approval"
Assert-Contains $types '"execute-revision-generation"' "Creator exposes separate revision execution"
Assert-Contains $types '"stop-generation"' "Creator exposes explicit provider-start-fenced stop"
Assert-Contains $types '"restore-prior-publication"' "Creator exposes explicit restoration of a preserved prior publication without provider execution"
Assert-Contains $types 'revisionRequests' "Creator keeps append-only explicit revision requests"
Assert-Contains $stateMachine 'awaiting_plan_approval' "Creator state machine owns the plan approval lane"
Assert-Contains $stateMachine 'awaiting_revision_plan_approval' "Creator state machine owns the explicit revision lane"
Assert-Contains $adapter 'admitProviderStart' "Creator adapter fences provider admission against Stop"
Assert-Contains $ollama '{ num_ctx: input.contextWindowTokens }' "Ollama maps an explicitly authorized Creator context window to exact num_ctx"
Assert-Contains $service 'prepareProjectPlan' "Creator service has a plan-only Jarvis preparation seam"
Assert-Contains $service 'request-revision' "Creator service persists a visible revision request before a run"
Assert-Contains $client 'redirect: "error"' "Creator client refuses HTTP redirects"

Assert-Contains $handoffTypes 'sourceMessageDigest' "Handoff binds the exact source user message digest"
Assert-Contains $handoffTypes 'expectedConversationRevision' "Handoff verifies an immutable chat revision"
Assert-Contains $handoffTypes 'acknowledgement: true' "Handoff requires explicit visible acknowledgement"
Assert-Contains $handoffPersistence 'previousRecordDigest' "Handoff persistence authenticates immutable continuity"
Assert-Contains $handoffTypes '"preparing"' "Handoff exposes a durable recoverable preparing state"
Assert-Contains $handoffTypes '"failed"' "Handoff exposes a truthful terminal failed state"
Assert-Contains $handoffTypes 'reveal-exact-reviewed-request' "Handoff requires an explicit persisted-request review acknowledgement"
Assert-Contains $handoffTypes 'resume-exact-reviewed-request' "Handoff requires a separate explicit resume acknowledgement"
Assert-Contains $handoffService 'role !== "user"' "Handoff rejects assistant text as creator authority"
Assert-Contains $handoffService 'prepareProjectPlan' "Handoff calls only the Creator plan preparation seam"
Assert-Contains $handoffRuntime 'const creatorPersistence = getCreatorRuntimePersistence();' "Handoff runtime obtains the authoritative Creator persistence identity"
Assert-Contains $handoffRuntime 'createJarvisCreatorHandoffPersistenceForTesting(identity.testSuffix, creatorPersistence)' "Handoff test runtime reuses the authoritative Creator persistence identity"
Assert-Contains $handoffRuntime 'createJarvisCreatorHandoffPersistence(creatorPersistence)' "Handoff production runtime reuses the authoritative Creator persistence identity"
Assert-Contains $handoffClient 'redirect: "error"' "Handoff client refuses redirects"
Assert-NotContains $handoffClient 'http://localhost' "Handoff client has no absolute localhost target"
Assert-NotContains $handoffClient 'http://127.0.0.1' "Handoff client has no absolute loopback target"
Assert-Contains $handoffRecoveryRoute 'If-Match' "Handoff recovery route requires exact record preconditions"
Assert-Contains $handoffRecoveryRoute 'Idempotency-Key' "Handoff resume remains exactly idempotent"

Assert-Contains $chatPanel 'Continue this user message in Website Creator' "Jarvis exposes the explicit per-user-message creator handoff"
Assert-Contains $chatPanel 'aria-expanded' "Jarvis handoff review is keyboard and disclosure accessible"
Assert-Contains $chatPanel 'reviewJarvisCreatorHandoff' "Jarvis requires explicit review before interrupted handoff recovery"
Assert-Contains $chatPanel 'resumeJarvisCreatorHandoff' "Jarvis exposes a separate acknowledged resume action"
Assert-Contains $chatPanel 'handoff.status === "prepared"' "Jarvis exposes Creator controls only for confirmed prepared handoffs"
Assert-Contains $chatPanel 'handoff.status === "failed"' "Jarvis renders failed handoffs as safe failures without Creator controls"
Assert-Contains $creatorPanel 'awaiting_plan_approval' "Creator UI renders the explicit plan-approval state"
Assert-Contains $creatorPanel 'awaiting_revision_plan_approval' "Creator UI renders the explicit revision-plan state"
Assert-Contains $creatorPanel 'stopping' "Creator UI renders stopping honestly"
Assert-Contains $creatorPanel 'stopped' "Creator UI renders stopped honestly"
Assert-Contains $creatorPanel 'pendingExecutionAction' "Creator UI keeps an execution-specific pending state separate from ordinary busy locking"
Assert-Contains $creatorPanel 'stopActiveGeneration' "Creator UI has a separate exact-state Stop path"
Assert-Contains $creatorPanel 'observation < 12' "Creator UI performs one bounded local durable-state observation for an immediate Stop click"
foreach ($activeStopState in @('"generating"', '"revising"', '"repairing"')) {
  Assert-Contains $creatorPanel $activeStopState "Creator UI Stop covers active state $activeStopState"
}
Assert-Contains $creatorPanel '"plan.approval_requested"' "Creator UI restores interrupted initial plan approval"
Assert-Contains $creatorPanel '"revision.plan_approval_requested"' "Creator UI restores interrupted revision plan approval"
Assert-Contains $creatorPanel 'canRestorePriorPublication' "Creator UI gates prior-publication restoration on exact preserved publication evidence"
Assert-Contains $creatorPanel 'Restore prior validated revision' "Creator UI exposes the explicit no-provider prior-publication restoration action"
Assert-Contains $retiredChatbotRoute 'redirect("/jarvis")' "Legacy chatbot shell redirects to canonical Jarvis after its planning intent migration"

foreach ($needle in @(
  "no automatic retry",
  "no fallback",
  "no model substitution",
  "no automatic approval",
  "hidden execution",
  "provider token charge estimate of USD 0.00",
  "local resource cost explicitly unmetered"
)) {
  Assert-Contains $documentation $needle "E1 documentation states: $needle"
}

$nodeScript = @'
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = fs.promises;
const path = require("node:path");
const Module = require("node:module");

const repoRoot = path.resolve(process.argv[2]);
const suffix = "local-first-jarvis-website-creation-integration";
const creatorTestRoot = path.resolve(repoRoot, ".codexforge", "creator-tests", suffix);
const privateAlphaTestRoot = path.resolve(repoRoot, ".codexforge", "private-alpha-tests", suffix);
const productionCreatorRoot = path.resolve(repoRoot, ".codexforge", "creator");
const productionPrivateAlphaRoot = path.resolve(repoRoot, ".codexforge", "private-alpha");

const activityTrap = require(path.join(
  repoRoot,
  "scripts",
  "codexforge-creator-deterministic-activity-trap.cjs"
)).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [creatorTestRoot, privateAlphaTestRoot],
  allowedMkdirPaths: [
    path.join(repoRoot, ".codexforge"),
    path.join(repoRoot, ".codexforge", "creator-tests"),
    path.join(repoRoot, ".codexforge", "private-alpha-tests"),
  ],
});
const activityCounters = activityTrap.counters;

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  const resolved = Module._resolveFilename(request, parent, isMain);
  return activityTrap.wrapLoadedModule(resolved, originalLoad.apply(this, arguments));
};

const ts = require(path.join(repoRoot, "node_modules", "typescript"));
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const syntaxErrors = (output.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );
  if (syntaxErrors.length !== 0) {
    throw new Error(`TypeScript syntax validation failed for ${path.relative(repoRoot, filename)}.`);
  }
  module._compile(output.outputText, filename);
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`[PASS] ${message}`);
}

const expectedServerOwnedTopologyOperations = [
  "parse-server-owned-page-v1",
  "validate-untrusted-fragments",
  "derive-resource-tags-from-inventory",
  "construct-canonical-document-shell",
  "validate-canonical-bundle-v1",
];

function assertServerOwnedTopologyPublication(project, purpose, artifactRevision, label) {
  const binding = [...project.runBindings]
    .reverse()
    .find((candidate) => candidate.purpose === purpose && candidate.documentTopology !== null);
  const topology = binding?.documentTopology ?? null;
  const materialization = project.materializations.find(
    (candidate) => candidate.artifactRevision === artifactRevision
  );
  const indexHtml = project.artifactProposal?.files.find(
    (file) => file.path === "index.html"
  )?.content;
  const constructionEvents = binding
    ? project.auditEvents.filter(
        (event) =>
          event.eventType === "topology.document_constructed" &&
          event.sourceRunId === binding.sourceRunId
      )
    : [];
  const isDigest = (value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
  assert(
    binding?.responseContractVersion === "server-owned-page-v1" &&
      topology?.canonicalizerVersion === "codexforge.creator.document-topology.v1" &&
      topology.sourceResponseContractVersion === "server-owned-page-v1" &&
      topology.responseContractVersion === "server-owned-page-v1" &&
      JSON.stringify(topology.orderedOperations) ===
        JSON.stringify(expectedServerOwnedTopologyOperations) &&
      isDigest(topology.inputDigest) &&
      topology.inputHtmlSha256 === null &&
      isDigest(topology.outputHtmlSha256) &&
      isDigest(topology.outputBundleDigest) &&
      isDigest(topology.transformationDigest) &&
      typeof indexHtml === "string" &&
      crypto.createHash("sha256").update(indexHtml, "utf8").digest("hex") ===
        topology.outputHtmlSha256 &&
      topology.outputBundleDigest === project.validation?.bundleDigest &&
      materialization?.topologyTransformationDigest === topology.transformationDigest &&
      materialization?.topologyRepairDigest === undefined &&
      project.exportManifest?.artifactRevision === artifactRevision &&
      project.exportManifest.topologyTransformationDigest === topology.transformationDigest &&
      project.exportManifest.topologyRepairDigest === undefined &&
      constructionEvents.length === 1 &&
      constructionEvents[0].occurredAt >= binding.outputReceivedAt &&
      constructionEvents[0].summary.includes(topology.transformationDigest.slice(0, 12)),
    `${label} binds the exact ordinary server-owned topology through run, audit, validation, materialization, and manifest provenance`
  );
}

async function expectFailure(operation, code, message, status) {
  try {
    await operation();
  } catch (error) {
    assert(
      error && error.code === code,
      `${message} (${code}; observed ${error?.code ?? error?.message ?? "unknown"})`
    );
    if (status !== undefined) {
      assert(error.status === status, `${message} preserves status ${status}`);
    }
    return error;
  }
  throw new Error(`${message}: expected ${code}`);
}

async function snapshotTree(rootPath) {
  const hash = crypto.createHash("sha256");
  let nodes = 0;
  async function visit(current, relative) {
    const stat = await fsp.lstat(current).catch((error) => {
      if (error && error.code === "ENOENT" && relative === "") return null;
      throw error;
    });
    if (!stat) {
      hash.update("absent\n");
      return;
    }
    if (stat.isSymbolicLink() || stat.isSocket() || stat.isFIFO()) {
      throw new Error(`Unsafe persistence snapshot node: ${relative || "."}`);
    }
    nodes += 1;
    if (nodes > 10_000) throw new Error("Persistence snapshot exceeded its bounded inventory.");
    if (stat.isDirectory()) {
      hash.update(`d\0${relative}\n`);
      for (const name of (await fsp.readdir(current)).sort()) {
        await visit(path.join(current, name), relative ? `${relative}/${name}` : name);
      }
      return;
    }
    if (!stat.isFile()) throw new Error(`Unsupported persistence snapshot node: ${relative}`);
    const bytes = await fsp.readFile(current);
    hash.update(`f\0${relative}\0${bytes.length}\0`);
    hash.update(bytes);
  }
  await visit(rootPath, "");
  return hash.digest("hex");
}

function fixtureIdentity() {
  return Object.freeze({
    providerId: "ollama-local",
    providerLabel: "Local Ollama",
    modelId: "gpt-oss:20b",
    modelLabel: "gpt-oss:20b",
    modelKey: "ollama-local::gpt-oss:20b",
    locality: "local",
    dataBoundary: "local-machine",
    costClass: "local-no-provider-token-charge",
    approvedMaximumOutputTokens: 4096,
  });
}

function htmlDocument(title, bodyText) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body><header><p>Local-first website</p></header><main><h1>${title}</h1><p>${bodyText}</p><button type="button">Get started</button></main><footer><p>Generated locally</p></footer></body></html>`;
}

function bundleOutput(title, bodyText) {
  return JSON.stringify({
    contractVersion: "codexforge.creator.bundle.v1",
    projectTitle: title,
    creatorKind: "website-browser-app",
    entrypoint: "index.html",
    files: [
      {
        path: "index.html",
        mediaType: "text/html",
        content: htmlDocument(title, bodyText),
      },
    ],
  });
}

function serverOwnedPageOutput(title, bodyText, files = []) {
  return JSON.stringify({
    contractVersion: "codexforge.creator.page.v1",
    projectTitle: title,
    creatorKind: "website-browser-app",
    page: {
      language: "en",
      primaryHeading: title,
      headerContent: "<p>Local-first website</p>",
      navigationContent: null,
      mainContent: `<p>${bodyText}</p><button type="button">Get started</button>`,
      footerContent: "<p>Generated locally</p>",
    },
    files,
  });
}

function observedPromptMismatchBundleOutput(title) {
  return JSON.stringify({
    contractVersion: "codexforge.creator.bundle.v1",
    projectTitle: title,
    creatorKind: "website-browser-app",
    entrypoint: "index.html",
    files: [
      {
        path: "index.html",
        mediaType: "text/html",
        content: htmlDocument(title, "The local service remains fail-closed.")
          .replace('initial-scale=1"', 'initial-scale=1.0"')
          .replace(
            `<header><p>Local-first website</p></header><main><h1>${title}</h1>`,
            `<header><h1>${title}</h1><p>Local-first website</p></header><main>`
          ),
      },
    ],
  });
}

function maximumEscapedBundleOutput(title) {
  const indexContent = htmlDocument(
    title,
    "The exact maximum aggregate source remains locally revision-bound."
  );
  const aggregateLimit = 49_152;
  const firstLength = 24_576;
  const secondLength = aggregateLimit - Buffer.byteLength(indexContent, "utf8") - firstLength;
  assert(secondLength > 0 && secondLength <= 24_576, "maximum source fixture has bounded per-file allocation");
  const build = (escapeCount) => {
    const firstEscapes = Math.min(firstLength, escapeCount);
    const secondEscapes = Math.max(0, escapeCount - firstEscapes);
    const bundle = {
      contractVersion: "codexforge.creator.bundle.v1",
      projectTitle: title,
      creatorKind: "website-browser-app",
      entrypoint: "index.html",
      files: [
        { path: "index.html", mediaType: "text/html", content: indexContent },
        {
          path: "source-a.txt",
          mediaType: "text/plain",
          content: "\\".repeat(firstEscapes) + "a".repeat(firstLength - firstEscapes),
        },
        {
          path: "source-b.txt",
          mediaType: "text/plain",
          content: "\\".repeat(secondEscapes) + "b".repeat(secondLength - secondEscapes),
        },
      ],
    };
    return { bundle, rawOutput: JSON.stringify(bundle) };
  };
  let low = 0;
  let high = firstLength + secondLength;
  while (low < high) {
    const candidate = Math.ceil((low + high) / 2);
    if (build(candidate).rawOutput.length <= 65_536) low = candidate;
    else high = candidate - 1;
  }
  const result = build(low);
  assert(
    result.rawOutput.length <= 65_536 &&
      build(low + 1).rawOutput.length > 65_536 &&
      result.bundle.files.reduce((total, file) => total + Buffer.byteLength(file.content, "utf8"), 0) === aggregateLimit &&
      low > 8_000,
    "maximum source fixture uses the greatest valid JSON escaping within the provider-output envelope"
  );
  return result;
}

function buildCreateHandoffBody(conversation, projectTitle, description) {
  const turn = conversation.turns.at(-1);
  assert(turn && turn.userMessage.role === "user", "handoff fixture selects one exact persisted user message");
  return {
    operation: "create",
    expectedConversationRevision: conversation.revision,
    sourceTurnId: turn.turnId,
    sourceMessageId: turn.userMessage.messageId,
    sourceMessageDigest: turn.userMessage.textDigest,
    creatorKind: "website-browser-app",
    projectTitle,
    description,
    acknowledgement: true,
  };
}

async function main() {
  assert(!fs.existsSync(creatorTestRoot), "E1 creator deterministic root begins absent");
  assert(!fs.existsSync(privateAlphaTestRoot), "E1 Private Alpha deterministic root begins absent");
  const productionCreatorBefore = await snapshotTree(productionCreatorRoot);
  const productionPrivateAlphaBefore = await snapshotTree(productionPrivateAlphaRoot);

  const chatPersistenceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server.ts"
  ));
  const chatAdapterModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-private-alpha-adapter.server.ts"
  ));
  const chatServiceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-chat/jarvis-chat-service.server.ts"
  ));
  const creatorPersistenceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-persistence.server.ts"
  ));
  const creatorAdapterModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"
  ));
  const creatorServiceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-service.server.ts"
  ));
  const creatorMaterializationModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-materialization.server.ts"
  ));
  const creatorContractModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-contract.server.ts"
  ));
  const creatorValidationModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/creator/creator-validation.server.ts"
  ));
  const disclosedLegacyGenerationInstruction = creatorContractModule.buildCreatorGenerationInstruction({
    projectTitle: "E1 Disclosed Contract",
    description: "Create a bounded local page.",
  });
  const requiredCanonicalHtmlDisclosures = [
    "exactly one html root whose direct element children are head then body",
    "put one title directly under head",
    "one main landmark under body",
    "single visible h1 under main",
    'exactly one separate direct meta charset="utf-8"',
    'exactly one separate direct meta name="viewport" content="width=device-width, initial-scale=1"',
  ];
  assert(
    requiredCanonicalHtmlDisclosures.every((fragment) =>
      disclosedLegacyGenerationInstruction.includes(fragment)
    ),
    "the retained legacy instruction discloses every validator-required canonical HTML topology and metadata constraint"
  );
  const disclosedServerOwnedInstruction =
    creatorContractModule.buildCreatorGenerationInstructionForResponseContract({
      responseContractVersion: "server-owned-page-v1",
      projectTitle: "E1 Disclosed Contract",
      description: "Create a bounded local page.",
    });
  assert(
    disclosedServerOwnedInstruction.startsWith(
      creatorContractModule.CREATOR_SERVER_OWNED_PAGE_INSTRUCTION_PREFIX
    ) &&
      disclosedServerOwnedInstruction.includes("Do not return index.html or any .html file.") &&
      disclosedServerOwnedInstruction.includes(
        "CodexForge owns and constructs the complete document shell"
      ) &&
      disclosedServerOwnedInstruction.includes(
        "Never place html, head, body, main, h1, header, nav, footer, title, meta, link, or script elements in a fragment."
      ),
    "the active generation instruction discloses the server-owned document topology boundary"
  );
  const privateAlphaValidationModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-validation.ts"
  ));
  const privateAlphaProviderModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts"
  ));
  const privateAlphaStoreModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
  ));
  const handoffPersistenceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-persistence.server.ts"
  ));
  const handoffServiceModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-service.server.ts"
  ));
  const handoffPolicyModule = require(path.join(
    repoRoot,
    "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-policy.ts"
  ));

  const providerOutputs = [];
  const providerRequests = [];
  let availabilityCalls = 0;
  let generationCalls = 0;
  let heldGeneration = null;
  const provider = {
    identity: fixtureIdentity(),
    async getAvailability() {
      availabilityCalls += 1;
      return {
        providerAvailable: true,
        modelAvailable: true,
        quotaState: "not-applicable",
        errorCode: null,
        safeErrorMessage: null,
      };
    },
    async generateApprovedText(input) {
      generationCalls += 1;
      providerRequests.push(input);
      const serverOwnedCreator = input.approvedRequestText.startsWith(
        creatorContractModule.CREATOR_SERVER_OWNED_PAGE_INSTRUCTION_PREFIX
      );
      const legacyCreator = input.approvedRequestText.startsWith(
        creatorContractModule.CREATOR_GENERATION_INSTRUCTION_PREFIX
      );
      const creatorOwned = serverOwnedCreator || legacyCreator;
      const sourceBoundCreator =
        creatorOwned && input.approvedRequestText.includes("Exact canonical source bundle:");
      assert(
        input.model === "gpt-oss:20b" &&
          input.maximumOutputTokens === 4096 &&
          input.maximumInputCharacters === (creatorOwned ? 131_072 : undefined) &&
          input.contextWindowTokens === (sourceBoundCreator ? 131_072 : undefined),
        "fixture receives only the exact approved local model envelope"
      );
      assert(
        !legacyCreator,
        "every live E1 Creator execution uses the server-owned page response contract"
      );
      if (
        heldGeneration &&
        input.approvedRequestText.includes(heldGeneration.marker)
      ) {
        heldGeneration.started();
        await heldGeneration.release;
      }
      const outputText = providerOutputs.shift();
      if (outputText instanceof Error) throw outputText;
      if (typeof outputText !== "string") {
        throw new Error("No additional deterministic provider delivery is authorized.");
      }
      return {
        outputText,
        doneReason: "stop",
        totalDurationNanoseconds: 1,
        loadDurationNanoseconds: 0,
        promptEvalCount: 1,
        evalCount: 32,
      };
    },
  };

  let creatorPersistence = creatorPersistenceModule.createCreatorPersistenceForTesting(suffix);
  let chatPersistence = chatPersistenceModule.createJarvisChatPersistenceForTesting(suffix);
  let handoffPersistence = handoffPersistenceModule.createJarvisCreatorHandoffPersistenceForTesting(
    suffix,
    creatorPersistence
  );
  let creatorLifecycle = creatorAdapterModule.createCreatorGenerationLifecycleAdapterForTesting(suffix, provider);
  let chatLifecycle = chatAdapterModule.createJarvisChatLifecycleAdapterForTesting(suffix, provider);
  let creator = creatorServiceModule.createCreatorService({
    persistence: creatorPersistence,
    lifecycle: creatorLifecycle,
  });
  let chat = chatServiceModule.createJarvisChatService({
    persistence: chatPersistence,
    lifecycle: chatLifecycle,
  });
  let handoff = handoffServiceModule.createJarvisCreatorHandoffService({
    chat,
    creator,
    persistence: handoffPersistence,
  });

  async function prepareCreateJourney(input) {
    const exactChat = input.chatService ?? chat;
    const exactCreator = input.creatorService ?? creator;
    const exactHandoff = input.handoffService ?? handoff;
    const conversationResult = await exactChat.createConversation(
      { message: input.message },
      `${input.prefix}-chat-create-v1`
    );
    const conversation = conversationResult.conversation;
    const body = buildCreateHandoffBody(
      conversation,
      input.projectTitle,
      input.description ?? input.message
    );
    const result = await exactHandoff.prepare(
      conversation.conversationId,
      body,
      `${input.prefix}-handoff-prepare-v1`
    );
    return {
      conversation,
      body,
      handoffResult: result,
      project: await exactCreator.getProject(result.project.projectId),
    };
  }

  async function approvePreparedProject(project, exactCreator, prefix) {
    let current = (await exactCreator.actOnProject(
      project.identity.projectId,
      { action: "approve-plan", expectedRevision: project.stateRevision },
      `${prefix}-approve-plan-v1`
    )).project;
    current = (await exactCreator.actOnProject(
      current.identity.projectId,
      { action: "approve-generation", expectedRevision: current.stateRevision },
      `${prefix}-approve-generation-v1`
    )).project;
    return current;
  }

  try {
    const observedMismatchTitle = "E1 Disclosed Validation Contract";
    const observedMismatchValidation = creatorValidationModule.validateCreatorProviderOutput({
      rawOutput: observedPromptMismatchBundleOutput(observedMismatchTitle),
      expectedProjectTitle: observedMismatchTitle,
      completedAt: "2026-08-18T13:26:20.000Z",
    });
    const observedMismatchIssueCodes = observedMismatchValidation.validation.issues
      .filter((issue) => issue.severity === "error" && issue.blocksMaterialization)
      .map((issue) => issue.code);
    const observedMismatchPrimaryIssueCodes = observedMismatchIssueCodes
      .filter((code) => code !== "preview.not_ready")
      .sort();
    assert(
      observedMismatchValidation.parse.ok === true &&
        observedMismatchValidation.validation.valid === false &&
        observedMismatchValidation.bundle === null &&
        JSON.stringify(observedMismatchPrimaryIssueCodes) ===
          JSON.stringify(["html.document_topology", "html.metadata_required"]) &&
        observedMismatchIssueCodes.includes("preview.not_ready"),
      "the live rejection shape remains fail-closed for the two now-disclosed canonical HTML constraints"
    );
    const disclosedContractValidOutput = creatorValidationModule.validateCreatorProviderOutput({
      rawOutput: bundleOutput(observedMismatchTitle, "The disclosed canonical form validates."),
      expectedProjectTitle: observedMismatchTitle,
      completedAt: "2026-08-18T13:26:20.000Z",
    });
    assert(
      disclosedContractValidOutput.validation.valid === true &&
        disclosedContractValidOutput.bundle !== null,
      "the disclosed canonical HTML form remains valid without weakening fail-closed validation"
    );

    const requestText = "Create a calm local launch website with one clear call to action.";
    const projectTitle = "E1 Local Launch";
    const conversationResult = await chat.createConversation(
      { message: requestText },
      "e1-chat-create-local-launch-v1"
    );
    const conversation = conversationResult.conversation;
    assert(
      conversation.state === "awaiting_approval" && conversation.turns.length === 1,
      "real Jarvis persistence publishes the selected conversational request"
    );
    assert(
      availabilityCalls === 0 && generationCalls === 0,
      "Jarvis request capture binds no provider execution"
    );

    const handoffBody = buildCreateHandoffBody(conversation, projectTitle, requestText);
    const handoffKey = "e1-handoff-create-local-launch-v1";
    const prepared = await handoff.prepare(conversation.conversationId, handoffBody, handoffKey);
    assert(
      prepared.handoff.status === "prepared" &&
        prepared.project.status === "awaiting_plan_approval" &&
        prepared.project.runBindingCount === 0,
      "exact user-message handoff creates only a visible Creator plan"
    );
    let project = await creator.getProject(prepared.project.projectId);
    assert(
      project.status === "awaiting_plan_approval" &&
        project.runBindings.length === 0 &&
        project.approvalPacket === null,
      "plan preparation persists zero Creator run or generation approval"
    );
    assert(
      project.plan?.modelEnvelope.providerKey === "ollama-local" &&
        project.plan.modelEnvelope.modelKey === "ollama-local::gpt-oss:20b" &&
        project.plan.modelEnvelope.runtimeModel === "gpt-oss:20b" &&
        project.plan.modelEnvelope.dataBoundary === "local-machine" &&
        project.plan.modelEnvelope.maximumOutputTokens === 4096 &&
        project.plan.modelEnvelope.estimatedProviderTokenChargeUsd === 0 &&
        project.plan.modelEnvelope.retry === "disabled" &&
        project.plan.modelEnvelope.fallback === "disabled" &&
        project.plan.modelEnvelope.substitution === "disabled",
      "visible plan fixes model, provider, data, token, cost, retry, fallback, and substitution boundaries"
    );
    assert(
      availabilityCalls === 0 && generationCalls === 0,
      "handoff and plan preparation perform no availability probe or generation"
    );

    const replay = await handoff.prepare(conversation.conversationId, handoffBody, handoffKey);
    assert(
      replay.replayed &&
        replay.handoff.recordDigest === prepared.handoff.recordDigest &&
        replay.project.projectId === prepared.project.projectId,
      "exact handoff retry replays the sealed result without duplicate Creator work"
    );
    const semanticReplay = await handoff.prepare(
      conversation.conversationId,
      handoffBody,
      "e1-handoff-create-local-launch-semantic-v1"
    );
    assert(
      semanticReplay.replayed && semanticReplay.handoff.handoffId === prepared.handoff.handoffId,
      "a distinct key for identical reviewed evidence converges on one semantic handoff"
    );
    await expectFailure(
      () => handoff.prepare(
        conversation.conversationId,
        { ...handoffBody, projectTitle: "Conflicting title" },
        handoffKey
      ),
      "idempotency_conflict",
      "same handoff key cannot authorize changed reviewed content",
      409
    );

    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-plan", expectedRevision: project.stateRevision },
      "e1-creator-approve-plan-v1"
    )).project;
    assert(
      project.status === "awaiting_generation_approval" &&
        project.runBindings.length === 1 &&
        project.approvalPacket?.status === "awaiting",
      "explicit plan approval binds exactly one local run while generation stays unapproved"
    );
    assert(
      availabilityCalls === 0 && generationCalls === 0,
      "plan approval performs neither provider availability nor generation"
    );

    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-generation", expectedRevision: project.stateRevision },
      "e1-creator-approve-generation-v1"
    )).project;
    assert(
      project.status === "approved" && project.approvalPacket?.status === "approved",
      "separate explicit generation approval records the exact run scope"
    );
    assert(
      availabilityCalls === 0 && generationCalls === 0,
      "generation approval remains separate from execution"
    );

    providerOutputs.push(serverOwnedPageOutput(projectTitle, "A bounded first validated revision."));
    const generationApprovedRevision = project.stateRevision;
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "execute-generation", expectedRevision: generationApprovedRevision },
      "e1-creator-execute-generation-v1"
    )).project;
    assert(
      project.status === "ready" &&
        project.validation?.valid === true &&
        project.materializations.length === 1 &&
        project.materializations[0].artifactRevision === 1 &&
        project.exportManifest?.artifactRevision === 1,
      `one explicit generation validates and materializes exactly revision 1 (status=${project.status}; validation=${project.validation?.valid}; materializations=${project.materializations.length}; failure=${project.failureCode ?? "none"}:${project.failureMessage ?? "none"})`
    );
    assertServerOwnedTopologyPublication(project, "generation", 1, "initial generation");
    assert(
      availabilityCalls === 1 && generationCalls === 1 && providerOutputs.length === 0,
      "approved generation consumes exactly one deterministic local attempt"
    );

    const executionReplay = await creator.actOnProject(
      project.identity.projectId,
      { action: "execute-generation", expectedRevision: generationApprovedRevision },
      "e1-creator-execute-generation-v1"
    );
    assert(
      executionReplay.replayed &&
        executionReplay.project.stateRevision === project.stateRevision &&
        generationCalls === 1,
      "generation replay returns the exact ready revision without another attempt"
    );

    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "start-preview", expectedRevision: project.stateRevision },
      "e1-creator-start-preview-v1"
    )).project;
    assert(
      project.status === "preview_available" &&
        project.preview.status === "active" &&
        project.preview.artifactRevision === 1 &&
        Boolean(project.preview.previewId),
      "safe preview becomes available only for the validated materialized revision"
    );
    const preview = await creator.readActivePreviewFile({
      projectId: project.identity.projectId,
      previewId: project.preview.previewId,
      artifactRevision: 1,
      filePath: "index.html",
    });
    assert(
      preview.mediaType === "text/html" &&
        preview.bytes.toString("utf8").includes("A bounded first validated revision."),
      "preview serves the exact validated local materialization"
    );

    // Simulate a Next service/module restart while retaining the one process-owned
    // native persistence identity. A second native root for the same label is not
    // a valid runtime and is independently rejected by the shared-root contract.
    creatorLifecycle = creatorAdapterModule.createCreatorGenerationLifecycleAdapterForTesting(suffix, provider);
    chatLifecycle = chatAdapterModule.createJarvisChatLifecycleAdapterForTesting(suffix, provider);
    creator = creatorServiceModule.createCreatorService({ persistence: creatorPersistence, lifecycle: creatorLifecycle });
    chat = chatServiceModule.createJarvisChatService({ persistence: chatPersistence, lifecycle: chatLifecycle });
    handoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator,
      persistence: handoffPersistence,
    });
    const restartedProject = await creator.getProject(project.identity.projectId);
    const restartedHandoff = await handoff.prepare(
      conversation.conversationId,
      handoffBody,
      handoffKey
    );
    assert(
      restartedProject.recordVersion === 1 &&
        restartedProject.stateRevision === project.stateRevision &&
        restartedProject.preview.previewId === project.preview.previewId,
      "fresh services recover the exact validated project and preview evidence"
    );
    assert(
      restartedHandoff.replayed &&
        restartedHandoff.handoff.recordDigest === prepared.handoff.recordDigest &&
        generationCalls === 1,
      "fresh services replay the sealed handoff without a second provider attempt"
    );

    project = (await creator.actOnProject(
      restartedProject.identity.projectId,
      { action: "stop-preview", expectedRevision: restartedProject.stateRevision },
      "e1-creator-stop-preview-before-revision-v1"
    )).project;
    assert(
      project.status === "ready" &&
        project.preview.status === "stopped" &&
        project.materializations.length === 1,
      "revision preparation begins from an explicitly stopped validated revision 1 preview"
    );
    const revisionOneBytesBefore = await creatorPersistence.filesystem.readBuffer([
      "projects",
      project.identity.projectId,
      "revisions",
      "000001",
      "files",
      "index.html",
    ]);
    const revisionSource = (await creator.listProjectSummaries(256)).find(
      (candidate) => candidate.projectId === project.identity.projectId
    );
    assert(
      revisionSource &&
        revisionSource.status === "ready" &&
        revisionSource.latestArtifactRevision === 1 &&
        revisionSource.latestManifestDigest === project.exportManifest?.manifestDigest &&
        revisionSource.sourceRunBindingCount === 1 &&
        revisionSource.explicitRevisionCount === 0,
      "revision handoff selects the exact current validated Creator summary evidence"
    );

    const revisionMessage = "Revise the validated site with a clearer second-revision launch statement.";
    const revisionConversationResult = await chat.createConversation(
      { message: revisionMessage },
      "e1-chat-create-explicit-revision-v1"
    );
    const revisionConversation = revisionConversationResult.conversation;
    const revisionTurn = revisionConversation.turns[0];
    const revisionHandoffBody = {
      operation: "revise",
      expectedConversationRevision: revisionConversation.revision,
      sourceTurnId: revisionTurn.turnId,
      sourceMessageId: revisionTurn.userMessage.messageId,
      sourceMessageDigest: revisionTurn.userMessage.textDigest,
      creatorKind: "website-browser-app",
      projectTitle,
      description: revisionMessage,
      acknowledgement: true,
      sourceProjectId: revisionSource.projectId,
      sourceProjectStatus: "ready",
      sourceProjectStateRevision: revisionSource.stateRevision,
      sourceArtifactRevision: revisionSource.latestArtifactRevision,
      sourceManifestDigest: revisionSource.latestManifestDigest,
      sourceAggregateDigest: revisionSource.latestAggregateDigest,
      sourceValidationDigest: revisionSource.latestValidationDigest,
      sourceRunBindingsDigest: revisionSource.sourceRunBindingsDigest,
      sourceRunBindingCount: revisionSource.sourceRunBindingCount,
      sourceExplicitRevisionCount: revisionSource.explicitRevisionCount,
    };
    const revisionPrepared = await handoff.prepare(
      revisionConversation.conversationId,
      revisionHandoffBody,
      "e1-handoff-explicit-revision-prepare-v1"
    );
    project = await creator.getProject(project.identity.projectId);
    assert(
      revisionPrepared.project.status === "awaiting_revision_plan_approval" &&
        project.status === "awaiting_revision_plan_approval" &&
        project.runBindings.length === 1 &&
        project.revisionRequests.length === 1 &&
        project.revisionRequests[0].sourceArtifactRevision === 1 &&
        project.revisionRequests[0].targetArtifactRevision === 2,
      "explicit Jarvis revision handoff persists one complete-replacement plan without binding another run"
    );
    assert(
      availabilityCalls === 1 && generationCalls === 1,
      "revision planning performs no provider availability or generation"
    );

    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: project.stateRevision },
      "e1-creator-approve-revision-plan-v1"
    )).project;
    assert(
      project.status === "awaiting_revision_generation_approval" &&
        project.runBindings.length === 2 &&
        project.runBindings.at(-1)?.purpose === "revision" &&
        project.revisionRequests[0].planApprovedAt !== null,
      "separate revision-plan approval binds exactly one revision run"
    );
    assert(
      availabilityCalls === 1 && generationCalls === 1,
      "revision-plan approval still performs no provider execution"
    );
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: project.stateRevision },
      "e1-creator-approve-revision-generation-v1"
    )).project;
    assert(
      project.status === "revision_generation_approved" &&
        project.approvalPacket?.purpose === "revision" &&
        project.approvalPacket.status === "approved",
      "revision generation has its own explicit approval after revision-plan approval"
    );
    assert(
      availabilityCalls === 1 && generationCalls === 1,
      "revision generation approval remains separate from revision execution"
    );

    const firstRevisionInstructionIndex = providerRequests.length;
    providerOutputs.push(serverOwnedPageOutput(
      projectTitle,
      "A bounded first validated revision. The preserved second validated revision."
    ));
    const revisionApprovedStateRevision = project.stateRevision;
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: revisionApprovedStateRevision },
      "e1-creator-execute-revision-generation-v1"
    )).project;
    assert(
      project.status === "ready" &&
        project.validation?.valid === true &&
        project.materializations.length === 2 &&
        project.materializations[0].artifactRevision === 1 &&
        project.materializations[1].artifactRevision === 2 &&
        project.exportManifest?.artifactRevision === 2 &&
        project.revisionRequests[0].completedAt !== null,
      "one explicit revision execution validates and materializes exactly revision 2"
    );
    assertServerOwnedTopologyPublication(project, "revision", 2, "explicit revision");
    assert(
      availabilityCalls === 2 && generationCalls === 2 && providerOutputs.length === 0,
      "revision execution consumes exactly one additional deterministic local attempt"
    );
    const firstRevisionInstruction = providerRequests[firstRevisionInstructionIndex]?.approvedRequestText ?? "";
    assert(
      firstRevisionInstruction.includes("Exact canonical source bundle:") &&
        firstRevisionInstruction.includes("A bounded first validated revision.") &&
        firstRevisionInstruction.includes(`Source manifest digest: ${revisionSource.latestManifestDigest}`) &&
        firstRevisionInstruction.includes(`Source aggregate digest: ${revisionSource.latestAggregateDigest}`) &&
        firstRevisionInstruction.includes(`Source validation digest: ${revisionSource.latestValidationDigest}`),
      "revision 2 generation is bound to the exact published revision 1 bundle and digests"
    );
    const revisionExecutionReplay = await creator.actOnProject(
      project.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: revisionApprovedStateRevision },
      "e1-creator-execute-revision-generation-v1"
    );
    assert(
      revisionExecutionReplay.replayed &&
        revisionExecutionReplay.project.stateRevision === project.stateRevision &&
        generationCalls === 2,
      "revision execution replay cannot create another generation attempt or artifact revision"
    );
    const revisionOneBytesAfter = await creatorPersistence.filesystem.readBuffer([
      "projects",
      project.identity.projectId,
      "revisions",
      "000001",
      "files",
      "index.html",
    ]);
    const revisionTwoPublication = await creatorMaterializationModule.readCreatorMaterializationPublication({
      persistence: creatorPersistence,
      projectId: project.identity.projectId,
      artifactRevision: 2,
    });
    assert(
      revisionOneBytesAfter.equals(revisionOneBytesBefore) &&
        revisionTwoPublication.materialization.artifactRevision === 2 &&
        revisionTwoPublication.manifest.manifestDigest === project.exportManifest.manifestDigest,
      "revision 2 publication preserves immutable revision 1 bytes and exact revision 2 evidence"
    );
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "start-preview", expectedRevision: project.stateRevision },
      "e1-creator-start-revision-two-preview-v1"
    )).project;
    const revisionTwoPreview = await creator.readActivePreviewFile({
      projectId: project.identity.projectId,
      previewId: project.preview.previewId,
      artifactRevision: 2,
      filePath: "index.html",
    });
    assert(
      project.preview.status === "active" &&
        project.preview.artifactRevision === 2 &&
        revisionTwoPreview.bytes.toString("utf8").includes("A bounded first validated revision.") &&
        revisionTwoPreview.bytes.toString("utf8").includes("The preserved second validated revision."),
      "preview advances to cumulative validated revision 2 evidence"
    );

    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "stop-preview", expectedRevision: project.stateRevision },
      "e1-creator-stop-preview-before-revision-three-v1"
    )).project;
    const revisionTwoBytesBefore = await creatorPersistence.filesystem.readBuffer([
      "projects",
      project.identity.projectId,
      "revisions",
      "000002",
      "files",
      "index.html",
    ]);
    const revisionTwoSource = (await creator.listProjectSummaries(256)).find(
      (candidate) => candidate.projectId === project.identity.projectId
    );
    assert(
      revisionTwoSource?.status === "ready" &&
        revisionTwoSource.latestArtifactRevision === 2 &&
        revisionTwoSource.explicitRevisionCount === 1,
      "revision 3 starts from the exact validated cumulative revision 2 source"
    );

    const staleRevisionMessage = "Apply a stale competing revision that must not survive a changed source.";
    const staleRevisionConversation = (await chat.createConversation(
      { message: staleRevisionMessage },
      "e1-chat-create-stale-revision-v1"
    )).conversation;
    const staleRevisionTurn = staleRevisionConversation.turns[0];
    const staleRevisionBody = {
      operation: "revise",
      expectedConversationRevision: staleRevisionConversation.revision,
      sourceTurnId: staleRevisionTurn.turnId,
      sourceMessageId: staleRevisionTurn.userMessage.messageId,
      sourceMessageDigest: staleRevisionTurn.userMessage.textDigest,
      creatorKind: "website-browser-app",
      projectTitle,
      description: staleRevisionMessage,
      acknowledgement: true,
      sourceProjectId: revisionTwoSource.projectId,
      sourceProjectStatus: "ready",
      sourceProjectStateRevision: revisionTwoSource.stateRevision,
      sourceArtifactRevision: revisionTwoSource.latestArtifactRevision,
      sourceManifestDigest: revisionTwoSource.latestManifestDigest,
      sourceAggregateDigest: revisionTwoSource.latestAggregateDigest,
      sourceValidationDigest: revisionTwoSource.latestValidationDigest,
      sourceRunBindingsDigest: revisionTwoSource.sourceRunBindingsDigest,
      sourceRunBindingCount: revisionTwoSource.sourceRunBindingCount,
      sourceExplicitRevisionCount: revisionTwoSource.explicitRevisionCount,
    };
    const preMutationFailureCreator = {
      ...creator,
      async actOnProject(projectId, body, idempotencyKey) {
        if (body?.action === "request-revision") {
          throw new Error("Injected response ambiguity before Creator revision mutation.");
        }
        return creator.actOnProject(projectId, body, idempotencyKey);
      },
    };
    const staleRevisionHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator: preMutationFailureCreator,
      persistence: handoffPersistence,
    });
    await expectFailure(
      () => staleRevisionHandoff.prepare(
        staleRevisionConversation.conversationId,
        staleRevisionBody,
        "e1-handoff-stale-revision-v1"
      ),
      "creator_result_ambiguous",
      "pre-mutation revision response ambiguity preserves a reviewable preparing handoff",
      503
    );
    const staleRevisionSummary = (await handoff.listConversation(
      staleRevisionConversation.conversationId,
      64
    ))[0];
    assert(
      staleRevisionSummary.status === "preparing" &&
        staleRevisionSummary.resultingProjectStatus === null,
      "stale revision ambiguity claims neither a plan nor a Creator mutation"
    );

    const cumulativeRevisionMessage = "Add a third cumulative launch proof while preserving both earlier statements.";
    const cumulativeRevisionConversation = (await chat.createConversation(
      { message: cumulativeRevisionMessage },
      "e1-chat-create-cumulative-revision-v1"
    )).conversation;
    const cumulativeRevisionTurn = cumulativeRevisionConversation.turns[0];
    const cumulativeRevisionBody = {
      ...staleRevisionBody,
      expectedConversationRevision: cumulativeRevisionConversation.revision,
      sourceTurnId: cumulativeRevisionTurn.turnId,
      sourceMessageId: cumulativeRevisionTurn.userMessage.messageId,
      sourceMessageDigest: cumulativeRevisionTurn.userMessage.textDigest,
      description: cumulativeRevisionMessage,
    };
    const cumulativeRevisionPrepared = await handoff.prepare(
      cumulativeRevisionConversation.conversationId,
      cumulativeRevisionBody,
      "e1-handoff-cumulative-revision-v1"
    );
    project = await creator.getProject(cumulativeRevisionPrepared.project.projectId);
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: project.stateRevision },
      "e1-creator-approve-cumulative-revision-plan-v1"
    )).project;
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: project.stateRevision },
      "e1-creator-approve-cumulative-revision-generation-v1"
    )).project;
    const cumulativeInstructionIndex = providerRequests.length;
    providerOutputs.push(serverOwnedPageOutput(
      projectTitle,
      "A bounded first validated revision. The preserved second validated revision. The third cumulative launch proof."
    ));
    project = (await creator.actOnProject(
      project.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: project.stateRevision },
      "e1-creator-execute-cumulative-revision-generation-v1"
    )).project;
    const cumulativeInstruction = providerRequests[cumulativeInstructionIndex]?.approvedRequestText ?? "";
    const revisionOneBytesAfterThird = await creatorPersistence.filesystem.readBuffer([
      "projects", project.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    const revisionTwoBytesAfterThird = await creatorPersistence.filesystem.readBuffer([
      "projects", project.identity.projectId, "revisions", "000002", "files", "index.html",
    ]);
    const revisionThreeBytes = await creatorPersistence.filesystem.readBuffer([
      "projects", project.identity.projectId, "revisions", "000003", "files", "index.html",
    ]);
    assert(
      project.status === "ready" &&
        project.materializations.length === 3 &&
        project.revisionRequests.length === 2 &&
        project.revisionRequests.every((request) => request.completedAt !== null) &&
        revisionOneBytesAfterThird.equals(revisionOneBytesBefore) &&
        revisionTwoBytesAfterThird.equals(revisionTwoBytesBefore) &&
        cumulativeInstruction.includes("A bounded first validated revision.") &&
        cumulativeInstruction.includes("The preserved second validated revision.") &&
        revisionThreeBytes.toString("utf8").includes("A bounded first validated revision.") &&
        revisionThreeBytes.toString("utf8").includes("The preserved second validated revision.") &&
        revisionThreeBytes.toString("utf8").includes("The third cumulative launch proof."),
      "source-bound revision 3 preserves both immutable prior bundles and cumulative reviewed changes"
    );

    const reviewedStaleRevision = await handoff.review(
      staleRevisionConversation.conversationId,
      staleRevisionSummary.handoffId,
      {
        action: "review",
        expectedHandoffRecordDigest: staleRevisionSummary.recordDigest,
        acknowledgement: "reveal-exact-reviewed-request",
      }
    );
    await expectFailure(
      () => handoff.resume(
        staleRevisionConversation.conversationId,
        staleRevisionSummary.handoffId,
        {
          action: "resume",
          expectedHandoffRecordDigest: reviewedStaleRevision.recordDigest,
          reviewedRequestDigest: reviewedStaleRevision.reviewedRequest.handoffRequestDigest,
          acknowledgement: "resume-exact-reviewed-request",
        },
        "e1-handoff-stale-revision-resume-v1"
      ),
      "revision_source_conflict",
      "changed revision source becomes a definitive terminal handoff failure",
      409
    );
    const terminalStaleRevision = await handoff.getSummary(
      staleRevisionConversation.conversationId,
      staleRevisionSummary.handoffId
    );
    assert(
      terminalStaleRevision.status === "failed" &&
        terminalStaleRevision.failureStatus === 409 &&
        terminalStaleRevision.failureCode === "revision_source_conflict",
      "changed revision source is sealed as exact failed recovery evidence"
    );

    const projectCountBeforeSelectorRejections = (await creator.listProjects(256)).length;
    const crossConversationResult = await chat.createConversation(
      { message: "This unrelated chat must not inherit another message selector." },
      "e1-chat-create-cross-selector-v1"
    );
    await expectFailure(
      () => handoff.prepare(
        crossConversationResult.conversation.conversationId,
        {
          ...handoffBody,
          expectedConversationRevision: crossConversationResult.conversation.revision,
          projectTitle: "E1 Cross Chat Rejection",
        },
        "e1-handoff-cross-chat-selector-rejection-v1"
      ),
      "source_conflict",
      "a source selector from another chat is rejected before Creator mutation",
      409
    );
    await expectFailure(
      () => handoff.prepare(
        conversation.conversationId,
        {
          ...handoffBody,
          sourceMessageDigest: "f".repeat(64),
          projectTitle: "E1 Digest Rejection",
        },
        "e1-handoff-message-digest-rejection-v1"
      ),
      "source_conflict",
      "a changed user-message digest is rejected before Creator mutation",
      409
    );

    const assistantConversationResult = await chat.createConversation(
      { message: "Create an assistant response only for selector rejection evidence." },
      "e1-chat-create-assistant-selector-v1"
    );
    let assistantConversation = assistantConversationResult.conversation;
    const assistantBinding = assistantConversation.turns[0].runBinding;
    assistantConversation = (await chat.actOnConversation(
      assistantConversation.conversationId,
      {
        action: "approve-turn",
        expectedRevision: assistantConversation.revision,
        approvalScopeHash: assistantBinding.approvalScopeHash,
        acknowledgement: true,
      },
      "e1-chat-approve-assistant-selector-v1"
    )).conversation;
    providerOutputs.push("A deterministic assistant message cannot become creator authority.");
    assistantConversation = (await chat.actOnConversation(
      assistantConversation.conversationId,
      {
        action: "execute-turn",
        expectedRevision: assistantConversation.revision,
        approvalScopeHash: assistantConversation.turns[0].runBinding.approvalScopeHash,
        acknowledgement: true,
      },
      "e1-chat-execute-assistant-selector-v1"
    )).conversation;
    const assistantMessage = assistantConversation.turns[0].assistantMessage;
    assert(assistantMessage?.role === "assistant", "assistant-selector fixture persists one exact assistant message");
    const assistantSelectorBody = {
      ...buildCreateHandoffBody(
        assistantConversation,
        "E1 Assistant Selector Rejection",
        "Assistant content must never authorize Creator."
      ),
      sourceMessageId: assistantMessage.messageId,
      sourceMessageDigest: assistantMessage.textDigest,
    };
    await expectFailure(
      () => handoff.prepare(
        assistantConversation.conversationId,
        assistantSelectorBody,
        "e1-handoff-assistant-selector-rejection-v1"
      ),
      "source_conflict",
      "assistant output is rejected as Creator authority",
      409
    );
    assert(
      (await creator.listProjects(256)).length === projectCountBeforeSelectorRejections &&
        providerOutputs.length === 0,
      "cross-chat, digest, and assistant selector rejection creates no Creator project"
    );

    async function executeRejectedOutputCase(input) {
      const journey = await prepareCreateJourney({
        projectTitle: input.projectTitle,
        message: input.message,
        prefix: input.prefix,
      });
      let rejectedProject = await approvePreparedProject(
        journey.project,
        creator,
        input.prefix
      );
      const availabilityBefore = availabilityCalls;
      const generationBefore = generationCalls;
      providerOutputs.push(input.outputText);
      rejectedProject = (await creator.actOnProject(
        rejectedProject.identity.projectId,
        { action: "execute-generation", expectedRevision: rejectedProject.stateRevision },
        `${input.prefix}-execute-generation-v1`
      )).project;
      assert(
        rejectedProject.status === "rejected_output" &&
          rejectedProject.validation?.valid === false &&
          rejectedProject.artifactProposal === null &&
          rejectedProject.materializations.length === 0 &&
          rejectedProject.exportManifest === null &&
          rejectedProject.preview.status === "inactive" &&
          rejectedProject.preview.previewId === null,
        `${input.label} fails closed without a previewable artifact`
      );
      assert(
        availabilityCalls === availabilityBefore + 1 &&
          generationCalls === generationBefore + 1 &&
          providerOutputs.length === 0,
        `${input.label} consumes exactly one authorized deterministic attempt and no retry`
      );
      await expectFailure(
        () => creator.actOnProject(
          rejectedProject.identity.projectId,
          { action: "start-preview", expectedRevision: rejectedProject.stateRevision },
          `${input.prefix}-blocked-preview-v1`
        ),
        "preview_blocked",
        `${input.label} cannot activate preview`,
        409
      );
      return rejectedProject;
    }

    await executeRejectedOutputCase({
      projectTitle: "E1 Malformed Output",
      message: "Create a site whose malformed fixture must fail closed.",
      prefix: "e1-malformed-output",
      outputText: "{",
      label: "malformed model output",
    });
    await executeRejectedOutputCase({
      projectTitle: "E1 Unsafe Output",
      message: "Create a site whose unsafe remote resource fixture must fail closed.",
      prefix: "e1-unsafe-output",
      outputText: JSON.stringify({
        contractVersion: "codexforge.creator.page.v1",
        projectTitle: "E1 Unsafe Output",
        creatorKind: "website-browser-app",
        page: {
          language: "en",
          primaryHeading: "E1 Unsafe Output",
          headerContent: null,
          navigationContent: null,
          mainContent: '<img src="https://external.invalid/tracker.png" alt="Remote tracker">',
          footerContent: null,
        },
        files: [],
      }),
      label: "unsafe model output",
    });
    await executeRejectedOutputCase({
      projectTitle: "E1 Oversized Output",
      message: "Create a site whose oversized file fixture must fail closed.",
      prefix: "e1-oversized-output",
      outputText: JSON.stringify({
        contractVersion: "codexforge.creator.page.v1",
        projectTitle: "E1 Oversized Output",
        creatorKind: "website-browser-app",
        page: {
          language: "en",
          primaryHeading: "E1 Oversized Output",
          headerContent: null,
          navigationContent: null,
          mainContent: "<p>Bounded output required.</p>",
          footerContent: null,
        },
        files: [
          {
            path: "oversized.txt",
            mediaType: "text/plain",
            content: "x".repeat(24_577),
          },
        ],
      }),
      label: "oversized model output",
    });

    const maximumProjectTitle = "E1 Maximum Escaped Source";
    const maximumFixture = maximumEscapedBundleOutput(maximumProjectTitle);
    const maximumFixtureValidation = creatorValidationModule.validateCreatorProviderOutput({
      rawOutput: maximumFixture.rawOutput,
      expectedProjectTitle: maximumProjectTitle,
    });
    assert(
      maximumFixtureValidation.validation.valid === true &&
        maximumFixtureValidation.bundle?.files.length === 3,
      "maximum aggregate and worst-escaped provider fixture is a valid bounded Creator bundle"
    );
    const maximumPageAssets = maximumFixture.bundle.files.slice(1).map((file, index, files) => ({
      ...file,
      content: index === files.length - 1 ? file.content.slice(0, -512) : file.content,
    }));
    const maximumPageOutput = serverOwnedPageOutput(
      maximumProjectTitle,
      "The exact maximum aggregate source remains locally revision-bound.",
      maximumPageAssets
    );
    const maximumPageValidation =
      creatorValidationModule.validateCreatorServerOwnedProviderOutput({
        rawOutput: maximumPageOutput,
        expectedProjectTitle: maximumProjectTitle,
      });
    assert(
      maximumPageValidation.validation.valid === true &&
        maximumPageValidation.bundle?.files.length === 3,
      "the server-owned equivalent retains the bounded large source assets for lifecycle testing"
    );
    const maximumJourney = await prepareCreateJourney({
      projectTitle: maximumProjectTitle,
      message: "Create a maximum bounded local source bundle for creator-only revision input testing.",
      prefix: "e1-maximum-escaped-source",
    });
    let maximumProject = await approvePreparedProject(
      maximumJourney.project,
      creator,
      "e1-maximum-escaped-source"
    );
    providerOutputs.push(maximumPageOutput);
    maximumProject = (await creator.actOnProject(
      maximumProject.identity.projectId,
      { action: "execute-generation", expectedRevision: maximumProject.stateRevision },
      "e1-maximum-escaped-source-execute-v1"
    )).project;
    const maximumRevisionOneBytes = await creatorPersistence.filesystem.readBuffer([
      "projects",
      maximumProject.identity.projectId,
      "revisions",
      "000001",
      "files",
      "source-a.txt",
    ]);
    maximumProject = (await creator.actOnProject(
      maximumProject.identity.projectId,
      {
        action: "request-revision",
        expectedRevision: maximumProject.stateRevision,
        sourceArtifactRevision: 1,
        revisionBrief: "Preserve the exact maximum source while adding one bounded proof line.",
      },
      "e1-maximum-escaped-source-request-revision-v1"
    )).project;
    assert(
      maximumProject.status === "awaiting_revision_plan_approval" &&
        maximumProject.revisionRequests[0].sourceSnapshotBytes > 8_000,
      "maximum escaped source produces an immutable revision envelope above the generic input ceiling"
    );
    maximumProject = (await creator.actOnProject(
      maximumProject.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: maximumProject.stateRevision },
      "e1-maximum-escaped-source-approve-revision-plan-v1"
    )).project;
    maximumProject = (await creator.actOnProject(
      maximumProject.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: maximumProject.stateRevision },
      "e1-maximum-escaped-source-approve-revision-generation-v1"
    )).project;
    const maximumInstructionIndex = providerRequests.length;
    providerOutputs.push(serverOwnedPageOutput(
      maximumProjectTitle,
      "The maximum source was reviewed under the creator-only input boundary."
    ));
    maximumProject = (await creator.actOnProject(
      maximumProject.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: maximumProject.stateRevision },
      "e1-maximum-escaped-source-execute-revision-v1"
    )).project;
    const maximumInstruction = providerRequests[maximumInstructionIndex]?.approvedRequestText ?? "";
    const privateAlphaRequest = {
      requestText: maximumInstruction,
      capability: "code",
      modelPreferenceLabel: "gpt-oss:20b",
      maximumOutputTokens: 4096,
      modelKey: "ollama-local::gpt-oss:20b",
    };
    const genericMaximumValidation = privateAlphaValidationModule.validatePrivateAlphaCreateRunInput(
      privateAlphaRequest
    );
    const creatorMaximumValidation = privateAlphaValidationModule.validatePrivateAlphaCreateRunInput(
      privateAlphaRequest,
      undefined,
      privateAlphaValidationModule.PRIVATE_ALPHA_MAX_CREATOR_REQUEST_LENGTH
    );
    const maximumRevisionOneBytesAfter = await creatorPersistence.filesystem.readBuffer([
      "projects",
      maximumProject.identity.projectId,
      "revisions",
      "000001",
      "files",
      "source-a.txt",
    ]);
    assert(
      maximumInstruction.length > privateAlphaValidationModule.PRIVATE_ALPHA_MAX_REQUEST_LENGTH &&
        maximumInstruction.length <= privateAlphaValidationModule.PRIVATE_ALPHA_MAX_CREATOR_REQUEST_LENGTH &&
        privateAlphaValidationModule.PRIVATE_ALPHA_MAX_REQUEST_LENGTH === 8_000 &&
        privateAlphaValidationModule.PRIVATE_ALPHA_MAX_CREATOR_REQUEST_LENGTH === 131_072 &&
        genericMaximumValidation.ok === false &&
        creatorMaximumValidation.ok === true &&
        maximumProject.status === "ready" &&
        maximumRevisionOneBytesAfter.equals(maximumRevisionOneBytes),
      "creator-only 131072 input admits the source-bound maximum revision while generic and chat remain capped at 8000"
    );

    const repairProjectTitle = "E1 Linked Revision Repair";
    const repairJourney = await prepareCreateJourney({
      projectTitle: repairProjectTitle,
      message: "Create a safe baseline that will retain one rejected revision intent through repair.",
      prefix: "e1-linked-revision-repair",
    });
    let repairProject = await approvePreparedProject(
      repairJourney.project,
      creator,
      "e1-linked-revision-repair"
    );
    providerOutputs.push(serverOwnedPageOutput(repairProjectTitle, "Immutable repair baseline."));
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "execute-generation", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-execute-generation-v1"
    )).project;
    const repairRevisionOneBytes = await creatorPersistence.filesystem.readBuffer([
      "projects", repairProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    const linkedRevisionBrief = "Add the reviewed linked revision proof without changing the baseline statement.";
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      {
        action: "request-revision",
        expectedRevision: repairProject.stateRevision,
        sourceArtifactRevision: 1,
        revisionBrief: linkedRevisionBrief,
      },
      "e1-linked-revision-repair-request-revision-v1"
    )).project;
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-approve-revision-plan-v1"
    )).project;
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-approve-revision-generation-v1"
    )).project;
    providerOutputs.push(JSON.stringify({
      contractVersion: "codexforge.creator.page.v1",
      projectTitle: repairProjectTitle,
      creatorKind: "website-browser-app",
      page: {
        language: "en",
        primaryHeading: repairProjectTitle,
        headerContent: null,
        navigationContent: null,
        mainContent: '<img src="https://external.invalid/rejected-revision.png" alt="Rejected remote">',
        footerContent: null,
      },
      files: [],
    }));
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-execute-rejected-revision-v1"
    )).project;
    const linkedRevisionRequest = repairProject.revisionRequests[0];
    assert(
      repairProject.status === "rejected_output" &&
        repairProject.materializations.length === 1 &&
        linkedRevisionRequest.rejectedAt !== null &&
        linkedRevisionRequest.completedAt === null,
      "unsafe revision is rejected while its exact reviewed intent and valid source remain linked"
    );
    const callsBeforeRejectedRestore = { availabilityCalls, generationCalls };
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      {
        action: "restore-prior-publication",
        expectedRevision: repairProject.stateRevision,
      },
      "e1-linked-revision-repair-restore-rejected-v1"
    )).project;
    const repairRevisionOneBytesAfterRejectedRestore =
      await creatorPersistence.filesystem.readBuffer([
        "projects", repairProject.identity.projectId, "revisions", "000001", "files", "index.html",
      ]);
    assert(
      repairProject.status === "ready" &&
        repairProject.failureCode === null &&
        repairProject.materializations.length === 1 &&
        repairProject.exportManifest?.artifactRevision === 1 &&
        repairProject.auditEvents.filter(
          (event) => event.eventType === "prior_publication.restored"
        ).length === 1 &&
        repairRevisionOneBytesAfterRejectedRestore.equals(repairRevisionOneBytes) &&
        availabilityCalls === callsBeforeRejectedRestore.availabilityCalls &&
        generationCalls === callsBeforeRejectedRestore.generationCalls,
      "explicit rejected-revision restoration republishes only the exact prior validated bytes without provider activity"
    );
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "request-repair", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-request-repair-v1"
    )).project;
    assert(
      repairProject.status === "awaiting_repair_approval" &&
        repairProject.repair?.instructionVersion === "source-snapshot-v2" &&
        repairProject.repair.sourceArtifactRevision === 1 &&
        repairProject.repair.linkedRevisionRequestId === linkedRevisionRequest.requestId,
      "repair run is source-bound to revision 1 and the exact rejected revision request"
    );
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "approve-repair", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-approve-repair-v1"
    )).project;
    const repairInstructionIndex = providerRequests.length;
    providerOutputs.push(serverOwnedPageOutput(
      repairProjectTitle,
      "Immutable repair baseline. The reviewed linked revision proof is repaired."
    ));
    repairProject = (await creator.actOnProject(
      repairProject.identity.projectId,
      { action: "execute-repair", expectedRevision: repairProject.stateRevision },
      "e1-linked-revision-repair-execute-repair-v1"
    )).project;
    const repairInstruction = providerRequests[repairInstructionIndex]?.approvedRequestText ?? "";
    const repairedRevisionRequest = repairProject.revisionRequests[0];
    const repairRevisionOneBytesAfter = await creatorPersistence.filesystem.readBuffer([
      "projects", repairProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    const repairRevisionTwoBytes = await creatorPersistence.filesystem.readBuffer([
      "projects", repairProject.identity.projectId, "revisions", "000002", "files", "index.html",
    ]);
    assert(
      repairProject.status === "ready" &&
        repairProject.materializations.length === 2 &&
        repairProject.repair?.linkedRevisionRequestId === linkedRevisionRequest.requestId &&
        repairedRevisionRequest.rejectedAt !== null &&
        repairedRevisionRequest.completionPurpose === "repair" &&
        repairedRevisionRequest.completedAt !== null &&
        repairedRevisionRequest.completionSourceRunId === repairProject.runBindings.at(-1)?.sourceRunId &&
        repairRevisionOneBytesAfter.equals(repairRevisionOneBytes) &&
        repairInstruction.includes("Immutable repair baseline.") &&
        repairInstruction.includes(linkedRevisionBrief) &&
        repairRevisionTwoBytes.toString("utf8").includes("Immutable repair baseline.") &&
        repairRevisionTwoBytes.toString("utf8").includes("reviewed linked revision proof"),
      "source-bound repair preserves the prior bundle and completes the linked rejected revision exactly once"
    );
    assertServerOwnedTopologyPublication(repairProject, "repair", 2, "explicit provider repair");

    const failedRestoreTitle = "E1 Failed Revision Restore";
    const failedRestoreJourney = await prepareCreateJourney({
      projectTitle: failedRestoreTitle,
      message: "Create a valid publication whose later failed revision can be explicitly restored.",
      prefix: "e1-failed-revision-restore",
    });
    let failedRestoreProject = await approvePreparedProject(
      failedRestoreJourney.project,
      creator,
      "e1-failed-revision-restore"
    );
    providerOutputs.push(serverOwnedPageOutput(failedRestoreTitle, "Immutable failed-restore baseline."));
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "execute-generation", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-execute-generation-v1"
    )).project;
    const failedRestoreRevisionOneBytes = await creatorPersistence.filesystem.readBuffer([
      "projects", failedRestoreProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      {
        action: "request-revision",
        expectedRevision: failedRestoreProject.stateRevision,
        sourceArtifactRevision: 1,
        revisionBrief: "Attempt one reviewed revision whose provider failure must preserve revision 1.",
      },
      "e1-failed-revision-restore-request-revision-v1"
    )).project;
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-approve-revision-plan-v1"
    )).project;
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-approve-revision-generation-v1"
    )).project;
    providerOutputs.push(new privateAlphaProviderModule.PrivateAlphaProviderError(
      "ollama_http_error",
      "Injected deterministic local provider failure.",
      503
    ));
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-execute-revision-v1"
    )).project;
    assert(
      failedRestoreProject.status === "failed" &&
        failedRestoreProject.failureCode === "execution_failed" &&
        failedRestoreProject.materializations.length === 1 &&
        failedRestoreProject.exportManifest?.artifactRevision === 1 &&
        failedRestoreProject.revisionRequests[0].completedAt === null,
      "definitive later revision provider failure leaves the prior validated publication intact"
    );
    const callsBeforeFailedRestore = { availabilityCalls, generationCalls };
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      {
        action: "restore-prior-publication",
        expectedRevision: failedRestoreProject.stateRevision,
      },
      "e1-failed-revision-restore-prior-v1"
    )).project;
    const failedRestoreRevisionOneBytesAfter = await creatorPersistence.filesystem.readBuffer([
      "projects", failedRestoreProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    assert(
      failedRestoreProject.status === "ready" &&
        failedRestoreProject.failureCode === null &&
        failedRestoreProject.materializations.length === 1 &&
        failedRestoreProject.exportManifest?.artifactRevision === 1 &&
        failedRestoreRevisionOneBytesAfter.equals(failedRestoreRevisionOneBytes) &&
        failedRestoreProject.auditEvents.some(
          (event) => event.eventType === "prior_publication.restored" && event.artifactRevision === 1
        ) &&
        availabilityCalls === callsBeforeFailedRestore.availabilityCalls &&
        generationCalls === callsBeforeFailedRestore.generationCalls,
      "explicit failed-revision restoration returns to the exact prior publication without retry"
    );

    const failedFirstRevisionRequest = failedRestoreProject.revisionRequests[0];
    const failedFirstRevisionBinding = failedRestoreProject.runBindings.find(
      (binding) => binding.operationSlot === "revision-1"
    );
    const callsBeforeSameSourceSecondRevision = { availabilityCalls, generationCalls };
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      {
        action: "request-revision",
        expectedRevision: failedRestoreProject.stateRevision,
        sourceArtifactRevision: 1,
        revisionBrief:
          "Prepare a distinct second reviewed revision from the same restored revision 1 source.",
      },
      "e1-failed-revision-restore-request-revision-v2"
    )).project;
    const failedSecondRevisionRequest = failedRestoreProject.revisionRequests.at(-1);
    assert(
      failedFirstRevisionRequest &&
        failedFirstRevisionBinding &&
        failedRestoreProject.status === "awaiting_revision_plan_approval" &&
        failedRestoreProject.revisionRequests.length === 2 &&
        failedSecondRevisionRequest?.revisionNumber === 2 &&
        failedSecondRevisionRequest.sourceArtifactRevision === 1 &&
        failedSecondRevisionRequest.targetArtifactRevision === 2 &&
        failedSecondRevisionRequest.planDigest !== failedFirstRevisionRequest.planDigest,
      "restored publication prepares a distinct second bounded revision from the same source artifact"
    );
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-approve-revision-plan-v2"
    )).project;
    const failedSecondRevisionBinding = failedRestoreProject.runBindings.find(
      (binding) => binding.operationSlot === "revision-2"
    );
    const failedSecondBoundRequest = failedRestoreProject.revisionRequests.at(-1);
    assert(
      failedRestoreProject.status === "awaiting_revision_generation_approval" &&
        failedSecondRevisionBinding?.purpose === "revision" &&
        failedSecondRevisionBinding.sourceRunId !== failedFirstRevisionBinding.sourceRunId &&
        failedSecondRevisionBinding.sourceArtifactRevision === 1 &&
        failedSecondRevisionBinding.requestEnvelopeDigest ===
          failedSecondBoundRequest?.instructionDigest &&
        failedSecondRevisionBinding.boundAt === failedSecondBoundRequest?.runBoundAt &&
        failedRestoreProject.approvalPacket?.privateAlphaRunId ===
          failedSecondRevisionBinding.sourceRunId &&
        failedRestoreProject.approvalPacket.planDigest ===
          failedSecondBoundRequest?.planDigest &&
        failedRestoreProject.approvalPacket.planDigest !==
          failedFirstRevisionRequest.planDigest,
      "second revision plan binds its exact revision-2 run and plan digest rather than the earlier same-source request"
    );
    failedRestoreProject = (await creator.actOnProject(
      failedRestoreProject.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: failedRestoreProject.stateRevision },
      "e1-failed-revision-restore-approve-revision-generation-v2"
    )).project;
    const persistedSecondRevisionApproval = await creatorPersistence.readProject(
      failedRestoreProject.identity.projectId
    );
    const persistedSecondRevisionRequest =
      persistedSecondRevisionApproval.revisionRequests.at(-1);
    const persistedSecondRevisionBinding = persistedSecondRevisionApproval.runBindings.find(
      (binding) => binding.operationSlot === "revision-2"
    );
    assert(
      persistedSecondRevisionApproval.status === "revision_generation_approved" &&
        persistedSecondRevisionApproval.approvalPacket?.status === "approved" &&
        persistedSecondRevisionApproval.approvalPacket.purpose === "revision" &&
        persistedSecondRevisionApproval.approvalPacket.privateAlphaRunId ===
          persistedSecondRevisionBinding?.sourceRunId &&
        persistedSecondRevisionApproval.approvalPacket.planDigest ===
          persistedSecondRevisionRequest?.planDigest &&
        persistedSecondRevisionApproval.approvalPacket.planDigest !==
          persistedSecondRevisionApproval.revisionRequests[0].planDigest &&
        persistedSecondRevisionBinding?.operationSlot === "revision-2" &&
        persistedSecondRevisionRequest?.revisionNumber === 2 &&
        persistedSecondRevisionRequest.generationApprovedAt !== null &&
        persistedSecondRevisionRequest.executionRequestedAt === null,
      "persisted approval packet reloads against the exact second same-source revision operation slot and plan"
    );
    failedRestoreProject = (await creator.actOnProject(
      persistedSecondRevisionApproval.identity.projectId,
      { action: "cancel", expectedRevision: persistedSecondRevisionApproval.stateRevision },
      "e1-failed-revision-restore-cancel-revision-v2"
    )).project;
    const persistedCanceledSecondRevision = await creatorPersistence.readProject(
      failedRestoreProject.identity.projectId
    );
    const canceledSecondRevisionBinding = persistedCanceledSecondRevision.runBindings.find(
      (binding) => binding.operationSlot === "revision-2"
    );
    assert(
      persistedCanceledSecondRevision.status === "canceled" &&
        persistedCanceledSecondRevision.approvalPacket?.status === "canceled" &&
        persistedCanceledSecondRevision.approvalPacket.privateAlphaRunId ===
          canceledSecondRevisionBinding?.sourceRunId &&
        persistedCanceledSecondRevision.approvalPacket.planDigest ===
          persistedCanceledSecondRevision.revisionRequests[1].planDigest &&
        canceledSecondRevisionBinding?.executionAttempted === false &&
        canceledSecondRevisionBinding.executionRequestedAt === null &&
        persistedCanceledSecondRevision.revisionRequests[1].executionRequestedAt === null &&
        persistedCanceledSecondRevision.materializations.length === 1 &&
        availabilityCalls === callsBeforeSameSourceSecondRevision.availabilityCalls &&
        generationCalls === callsBeforeSameSourceSecondRevision.generationCalls,
      "second same-source revision cancels before execution with no additional provider work"
    );

    const stoppedRestoreTitle = "E1 Stopped Revision Restore";
    const stoppedRestoreJourney = await prepareCreateJourney({
      projectTitle: stoppedRestoreTitle,
      message: "Create a valid publication whose later stopped revision can be explicitly restored.",
      prefix: "e1-stopped-revision-restore",
    });
    let stoppedRestoreProject = await approvePreparedProject(
      stoppedRestoreJourney.project,
      creator,
      "e1-stopped-revision-restore"
    );
    providerOutputs.push(serverOwnedPageOutput(stoppedRestoreTitle, "Immutable stopped-restore baseline."));
    stoppedRestoreProject = (await creator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      { action: "execute-generation", expectedRevision: stoppedRestoreProject.stateRevision },
      "e1-stopped-revision-restore-execute-generation-v1"
    )).project;
    const stoppedRestoreRevisionOneBytes = await creatorPersistence.filesystem.readBuffer([
      "projects", stoppedRestoreProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    stoppedRestoreProject = (await creator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      {
        action: "request-revision",
        expectedRevision: stoppedRestoreProject.stateRevision,
        sourceArtifactRevision: 1,
        revisionBrief: "Attempt one reviewed revision that Stop must fence before provider admission.",
      },
      "e1-stopped-revision-restore-request-revision-v1"
    )).project;
    stoppedRestoreProject = (await creator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      { action: "approve-revision-plan", expectedRevision: stoppedRestoreProject.stateRevision },
      "e1-stopped-revision-restore-approve-revision-plan-v1"
    )).project;
    stoppedRestoreProject = (await creator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      { action: "approve-revision-generation", expectedRevision: stoppedRestoreProject.stateRevision },
      "e1-stopped-revision-restore-approve-revision-generation-v1"
    )).project;
    let stoppedRevisionExecutionEntered;
    const stoppedRevisionExecutionReady = new Promise((resolve) => {
      stoppedRevisionExecutionEntered = resolve;
    });
    let releaseStoppedRevisionExecution;
    const stoppedRevisionExecutionRelease = new Promise((resolve) => {
      releaseStoppedRevisionExecution = resolve;
    });
    const stoppedRevisionLifecycle = {
      ...creatorLifecycle,
      async executeRun(input) {
        stoppedRevisionExecutionEntered();
        await stoppedRevisionExecutionRelease;
        return creatorLifecycle.executeRun(input);
      },
    };
    const stoppedRevisionCreator = creatorServiceModule.createCreatorService({
      persistence: creatorPersistence,
      lifecycle: stoppedRevisionLifecycle,
    });
    const callsBeforeStoppedRevision = { availabilityCalls, generationCalls };
    const stoppedRevisionExecutionPromise = stoppedRevisionCreator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      { action: "execute-revision-generation", expectedRevision: stoppedRestoreProject.stateRevision },
      "e1-stopped-revision-restore-execute-revision-v1"
    );
    await stoppedRevisionExecutionReady;
    stoppedRestoreProject = await stoppedRevisionCreator.getProject(
      stoppedRestoreProject.identity.projectId
    );
    assert(
      stoppedRestoreProject.status === "revising",
      "stopped later revision durably records execution before the provider-admission seam"
    );
    stoppedRestoreProject = (await stoppedRevisionCreator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      { action: "stop-generation", expectedRevision: stoppedRestoreProject.stateRevision },
      "e1-stopped-revision-restore-stop-v1"
    )).project;
    assert(
      stoppedRestoreProject.status === "stopping",
      "Stop durably wins the later-revision race before provider admission"
    );
    releaseStoppedRevisionExecution();
    stoppedRestoreProject = (await stoppedRevisionExecutionPromise).project;
    assert(
      stoppedRestoreProject.status === "stopped" &&
        stoppedRestoreProject.materializations.length === 1 &&
        stoppedRestoreProject.exportManifest?.artifactRevision === 1 &&
        availabilityCalls === callsBeforeStoppedRevision.availabilityCalls &&
        generationCalls === callsBeforeStoppedRevision.generationCalls,
      "stopped later revision preserves the prior publication and reaches no provider boundary"
    );
    stoppedRestoreProject = (await creator.actOnProject(
      stoppedRestoreProject.identity.projectId,
      {
        action: "restore-prior-publication",
        expectedRevision: stoppedRestoreProject.stateRevision,
      },
      "e1-stopped-revision-restore-prior-v1"
    )).project;
    const stoppedRestoreRevisionOneBytesAfter = await creatorPersistence.filesystem.readBuffer([
      "projects", stoppedRestoreProject.identity.projectId, "revisions", "000001", "files", "index.html",
    ]);
    assert(
      stoppedRestoreProject.status === "ready" &&
        stoppedRestoreProject.failureCode === null &&
        stoppedRestoreProject.materializations.length === 1 &&
        stoppedRestoreProject.exportManifest?.artifactRevision === 1 &&
        stoppedRestoreRevisionOneBytesAfter.equals(stoppedRestoreRevisionOneBytes) &&
        stoppedRestoreProject.auditEvents.some(
          (event) => event.eventType === "prior_publication.restored" && event.artifactRevision === 1
        ) &&
        availabilityCalls === callsBeforeStoppedRevision.availabilityCalls &&
        generationCalls === callsBeforeStoppedRevision.generationCalls,
      "explicit stopped-revision restoration returns to exact prior validated bytes without generation"
    );

    const providerCallsBeforeCancellation = { availabilityCalls, generationCalls };
    const planOnlyCancellation = await prepareCreateJourney({
      projectTitle: "E1 Plan Cancellation",
      message: "Prepare a plan that will be canceled before run binding.",
      prefix: "e1-plan-only-cancel",
    });
    let canceledProject = (await creator.actOnProject(
      planOnlyCancellation.project.identity.projectId,
      { action: "cancel", expectedRevision: planOnlyCancellation.project.stateRevision },
      "e1-plan-only-cancel-action-v1"
    )).project;
    assert(
      canceledProject.status === "canceled" &&
        canceledProject.runBindings.length === 0 &&
        canceledProject.approvalPacket === null,
      "plan-only cancellation records a terminal cancellation without creating a run"
    );
    const boundCancellation = await prepareCreateJourney({
      projectTitle: "E1 Bound Plan Cancellation",
      message: "Prepare and bind a plan that will be canceled before generation approval.",
      prefix: "e1-bound-plan-cancel",
    });
    let boundCanceledProject = (await creator.actOnProject(
      boundCancellation.project.identity.projectId,
      { action: "approve-plan", expectedRevision: boundCancellation.project.stateRevision },
      "e1-bound-plan-cancel-approve-plan-v1"
    )).project;
    assert(
      boundCanceledProject.status === "awaiting_generation_approval" &&
        boundCanceledProject.runBindings.length === 1,
      "bound cancellation fixture owns one exact unexecuted local run"
    );
    boundCanceledProject = (await creator.actOnProject(
      boundCanceledProject.identity.projectId,
      { action: "cancel", expectedRevision: boundCanceledProject.stateRevision },
      "e1-bound-plan-cancel-action-v1"
    )).project;
    assert(
      boundCanceledProject.status === "canceled" &&
        boundCanceledProject.approvalPacket?.status === "canceled" &&
        boundCanceledProject.runBindings.length === 1 &&
        boundCanceledProject.materializations.length === 0,
      "bound-plan cancellation cancels the exact run without generation or artifact evidence"
    );
    assert(
      availabilityCalls === providerCallsBeforeCancellation.availabilityCalls &&
        generationCalls === providerCallsBeforeCancellation.generationCalls,
      "plan-only and bound-plan cancellation reach no provider boundary"
    );

    let delayedExecutionEntered;
    const delayedExecutionReady = new Promise((resolve) => { delayedExecutionEntered = resolve; });
    let releaseDelayedExecution;
    const delayedExecutionRelease = new Promise((resolve) => { releaseDelayedExecution = resolve; });
    const delayedLifecycle = {
      ...creatorLifecycle,
      async executeRun(input) {
        delayedExecutionEntered();
        await delayedExecutionRelease;
        return creatorLifecycle.executeRun(input);
      },
    };
    const stopBeforeAdmissionCreator = creatorServiceModule.createCreatorService({
      persistence: creatorPersistence,
      lifecycle: delayedLifecycle,
    });
    const stopBeforeAdmissionHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator: stopBeforeAdmissionCreator,
      persistence: handoffPersistence,
    });
    const stopBeforeAdmissionJourney = await prepareCreateJourney({
      projectTitle: "E1 Stop Before Admission",
      message: "Stop must win before provider admission for this exact local generation.",
      prefix: "e1-stop-before-admission",
      creatorService: stopBeforeAdmissionCreator,
      handoffService: stopBeforeAdmissionHandoff,
    });
    let stopBeforeAdmissionProject = await approvePreparedProject(
      stopBeforeAdmissionJourney.project,
      stopBeforeAdmissionCreator,
      "e1-stop-before-admission"
    );
    const callsBeforeAdmissionStop = { availabilityCalls, generationCalls };
    const stoppedExecutionPromise = stopBeforeAdmissionCreator.actOnProject(
      stopBeforeAdmissionProject.identity.projectId,
      { action: "execute-generation", expectedRevision: stopBeforeAdmissionProject.stateRevision },
      "e1-stop-before-admission-execute-v1"
    );
    await delayedExecutionReady;
    stopBeforeAdmissionProject = await stopBeforeAdmissionCreator.getProject(
      stopBeforeAdmissionProject.identity.projectId
    );
    assert(
      stopBeforeAdmissionProject.status === "generating",
      "execution intent is durable before the delayed provider-start seam"
    );
    const stoppingBeforeAdmission = await stopBeforeAdmissionCreator.actOnProject(
      stopBeforeAdmissionProject.identity.projectId,
      { action: "stop-generation", expectedRevision: stopBeforeAdmissionProject.stateRevision },
      "e1-stop-before-admission-stop-v1"
    );
    assert(
      stoppingBeforeAdmission.project.status === "stopping",
      "Stop durably wins the project-state race before provider admission"
    );
    releaseDelayedExecution();
    stopBeforeAdmissionProject = (await stoppedExecutionPromise).project;
    assert(
      stopBeforeAdmissionProject.status === "stopped" &&
        stopBeforeAdmissionProject.materializations.length === 0 &&
        stopBeforeAdmissionProject.validation === null &&
        stopBeforeAdmissionProject.auditEvents.some((event) => event.eventType === "generation.stopped"),
      "Stop-before-admission reaches an honest stopped state without validation or materialization"
    );
    assert(
      availabilityCalls === callsBeforeAdmissionStop.availabilityCalls &&
        generationCalls === callsBeforeAdmissionStop.generationCalls,
      "Stop-before-admission performs zero availability probes and zero provider generation"
    );

    const lateOutputJourney = await prepareCreateJourney({
      projectTitle: "E1 Late Output Stop",
      message: "Generate one local result whose late output must be discarded after Stop.",
      prefix: "e1-late-output-stop",
    });
    let lateOutputProject = await approvePreparedProject(
      lateOutputJourney.project,
      creator,
      "e1-late-output-stop"
    );
    let signalHeldGeneration;
    const heldGenerationStarted = new Promise((resolve) => { signalHeldGeneration = resolve; });
    let releaseHeldGeneration;
    const heldGenerationRelease = new Promise((resolve) => { releaseHeldGeneration = resolve; });
    heldGeneration = {
      marker: "E1 Late Output Stop",
      started: signalHeldGeneration,
      release: heldGenerationRelease,
    };
    providerOutputs.push(serverOwnedPageOutput("E1 Late Output Stop", "This late output must be discarded."));
    const callsBeforeLateOutput = { availabilityCalls, generationCalls };
    const lateOutputExecutionPromise = creator.actOnProject(
      lateOutputProject.identity.projectId,
      { action: "execute-generation", expectedRevision: lateOutputProject.stateRevision },
      "e1-late-output-stop-execute-v1"
    );
    await heldGenerationStarted;
    lateOutputProject = await creator.getProject(lateOutputProject.identity.projectId);
    assert(
      lateOutputProject.status === "generating",
      "late-output fixture reaches the one admitted in-flight provider call"
    );
    const lateOutputStopping = await creator.actOnProject(
      lateOutputProject.identity.projectId,
      { action: "stop-generation", expectedRevision: lateOutputProject.stateRevision },
      "e1-late-output-stop-action-v1"
    );
    assert(lateOutputStopping.project.status === "stopping", "Stop wins while the provider output is in flight");
    releaseHeldGeneration();
    lateOutputProject = (await lateOutputExecutionPromise).project;
    heldGeneration = null;
    assert(
      lateOutputProject.status === "stopped" &&
        lateOutputProject.artifactProposal === null &&
        lateOutputProject.validation === null &&
        lateOutputProject.materializations.length === 0 &&
        lateOutputProject.preview.status === "inactive" &&
        lateOutputProject.auditEvents.some((event) => event.eventType === "output.discarded"),
      "provider output arriving after Stop is discarded without success or preview evidence"
    );
    assert(
      availabilityCalls === callsBeforeLateOutput.availabilityCalls + 1 &&
        generationCalls === callsBeforeLateOutput.generationCalls + 1 &&
        providerOutputs.length === 0,
      "late-output Stop uses exactly the already-admitted attempt and performs no retry"
    );

    const ambiguousConversationResult = await chat.createConversation(
      {
        message:
          "Prepare a site plan whose first response will be lost after durable publication.\n" +
          "Preserve this second line as exact reviewed recovery evidence.",
      },
      "e1-chat-create-ambiguous-handoff-v1"
    );
    const ambiguousConversation = ambiguousConversationResult.conversation;
    const ambiguousBody = buildCreateHandoffBody(
      ambiguousConversation,
      "E1 Ambiguous Handoff",
      ambiguousConversation.turns[0].userMessage.text
    );
    let ambiguousCreatorCalls = 0;
    const responseLossCreator = {
      ...creator,
      async prepareProjectPlan(body, idempotencyKey) {
        ambiguousCreatorCalls += 1;
        await creator.prepareProjectPlan(body, idempotencyKey);
        throw new Error("Injected response loss after durable Creator plan publication.");
      },
    };
    const responseLossHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator: responseLossCreator,
      persistence: handoffPersistence,
    });
    await expectFailure(
      () => responseLossHandoff.prepare(
        ambiguousConversation.conversationId,
        ambiguousBody,
        "e1-handoff-ambiguous-first-attempt-v1"
      ),
      "creator_result_ambiguous",
      "lost handoff response remains visibly ambiguous and explicitly recoverable",
      503
    );
    const ambiguousSummaries = await handoff.listConversation(
      ambiguousConversation.conversationId,
      64
    );
    const ambiguousSummary = ambiguousSummaries[0];
    assert(
      ambiguousCreatorCalls === 1 &&
        ambiguousSummaries.length === 1 &&
        ambiguousSummary.status === "preparing" &&
        ambiguousSummary.resultingProjectStatus === null,
      "response loss preserves one preparing handoff without claiming plan success"
    );
    let advancedAmbiguousConversation = (await chat.actOnConversation(
      ambiguousConversation.conversationId,
      {
        action: "cancel-turn",
        expectedRevision: ambiguousConversation.revision,
        reason: "Close the original turn before appending later recovery context.",
      },
      "e1-chat-cancel-before-later-append-v1"
    )).conversation;
    advancedAmbiguousConversation = (await chat.actOnConversation(
      advancedAmbiguousConversation.conversationId,
      {
        action: "append-turn",
        expectedRevision: advancedAmbiguousConversation.revision,
        message: "Later context was appended.\nThe original multiline source remains the handoff authority.",
        contextMode: "none",
      },
      "e1-chat-later-append-before-handoff-resume-v1"
    )).conversation;
    assert(
      advancedAmbiguousConversation.revision > ambiguousConversation.revision &&
        advancedAmbiguousConversation.turns.length === 2 &&
        advancedAmbiguousConversation.turns[0].userMessage.text === ambiguousBody.description,
      "later multiline chat append preserves the exact earlier handoff source and advances only conversation evidence"
    );
    const reviewedAmbiguous = await handoff.review(
      ambiguousConversation.conversationId,
      ambiguousSummary.handoffId,
      {
        action: "review",
        expectedHandoffRecordDigest: ambiguousSummary.recordDigest,
        acknowledgement: "reveal-exact-reviewed-request",
      }
    );
    assert(
      reviewedAmbiguous.resumable &&
        reviewedAmbiguous.reviewedRequest.projectTitle === "E1 Ambiguous Handoff" &&
        reviewedAmbiguous.reviewedRequest.description === ambiguousBody.description,
      "explicit review reveals the exact persisted request before resume"
    );
    const restartedAmbiguousHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator,
      persistence: handoffPersistence,
    });
    const resumedAmbiguous = await restartedAmbiguousHandoff.resume(
      ambiguousConversation.conversationId,
      ambiguousSummary.handoffId,
      {
        action: "resume",
        expectedHandoffRecordDigest: reviewedAmbiguous.recordDigest,
        reviewedRequestDigest: reviewedAmbiguous.reviewedRequest.handoffRequestDigest,
        acknowledgement: "resume-exact-reviewed-request",
      },
      "e1-handoff-ambiguous-explicit-resume-v1"
    );
    assert(
      resumedAmbiguous.handoff.status === "prepared" &&
        resumedAmbiguous.project.status === "awaiting_plan_approval" &&
        resumedAmbiguous.project.runBindingCount === 0 &&
        ambiguousCreatorCalls === 1 &&
        resumedAmbiguous.handoff.source.conversationRevision === ambiguousConversation.revision,
      "fresh-service explicit resume reconciles the exact multiline source after a later chat append without duplicate creation"
    );

    const failedConversationResult = await chat.createConversation(
      { message: "Prepare a handoff whose definitive Creator conflict must become terminal evidence." },
      "e1-chat-create-definitive-failure-v1"
    );
    const failedConversation = failedConversationResult.conversation;
    const failedBody = buildCreateHandoffBody(
      failedConversation,
      "E1 Definitive Handoff Failure",
      failedConversation.turns[0].userMessage.text
    );
    const definitiveFailureCreator = {
      ...creator,
      async prepareProjectPlan() {
        throw new creatorServiceModule.CreatorServiceError(
          409,
          "idempotency_conflict",
          "Injected definitive Creator request conflict."
        );
      },
    };
    const definitiveFailureHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator: definitiveFailureCreator,
      persistence: handoffPersistence,
    });
    await expectFailure(
      () => definitiveFailureHandoff.prepare(
        failedConversation.conversationId,
        failedBody,
        "e1-handoff-definitive-failure-v1"
      ),
      "idempotency_conflict",
      "definitive Creator 4xx failure is returned without ambiguous success",
      409
    );
    const failedSummary = (await handoff.listConversation(
      failedConversation.conversationId,
      64
    ))[0];
    assert(
      failedSummary.status === "failed" &&
        failedSummary.failureStatus === 409 &&
        failedSummary.failureCode === "idempotency_conflict" &&
        failedSummary.resultingProjectStatus === null,
      "definitive Creator 4xx failure becomes one sealed terminal failed record"
    );
    await expectFailure(
      () => handoff.resume(
        failedConversation.conversationId,
        failedSummary.handoffId,
        {
          action: "resume",
          expectedHandoffRecordDigest: failedSummary.recordDigest,
          reviewedRequestDigest: failedSummary.handoffRequestDigest,
          acknowledgement: "resume-exact-reviewed-request",
        },
        "e1-handoff-definitive-failure-resume-v1"
      ),
      "idempotency_conflict",
      "terminal failed handoff cannot be resumed into hidden Creator mutation",
      409
    );

    let deletionRaceConversation = (await chat.createConversation(
      { message: "Prepare one plan whose durable finalizer races confirmed source-chat deletion." },
      "e1-chat-create-finalizer-delete-race-v1"
    )).conversation;
    deletionRaceConversation = (await chat.actOnConversation(
      deletionRaceConversation.conversationId,
      {
        action: "cancel-turn",
        expectedRevision: deletionRaceConversation.revision,
        reason: "Make the source conversation terminal for the deletion race.",
      },
      "e1-chat-cancel-finalizer-delete-race-v1"
    )).conversation;
    const deletionRaceBody = buildCreateHandoffBody(
      deletionRaceConversation,
      "E1 Finalizer Delete Race",
      deletionRaceConversation.turns[0].userMessage.text
    );
    let signalRacePlanPublished;
    const racePlanPublished = new Promise((resolve) => { signalRacePlanPublished = resolve; });
    let releaseRaceFinalizer;
    const raceFinalizerRelease = new Promise((resolve) => { releaseRaceFinalizer = resolve; });
    const delayedFinalizerCreator = {
      ...creator,
      async prepareProjectPlan(body, idempotencyKey) {
        const result = await creator.prepareProjectPlan(body, idempotencyKey);
        signalRacePlanPublished();
        await raceFinalizerRelease;
        return result;
      },
    };
    const delayedFinalizerHandoff = handoffServiceModule.createJarvisCreatorHandoffService({
      chat,
      creator: delayedFinalizerCreator,
      persistence: handoffPersistence,
    });
    const finalizerRacePromise = delayedFinalizerHandoff.prepare(
      deletionRaceConversation.conversationId,
      deletionRaceBody,
      "e1-handoff-finalizer-delete-race-v1"
    );
    await racePlanPublished;
    const deletionRaceResult = await chat.actOnConversation(
      deletionRaceConversation.conversationId,
      {
        action: "delete-conversation",
        expectedRevision: deletionRaceConversation.revision,
        confirmationConversationId: deletionRaceConversation.conversationId,
      },
      "e1-chat-delete-during-handoff-finalizer-v1"
    );
    assert(
      deletionRaceResult.deleted === true,
      "source chat deletion completes only after the Creator plan has durable publication evidence"
    );
    releaseRaceFinalizer();
    const finalizedDeletionRace = await finalizerRacePromise;
    const finalizedDeletionRaceProject = await creator.getProject(
      finalizedDeletionRace.project.projectId
    );
    const finalizedDeletionRaceSummary = await handoff.getSummary(
      deletionRaceConversation.conversationId,
      finalizedDeletionRace.handoff.handoffId
    );
    assert(
      finalizedDeletionRace.handoff.status === "prepared" &&
        finalizedDeletionRaceProject.status === "awaiting_plan_approval" &&
        finalizedDeletionRaceSummary.status === "prepared" &&
        finalizedDeletionRaceSummary.projectId === finalizedDeletionRaceProject.identity.projectId,
      "handoff finalizer and source-chat deletion race leaves no orphan Creator project"
    );
    await expectFailure(
      () => chat.getConversation(deletionRaceConversation.conversationId),
      "conversation_not_found",
      "deleted source chat remains deleted after its committed handoff finalizes",
      404
    );

    const concurrentConversationResult = await chat.createConversation(
      { message: "Prepare one semantic site plan under bounded concurrent identical requests." },
      "e1-chat-create-concurrent-handoff-v1"
    );
    const concurrentConversation = concurrentConversationResult.conversation;
    const concurrentBody = buildCreateHandoffBody(
      concurrentConversation,
      "E1 Concurrent Handoff",
      concurrentConversation.turns[0].userMessage.text
    );
    const projectCountBeforeConcurrentPrepare = (await creator.listProjects(256)).length;
    const concurrentSettled = await Promise.allSettled(
      Array.from({ length: 12 }, (_, index) => handoff.prepare(
        concurrentConversation.conversationId,
        concurrentBody,
        `e1-handoff-concurrent-${String(index).padStart(2, "0")}-v1`
      ))
    );
    const concurrentDirectResults = concurrentSettled
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const concurrentAmbiguousResults = concurrentSettled
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);
    assert(
      concurrentDirectResults.length >= 1 &&
        concurrentAmbiguousResults.every((error) =>
          (error?.status === 503 && error?.code === "creator_result_ambiguous") ||
          (error?.status === 409 && error?.code === "mutation_busy")
        ) &&
        new Set(concurrentDirectResults.map((result) => result.handoff.handoffId)).size === 1 &&
        new Set(concurrentDirectResults.map((result) => result.project.projectId)).size === 1 &&
        concurrentDirectResults.every((result) => result.handoff.status === "prepared") &&
        (await creator.listProjects(256)).length === projectCountBeforeConcurrentPrepare + 1,
      "concurrent first-wave prepares converge or reject contenders with bounded ambiguity or mutation_busy evidence"
    );
    const concurrentResults = await Promise.all(
      Array.from({ length: 12 }, (_, index) => handoff.prepare(
        concurrentConversation.conversationId,
        concurrentBody,
        `e1-handoff-concurrent-${String(index).padStart(2, "0")}-v1`
      ))
    );
    assert(
      new Set(concurrentResults.map((result) => result.handoff.handoffId)).size === 1 &&
        new Set(concurrentResults.map((result) => result.project.projectId)).size === 1 &&
        concurrentResults.every((result) => result.handoff.status === "prepared" && result.replayed),
      "all concurrent contender keys replay the one sealed handoff after durable convergence"
    );
    const concurrentSummaries = await handoff.listConversation(
      concurrentConversation.conversationId,
      64
    );
    assert(
      concurrentSummaries.length === 1 &&
        concurrentSummaries[0].status === "prepared" &&
        concurrentResults.every((result) => result.replayed),
      "concurrent semantic dedupe retains one bounded conversation handoff summary"
    );
    await expectFailure(
      () => handoff.listConversation(concurrentConversation.conversationId, 65),
      "invalid_request",
      "handoff list rejects a limit above its exact catalogue window",
      400
    );
    handoffPolicyModule.assertJarvisCreatorHandoffBoundsForTesting();
    assert(true, "handoff record, claim, body, and list policy bounds are internally consistent");

    const duplicateRecordPath = path.join(
      creatorTestRoot,
      "handoffs",
      "records",
      prepared.handoff.handoffId,
      "000002.json"
    );
    const exactRecordBytes = await fsp.readFile(duplicateRecordPath);
    try {
      await fsp.writeFile(
        duplicateRecordPath,
        Buffer.from(
          exactRecordBytes.toString("utf8").replace(/^\{/u, '{"recordVersion":1,'),
          "utf8"
        )
      );
      await expectFailure(
        () => handoff.getSummary(conversation.conversationId, prepared.handoff.handoffId),
        "handoff_corrupt",
        "persisted handoff JSON with a duplicate object key is rejected fail-closed",
        503
      );
    } finally {
      await fsp.writeFile(duplicateRecordPath, exactRecordBytes);
    }
    const restoredRecordSummary = await handoff.getSummary(
      conversation.conversationId,
      prepared.handoff.handoffId
    );
    assert(
      restoredRecordSummary.recordDigest === prepared.handoff.recordDigest,
      "duplicate-key record fixture restores the exact authenticated handoff bytes"
    );

    const duplicateClaimPath = path.join(
      creatorTestRoot,
      "handoffs",
      "idempotency",
      `${prepared.handoff.idempotencyKeyHash}.json`
    );
    const exactClaimBytes = await fsp.readFile(duplicateClaimPath);
    try {
      await fsp.writeFile(
        duplicateClaimPath,
        Buffer.from(
          exactClaimBytes.toString("utf8").replace(/^\{/u, '{"recordVersion":1,'),
          "utf8"
        )
      );
      await expectFailure(
        () => handoff.prepare(conversation.conversationId, handoffBody, handoffKey),
        "handoff_corrupt",
        "persisted handoff claim JSON with a duplicate object key is rejected fail-closed",
        503
      );
    } finally {
      await fsp.writeFile(duplicateClaimPath, exactClaimBytes);
    }
    const restoredClaimReplay = await handoff.prepare(
      conversation.conversationId,
      handoffBody,
      handoffKey
    );
    assert(
      restoredClaimReplay.replayed &&
        restoredClaimReplay.handoff.recordDigest === prepared.handoff.recordDigest,
      "duplicate-key claim fixture restores the exact authenticated idempotency bytes"
    );

    const handoffClientModule = require(path.join(
      repoRoot,
      "src/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-api-client.ts"
    ));
    const blockedFetch = globalThis.fetch;
    const scriptedFetches = [];
    let scriptedFetchCallCount = 0;
    const enqueueTransportFailure = () => scriptedFetches.push({ transportFailure: true });
    const enqueueJson = (status, body, multiline = false) => scriptedFetches.push({
      status,
      body: JSON.stringify(body, null, multiline ? 2 : 0),
    });
    globalThis.fetch = async () => {
      scriptedFetchCallCount += 1;
      const next = scriptedFetches.shift();
      if (!next) throw new Error("No deterministic handoff-client response was queued.");
      if (next.transportFailure) throw new Error("Injected deterministic response loss.");
      return new Response(next.body, {
        status: next.status,
        headers: { "Content-Type": "application/json" },
      });
    };
    try {
      const ambiguousClientBase = {
        conversationId: ambiguousConversation.conversationId,
        ...ambiguousBody,
      };
      const successfulAliasInputs = Array.from({ length: 8 }, (_, index) => ({
        ...ambiguousClientBase,
        expectedConversationRevision: ambiguousBody.expectedConversationRevision + index,
      }));
      for (let index = 0; index < successfulAliasInputs.length; index += 1) {
        enqueueTransportFailure();
        await expectFailure(
          () => handoffClientModule.prepareJarvisCreatorHandoff(successfulAliasInputs[index]),
          "transport_failure",
          `ambiguous client prepare alias ${index + 1} retains its exact recovery key`,
          0
        );
      }
      const fetchesAfterEightSuccessfulAliases = scriptedFetchCallCount;
      await expectFailure(
        () => handoffClientModule.prepareJarvisCreatorHandoff({
          ...ambiguousClientBase,
          projectTitle: "E1 Ninth Alias Must Wait",
        }),
        "uncertain_handoff_limit",
        "ninth client prepare is blocked while eight ambiguous aliases remain",
        409
      );
      assert(
        scriptedFetchCallCount === fetchesAfterEightSuccessfulAliases,
        "retained-key capacity blocks the ninth prepare before any hidden request"
      );
      enqueueJson(
        resumedAmbiguous.replayed ? 200 : 201,
        { ok: true, result: resumedAmbiguous },
        true
      );
      const clientSuccessfulResume = await handoffClientModule.resumeJarvisCreatorHandoff({
        conversationId: ambiguousConversation.conversationId,
        handoffId: resumedAmbiguous.handoff.handoffId,
        expectedHandoffRecordDigest: ambiguousSummary.recordDigest,
        reviewedRequestDigest: ambiguousSummary.handoffRequestDigest,
      });
      assert(
        clientSuccessfulResume.handoff.status === "prepared" &&
          clientSuccessfulResume.handoff.handoffId === resumedAmbiguous.handoff.handoffId,
        "multiline successful recovery response retires every alias for its terminal handoff"
      );

      const failedClientBase = {
        conversationId: failedConversation.conversationId,
        ...failedBody,
      };
      const failedAliasInputs = Array.from({ length: 8 }, (_, index) => ({
        ...failedClientBase,
        expectedConversationRevision: failedBody.expectedConversationRevision + index,
      }));
      for (let index = 0; index < failedAliasInputs.length; index += 1) {
        enqueueTransportFailure();
        await expectFailure(
          () => handoffClientModule.prepareJarvisCreatorHandoff(failedAliasInputs[index]),
          "transport_failure",
          `post-success alias capacity slot ${index + 1} proves prior aliases were all retired`,
          0
        );
      }
      const fetchesAfterEightFailedAliases = scriptedFetchCallCount;
      await expectFailure(
        () => handoffClientModule.prepareJarvisCreatorHandoff({
          ...failedClientBase,
          projectTitle: "E1 Definitive Ninth Alias Must Wait",
        }),
        "uncertain_handoff_limit",
        "ninth client prepare is blocked before definitive-failure recovery",
        409
      );
      assert(
        scriptedFetchCallCount === fetchesAfterEightFailedAliases,
        "definitive-failure alias capacity also blocks before fetch"
      );
      enqueueJson(409, {
        ok: false,
        error: {
          code: failedSummary.failureCode,
          message: failedSummary.failureMessage,
        },
      }, true);
      enqueueJson(200, { ok: true, handoff: failedSummary }, true);
      await expectFailure(
        () => handoffClientModule.resumeJarvisCreatorHandoff({
          conversationId: failedConversation.conversationId,
          handoffId: failedSummary.handoffId,
          expectedHandoffRecordDigest: failedSummary.recordDigest,
          reviewedRequestDigest: failedSummary.handoffRequestDigest,
        }),
        failedSummary.failureCode,
        "definitive failed resume confirms terminal evidence and retires every retained alias",
        failedSummary.failureStatus
      );
      enqueueJson(
        resumedAmbiguous.replayed ? 200 : 201,
        { ok: true, result: resumedAmbiguous },
        true
      );
      const ninthAfterDefinitiveResume = await handoffClientModule.prepareJarvisCreatorHandoff(
        successfulAliasInputs[0]
      );
      assert(
        ninthAfterDefinitiveResume.handoff.status === "prepared" &&
          ninthAfterDefinitiveResume.handoff.handoffId === resumedAmbiguous.handoff.handoffId &&
          scriptedFetches.length === 0,
        "a ninth operation proceeds after definitive-failed resume retires all eight ambiguous aliases"
      );
    } finally {
      globalThis.fetch = blockedFetch;
    }

    const genericPrivateAlphaStore = privateAlphaStoreModule.createPrivateAlphaStoreForTesting(
      suffix,
      {
        runtimeProfile: privateAlphaValidationModule.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
        providerAdapter: provider,
      }
    );
    const creatorOwnedRunIds = new Set(
      (await creator.listProjects(256)).flatMap((candidate) =>
        candidate.runBindings.map((binding) => binding.sourceRunId)
      )
    );
    const genericRunSummaries = await genericPrivateAlphaStore.listRuns("50");
    assert(
      creatorOwnedRunIds.size > 0 &&
        genericRunSummaries.every((summary) => !creatorOwnedRunIds.has(summary.runId)),
      "generic Private Alpha run listing hides every Creator-owned run"
    );
    const oneCreatorOwnedRunId = [...creatorOwnedRunIds][0];
    try {
      await genericPrivateAlphaStore.getRun(oneCreatorOwnedRunId);
      throw new Error("generic Private Alpha get unexpectedly revealed a Creator-owned run");
    } catch (error) {
      assert(
        error instanceof privateAlphaStoreModule.PrivateAlphaStoreError &&
          error.status === 404,
        "generic Private Alpha get returns not-found for a Creator-owned run"
      );
    }

    activityTrap.assertZeroActivity();
    assert(
      activityCounters.fetch === 0 &&
        activityCounters.externalNetwork === 0 &&
        activityCounters.providerTransport === 0 &&
        activityCounters.credentialResolution === 0 &&
        activityCounters.liveGeneration === 0,
      "E1 deterministic integration traps real network, provider transport, credentials, and live generation"
    );
    assert(
      await snapshotTree(productionCreatorRoot) === productionCreatorBefore,
      "E1 integration leaves production Creator persistence byte-identical"
    );
    assert(
      await snapshotTree(productionPrivateAlphaRoot) === productionPrivateAlphaBefore,
      "E1 integration leaves production Private Alpha persistence byte-identical"
    );
  } finally {
    if (process.env.CODEXFORGE_E1_PRESERVE_FAILED_TEST_ROOT !== "1") {
      await handoffPersistence.cleanupTestRoot().catch(() => undefined);
      await creatorPersistence.cleanupTestRoot().catch(() => undefined);
      await chatPersistence.cleanupTestData().catch(() => undefined);
      await fsp.rm(privateAlphaTestRoot, { recursive: true, force: true });
    }
  }

  if (process.env.CODEXFORGE_E1_PRESERVE_FAILED_TEST_ROOT !== "1") {
    assert(
      !fs.existsSync(path.join(creatorTestRoot, "handoffs")),
      "E1 handoff evidence subtree is cleaned before isolated root teardown"
    );
    assert(!fs.existsSync(privateAlphaTestRoot), "E1 Private Alpha deterministic root is cleaned");
  }
  console.log(
    `[COUNTERS] ${activityTrap.formatCounters({ availability: availabilityCalls, generation: generationCalls })}`
  );
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
'@

$cleanupNodeScript = @'
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const repoRoot = path.resolve(process.argv[2]);
const suffix = "local-first-jarvis-website-creation-integration";
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
const ts = require(path.join(repoRoot, "node_modules", "typescript"));
require.extensions[".ts"] = function (module, filename) {
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
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
const creatorPersistenceModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-persistence.server.ts"
));
async function removeExactPrivateAlphaTestRoot() {
  const base = path.resolve(repoRoot, ".codexforge", "private-alpha-tests");
  const target = path.resolve(base, suffix);
  const relative = path.relative(base, target);
  if (
    relative !== suffix ||
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new Error("E1 cleanup target is outside its exact Private Alpha test suffix.");
  }
  const stat = await fs.promises.lstat(target).catch((error) => {
    if (error && error.code === "ENOENT") return null;
    throw error;
  });
  if (!stat) return;
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error("E1 Private Alpha cleanup target is not one owned non-link directory.");
  }
  const pending = [target];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const name of await fs.promises.readdir(current)) {
      const candidate = path.join(current, name);
      const child = await fs.promises.lstat(candidate);
      if (child.isSymbolicLink()) throw new Error("E1 Private Alpha cleanup inventory contains a link.");
      if (child.isDirectory()) pending.push(candidate);
      else if (!child.isFile()) throw new Error("E1 Private Alpha cleanup inventory contains an unsafe node.");
    }
  }
  await fs.promises.rm(target, { recursive: true, force: false });
}
(async () => {
  await creatorPersistenceModule.createCreatorPersistenceForTesting(suffix).cleanupTestRoot();
  await removeExactPrivateAlphaTestRoot();
  console.log("[PASS] exact E1 Creator and Private Alpha test-root cleanup completed in an isolated process");
})()
  .catch((error) => {
    console.error(error && error.stack ? error.stack : String(error));
    process.exitCode = 1;
  });
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-e1-jarvis-creator-integration-smoke.js"
$tempCleanupScript = Join-Path $env:TEMP "codexforge-e1-jarvis-creator-cleanup.js"
[System.IO.File]::WriteAllText($tempNodeScript, $nodeScript, [System.Text.Encoding]::ASCII)
[System.IO.File]::WriteAllText($tempCleanupScript, $cleanupNodeScript, [System.Text.Encoding]::ASCII)
try {
  & node $tempCleanupScript $root
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] E1 pre-run deterministic cleanup exited with code $LASTEXITCODE"
  }
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] E1 deterministic integration harness exited with code $LASTEXITCODE"
  }
} finally {
  if ($env:CODEXFORGE_E1_PRESERVE_FAILED_TEST_ROOT -eq '1' -and $LASTEXITCODE -ne 0) {
    $cleanupExitCode = 0
    Write-Host "[INFO] Preserving the exact failed E1 test root for bounded diagnosis."
  } else {
    & node $tempCleanupScript $root
    $cleanupExitCode = $LASTEXITCODE
  }
  Remove-Item -LiteralPath $tempNodeScript -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $tempCleanupScript -Force -ErrorAction SilentlyContinue
}
if ($cleanupExitCode -ne 0) {
  throw "[FAIL] E1 post-run deterministic cleanup exited with code $cleanupExitCode"
}
Assert-True (-not (Test-Path -LiteralPath (Join-Path $root '.codexforge\creator-tests\local-first-jarvis-website-creation-integration'))) "E1 Creator test root is absent after isolated cleanup"
Assert-True (-not (Test-Path -LiteralPath (Join-Path $root '.codexforge\private-alpha-tests\local-first-jarvis-website-creation-integration'))) "E1 Private Alpha test root is absent after deterministic cleanup"

Write-Host "[PASS] CodexForge local-first Jarvis website creation integration smoke complete."
