import Navbar from "@/components/navbar/Navbar";
import React from "react";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <main className="w-full min-h-screen items-center justify-center bg-shadow">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
