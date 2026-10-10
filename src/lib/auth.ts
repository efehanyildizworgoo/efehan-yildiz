import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { createHash } from "node:crypto";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
function secret(){const value=process.env.JWT_SECRET;if(!value||value.length<24)throw new Error("Authentication unavailable");return value}
const credentialVersion=(id:number,hash:string)=>createHash("sha256").update(id+"\0"+hash).digest("hex");
const TOKEN_NAME = "ey_admin_token";
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return typeof password === "string" && Buffer.byteLength(password) <= 72 && /^\$2[aby]\$\d{2}\$/.test(hash) && bcrypt.compare(password, hash);
}

export function createToken(payload: { id: number; email: string }, verifiedHash:string): string {
  return jwt.sign({...payload,cv:credentialVersion(payload.id,verifiedHash)}, secret(), { expiresIn: TOKEN_EXPIRY, algorithm:"HS256" });
}

export function verifyToken(
  token: string
): { id: number; email: string; cv:string } | null {
  try {
    if(token.length>4096)return null;
    const data=jwt.verify(token,secret(),{algorithms:["HS256"]});
    if(typeof data==='string'||!Number.isSafeInteger(data.id)||data.id<1||typeof data.email!=="string"||data.email.length>254||!Number.isFinite(data.exp)||typeof data.cv!=="string"||!/^[a-f0-9]{64}$/.test(data.cv))return null;
    return data as {id:number;email:string;cv:string};
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

export async function getCurrentUser(): Promise<{
  id: number;
  email: string;
} | null> {
  const token = await getAuthCookie();
  return currentTokenUser(token);
}

export async function currentTokenUser(token?:string):Promise<{id:number;email:string}|null>{
 if(!token)return null; const data=verifyToken(token);if(!data)return null;
 try{const [user]=await db.select().from(users).where(eq(users.id,data.id)).limit(1);
 if(!user||data.cv!==credentialVersion(user.id,user.passwordHash))return null;
 return {id:user.id,email:user.email};}catch{return null}
}
