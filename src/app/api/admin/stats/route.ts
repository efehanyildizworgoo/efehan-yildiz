import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, pages, services, leads, trainings, media } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { count, eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [postCount] = await db.select({ count: count() }).from(posts);
  const [publishedPostCount] = await db.select({ count: count() }).from(posts).where(eq(posts.status, "published"));
  const [pageCount] = await db.select({ count: count() }).from(pages);
  const [serviceCount] = await db.select({ count: count() }).from(services);
  const [leadCount] = await db.select({ count: count() }).from(leads);
  const [newLeadCount] = await db.select({ count: count() }).from(leads).where(eq(leads.pipelineStage, "new"));
  const [trainingCount] = await db.select({ count: count() }).from(trainings);
  const [mediaCount] = await db.select({ count: count() }).from(media);

  // Recent leads
  const recentLeads = await db.select().from(leads).orderBy(leads.createdAt).limit(5);

  return NextResponse.json({
    stats: {
      posts: postCount.count,
      publishedPosts: publishedPostCount.count,
      pages: pageCount.count,
      services: serviceCount.count,
      leads: leadCount.count,
      newLeads: newLeadCount.count,
      trainings: trainingCount.count,
      media: mediaCount.count,
    },
    recentLeads,
  });
}
