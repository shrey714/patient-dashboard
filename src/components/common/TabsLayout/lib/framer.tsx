import React, { useEffect, useRef, useState } from "react";

import { Tab } from "../hooks/use-tabs";
import classNames from "classnames";
import { motion } from "framer-motion";

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};

type Props = {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: [number, number]) => void;
};

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: Props): JSX.Element => {
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    []
  );

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={(e) => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = hoveredTabIndex === i || selectedTabIndex === i;

        return (
          <motion.button
            key={i}
            className={classNames(
              "text-sm font-medium sm:text-lg relative rounded-md flex items-center h-10 px-4 z-20 bg-transparent  cursor-pointer select-none transition-colors hover:text-black mb-0.5",
              {
                "text-gray-600": !isActive, // Default color for non-active tabs
                "text-black": isActive, // Color for active tabs
              }
            )}
            ref={(el: any) => (buttonRefs[i] = el)}
            onPointerEnter={() => {
              setHoveredTabIndex(i);
            }}
            onFocus={() => {
              setHoveredTabIndex(i);
            }}
            onClick={() => {
              setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
            }}
          >
            {item.label}
          </motion.button>
        );
      })}

      {selectedRect && navRect && (
        <motion.div
          className={
            "absolute z-10 bottom-0 left-0.5 h-[4px] rounded-full bg-gray-700"
          }
          initial={false}
          animate={{
            width: selectedRect.width * 0.8,
            x: `calc(${selectedRect.left - navRect.left}px + 10%)`,
            opacity: 1,
          }}
          transition={transition}
        />
      )}
    </nav>
  );
};

export const Framer = { Tabs };
