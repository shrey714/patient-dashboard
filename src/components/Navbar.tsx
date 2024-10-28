/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./common/Loader";
import { getUserID, removeUserID } from "@/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
const Navbar = () => {
  const [loading, setloading] = useState(false);
  const [userID, setuserID] = useState("");
  const [hidden, sethidden] = useState(false);
  const windowsWidth = window.innerWidth;
  const { scrollY } = useScroll();
  useEffect(() => {
    const getAndSetUserID = async () => {
      const id = await getUserID();
      setuserID(id);
    };
    getAndSetUserID();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 64) {
      sethidden(true);
    } else {
      sethidden(false);
    }
  });

  const logOut = () => {
    setloading(true);
    setTimeout(() => {
      removeUserID();
      window.location.assign("/");
      setloading(false);
    }, 2000);
  };

  return (
    <motion.nav
      layout="preserve-aspect"
      variants={{
        visible: { y: 0 },
        hidden: { y: -17 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.15, ease: "easeIn" }}
      className="z-40 fixed w-full top-0 start-0 pt-4"
    >
      <motion.div
        layout
        variants={{
          visible: {
            maxWidth: windowsWidth - 32,
            borderRadius: 8,
            paddingTop: 8,
            paddingBottom: 8,
          },
          hidden: {
            maxWidth: windowsWidth,
            borderRadius: 0,
            paddingTop: 4,
            paddingBottom: 4,
          },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.15, ease: "easeIn" }}
        className={`bg-gray-800 flex flex-wrap items-center justify-between mx-auto px-4 shadow-lg 
          
          `}
      >
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
            className="z-[1] menu menu-sm dropdown-content bg-gray-800 rounded-lg mt-1 w-52 px-4 py-4 shadow"
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
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
