import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [audioFiles, setAudioFiles] = useState([]);
  const currentlyPlayingRef = useRef(null);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setAudioFiles([...audioFiles, ...newFiles]);
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
