import { Popover } from "@headlessui/react";
import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";

interface Props {
  children: ReactNode;
  label: string;
  width: number;
}

const Tooltip: FC<Props> = ({ children, label, width }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef();

  const handleEnter = () => setIsOpen(true);

  // Prevent ref's children from clearing hovered state
  const handleLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    const { relatedTarget: hoveredNode } = event;
    //@ts-ignore
    const hoveredNodeInsideRef = wrapperRef?.current?.contains(hoveredNode);
    if (!hoveredNodeInsideRef) {
      setIsOpen(false);
    }
  };

  return (
    <Popover
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ width: `${width * 0.6}px` }}
      className="h-full mx-4 md:mx-6"
    >
      <Popover.Button className="relative w-full h-full mx-10 md:mx-20">
        {children}
        {isOpen && (
          <Popover.Panel
            static
            className="z-50 absolute text-ellipsis text-center flex items-center justify-center bg-secondary text-white text-xs rounded-sm py-1 px-2 w-fit cursor-pointer top-[75%] left-[50%] -translate-x-[50%]"
          >
            {label}
          </Popover.Panel>
        )}
      </Popover.Button>
    </Popover>
  );
};

export { Tooltip };
