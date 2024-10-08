/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./common/Loader";
import { getUserID, removeUserID } from "@/utils";
const Navbar = () => {
  const [loading, setloading] = useState(false);
  const [userID, setuserID] = useState("");
  useEffect(() => {
    const getAndSetUserID = async () => {
      const id = await getUserID();
      setuserID(id);
    };
    getAndSetUserID();
  }, []);

  const logOut = () => {
    setloading(true);
    setTimeout(() => {
      removeUserID();
      window.location.reload();
      setloading(false);
    }, 2000);
  };

  return (
    <nav className="z-40 fixed w-full top-0 start-0 py-4">
      <div className="rounded-t-lg py-2 bg-gray-800 max-w-[calc(100%-32px)] flex flex-wrap items-center justify-between mx-auto px-4">
        <Link
          href={"/"}
          className="cursor-pointer flex flex-row items-center mr-3 gap-1 sm:gap-2"
        >
          <span className="self-center text-white text-xl sm:text-2xl font-semibold whitespace-nowrap">
            DardiBook
          </span>
          <span className="text-[8px] sm:text-[10px] text-gray-300 font-medium border-[1.5px] border-gray-300 px-2 rounded-full">
            Patient
          </span>
        </Link>
        <div className="dropdown dropdown-end h-8 z-50">
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
            className="z-[1] menu menu-sm dropdown-content bg-gray-800 rounded-lg mt-11 w-52 px-4 py-4 shadow"
          >
            <li className="cursor-none">
              <p className="rounded-lg py-2 justify-between text-white bg-gray-700 hover:bg-gray-700 border-gray-700">
                {userID}
                <span className="badge">ID</span>
              </p>
            </li>
            <li>
              <a
                onClick={logOut}
                className="flex flex-row justify-center gap-1 font-semibold rounded-lg py-2 mt-2 border-2 text-red-600 hover:bg-gray-700 border-gray-700"
              >
                {loading ? (
                  <Loader
                    size="small"
                    color="text-primary"
                    secondaryColor="text-gray-300"
                  />
                ) : (
                  <>
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
                  </>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[calc(100%-32px)] mx-auto flex flex-row">
        <div className="rounded-b-lg bg-gray-800 border-4 border-t-0 border-gray-800">
          <div className="rounded-md text-white bg-gray-700 flex flex-row items-center gap-1 sm:gap-2 text-xs font-medium w-fit py-[7px] px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              className="h-4 w-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>{" "}
            {userID}
          </div>
        </div>

        <div className="flex flex-1 flex-row items-start justify-between">
          <span className="special-box-1"></span>
          <span className="special-box-2"></span>
        </div>

        <div className="breadcrumbs text-white flex flex-row items-center gap-1 text-xs font-medium bg-gray-800 w-fit py-[7px] px-2 rounded-b-lg border-gray-800 border-4 border-t-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="4 4 16 16"
            strokeWidth="1.5"
            className="size-4 currentColor"
            fill="currentColor"
            overflow="visible"
          >
            <path d="M12.29 8.71L9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7"></path>
          </svg>
          Back
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
