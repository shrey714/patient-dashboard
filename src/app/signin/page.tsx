"use client";

import React, { useEffect } from 'react';
declare global {
  interface Window {
    phoneEmailListener:any;
  }
}
const SignInButton = () => {
    useEffect(() => {
        // Load the external script
        const script = document.createElement('script');
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.querySelector('.pe_signin_button')?.appendChild(script);

        // Define the listener function
        window.phoneEmailListener = function(userObj: { user_json_url: any; }) {
            const user_json_url = userObj.user_json_url;
            // Insert the debug message
            document.querySelector('.pe_signin_button')?.insertAdjacentHTML('beforeend', `<span>Phone Verification Successful !! <br />Read the following user_json_url from the backend to get the verified phone number - ${user_json_url} <br /> Please delete this debug message code from the phoneEmailListener function once you implement integration step 2.</span>`);
        };

        return () => {
            // Cleanup the listener function when the component unmounts
            window.phoneEmailListener = null;
        };
    }, []);

    return (
        <div className="pe_signin_button" data-client-id="17697786150058695225"></div>
    );
};

export default SignInButton;
