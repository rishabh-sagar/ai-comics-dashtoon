import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import "./style.css";

const dummyImageSrcs = [
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
  "/mr-bean-waiting.gif",
];

const ImagePanel = () => {
  const [imageSrcs, setImageSrcs] = useState(dummyImageSrcs);
  const [searchQueries, setSearchQueries] = useState(Array(10).fill(""));
  const [speechBoxes, setSpeechBoxes] = useState(Array(10).fill([]));
  const location = useLocation();

  useEffect(() => {
    const data = location.state;
    if (data) {
      setSearchQueries(data);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchQueries[0] !== "") {
      handleSearch();
    }
  }, [searchQueries]);


  const handleDownload = async () => {
    // if (!canvasRef) return;
  
    const divToCapture = document.getElementById("divToCapture");
  
    if (!divToCapture) return;
  
    try {
      const canvas = await html2canvas(divToCapture);
  
      // Convert canvas content to an image and trigger download
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "Your-Comic.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Error capturing snapshot:", error);
    }
  };


  const handleSearch = async () => {
    try {
      const newImagePromises = searchQueries.map(async (query, index) => {
        try {
          const response = await axios.post(
            process.env.REACT_APP_API_URL,
            {
              inputs: query,
            },
            {
              headers: {
                Accept: "image/png",
                Authorization:process.env.REACT_APP_API_TOKEN,
                "Content-Type": "application/json",
              },
              responseType: "blob",
            }
          );

          const imageUrl = URL.createObjectURL(new Blob([response.data]));
          setImageSrcs((prevImageSrcs) => {
            const updatedImages = [...prevImageSrcs];
            updatedImages[index] = imageUrl;
            return updatedImages;
          });
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      });

      await Promise.all(newImagePromises);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const addSpeechBox = (index) => {
    const newSpeechBox = {
      id: Math.random(),
      position: { x: 0, y: 0 },
    };

    const updatedSpeechBoxes = [...speechBoxes];
    updatedSpeechBoxes[index] = [...updatedSpeechBoxes[index], newSpeechBox];

    setSpeechBoxes(updatedSpeechBoxes);
  };

  return (
    <div className="bg-[#191919] text-white">
      <h1 className="text-[80px] font-bold mx-auto text-center font-comic">
        Your AI Generated Comics
      </h1>
      <div className="text-right mr-[15vw] mb-4">
      <button onClick={handleDownload} className="mt-4 bg-[#ddd] border-2 text-right hover:scale-[1.05] transition-all text-black px-4 py-2 rounded">
      Share/Download
    </button>
      </div>
      <div id="divToCapture" className="flex flex-wrap justify-center bg-[#191919]">
        {imageSrcs.length > 0 &&
          imageSrcs.map((src, index) => (
            <div className="relative" key={index}>
              <div className="box022 box22 m-1">
                <div className="evenboxinner absolute text-black font-comic w-fit">
                  Panel {index + 1}
                </div>
                <img
                  src={src}
                  alt={`Searched Image ${index + 1}`}
                  className="w-fit h-fit p-2 rounded-2xl"
                />
                <button
                  className="absolute top-0 right-0 bg-[#ddd] text-black border-2 border-black px-2 py-1 rounded"
                  onClick={() => addSpeechBox(index)}
                >
                  Add Speech Box
                </button>
              </div>
              {speechBoxes[index] &&
                speechBoxes[index].map((box) => (
                  <Draggable
                  cancel=".just-name"
                    key={box.id}
                    defaultPosition={box.position}
                    onStop={(e, data) => {
                      const updatedBoxes = [...speechBoxes];
                      updatedBoxes[index] = updatedBoxes[index].map((b) =>
                        b.id === box.id ? { ...b, position: { x: data.x, y: data.y } } : b
                      );
                      setSpeechBoxes(updatedBoxes);
                    }}
                  >
                    <div className="absolute w-full">
                      {/* Your draggable component */}
                      <img className="absolute w-fit" src="/a.svg" />
                      <input className="text-black absolute mt-5 ml-3 w-[80px] just-name" />
                    </div>
                  </Draggable>
                ))}
            </div>
          ))}
      </div>
      <div>
        Project Created By
        <span className="text-yellow-400"> Rishabh Sagar</span> for Dashtoon{" "}
        <span className="text-yellow-400">
          (19084019 - Electrical Engineering IDD)
        </span>
      </div>
    </div>
  );
};

export default ImagePanel;
