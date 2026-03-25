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

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Trainings />
      <About />
      <References />
      <YoutubeVideos />
      <SeoToolkitBanner />
      <LinkedinPosts />
      <PodcastBanner />
      <Contact />
    </>
  );
}
