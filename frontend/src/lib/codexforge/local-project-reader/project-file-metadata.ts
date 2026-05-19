import type {
  ProjectFileCategory,
  ProjectFileMarkers,
  ProjectFileMetadata,
  ProjectPreviewEligibility,
  ProjectReaderEntry,
} from "./local-project-reader-types";

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  ".ts": "TypeScript",
  ".tsx": "TSX",
  ".js": "JavaScript",
  ".jsx": "JSX",
  ".json": "JSON",
  ".md": "Markdown",
  ".mdx": "MDX",
  ".css": "CSS",
  ".scss": "SCSS",
  ".sass": "Sass",
  ".yml": "YAML",
  ".yaml": "YAML",
  ".ps1": "PowerShell",
  ".svg": "SVG",
  ".txt": "Text",
};

const ASSET_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".mp4",
  ".mp3",
  ".woff",
  ".woff2",
]);

export function normalizeProjectReaderPath(path: string): string {
  return path.trim().replaceAll("\\", "/").replace(/^\.\/+/, "");
}

export function getProjectFileName(filePath: string): string {
  const normalized = normalizeProjectReaderPath(filePath);
  return normalized.split("/").filter(Boolean).pop() ?? normalized;
}

export function getProjectFileExtension(filePath: string): string {
  const name = getProjectFileName(filePath);
  if (name.startsWith(".") && name.indexOf(".", 1) === -1) return name.toLowerCase();
  const index = name.lastIndexOf(".");
  return index > -1 ? name.slice(index).toLowerCase() : "";
}

export function formatProjectReaderSize(bytes?: number): string {
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) return "unknown";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 104857.6) / 10} MB`;
}

export function detectProjectFileMarkers(filePath: string): ProjectFileMarkers {
  const path = normalizeProjectReaderPath(filePath).toLowerCase();
  const name = getProjectFileName(path);
  const extension = getProjectFileExtension(path);

  return {
    route: path.includes("/app/") && (name === "page.tsx" || name === "layout.tsx"),
    component: path.includes("/components/") || /^[A-Z]/.test(getProjectFileName(filePath)),
    tool: path.includes("/tools/") || path.includes("-tool") || path.includes("tool-"),
    smoke: path.includes("scripts/smoke-codexforge"),
    test:
      path.includes("/__tests__/") ||
      path.includes(".test.") ||
      path.includes(".spec.") ||
      path.includes("/tests/"),
    doc: extension === ".md" || extension === ".mdx" || path.includes("/docs/"),
    api: path.includes("/api/") && name === "route.ts",
    style: extension === ".css" || extension === ".scss" || extension === ".sass",
    config:
      name === "package.json" ||
      name === "tsconfig.json" ||
      name.includes("config") ||
      name.startsWith(".env") ||
      name.startsWith(".eslintrc") ||
      name.startsWith(".prettierrc"),
    asset: ASSET_EXTENSIONS.has(extension),
  };
}

export function classifyProjectFileCategory(filePath: string): ProjectFileCategory {
  const path = normalizeProjectReaderPath(filePath).toLowerCase();
  const name = getProjectFileName(path);
  const markers = detectProjectFileMarkers(filePath);

  if (markers.smoke) return "smoke";
  if (markers.test) return "test";
  if (markers.api) return "api";
  if (markers.route) return "route";
  if (markers.component) return "component";
  if (markers.tool) return "tool";
  if (path.includes("/lib/codexforge/")) return "domain";
  if (markers.config) return "config";
  if (markers.doc) return "docs";
  if (markers.style) return "style";
  if (markers.asset) return "asset";
  if (name === "route.ts") return "api";
  return "unknown";
}

export function inferProjectFileLanguage(filePath: string): string {
  const extension = getProjectFileExtension(filePath);
  return LANGUAGE_BY_EXTENSION[extension] ?? (extension ? extension.slice(1).toUpperCase() : "Text");
}

function inferProbableRole(filePath: string, category: ProjectFileCategory): string {
  const path = normalizeProjectReaderPath(filePath).toLowerCase();
  const name = getProjectFileName(path);

  if (name === "page.tsx" || name === "page-client.tsx") return "route surface";
  if (name === "route.ts") return "API route boundary";
  if (path.includes("components/")) return "UI component";
  if (path.includes("scripts/smoke-codexforge")) return "smoke validation";
  if (path.includes("/tools/")) return "tool boundary";
  if (name === "index.ts") return "barrel exports";
  if (name.endsWith("types.ts") || name === "types.ts") return "type contract";
  if (path.includes("storage")) return "storage boundary";
  if (category === "config") return "project configuration";
  if (category === "docs") return "documentation";
  return `${category} file`;
}

function previewEligibility(entry: Pick<ProjectReaderEntry, "binary" | "generated" | "sizeBytes">): ProjectPreviewEligibility {
  if (entry.binary || entry.generated) return "binary-blocked";
  if (typeof entry.sizeBytes === "number" && entry.sizeBytes > 512 * 1024) return "size-blocked";
  return "eligible";
}

export function buildProjectFileMetadata(entry: ProjectReaderEntry | string): ProjectFileMetadata {
  const source: ProjectReaderEntry =
    typeof entry === "string" ? { path: entry, type: "file" } : entry;
  const normalizedPath = normalizeProjectReaderPath(source.path);
  const name = source.name ?? getProjectFileName(normalizedPath);
  const extension = source.extension ?? getProjectFileExtension(normalizedPath);
  const category = classifyProjectFileCategory(normalizedPath);

  return {
    path: normalizedPath,
    name,
    extension,
    category,
    probableRole: inferProbableRole(normalizedPath, category),
    language: inferProjectFileLanguage(normalizedPath),
    sizeLabel: source.sizeLabel ?? formatProjectReaderSize(source.sizeBytes),
    lineCount: typeof source.lineCount === "number" ? source.lineCount : null,
    importCount: typeof source.importCount === "number" ? source.importCount : null,
    exportCount: typeof source.exportCount === "number" ? source.exportCount : null,
    markers: detectProjectFileMarkers(normalizedPath),
    readOnlyPosture: "read-only inspection; no file writes and no command execution",
    safePreviewEligibility: previewEligibility(source),
  };
}

export function summarizeProjectFileMetadata(metadata: ProjectFileMetadata): string {
  const counts = [
    metadata.lineCount !== null ? `${metadata.lineCount} lines` : "",
    metadata.importCount !== null ? `${metadata.importCount} imports` : "",
    metadata.exportCount !== null ? `${metadata.exportCount} exports` : "",
  ].filter(Boolean);

  return `${metadata.path} is a ${metadata.category} ${metadata.language} file with probable role ${metadata.probableRole}. ${counts.join(", ") || "No line/import/export counts supplied"}. Preview is ${metadata.safePreviewEligibility}.`;
}

