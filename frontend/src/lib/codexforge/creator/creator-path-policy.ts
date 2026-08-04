import path from "node:path";
import { CREATOR_ALLOWED_MEDIA_TYPES, CREATOR_FILE_POLICY } from "./creator-policy";
import type { CreatorArtifactFile, CreatorValidationIssue } from "./creator-types";

const WINDOWS_DEVICE_NAMES = new Set([
  "con",
  "prn",
  "aux",
  "nul",
  ...Array.from({ length: 9 }, (_, index) => `com${index + 1}`),
  ...Array.from({ length: 9 }, (_, index) => `lpt${index + 1}`),
]);

const FORBIDDEN_SEGMENTS = new Set([".git", ".codexforge", "node_modules"]);
const FORBIDDEN_PACKAGE_FILES = new Set([
  "package.json",
  "package-lock.json",
  "npm-shrinkwrap.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
  "deno.json",
  "deno.jsonc",
]);

function issue(
  code: string,
  filePath: string | null,
  message: string
): CreatorValidationIssue {
  return {
    code,
    stage: 3,
    severity: "error",
    filePath,
    message,
    suggestedRepairContext: "Replace the path with a unique bounded project-relative static-file path.",
    blocksMaterialization: true,
  };
}

function compareAscii(left: string, right: string): number {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function isCaseInsensitiveAncestorPath(
  possibleAncestor: readonly string[],
  possibleDescendant: readonly string[]
): boolean {
  return (
    possibleAncestor.length < possibleDescendant.length &&
    possibleAncestor.every(
      (segment, index) =>
        segment.toLowerCase() === possibleDescendant[index]?.toLowerCase()
    )
  );
}

export type CreatorValidatedPath = Readonly<{
  path: string;
  extension: keyof typeof CREATOR_ALLOWED_MEDIA_TYPES;
  mediaType: string;
}>;

export type CreatorPathValidationResult = Readonly<{
  validPaths: readonly CreatorValidatedPath[];
  issues: readonly CreatorValidationIssue[];
}>;

export function validateCreatorArtifactPaths(
  files: readonly CreatorArtifactFile[]
): CreatorPathValidationResult {
  const issues: CreatorValidationIssue[] = [];
  const validPaths: CreatorValidatedPath[] = [];
  const exactPaths = new Set<string>();
  const foldedPaths = new Set<string>();
  const structuralPaths: string[][] = [];
  let entrypointCount = 0;

  files.forEach((file, index) => {
    const candidate = file.path;
    const issuePath = typeof candidate === "string" ? candidate.slice(0, 160) : null;

    if (
      !candidate ||
      candidate.length > CREATOR_FILE_POLICY.maximumRelativePathLength ||
      !/^[\x20-\x7e]+$/.test(candidate)
    ) {
      issues.push(
        issue(
          "path.invalid_length_or_charset",
          issuePath,
          `Paths must contain 1-${CREATOR_FILE_POLICY.maximumRelativePathLength} printable ASCII characters.`
        )
      );
      return;
    }

    if (
      candidate.includes("\\") ||
      candidate.includes("%") ||
      candidate.includes(":") ||
      candidate.includes("\0") ||
      candidate.startsWith("/") ||
      candidate.endsWith("/") ||
      candidate.startsWith("//") ||
      /^[A-Za-z]:/.test(candidate) ||
      path.win32.isAbsolute(candidate) ||
      path.posix.isAbsolute(candidate)
    ) {
      issues.push(
        issue(
          "path.absolute_encoded_or_namespace",
          issuePath,
          "Absolute, drive, UNC, namespace, encoded, backslash, NUL, and alternate-stream paths are forbidden."
        )
      );
      return;
    }

    const segments = candidate.split("/");
    if (
      segments.some((segment) => !segment || segment === "." || segment === "..") ||
      segments.length - 1 > CREATOR_FILE_POLICY.maximumDirectoryDepth
    ) {
      issues.push(
        issue(
          "path.traversal_or_depth",
          issuePath,
          `Paths cannot contain empty, dot, or traversal segments and may use at most ${CREATOR_FILE_POLICY.maximumDirectoryDepth} directories.`
        )
      );
      return;
    }

    for (const segment of segments) {
      const foldedSegment = segment.toLowerCase();
      const deviceStem = foldedSegment.split(".", 1)[0];
      if (
        segment.length > CREATOR_FILE_POLICY.maximumPathSegmentLength ||
        !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment) ||
        segment.endsWith(".") ||
        segment.endsWith(" ") ||
        FORBIDDEN_SEGMENTS.has(foldedSegment) ||
        WINDOWS_DEVICE_NAMES.has(deviceStem)
      ) {
        issues.push(
          issue(
            "path.unsafe_segment",
            issuePath,
            `Every segment must match ${CREATOR_FILE_POLICY.allowedSegmentPattern}, remain within ${CREATOR_FILE_POLICY.maximumPathSegmentLength} characters, and avoid reserved names.`
          )
        );
        return;
      }
    }

    const fileName = segments.at(-1)?.toLowerCase() ?? "";
    if (FORBIDDEN_PACKAGE_FILES.has(fileName)) {
      issues.push(
        issue(
          "path.package_manifest_forbidden",
          issuePath,
          "Package and lock manifests are not supported in Website/Browser App v0."
        )
      );
      return;
    }

    if (
      structuralPaths.some(
        (existingSegments) =>
          isCaseInsensitiveAncestorPath(existingSegments, segments) ||
          isCaseInsensitiveAncestorPath(segments, existingSegments)
      )
    ) {
      issues.push(
        issue(
          "path.file_directory_collision",
          issuePath,
          "A file path cannot also be an ancestor directory, including under case-insensitive comparison."
        )
      );
    }
    structuralPaths.push(segments);

    const extension = path.posix.extname(candidate);
    if (
      extension !== extension.toLowerCase() ||
      !Object.prototype.hasOwnProperty.call(CREATOR_ALLOWED_MEDIA_TYPES, extension)
    ) {
      issues.push(
        issue(
          "path.extension_forbidden",
          issuePath,
          "Only lowercase .html, .css, .js, .json, .svg, .md, and .txt files are supported."
        )
      );
      return;
    }

    const expectedMediaType = CREATOR_ALLOWED_MEDIA_TYPES[
      extension as keyof typeof CREATOR_ALLOWED_MEDIA_TYPES
    ];
    if (file.mediaType !== expectedMediaType) {
      issues.push(
        issue(
          "path.media_type_mismatch",
          issuePath,
          `The ${extension} extension requires media type ${expectedMediaType}.`
        )
      );
      return;
    }

    const foldedPath = candidate.toLowerCase();
    if (exactPaths.has(candidate)) {
      issues.push(issue("path.duplicate", issuePath, "Duplicate artifact paths are forbidden."));
      return;
    }
    if (foldedPaths.has(foldedPath)) {
      issues.push(
        issue(
          "path.case_collision",
          issuePath,
          "Case-insensitive path collisions are forbidden on every platform."
        )
      );
      return;
    }

    exactPaths.add(candidate);
    foldedPaths.add(foldedPath);
    if (candidate === CREATOR_FILE_POLICY.entrypoint) {
      entrypointCount += 1;
    }
    if (index === 0 && candidate !== CREATOR_FILE_POLICY.entrypoint) {
      issues.push(
        issue(
          "path.entrypoint_not_first",
          issuePath,
          "The first ordered file must be the exact root entrypoint index.html."
        )
      );
    }
    if (index > 1 && compareAscii(files[index - 1].path, candidate) >= 0) {
      issues.push(
        issue(
          "path.order_invalid",
          issuePath,
          "Files after index.html must be in strict ascending ASCII path order."
        )
      );
    }

    validPaths.push({
      path: candidate,
      extension: extension as keyof typeof CREATOR_ALLOWED_MEDIA_TYPES,
      mediaType: expectedMediaType,
    });
  });

  if (entrypointCount !== 1) {
    issues.push(
      issue(
        "path.entrypoint_count",
        null,
        "The bundle must contain index.html exactly once."
      )
    );
  }

  return { validPaths, issues };
}

export function assertCreatorRouteFilePath(value: string): string {
  const placeholder: CreatorArtifactFile = {
    path: value,
    mediaType:
      CREATOR_ALLOWED_MEDIA_TYPES[
        path.posix.extname(value) as keyof typeof CREATOR_ALLOWED_MEDIA_TYPES
      ] ?? "application/octet-stream",
    content: "",
  };
  const result = validateCreatorArtifactPaths(
    value === CREATOR_FILE_POLICY.entrypoint
      ? [placeholder]
      : [
          {
            path: CREATOR_FILE_POLICY.entrypoint,
            mediaType: "text/html",
            content: "",
          },
          placeholder,
        ].sort((left, right) => {
          if (left.path === CREATOR_FILE_POLICY.entrypoint) return -1;
          if (right.path === CREATOR_FILE_POLICY.entrypoint) return 1;
          return compareAscii(left.path, right.path);
        })
  );
  const candidateIssue = result.issues.find(
    (item) => item.filePath === value && item.code !== "path.order_invalid"
  );
  if (candidateIssue) {
    throw new Error(candidateIssue.message);
  }
  return value;
}
