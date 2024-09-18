import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { DefaultLayoutProps } from "./types";

export const DefaultLayout = ({ children }: DefaultLayoutProps.Default) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
