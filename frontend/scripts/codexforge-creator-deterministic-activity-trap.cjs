"use strict";

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const childProcess = require("node:child_process");
const dgram = require("node:dgram");
const dns = require("node:dns");
const http = require("node:http");
const http2 = require("node:http2");
const https = require("node:https");
const net = require("node:net");
const tls = require("node:tls");
const workerThreads = require("node:worker_threads");
const originalLstatSync = fs.lstatSync.bind(fs);
const originalRealpathSync = fs.realpathSync.native
  ? fs.realpathSync.native.bind(fs.realpathSync)
  : fs.realpathSync.bind(fs);

function isContained(candidate, base) {
  const relative = path.relative(base, candidate);
  return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`));
}

function toAbsolutePath(value) {
  if (typeof value === "string") return path.resolve(value);
  if (Buffer.isBuffer(value)) return path.resolve(value.toString("utf8"));
  if (value instanceof URL && value.protocol === "file:") return path.resolve(decodeURIComponent(value.pathname));
  return null;
}

function installCreatorDeterministicActivityTrap(options) {
  const repoRoot = path.resolve(options.repoRoot);
  const allowedWriteTrees = options.allowedWriteTrees.map((entry) => path.resolve(entry));
  const allowedMkdirPaths = options.allowedMkdirPaths.map((entry) => path.resolve(entry));
  const productionCreatorRoot = path.resolve(repoRoot, ".codexforge", "creator");
  const productionPrivateAlphaRoot = path.resolve(repoRoot, ".codexforge", "private-alpha");
  const counters = {
    fetch: 0,
    externalNetwork: 0,
    providerTransport: 0,
    credentialResolution: 0,
    liveGeneration: 0,
    modelDownload: 0,
    childProcess: 0,
    packageInstall: 0,
    deployment: 0,
    arbitraryFilesystemMutation: 0,
    productionPrivateAlphaMutation: 0,
    productionCreatorMutation: 0,
  };

  function blocked(counter, message) {
    counters[counter] += 1;
    throw new Error(message);
  }

  global.fetch = async function blockedFetch() {
    counters.fetch += 1;
    counters.externalNetwork += 1;
    throw new Error("deterministic creator smoke forbids fetch");
  };
  if (typeof global.WebSocket === "function") {
    global.WebSocket = class BlockedWebSocket {
      constructor() {
        counters.externalNetwork += 1;
        throw new Error("deterministic creator smoke forbids WebSocket");
      }
    };
  }

  const originalEnvironment = process.env;
  process.env = new Proxy(originalEnvironment, {
    get(target, property, receiver) {
      if (
        typeof property === "string" &&
        /(?:API_?KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL)/i.test(property)
      ) {
        return blocked("credentialResolution", "deterministic creator smoke forbids credential resolution");
      }
      return Reflect.get(target, property, receiver);
    },
  });

  function patchNetworkMethod(target, key) {
    if (typeof target[key] !== "function") return;
    target[key] = function blockedNetworkMethod() {
      return blocked("externalNetwork", `deterministic creator smoke forbids ${key}`);
    };
  }
  for (const [target, methods] of [
    [http, ["get", "request"]],
    [https, ["get", "request"]],
    [http2, ["connect"]],
    [net, ["connect", "createConnection"]],
    [tls, ["connect"]],
    [dgram, ["createSocket"]],
    [dns, ["lookup", "resolve", "resolve4", "resolve6", "resolveAny", "resolveCaa", "resolveCname", "resolveMx", "resolveNaptr", "resolveNs", "resolvePtr", "resolveSoa", "resolveSrv", "resolveTxt", "reverse"]],
    [dns.promises, ["lookup", "resolve", "resolve4", "resolve6", "resolveAny", "resolveCaa", "resolveCname", "resolveMx", "resolveNaptr", "resolveNs", "resolvePtr", "resolveSoa", "resolveSrv", "resolveTxt", "reverse"]],
  ]) {
    for (const method of methods) patchNetworkMethod(target, method);
  }

  function classifyProcessAttempt(args) {
    const command = args.map((value) => String(value)).join(" ").toLowerCase();
    counters.childProcess += 1;
    if (/\b(?:npm|npx|pnpm|yarn|bun)\b/.test(command)) counters.packageInstall += 1;
    if (/\b(?:deploy|deployment|vercel|netlify|cloudflare|firebase)\b/.test(command)) counters.deployment += 1;
    if (/\bollama\b.*\b(?:pull|download)\b|\bmodel\b.*\bdownload\b/.test(command)) counters.modelDownload += 1;
    throw new Error("deterministic creator smoke forbids child processes");
  }
  for (const method of ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"]) {
    childProcess[method] = function blockedChildProcess(...args) {
      return classifyProcessAttempt(args);
    };
  }
  if (typeof workerThreads.Worker === "function") {
    workerThreads.Worker = class BlockedWorker {
      constructor(...args) {
        return classifyProcessAttempt(args);
      }
    };
  }

  function isAllowedWrite(candidate) {
    return allowedWriteTrees.some((base) => isContained(candidate, base));
  }

  function assertNoExistingLinkOrReparseEscape(candidate, allowLeafLinkRemoval = false) {
    const parsed = path.parse(candidate);
    const relativeSegments = path.relative(parsed.root, candidate).split(path.sep).filter(Boolean);
    let current = parsed.root;
    let nearestExisting = parsed.root;
    let removingLeafLink = false;
    for (const segment of relativeSegments) {
      current = path.join(current, segment);
      let stat;
      try {
        stat = originalLstatSync(current);
      } catch (error) {
        if (error && error.code === "ENOENT") break;
        return blocked("arbitraryFilesystemMutation", "deterministic creator smoke could not verify a mutation path");
      }
      if (stat.isSymbolicLink()) {
        if (allowLeafLinkRemoval && path.relative(current, candidate) === "") {
          nearestExisting = path.dirname(current);
          removingLeafLink = true;
          break;
        }
        return blocked("arbitraryFilesystemMutation", "deterministic creator smoke rejected a symbolic-link or junction mutation path");
      }
      nearestExisting = current;
    }
    let resolvedAncestor;
    try {
      resolvedAncestor = originalRealpathSync(nearestExisting);
    } catch {
      return blocked("arbitraryFilesystemMutation", "deterministic creator smoke could not resolve a mutation ancestor");
    }
    const projectedCandidate = path.resolve(
      resolvedAncestor,
      path.relative(nearestExisting, candidate)
    );
    const lexicalBase = allowedWriteTrees.find((base) => isContained(candidate, base));
    if (!lexicalBase) return;
    let baseAncestor = removingLeafLink ? path.dirname(lexicalBase) : lexicalBase;
    while (true) {
      let stat;
      try {
        stat = originalLstatSync(baseAncestor);
      } catch (error) {
        if (!error || error.code !== "ENOENT") {
          return blocked("arbitraryFilesystemMutation", "deterministic creator smoke could not verify its fixture root");
        }
        const parent = path.dirname(baseAncestor);
        if (parent === baseAncestor) {
          return blocked("arbitraryFilesystemMutation", "deterministic creator smoke fixture root has no verified ancestor");
        }
        baseAncestor = parent;
        continue;
      }
      if (stat.isSymbolicLink()) {
        return blocked("arbitraryFilesystemMutation", "deterministic creator smoke rejected a linked fixture root");
      }
      break;
    }
    let resolvedBaseAncestor;
    try {
      resolvedBaseAncestor = originalRealpathSync(baseAncestor);
    } catch {
      return blocked("arbitraryFilesystemMutation", "deterministic creator smoke could not resolve its fixture root");
    }
    const projectedBase = path.resolve(
      resolvedBaseAncestor,
      path.relative(baseAncestor, lexicalBase)
    );
    if (!isContained(projectedCandidate, projectedBase)) {
      return blocked("arbitraryFilesystemMutation", "deterministic creator smoke rejected a resolved mutation escape");
    }
  }

  function assertAllowedMutationPath(value, allowExactMkdirPath = false, allowLeafLinkRemoval = false) {
    const candidate = toAbsolutePath(value);
    if (!candidate) {
      return blocked("arbitraryFilesystemMutation", "deterministic creator smoke rejected a non-path mutation target");
    }
    if (isContained(candidate, productionCreatorRoot)) {
      return blocked("productionCreatorMutation", "deterministic creator smoke forbids production creator mutation");
    }
    if (isContained(candidate, productionPrivateAlphaRoot)) {
      return blocked("productionPrivateAlphaMutation", "deterministic creator smoke forbids production Private Alpha mutation");
    }
    if (!isAllowedWrite(candidate) && !(allowExactMkdirPath && allowedMkdirPaths.includes(candidate))) {
      return blocked("arbitraryFilesystemMutation", "deterministic creator smoke forbids filesystem mutation outside its owned fixture roots");
    }
    assertNoExistingLinkOrReparseEscape(candidate, allowLeafLinkRemoval);
  }

  function patchAsyncMutation(name, pathIndexes, condition, allowExactMkdirPath = false, allowLeafLinkRemoval = false) {
    const original = fsp[name];
    if (typeof original !== "function") return;
    fsp[name] = async function trappedAsyncMutation(...args) {
      if (!condition || condition(args)) {
        for (const index of pathIndexes) assertAllowedMutationPath(args[index], allowExactMkdirPath, allowLeafLinkRemoval);
      }
      return original.apply(this, args);
    };
  }
  const asyncSinglePath = [
    "appendFile", "chmod", "chown", "lchmod", "lchown", "lutimes", "mkdtemp",
    "rm", "rmdir", "truncate", "utimes", "writeFile",
  ];
  for (const method of asyncSinglePath) patchAsyncMutation(method, [0]);
  patchAsyncMutation("unlink", [0], undefined, false, true);
  patchAsyncMutation("mkdir", [0], undefined, true);
  for (const method of ["copyFile", "cp", "link", "rename", "symlink"]) patchAsyncMutation(method, [0, 1]);
  patchAsyncMutation("open", [0], (args) => {
    const flags = args[1] ?? "r";
    return typeof flags === "number" ? flags !== 0 : /[wax+]/i.test(String(flags));
  });

  function patchSyncMutation(name, pathIndexes, condition, allowExactMkdirPath = false, allowLeafLinkRemoval = false) {
    const original = fs[name];
    if (typeof original !== "function") return;
    fs[name] = function trappedSyncMutation(...args) {
      if (!condition || condition(args)) {
        for (const index of pathIndexes) assertAllowedMutationPath(args[index], allowExactMkdirPath, allowLeafLinkRemoval);
      }
      return original.apply(this, args);
    };
  }
  const syncSinglePath = [
    "appendFileSync", "chmodSync", "chownSync", "lchmodSync", "lchownSync", "lutimesSync",
    "mkdtempSync", "rmSync", "rmdirSync", "truncateSync",
    "utimesSync", "writeFileSync",
  ];
  for (const method of syncSinglePath) patchSyncMutation(method, [0]);
  patchSyncMutation("unlinkSync", [0], undefined, false, true);
  patchSyncMutation("mkdirSync", [0], undefined, true);
  for (const method of ["copyFileSync", "cpSync", "linkSync", "renameSync", "symlinkSync"]) patchSyncMutation(method, [0, 1]);
  patchSyncMutation("openSync", [0], (args) => {
    const flags = args[1] ?? "r";
    return typeof flags === "number" ? flags !== 0 : /[wax+]/i.test(String(flags));
  });
  patchSyncMutation("createWriteStream", [0]);

  function wrapLoadedModule(resolvedFilename, loaded) {
    const normalized = typeof resolvedFilename === "string" ? resolvedFilename.replace(/\\/g, "/") : "";
    if (!loaded || (typeof loaded !== "object" && typeof loaded !== "function")) return loaded;
    if (normalized.endsWith("/private-alpha-ollama-adapter.server.ts")) {
      return {
        ...loaded,
        createPrivateAlphaOllamaProviderAdapter() {
          return blocked("providerTransport", "deterministic creator smoke forbids production Ollama adapter construction");
        },
      };
    }
    if (normalized.endsWith("/private-alpha-provider-runtime.server.ts")) {
      return {
        ...loaded,
        createPrivateAlphaProviderAdapterForModelKey() {
          return blocked("providerTransport", "deterministic creator smoke forbids provider runtime construction");
        },
      };
    }
    if (normalized.endsWith("/groq-provider-credential.server.ts")) {
      const wrapped = { ...loaded };
      for (const key of Object.keys(wrapped)) {
        if (/credential/i.test(key) && typeof wrapped[key] === "function") {
          wrapped[key] = function blockedCredentialResolver() {
            return blocked("credentialResolution", "deterministic creator smoke forbids credential resolution");
          };
        }
      }
      return wrapped;
    }
    return loaded;
  }

  function assertZeroActivity() {
    for (const [name, count] of Object.entries(counters)) {
      if (count !== 0) throw new Error(`deterministic creator activity counter ${name} was ${count}`);
    }
  }

  function formatCounters(extra) {
    return [
      ...Object.entries(counters).map(([name, count]) => `${name}=${count}`),
      ...Object.entries(extra).map(([name, count]) => `${name}=${count}`),
    ].join(" ");
  }

  return Object.freeze({ counters, wrapLoadedModule, assertZeroActivity, formatCounters });
}

module.exports = { installCreatorDeterministicActivityTrap };
