import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Artikkel ikke funnet" };
  return {
    title: `${post.title} — designinteriør.no`,
    description: post.excerpt,
  };
}

export default async function BloggPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/blogg"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Tilbake til bloggen
        </Link>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{post.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.read_time}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> {post.author}
                </span>
                <span>{post.date}</span>
              </div>
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          </div>

          <Separator className="mb-10" />

          {/* Content sections */}
          <div className="space-y-10 mb-12">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl font-bold mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="mb-10" />

          {/* Other posts */}
          {otherPosts.length > 0 && (
            <div className="mb-10">
              <h3 className="font-display text-xl font-bold mb-6">Les også</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherPosts.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/blogg/${p.slug}`}>
                    <Card className="p-5 group hover:shadow-md transition-all h-full">
                      <Badge variant="secondary" className="text-[10px] mb-2">
                        {p.category}
                      </Badge>
                      <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {p.excerpt}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-accent">
                        Les mer <ArrowRight className="h-3 w-3" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
