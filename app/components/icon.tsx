import type { ComponentProps } from "react";
import ArrowLeftIcon from "~/assets/icons/arrow-left.svg?react";
import ArrowRightIcon from "~/assets/icons/arrow-right.svg?react";
import XIcon from "~/assets/icons/x.svg?react";
import CopyIcon from "~/assets/icons/copy.svg?react";
import CheckIcon from "~/assets/icons/check.svg?react";
import VoiceIcon from "~/assets/icons/voice.svg?react";
import VideoIcon from "~/assets/icons/video.svg?react";
import PanelIcon from "~/assets/icons/panel.svg?react";
import AddIcon from "~/assets/icons/add.svg?react";
import ChatIcon from "~/assets/icons/chat.svg?react";

const icons = {
  "arrow-left": ArrowLeftIcon,
  "arrow-right": ArrowRightIcon,
  x: XIcon,
  copy: CopyIcon,
  check: CheckIcon,
  voice: VoiceIcon,
  video: VideoIcon,
  panel: PanelIcon,
  add: AddIcon,
  chat: ChatIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 24,
  ...props
}: ComponentProps<"svg"> & {
  name: IconName;
  size?: number;
}) {
  const IconComponent = icons[name];
  return <IconComponent width={size} height={size} {...props} />;
}
