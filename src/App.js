import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [audioFiles, setAudioFiles] = useState([]);

  const currentlyPlayingRef = useRef(null);

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files);
    setAudioFiles([...audioFiles, ...newFiles]);

    for (const file of newFiles) {
      const formData = new FormData();
      //audio file
      formData.append("audioFile", file);
      //appending the metadata
      const metadata = {
        originalName: file.name,
        type: file.type,
        size: file.size,
      };
      formData.append("metadata", JSON.stringify(metadata));

      try {
        await axios.post("http://localhost:3001/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded successfully.");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handlePlay = (file) => {
    if (currentlyPlayingRef.current) {
      currentlyPlayingRef.current.pause();
    }
    const audio = new Audio(URL.createObjectURL(file));
    audio.play();
    currentlyPlayingRef.current = audio;
  };

  const handleStop = () => {
    if (currentlyPlayingRef.current) {
      currentlyPlayingRef.current.pause();
      currentlyPlayingRef.current.currentTime = 0;
    }
  };

  return (
    <div className="App">
      <h1>Audio Uploader</h1>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
      />
      {audioFiles.length > 0 && (
        <div className="table-container">
          <h2>Uploaded Files:</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {audioFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>
                    <button onClick={() => handlePlay(file)}>Play</button>
                    <button onClick={handleStop}>Stop</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
