// import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft, CalendarDays, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableOfContents } from '../table-of-contents';
import { articles } from '../data';
import { ArticleImage } from '../article-image';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Hjälpfunktion för att hämta artikel från slug
 * Returnerar artikeln om den finns, annars anropar notFound()
 */
async function getArticleFromSlug(params: Promise<{ slug: string }>) {
  const resolvedParams = await params;
  const article = articles.find(
    (article) => article.slug === resolvedParams.slug
  );

  if (!article) {
    notFound();
  }

  return article;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleFromSlug(params);

  // Använd artikelns bild om den finns, annars använd en relevant Unsplash-bild
  const fallbackImages = {
    Trender:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=600&auto=format&fit=crop',
    Guide:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&h=600&auto=format&fit=crop',
    Digitalisering:
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200&h=600&auto=format&fit=crop',
  };

  const imageUrl =
    article.image ||
    fallbackImages[article.category as keyof typeof fallbackImages] ||
    'https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1200&h=600&auto=format&fit=crop';

  return {
    title: `${article.title} | Offertu Nyheter`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 600,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await getArticleFromSlug(params);

  return (
    <>
      <main className="max-w-5xl mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="mb-4 pl-0 text-muted-foreground"
          >
            <Link href="/nyheter">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Tillbaka till nyheter
            </Link>
          </Button>

          <Badge className="mb-4 ml-2 bg-[#4683FF] hover:bg-[#4683FF]/90 text-white">
            {article.category}
          </Badge>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={article.author.avatar}
                  alt={article.author.name}
                />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_250px]">
          <div className="article-content">
            <ArticleImage
              src={article.image || '/nyheter/placeholder.jpg'}
              alt={article.title}
              width={1200}
              height={600}
            />

            <div className="prose prose-lg max-w-none">
              {article.content.map((section, index) => (
                <section key={index} id={section.id}>
                  {section.title && (
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      {section.title}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={article.author.avatar}
                    alt={article.author.name}
                  />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Skriven av</p>
                  <p className="font-semibold">{article.author.name}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Dela
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-4 font-medium">Innehåll</h3>
                <TableOfContents article={article} />
              </div>

              <div className="mt-6 rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-4 font-medium">Relaterade artiklar</h3>
                <div className="space-y-4">
                  {articles
                    .filter((a) => a.slug !== article.slug)
                    .slice(0, 3)
                    .map((relatedArticle) => (
                      <div key={relatedArticle.slug} className="space-y-1">
                        <Link
                          href={`/nyheter/${relatedArticle.slug}`}
                          className="line-clamp-2 font-medium hover:text-[#4683FF]"
                        >
                          {relatedArticle.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {relatedArticle.date}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
