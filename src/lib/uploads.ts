import path from "node:path";
export const uploadDir=process.env.UPLOAD_DIR||path.join(process.cwd(),"data/uploads");
export const safeUploadName=(n:string)=>/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,180}$/.test(n)&&!n.includes("..");
