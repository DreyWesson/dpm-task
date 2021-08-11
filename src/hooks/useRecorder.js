import { useEffect, useState } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // If user has not recorded then record.
    if (recorder === null) {
      if (isRecording) requestRecorder().then(setRecorder, console.error);
      return;
    }

    // handle recorder state.
    isRecording ? recorder.start() : recorder.stop();

    // Obtain the audio when ready. and make it into blob to send to database
    const handleData = (e) => setAudioURL(URL.createObjectURL(e.data));

    recorder.addEventListener("dataavailable", handleData);

    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => setIsRecording(true);

  const stopRecording = () => setIsRecording(false);

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
