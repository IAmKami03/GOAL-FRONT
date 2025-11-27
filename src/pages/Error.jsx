import React from "react";
import img from "../assets/amico.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="
  grid 
  sm:grid-cols-[1fr_2fr] 
  grid-cols-1 
  gap-[40px] 
  sm:gap-[146px] 
  mx-[30px] 
  sm:mx-[100px] 
  my-[40px] 
  sm:my-[58px]
"
    >
      <img src={img} alt="404 Illustration" className="w-full" />

      <div className="text-start flex flex-col gap-[25px] items-start">
        <h1 className="font-montserrat font-semibold text-[28px] sm:text-[36px] leading-[1.2] text-black m-0">
          Oops! Page Not <span className="text-[#0585cd]">Found</span>
        </h1>

        <p className="font-montserrat text-[18px] sm:text-[20px] text-black/80 m-0">
          The page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or return to the homepage to continue exploring
          your goals and productivity tools.
        </p>

        <Link
          to="/"
          className="no-underline px-[16px] py-[12px] rounded-[10px] bg-[#0585cd] font-montserrat font-semibold text-[18px] sm:text-[20px] text-white cursor-pointer"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
