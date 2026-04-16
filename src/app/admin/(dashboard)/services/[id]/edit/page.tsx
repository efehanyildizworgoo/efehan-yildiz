"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PageBuilder from "@/components/admin/builder/PageBuilder";
import type { Block } from "@/lib/builder/types";

interface Service {
  id: number;
  title: string;
  slug: string;
  blocks: Block[];
  status: string;
}

export default function ServiceEditPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/services/${params.id}`)
      .then((r) => r.json())
      .then((data) => { setService(data.service); setLoading(false); })
      .catch(() => router.push("/admin/services"));
  }, [params.id, router]);

  if (loading || !service) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div className="-m-6">
      <PageBuilder
        pageId={service.id}
        initialBlocks={service.blocks || []}
        initialTitle={service.title}
        initialSlug={service.slug}
        initialStatus={service.status}
        initialSeoTitle=""
        initialSeoDesc=""
        apiBase="/api/admin/services"
        backUrl="/admin/services"
        backLabel="Hizmetler"
      />
    </div>
  );
}
