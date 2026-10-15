import "server-only";

import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { pinStudioCompatibilityWorkRoot } from "./readonly-compatibility-binding.server";

const HASH = /^[a-f0-9]{64}$/u;
const WINDOWS_ABSOLUTE = /^[a-zA-Z]:[\\/]/u;

export interface StudioRenderToolIdentity {
  readonly path: string;
  readonly sha256: string;
}

export interface StudioRenderConfiguration {
  readonly enabled: true;
  readonly rendererVersion: string;
  readonly workRoot: string;
  readonly ffmpeg: StudioRenderToolIdentity;
  readonly ffprobe: StudioRenderToolIdentity;
  readonly font: StudioRenderToolIdentity & { readonly ref: "ARIAL_REGULAR" };
}

export class StudioRenderConfigurationError extends Error {
  constructor(readonly code: "RENDERER_DISABLED" | "RENDERER_CONFIGURATION_INVALID") {
    super(code === "RENDERER_DISABLED" ? "The local Studio renderer is disabled." : "The local Studio renderer configuration is invalid.");
    this.name = "StudioRenderConfigurationError";
  }
}

type ConfiguredFile = StudioRenderToolIdentity & { fingerprint: string };
type ConfigurationCache = { key: string; fingerprints: string; configuration: StudioRenderConfiguration };
const CACHE_KEY = Symbol.for("codexforge.studio.render-configuration.v1");
type CacheHost = Record<symbol, unknown>;

function invalid(): never { throw new StudioRenderConfigurationError("RENDERER_CONFIGURATION_INVALID"); }

function configuredFile(value: string | undefined, expectedHash: string | undefined, extension: ".exe" | ".ttf", hashFile: boolean): ConfiguredFile {
  if (!value || !expectedHash || !HASH.test(expectedHash) || !WINDOWS_ABSOLUTE.test(value) || value.includes("\0") || path.extname(value).toLowerCase() !== extension) return invalid();
  const resolved = path.resolve(value);
  let canonical: string, fingerprint: string;
  try {
    const stat = lstatSync(resolved);
    if (!stat.isFile() || stat.isSymbolicLink()) return invalid();
    canonical = realpathSync.native(resolved);
    fingerprint = [stat.dev, stat.ino, stat.size, stat.mtimeMs, stat.ctimeMs, stat.birthtimeMs].join(":");
    if (canonical.toLowerCase() !== resolved.toLowerCase()) return invalid();
    if (!hashFile) return Object.freeze({ path: canonical, sha256: expectedHash, fingerprint });
  } catch { return invalid(); }
  if (canonical.toLowerCase() !== resolved.toLowerCase()) return invalid();
  const sha256 = createHash("sha256").update(readFileSync(canonical)).digest("hex");
  if (sha256 !== expectedHash) return invalid();
  const stat = lstatSync(canonical);
  const after = [stat.dev, stat.ino, stat.size, stat.mtimeMs, stat.ctimeMs, stat.birthtimeMs].join(":");
  if (!stat.isFile() || stat.isSymbolicLink() || after !== fingerprint || realpathSync.native(canonical).toLowerCase() !== canonical.toLowerCase()) return invalid();
  return Object.freeze({ path: canonical, sha256, fingerprint: after });
}

function configuredDirectory(value: string | undefined): string {
  if (!value || !WINDOWS_ABSOLUTE.test(value) || value.includes("\0")) return invalid();
  const resolved = path.resolve(value);
  let canonical: string;
  try {
    const stat = lstatSync(resolved);
    if (!stat.isDirectory() || stat.isSymbolicLink()) return invalid();
    canonical = realpathSync.native(resolved);
  } catch { return invalid(); }
  if (canonical.toLowerCase() !== resolved.toLowerCase() || path.parse(canonical).root.toLowerCase() !== "c:\\") return invalid();
  return canonical;
}

