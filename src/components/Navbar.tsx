import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { TbUserSearch } from "react-icons/tb";
import { GoOrganization } from "react-icons/go";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { getSessionValue } from "../utilities/SessionStorageUtility";
import LoginUtility from "../utilities/LoginUtility";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Navbar() {
  const navigate = useNavigate();
  const utility = LoginUtility();

  const userId = utility.loginUserId;
  const userRole = getSessionValue("userRole");
  const handleProfileClick = () => {
    if (userRole === "jobseaker") {
      navigate(`/profile/${userId}`);
    } else if (userRole === "company") {
      navigate("/company-profile");
    }
  };

  return (
    <nav className="bg-white border-gray-200 shadow-lg w-full h-fit top-0 sticky z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
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
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

        {userId ? (
          <div
            id="navbar-menu"
            className="hidden w-full md:flex md:items-center md:w-auto"
          >
            <div className="mt-1 flex items-center gap-8 text-gray-500">
              <Menu>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm outline-none">
                  <img
                    alt="profile_pic"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-10 rounded-full"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      <CgProfile />
                      Your Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={utility.onLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      <GoSignOut />
                      Log out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        ) : (
          <div
            id="navbar-menu"
            className="hidden w-full md:flex md:items-center md:w-auto"
          >
            <div className="mt-1 flex gap-2">
              <Link
                to="/login"
                className="outline-none font-medium rounded-full text-sm px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition duration-500"
              >
                Login
              </Link>

              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-full bg-red-600 py-2.5 px-5 text-sm font-medium text-white outline-none data-[hover]:bg-red-700 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white">
                  Register
                  <FaAngleDown />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/company-registration"
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      <GoOrganization /> Company
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/jobseeker-registration"
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      <TbUserSearch /> JobSeaker
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
