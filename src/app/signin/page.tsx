"use client";
import React, { useState } from 'react';
import {auth} from "../../firebase/firebaseConfig"
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

declare global {
    interface Window {
        confirmationResult:any;
    }
}


const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSendCode = () => {
    const appVerifier = window.recaptchaVerifier;
console.log("handlesendcode")
    signInWithPhoneNumber(auth,phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error(error);
//         grecaptcha.reset(window.recaptchaWidgetId);

// // Or, if you haven't stored the widget ID:
// window.recaptchaVerifier.render().then(function(widgetId) {
//   grecaptcha.reset(widgetId);
// });
      });
  };

  const handleVerifyCode = () => {
    const code = verificationCode;
window.confirmationResult.confirm(code).then((result: { user: any; }) => {
  // User signed in successfully.
  const user = result.user;
  // ...
}).catch((error: any) => {
  // User couldn't sign in (bad verification code?)
  // ...
  console.log(error)
});

  };

  return (
    <>
      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </>
  );
};

export default PhoneAuth;
