import { type ReactNode, useEffect, useRef, useState, useId } from "react";
import { FOCUS_OUTLINE_CLASSES } from "~/lib/contants";
import { useIsMounted } from "~/lib/hooks/use-is-mounted";
import { cn } from "~/lib/utils";

export function LiquidGlass({
  children,
  className = "",
  radius = 24,
  scale = -180,
  border = 0.07,
  lightness = 50,
  alpha = 0.93,
  blur = 11,
  displace = 0,
  backgroundBlur = 0,
  backgroundOpacity = 0.2,
  saturation = 1,
  xChannel = "R",
  yChannel = "G",
  blend = "difference",
  r = 0,
  g = 10,
  b = 20,
}: {
  children?: ReactNode;
  className?: string;
  /* 0-500+ (px) */
  radius?: number;
  /* -1000 to 1000 (negative = compress, positive = expand) */
  scale?: number;
  /* 0-1 (border width multiplier) */
  border?: number;
  /* 0-100 (hsl lightness %) */
  lightness?: number;
  /* 0-1 (opacity) */
  alpha?: number;
  /* 0-20+ (px, input blur) */
  blur?: number;
  /* 0-12+ (px, output blur/displacement strength) */
  displace?: number;
  /* 0-30+ (px, background blur) */
  backgroundBlur?: number;
  /* 0-1 (container background opacity) */
  backgroundOpacity?: number;
  /* 0-2+ (saturation multiplier) */
  saturation?: number;
  /* R, G, or B */
  xChannel?: "R" | "G" | "B";
  /* R, G, or B */
  yChannel?: "R" | "G" | "B";
  /* blend mode for displacement gradients */
  blend?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter";
  /* -100 to 100 (chromatic aberration red offset) */
  r?: number;
  /* -100 to 100 (chromatic aberration green offset) */
  g?: number;
  /* -100 to 100 (chromatic aberration blue offset) */
  b?: number;
}) {
  const [dimensions, setDimensions] = useState({ width: 336, height: 96 });

  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();

  const filterId = `glass-${useId().replace(/:/g, "")}`;

  const borderWidth =
    Math.min(dimensions.width, dimensions.height) * (border * 0.5);
  const displacementMapUri = buildDisplacementImage(
    dimensions.width,
    dimensions.height,
    radius,
    borderWidth,
    lightness,
    alpha,
    blur,
    blend
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.round(rect.width);
      const newHeight = Math.round(rect.height);

      if (newWidth > 0 && newHeight > 0) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    const timeoutId = setTimeout(updateDimensions, 0);

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const supportsSvg = isMounted && supportsSVGFilters(filterId);
  const supportsBackdropFilter =
    isMounted && CSS.supports("backdrop-filter", "blur(10px)");

  const containerStyles = supportsSvg
    ? {
        backgroundColor:
          backgroundOpacity > 0
            ? `color-mix(in srgb, var(--background) ${backgroundOpacity * 100}%, transparent)`
            : "transparent",
        borderRadius: `${radius}px`,
        backdropFilter:
          backgroundBlur > 0
            ? `url(#${filterId}) saturate(${saturation}) blur(${backgroundBlur}px)`
            : `url(#${filterId}) saturate(${saturation})`,
        WebkitBackdropFilter:
          backgroundBlur > 0
            ? `url(#${filterId}) saturate(${saturation}) blur(${backgroundBlur}px)`
            : `url(#${filterId}) saturate(${saturation})`,
      }
    : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        {
          "shadow-[0_0_2px_1px_color-mix(in_oklch,var(--foreground),transparent_85%)_inset,0_0_10px_4px_color-mix(in_oklch,var(--foreground),transparent_90%)_inset,0_4px_16px_rgba(17,17,26,0.05),0_8px_24px_rgba(17,17,26,0.05),0_16px_56px_rgba(17,17,26,0.05),0_4px_16px_rgba(17,17,26,0.05)_inset,0_8px_24px_rgba(17,17,26,0.05)_inset,0_16px_56px_rgba(17,17,26,0.05)_inset] dark:shadow-[0_0_2px_1px_color-mix(in_oklch,var(--foreground),transparent_65%)_inset,0_0_10px_4px_color-mix(in_oklch,var(--foreground),transparent_85%)_inset,0_4px_16px_rgba(17,17,26,0.05),0_8px_24px_rgba(17,17,26,0.05),0_16px_56px_rgba(17,17,26,0.05),0_4px_16px_rgba(17,17,26,0.05)_inset,0_8px_24px_rgba(17,17,26,0.05)_inset,0_16px_56px_rgba(17,17,26,0.05)_inset]":
            supportsSvg,
          "backdrop-blur-xl backdrop-saturate-[1.8] backdrop-brightness-110 dark:backdrop-brightness-120 border border-foreground/20 bg-foreground/25 dark:bg-foreground/10 shadow-[inset_0_1px_0_0_oklch(var(--foreground)/0.4),inset_0_-1px_0_0_oklch(var(--foreground)/0.2)] dark:shadow-[inset_0_1px_0_0_oklch(var(--foreground)/0.2),inset_0_-1px_0_0_oklch(var(--foreground)/0.1)]":
            !supportsSvg && supportsBackdropFilter,
          "border border-foreground/30 dark:border-foreground/20 bg-foreground/40 dark:bg-background/40 shadow-[inset_0_1px_0_0_oklch(var(--foreground)/0.5),inset_0_-1px_0_0_oklch(var(--foreground)/0.3)] dark:shadow-[inset_0_1px_0_0_oklch(var(--foreground)/0.2),inset_0_-1px_0_0_oklch(var(--foreground)/0.1)]":
            !supportsSvg && !supportsBackdropFilter,
        },
        FOCUS_OUTLINE_CLASSES,
        className
      )}
      style={containerStyles}
    >
      <svg
        className="-z-10 absolute inset-0 size-full opacity-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
              href={displacementMapUri}
            />

            {/* RED channel */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + r}
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            {/* GREEN channel */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + g}
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            {/* BLUE channel */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + b}
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            {/* Blend channels */}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation={displace} />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}

function buildDisplacementImage(
  width: number,
  height: number,
  radius: number,
  border: number,
  lightness: number,
  alpha: number,
  blur: number,
  blend: string
): string {
  const uniqueId = `${width}-${height}-${Date.now()}`;
  const svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red-grad-${uniqueId}" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="red" />
        </linearGradient>
        <linearGradient id="blue-grad-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black" />
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${height}"
        rx="${radius}"
        fill="url(#red-grad-${uniqueId})"
      />
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${height}"
        rx="${radius}"
        fill="url(#blue-grad-${uniqueId})"
        style="mix-blend-mode: ${blend}"
      />
      <rect
        x="${border}"
        y="${border}"
        width="${width - border * 2}"
        height="${height - border * 2}"
        rx="${radius}"
        fill="hsl(0 0% ${lightness}% / ${alpha})"
        style="filter:blur(${blur}px)"
      />
    </svg>
  `.trim();

  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

function supportsSVGFilters(filterId: string) {
  const isWebkit =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  if (isWebkit || isFirefox) {
    return false;
  }

  const div = document.createElement("div");
  div.style.backdropFilter = `url(#${filterId})`;

  return div.style.backdropFilter !== "";
}
