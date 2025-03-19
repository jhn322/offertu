'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TableOfContentsProps {
  article: {
    content: {
      id: string;
      title?: string;
      paragraphs: string[];
    }[];
  };
}

export function TableOfContents({ article }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    const headings = document.querySelectorAll('section[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <nav className="space-y-2 text-sm">
      {article.content
        .filter((section) => section.title)
        .map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              'block py-1 transition-colors hover:text-secondary',
              activeSection === section.id
                ? 'font-medium text-secondary'
                : 'text-muted-foreground'
            )}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${section.id}`)?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            {section.title}
          </Link>
        ))}
    </nav>
  );
}
