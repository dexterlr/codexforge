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

function Get-Text {
  param([string]$RelativePath)
  return Get-Content -Raw -LiteralPath (Join-Path $root $RelativePath)
}

Write-Host ""
Write-Host "=== CodexForge E1.1 server-owned website document topology ==="

$requiredFiles = @(
  "src/lib/codexforge/creator/creator-contract.server.ts",
  "src/lib/codexforge/creator/creator-document-topology.server.ts",
  "src/lib/codexforge/creator/creator-markup-validation.server.ts",
  "src/lib/codexforge/creator/creator-validation.server.ts",
  "src/lib/codexforge/creator/creator-types.ts",
  "src/lib/codexforge/creator/creator-persistence.server.ts",
  "src/lib/codexforge/creator/creator-service.server.ts",
  "src/lib/codexforge/creator/creator-api-client.ts",
  "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx",
  "src/app/api/codexforge/creator/projects/[projectId]/topology-repair/route.ts",
  "scripts/codexforge-creator-deterministic-activity-trap.cjs"
)
foreach ($file in $requiredFiles) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf) "E1.1 file exists: $file"
}

$contract = Get-Text "src/lib/codexforge/creator/creator-contract.server.ts"
$topology = Get-Text "src/lib/codexforge/creator/creator-document-topology.server.ts"
$markup = Get-Text "src/lib/codexforge/creator/creator-markup-validation.server.ts"
$types = Get-Text "src/lib/codexforge/creator/creator-types.ts"
$persistenceSource = Get-Text "src/lib/codexforge/creator/creator-persistence.server.ts"
$serviceSource = Get-Text "src/lib/codexforge/creator/creator-service.server.ts"
$clientSource = Get-Text "src/lib/codexforge/creator/creator-api-client.ts"
$panelSource = Get-Text "src/lib/codexforge/creator/components/WebsiteCreatorPanel.tsx"
$eligibilityRouteSource = Get-Text "src/app/api/codexforge/creator/projects/[projectId]/topology-repair/route.ts"

Assert-Contains $contract '"codexforge.creator.page.v1"' "E1.1 declares the bounded page-content response contract"
Assert-Contains $contract 'parseCreatorServerOwnedPageOutput' "E1.1 parses the page-content contract separately from legacy bundles"
Assert-Contains $contract 'Do not return index.html or any .html file.' "E1.1 tells the model that the document shell is server-owned"
Assert-Contains $contract 'primaryHeading' "E1.1 obtains one bounded primary heading as data"
Assert-Contains $markup 'CREATOR_FRAGMENT_MAXIMUM_NODES = 256' "E1.1 bounds fragment node count"
Assert-Contains $markup 'CREATOR_FRAGMENT_MAXIMUM_DEPTH = 16' "E1.1 bounds fragment depth"
Assert-Contains $markup 'validateCreatorHtmlFragment' "E1.1 validates untrusted fragments with bounded structural parsing"
Assert-Contains $topology 'next/dist/compiled/node-html-parser/index.js' "E1.1 uses the pinned structural parser for legacy extraction"
Assert-Contains $topology 'composeCreatorServerOwnedDocument' "E1.1 owns deterministic document construction"
Assert-Contains $topology 'reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology' "E1.1 exposes deterministic zero-provider historical reprocessing"
Assert-Contains $topology 'width=device-width, initial-scale=1' "E1.1 owns the exact zoom-preserving viewport"
Assert-Contains $types '"codexforge.creator.document-topology.v1"' "E1.1 versions topology canonicalization"
Assert-Contains $types '"repair-document-topology"' "E1.1 exposes a distinct explicit operator repair action"
Assert-Contains $types 'providerRequests: 0' "E1.1 provenance fixes deterministic repair provider requests at zero"
Assert-Contains $types 'automaticRepair: false' "E1.1 provenance forbids automatic repair"
Assert-Contains $types 'operatorAuthorized: true' "E1.1 provenance records explicit operator authority"
Assert-Contains $persistenceSource 'topologyRepair' "E1.1 persistence authenticates topology provenance in every revision"
Assert-Contains $serviceSource 'repairDocumentTopology' "E1.1 service owns the explicit historical repair lifecycle"
Assert-Contains $serviceSource 'lifecycle.getRun' "E1.1 service reads only the exact retained source run"
Assert-Contains $serviceSource 'providerRequests: 0' "E1.1 service fixes historical repair provider accounting at zero"
Assert-Contains $serviceSource 'topology.repair_requested' "E1.1 service records operator repair authority in audit history"
Assert-Contains $serviceSource 'topology.document_constructed' "E1.1 service records deterministic document construction"
Assert-Contains $serviceSource 'topology.repair_completed' "E1.1 service records completed transformation provenance"
Assert-Contains $serviceSource 'getTopologyRepairEligibility' "E1.1 service exposes read-only exact-source eligibility"
Assert-Contains $clientSource 'fetchCreatorTopologyRepairEligibility' "E1.1 client reads eligibility before enabling repair"
Assert-Contains $clientSource 'actionOrBody === "repair-document-topology"' "E1.1 client forbids an incomplete legacy shorthand repair action"
Assert-Contains $clientSource 'redirect: "error"' "E1.1 client refuses redirects for local creator requests"
Assert-Contains $eligibilityRouteSource 'assertCreatorLoopbackRequest' "E1.1 eligibility route remains loopback-only"
Assert-Contains $eligibilityRouteSource 'getTopologyRepairEligibility' "E1.1 eligibility route delegates to the authoritative read-only service seam"
Assert-Contains $panelSource 'CodexForge, not generated output, owns the one HTML document shell' "E1.1 UI discloses the server-owned security boundary"
Assert-Contains $panelSource 'Apply zero-provider topology repair' "E1.1 UI labels the explicit operator action truthfully"
Assert-Contains $panelSource 'topologyEligibility?.eligible !== true' "E1.1 UI disables repair until exact eligibility is proven"
Assert-Contains $panelSource 'aria-describedby={topologyRepairReasonId}' "E1.1 repair control exposes its disabled reason accessibly"
Assert-Contains $panelSource '<dt>Transformation digest</dt>' "E1.1 UI renders transformation provenance"
Assert-Contains $panelSource 'Published document construction provenance' "E1.1 UI visibly distinguishes ordinary server-owned construction provenance"
Assert-Contains $panelSource 'publishedDocumentTopology' "E1.1 UI resolves only the manifest-bound published topology transformation"
Assert-Contains $panelSource 'binding.sourceRunId === project.exportManifest?.sourceRunId' "E1.1 UI binds published topology to the active manifest source run"
Assert-Contains $panelSource 'project.exportManifest?.topologyTransformationDigest' "E1.1 UI binds published topology to the active manifest transformation digest"
Assert-Contains $panelSource '<dt>Output HTML SHA-256</dt>' "E1.1 UI renders the ordinary transformed document hash"
Assert-Contains $panelSource '<dt>Ordered operations</dt>' "E1.1 UI renders the ordinary canonicalization operations"
Assert-Contains $panelSource '<dt>Provider requests</dt>' "E1.1 UI renders zero-provider accounting"
Assert-Contains $panelSource '<dt>Operator authorized</dt>' "E1.1 UI renders explicit authority provenance"
Assert-Contains $panelSource '<dt>Automatic repair</dt>' "E1.1 UI discloses that repair was not automatic"

