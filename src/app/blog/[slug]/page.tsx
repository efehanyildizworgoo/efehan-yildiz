import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  ChevronRight,
  Linkedin,
  Twitter,
  ArrowRight,
} from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  toc: { id: string; title: string }[];
  content: string;
  relatedSlugs: string[];
}

const posts: Record<string, BlogPost> = {};

const allPosts: { slug: string; title: string; category: string; date: string }[] = [];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  SEO: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  WordPress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Dijital Pazarlama": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "E-Ticaret": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Web Tasarım": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Yapay Zeka": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
          <p className="mb-6 text-muted">Bu blog yazısı bulunamadı.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Blog&apos;a Dön
          </Link>
        </div>
      </div>
    );
  }

  const related = allPosts.filter(
    (p) => post.relatedSlugs?.includes(p.slug) && p.slug !== slug
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb + Header */}
      <section className="border-b border-border py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="transition-colors hover:text-primary">Blog</Link>
            <ChevronRight size={14} />
            <span className="line-clamp-1 text-white">{post.title}</span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              categoryColors[post.category] || ""
            }`}
          >
            <Tag size={10} />
            {post.category}
          </span>

          <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-[42px] lg:leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-muted">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src="/ey-giris.png" alt={post.author} fill className="object-cover" />
              </div>
              <span className="font-medium text-white">{post.author}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} okuma
            </span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar — Worgoo layout */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Main Content */}
            <article className="min-w-0 flex-1">
              <div
                className="blog-content text-[15px] leading-[1.85] text-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 border-t border-border pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm text-muted">
                      <Share2 size={14} />
                      Paylaş:
                    </span>
                    <div className="flex gap-2">
                      <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-all hover:border-[#0077B5] hover:text-[#0077B5]">
                        <Linkedin size={15} />
                      </a>
                      <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-all hover:border-white hover:text-white">
                        <Twitter size={15} />
                      </a>
                    </div>
                  </div>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-light"
                  >
                    Tüm Yazılar
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full flex-shrink-0 lg:w-80">
              <div className="sticky top-28 space-y-6">
                {/* TOC */}
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                    İçindekiler
                  </h3>
                  <nav className="space-y-2">
                    {post.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted transition-colors hover:text-primary"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Author */}
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                    Yazar
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image src="/ey-giris.png" alt="Efehan Yıldız" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Efehan Yıldız</p>
                      <p className="text-xs text-muted">SEO & Dijital Pazarlama Uzmanı</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    Dijital pazarlama, SEO ve WordPress alanlarında yılların deneyimiyle markaların
                    büyümesine yardımcı oluyorum.
                  </p>
                </div>

                {/* Related Posts */}
                {related.length > 0 && (
                  <div className="rounded-2xl border border-border bg-surface p-6">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                      İlgili Yazılar
                    </h3>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/blog/${r.slug}`}
                          className="group block rounded-xl border border-border bg-surface-light p-3 transition-all hover:border-primary/20"
                        >
                          <span
                            className={`mb-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                              categoryColors[r.category] || ""
                            }`}
                          >
                            {r.category}
                          </span>
                          <p className="text-sm font-medium text-white transition-colors group-hover:text-primary line-clamp-2">
                            {r.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <p className="text-sm font-bold text-white">
                    SEO desteği mi arıyorsunuz?
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Profesyonel SEO danışmanlığı ile markanızı büyütün.
                  </p>
                  <Link
                    href="/iletisim"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
                  >
                    İletişime Geçin
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
