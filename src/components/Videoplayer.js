// VideoPlayer.js

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const VideoPlayer = React.forwardRef(({ videoFile, onPlayPause }, ref) => {
  const videoRef = useRef(null);
  const canvas = useRef(null);
  const forwardButton = useRef(null);
  const backwardButton = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        canvas.current = p.createCanvas(800, 450);
        videoRef.current = p.createVideo([videoFile], () => {
          videoRef.current.size(p.width, p.height);
          videoRef.current.hide();
        });

        forwardButton.current = createButton(
          p,
          "➡️",
          p.width / 2 + 55,
          p.height - 45
        );
        backwardButton.current = createButton(
          p,
          "⬅️",
          p.width / 2 - 90,
          p.height - 45
        );
      };

      p.draw = () => {
        p.background(0);
        p.image(videoRef.current, 0, 0, p.width, p.height);
        drawPlayPauseButton(p);
        drawButtons(p);
      };

      const drawPlayPauseButton = (p) => {
        const buttonDiameter = 40;
        const buttonX = p.width / 2;
        const buttonY = p.height - buttonDiameter / 2 - 10;
        p.fill(255);
        const buttonText = videoRef.current.elt.paused ? "▶️" : "⏸";
        p.textSize(34);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(buttonText, buttonX, buttonY);
      };

      const drawButtons = (p) => {
        drawButton(p, forwardButton.current);
        drawButton(p, backwardButton.current);
      };

      const drawButton = (p, button) => {
        p.fill(255);
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(button.symbol, button.x, button.y, button.size, button.size);
      };

      p.mousePressed = () => {
        // Play/Pause button
        if (
          p.mouseX >= (p.width - 60) / 2 &&
          p.mouseX <= (p.width + 60) / 2 &&
          p.mouseY >= p.height - 40 &&
          p.mouseY <= p.height - 10
        ) {
          togglePlayPause();
          onPlayPause(videoRef.current.elt.paused);
        }

        // Forward button
        if (
          p.mouseX >= forwardButton.current.x &&
          p.mouseX <= forwardButton.current.x + forwardButton.current.size &&
          p.mouseY >= forwardButton.current.y &&
          p.mouseY <= forwardButton.current.y + forwardButton.current.size
        ) {
          skipTime(10);
        }

        // Backward button
        if (
          p.mouseX >= backwardButton.current.x &&
          p.mouseX <= backwardButton.current.x + backwardButton.current.size &&
          p.mouseY >= backwardButton.current.y &&
          p.mouseY <= backwardButton.current.y + backwardButton.current.size
        ) {
          skipTime(-10);
        }
      };

      const togglePlayPause = () => {
        if (videoRef.current) {
          if (videoRef.current.elt.paused) {
            videoRef.current.loop();
          } else {
            videoRef.current.pause();
          }
        }
      };

      const skipTime = (seconds) => {
        if (videoRef.current) {
          videoRef.current.time(videoRef.current.time() + seconds);
        }
      };

      const createButton = (p, symbol, x, y) => {
        const buttonSize = 30;
        return {
          symbol,
          x,
          y,
          size: buttonSize,
        };
      };
    };

    const videoSketch = new p5(sketch);

    const centerCanvas = () => {
      if (canvas.current) {
        const x = (window.innerWidth - canvas.current.width) / 5;
        const y = (window.innerHeight - canvas.current.height) / 1.8;
        canvas.current.position(x, y);
        canvas.current.style("borderRadius", "10px");
      }
    };

    centerCanvas();
    window.addEventListener("resize", centerCanvas);

    return () => {
      videoSketch.remove();
      window.removeEventListener("resize", centerCanvas);
    };
  }, [videoFile, onPlayPause]);

  return <div className="justify-center"></div>;
});

export default VideoPlayer;
