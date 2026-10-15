"use strict";

const dgram = require("node:dgram");
const dns = require("node:dns");
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const net = require("node:net");
const tls = require("node:tls");

const denialLog = process.env.CODEXFORGE_LOCAL_NETWORK_DENIAL_LOG;
const maximumLogBytes = Number(process.env.CODEXFORGE_LOCAL_MAX_LOG_BYTES);
if (typeof denialLog !== "string" || !require("node:path").isAbsolute(denialLog) || !Number.isSafeInteger(maximumLogBytes) || maximumLogBytes < 64 * 1024 || maximumLogBytes > 32 * 1024 * 1024) {
  throw new Error("The local Studio offline boundary is not configured exactly.");
}

function record(label) {
  const line = Buffer.from(`${JSON.stringify({ at: new Date().toISOString(), pid: process.pid, label })}\n`, "utf8");
  let size = 0;
  try { size = fs.lstatSync(denialLog).size; } catch (error) { if (error.code !== "ENOENT") throw error; }
  if (size + line.length <= maximumLogBytes) fs.appendFileSync(denialLog, line, { flag: "a" });
}

function deny(label) {
  record(label);
  throw new Error(`Network forbidden by the local Studio boundary: ${label}`);
}

function local(host) {
  return ["127.0.0.1", "localhost", "::1", "[::1]", "::ffff:127.0.0.1"].includes(String(host).toLowerCase());
}

function allowed(host, port) {
  return local(host) && Number(port) === 3379;
}

const originalConnect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const values = Array.isArray(args[0]) ? args[0] : args;
  const first = values[0];
  if (typeof first === "object" && first !== null) {
    if (typeof first.path === "string" && first.path.startsWith("\\\\.\\pipe\\")) return Reflect.apply(originalConnect, this, args);
    if (allowed(first.host ?? first.hostname ?? "localhost", first.port)) return Reflect.apply(originalConnect, this, args);
  } else if (typeof first === "string" && first.startsWith("\\\\.\\pipe\\")) {
    return Reflect.apply(originalConnect, this, args);
  } else if ((typeof first === "number" || /^\d+$/u.test(String(first))) && allowed(typeof values[1] === "string" ? values[1] : "localhost", first)) {
    return Reflect.apply(originalConnect, this, args);
  }
  return deny("net.connect");
};

const originalHttpRequest = http.request;
http.request = function (...args) {
  let host;
  let port;
  try {
    const value = args[0];
    if (typeof value === "string" || value instanceof URL) {
      const url = new URL(value);
      const overrides = typeof args[1] === "object" && args[1] !== null ? args[1] : {};
      host = overrides.hostname ?? overrides.host ?? url.hostname;
      port = overrides.port ?? (url.port || "80");
    } else {
      host = value.hostname ?? value.host ?? "localhost";
      port = value.port ?? 80;
    }
  } catch { return deny("http.request"); }
  if (!allowed(host, port)) return deny("http.request");
  return Reflect.apply(originalHttpRequest, this, args);
};
http.get = function (...args) { const request = http.request(...args); request.end(); return request; };
https.request = () => deny("https.request");
https.get = () => deny("https.get");

const originalLookup = dns.lookup;
dns.lookup = function (host, ...args) {
  if (!local(host)) return deny("dns.lookup");
  return Reflect.apply(originalLookup, this, [host, ...args]);
};
for (const key of Object.keys(dns)) {
  if ((key.startsWith("resolve") || key === "reverse" || key === "lookupService") && typeof dns[key] === "function") dns[key] = () => deny(`dns.${key}`);
}
if (dns.promises) {
  for (const key of Object.keys(dns.promises)) if (typeof dns.promises[key] === "function") dns.promises[key] = () => deny(`dns.promises.${key}`);
}
dns.Resolver = class { constructor() { deny("dns.Resolver"); } };
tls.connect = () => deny("tls.connect");
dgram.createSocket = () => deny("dgram.createSocket");

const originalFetch = globalThis.fetch;
if (typeof originalFetch === "function") {
  globalThis.fetch = function (input, init) {
    let url;
    try { url = new URL(typeof input === "string" || input instanceof URL ? input : input.url); }
    catch { return deny("fetch"); }
    if (url.protocol !== "http:" || !allowed(url.hostname, url.port || "80")) return deny("fetch");
    return Reflect.apply(originalFetch, this, [input, init]);
  };
}
if (globalThis.WebSocket) globalThis.WebSocket = class { constructor() { deny("WebSocket"); } };
