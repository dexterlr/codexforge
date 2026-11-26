import "server-only";

import path from "node:path";
// @ts-expect-error Next ships this pinned server parser without TypeScript declarations.
import htmlParserModule from "next/dist/compiled/node-html-parser/index.js";
import {
  CREATOR_SERVER_OWNED_PAGE_CONTRACT_VERSION,
  isSafeCreatorVisibleUnicode,
  isValidCreatorProjectTitle,
  parseCreatorArtifactOutput,
  type CreatorServerOwnedPageContract,
} from "./creator-contract.server";
import {
  hashCreatorCanonicalJson,
  hashCreatorSha256,
} from "./creator-crypto";
import {
  validateCreatorHtml,
  validateCreatorHtmlFragment,
} from "./creator-markup-validation.server";
import { validateCreatorArtifactPaths } from "./creator-path-policy";
import {
  CREATOR_CONTRACT_VERSION,
  CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
  CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
  type CreatorArtifactBundle,
  type CreatorArtifactFile,
  type CreatorResponseContractVersion,
  type CreatorValidationIssue,
} from "./creator-types";

type ParsedHtmlNode = {
  tagName?: string;
  text?: string;
  innerHTML?: string;
  childNodes?: ParsedHtmlNode[];
  parentNode?: ParsedHtmlNode | null;
  attributes?: Readonly<Record<string, string>>;
  getAttribute(name: string): string | undefined;
  querySelector(selector: string): ParsedHtmlNode | null;
  querySelectorAll(selector: string): ParsedHtmlNode[];
};

type HtmlParser = {
  parse(source: string, options?: Record<string, unknown>): ParsedHtmlNode;
};

const htmlParserImport = htmlParserModule as HtmlParser | HtmlParser["parse"];
const htmlParser: HtmlParser =
  typeof htmlParserImport === "function"
    ? { parse: htmlParserImport }
    : htmlParserImport;

export const CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS = Object.freeze([
  "parse-server-owned-page-v1",
  "validate-untrusted-fragments",
  "derive-resource-tags-from-inventory",
  "construct-canonical-document-shell",
  "validate-canonical-bundle-v1",
] as const);

export type CreatorDocumentTopologyOperation =
  | (typeof CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS)[number]
  | (typeof CREATOR_TOPOLOGY_REPAIR_OPERATIONS)[number];

export type CreatorDocumentTopologyTransformation = Readonly<{
  canonicalizerVersion: typeof CREATOR_TOPOLOGY_CANONICALIZER_VERSION;
  sourceResponseContractVersion: CreatorResponseContractVersion;
  responseContractVersion: "server-owned-page-v1";
  orderedOperations: readonly CreatorDocumentTopologyOperation[];
  inputDigest: string;
  inputHtmlSha256: string | null;
  outputHtmlSha256: string;
  outputBundleDigest: string;
  transformationDigest: string;
}>;

export type CreatorDocumentTopologyCompositionResult =
  | Readonly<{
      ok: true;
      bundle: CreatorArtifactBundle;
      topology: CreatorDocumentTopologyTransformation;
      topologyRepairDigest: string;
    }>
  | Readonly<{
      ok: false;
      issues: readonly CreatorValidationIssue[];
    }>;

function topologyIssue(
  code: string,
  stage: number,
  message: string,
  suggestedRepairContext: string
): CreatorValidationIssue {
  return {
    code,
    stage,
    severity: "error",
    filePath: "index.html",
    message,
    suggestedRepairContext,
    blocksMaterialization: true,
  };
}

function parsedTagName(node: ParsedHtmlNode | null | undefined): string | null {
  return typeof node?.tagName === "string" ? node.tagName.toLowerCase() : null;
}

function parsedElementChildren(node: ParsedHtmlNode): ParsedHtmlNode[] {
  return node.childNodes?.filter((child) => parsedTagName(child) !== null) ?? [];
}

function hasOnlyWhitespaceTextChildren(node: ParsedHtmlNode): boolean {
  return (node.childNodes ?? []).every(
    (child) => parsedTagName(child) !== null || /^[\t\n\f\r ]*$/.test(child.text ?? "")
  );
}