$nodeScript = @'
"use strict";

const assertModule = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const repoRoot = path.resolve(process.argv[2]);
const activityTrap = require(path.join(
  repoRoot,
  "scripts",
  "codexforge-creator-deterministic-activity-trap.cjs"
)).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: [],
  allowedMkdirPaths: [],
});

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

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function issueCodes(result) {
  return (result.issues || []).map((issue) => issue.code);
}

function assertRejected(result, code, message) {
  assert(result && result.ok === false, `${message} fails closed`);
  assert(issueCodes(result).includes(code), `${message} reports ${code}`);
}

function elementChildren(node) {
  return (node?.childNodes || []).filter((child) => child.tagName);
}

function tagName(node) {
  return String(node?.tagName || "").toLowerCase();
}

const contractModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-contract.server.ts"
));
const topologyModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-document-topology.server.ts"
));
const validationModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-validation.server.ts"
));
const markupModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-markup-validation.server.ts"
));
const parserImport = require(path.join(
  repoRoot,
  "node_modules/next/dist/compiled/node-html-parser/index.js"
));
const htmlParser = typeof parserImport === "function" ? { parse: parserImport } : parserImport;

const title = "E1.1 Topology Safety";
const pageResponse = {
  contractVersion: "codexforge.creator.page.v1",
  projectTitle: title,
  creatorKind: "website-browser-app",
  page: {
    language: "en-GB",
    primaryHeading: title,
    headerContent: "<p>Server-owned header content.</p>",
    navigationContent: '<ul><li><a href="#services">Services</a></li></ul>',
    mainContent: '<section id="services"><h2>Services</h2><p id="status">Ready.</p></section>',
    footerContent: "<p>Server-owned footer content.</p>",
  },
  files: [
    {
      path: "a.css",
      mediaType: "text/css",
      content: "body { color: #111111; background: #ffffff; }",
    },
    {
      path: "app.js",
      mediaType: "text/javascript",
      content: 'const status = document.querySelector("#status"); status.textContent = "Ready.";',
    },
    {
      path: "z.css",
      mediaType: "text/css",
      content: "h2 { color: #111111; }",
    },
  ],
};

const parsedPage = contractModule.parseCreatorServerOwnedPageOutput(
  JSON.stringify(pageResponse)
);
assert(parsedPage.ok === true, "page-content response parses through the strict contract");
assert(
  parsedPage.page.contractVersion === "codexforge.creator.page.v1" &&
    parsedPage.page.files.map((file) => file.path).join(",") === "a.css,app.js,z.css",
  "page-content parsing preserves one exact sorted non-HTML inventory"
);

