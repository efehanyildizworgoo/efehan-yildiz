"use client";

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

function HeroPreview({ data }: { data: HeroBlockData }) {
  return (
    <div className={`rounded-xl bg-gradient-to-br from-[#0c1029] to-[#131836] p-8 text-${data.alignment}`}>
      {data.subtitle && <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#1d47f0]">{data.subtitle}</p>}
      <h2 className="text-2xl font-bold text-white">{data.title}</h2>
      {data.description && <p className="mt-3 text-sm text-[#7a82a6]">{data.description}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {data.primaryButtonText && <span className="rounded-lg bg-[#1d47f0] px-4 py-2 text-xs font-semibold text-white">{data.primaryButtonText}</span>}
        {data.secondaryButtonText && <span className="rounded-lg border border-[rgba(29,71,240,0.3)] px-4 py-2 text-xs font-semibold text-[#7a82a6]">{data.secondaryButtonText}</span>}
      </div>
    </div>
  );
}

function TextPreview({ data }: { data: TextBlockData }) {
  const Tag = data.headingTag;
  const sizes = { h1: "text-2xl", h2: "text-xl", h3: "text-lg", h4: "text-base" };
  return (
    <div className={`text-${data.alignment}`}>
      {data.heading && <Tag className={`${sizes[data.headingTag]} font-bold text-white`}>{data.heading}</Tag>}
      {data.content && <p className="mt-2 text-sm leading-relaxed text-[#7a82a6]">{data.content}</p>}
    </div>
  );
}

function FeaturesPreview({ data }: { data: FeaturesBlockData }) {
  const colsClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  return (
    <div>
      {data.heading && <h3 className="mb-4 text-center text-lg font-bold text-white">{data.heading}</h3>}
      <div className={`grid gap-3 ${colsClass[data.columns]}`}>
        {data.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-4">
            <div className="mb-2 text-xs font-bold text-[#1d47f0]">{item.icon}</div>
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-xs text-[#7a82a6]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaPreview({ data }: { data: CtaBlockData }) {
  const bg = data.style === "gradient"
    ? "bg-gradient-to-r from-[#1d47f0]/20 to-[#0c1029]"
    : data.style === "bordered"
    ? "border-2 border-[#1d47f0]/20"
    : "bg-[#0c1029]";
  return (
    <div className={`rounded-xl p-6 text-center ${bg}`}>
      <h3 className="text-lg font-bold text-white">{data.heading}</h3>
      {data.description && <p className="mt-2 text-sm text-[#7a82a6]">{data.description}</p>}
      {data.buttonText && <span className="mt-4 inline-block rounded-lg bg-[#1d47f0] px-5 py-2 text-xs font-semibold text-white">{data.buttonText}</span>}
    </div>
  );
}

function FaqPreview({ data }: { data: FaqBlockData }) {
  return (
    <div>
      {data.heading && <h3 className="mb-3 text-lg font-bold text-white">{data.heading}</h3>}
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] px-4 py-3">
            <p className="text-sm font-semibold text-white">{item.question}</p>
            <p className="mt-1 text-xs text-[#7a82a6]">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsPreview({ data }: { data: StatsBlockData }) {
  const colsClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  return (
    <div>
      {data.heading && <h3 className="mb-4 text-center text-lg font-bold text-white">{data.heading}</h3>}
      <div className={`grid gap-3 ${colsClass[data.columns]}`}>
        {data.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-4 text-center">
            <p className="text-2xl font-bold text-[#1d47f0]">{item.value}</p>
            <p className="mt-1 text-xs text-[#7a82a6]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessPreview({ data }: { data: ProcessBlockData }) {
  return (
    <div>
      {data.heading && <h3 className="mb-4 text-lg font-bold text-white">{data.heading}</h3>}
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1d47f0] text-xs font-bold text-white">{item.step}</span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-xs text-[#7a82a6]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagePreview({ data }: { data: ImageBlockData }) {
  const widths = { small: "max-w-xs", medium: "max-w-lg", full: "w-full" };
  return (
    <div className={`mx-auto ${widths[data.width]}`}>
      {data.src ? (
        <img src={data.src} alt={data.alt} className={`w-full ${data.rounded ? "rounded-xl" : ""}`} />
      ) : (
        <div className={`flex h-32 items-center justify-center bg-[#131836] text-xs text-[#7a82a6] ${data.rounded ? "rounded-xl" : ""}`}>
          Görsel URL ekleyin
        </div>
      )}
    </div>
  );
}

function SpacerPreview({ data }: { data: SpacerBlockData }) {
  return (
    <div style={{ height: data.height }} className="flex items-center justify-center border border-dashed border-[rgba(29,71,240,0.1)] rounded-lg">
      <span className="text-[10px] text-[#7a82a6]/40">{data.height}px boşluk</span>
    </div>
  );
}

function CustomHtmlPreview({ data }: { data: CustomHtmlBlockData }) {
  return (
    <div className="rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-4">
      <pre className="overflow-x-auto text-xs text-[#7a82a6]"><code>{data.html.slice(0, 300)}</code></pre>
    </div>
  );
}

export default function BlockPreview({ block }: { block: Block }) {
  switch (block.type) {
    case "hero": return <HeroPreview data={block.data as HeroBlockData} />;
    case "text": return <TextPreview data={block.data as TextBlockData} />;
    case "features": return <FeaturesPreview data={block.data as FeaturesBlockData} />;
    case "cta": return <CtaPreview data={block.data as CtaBlockData} />;
    case "faq": return <FaqPreview data={block.data as FaqBlockData} />;
    case "stats": return <StatsPreview data={block.data as StatsBlockData} />;
    case "process": return <ProcessPreview data={block.data as ProcessBlockData} />;
    case "image": return <ImagePreview data={block.data as ImageBlockData} />;
    case "spacer": return <SpacerPreview data={block.data as SpacerBlockData} />;
    case "custom-html": return <CustomHtmlPreview data={block.data as CustomHtmlBlockData} />;
    default: return <div className="rounded-lg bg-[#131836] p-4 text-xs text-[#7a82a6]">{block.type} bloğu</div>;
  }
}