function hasExactParsedAttributes(
  node: ParsedHtmlNode,
  expected: Readonly<Record<string, string>>
): boolean {
  const actualKeys = Object.keys(node.attributes ?? {}).sort();
  const expectedKeys = Object.keys(expected).sort();
  return (
    actualKeys.length === expectedKeys.length &&
    actualKeys.every((key, index) => key === expectedKeys[index]) &&
    expectedKeys.every((key) => node.getAttribute(key) === expected[key])
  );
}

function escapeHtmlText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isValidLanguage(value: string): boolean {
  return value.length <= 35 &&
    /^[A-Za-z]{2,3}(?:-[A-Za-z]{4})?(?:-(?:[A-Za-z]{2}|\d{3}))?(?:-(?:[A-Za-z0-9]{5,8}|\d[A-Za-z0-9]{3}))*$/.test(value);
}

function semanticBundleDigest(bundle: CreatorArtifactBundle): string {
  return hashCreatorCanonicalJson({
    contractVersion: bundle.contractVersion,
    projectTitle: bundle.projectTitle,
    creatorKind: bundle.creatorKind,
    entrypoint: bundle.entrypoint,
    files: bundle.files,
    explanation: bundle.explanation ?? null,
  });
}

function buildTopologyTransformation(input: {
  sourceResponseContractVersion: CreatorResponseContractVersion;
  orderedOperations: readonly CreatorDocumentTopologyOperation[];
  inputDigest: string;
  inputHtmlSha256: string | null;
  bundle: CreatorArtifactBundle;
}): CreatorDocumentTopologyTransformation {
  const outputHtml = input.bundle.files.find((file) => file.path === "index.html")?.content ?? "";
  const base = {
    canonicalizerVersion: CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
    sourceResponseContractVersion: input.sourceResponseContractVersion,
    responseContractVersion: "server-owned-page-v1" as const,
    orderedOperations: [...input.orderedOperations],
    inputDigest: input.inputDigest,
    inputHtmlSha256: input.inputHtmlSha256,
    outputHtmlSha256: hashCreatorSha256(outputHtml),
    outputBundleDigest: semanticBundleDigest(input.bundle),
  };
  return {
    ...base,
    transformationDigest: hashCreatorCanonicalJson(base),
  };
}

function validatePageContractForComposition(input: {
  page: CreatorServerOwnedPageContract;
  approvedProjectTitle: string;
}): readonly CreatorValidationIssue[] {
  const issues: CreatorValidationIssue[] = [];
  if (
    input.page.contractVersion !== CREATOR_SERVER_OWNED_PAGE_CONTRACT_VERSION ||
    input.page.creatorKind !== "website-browser-app"
  ) {
    issues.push(
      topologyIssue(
        "topology.page_contract_invalid",
        1,
        "The page input does not match the server-owned page contract version and creator kind.",
        `Use ${CREATOR_SERVER_OWNED_PAGE_CONTRACT_VERSION} for website-browser-app content.`
      )
    );
  }
  if (!isValidCreatorProjectTitle(input.approvedProjectTitle)) {
    issues.push(
      topologyIssue(
        "topology.approved_title_invalid",
        1,
        "The approved project title is invalid for deterministic document construction.",
        "Use the exact validated title from the approved creator plan."
      )
    );
  }
  if (input.page.projectTitle !== input.approvedProjectTitle) {
    issues.push(
      topologyIssue(
        "contract.project_title_mismatch",
        1,
        "The returned project title does not exactly match the approved plan.",
        "Return the exact approved project title without substitution."
      )
    );
  }
  if (!isValidLanguage(input.page.page.language)) {
    issues.push(
      topologyIssue(
        "topology.language_invalid",
        8,
        "The page language is outside the bounded server-owned contract.",
        "Return one conservative BCP 47 language tag such as en or en-GB."
      )
    );
  }
  if (
    input.page.page.primaryHeading.length < 1 ||
    input.page.page.primaryHeading.length > 160 ||
    input.page.page.primaryHeading !== input.page.page.primaryHeading.trim() ||
    /[\u0000-\u001f\u007f\p{Cf}]/u.test(input.page.page.primaryHeading) ||
    !isSafeCreatorVisibleUnicode(input.page.page.primaryHeading)
  ) {
    issues.push(
      topologyIssue(
        "topology.primary_heading_invalid",
        8,
        "The primary heading is not one meaningful bounded plain-text value.",
        "Return one meaningful plain-text primaryHeading without markup or invisible controls."
      )
    );
  }

  const fragmentEntries = [
    ["headerContent", input.page.page.headerContent],
    ["navigationContent", input.page.page.navigationContent],
    ["mainContent", input.page.page.mainContent],
    ["footerContent", input.page.page.footerContent],
  ] as const;
  for (const [slot, fragment] of fragmentEntries) {
    if (fragment === null) continue;
    issues.push(...validateCreatorHtmlFragment(slot, fragment).issues);
  }

  const placeholderIndex: CreatorArtifactFile = {
    path: "index.html",
    mediaType: "text/html",
    content: "",
  };
  const assetPathValidation = validateCreatorArtifactPaths([
    placeholderIndex,
    ...input.page.files,
  ]);
  issues.push(...assetPathValidation.issues);
  if (
    input.page.files.some(
      (file) => path.posix.extname(file.path) === ".html" || file.mediaType === "text/html"
    )
  ) {
    issues.push(
      topologyIssue(
        "topology.document_file_forbidden",
        3,
        "The server-owned page contract cannot contain a model-supplied HTML document file.",
        "Return only non-HTML assets; CodexForge constructs index.html."
      )
    );
  }
  return issues;
}

