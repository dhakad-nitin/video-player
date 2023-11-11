import { useState, useEffect } from "react";

import logo from "../assets/logo.png";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={logo}
          alt="OM"
          className="btn btn-ghost p-0 hover:-translate-y-1 hover:scale-110"
        />
        <h1 className="text-lg font-bold mx-4">VidScape</h1>
      </div>
      <div className="flex items-center">
        {/* About Me Button */}
        <a
          className="btn-ghost text-red-500 #808080 hover:bg-slate-300 font-bold py-2 px-4 rounded-full mx-4"
          href="https://react-tailwindcss-portfolio-sec.vercel.app/about"
        >
          About Me
        </a>

        {/* Toggle Button */}
        <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
            />
            <img src={sun} alt="light" className="w-8 h-8 swap-on" />
            <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
          </label>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
