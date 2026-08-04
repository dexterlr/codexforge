import "server-only";

import {
  CREATOR_CONTRACT_VERSION,
  type CreatorArtifactBundle,
  type CreatorArtifactFile,
  type CreatorValidationIssue,
} from "./creator-types";
import {
  CREATOR_FILE_POLICY,
  CREATOR_MAX_EXPLANATION_LENGTH,
  CREATOR_MAX_PROJECT_TITLE_LENGTH,
  CREATOR_MAX_PROVIDER_OUTPUT_CHARACTERS,
} from "./creator-policy";

type JsonScanState = { source: string; index: number };

export class CreatorDuplicateJsonKeyError extends Error {
  constructor(key: string) {
    super(`Duplicate JSON object key: ${key.slice(0, 80)}.`);
    this.name = "CreatorDuplicateJsonKeyError";
  }
}

function skipWhitespace(state: JsonScanState): void {
  while (/\s/.test(state.source[state.index] ?? "")) state.index += 1;
}

function scanString(state: JsonScanState): string {
  const start = state.index;
  if (state.source[state.index] !== '"') throw new Error("Expected JSON string.");
  state.index += 1;
  while (state.index < state.source.length) {
    const character = state.source[state.index];
    if (character === '"') {
      state.index += 1;
      return JSON.parse(state.source.slice(start, state.index)) as string;
    }
    if (character === "\\") {
      state.index += 1;
      const escape = state.source[state.index];
      if (escape === "u") {
        const hex = state.source.slice(state.index + 1, state.index + 5);
        if (!/^[a-fA-F0-9]{4}$/.test(hex)) throw new Error("Invalid Unicode escape.");
        state.index += 5;
        continue;
      }
      if (!escape || !'"\\/bfnrt'.includes(escape)) throw new Error("Invalid JSON escape.");
      state.index += 1;
      continue;
    }
    if (!character || character.charCodeAt(0) < 0x20) {
      throw new Error("Invalid control character in JSON string.");
    }
    state.index += 1;
  }
  throw new Error("Unterminated JSON string.");
}

function scanValue(state: JsonScanState): void {
  skipWhitespace(state);
  const character = state.source[state.index];
  if (character === '"') {
    scanString(state);
    return;
  }
  if (character === "{") {
    state.index += 1;
    const keys = new Set<string>();
    skipWhitespace(state);
    if (state.source[state.index] === "}") {
      state.index += 1;
      return;
    }
    while (state.index < state.source.length) {
      skipWhitespace(state);
      const key = scanString(state);
      if (keys.has(key)) throw new CreatorDuplicateJsonKeyError(key);
      keys.add(key);
      skipWhitespace(state);
      if (state.source[state.index] !== ":") throw new Error("Expected JSON colon.");
      state.index += 1;
      scanValue(state);
      skipWhitespace(state);
      if (state.source[state.index] === "}") {
        state.index += 1;
        return;
      }
      if (state.source[state.index] !== ",") throw new Error("Expected JSON object comma.");
      state.index += 1;
    }
    throw new Error("Unterminated JSON object.");
  }
  if (character === "[") {
    state.index += 1;
    skipWhitespace(state);
    if (state.source[state.index] === "]") {
      state.index += 1;
      return;
    }
    while (state.index < state.source.length) {
      scanValue(state);
      skipWhitespace(state);
      if (state.source[state.index] === "]") {
        state.index += 1;
        return;
      }
      if (state.source[state.index] !== ",") throw new Error("Expected JSON array comma.");
      state.index += 1;
    }
    throw new Error("Unterminated JSON array.");
  }
  const remainder = state.source.slice(state.index);
  const token = /^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(remainder)?.[0];
  if (!token) throw new Error("Invalid JSON value.");
  state.index += token.length;
}

export function assertCreatorJsonHasUniqueObjectKeys(source: string): void {
  const state = { source, index: 0 };
  scanValue(state);
  skipWhitespace(state);
  if (state.index !== source.length) throw new Error("Additional JSON content is forbidden.");
}

function hasInvalidUnicode(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next < 0xdc00 || next > 0xdfff) return true;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

export function isValidCreatorProjectTitle(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= CREATOR_MAX_PROJECT_TITLE_LENGTH &&
    value === value.trim() &&
    !/[\u0000-\u001f\u007f\p{Cf}]/u.test(value) &&
    isSafeCreatorVisibleUnicode(value)
  );
}

