import React from "react";
import Header from "./_components/header";

const HomeLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Header />
        {children}
      </div>
    </>
  );
};

export default HomeLayOut;
