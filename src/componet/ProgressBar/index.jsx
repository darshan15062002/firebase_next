import React, { useEffect } from "react";

const ProgressBar = ({ setFile, url, progress }) => {
  const removedDecimal = Math.trunc(progress);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div
      className="h-5  text-white font-semibold  bg-blue-600 tex"
      style={{ width: progress + "%", borderRadius: "4px " }}
    >
      {removedDecimal}%
    </div>
  );
};

export default ProgressBar;
