'use client';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import * as React from 'react';

interface EmotionRegistryProps {
  children: React.ReactNode;
}

function ClientStyleProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options: Parameters<typeof createCache>[0];
}) {
  const cache = React.useMemo(() => {
    const c = createCache(options);
    // Enable compatibility mode if needed.
    c.compat = true;
    return c;
  }, [options]);

  useServerInsertedHTML(() => {
    // Grab all inserted styles from Emotion’s cache.
    const insertedKeys = Object.keys(cache.inserted);
    if (insertedKeys.length === 0) return null;
    const css = insertedKeys.map((key) => cache.inserted[key]).join('');
    return (
      <style
        data-emotion={`css ${insertedKeys.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

export default function EmotionRegistry({
  children,
}: EmotionRegistryProps) {
  return (
    <ClientStyleProvider options={{ key: 'css', prepend: true }}>
      {children}
    </ClientStyleProvider>
  );
}
