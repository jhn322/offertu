// import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, CalendarDays, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar } from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { TableOfContents } from '../table-of-contents';
import { articles } from '../data';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = articles.find(
    (article) => article.slug === resolvedParams.slug
  );

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container py-8">
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
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={article.image || '/nyheter/placeholder.jpg'}
                alt={article.title}
                className="h-full w-full object-cover"
                width={1200}
                height={600}
              />
            </div>

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
      <Footer />
    </>
  );
}
