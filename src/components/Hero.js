import { useState, useEffect } from "react";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/")) {
          console.log("File is a video");
        } else {
          alert("The selected file is not a video.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary w-full sm:max-w-xs mt-8"
        onChange={handleFileChange}
      />
    </div>
  );
};
export default Hero;
