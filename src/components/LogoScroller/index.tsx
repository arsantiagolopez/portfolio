import React, { FC, ReactNode } from "react";

interface Props {
  logos: ReactNode;
  isHovered: boolean;
  reverse: boolean;
}

const LogoScroller: FC<Props> = ({ logos, isHovered, reverse }) => (
  <div className="flex flex-col whitespace-nowrap my-[3vh] md:my-[4vh]">
    {/* Mobile only */}
    <div className="flex md:hidden">
      <div
        className="flex flex-row items-center min-w-full w-full"
        style={{
          animation: `${reverse ? "right" : "left"} 100s linear infinite`,
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {logos}
      </div>
    </div>

    {/* Desktop only */}
    <div className="hidden md:flex h-24">
      <div
        className="flex flex-row items-center min-w-full w-full h-full"
        style={{
          animation: `${reverse ? "right" : "left"} 100s linear infinite`,
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {logos}
        {logos}
        {logos}
      </div>
    </div>
  </div>
);

export { LogoScroller };
