import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import text from "../text.png";

export default function ImageToText() {
  const [text, setText] = useState("");
  const [loadingText, setLoadingText] = useState(0);
  const extractText = (file) => {
    setLoadingText(1);
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setLoadingText(0);
      setText(text);
    });
  };
  useEffect(() => {}, []);
  const acceptfile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    extractText(e.target.files[0]);
  };

  return (
    <div className="pb-40">
      <div className="text-center text-white">
        <div className="text-4xl font-semibold mb-10">GET TEXT FROM IMAGE</div>
        <div className="flex justify-center">
          <label for=" recognition-image-input">Choose image</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            id="recognition-image-input"
            onChange={acceptfile}
          />
        </div>
        <div>
          <div id="recognition-text"></div>
          <div id="recognition-images">
            <div id="original-image"></div>
            <div id="labeled-image"></div>
          </div>
          {loadingText ? (
            <div className="mt-4">
              <div className="loader"></div>
            </div>
          ) : text.length > 0 ? (
            <div className="my-10 mx-40 bg-white text-black rounded px-8 py-4 ">
              {text}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
