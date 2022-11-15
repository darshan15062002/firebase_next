import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { storage } from "../../firebaseConfig";
import Navbar from "../../src/componet/Navbar";
const retrieve = () => {
  const [filelist, setFileList] = useState([]);
  const filelistref = ref(storage, "file/");

  useEffect(() => {
    listAll(filelistref).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
          setFileList((current) => [...current, url]);
        });
      });
    });
  }, []);
  // console.log(filelist);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-full h-10 bg-blue-600">
        <Navbar />
      </div>

      <div className="flex w-screen gap-5 mt-5 ">
        {filelist.map((url) => {
          return (
            <div>
              <img className="w-52" src={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default retrieve;
