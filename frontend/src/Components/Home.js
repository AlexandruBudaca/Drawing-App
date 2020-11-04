import React from "react";
import Carousel from "react-bootstrap/Carousel";

import room from "../assets/room.jpg";
import room2 from "../assets/room2.jpg";
import room3 from "../assets/room3.jpg";

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block " src={room2} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block " src={room} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block " src={room3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
