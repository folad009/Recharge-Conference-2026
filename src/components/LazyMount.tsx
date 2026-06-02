import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: () => ReactNode;
  /** Placeholder height to reduce layout shift before mount */
  minHeight?: string;
  /** Load when within this distance of the viewport (px) */
  rootMargin?: string;
  className?: string;
};

/**
 * Defers rendering (and lazy-imported children) until near the viewport.
 * Use with React.lazy: <LazyMount>{() => <LazySection />}</LazyMount>
 */
export function LazyMount({
  children,
  minHeight = "1px",
  rootMargin = "320px 0px",
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;

    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className} style={!mounted ? { minHeight } : undefined}>
      {mounted ? children() : null}
    </div>
  );
}