const documentResult = topologyModule.composeCreatorServerOwnedDocument({
  page: parsedPage.page,
  approvedProjectTitle: title,
});
assert(documentResult.ok === true, "server composes a canonical document from validated page content");
const bundle = documentResult.bundle;
assert(
  bundle.files.map((file) => file.path).join(",") === "index.html,a.css,app.js,z.css",
  "canonical bundle is index-first with strict sorted asset bytes preserved"
);
const html = bundle.files[0].content;
const expectedCanonicalHtml = [
  "<!doctype html>",
  '<html lang="en-GB">',
  "<head>",
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  "<title>E1.1 Topology Safety</title>",
  '<link rel="stylesheet" href="a.css">',
  '<link rel="stylesheet" href="z.css">',
  "</head>",
  "<body>",
  "<main>",
  "<header>",
  "<h1>E1.1 Topology Safety</h1>",
  "<p>Server-owned header content.</p>",
  "<nav>",
  '<ul><li><a href="#services">Services</a></li></ul>',
  "</nav>",
  "</header>",
  '<section id="services"><h2>Services</h2><p id="status">Ready.</p></section>',
  "</main>",
  "<footer>",
  "<p>Server-owned footer content.</p>",
  "</footer>",
  '<script src="app.js" defer></script>',
  "</body>",
  "</html>",
].join("\n");
assert(html === expectedCanonicalHtml, "canonical shell bytes exactly match the server-owned v1 contract");
assert(
  documentResult.topology.canonicalizerVersion === "codexforge.creator.document-topology.v1" &&
    documentResult.topology.sourceResponseContractVersion === "server-owned-page-v1" &&
    documentResult.topology.responseContractVersion === "server-owned-page-v1" &&
    documentResult.topology.inputHtmlSha256 === null &&
    documentResult.topology.outputHtmlSha256 === sha256(html) &&
    documentResult.topologyRepairDigest === documentResult.topology.transformationDigest &&
    documentResult.topology.orderedOperations.join(",") ===
      "parse-server-owned-page-v1,validate-untrusted-fragments,derive-resource-tags-from-inventory,construct-canonical-document-shell,validate-canonical-bundle-v1",
  "canonical shell construction exposes complete deterministic transformation provenance"
);
const root = htmlParser.parse(html, { comment: false, lowerCaseTagName: true });
const htmlElements = root.querySelectorAll("html");
const headElements = root.querySelectorAll("head");
const bodyElements = root.querySelectorAll("body");
const mainElements = root.querySelectorAll("main");
const h1Elements = root.querySelectorAll("h1");
assert(
  htmlElements.length === 1 && headElements.length === 1 && bodyElements.length === 1,
  "canonical output contains exactly one server-owned html/head/body shell"
);
assert(
  mainElements.length === 1 &&
    h1Elements.length === 1 &&
    tagName(h1Elements[0].parentNode) === "header" &&
    h1Elements[0].parentNode?.parentNode === mainElements[0],
  "the sole primary h1 is structurally contained by the sole canonical main"
);
const directHeadTags = elementChildren(headElements[0]).map(tagName);
assert(
  directHeadTags.join(",") === "meta,meta,title,link,link",
  "server owns exact metadata and sorted stylesheet placement under head"
);
const charsetMeta = elementChildren(headElements[0]).filter(
  (node) => tagName(node) === "meta" && node.getAttribute("charset") !== undefined
);
const viewportMeta = elementChildren(headElements[0]).filter(
  (node) => tagName(node) === "meta" && node.getAttribute("name") === "viewport"
);
assert(
  charsetMeta.length === 1 && charsetMeta[0].getAttribute("charset") === "utf-8",
  "server emits one exact UTF-8 charset declaration"
);
assert(
  viewportMeta.length === 1 &&
    viewportMeta[0].getAttribute("content") === "width=device-width, initial-scale=1",
  "server emits the exact zoom-preserving viewport value"
);
assert(
  elementChildren(bodyElements[0]).map(tagName).join(",") === "main,footer,script" &&
    elementChildren(mainElements[0].querySelector("header")).map(tagName).join(",") === "h1,p,nav",
  "server places header-owned navigation, main, footer, and the derived script deterministically"
);
assert(
  headElements[0].querySelectorAll("link").map((node) => node.getAttribute("href")).join(",") === "a.css,z.css" &&
    bodyElements[0].querySelectorAll("script").map((node) => node.getAttribute("src")).join(",") === "app.js",
  "CSS and JavaScript tags are derived in sorted order from the local inventory"
);
assert(
  (mainElements[0].text || "").includes(title) &&
    elementChildren(mainElements[0]).map(tagName).join(",") === "header,section" &&
    h1Elements[0].parentNode === mainElements[0].querySelector("header"),
  "primary heading is server-inserted before untrusted main content"
);
const accepted = validationModule.validateCreatorProviderOutput({
  rawOutput: JSON.stringify(bundle),
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(accepted.validation.valid === true && accepted.bundle !== null, "canonical composed bundle passes every existing deterministic validator");
const serverOwnedAccepted = validationModule.validateCreatorServerOwnedProviderOutput({
  rawOutput: JSON.stringify(pageResponse),
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(
  serverOwnedAccepted.parse.ok === true &&
    serverOwnedAccepted.topology !== null &&
    serverOwnedAccepted.bundle !== null &&
    serverOwnedAccepted.validation.valid === true &&
    serverOwnedAccepted.bundle.files[0].content === expectedCanonicalHtml,
  "integrated server-owned provider validation parses, composes, and validates the exact canonical bundle"
);
const optionalLandmarksOmitted = validationModule.validateCreatorServerOwnedProviderOutput({
  rawOutput: JSON.stringify({
    ...pageResponse,
    page: {
      ...pageResponse.page,
      headerContent: null,
      navigationContent: null,
      footerContent: null,
    },
  }),
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
const optionalLandmarksRoot = htmlParser.parse(
  optionalLandmarksOmitted.bundle?.files[0]?.content ?? "",
  { comment: false, lowerCaseTagName: true }
);
assert(
  optionalLandmarksOmitted.validation.valid === true &&
    optionalLandmarksOmitted.validation.issues.some(
      (issue) => issue.code === "a11y.optional_page_landmarks" && issue.severity === "warning"
    ) &&
    optionalLandmarksRoot.querySelectorAll("main").length === 1 &&
    optionalLandmarksRoot.querySelectorAll("h1").length === 1 &&
    optionalLandmarksRoot.querySelectorAll("header").length === 1 &&
    optionalLandmarksRoot.querySelector("h1")?.parentNode ===
      optionalLandmarksRoot.querySelector("header") &&
    optionalLandmarksRoot.querySelector("header")?.parentNode ===
      optionalLandmarksRoot.querySelector("main") &&
    optionalLandmarksRoot.querySelectorAll("footer").length === 0,
  "server owns a heading header inside canonical main while omitting an empty optional footer"
);
const unknownFinalField = validationModule.validateCreatorArtifactBundle({
  bundle: { ...bundle, untrustedUnknownField: true },
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(
  unknownFinalField.bundle === null &&
    unknownFinalField.validation.valid === false &&
    unknownFinalField.validation.issues.some((issue) => issue.code === "contract.fields") &&
    unknownFinalField.validation.stagesCompleted.join(",") === "1",
  "direct final-bundle validation rejects unknown runtime fields before materialization"
);

const deterministicReplay = topologyModule.composeCreatorServerOwnedDocument({
  page: parsedPage.page,
  approvedProjectTitle: title,
});
assert(deterministicReplay.ok === true, "canonical composition can be replayed");
assertModule.deepEqual(deterministicReplay, documentResult);
assert(
  sha256(JSON.stringify(deterministicReplay)) === sha256(JSON.stringify(documentResult)),
  "same canonical input produces byte-identical topology output and provenance"
);

const escapedTitle = "Safety <Lab> & Review";
const escapedPage = {
  ...parsedPage.page,
  projectTitle: escapedTitle,
  page: {
    ...parsedPage.page.page,
    primaryHeading: 'Safety <script> & "Review"',
  },
};
const escaped = topologyModule.composeCreatorServerOwnedDocument({
  page: escapedPage,
  approvedProjectTitle: escapedTitle,
});
assert(escaped.ok === true, "plain-text title and heading data compose safely");
const escapedHtml = escaped.bundle.files[0].content;
assert(
  escapedHtml.includes("Safety &lt;Lab&gt; &amp; Review") &&
    escapedHtml.includes('Safety &lt;script&gt; &amp; "Review"') &&
    !escapedHtml.includes("<script> &"),
  "server escapes title and primary-heading text rather than treating it as markup"
);

const unsortedPage = {
  ...pageResponse,
  files: [pageResponse.files[2], pageResponse.files[0]],
};
assertRejected(
  contractModule.parseCreatorServerOwnedPageOutput(JSON.stringify(unsortedPage)),
  "contract.file_order",
  "unsorted provider inventory"
);
const htmlAssetPage = {
  ...pageResponse,
  files: [{ path: "index.html", mediaType: "text/html", content: "<main></main>" }],
};
assertRejected(
  contractModule.parseCreatorServerOwnedPageOutput(JSON.stringify(htmlAssetPage)),
  "contract.document_file_forbidden",
  "provider-owned competing index document"
);

function composeWithFragment(slot, content) {
  return topologyModule.composeCreatorServerOwnedDocument({
    page: {
      ...parsedPage.page,
      files: [],
      page: {
        ...parsedPage.page.page,
        headerContent: null,
        navigationContent: null,
        mainContent: "<p>Safe content.</p>",
        footerContent: null,
        [slot]: content,
      },
    },
    approvedProjectTitle: title,
  });
}

for (const [element, source] of [
  ["html", "<html></html>"],
  ["head", "<head></head>"],
  ["body", "<body></body>"],
  ["main", "<main></main>"],
  ["h1", "<h1>Competing heading</h1>"],
  ["header", "<header></header>"],
  ["nav", "<nav></nav>"],
  ["footer", "<footer></footer>"],
  ["title", "<title>Competing title</title>"],
  ["meta", '<meta name="viewport" content="width=device-width, initial-scale=9">'],
  ["link", '<link rel="stylesheet" href="other.css">'],
  ["script", '<script src="other.js" defer></script>'],
]) {
  assertRejected(
    composeWithFragment("mainContent", source),
    "topology.reserved_element",
    `untrusted competing <${element}> topology`
  );
}
assertRejected(
  composeWithFragment("mainContent", "<h1>One</h1><h1>Two</h1>"),
  "topology.reserved_element",
  "multiple untrusted primary headings"
);
assertRejected(
  composeWithFragment("mainContent", "<section><p>Unbalanced</section>"),
  "topology.fragment_syntax",
  "malformed unbalanced fragment"
);
assertRejected(
  composeWithFragment("mainContent", "<!doctype html><p>Competing declaration.</p>"),
  "topology.fragment_syntax",
  "competing document declaration"
);
const overDepth = `${"<div>".repeat(markupModule.CREATOR_FRAGMENT_MAXIMUM_DEPTH + 1)}Deep${"</div>".repeat(markupModule.CREATOR_FRAGMENT_MAXIMUM_DEPTH + 1)}`;
assertRejected(
  composeWithFragment("mainContent", overDepth),
  "topology.fragment_depth_limit",
  "over-depth fragment"
);
const overNodes = "<p>node</p>".repeat(markupModule.CREATOR_FRAGMENT_MAXIMUM_NODES + 1);
assertRejected(
  composeWithFragment("mainContent", overNodes),
  "topology.fragment_node_limit",
  "over-node fragment"
);

const externalResult = composeWithFragment(
  "mainContent",
  '<img src="https://example.test/external.png" alt="External">'
);
assert(externalResult.ok === true, "external resource markup remains untrusted input to final validation");
const externalValidation = validationModule.validateCreatorProviderOutput({
  rawOutput: JSON.stringify(externalResult.bundle),
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(
  externalValidation.validation.valid === false &&
    externalValidation.validation.issues.some((issue) => issue.code === "html.reference_unsafe"),
  "final validation rejects external fragment resources"
);
const missingResult = composeWithFragment(
  "mainContent",
  '<img src="missing.svg" alt="Missing local resource">'
);
assert(missingResult.ok === true, "local fragment references remain bound to final inventory validation");
const missingValidation = validationModule.validateCreatorProviderOutput({
  rawOutput: JSON.stringify(missingResult.bundle),
  expectedProjectTitle: title,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(
  missingValidation.validation.valid === false &&
    missingValidation.validation.issues.some((issue) => issue.code === "reference.missing_or_unsafe"),
  "final validation rejects local resources missing from the exact inventory"
);

const retainedRoot = path.join(
  repoRoot,
  ".codexforge/acceptance/e1-post-repair-live-preflight-corrected-20260818T151722Z/fixture-quarantine"
);
const retainedRevisionPath = path.join(
  retainedRoot,
  "creator-tests/projects/468f1c6cff562dc5ecfed7ad/state-revisions/000008.json"
);
const retainedRunPath = path.join(
  retainedRoot,
  "private-alpha-tests/runs/045389a0f8d9fa3a040dac8f.json"
);
const retainedRevisionBytes = fs.readFileSync(retainedRevisionPath);
const retainedRunBytes = fs.readFileSync(retainedRunPath);
assert(
  sha256(retainedRevisionBytes) === "6477b79f64c4db84f5d51efab7112b7de63ed0f7420bf30cc8386c9754f9f442",
  "retained rejected revision 8 matches its immutable acceptance hash"
);
assert(
  sha256(retainedRunBytes) === "36a1c03f841e014dcc8c556578572f19636210d47d0e566171ba044d9feb4932",
  "retained request-3 run matches its immutable acceptance hash"
);
const retainedRevision = JSON.parse(retainedRevisionBytes.toString("utf8")).project;
const retainedRun = JSON.parse(retainedRunBytes.toString("utf8"));
assert(
  retainedRevision.stateRevision === 8 &&
    retainedRevision.status === "rejected_output" &&
    retainedRevision.artifactProposal === null &&
    retainedRevision.materializations.length === 0,
  "retained revision 8 remains rejected and unmaterialized"
);
assert(
  typeof retainedRun.execution.outputText === "string" &&
    sha256(retainedRun.execution.outputText) === "ec746fb9ab7493f3bc69477472600ca16839341f4738aaf4e1b1ef171fbac29e",
  "retained request-3 output is complete and bound to its exact response digest"
);
const legacyParse = contractModule.parseCreatorArtifactOutput(retainedRun.execution.outputText);
assert(legacyParse.ok === true, "retained request-3 response parses as one exact legacy bundle");
const legacyBefore = JSON.stringify(legacyParse.bundle);
const reprocessed = topologyModule.reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
  rawOutput: retainedRun.execution.outputText,
  expectedProjectTitle: retainedRevision.identity.projectTitle,
});
assert(reprocessed.ok === true, "retained request-3 response has one unambiguous parser-backed topology repair");
assert(JSON.stringify(legacyParse.bundle) === legacyBefore, "historical legacy bundle remains byte-for-byte immutable in memory");
const repairedHtml = reprocessed.bundle.files[0].content;
assert(
  reprocessed.topology.canonicalizerVersion === "codexforge.creator.document-topology.v1" &&
    reprocessed.topology.sourceResponseContractVersion === "legacy-bundle-v1" &&
    reprocessed.topology.responseContractVersion === "server-owned-page-v1" &&
    reprocessed.topology.inputHtmlSha256 === "33cc1475e382c1b3dfecb0566c79c6abc781f5a13b2c945ed8151b8b5a4df89d" &&
    reprocessed.topology.outputHtmlSha256 === sha256(repairedHtml) &&
    reprocessed.topologyRepairDigest === reprocessed.topology.transformationDigest &&
    reprocessed.topology.orderedOperations.join(",") ===
      "parse-legacy-bundle-v1,extract-unambiguous-legacy-regions,validate-untrusted-fragments,derive-resource-tags-from-inventory,construct-canonical-document-shell,validate-canonical-bundle-v1",
  "historical replay records exact source, transformation operations, and output hashes"
);
const repairedRoot = htmlParser.parse(repairedHtml, { comment: false, lowerCaseTagName: true });
const repairedMain = repairedRoot.querySelectorAll("main");
const repairedH1 = repairedRoot.querySelectorAll("h1");
const repairedViewport = repairedRoot
  .querySelectorAll("meta")
  .filter((node) => node.getAttribute("name") === "viewport");
assert(
  repairedMain.length === 1 &&
    repairedH1.length === 1 &&
    tagName(repairedH1[0].parentNode) === "header" &&
    repairedH1[0].parentNode?.parentNode === repairedMain[0],
  "deterministic historical repair moves the sole heading under canonical main"
);
assert(
  repairedViewport.length === 1 &&
    repairedViewport[0].getAttribute("content") === "width=device-width, initial-scale=1",
  "deterministic historical repair replaces model-owned viewport syntax with the exact server value"
);
const repairedValidation = validationModule.validateCreatorProviderOutput({
  rawOutput: JSON.stringify(reprocessed.bundle),
  expectedProjectTitle: retainedRevision.identity.projectTitle,
  completedAt: "2026-08-18T12:00:00.000Z",
});
assert(
  repairedValidation.validation.valid === true && repairedValidation.bundle !== null,
  "reprocessed retained output passes every unchanged final validator"
);
const reprocessedAgain = topologyModule.reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
  rawOutput: retainedRun.execution.outputText,
  expectedProjectTitle: retainedRevision.identity.projectTitle,
});
assertModule.deepEqual(reprocessedAgain, reprocessed);
assert(
  sha256(JSON.stringify(reprocessedAgain)) === sha256(JSON.stringify(reprocessed)),
  "historical deterministic reprocessing is byte-identical on replay"
);

function legacyBundleWithHtml(source) {
  return {
    contractVersion: "codexforge.creator.bundle.v1",
    projectTitle: title,
    creatorKind: "website-browser-app",
    entrypoint: "index.html",
    files: [{ path: "index.html", mediaType: "text/html", content: source }],
  };
}

function retainedLegacyOutputWithExactHtmlMutation(label, expected, replacement) {
  const bundle = JSON.parse(retainedRun.execution.outputText);
  const indexFile = bundle.files[0];
  assert(
    typeof indexFile?.content === "string" &&
      indexFile.content.split(expected).length === 2,
    `retained ${label} mutation seam is exact`
  );
  indexFile.content = indexFile.content.replace(expected, replacement);
  return JSON.stringify(bundle);
}

for (const [label, expected, replacement] of [
  [
    "html direction attribute",
    '<html lang="en">',
    '<html lang="en" dir="rtl">',
  ],
  [
    "head class attribute",
    "<head>",
    '<head class="retained-head">',
  ],
  [
    "body hidden attribute",
    "<body>",
    "<body hidden>",
  ],
  [
    "body id attribute",
    "<body>",
    '<body id="retained-body">',
  ],
  [
    "header aria attribute",
    "  <header>",
    '  <header aria-live="polite">',
  ],
  [
    "header data attribute",
    "  <header>",
    '  <header data-retained="true">',
  ],
  [
    "main class attribute",
    "  <main>",
    '  <main class="retained-main">',
  ],
  [
    "main native role attribute",
    "  <main>",
    '  <main role="main">',
  ],
  [
    "footer class attribute",
    "  <footer>",
    '  <footer class="retained-footer">',
  ],
  [
    "title class attribute",
    "  <title>E1 Local Repair Cafe</title>",
    '  <title class="retained-title">E1 Local Repair Cafe</title>',
  ],
  [
    "charset metadata extra attribute",
    '  <meta charset="utf-8">',
    '  <meta charset="utf-8" data-retained="true">',
  ],
  [
    "viewport metadata extra attribute",
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" data-retained="true">',
  ],
  [
    "extra head metadata element",
    '  <meta charset="utf-8">',
    '  <meta charset="utf-8">\n  <meta data-retained="true">',
  ],
]) {
  assertRejected(
    topologyModule.reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
      rawOutput: retainedLegacyOutputWithExactHtmlMutation(
        label,
        expected,
        replacement
      ),
      expectedProjectTitle: retainedRevision.identity.projectTitle,
    }),
    "topology.legacy_ambiguous",
    `legacy ${label}`
  );
}

for (const [label, source] of [
  [
    "two document shells",
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>E1.1 Topology Safety</title></head><body><main><h1>E1.1 Topology Safety</h1></main></body></html><html lang="en"><head><title>Second</title></head><body></body></html>',
  ],
  [
    "two primary headings",
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>E1.1 Topology Safety</title></head><body><main><h1>One</h1><h1>Two</h1></main></body></html>',
  ],
  [
    "malformed legacy markup",
    '<!doctype html><html lang="en"><head><title>E1.1 Topology Safety</title></head><body><main><h1>Broken</h1></body></html>',
  ],
]) {
  assertRejected(
    topologyModule.reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
      rawOutput: JSON.stringify(legacyBundleWithHtml(source)),
      expectedProjectTitle: title,
    }),
    "topology.legacy_ambiguous",
    `legacy ${label}`
  );
}

assert(
  sha256(fs.readFileSync(retainedRevisionPath)) === "6477b79f64c4db84f5d51efab7112b7de63ed0f7420bf30cc8386c9754f9f442" &&
    sha256(fs.readFileSync(retainedRunPath)) === "36a1c03f841e014dcc8c556578572f19636210d47d0e566171ba044d9feb4932",
  "all retained acceptance evidence remains immutable after deterministic replay"
);
activityTrap.assertZeroActivity();
console.log(`[PASS] ${activityTrap.formatCounters({ deterministicTopologyCompositions: 2, historicalProviderRequests: 0 })}`);
'@

$tempScript = Join-Path $env:TEMP "codexforge-e1-1-server-owned-document-topology-$PID.js"
try {
  [System.IO.File]::WriteAllText($tempScript, $nodeScript, [System.Text.Encoding]::UTF8)
  & node $tempScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] E1.1 server-owned topology runtime smoke failed." }
} finally {
  Remove-Item -LiteralPath $tempScript -Force -ErrorAction SilentlyContinue
}

$serviceNodeScript = @'
"use strict";

const assertModule = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = fs.promises;
const path = require("node:path");
const Module = require("node:module");

const repoRoot = path.resolve(process.argv[2]);
const retainedRoot = path.resolve(
  repoRoot,
  ".codexforge/acceptance/e1-post-repair-live-preflight-corrected-20260818T151722Z/fixture-quarantine"
);
const retainedCreatorRoot = path.join(retainedRoot, "creator-tests");
const retainedPrivateAlphaRoot = path.join(retainedRoot, "private-alpha-tests");
const projectId = "468f1c6cff562dc5ecfed7ad";
const sourceRunId = "045389a0f8d9fa3a040dac8f";
const sourceOutputSha256 = "ec746fb9ab7493f3bc69477472600ca16839341f4738aaf4e1b1ef171fbac29e";
const retainedRevisionSha256 = "6477b79f64c4db84f5d51efab7112b7de63ed0f7420bf30cc8386c9754f9f442";
const retainedRunSha256 = "36a1c03f841e014dcc8c556578572f19636210d47d0e566171ba044d9feb4932";
const scenarioSuffixes = [
  "e11-topology-happy",
  "e11-topology-concurrent",
  "e11-topology-crash",
];
const scenarioRoots = scenarioSuffixes.flatMap((suffix) => [
  path.resolve(repoRoot, ".codexforge", "creator-tests", suffix),
  path.resolve(repoRoot, ".codexforge", "private-alpha-tests", suffix),
]);

const activityTrap = require(path.join(
  repoRoot,
  "scripts",
  "codexforge-creator-deterministic-activity-trap.cjs"
)).installCreatorDeterministicActivityTrap({
  repoRoot,
  allowedWriteTrees: scenarioRoots,
  allowedMkdirPaths: [
    path.resolve(repoRoot, ".codexforge"),
    path.resolve(repoRoot, ".codexforge", "creator-tests"),
    path.resolve(repoRoot, ".codexforge", "private-alpha-tests"),
  ],
});

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

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

async function expectFailure(operation, allowedCodes, message) {
  try {
    await operation();
  } catch (error) {
    assert(
      error && allowedCodes.includes(error.code),
      `${message} (${allowedCodes.join("|")}; observed ${error?.code ?? error?.message ?? "unknown"})`
    );
    return error;
  }
  throw new Error(`${message}: expected failure`);
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
      throw new Error(`Unsafe evidence snapshot node: ${relative || "."}`);
    }
    nodes += 1;
    if (nodes > 10_000) throw new Error("Evidence snapshot exceeded its bounded inventory.");
    if (stat.isDirectory()) {
      hash.update(`d\0${relative}\n`);
      for (const name of (await fsp.readdir(current)).sort()) {
        await visit(path.join(current, name), relative ? `${relative}/${name}` : name);
      }
      return;
    }
    if (!stat.isFile()) throw new Error(`Unsupported evidence snapshot node: ${relative}`);
    const bytes = await fsp.readFile(current);
    hash.update(`f\0${relative}\0${bytes.length}\0`);
    hash.update(bytes);
  }
  await visit(rootPath, "");
  return hash.digest("hex");
}

async function copyTreeReadOnly(source, destination) {
  let nodes = 0;
  async function visit(currentSource, currentDestination) {
    const stat = await fsp.lstat(currentSource);
    if (stat.isSymbolicLink() || stat.isSocket() || stat.isFIFO()) {
      throw new Error(`Unsafe retained evidence node: ${currentSource}`);
    }
    nodes += 1;
    if (nodes > 10_000) throw new Error("Retained evidence copy exceeded its bounded inventory.");
    if (stat.isDirectory()) {
      await fsp.mkdir(currentDestination, { recursive: true });
      for (const name of (await fsp.readdir(currentSource)).sort()) {
        await visit(path.join(currentSource, name), path.join(currentDestination, name));
      }
      return;
    }
    if (!stat.isFile()) throw new Error(`Unsupported retained evidence node: ${currentSource}`);
    await fsp.writeFile(currentDestination, await fsp.readFile(currentSource), { flag: "wx" });
  }
  await visit(source, destination);
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

const persistenceModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-persistence.server.ts"
));
const adapterModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-private-alpha-adapter.server.ts"
));
const serviceModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-service.server.ts"
));
const materializationModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-materialization.server.ts"
));
const cryptoModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/creator/creator-crypto.ts"
));

