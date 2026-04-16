import { notFound } from "next/navigation";
import { getTrainingBySlug } from "@/data/trainings";
import TrainingDetailClient from "./TrainingDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  const title = training?.metaTitle || "Eğitim";
  const ogImage = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent("Eğitimler")}`;

  return {
    title: `${title} - Efehan Yıldız`,
    description: training?.description || `${title} eğitimi hakkında detaylı bilgi.`,
    openGraph: {
      title: `${title} - Efehan Yıldız`,
      description: training?.description || `${title} eğitimi.`,
      url: `https://www.efehanyildiz.com/egitimler/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function TrainingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) notFound();
  return <TrainingDetailClient slug={slug} />;
}
