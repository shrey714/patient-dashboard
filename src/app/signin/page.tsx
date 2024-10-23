"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import Loader from "@/components/common/Loader";
import FlickeringGrid from "@/components/AuthPage/FlickeringGrid";
import Image from "next/image";
import { setUserID } from "@/utils";

const SignIn = () => {
  interface Window {
    phoneEmailListener: any;
  }
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load the external script
    const script = document.createElement("script");
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.querySelector(".pe_signin_button")?.appendChild(script);

    // Define the listener function
    window.phoneEmailListener = async function (userObj: {
      user_json_url: any;
      user_phone_number: any;
    }) {
      await setUserID(userObj.user_phone_number);
      router.replace(`/home?${searchParams.toString()}`);
      // document.querySelector('.pe_signin_button')?.insertAdjacentHTML('beforeend', `<span>Phone Verification Successful !! <br />Read the following user_json_url from the backend to get the verified phone number - ${user_json_url} <br /> Please delete this debug message code from the phoneEmailListener function once you implement integration step 2.</span>`);
    };

    return () => {
      // Cleanup the listener function when the component unmounts
      window.phoneEmailListener = null;
    };
  }, []);

  const header = {
    title: "Welcome to DardiBook Patient",
    desc: "Access your DardiBook account to manage appointments, prescriptions, and patient records with ease. Stay connected and streamline your healthcare management.",
  };
  return (
    <>
      <section className="relative bg-gray-300 h-svh w-full overflow-hidden flex justify-center">
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="h-svh flex flex-col items-center justify-center w-full sm:w-4/5">
          <div className="z-50 flex flex-1 items-center justify-center">
            <div className="w-max flex items-center justify-center">
              <h1 className="h-auto select-none animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-gray-700 pr-4 sm:pr-8 text-[28px] sm:text-5xl text-gray-800 font-bold">
                {header.title}
              </h1>
            </div>
          </div>

          <div className="z-50 max-h-52 py-8 px-[12.5%] bg-gray-900 w-full flex flex-1 flex-col items-center justify-between rounded-t-3xl overflow-hidden pt-12 shadow-[0_0_20px_2px_rgba(8,_112,_184,_0.7)] transition-all">
            <div
              className="pe_signin_button w-full custom-auth-button btn animate-none bg-transparent border-0 hover:bg-transparent rounded-full p-0 m-0"
              data-client-id="17697786150058695225"
            ></div>
            <Image
              alt="Logo"
              src="/Logo.svg"
              width={56}
              height={56}
              className="h-12 sm:h-14 aspect-square mt-3"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
