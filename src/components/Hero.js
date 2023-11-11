import { useState, useRef, useEffect } from "react";
import VideoPlayer from "./Videoplayer";
import WaveSurfer from "wavesurfer.js";
import VideoMetaData from "./VideoMetadata";

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const wavesurferRef = useRef(null);
  const videoPlayerRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    cleanupWaveform();

    if (file) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      if (!audioContext) {
        console.error("Web Audio API is not supported in this browser");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/") && file.type.includes("audio")) {
          const audioBuffer = audioContext.createBuffer(1, 1, 22050);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);

          source.onended = () => {
            try {
              console.log("Video has audio");
              initializeWaveform(file);
            } catch (error) {
              console.error("Error decoding audio data:", error);
            }
          };

          source.start();
        } else {
          alert("The selected file does not contain audio.");
          setSelectedFile(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initializeWaveform = (file) => {
    wavesurferRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#808080",
      progressColor: "#6419E6",
      height: 50,
    });

    wavesurferRef.current.load(URL.createObjectURL(file));
  };

  const cleanupWaveform = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupWaveform();
    };
  }, []);

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background: selectedFile
          ? undefined
          : "url('https://t4.ftcdn.net/jpg/02/07/15/43/240_F_207154340_wLIJus4m3SBl5sAQmpqN3Um7REnUhskU.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center">
        {!selectedFile && (
          <div className="w-full sm:max-w-xs mt-1 translate-y-80 transform hover:scale-x-110 transition-transform duration-300">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2"
              onChange={handleFileChange}
            />
          </div>
        )}
        {selectedFile && (
          <div className="w-full sm:max-w-xs mt-2 transform hover:scale-110 transition-transform duration-300">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      <div className="hero translate-y-36">
        <div className="hero-content text-center ">
          {!selectedFile && (
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white">Hello there</h1>
              <p className="py-4 text-white">
                Please provide a video file to get started
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow">
        {selectedFile && (
          <>
            <VideoPlayer
              videoFile={URL.createObjectURL(selectedFile)}
              ref={videoPlayerRef}
            />
            <VideoMetaData selectedFile={selectedFile} />
          </>
        )}
      </div>
      {selectedFile && (
        <div id="waveform" className="fixed bottom-10 w-full h-10"></div>
      )}
    </div>
  );
};

export default Hero;
