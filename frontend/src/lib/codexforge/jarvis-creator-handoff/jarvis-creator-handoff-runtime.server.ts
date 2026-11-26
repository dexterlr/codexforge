import "server-only";

import {
  getCreatorRuntimePersistence,
  getCreatorRuntimeService,
} from "@/lib/codexforge/creator/creator-runtime.server";
import { getJarvisChatRuntimeService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server";
import { resolveJarvisCreatorRuntimeIdentity } from "@/lib/codexforge/jarvis-chat/jarvis-creator-runtime-identity.server";
import {
  createJarvisCreatorHandoffPersistence,
  createJarvisCreatorHandoffPersistenceForTesting,
} from "./jarvis-creator-handoff-persistence.server";
import {
  createJarvisCreatorHandoffService,
  type JarvisCreatorHandoffService,
} from "./jarvis-creator-handoff-service.server";

const REGISTRY_KEY = Symbol.for("codexforge.jarvis-creator-handoff.runtime-registry.v7");
const MAXIMUM_SERVICES = 16;

type Registry = Readonly<{
  version: 7;
  get(key: string): JarvisCreatorHandoffService | undefined;
  register(key: string, service: JarvisCreatorHandoffService): void;
  size(): number;
}>;

function isService(value: unknown): value is JarvisCreatorHandoffService {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<JarvisCreatorHandoffService>;
  return typeof candidate.prepare === "function" &&
    typeof candidate.getSummary === "function" &&
    typeof candidate.review === "function" &&
    typeof candidate.resume === "function" &&
    typeof candidate.listConversation === "function";
}

function registry(): Registry {
  const host = process as unknown as Record<symbol, unknown>;
  const descriptor = Object.getOwnPropertyDescriptor(host, REGISTRY_KEY);
  if (descriptor) {
    const cached = descriptor.value as Partial<Registry>;
    if (
      descriptor.configurable !== false || descriptor.enumerable !== false || descriptor.writable !== false ||
      !Object.isFrozen(cached) || cached.version !== 7 || typeof cached.get !== "function" ||
      typeof cached.register !== "function" || typeof cached.size !== "function" ||
      !Number.isSafeInteger(cached.size()) || cached.size() < 0 || cached.size() > MAXIMUM_SERVICES
    ) throw new Error("Jarvis creator handoff runtime cache is invalid.");
    return cached as Registry;
  }
  const services = new Map<string, JarvisCreatorHandoffService>();
  const value = Object.freeze({
    version: 7 as const,
    get(key: string) { return services.get(key); },
    register(key: string, service: JarvisCreatorHandoffService) {
      if (!/^production$|^test:[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/u.test(key) || !isService(service) || services.has(key) || services.size >= MAXIMUM_SERVICES) {
        throw new Error("Jarvis creator handoff runtime registration is invalid.");
      }
      services.set(key, Object.freeze(service));
    },
    size() { return services.size; },
  });
  Object.defineProperty(process, REGISTRY_KEY, {
    value,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  return value;
}

export function getJarvisCreatorHandoffRuntimeService(): JarvisCreatorHandoffService {
  const identity = resolveJarvisCreatorRuntimeIdentity();
  const cache = registry();
  const existing = cache.get(identity.key);
  if (existing) {
    if (!isService(existing)) throw new Error("Jarvis creator handoff cached service is invalid.");
    return existing;
  }
  const creatorPersistence = getCreatorRuntimePersistence();
  const service = createJarvisCreatorHandoffService({
    chat: getJarvisChatRuntimeService(),
    creator: getCreatorRuntimeService(),
    persistence: identity.testSuffix
      ? createJarvisCreatorHandoffPersistenceForTesting(identity.testSuffix, creatorPersistence)
      : createJarvisCreatorHandoffPersistence(creatorPersistence),
  });
  cache.register(identity.key, service);
  return service;
}
