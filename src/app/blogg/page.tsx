import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: "Blogg — designinteriør.no",
  description: "Tips, guider og inspirasjon for interiørdesign. Les våre artikler om innredning, farger, stiler og bærekraft.",
};

export default function BloggPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
            Blogg
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Interiørtips og guider
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Utforsk våre artikler om innredning, stiler, farger og alt som gjør hjemmet ditt vakrere.
          </p>
        </div>

        {/* Featured post */}
        {blogPosts.length > 0 && (
          <Link href={`/blogg/${blogPosts[0].slug}`} className="block mb-12 max-w-4xl mx-auto">
            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2 aspect-[4/3] md:aspect-auto bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">{blogPosts[0].category}</Badge>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{blogPosts[0].read_time}</span>
                    <span>·</span>
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                  <span className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Les mer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Rest of posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blogg/${post.slug}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    <span>{post.read_time}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
