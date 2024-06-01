import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen scroll-smooth">
      <Header />
      <main>

      {children}
      </main>
      <Footer/>
    </div>
  );
};

export default layout;