function makeDeterministicIdFactory(suffix) {
  let ordinal = 0;
  return (byteLength) => {
    ordinal += 1;
    return sha256(`${suffix}:${ordinal}`).slice(0, byteLength * 2);
  };
}

function makeProviderAndLifecycle(suffix) {
  const calls = {
    getAvailability: 0,
    generation: 0,
    getRun: 0,
    forbiddenLifecycleMutation: 0,
    readKillSwitch: 0,
  };
  const provider = {
    identity: fixtureIdentity(),
    async getAvailability() {
      calls.getAvailability += 1;
      throw new Error("E1.1 deterministic repair forbids provider availability checks.");
    },
    async generateApprovedText() {
      calls.generation += 1;
      throw new Error("E1.1 deterministic repair forbids provider generation.");
    },
  };
  const retainedLifecycle =
    adapterModule.createCreatorGenerationLifecycleAdapterForTesting(suffix, provider);
  const forbidden = async () => {
    calls.forbiddenLifecycleMutation += 1;
    throw new Error("E1.1 deterministic repair forbids lifecycle mutation.");
  };
  return {
    calls,
    lifecycle: {
      bindRun: forbidden,
      recoverBoundRun: forbidden,
      async getRun(input) {
        calls.getRun += 1;
        return retainedLifecycle.getRun(input);
      },
      approveRun: forbidden,
      executeRun: forbidden,
      cancelRun: forbidden,
      async readKillSwitch() {
        calls.readKillSwitch += 1;
        return { killSwitchEngaged: false, killSwitchSources: [] };
      },
    },
  };
}

