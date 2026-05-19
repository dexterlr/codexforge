import type {
  ProjectFileCategory,
  ProjectReaderEntry,
  ProjectTreeModel,
  ProjectTreeNode,
  ProjectTreeNodeType,
  ProjectTreeSummary,
} from "./local-project-reader-types";
import {
  buildLocalProjectReaderStableKey,
} from "./local-project-reader-types";
import {
  classifyProjectFileCategory,
  formatProjectReaderSize,
  getProjectFileExtension,
  getProjectFileName,
  normalizeProjectReaderPath,
} from "./project-file-metadata";
import { classifyProjectFileRisk } from "./project-file-risk";

function parentPathOf(path: string): string {
  const parts = normalizeProjectReaderPath(path).split("/").filter(Boolean);
  parts.pop();
  return parts.join("/");
}

function depthOf(path: string): number {
  const normalized = normalizeProjectReaderPath(path);
  if (!normalized) return 0;
  return normalized.split("/").filter(Boolean).length;
}

function normalizeEntryType(type?: ProjectTreeNodeType): ProjectTreeNodeType {
  return type === "directory" ? "directory" : "file";
}

function routeCategoryHint(path: string, type: ProjectTreeNodeType): ProjectFileCategory {
  if (type === "directory") {
    const lower = normalizeProjectReaderPath(path).toLowerCase();
    if (lower.includes("/components") || lower.endsWith("components")) return "component";
    if (lower.includes("/api") || lower.endsWith("api")) return "api";
    if (lower.includes("/tools") || lower.endsWith("tools")) return "tool";
    if (lower.includes("scripts")) return "smoke";
    if (lower.includes("docs")) return "docs";
    if (lower.includes("/lib/codexforge")) return "domain";
    return "unknown";
  }

  return classifyProjectFileCategory(path);
}

function compareProjectTreeNodes(a: ProjectTreeNode, b: ProjectTreeNode): number {
  if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
  return a.path.localeCompare(b.path);
}

function rootNode(): ProjectTreeNode {
  return {
    id: "project-root",
    path: "",
    name: "project",
    type: "directory",
    extension: "",
    depth: 0,
    parentPath: "",
    childCount: 0,
    sizeLabel: "",
    routeCategoryHint: "unknown",
    riskHint: "low",
    selectable: false,
    children: [],
  };
}

function directoryEntry(path: string): ProjectReaderEntry {
  return {
    path,
    name: getProjectFileName(path),
    type: "directory",
    depth: depthOf(path),
    parentPath: parentPathOf(path),
  };
}

function expandDirectoryEntries(entries: ProjectReaderEntry[]): ProjectReaderEntry[] {
  const byPath = new Map<string, ProjectReaderEntry>();

  for (const entry of entries) {
    const normalizedPath = normalizeProjectReaderPath(entry.path);
    if (!normalizedPath) continue;

    const normalizedEntry: ProjectReaderEntry = {
      ...entry,
      path: normalizedPath,
      type: normalizeEntryType(entry.type),
    };
    byPath.set(`${normalizedEntry.type}:${normalizedPath}`, normalizedEntry);

    const parts = normalizedPath.split("/").filter(Boolean);
    if (normalizedEntry.type === "file") {
      parts.pop();
    }

    const current: string[] = [];
    for (const part of parts) {
      current.push(part);
      const directoryPath = current.join("/");
      const key = `directory:${directoryPath}`;
      if (!byPath.has(key)) {
        byPath.set(key, directoryEntry(directoryPath));
      }
    }
  }

  return Array.from(byPath.values());
}

export function buildProjectTreeNode(entry: ProjectReaderEntry): ProjectTreeNode {
  const normalizedPath = normalizeProjectReaderPath(entry.path);
  const type = normalizeEntryType(entry.type);
  const name = entry.name ?? getProjectFileName(normalizedPath);
  const extension = type === "file" ? entry.extension ?? getProjectFileExtension(normalizedPath) : "";

  return {
    id: buildLocalProjectReaderStableKey("project-tree-node", normalizedPath || "root"),
    path: normalizedPath,
    name,
    type,
    extension,
    depth: typeof entry.depth === "number" ? entry.depth : depthOf(normalizedPath),
    parentPath: entry.parentPath ?? parentPathOf(normalizedPath),
    childCount: entry.childCount ?? 0,
    sizeLabel: entry.sizeLabel ?? formatProjectReaderSize(entry.sizeBytes),
    routeCategoryHint: routeCategoryHint(normalizedPath, type),
    riskHint: type === "file" ? classifyProjectFileRisk(entry) : "low",
    selectable: type === "file" && !entry.binary && !entry.generated,
    children: [],
  };
}

export function flattenProjectTree(input: ProjectTreeModel | ProjectTreeNode | ProjectTreeNode[]): ProjectTreeNode[] {
  const roots = Array.isArray(input) ? input : "root" in input ? [input.root] : [input];
  const flattened: ProjectTreeNode[] = [];
  const visit = (node: ProjectTreeNode) => {
    flattened.push(node);
    for (const child of node.children) visit(child);
  };
  for (const root of roots) visit(root);
  return flattened;
}

export function summarizeProjectTree(nodesOrModel: ProjectTreeModel | ProjectTreeNode[]): ProjectTreeSummary {
  const nodes = Array.isArray(nodesOrModel) ? nodesOrModel : nodesOrModel.flattened;
  const fileCount = nodes.filter((node) => node.type === "file").length;
  const directoryCount = nodes.filter((node) => node.type === "directory").length;
  const highRiskCount = nodes.filter((node) => node.riskHint === "high" || node.riskHint === "critical").length;
  const blockedCount = nodes.filter((node) => node.riskHint === "blocked").length;
  const maxDepth = nodes.reduce((max, node) => Math.max(max, node.depth), 0);

  return {
    fileCount,
    directoryCount,
    selectableCount: nodes.filter((node) => node.selectable).length,
    highRiskCount,
    blockedCount,
    maxDepth,
    text: `${fileCount} files and ${directoryCount} directories in deterministic read-only project tree.`,
  };
}

export function buildProjectTree(entries: ProjectReaderEntry[]): ProjectTreeModel {
  const root = rootNode();
  const nodes = expandDirectoryEntries(entries).map(buildProjectTreeNode);
  const nodeByPath = new Map(nodes.map((node) => [node.path, node]));

  for (const node of nodes) {
    if (!node.parentPath) {
      root.children.push(node);
      continue;
    }

    const parent = nodeByPath.get(node.parentPath);
    if (parent) {
      parent.children.push(node);
    } else {
      root.children.push(node);
    }
  }

  const sortChildren = (node: ProjectTreeNode) => {
    node.children.sort(compareProjectTreeNodes);
    node.childCount = node.children.length;
    for (const child of node.children) sortChildren(child);
  };
  sortChildren(root);

  const flattened = flattenProjectTree(root).filter((node) => node.path !== "");
  const summary = summarizeProjectTree(flattened);

  return {
    id: "local-project-tree",
    root,
    nodes,
    flattened,
    summary,
  };
}

