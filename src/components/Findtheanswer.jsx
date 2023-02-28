import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import text from "../text.png";

export default function Findtheanswer() {
  const [doneforme, setDoneforMe] = useState("");
  const [text, setText] = useState("");
  const [loadingText, setLoadingText] = useState(0);
  const [loading, setLoading] = useState(0);
  const extractText = (file) => {
    setLoadingText(1);
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setLoadingText(0);
      dothisforme(text);
      setText(text);
    });
  };
  const dothisforme = (text) => {
    setLoading(1);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt:
        "Extract questions from the given text. Write answers in about 200 words in a numbered manner. Also display the question before each answer. Append  \n  after each answer Go to the next line if number of words in the line exceeds 15." +
        text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/complete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(0);
        setDoneforMe(result.choices[0].text);
        console.log(result.choices[0].text.split(" "));
      })
      .catch((error) => console.log("error", error));
  };
  function replaceWithBr() {
    return doneforme.replace(/\n/g, "<br />");
  }
  useEffect(() => {}, []);
  const acceptfile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    extractText(e.target.files[0]);
  };

  return (
    <div className="pb-40">
      <div className="text-center text-white">
        <div className="text-4xl font-semibold mb-10">
          GET THE ANSWERS FOR ME
        </div>
        <div className="flex justify-center text-center sm:pl-[0px] pl-10">
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
            <div className="text-xl sm:text-lg text-left my-10 mx-4 sm:mx-40 bg-blue-400 text-black rounded px-8 py-4 ">
              <p dangerouslySetInnerHTML={{ __html: replaceWithBr() }} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