async function prepareScenario(suffix) {
  const creatorRoot = path.resolve(repoRoot, ".codexforge", "creator-tests", suffix);
  const privateAlphaRoot = path.resolve(repoRoot, ".codexforge", "private-alpha-tests", suffix);
  await fsp.rm(creatorRoot, { recursive: true, force: true });
  await fsp.rm(privateAlphaRoot, { recursive: true, force: true });
  await copyTreeReadOnly(retainedCreatorRoot, creatorRoot);
  await copyTreeReadOnly(retainedPrivateAlphaRoot, privateAlphaRoot);
  const persistence = persistenceModule.createCreatorPersistenceForTesting(suffix);
  const exactLifecycle = makeProviderAndLifecycle(suffix);
  const makeId = makeDeterministicIdFactory(suffix);
  const createService = (persistenceOverride = persistence) =>
    serviceModule.createCreatorService({
      persistence: persistenceOverride,
      lifecycle: exactLifecycle.lifecycle,
      now: () => "2026-08-18T18:00:00.000Z",
      makeId,
    });
  return {
    suffix,
    creatorRoot,
    privateAlphaRoot,
    persistence,
    exactLifecycle,
    createService,
  };
}

function repairBody() {
  return {
    action: "repair-document-topology",
    expectedRevision: 8,
    sourceRevision: 8,
    sourceRunId,
    sourceOutputSha256,
  };
}

