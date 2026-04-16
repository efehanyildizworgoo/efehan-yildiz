import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Block } from "@/lib/builder/types";
import BlockRenderer from "@/components/BlockRenderer";
import ServicePageClient from "./ServicePageWrapper";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const KNOWN_SLUGS = ["seo-danismanligi", "web-tasarim", "dijital-pazarlama", "google-ads", "marka-danismanligi", "e-ticaret"];

const META_TITLES: Record<string, string> = {
  "seo-danismanligi": "SEO Danışmanlığı",
  "web-tasarim": "Web Tasarım & Geliştirme",
  "dijital-pazarlama": "Dijital Pazarlama Stratejisi",
  "google-ads": "Google Ads Yönetimi",
  "marka-danismanligi": "Marka Danışmanlığı",
  "e-ticaret": "E-Ticaret Çözümleri",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const [service] = await db.select().from(services).where(and(eq(services.slug, slug), eq(services.status, "published"))).limit(1);

  const title = service?.title || META_TITLES[slug] || "Hizmet";

  return {
    title: `${title} - Efehan Yıldız`,
    description: `${title} hizmeti hakkında detaylı bilgi alın. Profesyonel dijital çözümler.`,
    openGraph: {
      title: `${title} - Efehan Yıldız`,
      description: `${title} hizmeti hakkında detaylı bilgi alın.`,
      url: `https://www.efehanyildiz.com/hizmetler/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [service] = await db.select().from(services).where(and(eq(services.slug, slug), eq(services.status, "published"))).limit(1);

  const blocks = (service?.blocks || []) as Block[];

  if (blocks.length > 0) {
    return <BlockRenderer blocks={blocks} />;
  }

  if (KNOWN_SLUGS.includes(slug)) {
    return <ServicePageClient slug={slug} />;
  }

  notFound();
}
