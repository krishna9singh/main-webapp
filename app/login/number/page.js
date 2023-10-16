"use client";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/Essentials";
import { CgSpinner } from "react-icons/cg";

function page() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = Array.from({ length: 6 }, () => React.createRef());
  const otpElementRef = useRef(null);
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [come, setCome] = useState(0);
  const [change, setChange] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [load, setLoad] = useState(false);

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setOtp((prevOTP) => {
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
    setOTP(finalOTP);
    const otpElement = otpElementRef.current;

    if (otpElement) {
      otpElement.innerText = finalOTP;

      if (finalOTP.length === 6) {
        otpElement.classList.replace("_notok", "_ok");
      } else {
        otpElement.classList.replace("_ok", "_notok");
      }
    }
  }, [otp]);

  useEffect(() => {
    let interval;

    if (seconds === 0) {
      setSeconds(0);
      setIsActive(true);
      setCome(come + 1);
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      if (seconds === 0) {
        setSeconds(0);
        setCome(1);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    onSignup();
    setSeconds(30);
    //setIsActive(!isActive);
  };

  const fetchid = async () => {
    await axios
      .post(`${API}/signup-mobile`, { phone: "91" + number })
      .then(function (res) {
        if (res.data.success === true) {
          if (res.data.userexists) {
            sessionStorage.setItem("fullname", res.data.user.fullname);
            sessionStorage.setItem("pic", res.data.a);
            toast.success("Success");
            sessionStorage.setItem("id", res.data.user._id);
            router.push("/main/post/Newforyou");
          } else {
            toast.error("Seems like you don't have an account in the app.");
            router.push(`/login/singUp?no=${number}`);
          }
        } else {
          toast.error("Something went wrong...");
        }
      })
      .catch(function (error) {
        console.log(error, "fetchid");
        toast.error("Something went wrong...");
      });
  };

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask the user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
    setSeconds(30);
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + number;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);

        toast.success("Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        setLoading(false);
        fetchid();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const handleCreate = async () => {
    setLoad(true);

    const isValidEmail = email;

    try {
      if (!email.trim() || !pass.trim()) {
        setToast({
          appear: true,
          text: "Please Enter the Email and Password",
          success: false,
        });
        setTimeout(() => {
          setToast({ appear: false });
        }, 1500);
      } else {
        if (pass.length < 8) {
          setToast({
            appear: true,
            text: "Please Enter More then 8 Characters in Password",
            success: false,
          });
          setTimeout(() => {
            setToast({ appear: false });
          }, 1500);
        } else {
          if (isValidEmail) {
            const res = await axios.post(`${API}/v1/checkacc`, {
              email,
              password: pass,
              loc,
              device,
              contacts: contactList,
              type: "login",
              time: `${Date.now()}`,
              token,
            });
            if (res.data.success) {
              if (res.data.userexists) {
                await sessionStorage.setItem("id", res.data.user._id);
                await sessionStorage.setItem("pic", res.data.pic);
                await sessionStorage.setItem(
                  "fullname",
                  res.data.user.fullname
                );
                await sessionStorage.setItem(
                  "username",
                  res.data.user.username
                );
                router.push("../main/post/Newforyou");
                toast.success("Successfully!");
              } else {
                toast.apply("Seems like you don't have an account in the app.");
                router.push("../login/singUp");
              }
            } else {
              setToast({
                appear: true,
                text: "Something went wrong",
                success: false,
              });
              setTimeout(() => {
                setToast({ appear: false });
              }, 2000);
            }
          } else {
            setToast({
              appear: true,
              text: "Please Enter correct email",
              success: false,
            });
            setTimeout(() => {
              setToast({ appear: false });
            }, 1500);
          }
        }
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
    setLoad(false);
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {showOTP ? (
        // OTP
        <div className="items-center flex flex-col justify-between">
          <div className="font-bold  pn:max-sm:text-[30px] text-[25px] text-[#313C58] ">
            Verification
          </div>
          <div className="flex flex-col py-2 justify-center items-center">
            <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[12px] ">
              We’re sending an SMS to phone number
            </div>
            <div className="text-[#96A0AD] pn:max-sm:text-[12px] text-[15px] ">
              <span className="text-[#0075FF]">+91{number}</span> Wrong Number ?
            </div>
          </div>

          <>
            <div className="mx-auto max-w-md w-full flex justify-center gap-2 p-10">
              {otp.map((value, index) => (
                <>
                  <input
                    key={`otp-field-${index}`}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onOTPVerify();
                      }
                    }}
                    className="otp__digit otp__field pn:max-md:hidden outline-slate-200 bg-slate-100 h-[50px] w-[50px] rounded-2xl flex justify-center items-center text-center text-[#3e3e3e]"
                    value={value}
                    onChange={(event) => handleInputChange(event, index)}
                    ref={otpInputRefs[index]}
                    maxLength="1"
                  />
                </>
              ))}
            </div>
          </>
          <div className="text-black font-semibold flex text-[15px] pt-8">
            <div className="text-center">
              {come === 1 ? (
                <div className="space-x-4 flex ">
                  <div className="text-[#3e3e3e]">
                    Don't receive code ?{" "}
                    <button
                      className={` text-blue-600 rounded ${isActive ? "" : ""}`}
                      onClick={toggleTimer}
                    >
                      Request Again
                    </button>
                  </div>
                </div>
              ) : (
                <h1
                  className={`${
                    come === 1 ? "hidden" : "text-[16px] text-[#3e3e3e]"
                  }`}
                >
                  Resend: 00:{seconds}
                </h1>
              )}
            </div>
          </div>
          <div
            onClick={onOTPVerify}
            className="h-[50px] w-[250px] select-none cursor-pointer bg-black mt-8 flex items-center justify-center rounded-2xl text-white"
          >
            {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
            <span className={`${loading ? "hidden" : ""}`}>Continue</span>
          </div>
        </div>
      ) : (
        // Phone
        <div className="  flex flex-col justify-between items-center">
          <div className="font-bold text-center pn:max-sm:text-[30px] text-[25px] font-fugaz text-[#171717] ">
            Start your Adventure.
            <span className="text-[#0075ff]">Let's Begin!</span>
          </div>
          <div className="flex flex-col justify-center items-center  py-2">
            <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[12px] text-center px-10">
              We've missed you! Please sign in to catch up on what you've missed
            </div>
          </div>
          {/* switcher */}
          <div className="bg-[#f7f7f7] flex rounded-xl dark:text-[#171717] select-none text-[14px]">
            <div
              className={`duration-150 bg-white h-8 m-1 rounded-lg w-20 absolute z-0  ${
                change === 2 ? "ml-[91px]" : " "
              }`}
            ></div>
            <div
              onClick={() => {
                setChange(1);
              }}
              className="m-1 flex justify-center items-center h-8 w-20 z-10"
            >
              Phone no.
            </div>
            <div
              onClick={() => {
                setChange(2);
              }}
              className="m-1 flex justify-center items-center h-8 w-20 z-10"
            >
              email
            </div>
          </div>
          {/* phone */}
          <div
            className={`${
              change === 1
                ? "flex justify-start flex-col  items-start  py-4"
                : "hidden"
            }`}
          >
            <div className="bg-[#f7f7f7] flex items-center justify-center rounded-2xl">
              <div className="text-[#171717] pl-2">+91</div>
              <div className="h-[20px] ml-2 border-r-2 border-slate-200" />
              <input
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSignup();
                  }
                }}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Phone no."
                className="h-[50px] w-[260px] text-[#171717] outline-none bg-[#f7f7f7] rounded-r-2xl px-2 p-2 "
              />
            </div>
          </div>
          <div className={`${change === 1 ? "py-5 " : "hidden"}`}>
            <div
              onClick={onSignup}
              className="h-[50px] w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
            >
              {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
              <span className={`${loading ? "hidden" : ""}`}>Send Otp</span>
            </div>
          </div>
          {/* email */}
          <div className={`${change === 2 ? "" : "hidden"}`}>
            <div>
              <div className="text-black pn:max-sm:text-[15px] text-[15px] py-2">
                Email
              </div>

              <input
                className="h-[50px] w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 "
                placeholder="Enter your email"
              />
            </div>
            <div>
              <div className="text-black pn:max-sm:text-[15px] text-[15px] py-2">
                Password
              </div>

              <input
                className="h-[50px] w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 "
                placeholder="Enter your Password"
              />
            </div>
            <div className="py-5 ">
              <div
                onClick={handleCreate}
                className="h-[50px] w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
              >
                <span>Continue</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