export function isSafeCreatorVisibleUnicode(value: string): boolean {
  return (
    !/\p{Cf}/u.test(value) &&
    !hasInvalidUnicode(value) &&
    /[\p{L}\p{N}\p{P}\p{S}]/u.test(value.normalize("NFKC"))
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function exactKeys(
  value: Record<string, unknown>,
  required: readonly string[],
  optional: readonly string[] = []
): string | null {
  const allowed = new Set([...required, ...optional]);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  const missing = required.filter((key) => !Object.prototype.hasOwnProperty.call(value, key));
  if (unknown.length > 0) {
    return `The contract contains ${unknown.length} forbidden field${unknown.length === 1 ? "" : "s"}.`;
  }
  if (missing.length > 0) return `Required fields are missing: ${missing.join(", ")}.`;
  return null;
}

function contractIssue(code: string, message: string): CreatorValidationIssue {
  const boundedMessage = message
    .replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
  return {
    code,
    stage: 1,
    severity: "error",
    filePath: null,
    message: boundedMessage || "The provider output does not match the creator contract.",
    suggestedRepairContext: "Return one complete JSON document matching codexforge.creator.bundle.v1 exactly.",
    blocksMaterialization: true,
  };
}

function normalizeExactJsonDocument(rawOutput: string): string {
  const trimmed = rawOutput.trim();
  const fenced = /^```json\r?\n([\s\S]*)\r?\n```$/.exec(trimmed);
  if (fenced) return fenced[1];
  if (trimmed.startsWith("```") || trimmed.endsWith("```") || !trimmed.startsWith("{")) {
    throw new Error("Output must be raw JSON or one exact lowercase json code fence with no prose.");
  }
  return trimmed;
}

export type CreatorContractParseResult =
  | Readonly<{ ok: true; bundle: CreatorArtifactBundle }>
  | Readonly<{ ok: false; issues: readonly CreatorValidationIssue[] }>;

export function parseCreatorArtifactOutput(rawOutput: string): CreatorContractParseResult {
  if (
    typeof rawOutput !== "string" ||
    rawOutput.length === 0 ||
    rawOutput.length > CREATOR_MAX_PROVIDER_OUTPUT_CHARACTERS
  ) {
    return {
      ok: false,
      issues: [
        contractIssue(
          "contract.output_size",
          `Provider output must contain 1-${CREATOR_MAX_PROVIDER_OUTPUT_CHARACTERS} characters.`
        ),
      ],
    };
  }

  let parsed: unknown;
  try {
    const normalized = normalizeExactJsonDocument(rawOutput);
    assertCreatorJsonHasUniqueObjectKeys(normalized);
    parsed = JSON.parse(normalized) as unknown;
  } catch (error) {
    return {
      ok: false,
      issues: [
        contractIssue(
          "contract.json_invalid",
          error instanceof Error ? error.message.slice(0, 220) : "Output JSON is invalid."
        ),
      ],
    };
  }

  const root = asRecord(parsed);
  if (!root) {
    return { ok: false, issues: [contractIssue("contract.root_type", "The contract root must be a JSON object.")] };
  }
  const rootKeys = exactKeys(
    root,
    ["contractVersion", "projectTitle", "creatorKind", "entrypoint", "files"],
    ["explanation"]
  );
  if (rootKeys) {
    return { ok: false, issues: [contractIssue("contract.fields", rootKeys)] };
  }

  if (root.contractVersion !== CREATOR_CONTRACT_VERSION) {
    return { ok: false, issues: [contractIssue("contract.version", `contractVersion must be ${CREATOR_CONTRACT_VERSION}.`)] };
  }
  if (
    typeof root.projectTitle !== "string" ||
    !isValidCreatorProjectTitle(root.projectTitle)
  ) {
    return { ok: false, issues: [contractIssue("contract.project_title", "projectTitle is invalid or out of bounds.")] };
  }
  if (root.creatorKind !== "website-browser-app") {
    return { ok: false, issues: [contractIssue("contract.creator_kind", "creatorKind must be website-browser-app.")] };
  }
  if (root.entrypoint !== CREATOR_FILE_POLICY.entrypoint) {
    return { ok: false, issues: [contractIssue("contract.entrypoint", "entrypoint must be exactly index.html.")] };
  }
  if (
    root.explanation !== undefined &&
    (typeof root.explanation !== "string" ||
      root.explanation.length > CREATOR_MAX_EXPLANATION_LENGTH ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\p{Cf}]/u.test(root.explanation) ||
      !isSafeCreatorVisibleUnicode(root.explanation))
  ) {
    return { ok: false, issues: [contractIssue("contract.explanation", "explanation must be a valid bounded string when provided.")] };
  }
  if (!Array.isArray(root.files)) {
    return { ok: false, issues: [contractIssue("contract.files_type", "files must be an ordered JSON array.")] };
  }

  const files: CreatorArtifactFile[] = [];
  for (let index = 0; index < root.files.length; index += 1) {
    const file = asRecord(root.files[index]);
    if (!file) {
      return { ok: false, issues: [contractIssue("contract.file_type", `files[${index}] must be an object.`)] };
    }
    const fileKeys = exactKeys(file, ["path", "mediaType", "content"]);
    if (fileKeys) {
      return { ok: false, issues: [contractIssue("contract.file_fields", `files[${index}]: ${fileKeys}`)] };
    }
    if (
      typeof file.path !== "string" ||
      typeof file.mediaType !== "string" ||
      typeof file.content !== "string" ||
      hasInvalidUnicode(file.path) ||
      hasInvalidUnicode(file.mediaType) ||
      hasInvalidUnicode(file.content)
    ) {
      return {
        ok: false,
        issues: [contractIssue("contract.file_values", `files[${index}] contains invalid string fields.`)],
      };
    }
    files.push({ path: file.path, mediaType: file.mediaType, content: file.content });
  }

  return {
    ok: true,
    bundle: {
      contractVersion: CREATOR_CONTRACT_VERSION,
      projectTitle: root.projectTitle.trim(),
      creatorKind: "website-browser-app",
      entrypoint: "index.html",
      files,
      ...(typeof root.explanation === "string" ? { explanation: root.explanation } : {}),
    },
  };
}

export const CREATOR_GENERATION_INSTRUCTION_PREFIX = `You are producing one bounded static Website/Browser App v0 for CodexForge. Return only one JSON document matching this exact shape: {"contractVersion":"codexforge.creator.bundle.v1","projectTitle":"...","creatorKind":"website-browser-app","entrypoint":"index.html","files":[{"path":"index.html","mediaType":"text/html","content":"complete text"}],"explanation":"optional"}. Unknown fields and executable commands are forbidden. index.html must be first; remaining files must be strict ASCII-path sorted. Produce no package dependencies, CDN or remote assets, network requests, external fonts, inline event handlers, inline scripts or styles, server code, shell commands, secrets, environment variables, forms, embedded frames/objects, or unsafe URLs. Every anchor must have one safe local href and every button must explicitly use type="button". Put at most one script in one local .js file and styles in local .css files. JavaScript may only query exact IDs already declared in the validated HTML, register each bounded event listener once at top level, and update literal textContent, classes, or typed value/checked/disabled state. Use immutable const/let data; do not use var or reassign/update identifiers except the exact counter of a validator-proven bounded for loop. JavaScript must not construct, append, parse, or inject DOM/HTML; mutate URLs, resources, CSSOM/style, input type/files, or navigation; use browser method destructuring/reflection, server globals, timers, storage, file APIs, workers/worklets, or network-capable APIs. CSS must use the conservative local selector grammar and must not hide content, disable interaction, move content off screen, animate, or load resources. Use accessible semantic HTML with a single h1, html lang, title, viewport, main landmark, labels, and alt text. Use only .html text/html, .css text/css, .js text/javascript, .json application/json, .svg image/svg+xml, .md text/markdown, and .txt text/plain. Maximum 12 files, 24576 UTF-8 bytes per file, 49152 aggregate bytes, 120 ASCII characters per path, 48 per segment, and three directories. The exact entrypoint is index.html. Do not include prose or more than one document.`;

export function buildCreatorGenerationInstruction(input: {
  projectTitle: string;
  description: string;
}): string {
  return `${CREATOR_GENERATION_INSTRUCTION_PREFIX}\nProject title: ${input.projectTitle}\nBounded user brief:\n${input.description}`;
}

export function buildCreatorRepairInstruction(input: {
  projectTitle: string;
  description: string;
  sourceArtifactRevision: number | null;
  issueDigest: string;
  issues: readonly CreatorValidationIssue[];
}): string {
  const boundedIssues = input.issues.slice(0, 8).map((item) => ({
    code: item.code.slice(0, 80),
    filePath: item.filePath?.slice(0, 120) ?? null,
    message: item.message.slice(0, 160),
  }));
  return `${CREATOR_GENERATION_INSTRUCTION_PREFIX}\nThis is the one permitted explicit repair. Return a complete replacement bundle, not a patch.\nProject title: ${input.projectTitle}\nOriginal bounded brief:\n${input.description}\nSource artifact revision: ${input.sourceArtifactRevision ?? "none"}\nValidation issue digest: ${input.issueDigest}\nBounded issues: ${JSON.stringify(boundedIssues)}`;
}
