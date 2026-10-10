import {NextRequest,NextResponse} from "next/server";
import {db} from "@/lib/db";import {users} from "@/lib/db/schema";
import {getCurrentUser,verifyPassword,hashPassword,createToken,setAuthCookie} from "@/lib/auth";
import {eq,and} from "drizzle-orm";
export async function GET(){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});const [u]=await db.select({id:users.id,name:users.name,email:users.email}).from(users).where(eq(users.id,user.id));return NextResponse.json({user:u})}
export async function PUT(req:NextRequest){
 const session=await getCurrentUser();if(!session)return NextResponse.json({error:"Unauthorized"},{status:401});
 const body=await req.json();const [user]=await db.select().from(users).where(eq(users.id,session.id));if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const updates:{name?:string;email?:string;passwordHash?:string}={};
 if(body.name!==undefined){if(typeof body.name!=="string"||!body.name.trim()||body.name.length>255)return NextResponse.json({error:"Geçersiz ad"},{status:400});updates.name=body.name.trim()}
 if(body.email!==undefined){if(typeof body.email!=="string"||body.email.length>254||!/^\S+@\S+\.\S+$/.test(body.email))return NextResponse.json({error:"Geçersiz e-posta"},{status:400});updates.email=body.email.trim()}
 if(body.currentPassword||body.newPassword){if(typeof body.newPassword!=="string"||body.newPassword.length<8||Buffer.byteLength(body.newPassword)>72||!await verifyPassword(body.currentPassword,user.passwordHash))return NextResponse.json({error:"Şifre geçersiz; yeni şifre en az 8 karakter olmalı"},{status:400});updates.passwordHash=await hashPassword(body.newPassword)}
 if(!Object.keys(updates).length)return NextResponse.json({success:true});
 const [saved]=await db.update(users).set(updates).where(and(eq(users.id,user.id),eq(users.passwordHash,user.passwordHash))).returning();
 if(!saved)return NextResponse.json({error:"Bilgiler değişti; yeniden giriş yapın"},{status:409});
 await setAuthCookie(createToken({id:saved.id,email:saved.email},saved.passwordHash));return NextResponse.json({success:true});
}
