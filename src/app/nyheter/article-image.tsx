'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export function ArticleImage({
  src,
  alt,
  width = 1200,
  height = 675, // 16:9 aspect ratio
  priority = true, // Default to true since article images are usually LCP
}: ArticleImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-lg"
      style={{
        aspectRatio: '16/9',
        width: '100%',
        maxWidth: width,
        margin: '0 auto',
      }}
    >
      {isLoading && (
        <Skeleton
          className="absolute inset-0 h-full w-full rounded-lg"
          role="presentation"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
          '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#CCCCCC"/></svg>'
        ).toString('base64')}`}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1200px"
        itemProp="image"
        fetchPriority={priority ? 'high' : 'low'}
      />
    </div>
  );
}
