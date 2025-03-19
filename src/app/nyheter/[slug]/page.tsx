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
  const fallbackImage =
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&h=600&auto=format&fit=crop';

  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      images: [
        {
          url: article.ogImageUrl || fallbackImage,
          width: 1200,
          height: 600,
          alt: article.imageAlt || article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription || article.excerpt,
      images: [article.ogImageUrl || fallbackImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await getArticleFromSlug(params);

  const publishDate = new Date(article.date).toISOString();

  // Schema.org Article data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.ogImageUrl || article.imageUrl,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      image: article.author.avatar,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Offertu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://offertu.se/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://offertu.se/nyheter/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-5xl mx-auto py-8">
        <nav aria-label="Tillbaka till nyheter" className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="pl-0 text-muted-foreground"
          >
            <Link href="/nyheter">
              <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Tillbaka till nyheter
            </Link>
          </Button>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <header className="mb-6">
            <Badge className="mb-4 ml-2 bg-secondary hover:bg-secondary/90 text-white">
              {article.category}
            </Badge>

            <h1
              itemProp="headline"
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div
                className="flex items-center gap-2"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={article.author.avatar}
                    alt={article.author.name}
                    itemProp="image"
                  />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span itemProp="name">{article.author.name}</span>
              </div>
              <time
                dateTime={publishDate}
                itemProp="datePublished"
                className="flex items-center gap-1"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {article.date}
              </time>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_250px]">
            <div className="article-content">
              <figure>
                <ArticleImage
                  src={article.imageUrl}
                  alt={article.imageAlt || article.title}
                  width={1200}
                  height={600}
                />
                {article.imageAlt && (
                  <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                    {article.imageAlt}
                  </figcaption>
                )}
              </figure>

              <div className="prose prose-lg max-w-none" itemProp="articleBody">
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

              <footer className="mt-10">
                <div className="flex items-center justify-between">
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

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    aria-label="Dela artikel"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Dela
                  </Button>
                </div>
              </footer>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-20">
                <nav
                  className="rounded-lg border bg-card p-4 shadow-sm"
                  aria-label="Innehållsförteckning"
                >
                  <h2 className="mb-4 font-medium">Innehåll</h2>
                  <TableOfContents article={article} />
                </nav>

                <aside aria-label="Relaterat innehåll" className="mt-6">
                  <section className="rounded-lg border bg-card p-4 shadow-sm">
                    <h2 className="mb-4 font-medium">Relaterade artiklar</h2>
                    <div className="space-y-4">
                      {articles
                        .filter((a) => a.slug !== article.slug)
                        .slice(0, 3)
                        .map((relatedArticle) => (
                          <article
                            key={relatedArticle.slug}
                            className="space-y-1"
                          >
                            <Link
                              href={`/nyheter/${relatedArticle.slug}`}
                              className="line-clamp-2 font-medium hover:text-secondary"
                            >
                              {relatedArticle.title}
                            </Link>
                            <time
                              dateTime={new Date(
                                relatedArticle.date
                              ).toISOString()}
                              className="block text-xs text-muted-foreground"
                            >
                              {relatedArticle.date}
                            </time>
                          </article>
                        ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
