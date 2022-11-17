import React from "react";

const Sorting = ({ onClickImage, onClickVideo, onChange, value }) => {
  return (
    <div
      className="flex flex-row justify-center items-center rounded-md bg-blue-600 h-full "
      style={{ width: "50rem" }}
    >
      <div onClick={onClickImage}>
        <h1
          className="cursor-pointer font-semibold text-black rounded-md font-xl"
          style={{ backgroundColor: "white", margin: "0 15px", padding: "4px" }}
        >
          Photos
        </h1>
      </div>
      <div onClick={onClickVideo}>
        <h1
          className="cursor-pointer font-semibold text-black rounded-md font-xl"
          style={{ backgroundColor: "white", margin: "0 25px", padding: "4px" }}
        >
          Videos
        </h1>
      </div>
      <div className="flex  rounded">
        <input
          type="text"
          value={value}
          className="block w-full p-2  border  "
          placeholder="Search..."
          style={{ backgroundColor: "white", padding: "5px", color: "black" }}
          onChange={onChange}
        />
        <button
          className=" text-white  border-l rounded  "
          style={{ backgroundColor: "black", padding: "5px" }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Sorting;
