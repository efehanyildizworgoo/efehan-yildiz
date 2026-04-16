import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Trainings from "@/components/Trainings";
import About from "@/components/About";
import References from "@/components/References";
import YoutubeVideos from "@/components/YoutubeVideos";
import LinkedinPosts from "@/components/LinkedinPosts";
import PodcastBanner from "@/components/PodcastBanner";
import SeoToolkitBanner from "@/components/SeoToolkitBanner";
import Contact from "@/components/Contact";
import { getHomepageSections } from "@/lib/homepage";

export const dynamic = "force-dynamic";

const SECTION_MAP: Record<string, React.FC> = {
  hero: Hero,
  services: Services,
  trainings: Trainings,
  about: About,
  references: References,
  youtube: YoutubeVideos,
  "seo-toolkit": SeoToolkitBanner,
  linkedin: LinkedinPosts,
  podcast: PodcastBanner,
  contact: Contact,
};

export default async function Home() {
  const sections = await getHomepageSections();

  return (
    <>
      {sections
        .filter((s) => s.visible)
        .map((s) => {
          const Component = SECTION_MAP[s.id];
          return Component ? <Component key={s.id} /> : null;
        })}
    </>
  );
}
