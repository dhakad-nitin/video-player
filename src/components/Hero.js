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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/")) {
          // Check if the video has audio
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const audioBuffer = audioContext.createBuffer(1, 1, 22050);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();

          source.onended = () => {
            // If onended is called, the video has audio
            console.log("Video has audio");
            initializeWaveform(file);
          };
        } else {
          alert("The selected file is not a video.");
          setSelectedFile(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initializeWaveform = (file) => {
    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#808080",
      progressColor: "#6419E6",
      height: 50,
    });

    // Load audio file into WaveSurfer
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
    <div className="flex flex-col h-screen">
      <div className="flex justify-center">
        {!selectedFile && (
          <div className="w-full sm:max-w-xs mt-1 translate-y-80">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2"
              onChange={handleFileChange}
            />
          </div>
        )}
        {selectedFile && (
          <div className="w-full sm:max-w-xs mt-2">
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
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-4">Please provide a video file to get started</p>
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
