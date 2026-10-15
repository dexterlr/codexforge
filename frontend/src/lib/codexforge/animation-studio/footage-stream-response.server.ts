import "server-only";

export interface StudioBoundedMediaReader {
  readonly byteLength: number;
  readonly contentHash: string;
  read(offset: number, length: number): Buffer;
  close(): void;
}

const CHUNK_BYTES = 524_288;
const HASH = /^[a-f0-9]{64}$/u;
const BASE_HEADERS = {
  "Accept-Ranges": "bytes",
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; sandbox",
  "X-Content-Type-Options": "nosniff",
};

type ByteRange = { start: number; end: number };

function range(value: string | null, total: number): ByteRange | null | "INVALID" {
  if (value === null) return null;
  const match = /^bytes=(\d*)-(\d*)$/u.exec(value);
  if (!match || (!match[1] && !match[2])) return "INVALID";
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix < 1) return "INVALID";
    return { start: Math.max(0, total - suffix), end: total - 1 };
  }
  const start = Number(match[1]), requestedEnd = match[2] ? Number(match[2]) : total - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || start < 0 || requestedEnd < start || start >= total) return "INVALID";
  return { start, end: Math.min(total - 1, requestedEnd) };
}

/** One exact immutable source response. Pulls never retain more than one 512 KiB
 * storage chunk and the supplied close boundary owns both reader and repository. */
export function createStudioBoundedMediaResponse(input: {
  method: "GET" | "HEAD";
  rangeHeader: string | null;
  reader: StudioBoundedMediaReader;
  contentType: "video/mp4" | "audio/wav" | "image/png" | "image/jpeg";
  disposition?: string;
  headers?: Readonly<Record<string, string>>;
  close: () => void;
}): Response {
  const { reader } = input;
  let closed = false;
  const close = () => { if (closed) return; closed = true; try { reader.close(); } finally { input.close(); } };
  if (!Number.isSafeInteger(reader.byteLength) || reader.byteLength < 1 || !HASH.test(reader.contentHash)) { close(); throw new Error("INVALID_MEDIA_READER"); }
  const selected = range(input.rangeHeader, reader.byteLength);
  if (selected === "INVALID") {
    close();
    return new Response(null, { status: 416, headers: { ...BASE_HEADERS, ...(input.headers ?? {}), "Content-Range": `bytes */${reader.byteLength}` } });
  }
  const start = selected?.start ?? 0, end = selected?.end ?? reader.byteLength - 1, length = end - start + 1;
  const headers = {
    ...BASE_HEADERS,
    ...(input.headers ?? {}),
    "Content-Type": input.contentType,
    "Content-Length": String(length),
    "Content-Disposition": input.disposition ?? "inline",
    "X-CodexForge-Content-SHA256": reader.contentHash,
    ...(selected ? { "Content-Range": `bytes ${start}-${end}/${reader.byteLength}` } : {}),
  };
  if (input.method === "HEAD") { close(); return new Response(null, { status: selected ? 206 : 200, headers }); }
  let offset = start;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      try {
        if (offset > end) { close(); controller.close(); return; }
        const required = Math.min(CHUNK_BYTES, end - offset + 1), bytes = reader.read(offset, required);
        if (!Buffer.isBuffer(bytes) || bytes.length !== required) throw new Error("INCOMPLETE_MEDIA_READ");
        offset += bytes.length;
        controller.enqueue(new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength));
      } catch (error) { close(); controller.error(error); }
    },
    cancel() { close(); },
  });
  return new Response(body, { status: selected ? 206 : 200, headers });
}

