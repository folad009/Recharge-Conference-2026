import type { ImgHTMLAttributes } from "react";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fetchPriority?: "high" | "low" | "auto";
};

export function OptimizedImage({
  loading,
  decoding = "async",
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  return (
    <img
      loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
}
