import React from "react";
import Loading from "@/components/global/loading";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loading className="w-16 h-16" />
    </div>
  );
};

export default LoadingPage;
