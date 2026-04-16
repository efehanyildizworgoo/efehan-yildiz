import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface HomepageSection {
  id: string;
  label: string;
  visible: boolean;
}

export const DEFAULT_SECTIONS: HomepageSection[] = [
  { id: "hero", label: "Hero", visible: true },
  { id: "services", label: "Hizmetler", visible: true },
  { id: "trainings", label: "Eğitimler", visible: true },
  { id: "about", label: "Hakkımda", visible: true },
  { id: "references", label: "Referanslar", visible: true },
  { id: "youtube", label: "YouTube Videoları", visible: true },
  { id: "seo-toolkit", label: "SEO Araç Seti", visible: true },
  { id: "linkedin", label: "LinkedIn Paylaşımları", visible: true },
  { id: "podcast", label: "Podcast Bölümleri", visible: true },
  { id: "contact", label: "İletişim", visible: true },
];

export async function getHomepageSections(): Promise<HomepageSection[]> {
  try {
    const [row] = await db
      .select()
      .from(settings)
      .where(eq(settings.key, "homepage_sections"))
      .limit(1);

    if (row?.value) {
      const saved = JSON.parse(row.value) as HomepageSection[];
      // Merge: add any new default sections not in saved
      const savedIds = new Set(saved.map((s) => s.id));
      const merged = [
        ...saved,
        ...DEFAULT_SECTIONS.filter((d) => !savedIds.has(d.id)),
      ];
      return merged;
    }
  } catch {
    // fallback
  }
  return DEFAULT_SECTIONS;
}
