"use client";
import React, { useState } from "react";
import axios from "axios";
import i from "../assets/Images/bluesearch.png";
import Image from "next/image";
import { API } from "@/Essentials";
import Link from "next/link";
function page() {
  const [text, setText] = useState("");
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [load, setLoad] = useState(false);
  const [timeout, setTimeout] = useState("");
  const [active, setActive] = useState("");
  const [click, setClick] = useState(1);
  //const href = `/defprosite?dd=${data}`;
  // search

  const handleSearch = async () => {
    setActive("prosites"), setClick(1);
    const res = await axios.post(`${API}/searchpros?query=${text}`);
    if (res?.data?.data?.success) {
      const pros = res?.data?.data?.pros;
      const dp = res?.data?.data?.dps;
      const merge = pros?.map((p, i) => ({ p, dps: dp[i] }));
      setData(merge);
      setLoad(true);
      console.log(merge);
    }
  };
  const comm = async () => {
    setActive("communities"), setClick(2);
    const res = await axios.post(`${API}/searchcoms?query=${text}`);
    if (res?.data?.success) {
      const pros = res?.data?.data?.coms;
      const dp = res?.data?.data?.dps;
      const c = res?.data?.data?.creatordps;
      const merge = pros?.map((p, i) => ({
        p,
        dps: dp[i],
        creatordps: c[i],
      }));
      setDataa(merge);
      setLoad(true);
    }
  };
  // console.log(data);

  return (
    <div className="md:min-w-[390px] md:[360px] h-screen dark:bg-[#000] bg-[#fff] flex flex-col">
      <div className="flex flex-row justify-around dark:bg-black bg-white items-center p-2 h-[6%] w-[100%]">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={text}
          className="ring-1 ring-[#E2E8F0] dark:ring-[#000] dark:bg-[#3e3e3e] dark:text-[#fff] rounded-xl p-2 w-[85%] outline-none text-black"
          placeholder="Search"
          onChange={(t) => setText(t.target.value)}
        />
        <Image
          onClick={handleSearch}
          src={i}
          alt="icons"
          className="h-[40px] w-[40px] bg-contain"
        />
      </div>

      {/* Options */}
      <div className=" w-[100%] px-2 flex flex-row py-2 select-none ">
        <div
          onClick={handleSearch}
          className={`${
            active === "prosites"
              ? " text-[12px] text-white  font-medium bg-blue-500 rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
              : "text-[12px] text-[#717171] font-medium dark:bg-[#171717] dark:text-white bg-[#f7f7f7] rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
          }`}
        >
          Prosite
        </div>
        <div
          onClick={comm}
          className={`${
            active === "communities"
              ? "text-[12px] text-white  font-medium bg-blue-500 rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
              : "text-[12px] text-[#717171] font-medium dark:bg-[#171717] dark:text-white bg-[#f7f7f7] rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
          }`}
        >
          Communities
        </div>
      </div>

      <div className=" w-[100%]  px-10">
        <div className="w-[100%] bg-[#f6f6f6] dark:bg-[#171717] h-[1px]"></div>
      </div>
      {/* People */}
      <div className="overflow-auto scrollbar-hide ">
        {active === "prosites" ? (
          <div className="px-2">
            {data.map((d, i) => (
              <Link
                href={{
                  pathname: "../../defprosite",
                  query: { data: d?.p?._id }, // Pass the data as a JSON string
                }}
                className="flex flex-row dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
              >
                <img
                  src={d?.dps}
                  className="h-[35px] w-[35px] bg-[#f5f5f5] rounded-2xl"
                />
                <div className="px-2 py-2 dark:text-white text-black text-[14px] font-bold ">
                  {d?.p?.fullname}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-2">
            {dataa.map((d, i) => (
              <Link
                href={{
                  pathname: "defprosite",
                  query: { data: d?.p?._id }, // Pass the data as a JSON string
                }}
                className="flex flex-row dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
              >
                <img
                  src={d?.dps}
                  className="h-[35px] w-[35px] bg-slate-400  rounded-2xl"
                />
                <div className="px-2 dark:text-white py-2 text-black text-[14px] font-bold ">
                  {d?.p?.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
