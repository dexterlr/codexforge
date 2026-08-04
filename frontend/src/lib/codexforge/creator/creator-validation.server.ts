import "server-only";

import path from "node:path";
import {
  parseCreatorArtifactOutput,
  type CreatorContractParseResult,
} from "./creator-contract.server";
import { hashCreatorCanonicalJson, hashCreatorSha256 } from "./creator-crypto";
import {
  validateCreatorCss,
  validateCreatorJavaScript,
  validateCreatorJavaScriptAgainstHtml,
  validateCreatorJsonFile,
  validateCreatorPlainText,
} from "./creator-code-validation.server";
import {
  validateCreatorHtml,
  validateCreatorSvg,
  type CreatorHtmlDomTarget,
  type CreatorLocalReference,
} from "./creator-markup-validation.server";
import { validateCreatorArtifactPaths } from "./creator-path-policy";
import {
  CREATOR_FILE_POLICY,
  CREATOR_MAX_VALIDATION_ISSUES,
} from "./creator-policy";
import type {
  CreatorArtifactBundle,
  CreatorValidationIssue,
  CreatorValidationResult,
} from "./creator-types";

function validationIssue(
  code: string,
  stage: number,
  filePath: string | null,
  message: string,
  suggestedRepairContext: string
): CreatorValidationIssue {
  return {
    code,
    stage,
    severity: "error",
    filePath,
    message,
    suggestedRepairContext,
    blocksMaterialization: true,
  };
}

function containsForbiddenCreatorTextControl(filePath: string, content: string): boolean {
  const extension = path.posix.extname(filePath);
  const allowedControls = extension === ".html" || extension === ".css"
    ? new Set(["\t", "\n", "\f", "\r"])
    : new Set(["\t", "\n", "\r"]);
  for (const character of content) {
    if ((/^\p{Cc}$/u.test(character) && !allowedControls.has(character)) ||
        /^\p{Cf}$/u.test(character) ||
        /^\p{Cs}$/u.test(character)) {
      return true;
    }
  }
  return false;
}

class IssueCollector {
  private readonly values: CreatorValidationIssue[] = [];
  private overflowed = false;

  add(...issues: readonly CreatorValidationIssue[]): void {
    for (const issue of issues) {
      if (this.overflowed) return;
      if (this.values.length >= CREATOR_MAX_VALIDATION_ISSUES - 1) {
        this.values.push(
          validationIssue(
            "validation.issue_limit",
            Math.max(1, Math.min(10, issue.stage)),
            null,
            `Validation stopped after ${CREATOR_MAX_VALIDATION_ISSUES - 1} findings.`,
            "Reduce the bundle and resolve the reported issue classes before requesting one explicit repair."
          )
        );
        this.overflowed = true;
        return;
      }
      this.values.push(normalizeValidationIssue(issue));
    }
  }

  list(): readonly CreatorValidationIssue[] {
    return this.values;
  }
}

function normalizeValidationIssue(issue: CreatorValidationIssue): CreatorValidationIssue {
  const normalizeText = (value: string, maximumLength: number, fallback: string): string => {
    const normalized = value
      .replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maximumLength);
    return normalized || fallback;
  };
  return {
    ...issue,
    code: normalizeText(issue.code, 80, "validation.issue_invalid"),
    filePath: issue.filePath
      ? normalizeText(issue.filePath, 120, "invalid-path")
      : null,
    message: normalizeText(issue.message, 240, "The provider output failed validation."),
    suggestedRepairContext: normalizeText(
      issue.suggestedRepairContext,
      240,
      "Return one complete bounded replacement bundle."
    ),
  };
}

function resolveLocalReference(
  reference: CreatorLocalReference,
  inventory: ReadonlySet<string>
): CreatorValidationIssue | null {
  const resolved = resolveLocalReferencePath(reference);
  if (
    resolved.startsWith("../") ||
    resolved === ".." ||
    path.posix.isAbsolute(resolved) ||
    !inventory.has(resolved)
  ) {
    return validationIssue(
      "reference.missing_or_unsafe",
      6,
      reference.sourcePath,
      `Local reference ${reference.reference.slice(0, 120)} does not resolve to an exact artifact path.`,
      "Reference an existing file with the exact case and a path contained in this bundle."
    );
  }
  if (reference.expectedExtension && path.posix.extname(resolved) !== reference.expectedExtension) {
    return validationIssue(
      "reference.type_mismatch",
      6,
      reference.sourcePath,
      `Local reference ${reference.reference.slice(0, 120)} has the wrong file type.`,
      `Reference one local ${reference.expectedExtension} file.`
    );
  }
  return null;
}

function resolveLocalReferencePath(reference: CreatorLocalReference): string {
  const sourceDirectory = path.posix.dirname(reference.sourcePath);
  return path.posix.normalize(
    sourceDirectory === "." ? reference.reference : `${sourceDirectory}/${reference.reference}`
  );
}

