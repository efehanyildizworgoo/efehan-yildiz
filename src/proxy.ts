import { NextRequest, NextResponse } from "next/server";
import { boundedRequest,sameOrigin,limited,clientIp } from "@/lib/request-security";
import { currentTokenUser } from "@/lib/auth";
export async function proxy(req:NextRequest){
 const path=req.nextUrl.pathname;
 if(req.headers.get("host")==="efehanyildiz.com") {const url=req.nextUrl.clone();url.host="www.efehanyildiz.com";url.port="";url.protocol="https";return NextResponse.redirect(url,301)}
 if(path.startsWith("/admin")&&path!=="/admin/login"){
  if(!await currentTokenUser(req.cookies.get("ey_admin_token")?.value))return NextResponse.redirect(new URL("/admin/login",req.url));
 }
 if(path.startsWith("/api/")&&!['GET','HEAD','OPTIONS'].includes(req.method)){
  if(!sameOrigin(req))return new NextResponse("Geçersiz kaynak",{status:403});
  const max=path==='/api/admin/media'?11*1024*1024:path.startsWith('/api/admin/')&&path!=='/api/admin/login'?2*1024*1024:16*1024;
  try{await boundedRequest(req.clone(),max)}catch{return new NextResponse("İstek çok büyük",{status:413})}
  const rule=path==='/api/admin/login'?[10,15*60*1000]:path==='/api/contact'?[3,5*60*1000]:path.startsWith('/api/ai-')?[10,10*60*1000]:path==='/api/push/subscribe'?[20,10*60*1000]:null;
  if(rule&&limited(path+':'+clientIp(req),rule[0],rule[1]))return NextResponse.json({error:"Çok fazla istek, lütfen daha sonra deneyin."},{status:429});
 }
 return NextResponse.next();
}
export const config={matcher:"/((?!_next/static|_next/image|favicon.ico|sw.js|icon-.*|logo.*).*)"};
