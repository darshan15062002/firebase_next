import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebaseConfig";
import Navbar from "../src/componet/Navbar";
import ProgressBar from "../src/componet/ProgressBar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
export default function Home() {
  const [file, setFile] = useState(null);
  const [videofile, setVideoFile] = useState(null);

  const [error, setError] = useState(null);

  const [progress, setProgress] = useState(0);
  console.log(progress);

  const [url, setUrl] = useState(null);
  const [videourl, setVideoUrl] = useState(null);

  const types = ["image/png", "image/jpeg", "image/jpgs"];
  const videotype = ["video/mp4", "video/avi", "video/mkv", "video/mov"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setVideoFile(null);
      setError(null);

      const imageRef = ref(storage, `file/${selected.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          // setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUrl(downloadURL);
          });
        }
      );
      const setlink = async () => {
        const docRef = await addDoc(collection(db, "images"), {
          name: selected.name,
          createAt: serverTimestamp(),
          url: url,
        });
      };

      setlink();
    } else if (selected && videotype.includes(selected.type)) {
      setVideoFile(selected);
      setFile(null);

      setError(null);

      const videoRef = ref(storage, `video/${selected.name}`);
      const uploadTask = uploadBytesResumable(videoRef, videofile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          // setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setVideoUrl(downloadURL);
          });
        }
      );

      const setvideolink = async () => {
        const vRef = await addDoc(collection(db, "video"), {
          name: selected.name,
          createAt: serverTimestamp(),
          videourl: videourl,
        });
      };
      setvideolink();
    } else {
      setFile(null);
      setError("Please select valid file");
    }
  };
  return (
    <div className="bg-blue-100">
      <div>
        <div className="flex justify-center w-full h-10 bg-blue-600">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center h-screen   ">
          {(file || videofile) && (
            <div className="w-[22rem] mb-2">
              <ProgressBar
                setVideoFile={setVideoFile}
                setFile={setFile}
                url={url}
                videourl={videourl}
                progress={progress}
              />
            </div>
          )}
          <div className=" flex cursor-pointer items-center justify-center border-2 bg-white border-blue-500 p-7 ">
            <input onChange={handleChange} type="file" className="text-black" />
          </div>
          {(file || videofile) && (
            <div className="flex w-[23rem] justify-center mt-5 bg-blue-600">
              <h5 className="text-white font-semibold p-3">
                {videofile ? videofile.name : file.name}
              </h5>
            </div>
          )}

          {error && <div className="text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}
