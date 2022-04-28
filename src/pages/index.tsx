import fs from "fs";
import type {
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import path from "path";
import React from "react";
import { Landing } from "../components/Landing";
import { Layout } from "../components/Layout";

interface Props {
  tech: InferGetServerSidePropsType<typeof getStaticProps>;
  projects: InferGetServerSidePropsType<typeof getStaticProps>;
}

const HomePage: NextPage<Props> = ({ tech, projects }) => {
  const landingProps = { tech, projects };
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Landing {...landingProps} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Get tech filenames
  const techDir = path.join(process.cwd(), "/public/tech");
  let files = fs.readdirSync(techDir);
  const tech = files.filter((file) => file[0] !== ".");

  // Get projects filenames
  const projectsDir = path.join(process.cwd(), "/public/projects");
  files = fs.readdirSync(projectsDir);
  const projects = files.filter((file) => file[0] !== ".");

  return {
    props: {
      tech,
      projects,
    },
  };
};

export default HomePage;
