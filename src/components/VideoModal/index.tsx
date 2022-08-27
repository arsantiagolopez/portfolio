import { FC, ReactNode, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { DetailedProject } from "../../types";

interface Props {
  Button: ReactNode;
  project: Partial<DetailedProject>;
}

const VideoModal: FC<Props> = ({ Button, project }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { label, mobileVideo, desktopVideo } = project;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const title = `${label} – ${mobileVideo ? "Mobile" : "Desktop"} Video Demo`;

  return (
    <>
      <button onClick={handleOpen}>{Button}</button>

      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`z-40 fixed inset-0 opacity-50 backdrop-blur-3xl bg-neutral-600 w-screen h-screen ${
          isOpen ? "block" : "hidden"
        }`}
      />

      {/* Close button */}
      {isOpen && (
        <button onClick={handleClose} className="z-50 fixed top-6 right-6">
          <IoCloseSharp className="text-white text-4xl hover:animate-pulse" />
        </button>
      )}

      {/* Modal */}
      <div
        className={`z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 flex flex-col bg-white text-primary ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {/* Video*/}
        <div className="w-full overflow-hidden relative h-0 pb-[56.25%]">
          <iframe
            src={mobileVideo || desktopVideo}
            // @ts-ignore
            frameBorder="0"
            allow="fullscreen; autoplay;"
            // @ts-ignore
            allowFullScreen="allowfullscreen"
            title={label}
            className="left-0 top-0 h-full w-full absolute"
          />
        </div>
      </div>
    </>
  );
};

export { VideoModal };
