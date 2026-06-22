import { useEffect, useRef, useState } from "react";

function InterviewRecorder({onAnswerRecorded}) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Camera permission denied.");
      }
    };

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let text = "";

        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript + " ";
        }

        setTranscript(text);
      };

      recognitionRef.current = recognition;
    }else{
      setError("Speech Recognition is not supported in this browser");
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!stream) return;

    setTranscript("");

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.start();
    recognitionRef.current?.start();
    setRecording(true);
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    recorder.stop();
    recognitionRef.current?.stop();
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      const videoURL = URL.createObjectURL(blob);

      setRecordedVideo(videoURL);
      
      if(onAnswerRecorded){
        onAnswerRecorded(transcript);
      }
      setRecording(false);
    };
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "600px",
          height: "400px",
          border: "2px solid black",
          borderRadius: "10px",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={startRecording} disabled={recording}>
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          disabled={!recording}
          style={{ marginLeft: "10px" }}
        >
          Stop Recording
        </button>
      </div>
      {recordedVideo && (
        <div style={{ marginTop: "30px" }}>
          <h3>Recorded Answer</h3>

          <video
            src={recordedVideo}
            controls
            style={{
              width: "600px",
              border: "2px solid green",
            }}
          />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Your Answer</h3>

        <textarea
          rows={8}
          value={transcript}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>
    </div>
  );
}

export default InterviewRecorder;
