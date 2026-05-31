export type BoundedPathCheck = {
  safe: boolean;
  absolutePath?: string;
  normalizedRelativePath?: string;
  relativeFromRoot?: string;
  blockedReason?: string;
  summary: string[];
};

export type BoundedWorkspacePathInput = {
  workspaceRoot: string;
  relativePath: unknown;
};
