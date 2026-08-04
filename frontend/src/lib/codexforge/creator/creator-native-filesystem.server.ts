import "server-only";

import path from "node:path";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";

export type CreatorNativeNodeKind = "file" | "directory";

export type CreatorNativeTreeEntry = readonly [
  relativeSegments: readonly string[],
  data: Buffer,
];

export type CreatorNativeRootLifecycleMode = "persistent" | "removable" | "existing";

export type CreatorNativeRoot = Readonly<{
  ensureDirectory(segments: readonly string[]): void;
  createDirectoryExclusive(segments: readonly string[]): void;
  stat(segments: readonly string[]): CreatorNativeNodeKind;
  listDirectory(segments: readonly string[]): string[];
  readFile(segments: readonly string[], maximumBytes: number): Buffer;
  writeAtomicExclusive(
    segments: readonly string[],
    temporaryName: string,
    data: Buffer,
    fenceSegments?: readonly string[] | null,
    expectedFenceData?: Buffer | null
  ): void;
  writeAtomicReplace(
    segments: readonly string[],
    temporaryName: string,
    data: Buffer,
    expectedData: Buffer | null,
    fenceSegments: readonly string[] | null,
    expectedFenceData: Buffer | null
  ): void;
  compareDeleteExact(segments: readonly string[], expectedData: Buffer): void;
  publishTreeExclusive(
    targetSegments: readonly string[],
    orderedEntries: readonly CreatorNativeTreeEntry[]
  ): void;
  renameExclusive(sourceSegments: readonly string[], targetSegments: readonly string[]): void;
  removeTree(segments: readonly string[]): void;
  close(): void;
  removeRoot(): void;
}>;

type CreatorNativeBinding = Readonly<{
  Root: new (
    projectRoot: string,
    rootSegments: readonly string[],
    lifecycleMode?: CreatorNativeRootLifecycleMode
  ) => CreatorNativeRoot;
  rootExists(projectRoot: string, rootSegments: readonly string[]): boolean;
  getProcessIdentity(processId: number): string;
}>;

type NativeModuleRecord = {
  exports: unknown;
};

const CREATOR_NATIVE_BINDING_CACHE_KEY = Symbol.for(
  "codexforge.creator.native-filesystem.binding.v1"
);
type NativeBindingCacheHost = Readonly<Record<symbol, unknown>>;

let loadedBinding: CreatorNativeBinding | null = null;

function isNativeBinding(value: unknown): value is CreatorNativeBinding {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<CreatorNativeBinding>;
  const rootPrototype =
    typeof candidate.Root === "function"
      ? (candidate.Root as unknown as { prototype?: Record<string, unknown> }).prototype
      : undefined;
  return (
    typeof candidate.Root === "function" &&
    typeof rootPrototype?.ensureDirectory === "function" &&
    typeof rootPrototype?.createDirectoryExclusive === "function" &&
    typeof rootPrototype?.stat === "function" &&
    typeof rootPrototype?.listDirectory === "function" &&
    typeof rootPrototype?.readFile === "function" &&
    typeof rootPrototype?.writeAtomicExclusive === "function" &&
    typeof rootPrototype?.writeAtomicReplace === "function" &&
    typeof rootPrototype?.compareDeleteExact === "function" &&
    typeof rootPrototype?.publishTreeExclusive === "function" &&
    typeof rootPrototype?.renameExclusive === "function" &&
    typeof rootPrototype?.removeTree === "function" &&
    typeof rootPrototype?.close === "function" &&
    typeof rootPrototype?.removeRoot === "function" &&
    typeof candidate.rootExists === "function" &&
    typeof candidate.getProcessIdentity === "function"
  );
}

export function loadCreatorNativeFilesystem(): CreatorNativeBinding {
  if (process.platform !== "win32") {
    throw new Error("CodexForge creator native filesystem is Windows-only.");
  }
  if (loadedBinding) return loadedBinding;
  const cacheHost = process as unknown as NativeBindingCacheHost;
  const cachedBinding = cacheHost[CREATOR_NATIVE_BINDING_CACHE_KEY];
  if (cachedBinding !== undefined) {
    if (!isNativeBinding(cachedBinding)) {
      throw new Error("Secure Windows creator filesystem process cache is invalid.");
    }
    loadedBinding = cachedBinding;
    return cachedBinding;
  }
  const binaryPath = path.join(
    CODEXFORGE_PROJECT_ROOT,
    "build",
    "Release",
    "codexforge_creator_filesystem.node"
  );
  const nativeModule: NativeModuleRecord = { exports: {} };
  try {
    process.dlopen(nativeModule as NodeModule, binaryPath);
  } catch {
    throw new Error(
      "Secure Windows creator filesystem support is unavailable. Run the audited native build before creator mutation."
    );
  }
  if (!isNativeBinding(nativeModule.exports)) {
    throw new Error("Secure Windows creator filesystem support returned an invalid interface.");
  }
  Object.defineProperty(process, CREATOR_NATIVE_BINDING_CACHE_KEY, {
    value: nativeModule.exports,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  loadedBinding = nativeModule.exports;
  return loadedBinding;
}

export function creatorNativeRootExists(rootSegments: readonly string[]): boolean {
  return loadCreatorNativeFilesystem().rootExists(CODEXFORGE_PROJECT_ROOT, rootSegments);
}

export function openCreatorNativeRoot(
  rootSegments: readonly string[],
  lifecycleMode?: CreatorNativeRootLifecycleMode
): CreatorNativeRoot {
  const binding = loadCreatorNativeFilesystem();
  const defaultMode =
    rootSegments[0] === ".codexforge" &&
    rootSegments[1] === "creator-tests"
      ? "removable"
      : "persistent";
  return new binding.Root(
    CODEXFORGE_PROJECT_ROOT,
    rootSegments,
    lifecycleMode ?? defaultMode
  );
}

export function getExactWindowsProcessIdentity(processId: number): string {
  return loadCreatorNativeFilesystem().getProcessIdentity(processId);
}
