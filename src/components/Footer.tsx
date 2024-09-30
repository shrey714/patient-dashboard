/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Footer = () => {
  const allPaths = [
    "about-us",
    "cancellation-policy",
    "contact-us",
    "pricing",
    "privacy-policy",
    "terms-conditions",
  ];

  return (
    <>
      <footer className="footer gap-y-4 footer-center text-gray-800 font-medium p-4 pt-8 flex flex-col">
        <aside className="grid-flow-col items-center">
          <img className="size-10 md:size-16" src="/Logo.svg" alt="LOGO" />
        </aside>
        <nav className="flex flex-row flex-wrap items-center justify-center justify-self-center gap-x-4 gap-y-0">
          {allPaths.map((path, key) => {
            return (
              <Link
                key={key}
                href={`https://www.dardibook.in/documents/${path}`}
                className="link link-hover text-[0.7rem] sm:text-xs md:text-sm"
                target="_blank"
              >
                {path}
              </Link>
            );
          })}
        </nav>
      </footer>
      <footer className="footer footer-center text-gray-800 font-medium px-4">
        <aside className="flex items-center pt-2 pb-4 text-xs justify-center">
          <p>© {new Date().getFullYear()} dardibook.com. All rights reserved</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
