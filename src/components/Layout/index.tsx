import React, { FC, ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <div className="flex flex-col justify-center mx-8 md:mx-[26vw]">
      <main>{children}</main>
    </div>
    <Footer />
  </>
);

export { Layout };
