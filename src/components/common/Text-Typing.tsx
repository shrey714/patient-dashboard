import React, { useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";

export const Example = () => {
  return (
    <div className="flex items-center justify-center px-8 py-24 text-[28px] sm:text-5xl text-gray-800 font-bold">
      <BlockInTextCard
        examples={[
          "Welcome to DardiBook Patient Dashboard.",
          "Stay connected and streamline your healthcare management.",
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({ examples }: any) => {
  return (
    <div className="w-full space-y-6">
      <div>
        <Typewrite examples={examples} />
      </div>
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }: any) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 uppercase">
      <span className="ml-0">
        {examples[exampleIndex].split("").map((l: any, i: number) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-gray-800"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};
