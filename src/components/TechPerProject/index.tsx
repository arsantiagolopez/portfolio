import React, { FC, useEffect, useState } from "react";
import { detailedProjects as data } from "../../data";
import { DetailedProject } from "../../types";

interface Props {
  projects: string[];
}

interface ProjectWithSrc extends DetailedProject {
  src: string;
}

const TechPerProject: FC<Props> = ({ projects }) => {
  const [detailedProjects, setDetailedProjects] = useState<
    ProjectWithSrc[] | null
  >(null);
  const [projectsHash, setProjectsHash] = useState<
    Record<string, DetailedProject>
  >({});

  // Turn projects data into hashmap
  useEffect(() => {
    if (projects) {
      const hashmap = data.reduce(
        (map, record) => ({ ...map, [record.name]: record }),
        {}
      );
      setProjectsHash(hashmap);
    }
  }, [projects]);

  // Get image filenames from directory
  useEffect(() => {
    if (projects && Object.keys(projectsHash).length) {
      const projectRecords: ProjectWithSrc[] = projects.map((filename) => {
        const name = filename.split(".")[0];
        return { ...projectsHash[name], src: filename };
      });
      // Sort projects by id
      projectRecords.sort((a, b) => (b.id > a.id ? -1 : 1));
      setDetailedProjects(projectRecords);
    }
  }, [projects, projectsHash]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-lg text-primary font-semibold py-[7vh] md:pt-[9vh] pb-[7vh]">
        Tech per project basis
      </p>
      <div className="flex flex-col w-full pb-[10vh]">
        {detailedProjects?.map(
          ({
            name,
            label,
            height,
            href,
            github,
            description,
            frontend,
            backend,
            devops,
            src,
          }) => (
            <div key={name} className="flex flex-col w-full pb-[5vh]">
              <div className="flex flex-row justify-between items-center w-full min-h-[5vh]">
                <h1 className="font-times text-lg text-primary font-semibold">
                  {label}
                </h1>
                <img
                  src={`/projects/${src}`}
                  alt={label}
                  style={{ height }}
                  className="object-contain h-12 brightness-0 opacity-70"
                />
              </div>

              <div className="flex flex-col w-full md:w-[80%] py-[2vh] md:py-[1vh]">
                <p>{description}</p>
                <div className="py-3">
                  <p>
                    <b>Frontend:</b> {frontend.join(", ")}.
                  </p>
                  <p>
                    <b>Backend:</b> {backend.join(", ")}.
                  </p>
                  <p>
                    <b>DevOps:</b> {devops.join(", ")}.
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={`https://${href}`}
                  className="underline mr-3"
                  rel="noreferrer"
                  target="_blank"
                >
                  {href}
                </a>
                |
                <a
                  href={github}
                  className="underline ml-3"
                  rel="noreferrer"
                  target="_blank"
                >
                  See the code
                  {name === "flavors" && " (private)"}
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export { TechPerProject };
