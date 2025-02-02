import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <ClipLoader size={50} color="#36d7b7" />
    </div>
  );
};

export default LoadingSpinner;
