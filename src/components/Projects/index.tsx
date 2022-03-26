import React from "react";
import { projects } from "../../data";

const Projects = () => (
  <div className="flex flex-col w-full items-center">
    <p className="pt-[5vh] text-lg font-semibold text-primary">
      Some of my recent projects
    </p>

    <div className="flex flex-col md:flex-row justify-center items-center w-screen px-[10vw] py-[5vh] md:py-[7vh] md:pt-[5vh]">
      {projects.map(({ name, alt, href }) => (
        <a
          key={name}
          href={href}
          rel="noreferrer"
          target="_blank"
          className={`brightness-0 opacity-20 hover:brightness-100 hover:opacity-100`}
        >
          <img
            src={`/projects/${name}.png`}
            alt={alt}
            className={`object-contain h-9 md:mx-8 my-6 md:my-5 ${
              name === "flavors"
                ? "py-1.5 md:py-2"
                : name === "instaccounts"
                ? "py-0.5"
                : name === "preppy"
                ? "md:h-10 md:-mt-[0.25px]"
                : name === "auth"
                ? "py-1"
                : "py-0"
            }`}
          />
        </a>
      ))}
    </div>
  </div>
);

export { Projects };
