import {NextRequest,NextResponse}from"next/server";
import{db}from"@/lib/db";import{media}from"@/lib/db/schema";import{getCurrentUser}from"@/lib/auth";import{desc}from"drizzle-orm";
import{writeFile,mkdir,unlink}from"node:fs/promises";import path from"node:path";import{randomUUID}from"node:crypto";import sharp from"sharp";import{uploadDir}from"@/lib/uploads";
export async function GET(){if(!await getCurrentUser())return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json({media:await db.select().from(media).orderBy(desc(media.createdAt))})}
export async function POST(req:NextRequest){
 if(!await getCurrentUser())return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const form=await req.formData(),file=form.get('file');if(!(file instanceof File)||!file.size||file.size>10*1024*1024||file.name.length>255)return NextResponse.json({error:"Geçerli bir görsel seçin (en fazla 10 MB)"},{status:400});
 const input=Buffer.from(await file.arrayBuffer());const img=sharp(input,{limitInputPixels:40000000,animated:true});const meta=await img.metadata();if(!['jpeg','png','webp','gif','avif'].includes(meta.format||'')||(meta.pages||1)>200||(meta.width||0)*(meta.height||0)>40000000)return NextResponse.json({error:"Geçersiz görsel"},{status:400});
 const buffer=await img.webp({quality:90}).toBuffer();if(buffer.length>10*1024*1024)return NextResponse.json({error:"Görsel çok büyük"},{status:400});const name=randomUUID()+'.webp';await mkdir(uploadDir,{recursive:true,mode:0o700});const target=path.join(uploadDir,name);await writeFile(target,buffer,{flag:'wx',mode:0o644});
 try{const[item]=await db.insert(media).values({filename:file.name,url:'/uploads/'+name,size:buffer.length,mimeType:'image/webp'}).returning();return NextResponse.json({media:item},{status:201})}catch{await unlink(target).catch(()=>{});throw Error('Upload failed')}
 }catch{return NextResponse.json({error:"Görsel yüklenemedi"},{status:400})}
}