function constructCanonicalHtml(input: {
  page: CreatorServerOwnedPageContract;
  approvedProjectTitle: string;
}): string {
  const cssFiles = input.page.files
    .filter((file) => path.posix.extname(file.path) === ".css")
    .map((file) => file.path)
    .sort();
  const javaScriptFiles = input.page.files
    .filter((file) => path.posix.extname(file.path) === ".js")
    .map((file) => file.path)
    .sort();
  const stylesheetLines = cssFiles.map(
    (filePath) => `<link rel="stylesheet" href="${filePath}">`
  );
  const scriptLines = javaScriptFiles.map(
    (filePath) => `<script src="${filePath}" defer></script>`
  );

  const headerLines = [
    "<header>",
    `<h1>${escapeHtmlText(input.page.page.primaryHeading)}</h1>`,
  ];
  if (input.page.page.headerContent !== null) {
    headerLines.push(input.page.page.headerContent);
  }
  if (input.page.page.navigationContent !== null) {
    headerLines.push("<nav>", input.page.page.navigationContent, "</nav>");
  }
  headerLines.push("</header>");

  const footerLines =
    input.page.page.footerContent === null
      ? []
      : ["<footer>", input.page.page.footerContent, "</footer>"];

  return [
    "<!doctype html>",
    `<html lang="${input.page.page.language}">`,
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtmlText(input.approvedProjectTitle)}</title>`,
    ...stylesheetLines,
    "</head>",
    "<body>",
    "<main>",
    ...headerLines,
    input.page.page.mainContent,
    "</main>",
    ...footerLines,
    ...scriptLines,
    "</body>",
    "</html>",
  ].join("\n");
}

function composeWithProvenance(input: {
  page: CreatorServerOwnedPageContract;
  approvedProjectTitle: string;
  sourceResponseContractVersion: CreatorResponseContractVersion;
  orderedOperations: readonly CreatorDocumentTopologyOperation[];
  inputDigest: string;
  inputHtmlSha256: string | null;
}): CreatorDocumentTopologyCompositionResult {
  const issues = validatePageContractForComposition(input);
  if (issues.length > 0) return { ok: false, issues };

  const indexHtml = constructCanonicalHtml(input);
  const sortedAssets = [...input.page.files].sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0
  );
  const bundle: CreatorArtifactBundle = {
    contractVersion: CREATOR_CONTRACT_VERSION,
    projectTitle: input.approvedProjectTitle,
    creatorKind: "website-browser-app",
    entrypoint: "index.html",
    files: [
      { path: "index.html", mediaType: "text/html", content: indexHtml },
      ...sortedAssets,
    ],
    ...(input.page.explanation === undefined
      ? {}
      : { explanation: input.page.explanation }),
  };
  const topology = buildTopologyTransformation({
    sourceResponseContractVersion: input.sourceResponseContractVersion,
    orderedOperations: input.orderedOperations,
    inputDigest: input.inputDigest,
    inputHtmlSha256: input.inputHtmlSha256,
    bundle,
  });
  return {
    ok: true,
    bundle,
    topology,
    topologyRepairDigest: topology.transformationDigest,
  };
}

export function composeCreatorServerOwnedDocument(input: {
  page: CreatorServerOwnedPageContract;
  approvedProjectTitle: string;
  sourceContractVersion?: CreatorResponseContractVersion;
}): CreatorDocumentTopologyCompositionResult {
  try {
    if (
      input.sourceContractVersion !== undefined &&
      input.sourceContractVersion !== "legacy-bundle-v1" &&
      input.sourceContractVersion !== "server-owned-page-v1"
    ) {
      return {
        ok: false,
        issues: [
          topologyIssue(
            "topology.page_contract_invalid",
            1,
            "The source response contract version is unsupported.",
            "Use one explicitly versioned creator response contract."
          ),
        ],
      };
    }
    return composeWithProvenance({
      page: input.page,
      approvedProjectTitle: input.approvedProjectTitle,
      sourceResponseContractVersion:
        input.sourceContractVersion ?? "server-owned-page-v1",
      orderedOperations: CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS,
      inputDigest: hashCreatorCanonicalJson(input.page),
      inputHtmlSha256: null,
    });
  } catch {
    return {
      ok: false,
      issues: [
        topologyIssue(
          "topology.page_contract_invalid",
          1,
          "The page input could not be processed as one bounded server-owned page contract.",
          `Return one exact ${CREATOR_SERVER_OWNED_PAGE_CONTRACT_VERSION} response.`
        ),
      ],
    };
  }
}

function legacyAmbiguous(message: string): CreatorDocumentTopologyCompositionResult {
  return {
    ok: false,
    issues: [
      topologyIssue(
        "topology.legacy_ambiguous",
        7,
        message,
        "Retain the rejected output unchanged and require a separately authorized future page-contract generation."
      ),
    ],
  };
}

export function reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology(input: {
  rawOutput: string;
  expectedProjectTitle: string;
}): CreatorDocumentTopologyCompositionResult {
  const parsed = parseCreatorArtifactOutput(input.rawOutput);
  if (!parsed.ok) return { ok: false, issues: parsed.issues };
  if (parsed.bundle.projectTitle !== input.expectedProjectTitle) {
    return legacyAmbiguous("The retained legacy project title does not match the approved project title.");
  }
  if (
    parsed.bundle.files.length !== 1 ||
    parsed.bundle.files[0]?.path !== "index.html" ||
    parsed.bundle.files[0]?.mediaType !== "text/html"
  ) {
    return legacyAmbiguous("The retained legacy response is not the exact one-document request-3 bundle shape.");
  }

  const inputHtml = parsed.bundle.files[0].content;
  const legacyMarkupValidation = validateCreatorHtml("index.html", inputHtml);
  const blockingMarkupIssues = legacyMarkupValidation.issues.filter(
    (issue) => issue.severity === "error" && issue.blocksMaterialization
  );
  if (
    blockingMarkupIssues.length !== 1 ||
    blockingMarkupIssues[0]?.code !== "html.document_topology"
  ) {
    return legacyAmbiguous("The retained legacy document has validation failures beyond the one known heading topology defect.");
  }

  try {
    const root = htmlParser.parse(inputHtml, {
      comment: false,
      lowerCaseTagName: true,
    });
    const exactOne = (selector: string): ParsedHtmlNode | null => {
      const matches = root.querySelectorAll(selector);
      return matches.length === 1 ? matches[0] : null;
    };
    const html = exactOne("html");
    const head = exactOne("head");
    const body = exactOne("body");
    const title = exactOne("title");
    const header = exactOne("header");
    const main = exactOne("main");
    const primaryHeading = exactOne("h1");
    const footer = exactOne("footer");
    if (!html || !head || !body || !title || !header || !main || !primaryHeading || !footer) {
      return legacyAmbiguous("The retained legacy document does not contain one exact extractable document topology.");
    }
    const htmlChildren = parsedElementChildren(html).map(parsedTagName);
    const headChildren = parsedElementChildren(head);
    const bodyChildren = parsedElementChildren(body).map(parsedTagName);
    const headerChildren = parsedElementChildren(header);
    const charsetMeta = headChildren[0];
    const viewportMeta = headChildren[1];
    const language = html.getAttribute("lang") ?? "";
    if (
      htmlChildren.length !== 2 ||
      htmlChildren[0] !== "head" ||
      htmlChildren[1] !== "body" ||
      headChildren.length !== 3 ||
      parsedTagName(charsetMeta) !== "meta" ||
      parsedTagName(viewportMeta) !== "meta" ||
      headChildren[2] !== title ||
      bodyChildren.length !== 3 ||
      bodyChildren[0] !== "header" ||
      bodyChildren[1] !== "main" ||
      bodyChildren[2] !== "footer" ||
      parsedTagName(head.parentNode) !== "html" ||
      parsedTagName(body.parentNode) !== "html" ||
      parsedTagName(title.parentNode) !== "head" ||
      parsedTagName(header.parentNode) !== "body" ||
      parsedTagName(main.parentNode) !== "body" ||
      parsedTagName(footer.parentNode) !== "body" ||
      headerChildren.length !== 1 ||
      headerChildren[0] !== primaryHeading ||
      parsedTagName(primaryHeading.parentNode) !== "header" ||
      parsedElementChildren(primaryHeading).length !== 0 ||
      parsedElementChildren(title).length !== 0 ||
      !hasOnlyWhitespaceTextChildren(html) ||
      !hasOnlyWhitespaceTextChildren(head) ||
      !hasOnlyWhitespaceTextChildren(body) ||
      !hasOnlyWhitespaceTextChildren(header) ||
      root.querySelectorAll("nav").length !== 0 ||
      root.querySelectorAll("link").length !== 0 ||
      root.querySelectorAll("script").length !== 0 ||
      root.querySelectorAll("meta").length !== 2 ||
      !hasExactParsedAttributes(html, { lang: language }) ||
      !hasExactParsedAttributes(head, {}) ||
      !hasExactParsedAttributes(body, {}) ||
      !hasExactParsedAttributes(title, {}) ||
      !hasExactParsedAttributes(header, {}) ||
      !hasExactParsedAttributes(main, {}) ||
      !hasExactParsedAttributes(footer, {}) ||
      !hasExactParsedAttributes(primaryHeading, {}) ||
      !hasExactParsedAttributes(charsetMeta, { charset: "utf-8" }) ||
      !hasExactParsedAttributes(viewportMeta, {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }) ||
      title.text !== input.expectedProjectTitle ||
      primaryHeading.text?.trim() !== input.expectedProjectTitle ||
      primaryHeading.text !== primaryHeading.text?.trim() ||
      typeof main.innerHTML !== "string" ||
      typeof footer.innerHTML !== "string"
    ) {
      return legacyAmbiguous("The retained legacy heading, landmark, or direct-child topology is not the exact unambiguous request-3 shape.");
    }

    const page: CreatorServerOwnedPageContract = {
      contractVersion: "codexforge.creator.page.v1",
      projectTitle: input.expectedProjectTitle,
      creatorKind: "website-browser-app",
      page: {
        language,
        primaryHeading: primaryHeading.text,
        headerContent: null,
        navigationContent: null,
        mainContent: main.innerHTML.trim(),
        footerContent: footer.innerHTML.trim(),
      },
      files: [],
      ...(parsed.bundle.explanation === undefined
        ? {}
        : { explanation: parsed.bundle.explanation }),
    };
    return composeWithProvenance({
      page,
      approvedProjectTitle: input.expectedProjectTitle,
      sourceResponseContractVersion: "legacy-bundle-v1",
      orderedOperations: CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
      inputDigest: semanticBundleDigest(parsed.bundle),
      inputHtmlSha256: hashCreatorSha256(inputHtml),
    });
  } catch {
    return legacyAmbiguous("The retained legacy document could not be structurally extracted without ambiguity.");
  }
}
