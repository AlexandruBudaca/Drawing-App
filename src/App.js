import React, { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 15;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  function save() {
    let button = document.getElementById("btn-download");
    const canvasSave = document.getElementById("resetCanvas");
    let dataURL = canvasSave.toDataURL("image/png");
    button.href = dataURL;
    setImage(dataURL);
  }
  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="App">
      {console.log(image)}
      <header className="App-header">
        <a
          href="/"
          className="button"
          id="btn-download"
          download="my-file-name.png"
          onClick={save}
        >
          Download
        </a>
        <a
          href="mailto:alex.andrul10@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          send email
        </a>
        <button onClick={clearCanvas}>Clear canvas</button>
        <canvas
          id="resetCanvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </header>
    </div>
  );
}

export default App;
