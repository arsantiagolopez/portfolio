import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export function HorizontalScrollSection({
  slides,
  className = "",
  contentAbove,
  contentBelow,
}: {
  slides: ReactNode[];
  className?: string;
  contentAbove?: ReactNode;
  contentBelow?: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current || !horizontalRef.current) return;

    let isMounted = true;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!isMounted || !wrapperRef.current || !horizontalRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const scrollWidth =
            horizontalRef.current!.scrollWidth - window.innerWidth + 40;

          gsap.to(horizontalRef.current, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "15% top",
              end: () => `+=${scrollWidth}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
            },
          });
        }, wrapperRef.current);

        return () => {
          if (!isMounted) ctx.revert();
        };
      }
    );

    return () => {
      isMounted = false;
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
