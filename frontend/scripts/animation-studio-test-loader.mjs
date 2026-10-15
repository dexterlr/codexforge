// Source-only test loader: the sole stub is Next's server-only import marker.
// All policies, validation, crypto and native filesystem code remain real.
import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import ts from "typescript";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";
import dgram from "node:dgram";
import dns from "node:dns";

export function createStudioTestLoader(frontendRoot) {
  const sourceRoot = path.resolve(frontendRoot, "src");
  const cache = new Map();
  const loaded = [];
  function resolveSource(specifier, parentFilename) {
    const base = specifier.startsWith("@/")
      ? path.resolve(sourceRoot, specifier.slice(2))
      : path.resolve(path.dirname(parentFilename), specifier);
    const relative = path.relative(sourceRoot, base);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Test import escaped the source root.");
    const file = [base, `${base}.ts`, path.join(base, "index.ts")]
      .find(candidate => candidate.endsWith(".ts") && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!file) throw new Error(`Unresolved exact source import: ${specifier}`);
    const portable = path.relative(sourceRoot, file).split(path.sep).join("/");
    if (/(?:preview|fixture)/i.test(portable)) throw new Error(`Preview/fixture dependency forbidden: ${portable}`);
    return file;
  }
  function loadSource(filename) {
    const file = resolveSource(filename, path.join(sourceRoot, "entry.ts"));
    if (cache.has(file)) return cache.get(file).exports;
    const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      fileName: file,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
      reportDiagnostics: true,
    });
    const errors = (compiled.diagnostics || []).filter(item => item.category === ts.DiagnosticCategory.Error);
    if (errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: name => name, getCurrentDirectory: () => frontendRoot, getNewLine: () => "\n",
    }));
    const item = new Module(file);
    item.filename = file;
    item.paths = Module._nodeModulePaths(path.dirname(file));
    const nativeRequire = Module.createRequire(file);
    item.require = specifier => {
      if (specifier === "server-only") return Object.freeze({});
      if (specifier.startsWith("@/") || specifier.startsWith(".")) return loadSource(resolveSource(specifier, file));
      if (!Module.isBuiltin(specifier)) throw new Error(`Unexpected runtime package import: ${specifier}`);
      return nativeRequire(specifier);
    };
    cache.set(file, item);
    loaded.push(path.relative(frontendRoot, file).split(path.sep).join("/"));
    try { item._compile(compiled.outputText, file); } catch (error) { cache.delete(file); throw error; }
    return item.exports;
  }
  return { load: specifier => loadSource(resolveSource(specifier, path.join(sourceRoot, "entry.ts"))), loaded };
}

export function blockStudioTestNetwork() {
  const attempts = [];
  const deny = label => function () { attempts.push(label); throw new Error(`Network forbidden in studio Phase 0 tests: ${label}`); };
  globalThis.fetch = deny("fetch");
  for (const [name, methods] of [
    ["node:http", ["request", "get"]], ["node:https", ["request", "get"]],
    ["node:net", ["connect", "createConnection"]], ["node:tls", ["connect"]],
    ["node:dgram", ["createSocket"]], ["node:dns", ["lookup", "resolve"]],
  ]) {
    const api = { "node:http": http, "node:https": https, "node:net": net, "node:tls": tls, "node:dgram": dgram, "node:dns": dns }[name];
    for (const method of methods) api[method] = deny(`${name}.${method}`);
  }
  net.Socket.prototype.connect = deny("Socket.connect");
  if (typeof globalThis.WebSocket !== "undefined") globalThis.WebSocket = deny("WebSocket");
  return attempts;
}
