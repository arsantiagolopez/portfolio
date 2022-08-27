import React, { FC } from "react";
import { IoCall, IoMail } from "react-icons/io5";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

interface Props {}

const Footer: FC<Props> = () => {
  // American phone number format
  const formatPhone = (number: string) => {
    if (number) {
      const phone = Array.from(number);
      const last = phone.splice(-4);
      const middle = phone.splice(-3);
      const area = phone.splice(-3);
      const extension = phone;
      return `${extension} (${area}) ${middle}-${last}`.replace(/,/g, "");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center text-white w-full min-h-[40vh] md:min-h-[30vh] bg-primary font-times px-4 md:px-[26vw] py-[7vh]">
      <div className="flex flex-col items-center md:items-start w-full">
        <p className="text-2xl font-semibold pb-[2vh] italic">Get in touch</p>
        <a href={`sms:${process.env.NEXT_PUBLIC_PHONE}`}>
          <p className="flex flex-row items-center pt-2 hover:underline hover:text-gray-300">
            <IoCall className="text-lg mr-2" />
            {formatPhone(process.env.NEXT_PUBLIC_PHONE || "")}
          </p>
        </a>
        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          <p className="flex flex-row items-center pt-2 hover:underline hover:text-gray-300">
            <IoMail className="text-lg mr-2" />
            {process.env.NEXT_PUBLIC_EMAIL}
          </p>
        </a>
      </div>
      <div className="flex flex-col items-center md:items-start w-full">
        <p className="text-2xl font-semibold pb-[2vh] italic pt-[5vh] md:pt-0">
          Socials
        </p>
        <div className="flex flex-row items-center">
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM}
            rel="noreferrer"
            target="_blank"
          >
            <RiInstagramFill className="text-4xl hover:text-gray-400" />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_GITHUB}
            rel="noreferrer"
            target="_blank"
          >
            <RiGithubFill className="mx-2 text-4xl hover:text-gray-400" />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LINKEDIN}
            rel="noreferrer"
            target="_blank"
          >
            <RiLinkedinBoxFill className="text-[2.5rem] hover:text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { Footer };
