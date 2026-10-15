import "server-only";
import { hashJarvisChatSha256 as sha } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { cloneStudioJson } from "./validation";

export interface EditorialIndexIO { read(hash: string): unknown; stage(value: object): string }
export class EditorialIndexError extends Error { constructor() { super("Partitioned editorial index failed its bounded identity or integrity contract."); this.name = "EditorialIndexError"; } }
const fail = (): never => { throw new EditorialIndexError(); };
const HASH = /^[a-f0-9]{64}$/u, KEY = /^[a-z0-9:_-]{1,160}$/u;
type Scope = { projectId: string; namespace: "entities" | "receipts" };
type Leaf = Scope & { format: "studio-editorial-index-v2"; kind: "leaf"; key: string; keyHash: string; valueHash: string };
type Branch = Scope & { format: "studio-editorial-index-v2"; kind: "branch"; prefix: string; children: (string | null)[] };
type Page = Leaf | Branch;
function exact(value: unknown, keys: string): asserts value is Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== "object" || Object.keys(value).sort().join() !== keys.split(",").sort().join()) fail();
}
function common(a: string, b: string): string { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return a.slice(0, i); }

/** Immutable path-compressed radix tree: <=65 bounded pages per lookup/update.
 * Only selected paths are read. A lazy lookup is not a full-tree audit. */
export function editorialV2Index(io: EditorialIndexIO, scope: Scope) {
  function page(hash: string, parentPrefix: string): Page {
    if (!HASH.test(hash)) fail();
    const raw = cloneStudioJson(io.read(hash)) as unknown as Page;
    exact(raw, raw?.kind === "leaf" ? "format,projectId,namespace,kind,key,keyHash,valueHash" : "format,projectId,namespace,kind,prefix,children");
    if (raw.format !== "studio-editorial-index-v2" || raw.projectId !== scope.projectId || raw.namespace !== scope.namespace) fail();
    if (raw.kind === "leaf") {
      if (!KEY.test(raw.key) || raw.keyHash !== sha(raw.key) || !raw.keyHash.startsWith(parentPrefix) || !HASH.test(raw.valueHash)) fail();
    } else if (raw.kind === "branch") {
      if (typeof raw.prefix !== "string" || !/^[a-f0-9]{0,63}$/u.test(raw.prefix) || !raw.prefix.startsWith(parentPrefix) || !Array.isArray(raw.children) || raw.children.length !== 16 || raw.children.some(x => x !== null && (typeof x !== "string" || !HASH.test(x))) || raw.children.filter(x => x !== null).length < 2 || new Set(raw.children.filter(x => x !== null)).size !== raw.children.filter(x => x !== null).length) fail();
    } else fail();
    return raw;
  }
  const prefixOf = (node: Page) => node.kind === "leaf" ? node.keyHash : node.prefix;
  const keyHash = (key: string) => { if (typeof key !== "string" || !KEY.test(key)) fail(); return sha(key); };
  const leaf = (key: string, hash: string, valueHash: string): Leaf => ({ format: "studio-editorial-index-v2", ...scope, kind: "leaf", key, keyHash: hash, valueHash });
  function split(existingHash: string, existing: Page, inserted: Leaf): string {
    const prefix = common(prefixOf(existing), inserted.keyHash);
    if (prefix.length >= 64) return fail();
    const children: (string | null)[] = Array(16).fill(null);
    children[parseInt(prefixOf(existing)[prefix.length], 16)] = existingHash;
    children[parseInt(inserted.keyHash[prefix.length], 16)] = io.stage(inserted);
    return io.stage({ format: "studio-editorial-index-v2", ...scope, kind: "branch", prefix, children } satisfies Branch);
  }
  return {
    get(rootHash: string | null, key: string): string | null {
      const query = keyHash(key); let hash = rootHash, prefix = "", depth = 0;
      while (hash !== null) {
        if (++depth > 65) return fail();
        const node = page(hash, prefix);
        if (node.kind === "leaf") return node.key === key ? node.valueHash : null;
        if (!query.startsWith(node.prefix)) return null;
        const digit = query[node.prefix.length]; prefix = node.prefix + digit; hash = node.children[parseInt(digit, 16)];
      }
      return null;
    },
    set(rootHash: string | null, key: string, valueHash: string): string {
      const query = keyHash(key); if (typeof valueHash !== "string" || !HASH.test(valueHash)) fail();
      const inserted = leaf(key, query, valueHash);
      function put(hash: string | null, prefix: string, depth: number): string {
        if (depth > 65) return fail();
        if (hash === null) return io.stage(inserted);
        const node = page(hash, prefix);
        if (node.kind === "leaf") {
          if (node.key === key) return node.valueHash === valueHash ? hash : io.stage(inserted);
          return split(hash, node, inserted);
        }
        if (!query.startsWith(node.prefix)) return split(hash, node, inserted);
        const digit = query[node.prefix.length], index = parseInt(digit, 16), child = put(node.children[index], node.prefix + digit, depth + 1);
        if (child === node.children[index]) return hash;
        const children = [...node.children]; children[index] = child;
        return io.stage({ ...node, children });
      }
      return put(rootHash, "", 0);
    },
  };
}
