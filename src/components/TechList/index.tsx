import React, { FC, useEffect, useState } from "react";
import { tech as data } from "../../data";
import { Tech } from "../../types";
import { LogoScroller } from "../LogoScroller";
import { Tooltip } from "../Tooltip";

interface Props {
  tech: string[];
  isHovered: boolean;
}

interface TechWithSrc extends Tech {
  src: string;
}

const TechList: FC<Props> = ({ tech, isHovered }) => {
  const [techHash, setTechHash] = useState<Record<string, Tech>>({});
  const [rows, setRows] = useState<
    [TechWithSrc[], TechWithSrc[], TechWithSrc[]] | null
  >(null);

  // Turn tech data into hashmap
  useEffect(() => {
    if (tech) {
      const hashmap = data.reduce(
        (map, record) => ({ ...map, [record.name]: record }),
        {}
      );
      setTechHash(hashmap);
    }
  }, [tech]);

  // Split tech into three rows of equal size
  useEffect(() => {
    if (tech && Object.keys(techHash).length) {
      const techRecords: TechWithSrc[] = tech.map((filename) => {
        const name = filename.split(".")[0];
        const record = { ...techHash[name], src: filename };
        return record;
      });

      const thirdIndex = Math.floor(techRecords.length / 3);
      const firstRow = techRecords.splice(0, thirdIndex);
      const secondRow = techRecords.splice(0, thirdIndex);
      const thirdRow = techRecords; // Remaining tech

      setRows([firstRow, secondRow, thirdRow]);
    }
  }, [tech, techHash]);

  return (
    <div className="flex flex-col my-[5vh] md:my-[6vh] min-h-full h-full w-full font-times">
      {rows &&
        rows.map((row, index) => {
          const list = row.map(({ name, width, label, src }) => (
            <Tooltip key={name} label={label} width={width}>
              <img
                src={`/tech/${src}`}
                alt={name}
                loading="lazy"
                className="brightness-100 invert max-w-full"
              />
            </Tooltip>
          ));

          return (
            <LogoScroller
              key={index}
              reverse={index % 2 === 1 ? true : false}
              logos={list}
              isHovered={isHovered}
            />
          );
        })}
    </div>
  );
};

export { TechList };
