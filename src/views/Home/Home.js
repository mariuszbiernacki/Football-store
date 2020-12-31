import React, { useContext } from "react";
import Slider from "../../components/Slider/Slider";
import { Link } from "react-router-dom";
import StoreContext from "../../context/context";
import "./Home.scss";

const Home = () => {
  const value = useContext(StoreContext);
  const { welcomeSlogan } = value;

  return (
    <div className="home__div">
      <h2 className="home__h2">{welcomeSlogan}</h2>
      <Slider className="home__slider" />

      <button className="home__btn">
        <Link className="home__link" to="/products">
          Products
        </Link>
      </button>
    </div>
  );
};

export default Home;
