import React from "react";
import { Link } from "react-router-dom";
import girl from "../assets/bro.png";

const CoverPage = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 px-6 md:px-14 lg:px-24 py-10">
      {/* IMAGE */}
      <img
        src={girl}
        alt="Illustration"
        className="w-full max-w-md md:max-w-lg mx-auto lg:mx-0"
      />

      {/* TEXT SECTION */}
      <div className="text-start flex flex-col gap-6 items-start">
        <h1 className="font-montserrat font-semibold text-3xl md:text-4xl text-black leading-snug">
          Improve Productivity By Managing
          <span className="text-[#0585cd]"> Your Goals</span>
        </h1>

        <p className="font-montserrat text-base md:text-lg text-black/80 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Ut nisl nisl cursus massa sed.
          Turpis ac aliquet lacinia justo turpis amet at arcu. Diam vulputate
          suspendisse aliquam enim sagittis cursiodio ultrices. Condimentum
          lacus nunc rhoncus massa. Tortorstiu ultricies neque aliquam sit non.
          Diam vehicula dignissimepei pellentesque eros vitae. Viverra in vitae
          nunc lorem eget lciou imperdiet tortor. Ac mauris vel non amet eget
          egestas inoriou pellentesque commodo amet. Facilisi sed ut nisi
          pellentesque diam egestas et turpis donor amet.
        </p>

        <Link
          to="/allgoals"
          className="no-underline px-4 py-3 md:px-6 md:py-4 rounded-lg bg-[#0585cd] font-montserrat font-semibold text-white text-base md:text-lg"
        >
          Manage Goals
        </Link>
      </div>
    </div>
  );
};

export default CoverPage;
