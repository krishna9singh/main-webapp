"use client";
import React, { useEffect, useState } from "react";

import search from "../assets/Images/Searchhhh.png";
import notify from "../assets/Images/Notify.png";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [pix, setPix] = useState();

  const fetch = async () => {
    const value = await sessionStorage.getItem("pic");
    setPix(value);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="w-full h-[60px] flex flex-row bg-white items-center py-1  ">
      <div className="w-[15%] h-[100%] -white flex justify-center items-center">
        <div className="h-[40px] w-[40px] rounded-2xl bg-[#f5f5f5] ring-1 ring-white shadow-sm">
          {pix !== null ? (
            <Link href="prosite">
              <img
                className="h-[40px] w-[40px] rounded-2xl  bg-[#f5f5f5] ring-1 ring-white shadow-sm "
                src={pix}
                alt="pix"
              />
            </Link>
          ) : (
            <div className="h-[40px] w-[40px] rounded-2xl bg-[#f5f5f5] ring-1 ring-white shadow-sm "></div>
          )}
        </div>
      </div>
      <div className="w-[55%] h-[100%] "></div>
      <div className="w-[30%] h-[100%] flex flex-row justify-center items-center">
        <Link href="../../phone/Search">
          <Image src={search} alt="icons" className="h-[45px] w-[45px]" />
        </Link>
        <Image src={notify} alt="icons" className="h-[45px] w-[45px]" />
      </div>
    </div>
  );
}

export default Header;
