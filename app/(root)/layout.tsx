import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <main className="w-full min-h-screen items-center justify-center bg-secondary-100">
      <Navbar />
      <div className="flex w-full h-full min-h-screen">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
