import { message as msg } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const audioRef = React.createRef();
  const [audioFiles, setAudioFiles] = useState([]);
  const [audioFilesUrl, setAudioFilesUrl] = useState([]);
  const [activeAudioUrl, setActiveAudioUrl] = useState(null);

  const changeAudioHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const prevImages = [...audioFilesUrl];
        if (
          !prevImages.some(
            (image) =>
              image.originalName === file.name &&
              image.mimeType === file.type &&
              image.size === file.size
          )
        ) {
          prevImages.push({
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            url: reader.result,
          });
        } else {
          alert("Already Uploaded");
        }

        setAudioFilesUrl(prevImages);
        setAudioFiles([...audioFiles, file]);
      };
    }
  };

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    audioFiles.forEach((item) => {
      formData.append("file", item);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      const { success, message } = response.data;

      if (success) {
        msg.success(message);
      } else {
        msg.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = (file) => {
    if (activeAudioUrl === file.url) {
      audioRef.current.pause();
      setActiveAudioUrl(null);
    } else {
      audioRef.current.src = file.url;
      audioRef.current.play();
      setActiveAudioUrl(file.url);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    setActiveAudioUrl(null);
  };

  const getAudios = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files`);
      setAudioFilesUrl(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAudios();
  }, []);

  return (
    <div className="App">
      <h1>Audio Uploader</h1>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={changeAudioHandler}
      />
      <button onClick={handleFileUpload}>Submit</button>
      {audioFilesUrl.length > 0 && (
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
              {audioFilesUrl.map((file, index) => (
                <tr key={index}>
                  <td>{file.originalName}</td>
                  <td>{file.mimeType}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>
                    <audio ref={audioRef} src={file.url} />
                    <button onClick={() => handlePlay(file)}>
                      {activeAudioUrl === file.url ? "Pause" : "Play"}
                    </button>
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
