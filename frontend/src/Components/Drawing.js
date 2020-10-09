import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { CompactPicker } from "react-color";
import { Button } from "react-bootstrap";
import { MyVerticallyCenteredModal, fetchFromServer } from "../utils/functions";
import wb from "../assets/whiteBackground.jpg";

const Drawing = () => {
  const [image, setImage] = useState("");
  const [brushRadius, setBrushRadius] = useState(5);
  const [lazyRadius, setLazyRadius] = useState(5);
  const [brushColor, setBrushColor] = useState("black");
  const [modalShow, setModalShow] = useState(false);
  const [newEmail, setNewEmail] = useState({
    name: " ",
    email: "",
    subject: "",
    toEmail: "",
    message: "",
    draw: "",
  });

  const draw = {
    grid: false,
    interface: true,
  };

  let saveableCanvas;

  const handleOnChange = (e) => {
    const newEmailUser = {
      ...newEmail,
      [e.target.name]: e.target.value,
    };
    setNewEmail(newEmailUser);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (newEmail.from === "" || newEmail.subject === "") {
    //   alert("Please complete all the fields");
    // }
    newEmail["draw"] = image;
    fetchFromServer(
      "https://draw-app-bae.herokuapp.com/send",
      newEmail,
      "POST"
    );
  };
  return (
    <div>
      <button
        onClick={() => {
          saveableCanvas.clear();
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          saveableCanvas.undo();
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          localStorage.setItem("savedDrawing", saveableCanvas.getSaveData());
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          saveableCanvas.loadSaveData(localStorage.getItem("savedDrawing"));
        }}
      >
        Load
      </button>
      <div>
        <label>Brush-Radius:</label>
        <input
          type="number"
          value={brushRadius}
          onChange={(e) => {
            setBrushRadius(parseInt(e.target.value, 10));
          }}
        />
      </div>
      <div>
        <label>Lazy-Radius:</label>
        <input
          type="number"
          value={lazyRadius}
          onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        Change color:
        <CompactPicker
          onChangeComplete={(color) => {
            setBrushColor(color.hex);
          }}
        />
      </div>
      <div>
        <input
          type="file"
          onChange={function (e) {
            let img = new Image();
            img.onload = function () {
              saveableCanvas.canvasContainer.children[3]
                .getContext("2d")
                .drawImage(img, 0, 0);
              saveableCanvas.drawImage();
            };
            img.src = URL.createObjectURL(e.target.files[0]);
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            let img = new Image();
            img.onload = function () {
              saveableCanvas.canvasContainer.children[3]
                .getContext("2d")
                .drawImage(img, 0, 0);
            };

            img.src = wb;
          }}
        >
          delete image
        </button>
      </div>
      <Button
        variant="warning"
        onClick={function () {
          let canvas = saveableCanvas.canvasContainer.children[1];
          let baseCanvas = saveableCanvas.canvasContainer.children[3];
          let canvasContext = baseCanvas.getContext("2d");
          canvasContext.drawImage(
            saveableCanvas.canvasContainer.children[1],
            0,
            0
          );
          canvasContext.globalCompositeOperation = "destination-over";
          canvasContext.fillStyle = "white";
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);
          let dataURL = baseCanvas.toDataURL("image/jpeg");
          setImage(dataURL);

          setModalShow(true);
        }}
      >
        Send us the draw
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onChange={handleOnChange}
        onSubmit={handleSubmit}
      />
      <CanvasDraw
        ref={(CanvasDraw) => (saveableCanvas = CanvasDraw)}
        brushColor={brushColor}
        hideGrid={draw.grid}
        canvasWidth="800px"
        canvasHeight="400px"
        hideInterface={draw.interface}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
};
export default Drawing;
