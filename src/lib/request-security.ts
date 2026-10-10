export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  if (["https://www.efehanyildiz.com", "https://efehanyildiz.com"].includes(origin)) return true;
  return process.env.NODE_ENV !== "production" && origin === new URL(req.url).origin;
}
export async function boundedRequest(req: Request, max: number): Promise<Request> {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (!Number.isFinite(length) || length < 0 || length > max) throw new Error("BODY_LIMIT");
  const reader = req.body?.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  if (reader) while (true) {
    const {value, done} = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > max) { void reader.cancel().catch(() => {}); throw new Error("BODY_LIMIT"); }
    chunks.push(value);
  }
  return new Request(req.url, { method: req.method, headers: req.headers, body: Buffer.concat(chunks) });
}

const windows = new Map<string,{n:number;until:number}>();
export function limited(key:string,limit:number,ms:number):boolean {
 const now=Date.now(); for(const [k,v] of windows)if(v.until<=now)windows.delete(k);
 let v=windows.get(key);if(!v){if(windows.size>=10000)return true;v={n:0,until:now+ms};windows.set(key,v)} return ++v.n>limit;
}
export function clientIp(req:Request):string{return (req.headers.get("x-real-ip")||req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()||"unknown").slice(0,128)}
