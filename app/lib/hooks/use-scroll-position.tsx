import { useState, useRef, useEffect, useCallback } from "react";

export function useScrollPosition() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "instant") => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  const scrollToTop = useCallback((behavior: ScrollBehavior = "instant") => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkIfAtBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1;
      return isBottom;
    };

    const checkIfAtTop = () => {
      const { scrollTop } = container;
      return scrollTop === 0;
    };

    const handleScroll = () => {
      const atBottom = checkIfAtBottom();
      const atTop = checkIfAtTop();
      setIsAtBottom(atBottom);
      setIsAtTop(atTop);
      shouldAutoScrollRef.current = atBottom;
    };

    const mutationObserver = new MutationObserver(() => {
      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => {
          scrollToBottom("instant");
          handleScroll();
        });
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
  }, [scrollToBottom]);

  return {
    containerRef,
    isAtBottom,
    isAtTop,
    scrollToBottom,
    scrollToTop,
  };
}
