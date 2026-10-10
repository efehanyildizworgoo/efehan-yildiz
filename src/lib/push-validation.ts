export function validPushEndpoint(endpoint: unknown): endpoint is string {
 if (typeof endpoint !== "string" || endpoint.length > 4096) return false;
 try { const u=new URL(endpoint); const host=u.hostname.toLowerCase();
 return u.protocol === "https:" && !u.username && !u.password && !u.hash && (!u.port || u.port === "443") &&
 (host === "fcm.googleapis.com" || host === "updates.push.services.mozilla.com" || host === "web.push.apple.com" || host.endsWith(".notify.windows.com"));
 } catch { return false; }
}
export function validPushKeys(p256dh: unknown, auth: unknown): boolean {
 if (typeof p256dh !== "string" || typeof auth !== "string" || !/^[A-Za-z0-9_-]{87}=?$/.test(p256dh) || !/^[A-Za-z0-9_-]{22}={0,2}$/.test(auth)) return false;
 const key=Buffer.from(p256dh,"base64url");return key.length===65 && key[0]===4 && Buffer.from(auth,"base64url").length===16;
}
