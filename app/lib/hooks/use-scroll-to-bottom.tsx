import { useEffect, useRef, useState } from "react";

export function useScrollToBottom() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = (behavior: ScrollBehavior = "instant") => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  const enableAutoScroll = () => {
    shouldAutoScrollRef.current = true;
    scrollToBottom("instant");
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkIfAtBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1;
      return isBottom;
    };

    const handleScroll = () => {
      const atBottom = checkIfAtBottom();
      setIsAtBottom(atBottom);
      shouldAutoScrollRef.current = atBottom;
    };

    const mutationObserver = new MutationObserver(() => {
      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => scrollToBottom("instant"));
      }
    });

    container.addEventListener("scroll", handleScroll);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      mutationObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    isAtBottom,
    scrollToBottom,
    enableAutoScroll,
  };
}
