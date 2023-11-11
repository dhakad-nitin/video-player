import React, { useState, useEffect } from "react";

const VideoMetaData = ({ selectedFile }) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchVideoMetadata = async () => {
      if (selectedFile) {
        try {
          const videoMetadata = {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            lastModified: selectedFile.lastModified,
          };

          setMetadata(videoMetadata);
        } catch (error) {
          console.error("Error fetching video metadata:", error);
        }
      }
    };

    fetchVideoMetadata();
  }, [selectedFile]);

  return (
    <div className="fixed right-24 top-64 h-screen w-1/4 p-4">
      {metadata && (
        <div className="metadata-container border rounded p-4 -200">
          <div className="mt-4">
            <h2 className="mb-4 text-lg font-bold">Name: {metadata.name}</h2>
            <h2 className="mb-4 text-lg font-bold">Type: {metadata.type}</h2>
            <h2 className="mb-4 text-lg font-bold">
              Size: {(metadata.size / 1000000).toFixed(2)} megabytes
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMetaData;
