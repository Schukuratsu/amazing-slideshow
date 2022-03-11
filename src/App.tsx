import React from "react";
import "./App.css";
import { FramePlayer } from "./components/FramePlayer";

const FRAMES = [
  "/image0.jpg",
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
];

function App() {
  return (
    <div className="App">
      <FramePlayer frames={FRAMES} fps={1} />
    </div>
  );
}

export default App;