/** One server-owned boundary for renderer paths and identities. Client data can never select tools. */
export function readStudioRenderConfiguration(environment: NodeJS.ProcessEnv = process.env, options: { forceHash?: boolean } = {}): StudioRenderConfiguration {
  if (environment.CODEXFORGE_STUDIO_RENDERER_ENABLED !== "1") throw new StudioRenderConfigurationError("RENDERER_DISABLED");
  const rendererVersion = environment.CODEXFORGE_STUDIO_RENDERER_VERSION;
  if (!rendererVersion || rendererVersion.length > 120 || !/^[a-zA-Z0-9][a-zA-Z0-9._+ -]*$/u.test(rendererVersion)) return invalid();
  const cacheKey = JSON.stringify([environment.CODEXFORGE_STUDIO_RENDERER_ENABLED, rendererVersion, environment.CODEXFORGE_STUDIO_RENDER_WORK_ROOT, environment.CODEXFORGE_STUDIO_FFMPEG_PATH, environment.CODEXFORGE_STUDIO_FFMPEG_SHA256, environment.CODEXFORGE_STUDIO_FFPROBE_PATH, environment.CODEXFORGE_STUDIO_FFPROBE_SHA256, environment.CODEXFORGE_STUDIO_FONT_PATH, environment.CODEXFORGE_STUDIO_FONT_SHA256]);
  const observedFfmpeg = configuredFile(environment.CODEXFORGE_STUDIO_FFMPEG_PATH, environment.CODEXFORGE_STUDIO_FFMPEG_SHA256, ".exe", false);
  const observedFfprobe = configuredFile(environment.CODEXFORGE_STUDIO_FFPROBE_PATH, environment.CODEXFORGE_STUDIO_FFPROBE_SHA256, ".exe", false);
  const observedFont = configuredFile(environment.CODEXFORGE_STUDIO_FONT_PATH, environment.CODEXFORGE_STUDIO_FONT_SHA256, ".ttf", false);
  const workRoot = configuredDirectory(environment.CODEXFORGE_STUDIO_RENDER_WORK_ROOT);
  pinStudioCompatibilityWorkRoot(workRoot, environment);
  const fingerprints = [observedFfmpeg.path, observedFfmpeg.fingerprint, observedFfprobe.path, observedFfprobe.fingerprint, observedFont.path, observedFont.fingerprint, workRoot].join("|");
  const cached = (process as unknown as CacheHost)[CACHE_KEY] as ConfigurationCache | undefined;
  if (!options.forceHash && cached?.key === cacheKey && cached.fingerprints === fingerprints) return cached.configuration;
  const ffmpeg = configuredFile(environment.CODEXFORGE_STUDIO_FFMPEG_PATH, environment.CODEXFORGE_STUDIO_FFMPEG_SHA256, ".exe", true);
  const ffprobe = configuredFile(environment.CODEXFORGE_STUDIO_FFPROBE_PATH, environment.CODEXFORGE_STUDIO_FFPROBE_SHA256, ".exe", true);
  const font = configuredFile(environment.CODEXFORGE_STUDIO_FONT_PATH, environment.CODEXFORGE_STUDIO_FONT_SHA256, ".ttf", true);
  if (path.dirname(ffmpeg.path).toLowerCase() !== path.dirname(ffprobe.path).toLowerCase() || path.basename(ffmpeg.path).toLowerCase() !== "ffmpeg.exe" || path.basename(ffprobe.path).toLowerCase() !== "ffprobe.exe") return invalid();
  const configuration = Object.freeze({ enabled: true as const, rendererVersion, workRoot, ffmpeg: Object.freeze({ path: ffmpeg.path, sha256: ffmpeg.sha256 }), ffprobe: Object.freeze({ path: ffprobe.path, sha256: ffprobe.sha256 }), font: Object.freeze({ path: font.path, sha256: font.sha256, ref: "ARIAL_REGULAR" as const }) });
  Object.defineProperty(process, CACHE_KEY, { value: { key: cacheKey, fingerprints, configuration }, configurable: true, enumerable: false, writable: true });
  return configuration;
}