function assertNoProviderActivity(scenario, message) {
  assert(
    scenario.exactLifecycle.calls.getAvailability === 0 &&
      scenario.exactLifecycle.calls.generation === 0 &&
      scenario.exactLifecycle.calls.forbiddenLifecycleMutation === 0,
    message
  );
}

function countAudit(project, eventType) {
  return project.auditEvents.filter((event) => event.eventType === eventType).length;
}

function assertCompletedRepair(project, message) {
  const repair = project.topologyRepair;
  assert(
    project.status === "ready" &&
      repair?.status === "completed" &&
      repair.sourceStateRevision === 8 &&
      repair.sourceRunId === sourceRunId &&
      repair.sourceRunRevision === 4 &&
      repair.sourceOutputSha256 === sourceOutputSha256 &&
      repair.providerRequests === 0 &&
      repair.repairKind === "server-owned-document-topology" &&
      repair.originalValidationState === "rejected_output" &&
      repair.automaticRepair === false &&
      repair.operatorAuthorized === true &&
      repair.sourceResponseContractVersion === "legacy-bundle-v1" &&
      repair.responseContractVersion === "server-owned-page-v1" &&
      repair.canonicalizerVersion === "codexforge.creator.document-topology.v1" &&
      repair.inputHtmlSha256 === "33cc1475e382c1b3dfecb0566c79c6abc781f5a13b2c945ed8151b8b5a4df89d" &&
      repair.orderedOperations.join(",") ===
        "parse-legacy-bundle-v1,extract-unambiguous-legacy-regions,validate-untrusted-fragments,derive-resource-tags-from-inventory,construct-canonical-document-shell,validate-canonical-bundle-v1" &&
      repair.completedAt === new Date(Date.parse(repair.constructedAt) + 1).toISOString() &&
      project.materializations.length === 1 &&
      project.materializations[0].artifactRevision === 1 &&
      project.materializations[0].materializedAt === repair.completedAt &&
      project.materializations[0].topologyRepairDigest ===
        cryptoModule.hashCreatorCanonicalJson(repair) &&
      project.exportManifest?.topologyRepairDigest ===
        cryptoModule.hashCreatorCanonicalJson(repair) &&
      project.exportManifest?.createdAt === repair.completedAt &&
      project.validation?.valid === true &&
      project.artifactProposal !== null &&
      project.failureCode === null &&
      project.failureMessage === null,
    message
  );
  const transformationBase = {
    canonicalizerVersion: repair.canonicalizerVersion,
    sourceResponseContractVersion: repair.sourceResponseContractVersion,
    responseContractVersion: repair.responseContractVersion,
    orderedOperations: repair.orderedOperations,
    inputDigest: repair.inputBundleDigest,
    inputHtmlSha256: repair.inputHtmlSha256,
    outputHtmlSha256: repair.outputHtmlSha256,
    outputBundleDigest: repair.outputBundleDigest,
  };
  assert(
    repair.transformationDigest === cryptoModule.hashCreatorCanonicalJson(transformationBase),
    `${message} binds the canonicalizer transformation digest`
  );
  assert(
    countAudit(project, "topology.repair_requested") === 1 &&
      countAudit(project, "topology.document_constructed") === 1 &&
      countAudit(project, "topology.repair_completed") === 1 &&
      countAudit(project, "revision.materialized") === 1 &&
      project.exportManifest.auditReferenceIds.join(",") ===
        project.auditEvents
          .filter((event) => event.eventType !== "recovery.requested" && event.eventType !== "recovery.completed")
          .map((event) => event.eventId)
          .join(","),
    `${message} retains one exact audit and manifest binding`
  );
}

