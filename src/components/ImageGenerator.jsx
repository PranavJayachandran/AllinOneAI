import React, { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [imagedata, setImageData] = useState([]);

  const [loading_images, setLoadingImages] = useState(0);

  const getPictures = () => {
    setLoadingImages(1);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: prompt,
      n: number,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoadingImages(0);
        setImageData(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handle_prompt_change = (e) => {
    setPrompt(e.target.value);
  };
  const handle_prompt_number = (e) => {
    setNumber(e.target.value);
  };
  return (
    <div className="pb-40 pt-20">
      <div className="text-white text-center px-36 text-4xl font-semibold">
        IMAGE GENERATOR
      </div>
      <div className="flex flex-col gap-10 items-center justify-center mt-10">
        <div>
          <label className="mr-4 text-white text-2xl">Prompt:</label>
          <input
            className="h-12 w-[900px] px-6 rounded-xl shadow-2xl"
            value={prompt}
            onChange={handle_prompt_change}
          />
        </div>
        <div className="">
          <label className="mr-4 text-white text-2xl">
            How many pictures do you want? (1 -10)
          </label>
          <input
            className="h-12 w-[400px] px-6 rounded-xl shadow-2xl"
            type="number"
            value={number}
            onChange={handle_prompt_number}
            min="1"
            max="10"
          />
        </div>
        <button
          className="bg-blue-400 px-6 py-2 rounded-full text-xl"
          onClick={getPictures}
        >
          GET
        </button>
        {loading_images ? (
          <div className="loader"></div>
        ) : imagedata.length > 0 ? (
          <div className="image-bg px-10 mx-10 py-8 rounded-xl bg-white flex flex-wrap gap-10 justify-center">
            {imagedata.map((item, index) => (
              <div className="bg-white p-1 rounded-xl">
                <img src={item.url} className="h-40 w-40" />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
