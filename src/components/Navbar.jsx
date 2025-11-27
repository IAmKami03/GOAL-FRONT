import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Frame 1.png";
import profile from "../assets/Ellipse 2.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center justify-between px-6 sm:px-[100px] py-4 border-b border-black/20 bg-white">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-[140px] sm:w-[180px]" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-10">
        <Link
          to="/ongoing"
          className="font-montserrat font-semibold text-[18px] text-black hover:text-[#0585cd] transition"
        >
          Ongoing
        </Link>
        <Link
          to="/complete"
          className="font-montserrat font-semibold text-[18px] text-black hover:text-[#0585cd] transition"
        >
          Completed
        </Link>
        <Link
          to="/allgoals"
          className="font-montserrat font-semibold text-[18px] text-black hover:text-[#0585cd] transition"
        >
          All Goals
        </Link>
      </div>

      {/* Profile Image (Mobile Menu Trigger) */}
      <div className="relative">
        <img
          src={profile}
          alt="Profile"
          className="w-[40px] h-[40px] rounded-full cursor-pointer active:scale-95 transition"
          onClick={() => setOpenMenu(!openMenu)}
        />

        {/* Dropdown Menu */}
        {openMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-3 w-[160px] bg-white border border-black/10 shadow-md rounded-lg flex flex-col py-3 z-50 
                       animate-[fadeIn_0.15s_ease-out]"
          >
            <Link
              to="/ongoing"
              className="px-4 py-2 hover:bg-black/5 font-medium text-sm text-black transition"
              onClick={() => setOpenMenu(false)}
            >
              Ongoing
            </Link>
            <Link
              to="/complete"
              className="px-4 py-2 hover:bg-black/5 font-medium text-sm text-black transition"
              onClick={() => setOpenMenu(false)}
            >
              Completed
            </Link>
            <Link
              to="/allgoals"
              className="px-4 py-2 hover:bg-black/5 font-medium text-sm text-black transition"
              onClick={() => setOpenMenu(false)}
            >
              All Goals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