async function assertCopiedSourcesImmutable(scenario, message) {
  const revisionPath = path.join(
    scenario.creatorRoot,
    "projects",
    projectId,
    "state-revisions",
    "000008.json"
  );
  const runPath = path.join(
    scenario.privateAlphaRoot,
    "runs",
    `${sourceRunId}.json`
  );
  assert(
    sha256(await fsp.readFile(revisionPath)) === retainedRevisionSha256 &&
      sha256(await fsp.readFile(runPath)) === retainedRunSha256,
    message
  );
}

async function main() {
  const retainedBefore = await snapshotTree(retainedRoot);
    const happy = await prepareScenario("e11-topology-happy");
    const happyService = happy.createService();
    const initial = await happyService.getProject(projectId);
    const initialRunBindings = JSON.stringify(initial.runBindings);
    assert(
      initial.stateRevision === 8 &&
        initial.status === "rejected_output" &&
        initial.initialProviderResponseContractVersion === "legacy-bundle-v1" &&
        initial.runBindings[0].responseContractVersion === "legacy-bundle-v1" &&
        initial.topologyRepair === null,
      "isolated evidence copy migrates the historical revision in memory without rewriting it"
    );
    const eligibility = await happyService.getTopologyRepairEligibility(projectId);
    assert(
      eligibility.eligible === true &&
        eligibility.sourceRevision === 8 &&
        eligibility.sourceRunId === sourceRunId &&
        eligibility.sourceOutputSha256 === sourceOutputSha256 &&
        eligibility.sourceValidationIssueDigest === initial.validation.issueDigest &&
        eligibility.providerRequests === 0 &&
        eligibility.repairKind === "server-owned-document-topology" &&
        eligibility.originalValidationState === "rejected_output" &&
        eligibility.automaticRepair === false &&
        eligibility.operatorAuthorized === true,
      "read-only eligibility proves the exact retained response and explicit zero-provider authority"
    );
    assertNoProviderActivity(happy, "eligibility inspection reads retained evidence without provider activity");
    const happyKey = "e11-topology-happy-repair";
    const happyResult = await happyService.actOnProject(
      projectId,
      repairBody(),
      happyKey
    );
    assert(happyResult.replayed === false && happyResult.project.stateRevision === 10, "operator-authorized repair persists exact validating revision 9 and ready revision 10");
    assertCompletedRepair(happyResult.project, "operator-authorized repair completes with full provenance");
    assert(
      JSON.stringify(happyResult.project.runBindings) === initialRunBindings &&
        happyResult.project.runBindings.length === 1 &&
        happy.exactLifecycle.calls.getRun >= 2,
      "deterministic repair reads only the retained run and creates no new run binding"
    );
    assertNoProviderActivity(happy, "deterministic repair performs no provider or lifecycle mutation call");
    await assertCopiedSourcesImmutable(happy, "happy-path repair leaves copied revision 8 and source run immutable");

    const replay = await happyService.actOnProject(projectId, repairBody(), happyKey);
    assert(
      replay.replayed === true && replay.project.stateRevision === 10,
      "same idempotency key replays exact repaired revision without a duplicate revision"
    );
    const afterReplay = await happy.persistence.readProject(projectId);
    assertCompletedRepair(afterReplay, "same-key replay preserves one completed repair");
    assertNoProviderActivity(happy, "same-key replay remains provider-free");
    const completedEligibility = await happyService.getTopologyRepairEligibility(projectId);
    assert(
      completedEligibility.eligible === false,
      "eligibility closes after one completed deterministic repair"
    );

    await expectFailure(
      () => happyService.actOnProject(projectId, repairBody(), "e11-topology-second-repair"),
      ["revision_conflict", "invalid_transition", "topology_repair_failed"],
      "different-key second repair is unavailable"
    );
    assertNoProviderActivity(happy, "blocked second repair cannot reach any provider seam");

    const previewResult = await happyService.actOnProject(
      projectId,
      { action: "start-preview", expectedRevision: 10 },
      "e11-topology-preview"
    );
    assert(
      previewResult.project.stateRevision === 11 &&
        previewResult.project.status === "preview_available" &&
        previewResult.project.preview.status === "active" &&
        previewResult.project.preview.artifactRevision === 1 &&
        typeof previewResult.project.preview.previewId === "string",
      "validated deterministic repair activates one genuine persisted preview"
    );
    const previewFile = await happyService.readActivePreviewFile({
      projectId,
      previewId: previewResult.project.preview.previewId,
      artifactRevision: 1,
      filePath: "index.html",
    });
    assert(
      previewFile.mediaType === "text/html" &&
        sha256(previewFile.bytes) === previewResult.project.exportManifest.files[0].sha256 &&
        previewFile.bytes.toString("utf8").includes('<meta name="viewport" content="width=device-width, initial-scale=1">'),
      "active preview serves the exact manifest-bound canonical document"
    );
    const restartedHappyService = happy.createService();
    const recoveredPreview = await restartedHappyService.getProject(projectId);
    assert(
      recoveredPreview.stateRevision === 11 &&
        recoveredPreview.preview.status === "active" &&
        recoveredPreview.preview.previewId === previewResult.project.preview.previewId &&
        recoveredPreview.topologyRepair?.status === "completed",
      "service restart recovers active preview and completed topology provenance"
    );
    assertNoProviderActivity(happy, "preview activation and restart recovery remain provider-free");

    const concurrent = await prepareScenario("e11-topology-concurrent");
    const concurrentService = concurrent.createService();
    const concurrentResults = await Promise.allSettled([
      concurrentService.actOnProject(
        projectId,
        repairBody(),
        "e11-topology-concurrent-a"
      ),
      concurrentService.actOnProject(
        projectId,
        repairBody(),
        "e11-topology-concurrent-b"
      ),
    ]);
    const fulfilled = concurrentResults.filter((result) => result.status === "fulfilled");
    const rejected = concurrentResults.filter((result) => result.status === "rejected");
    const concurrentSummary = concurrentResults.map((result) =>
      result.status === "fulfilled"
        ? `fulfilled:${result.value.project.stateRevision}:${result.value.replayed}`
        : `rejected:${result.reason?.code ?? result.reason?.message ?? "unknown"}`
    ).join(",");
    assert(
      fulfilled.length === 1 &&
        rejected.length === 1 &&
        ["revision_conflict", "invalid_transition", "topology_repair_failed", "mutation_busy"].includes(rejected[0].reason?.code),
      `different-key concurrency serializes to one accepted deterministic repair (${concurrentSummary})`
    );
    const concurrentProject = await concurrent.persistence.readProject(projectId);
    assert(
      concurrentProject.stateRevision === 10 &&
        concurrentProject.materializations.length === 1,
      "concurrency publishes one repaired revision and no duplicate materialization"
    );
    assertCompletedRepair(concurrentProject, "concurrent repair winner retains one complete provenance chain");
    assertNoProviderActivity(concurrent, "concurrent loser cannot trigger provider, fallback, or mutation activity");
    await assertCopiedSourcesImmutable(concurrent, "concurrency leaves copied source evidence immutable");

    const crash = await prepareScenario("e11-topology-crash");
    let finalWriteFailuresRemaining = 2;
    const crashPersistence = {
      ...crash.persistence,
      async writeNextProject(project, expectedPreviousRevision) {
        if (
          finalWriteFailuresRemaining > 0 &&
          project.status === "ready" &&
          project.topologyRepair?.status === "completed"
        ) {
          finalWriteFailuresRemaining -= 1;
          throw new Error("deterministic topology final-state write failure");
        }
        return crash.persistence.writeNextProject(project, expectedPreviousRevision);
      },
    };
    const crashingService = crash.createService(crashPersistence);
    await expectFailure(
      () => crashingService.actOnProject(
        projectId,
        repairBody(),
        "e11-topology-crash-repair"
      ),
      ["internal_failure"],
      "post-publication final-state crash fails safely"
    );
    const interrupted = await crash.persistence.readProject(projectId);
    assert(
      finalWriteFailuresRemaining === 0 &&
        interrupted.stateRevision === 9 &&
        interrupted.status === "validating" &&
        interrupted.topologyRepair?.status === "pending" &&
        interrupted.materializations.length === 0 &&
        countAudit(interrupted, "topology.repair_requested") === 1 &&
        countAudit(interrupted, "topology.document_constructed") === 1 &&
        countAudit(interrupted, "topology.repair_completed") === 0,
      "crash preserves exact pending provenance without claiming readiness"
    );
    const orphanPublication = await materializationModule.readCreatorMaterializationPublication({
      persistence: crash.persistence,
      projectId,
      artifactRevision: 1,
    });
    assert(
      orphanPublication.materialization.artifactRevision === 1 &&
        orphanPublication.manifest.topologyRepairDigest !== undefined,
      "crash preserves one complete immutable orphan publication for reconciliation"
    );
    assertNoProviderActivity(crash, "crashed repair reached no provider or lifecycle mutation seam");

    const restartedCrashService = crash.createService();
    const recovered = await restartedCrashService.actOnProject(
      projectId,
      { action: "recover", expectedRevision: 9 },
      "e11-topology-crash-recover"
    );
    assert(
      recovered.project.stateRevision === 12 && recovered.project.status === "ready",
      "explicit restart recovery adopts the exact publication and records recovery ownership"
    );
    assertCompletedRepair(recovered.project, "crash recovery preserves completed transformation provenance");
    assert(
      countAudit(recovered.project, "recovery.requested") === 1 &&
        countAudit(recovered.project, "recovery.completed") === 1 &&
        recovered.project.materializations.length === 1,
      "crash recovery creates no duplicate repair revision or publication"
    );
    assertNoProviderActivity(crash, "crash recovery replays retained bytes with zero provider calls");
    await assertCopiedSourcesImmutable(crash, "crash and restart recovery leave copied source evidence immutable");

    assert(
      await snapshotTree(retainedRoot) === retainedBefore,
      "all original acceptance evidence remains byte-for-byte immutable across service tests"
    );
  activityTrap.assertZeroActivity();
  console.log(`[PASS] ${activityTrap.formatCounters({ serviceRepairProviderRequests: 0, automaticRetry: 0, fallback: 0, substitution: 0 })}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
'@

$serviceTempScript = Join-Path $env:TEMP "codexforge-e1-1-server-owned-document-topology-service-$PID.js"
$creatorTestBoundary = [System.IO.Path]::GetFullPath((Join-Path $root ".codexforge\creator-tests"))
$privateAlphaTestBoundary = [System.IO.Path]::GetFullPath((Join-Path $root ".codexforge\private-alpha-tests"))
$serviceOwnedRoots = @(
  @{ Path = (Join-Path $creatorTestBoundary "e11-topology-happy"); Boundary = $creatorTestBoundary },
  @{ Path = (Join-Path $privateAlphaTestBoundary "e11-topology-happy"); Boundary = $privateAlphaTestBoundary },
  @{ Path = (Join-Path $creatorTestBoundary "e11-topology-concurrent"); Boundary = $creatorTestBoundary },
  @{ Path = (Join-Path $privateAlphaTestBoundary "e11-topology-concurrent"); Boundary = $privateAlphaTestBoundary },
  @{ Path = (Join-Path $creatorTestBoundary "e11-topology-crash"); Boundary = $creatorTestBoundary },
  @{ Path = (Join-Path $privateAlphaTestBoundary "e11-topology-crash"); Boundary = $privateAlphaTestBoundary }
)
$serviceExitCode = 0
try {
  [System.IO.File]::WriteAllText($serviceTempScript, $serviceNodeScript, [System.Text.Encoding]::UTF8)
  & node $serviceTempScript $root
  $serviceExitCode = $LASTEXITCODE
} finally {
  Remove-Item -LiteralPath $serviceTempScript -Force -ErrorAction SilentlyContinue
  foreach ($owned in $serviceOwnedRoots) {
    $target = [System.IO.Path]::GetFullPath([string]$owned.Path)
    $boundary = [System.IO.Path]::GetFullPath([string]$owned.Boundary)
    $boundaryPrefix = $boundary.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
    Assert-True (
      $target.StartsWith($boundaryPrefix, [StringComparison]::OrdinalIgnoreCase) -and
      -not [string]::Equals($target, $boundary, [StringComparison]::OrdinalIgnoreCase)
    ) "E1.1 cleanup target is one exact owned test suffix"
    if (Test-Path -LiteralPath $target) {
      $targetItem = Get-Item -LiteralPath $target -Force
      Assert-True (($targetItem.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -eq 0) "E1.1 cleanup root is not a reparse point"
      $linkedDescendant = Get-ChildItem -LiteralPath $target -Force -Recurse |
        Where-Object { ($_.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0 } |
        Select-Object -First 1
      Assert-True ($null -eq $linkedDescendant) "E1.1 cleanup root contains no reparse-point descendant"
      Remove-Item -LiteralPath $target -Recurse -Force
    }
  }
}
if ($serviceExitCode -ne 0) { throw "[FAIL] E1.1 topology persistence/service smoke failed." }

Write-Host "E1.1 server-owned document topology smoke checks passed."
