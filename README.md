# VidScape - Frontend Web App

## Overview

VidScape is a frontend web application created using `create-react-app` to provide a seamless experience for playing videos from your local storage. It features a custom-built video player with additional functionalities, including video playback controls, a waveform visualization of the video's audio, and a sleek user interface using Daisy UI and Tailwind CSS.

## Installation

To run VidScape locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/dhakad-nitin/video-player
   cd VidScape
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

## Usage

After successfully installing the dependencies, you can start the development server:

```bash
npm run start
```

This command will launch the application in your default web browser. If it doesn't open automatically, you can visit [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Video Player

- Custom video player built from scratch using p5.js to draw the canvas.
- Playback controls: play/pause, forward 10 seconds, backward 10 seconds.

### UI Components

- Utilizes Daisy UI for a visually appealing theme.
- Tailwind CSS for clean and responsive inline styling.

### Audio Waveform

- Integrates wavesurfer.js to generate and display the waveform of the video's audio.
- Provides a visual representation of the audio data, enhancing the user experience.

### Metadata Display

- Displays video metadata on the right side of the video player.
- Allows users to view essential information about the currently playing video.

## Technologies Used

- React (create-react-app)
- p5.js
- Daisy UI
- Tailwind CSS
- wavesurfer.js

## Contribution

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/your-username/VidScape).

## Author

- **Nitin Dhakad**
- [Portfolio](https://react-tailwindcss-portfolio-sec.vercel.app/)

## Deployment

The project is deployed on Vercel. You can access it [here](https://video-player-deploy.vercel.app/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
