import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

function Navbar({}: Props) {
  const location = useLocation();
  return (
    <nav className="bg-white border-gray-200 shadow-lg w-full h-fit top-0 sticky z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            JobSeeker
          </span>
        </a>

        {/* Hamburger Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {true ? (
          <div
            id="navbar-menu"
            className="hidden w-full md:flex md:items-center md:w-auto"
          >
            <div className="mt-1 flex space-x-2">
              <Link
                to="/login"
                className="text-blue-900 bg-white border border-blue-300 focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-blue-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div
            id="navbar-menu"
            className="hidden w-full md:flex md:items-center md:w-auto"
          >
            {/* <div className="mt-1 flex items-center gap-8 text-gray-500">
              <div className="relative">
                <BsBell className="text-2xl" />
                <span className="bg-red-600 text-white text-xs rounded-full px-1 absolute -top-1 -right-1">
                  5
                </span>
              </div>
              <div className="border rounded-full flex items-center gap-4 px-2.5 py-2">
                <HiOutlineMenuAlt2 className="text-2xl" />
                <div className="relative">
                  <img
                    src="https://apusthemes.com/wp-demo/superio/wp-content/uploads/2021/05/team5-200x200.jpg"
                    alt="profile_pic"
                    className="h-7 w-7 object-center rounded-full"
                  />
                  <span className="bg-red-600 text-white text-xs rounded-full px-1 absolute -top-1 -right-1">
                    2
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;