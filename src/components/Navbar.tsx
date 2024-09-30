/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const Navbar = () => {

  return (
    <nav className="z-40 fixed w-full top-0 start-0 py-4">
      <div className="rounded-lg shadow-sm bg-gray-800 max-w-[calc(100%-32px)] flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} className="cursor-pointer flex items-center mr-3">
          <span className="self-center text-white text-xl sm:text-2xl font-semibold whitespace-nowrap">
            DardiBook
          </span>
        </Link>
        <div className="dropdown dropdown-end h-8">
          <div
            tabIndex={0}
            role="button"
            className="btn text-gray-300 btn-ghost btn-circle avatar h-8 w-8 border-0 pt-0 overflow-hidden min-h-2"
          >
            <div className="h-8 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 px-4 py-4 shadow"
          >
            <li className="cursor-none">
              <p className="rounded-box py-2 justify-between text-white bg-gray-700 hover:bg-gray-700 border-gray-700">
                9999999999
                <span className="badge">ID</span>
              </p>
            </li>
            <li>
              <a className="flex flex-row justify-center gap-1 font-semibold rounded-box py-2 mt-2 border-2 hover:bg-transparent text-red-600 hover:bg-gray-700 border-gray-700">
                <p>Logout</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
