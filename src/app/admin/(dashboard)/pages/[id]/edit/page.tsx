import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import PageBuilder from "@/components/admin/builder/PageBuilder";
import type { Block } from "@/lib/builder/types";

export default async function PageEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, Number(id)))
    .limit(1);

  if (!page) redirect("/admin/pages");

  return (
    <div className="-m-6">
      <PageBuilder
        pageId={page.id}
        initialBlocks={(page.blocks as Block[]) || []}
        initialTitle={page.title}
        initialSlug={page.slug}
        initialStatus={page.status}
        initialSeoTitle={page.seoTitle || ""}
        initialSeoDesc={page.seoDesc || ""}
      />
    </div>
  );
}
