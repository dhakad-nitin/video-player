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
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="flex-1">
        <img
          src={logo}
          alt="OM"
          className="btn btn-ghost p-0 hover:-translate-y-1 hover:scale-110"
        />
        <h1 className="text-lg font-bold mx-4">VidScape</h1>
      </div>
      <div className="flex-none">
        {/* Toggle button here */}
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
