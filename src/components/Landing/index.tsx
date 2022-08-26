import React, { FC } from "react";
import { Projects } from "../Projects";
import { Technologies } from "../Technologies";
import { TechPerProject } from "../TechPerProject";

interface Props {
  tech: string[];
  projects: string[];
}

const Landing: FC<Props> = ({ tech, projects }) => {
  const techProps = { tech };
  const projectsProps = { projects };
  return (
    <div className="flex flex-col justify-center items-center w-full font-times text-secondary">
      <p className="pt-4 md:pt-5 pb-3 font-semibold text-primary text-lg">
        About me
      </p>
      <p>
        I&apos;m a full stack TypeScript developer with an eye for design. My
        current favorite technologies are: React.js, TypeScript, Node.js and
        PostgreSQL. I love innovation and picked up my current tech stack to
        take advantage of the newest and best in the web.
      </p>
      <Projects />
      <Technologies {...techProps} />
      <TechPerProject {...projectsProps} />
    </div>
  );
};

export { Landing };
