'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ArticleImage({ src, alt, width, height }: ArticleImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
