"use client";
import Image from "next/image";
import React, { useState } from "react";
import headset from "../../assets/Images/headset-help.png";
import profile from "../../assets/Images/profile.png";
import messages3 from "../../assets/Images/messages3.png";
import people from "../../assets/Images/people.png";
import notification from "../../assets/Images/notification.png";
import monetize from "../../assets/Images/Vector(6).png";

function page() {
  const [click, setClick] = useState(1);
  return (
    <div className="flex select-none flex-row bg-white h-screen w-[100%]">
      <div className="w-[30%]  pn:max-md:w-[100%] h-screen bg-[#FAFAFA] flex flex-col text-black items-center  font-sans">
        <div className="text-[20px]  font-sans font-bold py-4 flex items-center  w-[90%]">
          Settings
        </div>

        {/* Account-1 */}
        <div
          onClick={() => {
            setClick(1);
          }}
          className={`${
            click === 1
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Account
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              Privacy, security , change email or number
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={profile} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Chats -2 */}
        <div
          onClick={() => {
            setClick(2);
          }}
          className={`${
            click === 2
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Chats
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              Theme, wallpapers, chat history
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={messages3} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Communities-3 */}
        <div
          onClick={() => {
            setClick(3);
          }}
          className={`${
            click === 3
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Communities
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              Privacy, security , change email or number
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={people} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Notification-4 */}
        <div
          onClick={() => {
            setClick(4);
          }}
          className={`${
            click === 4
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Notification
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              Message, Communities & call tones
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={notification} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Help-5 */}
        <div
          onClick={() => {
            setClick(5);
          }}
          className={`${
            click === 5
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Help
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              Help centre, contact us, privacy policy
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={headset} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Monetization -6*/}
        <div
          onClick={() => {
            setClick(6);
          }}
          className={`${
            click === 6
              ? "flex flex-row border-2 bg-white rounded-2xl  py-1 w-[90%]"
              : "flex flex-row py-1 w-[90%]"
          }`}
        >
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Monetization
            </div>
            <div className="text-[11px] h-[50%] w-[100%] flex items-center py-1">
              See how you can make money on Grovyo and manage your monetization
              options.
            </div>
          </div>

          <div className=" h-[100%] flex justify-center items-center w-[20%]">
            <Image src={monetize} className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* Invite a friend */}
        <div className="flex flex-row  py-1  w-[90%]">
          <div className=" flex-col h-[100%] flex items-center w-[80%] px-2">
            <div className="text-[14px] py-1 w-[100%] flex items-center ">
              Invite a friend
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] pn:max-md:hidden h-screen bg-white flex flex-col justify-center items-center">
        <div
          className={`${
            click === 1
              ? "h-[95%] w-[80%] bg-white flex flex-col justify-evenly"
              : "hidden"
          }`}
        >
          <div className="text-[26px] font-bold text-black py-1">
            Edit personal details
          </div>

          {/* change profile */}
          <div className="flex flex-col items-center h-[15%] justify-evenly  w-[18%]">
            <div className="text-[14px] text-black">Change Profile Image</div>
            <div className="bg-yellow-200 h-[40px] w-[40px] rounded-2xl"></div>
            <div className=" text-[12px] text-[#1B72C0]">Change Profile</div>
          </div>

          {/* Name and user name */}
          <div className="flex flex-row h-[10%] text-black w-[100%] justify-between">
            <div className="h-[100%] w-[40%] flex flex-col ">
              <div className="text-black flex items-center text-[12px] h-[50%] w-[100%]">
                Name
              </div>
              <input
                className="h-[50%] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                placeholder="Salem"
              />
            </div>
            <div className="h-[100%] w-[40%] flex flex-col ">
              <div className="text-black flex items-center text-[12px] h-[50%] w-[100%]">
                User Name
              </div>
              <input
                className="h-[50%] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                placeholder="Salem"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-row h-[10%] text-[#585858] w-[100%] justify-between">
            <div className="h-[100%] w-[100%] flex flex-col ">
              <div className="text-[#585858] flex items-center text-[12px] h-[50%] w-[100%]">
                Email
              </div>
              <input
                className="h-[50%] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                placeholder="Salem"
              />
            </div>
          </div>

          {/* Phone no */}

          <div className="flex flex-row h-[10%] text-[#585858] w-[100%] justify-between">
            <div className="h-[100%] w-[100%] flex flex-col ">
              <div className="text-[#585858] flex items-center text-[12px] h-[50%] w-[100%]">
                Phone number
              </div>
              <div className="h-[50%] w-[100%] flex flex-row justify-between">
                <input
                  className="h-[100%] w-[10%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                  placeholder="+ 91"
                />
                <input
                  className="h-[100%] w-[88%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                  placeholder="S+91"
                />
              </div>
            </div>
          </div>

          {/*Bio */}
          <div className="flex flex-row h-[25%] text-[#585858] w-[100%] justify-between">
            <div className="h-[100%] w-[100%] flex flex-col ">
              <div className="text-[#585858] flex items-center text-[12px] py-2 w-[100%]">
                Bio
              </div>
              <textarea
                className="h-[150px] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                placeholder="Hi, I'm John! I'm a travel enthusiast and adventure seeker. I believe in embracing new experiences and creating lifelong memories. When I'm not exploring new destinations, you can find me capturing beautiful moments through my camera lens or trying out different cuisines. Let's connect and share our wanderlust stories! "
              />
            </div>
          </div>

          {/* Social mdia links */}
          <div className="flex flex-row h-[10%] text-[#585858] w-[100%] justify-between">
            <div className="h-[100%] w-[100%] flex flex-col ">
              <div className="text-[#585858] flex items-center text-[12px] h-[50%] w-[100%]">
                Social mdia links
              </div>
              <input
                className="h-[50%] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] text-black"
                placeholder="Salem"
              />
            </div>
          </div>
          {/* Paste link here */}
          <input
            className="h-[5%] text-[#585858] w-[100%] px-2 border-2 rounded-lg outline-none text-[12px] "
            placeholder="Paste link here"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
