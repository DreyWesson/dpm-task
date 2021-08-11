import React from "react";
import "./App.css";
import useRecorder from "./hooks/useRecorder";

const App = () => {
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const handleSubmit = () =>
    audioURL && console.log(`Send ${audioURL} to the database`);
  return (
    <div className="microphone__wrapper">
      <audio src={audioURL} controls />
      <div className="">
        <div>
          <label htmlFor="email" className={"microphone__label"}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="microphone__input"
          />
        </div>
        {isRecording ? (
          <button className="btn btn__stop" onClick={stopRecording}>
            Stop recording
          </button>
        ) : (
          <button
            className="btn"
            onClick={startRecording}
            disabled={isRecording}
          >
            Start recording
          </button>
        )}

        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default App;