function buildValidationResult(input: {
  completedAt: string;
  stagesCompleted: readonly number[];
  issues: readonly CreatorValidationIssue[];
  bundle: CreatorArtifactBundle | null;
}): CreatorValidationResult {
  const issueDigest = hashCreatorCanonicalJson(input.issues);
  if (!input.bundle) {
    return {
      validationVersion: 1,
      valid: false,
      completedAt: input.completedAt,
      stagesCompleted: input.stagesCompleted,
      issues: input.issues,
      issueDigest,
      bundleDigest: null,
      manifestDigest: null,
    };
  }

  const fileInventory = input.bundle.files.map((file) => ({
    path: file.path,
    mediaType: file.mediaType,
    byteLength: Buffer.byteLength(file.content, "utf8"),
    sha256: hashCreatorSha256(Buffer.from(file.content, "utf8")),
  }));
  const bundleDigest = hashCreatorCanonicalJson({
    contractVersion: input.bundle.contractVersion,
    projectTitle: input.bundle.projectTitle,
    creatorKind: input.bundle.creatorKind,
    entrypoint: input.bundle.entrypoint,
    files: input.bundle.files,
    explanation: input.bundle.explanation ?? null,
  });
  const manifestDigest = hashCreatorCanonicalJson({
    entrypoint: input.bundle.entrypoint,
    files: fileInventory,
  });
  return {
    validationVersion: 1,
    valid: !input.issues.some(
      (issue) => issue.severity === "error" && issue.blocksMaterialization
    ),
    completedAt: input.completedAt,
    stagesCompleted: input.stagesCompleted,
    issues: input.issues,
    issueDigest,
    bundleDigest,
    manifestDigest,
  };
}

export type CreatorOutputValidation = Readonly<{
  parse: CreatorContractParseResult;
  bundle: CreatorArtifactBundle | null;
  validation: CreatorValidationResult;
}>;

