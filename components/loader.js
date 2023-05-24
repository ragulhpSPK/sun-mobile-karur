import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  console.log(isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loader">
      <span className="text-center text-black">Loading...</span>
    </div>
  );
};

export default Loader;
