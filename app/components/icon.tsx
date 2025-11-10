import LeftArrowIcon from "~/assets/icons/left-arrow.svg?react";
import RightArrowIcon from "~/assets/icons/right-arrow.svg?react";
import XIcon from "~/assets/icons/x.svg?react";
import CopyIcon from "~/assets/icons/copy.svg?react";
import CheckIcon from "~/assets/icons/check.svg?react";
import VoiceIcon from "~/assets/icons/voice.svg?react";
import VideoIcon from "~/assets/icons/video.svg?react";

const icons = {
  "left-arrow": LeftArrowIcon,
  "right-arrow": RightArrowIcon,
  x: XIcon,
  copy: CopyIcon,
  check: CheckIcon,
  voice: VoiceIcon,
  video: VideoIcon,
} as const;

export function Icon({
  name,
  size = 24,
  className = "",
}: {
  name: keyof typeof icons;
  size?: number;
  className?: string;
}) {
  const IconComponent = icons[name];
  return <IconComponent width={size} height={size} className={className} />;
}