export function validateCreatorProviderOutput(input: {
  rawOutput: string;
  expectedProjectTitle: string;
  completedAt?: string;
}): CreatorOutputValidation {
  const completedAt = input.completedAt ?? new Date().toISOString();
  const parse = parseCreatorArtifactOutput(input.rawOutput);
  if (!parse.ok) {
    const collector = new IssueCollector();
    collector.add(...parse.issues);
    return {
      parse,
      bundle: null,
      validation: buildValidationResult({
        completedAt,
        stagesCompleted: [1],
        issues: collector.list(),
        bundle: null,
      }),
    };
  }

  const bundle = parse.bundle;
  const collector = new IssueCollector();
  const stagesCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

  if (bundle.projectTitle !== input.expectedProjectTitle) {
    collector.add(
      validationIssue(
        "contract.project_title_mismatch",
        1,
        null,
        "The returned project title does not exactly match the approved plan.",
        "Return the exact approved project title without substitution."
      )
    );
  }

  if (bundle.files.length < 1 || bundle.files.length > CREATOR_FILE_POLICY.maximumFileCount) {
    collector.add(
      validationIssue(
        "limit.file_count",
        2,
        null,
        `Bundles require 1-${CREATOR_FILE_POLICY.maximumFileCount} files.`,
        "Return fewer complete files within the declared v0 limit."
      )
    );
  }
  let aggregateBytes = 0;
  for (const file of bundle.files) {
    const byteLength = Buffer.byteLength(file.content, "utf8");
    aggregateBytes += byteLength;
    if (byteLength > CREATOR_FILE_POLICY.maximumIndividualFileBytes) {
      collector.add(
        validationIssue(
          "limit.individual_file_bytes",
          2,
          file.path,
          `File exceeds ${CREATOR_FILE_POLICY.maximumIndividualFileBytes} UTF-8 bytes.`,
          "Reduce this file while keeping it complete."
        )
      );
    }
  }
  if (aggregateBytes > CREATOR_FILE_POLICY.maximumAggregateBytes) {
    collector.add(
      validationIssue(
        "limit.aggregate_bytes",
        2,
        null,
        `Bundle exceeds ${CREATOR_FILE_POLICY.maximumAggregateBytes} aggregate UTF-8 bytes.`,
        "Reduce the complete bundle to the declared aggregate limit."
      )
    );
  }

  const pathValidation = validateCreatorArtifactPaths(bundle.files);
  collector.add(...pathValidation.issues);

  const references: CreatorLocalReference[] = [];
  const htmlTargetsByPath = new Map<string, readonly CreatorHtmlDomTarget[]>();
  const javaScriptFiles = bundle.files.filter((file) => path.posix.extname(file.path) === ".js");
  const cssFiles = bundle.files.filter((file) => path.posix.extname(file.path) === ".css");
  if (javaScriptFiles.length > 1) {
    collector.add(
      validationIssue(
        "js.multiple_files_forbidden",
        4,
        null,
        "Website/Browser App v0 permits at most one classic JavaScript file so global execution remains unambiguous.",
        "Combine bounded browser behavior into one local .js file referenced once per HTML document."
      )
    );
  }
  for (const file of bundle.files) {
    const extension = path.posix.extname(file.path);
    if (containsForbiddenCreatorTextControl(file.path, file.content)) {
      collector.add(
        validationIssue(
          "content.control_or_format_character",
          4,
          file.path,
          "Textual creator files cannot contain control, format, or unpaired-surrogate characters outside exact syntax line whitespace.",
          "Remove invisible direction, isolation, zero-width, control, and unpaired-surrogate characters while preserving ordinary visible Unicode text."
        )
      );
    }
    if (extension === ".html") {
      const result = validateCreatorHtml(file.path, file.content);
      collector.add(...result.issues);
      references.push(...result.references);
      htmlTargetsByPath.set(file.path, result.domTargets);
    } else if (extension === ".css") {
      collector.add(...validateCreatorCss(file.path, file.content));
    } else if (extension === ".js") {
      collector.add(...validateCreatorJavaScript(file.path, file.content));
    } else if (extension === ".svg") {
      collector.add(...validateCreatorSvg(file.path, file.content));
    } else if (extension === ".json") {
      collector.add(...validateCreatorJsonFile(file.path, file.content));
    } else if (extension === ".md" || extension === ".txt") {
      collector.add(...validateCreatorPlainText(file.path, file.content));
    }
  }
  if (cssFiles.length > 1) {
    const bundleCssContrastIssues = validateCreatorCss(
      cssFiles[0].path,
      cssFiles.map((file) => file.content).join("\n")
    ).filter((issue) => issue.code === "css.contrast_insufficient");
    collector.add(...bundleCssContrastIssues);
  }

  const entrypoint = bundle.files.filter((file) => file.path === "index.html");
  if (
    bundle.entrypoint !== "index.html" ||
    entrypoint.length !== 1 ||
    entrypoint[0]?.mediaType !== "text/html"
  ) {
    collector.add(
      validationIssue(
        "entrypoint.invalid",
        5,
        "index.html",
        "Preview requires exactly one text/html root index.html entrypoint.",
        "Return one complete root index.html as the first file."
      )
    );
  }

  const inventory = new Set(bundle.files.map((file) => file.path));
  const scriptHtmlPaths = new Map<string, Set<string>>();
  const seenScriptReferences = new Set<string>();
  for (const reference of references) {
    const referenceIssue = resolveLocalReference(reference, inventory);
    if (referenceIssue) collector.add(referenceIssue);
    if (reference.expectedExtension === ".js" && !referenceIssue) {
      const resolved = resolveLocalReferencePath(reference);
      const referenceKey = `${reference.sourcePath}\u0000${resolved}`;
      if (seenScriptReferences.has(referenceKey)) {
        collector.add(
          validationIssue(
            "js.duplicate_load",
            4,
            reference.sourcePath,
            `Classic script ${resolved} is referenced more than once by the same HTML document.`,
            "Reference the one local JavaScript file exactly once per HTML document."
          )
        );
      } else {
        seenScriptReferences.add(referenceKey);
        const htmlPaths = scriptHtmlPaths.get(resolved) ?? new Set<string>();
        htmlPaths.add(reference.sourcePath);
        scriptHtmlPaths.set(resolved, htmlPaths);
      }
    }
  }
  for (const file of javaScriptFiles) {
    const htmlPaths = scriptHtmlPaths.get(file.path);
    if (!htmlPaths?.size) {
      collector.add(
        validationIssue(
          "js.unreferenced",
          6,
          file.path,
          "The JavaScript file is not referenced by any validated HTML document.",
          "Reference the one local script exactly once from an HTML document, or remove it."
        )
      );
      continue;
    }
    for (const htmlPath of htmlPaths) {
      collector.add(
        ...validateCreatorJavaScriptAgainstHtml(
          file.path,
          file.content,
          htmlTargetsByPath.get(htmlPath) ?? []
        )
      );
    }
  }

  const issues = collector.list();
  if (issues.some((issue) => issue.severity === "error")) {
    collector.add(
      validationIssue(
        "preview.not_ready",
        9,
        null,
        "Preview is unavailable while any blocking validation issue remains.",
        "Resolve every error in a separately approved complete replacement bundle."
      )
    );
  }

  const finalIssues = collector.list();
  const hasBlockingIssue = finalIssues.some(
    (issue) => issue.severity === "error" && issue.blocksMaterialization
  );
  const acceptedBundle = hasBlockingIssue ? null : bundle;
  return {
    parse,
    bundle: acceptedBundle,
    validation: buildValidationResult({
      completedAt,
      stagesCompleted,
      issues: finalIssues,
      bundle: acceptedBundle,
    }),
  };
}

export function buildCreatorValidationDigest(
  validation: CreatorValidationResult
): string {
  return hashCreatorCanonicalJson({
    validationVersion: validation.validationVersion,
    valid: validation.valid,
    completedAt: validation.completedAt,
    stagesCompleted: validation.stagesCompleted,
    issues: validation.issues,
    issueDigest: validation.issueDigest,
    bundleDigest: validation.bundleDigest,
    manifestDigest: validation.manifestDigest,
  });
}
