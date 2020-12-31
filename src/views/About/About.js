import React from "react";
import Map from "../../components/Map/Map";
import imgTshirt1 from "../../assets/images/man_city_tshirt.jpg";
import imgTshirt2 from "../../assets/images/man_utd_tshirt.jpg";
import "./About.scss";

const About = () => {
  return (
    <>
      <h1 className="about__h1">About our store</h1>
      <h2 className="about__h2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, enim.
        Dolorum, molestiae magni recusandae odio temporibus ab rem voluptates
        enim ratione saepe maiores ipsam delectus sapiente fugiat asperiores
        blanditiis. Recusandae qui quae animi incidunt pariatur eligendi. Quis
        voluptatibus accusantium deserunt? Vel architecto velit quibusdam,
        cumque dolor ipsam quia dolores doloremque.
      </h2>
      <div className="about__div">
        <img className="about__img" src={imgTshirt1} alt="man-city-photo" />
        <p className="about__p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consectetur praesentium necessitatibus commodi doloribus vel ducimus
          quas nostrum explicabo fuga?
        </p>
      </div>
      <div className="about__div">
        <p className="about__p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consectetur praesentium necessitatibus commodi doloribus vel ducimus
          quas nostrum explicabo fuga?
        </p>
        <img className="about__img" src={imgTshirt2} alt="man-utd-photo" />
      </div>
      <Map />
    </>
  );
};

export default About;
