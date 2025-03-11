import { Metadata } from 'next';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { articles } from './data';

export const metadata: Metadata = {
  title: 'Nyheter',
  description:
    'Ta del av de senaste trenderna, expertråden och branschnyheterna inom offerering och projektkalkylering. Håll dig uppdaterad med Offertu.',
  openGraph: {
    title: 'Nyheter',
    description:
      'Ta del av de senaste trenderna, expertråden och branschnyheterna inom offerering och projektkalkylering. Håll dig uppdaterad med Offertu.',
    type: 'website',
    images: [
      {
        url: '/nyheter/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Offertu Nyheter',
      },
    ],
  },
};

// Schema.org structured data for the news page
const newsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  headline: 'Nyheter | Senaste inom offerering och projektkalkylering',
  description:
    'Ta del av de senaste trenderna, expertråden och branschnyheterna inom offerering och projektkalkylering.',
  publisher: {
    '@type': 'Organization',
    name: 'Offertu',
    url: 'https://offertu.se',
    logo: {
      '@type': 'ImageObject',
      url: 'https://offertu.se/logo.png',
    },
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        image: article.ogImageUrl || article.imageUrl,
        datePublished: new Date(article.date).toISOString(),
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
      },
    })),
  },
};

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsPageSchema) }}
      />
      <main className="container py-12">
        <header className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nyheter
            </h1>
            <p className="text-xl text-muted-foreground">
              Ta del av de senaste trenderna, expertråden och branschnyheterna
              inom offerering och projektkalkylering.
            </p>
          </div>
          <Separator className="my-4" />
        </header>

        <section
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Nyhetsartiklar"
        >
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col"
              itemScope
              itemType="https://schema.org/Article"
            >
              <Card className="h-full">
                <Link
                  href={`/nyheter/${article.slug}`}
                  className="block transition-all hover:opacity-90"
                  aria-label={`Läs hela artikeln: ${article.title}`}
                >
                  <CardHeader>
                    <figure className="relative aspect-[16/9] w-full mb-4">
                      <Image
                        src={article.imageUrl}
                        alt={article.imageAlt || article.title}
                        fill
                        className="absolute inset-0 object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={articles.indexOf(article) < 2}
                        quality={75}
                        itemProp="image"
                      />
                    </figure>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <time
                        dateTime={new Date(article.date).toISOString()}
                        itemProp="datePublished"
                        className="inline-flex items-center gap-1"
                      >
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {article.date}
                      </time>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span aria-label="Lästid">{article.readTime}</span>
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <span itemProp="headline">{article.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p itemProp="description" className="text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div
                        itemScope
                        itemType="https://schema.org/Person"
                        itemProp="author"
                      >
                        <Image
                          src={article.author.avatar}
                          alt={`${article.author.name}'s profilbild`}
                          width={40}
                          height={40}
                          className="rounded-full"
                          itemProp="image"
                        />
                        <span itemProp="name" className="text-sm font-medium">
                          {article.author.name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="mt-auto pt-4">
                  <div className="ml-auto">
                    <Link href={`/nyheter/${article.slug}`}>
                      <Button className="bg-[#FFAE00] text-primary-foreground hover:bg-[#FFAE00]/90">
                        Läs mer{' '}
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
