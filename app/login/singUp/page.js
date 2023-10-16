"use client";
import React, { useEffect, useState } from "react";
import pic from "../../assets/Images/login.png";
import Link from "next/link";
import one from "../../../app/assets/Images/1.png";
import Anime from "../../../app/assets/Images/Anime.png";
import art from "../../../app/assets/Images/Art.png";
import edu from "../../../app/assets/Images/edu.png";
import bs from "../../../app/assets/Images/Bus.png";
import fashion from "../../../app/assets/Images/Fashion.png";
import gym from "../../../app/assets/Images/Gym.png";
import photo from "../../../app/assets/Images/Photo.png";
import pop from "../../../app/assets/Images/Pop.png";
import food from "../../../app/assets/Images/Food.png";
import sc from "../../../app/assets/Images/Sc.png";
import music from "../../../app/assets/Images/Music.png";
import Sports from "../../../app/assets/Images/Sports.png";
import tv from "../../../app/assets/Images/TV.png";
import maps from "../../../app/assets/Images/Maps.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { API } from "@/Essentials";
import { TiTick } from "react-icons/ti";

function page() {
  const search = useSearchParams();
  const number = search.get("no");
  const email = search.get("email");
  const router = useRouter();
  const [gender, setGender] = useState(0);
  const [genderr, setGenderr] = useState("");
  const [namee, setNamee] = useState("");
  const [dobb, setDobb] = useState("");
  const [change, setChange] = useState(3);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [tick, setTick] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [interest, setInterest] = useState([]);
  const [toast, setToast] = useState(false);
  const [load, setLoad] = useState(false);

  //image
  const handleImageChange = (e) => {
    setSelectImage(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };
  //api for create account
  const handleNext = async () => {
    if (interest.length > 2) {
      setLoad(true);
      console.log("first");
      const form = new FormData();
      if (selectedImage) {
        form.append("image", {
          uri: selectedImage,
          type: "image/jpg",
          name: "dps.jpg",
        });
      } else {
        form.append("image", "male-1.png");
      }
      router.push("/main/post/Newforyou");
      if (email) {
        form.append("email", email);
        form.append("pass", pass);
      } else {
        form.append("number", number);
      }
      form.append("fullname", namee);
      form.append("gender", gender);
      form.append("username", username);
      form.append("bio", bio);
      form.append("interest", interest);
      form.append("dob", dobb);

      try {
        if (email) {
          const res = await axios.post(
            `${API}/v1/createnewaccountemail`,
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res?.data?.success) {
            await sessionStorage.setItem("id", res.data.user._id);
            await sessionStorage.setItem("fullname", res.data.user.fullname);
            await sessionStorage.setItem("username", res.data.user.username);
            await sessionStorage.setItem("pic", res.data.pic);
          } else {
          }
        } else {
          const res = await axios.post(`${API}/v1/createnewaccountweb`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(res.data);
          if (res?.data?.success) {
            await sessionStorage.setItem("id", res.data.user._id);
            await sessionStorage.setItem("fullname", res.data.user.fullname);
            await sessionStorage.setItem("username", res.data.user.username);
            await sessionStorage.setItem("pic", res.data.pic);
          } else {
            toast.error("Something went wrong...");
          }
        }
      } catch (e) {
        console.log(e, "error");
      }
    } else {
      setToast({
        appear: true,
        text: "Select a Minimum of 3 Interests",
        success: false,
      });
      setTimeout(() => {
        setToast({ appear: false });
      }, 2000);
    }
    setLoad(false);
  };

  //first validation
  const err = () => {
    if (namee === "" || dobb === "" || genderr === "") {
      return false;
    } else {
      return true;
    }
  };
  const datav = err();

  //Second validation
  const er = () => {
    if (username === "" || bio === "" || tick === true) {
      return false;
    } else {
      return true;
    }
  };

  const datv = er();
  //Second validation
  const era = () => {
    if (interest.length > 2) {
      return false;
    } else {
      return true;
    }
  };

  const dtv = era();

  const data = [
    { item: "Gaming", img: one },
    { item: "Education", img: edu },
    { item: "Travel", img: maps },
    { item: "Food & Cooking", img: food },
    { item: "Movie", img: tv },
    { item: "Science & Technology", img: sc },
    { item: "Music & Events", img: music },
    { item: "Sports", img: Sports },
    { item: "Photography", img: photo },
    { item: "Entrepreneurship & Business", img: bs },
    { item: "Arts & Crafts", img: art },
    { item: "Anime", img: Anime },
    { item: "Pop Culture", img: pop },
    { item: "Fashion & Beauty", img: fashion },
    { item: "Health & Fitness", img: gym },
  ];

  console.log(namee, dobb, genderr, username, bio, selectedImage, interest);
  return (
    <>
      {/* first */}
      <div
        className={`${
          change === 1
            ? "items-center flex flex-col justify-between text-black"
            : "hidden"
        }`}
      >
        <div className="font-bold  pn:max-sm:text-[18px] text-[25px] text-[#313C58] ">
          "Welcome , we've saved you a seat."
        </div>
        <div className="flex flex-col justify-center items-center  py-2">
          <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[14px] px-5">
            You can change them at any time in settings
          </div>
          <div className="py-4">
            <div className="text-black pn:max-sm:text-[15px] text-[15px] py-2">
              Name
            </div>
            <input
              value={namee}
              onChange={(i) => {
                setNamee(i.target.value);
              }}
              className="h-[50px] w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 "
              placeholder="Enter your name"
            />
          </div>
          <div className="py-2">
            <div className="text-black py-2">DOB</div>
            <input
              value={dobb}
              onChange={(i) => {
                setDobb(i.target.value);
              }}
              className="h-[50px] w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 text-[#171717]"
              placeholder="choose"
              type="date"
            />
          </div>
        </div>
        <div className="flex flex-col py-2 w-[300px] ">
          <div className="text-black py-2">Gender</div>
          <div className="flex flex-row justify-between gap-3">
            <div
              onClick={() => {
                setGender(1);
                setGenderr("Male");
              }}
              className={`h-[50px] px-3 rounded-2xl flex flex-row justify-between items-center ${
                gender === 1 ? "bg-slate-100" : "bg-[#f7f7f7] "
              }`}
            >
              <div className=" m-1 rounded-full p-[2px] ring-1 ring-blue-400 ">
                <div
                  className={`h-[14px] w-[14px]  rounded-full ${
                    gender === 1 ? "bg-blue-400" : "bg-[#f7f7f7]"
                  }`}
                ></div>
              </div>
              <div className="text-slate-500 text-[14px]">Male</div>
            </div>
            <div
              onClick={() => {
                setGender(2);
                setGenderr("Female");
              }}
              className={`h-[50px] px-3 rounded-2xl flex flex-row justify-between items-center ${
                gender === 2 ? "bg-slate-100" : "bg-[#f7f7f7] "
              }`}
            >
              <div className=" rounded-full ring-1 m-1 ring-blue-400 p-[2px]">
                <div
                  className={`h-[14px] w-[14px]  rounded-full ${
                    gender === 2 ? "bg-blue-400" : "bg-[#f7f7f7]"
                  }`}
                ></div>
              </div>
              <div className="text-slate-500 text-[14px]">Female</div>
            </div>
            <div
              onClick={() => {
                setGender(3);
                setGenderr("Others");
              }}
              className={`h-[50px] px-3 rounded-2xl flex flex-row justify-between items-center ${
                gender === 3 ? "bg-slate-100" : "bg-[#f7f7f7] "
              }`}
            >
              <div className=" m-1 rounded-full ring-1 ring-blue-400 p-[2px]">
                <div
                  className={`h-[14px] w-[14px]  rounded-full ${
                    gender === 3 ? "bg-blue-400" : "bg-[#f7f7f7]"
                  }`}
                ></div>
              </div>
              <div className="text-slate-500 text-[14px]">Others</div>
            </div>
          </div>
        </div>
        <div className="py-5 ">
          {datav ? (
            <div
              onClick={() => {
                setChange(2);
              }}
              className="h-[40px] w-[150px] bg-[#171717] pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white "
            >
              Next
            </div>
          ) : (
            <div className="h-[40px] w-[150px] bg-[#9b9b9b] pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white ">
              Next
            </div>
          )}
        </div>
      </div>
      {/* second */}
      <div
        className={`${
          change === 2
            ? "h-[100%] w-[100%] items-center flex flex-col"
            : "hidden"
        }`}
      >
        <div className="flex justify-center items-center flex-col ">
          <div className="font-bold pn:max-sm:text-[18px] text-[25px] text-[#313C58] ">
            "Let's build something extraordinary!"
          </div>

          <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[14px]">
            You can change them at any time in settings
          </div>
        </div>
        {/* profile */}
        <div className="flex flex-col justify-center gap-4 items-center pt-10">
          <div className="h-16 w-16 rounded-3xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]">
            {selectImage && (
              <img
                src={selectImage}
                className="h-16 w-16 rounded-3xl  sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#fff]"
                alt="Selected"
              />
            )}
          </div>
          <div className=" font-semibold ">
            <form>
              <input
                id="inputTag"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="inputTag"
                className=" outline-none  select-none cursor-pointer text-sm font-semibold text-[#0075FF] "
              >
                Change Profile Piture
              </label>
            </form>
          </div>
        </div>
        {/* username */}
        <div className="py-4">
          <div className="text-black pn:max-sm:text-[15px] text-[15px] py-1">
            Username
          </div>
          <input
            value={username}
            className="h-[50px] w-[300px] ring-1 text-black ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100"
            placeholder="Enter your name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        {/* bio */}
        <div className="py-2">
          <div className="text-black py-1">Bio</div>
          <input
            value={bio}
            className="h-[50px] w-[300px] ring-1 text-black ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100"
            placeholder="Add some lines.."
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </div>

        {/* T&C */}
        <div className="flex flex-col pn:max-sm:absolute pn:max-sm:bottom-2">
          <div className="flex flex-row px-2 gap-2 pt-20 ">
            <div
              onClick={() => {
                setTick(!tick);
              }}
              className={`h-[17px] w-[17px] rounded-md flex items-center justify-center ${
                tick ? " ring-1 ring-black" : "bg-[#0075ff]"
              }`}
            >
              <TiTick className="h-6 w-6 text-white" />
            </div>
            <div className="text-black text-[11px]">
              I have read and agreed to the{" "}
              <span className="text-[#0075FF]">Terms & Conditions</span> and
              <span className="text-[#0075FF]"> Privacy policy</span>
            </div>
          </div>

          {/* back and next */}
          <div className="py-5 flex flex-row w-[100%] px-3 justify-between">
            <div
              onClick={() => {
                setChange(1);
              }}
              className="h-[40px] w-[150px] ring-1 ring-[#3e3e3e] pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-[#333333]"
            >
              Back
            </div>
            {datv ? (
              <div
                onClick={() => {
                  setChange(3);
                }}
                className="h-[40px] w-[150px] bg-black pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white "
              >
                Next
              </div>
            ) : (
              <div className="h-[40px] w-[150px] bg-[#7a7a7a] pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white ">
                Next
              </div>
            )}
          </div>
        </div>
      </div>
      {/* theird */}
      <div
        className={`${
          change === 3
            ? "flex flex-col justify-center items-center  py-2 px-2 h-screen pn:max-sm:h-[100%] w-screen bg-white"
            : "hidden"
        }`}
      >
        <div className="font-bold  pn:max-sm:text-[18px] text-[25px] text-[#313C58] ">
          Choose what You Like!
        </div>
        <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[14px] px-5">
          You can change them at any time in settings
        </div>

        {/* All interests */}
        <div className="w-[100%] bg-white scrollbar-hide overflow-auto h-[70%] flex flex-wrap justify-center items-center">
          {data.map((d, i) => (
            <div
              key={i}
              disabled={load}
              onClick={() => {
                if (interest?.includes(d?.item)) {
                  const updatedInterests = interest?.filter(
                    (item) => item !== d?.item
                  );
                  setInterest(updatedInterests);
                } else {
                  const updatedInterests = [...interest, d?.item];
                  setInterest(updatedInterests);
                }
              }}
              className={`select-none ${
                interest?.includes(d?.item)
                  ? "flex flex-row px-2 h-[50px] m-3 justify-center items-center rounded-full bg-[#0075FF] gap:3 "
                  : "flex flex-row px-2 h-[50px] m-3 justify-center items-center rounded-full bg-slate-200 gap:3 "
              }`}
            >
              <div
                className={`${
                  interest?.includes(d?.item)
                    ? " text-[#fff] text-[12px] mx-2"
                    : " text-[#171717] text-[12px] mx-2"
                }`}
              >
                {d.item}
              </div>
              <Image
                alt="img"
                src={d.img}
                className="h-[35px] w-[35px] mx-2 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="py-5 flex flex-row w-[100%] px-5 justify-between">
          <div
            onClick={() => {
              setChange(2);
            }}
            className="h-[40px] w-[150px] ring-1 ring-black  bg-white pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-[#333333]"
          >
            Back
          </div>
          {dtv ? (
            <div className="h-[40px] w-[150px] bg-[#7a7a7a] pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white ">
              Next
            </div>
          ) : (
            <div
              onClick={handleNext}
              className="h-[40px] w-[150px] bg-black pn:max-sm:w-[100px] flex items-center justify-center rounded-2xl text-white "
            >
              Next
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
