import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col scroll-smooth overflow-y-auto relative">
      <Header />
      <main className="w-full flex-1">

      {children}
      </main>
      <Footer/>
    </div>
  );
};

export default layout;
