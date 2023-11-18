import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center  bg-violet-brand p-4">
      <div className="container flex lg:justify-around justify-between items-center">
        <a href="https://libertapp.net" className="text-white pr-10 md:pr-0">
          <img
            src="assets/logos/fenix-new.svg"
            alt="Logo"
            className="object-cover rounded w-[60px] h-[60px] cursor-pointer"
          />
        </a>
        <div className="flex items-center md:space-x-10 space-x-2 gap-4 md:gap-0">
          <a href="https://lalibertadavanza.com.ar" className="text-white">
            Quiero ser fiscal
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
