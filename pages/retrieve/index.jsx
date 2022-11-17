import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { db, storage } from "../../firebaseConfig";
import Navbar from "../../src/componet/Navbar";
import Sorting from "../../src/componet/Sorting";
import { collection, getDocs, query, where } from "firebase/firestore";
const retrieve = () => {
  const [filelist, setFileList] = useState([]);
  const [videolist, setVideoList] = useState([]);
  const [filename, setFileName] = useState([]);
  const [videoname, setVideoName] = useState([]);
  const [search, setSearch] = useState();
  console.log("====================================");
  console.log(search);
  console.log("====================================");

  const [si, setSI] = useState(true);
  const [sv, setSV] = useState(false);

  const filelistref = ref(storage, "file/");
  const videolistref = ref(storage, "video/");
  const showimage = () => {
    setSI(true);
    setSV(false);
  };
  const showvideo = () => {
    setSV(true);
    setSI(false);
  };

  //right click
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    listAll(filelistref).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((current) => [...current, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    listAll(videolistref).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoList((current) => [...current, url]);
        });
      });
    });
  }, []);
  const withoutDuplicatesimage = [...new Set(filelist)];
  const withoutDuplicatesvideo = [...new Set(videolist)];

  useEffect(() => {
    const imagedoc = async () => {
      const q = query(
        collection(db, "images"),
        where("url", "not-in", ["null"])
      );
      const querySnapshot = await getDocs(q);

      let document = [];
      querySnapshot.forEach((doc) => {
        document.push({ ...doc.data(), id: doc.id });
      });
      console.log(document);
      setFileName(document);
    };

    return () => imagedoc();
  }, []);
  useEffect(() => {
    const videodoc = async () => {
      const q = query(
        collection(db, "video"),
        where("videourl", "not-in", ["null"])
      );
      const querySnapshot = await getDocs(q);
      let document = [];
      querySnapshot.forEach((doc) => {
        document.push({ ...doc.data(), id: doc.id });
        // console.log(doc.data());
      });

      setVideoName(document);
    };
    return () => videodoc();
  }, []);

  console.log(filename);

  // console.log(videoname);
  return (
    <div className="flex flex-col justify-center overflow-hidden bg-blue-100">
      <div className="flex justify-center w-full h-10 bg-blue-600">
        <Navbar />
      </div>
      <div className=" flex justify-center w-full mt-3 h-14 ">
        <Sorting
          onClickImage={showimage}
          onClickVideo={showvideo}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {si && (
        <div className="flex flex-wrap w-screen gap-3  m-5 ">
          {filename.map((doc) => {
            return (
              <div className="w-[12.5rem] h-64 mb-5 bg-white  border border-black rounded-md hover:scale-[1.09] duration-300">
                <img
                  key={doc.id}
                  className="w-[12.5rem] h-48  "
                  src={doc.url}
                  onError={(event) => (event.target.style.display = "none")}
                />
                <h1 className="text-black  pt-1">{doc.name}</h1>
                {/* <p className="text-black  pt-1">{doc.createAt.seconds}</p> */}
              </div>
            );
          })}
        </div>
      )}
      {sv && (
        <div className="flex flex-wrap w-screen gap-5 m-5 ">
          {videoname.map((doc) => {
            return (
              <div className="w-[320px] h-60  bg-white border border-black rounded-md hover:scale-[1.09] duration-300">
                <video
                  key={doc.id}
                  className=" h-52 "
                  src={doc.videourl}
                  onError={(event) => (event.target.style.display = "none")}
                  width="320"
                  height="240"
                  controls
                />
                <h4 className="text-black   pt-1">{doc.name}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default retrieve;
