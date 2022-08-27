import React, { FC } from "react";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

interface Props {}

const Header: FC<Props> = () => (
  <div className="flex flex-col justify-center items-center w-full mt-[18vh] mb-[4vh] md:mb-2 font-times text-secondary">
    {/* <div className="h-[20vh]">
        <AnimatedAvatar />
      </div> */}

    <img
      src="/alex.png"
      alt={process.env.NEXT_PUBLIC_NAME}
      className="w-[150px] rounded-full my-[3vh]"
    />

    <p className="text-2xl font-semibold tracking-tight py-3 text-primary">
      {process.env.NEXT_PUBLIC_NAME}
    </p>
    <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
      <p className="hover:underline">{process.env.NEXT_PUBLIC_EMAIL}</p>
    </a>
    <p className="pt-3">{process.env.NEXT_PUBLIC_BIO}</p>

    <div className="flex flex-row justify-center items-center py-3">
      <a href={process.env.NEXT_PUBLIC_GITHUB} rel="noreferrer" target="_blank">
        <RiGithubFill className="text-2xl md:text-2xl ml-3 md:ml-1 cursor-pointer hover:text-primary" />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_INSTAGRAM}
        rel="noreferrer"
        target="_blank"
      >
        <RiInstagramFill className="text-2xl md:text-2xl mx-3 md:mx-2 cursor-pointer hover:text-primary" />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_LINKEDIN}
        rel="noreferrer"
        target="_blank"
      >
        <RiLinkedinBoxFill className="text-[1.7rem] cursor-pointer hover:text-primary" />
      </a>
    </div>
  </div>
);

export { Header };
