import React, { FC, useRef, useState } from "react";
import { TechList } from "../TechList";

interface Props {
  tech: string[];
}

const Technologies: FC<Props> = ({ tech }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const wrapperRef = useRef(null);

  const onHover = () => setIsHovered(true);

  // Prevent hover on children to set hovered to false
  const onBlur: React.MouseEventHandler<HTMLDivElement> | undefined = (
    event
  ) => {
    event.stopPropagation();

    const { relatedTarget: hoveredNode } = event;
    // Unmount returns "window" object, prevent throw
    if (hoveredNode?.hasOwnProperty("window")) return setIsHovered(false);

    // @ts-ignore
    const hoveredOutsideOfWrapper = !wrapperRef?.current?.contains(hoveredNode);

    if (hoveredOutsideOfWrapper) {
      setIsHovered(false);
    }
  };

  const techListProps = { tech, isHovered };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      className="flex flex-col justify-center items-center w-screen bg-primary overflow-hidden min-h-[35vh] md:min-h-full h-full"
    >
      <p className="pt-[7vh] md:pt-[9vh] text-lg font-semibold text-white">
        Technologies used
      </p>
      <TechList {...techListProps} />
    </div>
  );
};

export { Technologies };
