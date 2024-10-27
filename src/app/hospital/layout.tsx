"use client";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
let duration = 0.5;
export default function RootLayout({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    setStep(pathSegments.length);
  }, [pathname]);

  return (
    <div className="pt-20">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-[calc(100%-32px)] max-w-screen-xl m-auto">
        <div className="mx-auto w-full flex-1 flex-col items-center justify-center">
          <div className="flex px-8 py-3 bg-white rounded-lg shadow-sm">
            <Step step={1} currentStep={step} />
            <Step step={2} currentStep={step} />
            <Step step={3} currentStep={step} />
          </div>
        </div>
        <MotionConfig transition={{ duration, type: "tween" }}>
          <ResizablePanel>{children}</ResizablePanel>
        </MotionConfig>
        <div className="w-full mt-5 flex items-center justify-center">
          <button
            onClick={() => {
              router.back();
            }}
            className={`${
              step === 1 ? "pointer-events-none opacity-0" : ""
            } btn animate-none btn-outline border-2 border-gray-800 text-gray-800 rounded-full min-h-min h-min py-2 px-7 text-xs leading-none`}
          >
            Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <div className="flex flex-1 flex-col items-center">
      <motion.div animate={status} className="relative">
        <motion.div
          variants={{
            active: {
              scale: 1,
              transition: {
                delay: 0,
                duration: 0.2,
              },
            },
            complete: {
              scale: 1.25,
            },
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "tween",
            ease: "circOut",
          }}
          className="absolute inset-0 rounded-full bg-blue-200"
        />

        <motion.div
          initial={false}
          variants={{
            inactive: {
              backgroundColor: "#fff", // neutral
              borderColor: "#e5e5e5", // neutral-200
              color: "#a3a3a3", // neutral-400
            },
            active: {
              backgroundColor: "#fff",
              borderColor: "#3b82f6", // blue-500
              color: "#3b82f6", // blue-500
            },
            complete: {
              backgroundColor: "#3b82f6", // blue-500
              borderColor: "#3b82f6", // blue-500
              color: "#3b82f6", // blue-500
            },
          }}
          transition={{ duration: 0.2 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
        >
          <div className="flex items-center justify-center">
            {status === "complete" ? (
              <CheckIcon className="h-5 w-5 text-white" />
            ) : (
              <span>{step}</span>
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-2 text-[10px] sm:text-sm font-semibold text-center"
        animate={status}
        initial={false}
        variants={{
          inactive: {
            color: "#a3a3a3", // neutral-400
          },
          active: {
            color: "#3b82f6", // blue-500
          },
          complete: {
            color: "#3b82f6", // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
      >
        {step === 1
          ? "Select Hospital"
          : step === 2
          ? "Select Patient"
          : "Select prescription"}
      </motion.p>
    </div>
  );
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function ResizablePanel({ children }: any) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height }}
      className="relative overflow-hidden bg-white w-full rounded-lg mt-2 border-gray-400/70 border-2"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            x: 384,
          }}
          animate={{
            x: 0,
            // transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            x: -384,
            // transition: { duration: duration / 2 },
          }}
          className={`w-full ${height ? "absolute" : "relative"}`}
        >
          <div ref={ref} className="w-full px-3 py-3 pb-4">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: WeakKey | null) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
