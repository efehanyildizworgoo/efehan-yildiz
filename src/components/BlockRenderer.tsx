import Link from "next/link";
import {
  Block,
  HeroBlockData,
  TextBlockData,
  FeaturesBlockData,
  CtaBlockData,
  FaqBlockData,
  StatsBlockData,
  ProcessBlockData,
  ImageBlockData,
  SpacerBlockData,
  CustomHtmlBlockData,
} from "@/lib/builder/types";
import {
  Search, Globe, Zap, Target, BarChart3, TrendingUp,
  FileText, LayoutDashboard, CheckCircle2, ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Search: <Search size={20} />,
  Globe: <Globe size={20} />,
  Zap: <Zap size={20} />,
  Target: <Target size={20} />,
  BarChart3: <BarChart3 size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  FileText: <FileText size={20} />,
  LayoutDashboard: <LayoutDashboard size={20} />,
  CheckCircle2: <CheckCircle2 size={20} />,
};

function HeroBlock({ data }: { data: HeroBlockData }) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className={`relative mx-auto max-w-4xl px-6 text-${data.alignment}`}>
        {data.subtitle && <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">{data.subtitle}</p>}
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">{data.title}</h1>
        {data.description && <p className="mx-auto mt-6 max-w-2xl text-muted">{data.description}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {data.primaryButtonText && (
            <Link href={data.primaryButtonUrl || "#"} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]">
              {data.primaryButtonText}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          {data.secondaryButtonText && (
            <Link href={data.secondaryButtonUrl || "#"} className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-surface-light">
              {data.secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function TextBlock({ data }: { data: TextBlockData }) {
  const Tag = data.headingTag as "h1" | "h2" | "h3" | "h4";
  const sizes = { h1: "text-4xl", h2: "text-3xl", h3: "text-2xl", h4: "text-xl" };
  return (
    <section className="py-12">
      <div className={`mx-auto max-w-4xl px-6 text-${data.alignment}`}>
        {data.heading && <Tag className={`font-heading ${sizes[data.headingTag]} font-bold text-white`}>{data.heading}</Tag>}
        {data.content && <p className="mt-4 text-muted leading-relaxed">{data.content}</p>}
      </div>
    </section>
  );
}

function FeaturesBlock({ data }: { data: FeaturesBlockData }) {
  const colsClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {data.heading && <h2 className="mb-4 text-center font-heading text-3xl font-bold text-white">{data.heading}</h2>}
        {data.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted">{data.subtitle}</p>}
        <div className={`grid gap-6 ${colsClass[data.columns]}`}>
          {data.items.map((item, i) => (
            <div key={i} className="gradient-border rounded-2xl bg-surface p-6 transition-all hover:bg-surface-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                {ICON_MAP[item.icon] || <Zap size={20} />}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock({ data }: { data: CtaBlockData }) {
  return (
    <section className={`py-24 ${data.style === "gradient" ? "bg-gradient-to-r from-primary/10 to-transparent" : "bg-surface"}`}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-heading text-3xl font-bold text-white">{data.heading}</h2>
        {data.description && <p className="mx-auto mt-4 max-w-xl text-muted">{data.description}</p>}
        {data.buttonText && (
          <Link href={data.buttonUrl || "#"} className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]">
            {data.buttonText}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
}

function FaqBlock({ data }: { data: FaqBlockData }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        {data.heading && <h2 className="mb-10 text-center font-heading text-3xl font-bold text-white">{data.heading}</h2>}
        <div className="space-y-4">
          {data.items.map((item, i) => (
            <details key={i} className="group gradient-border rounded-2xl bg-surface">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-white font-semibold">
                {item.question}
                <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBlock({ data }: { data: StatsBlockData }) {
  const colsClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-2 md:grid-cols-4" };
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        {data.heading && <h2 className="mb-10 text-center font-heading text-3xl font-bold text-white">{data.heading}</h2>}
        <div className={`grid gap-6 ${colsClass[data.columns]}`}>
          {data.items.map((item, i) => (
            <div key={i} className="gradient-border rounded-2xl bg-surface p-8 text-center">
              <p className="text-4xl font-bold text-primary">{item.value}</p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessBlock({ data }: { data: ProcessBlockData }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        {data.heading && <h2 className="mb-10 text-center font-heading text-3xl font-bold text-white">{data.heading}</h2>}
        <div className="space-y-6">
          {data.items.map((item, i) => (
            <div key={i} className="flex items-start gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary font-heading text-xl font-bold text-white">
                {item.step}
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageBlock({ data }: { data: ImageBlockData }) {
  const widths = { small: "max-w-md", medium: "max-w-2xl", full: "max-w-5xl" };
  if (!data.src) return null;
  return (
    <section className="py-8">
      <div className={`mx-auto px-6 ${widths[data.width]}`}>
        <img src={data.src} alt={data.alt} className={`w-full ${data.rounded ? "rounded-2xl" : ""}`} />
      </div>
    </section>
  );
}

function SpacerBlock({ data }: { data: SpacerBlockData }) {
  return <div style={{ height: data.height }} />;
}

function CustomHtmlBlock({ data }: { data: CustomHtmlBlockData }) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-6" dangerouslySetInnerHTML={{ __html: data.html }} />
    </section>
  );
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="min-h-screen pt-20">
      {blocks.map((block) => {
        switch (block.type) {
          case "hero": return <HeroBlock key={block.id} data={block.data as HeroBlockData} />;
          case "text": return <TextBlock key={block.id} data={block.data as TextBlockData} />;
          case "features": return <FeaturesBlock key={block.id} data={block.data as FeaturesBlockData} />;
          case "cta": return <CtaBlock key={block.id} data={block.data as CtaBlockData} />;
          case "faq": return <FaqBlock key={block.id} data={block.data as FaqBlockData} />;
          case "stats": return <StatsBlock key={block.id} data={block.data as StatsBlockData} />;
          case "process": return <ProcessBlock key={block.id} data={block.data as ProcessBlockData} />;
          case "image": return <ImageBlock key={block.id} data={block.data as ImageBlockData} />;
          case "spacer": return <SpacerBlock key={block.id} data={block.data as SpacerBlockData} />;
          case "custom-html": return <CustomHtmlBlock key={block.id} data={block.data as CustomHtmlBlockData} />;
          default: return null;
        }
      })}
    </div>
  );
}
