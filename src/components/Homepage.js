import Page from "./Page";
import iconsImg from "../icons-gf423fea9e_1280.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Page
      id="homepage"
      classname=" flex flex-col justify-center items-center py-4 px-2"
    >
      <h1 className=" text-6xl font-semibold">
        Your Favorite <span className=" font-monotes">ICONS</span> For Sale
      </h1>
      <p className=" text-lg font-semibold">Click Below To Go To The Shop</p>
      <div className=" w-full shadow-lg p-4">
        <Link to="/shop">
          <img src={iconsImg} alt="Icons" className=" w-full" />
        </Link>
      </div>
    </Page>
  );
};

export default Homepage;
