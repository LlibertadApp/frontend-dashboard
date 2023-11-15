import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center  bg-violet-brand p-4">
      <div className="container flex lg:justify-around justify-between items-center">
        <a href="https://libertapp.net" className="text-white">
          <img
            src="assets/logos/fenix-new.svg"
            alt="Logo"
            className="object-cover rounded w-[60px] h-[60px] cursor-pointer"
          />
        </a>
        <div className="flex items-center space-x-10">
          <a href="https://lalibertadavanza.com.ar" className="text-white">
            ¿Cómo ser Fiscal de LLA?
          </a>
          <a
            href="https://app.libertapp.net"
            className="text-white font-bold text-lg"
          >
            WebApp
          </a>
          <a href="/">
            <img
              src="assets/images/back-arrow.svg"
              alt="Volver"
              className="object-cover rounded w-4 h-auto transform scale-x-[-1]"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
