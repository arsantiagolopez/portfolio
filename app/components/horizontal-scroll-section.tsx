import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTriggerPlugin from "gsap/ScrollTrigger";
import { cn } from "~/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTriggerPlugin);
}

export function HorizontalScrollSection({
  slides,
  className = "",
  contentAbove,
  contentBelow,
}: {
  slides: React.ReactNode[];
  className?: string;
  contentAbove?: React.ReactNode;
  contentBelow?: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const horizontal = horizontalRef.current;

    if (!wrapper || !horizontal) return;

    const ctx = gsap.context(() => {
      const scrollWidth = horizontal.scrollWidth - window.innerWidth + 40; // 20 padding on each side

      gsap.to(horizontal, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "15% top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });
    }, wrapper);

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {contentAbove}
      <section className={cn("h-[70dvh] overflow-hidden", className)}>
        <div
          ref={horizontalRef}
          className="flex h-full items-center gap-4 will-change-transform"
        >
          <div className="shrink-0 w-5" />
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-full shrink-0 aspect-video rounded-4xl"
            >
              {slide}
            </div>
          ))}
          <div className="shrink-0 w-10" />
        </div>
      </section>
      {contentBelow}
    </div>
  );
}
