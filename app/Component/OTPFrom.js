// components/OTPForm.js
"use client"; // components/OTPForm.js
import React, { useState, useEffect } from "react";

const OTPForm = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = Array.from({ length: 6 }, () => React.createRef());

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

    if (value === "" && index > 0) {
      otpInputRefs[index - 1].current.focus();
    } else if (value !== "" && index < 5) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    const finalOTP = otp.join("");
    const otpElement = document.getElementById("_otp");

    if (finalOTP.length === 6) {
      otpElement.classList.replace("_notok", "_ok");
    } else {
      otpElement.classList.replace("_ok", "_notok");
    }

    otpElement.innerText = finalOTP;
  }, [otp]);

  return (
    <form className="otp-form" name="otp-form">
      <div className="title max-w-md mx-auto text-center font-poppins">
        <h3 className="font-bold">OTP VERIFICATION</h3>
        <p className="info text-green-600">
          An OTP has been sent to ********k876@gmail.com
        </p>
        <p className="msg font-weight-bold">Please enter OTP to verify</p>
      </div>
      <div className="otp-input-fields mx-auto bg-white shadow-md max-w-md w-auto flex justify-center gap-2 p-10">
        {otp.map((value, index) => (
          <input
            key={`otp-field-${index}`}
            className="otp__digit otp__field"
            value={value}
            onChange={(event) => handleInputChange(event, index)}
            ref={otpInputRefs[index]}
            maxLength="1"
          />
        ))}
      </div>
      <div className="result max-w-md mx-auto p-6 text-center">
        <p id="_otp" className="_notok text-red-500">
          855412
        </p>
      </div>
    </form>
  );
};

export default OTPForm;
