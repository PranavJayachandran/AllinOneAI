import React, { useState } from "react";

export default function TextCompletion() {
  const [doneforme, setDoneforMe] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(0);

  const handleprompt = (e) => {
    setPrompt(e.target.value);
  };
  const dothisforme = () => {
    setLoading(1);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: prompt,
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
  return (
    <div className="pb-40">
      <div>
        <div className="text-center text-4xl text-white font-semibold mb-10">
          DO THIS FOR ME AI
        </div>
        <div className="flex justify-center">
          <input
            className="h-12 w-[900px] px-6 rounded-xl shadow-2xl"
            value={prompt}
            onChange={handleprompt}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-400 px-4 py-2 rounded-full text-xl text-white"
            onClick={dothisforme}
          >
            DO
          </button>
        </div>
        {loading ? (
          <div className="mt-4 ">
            <div className="loader"></div>
          </div>
        ) : doneforme.length > 0 ? (
          <div className="mt-10 flex justify-center bg-blue-400 mx-4 sm:mx-40 rounded-lg px-4 py-4 text-lg">
            <p dangerouslySetInnerHTML={{ __html: replaceWithBr() }} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
