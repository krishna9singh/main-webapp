"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/Essentials";
import axios from "axios";
import moment from "moment";
import Empty from "../../assets/Images/chatk.png";
import Image from "next/image";

export default function ChatLayout({ children }) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [no, setNo] = useState(false);
  const [click, setClick] = useState(false);
  const [cid, setCid] = useState([]);
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  // chats outer
  const fetchConv = useCallback(async () => {
    setLoad(false);
    const id = sessionStorage.getItem("id");
    try {
      const res = await axios.get(`${API}/getconv/${id}`);
      const conv = res.data.data.conv;
      const r = res.data.data.receiver;
      const rdp = res.data.data.receiverdp;
      const m = res.data.data.message;
      if (conv.length > 0) {
        setNo(true);
      } else {
        setNo(false);
      }
      const merge = conv.map((c, i) => ({
        c,
        rec: r[i],
        dp: rdp[i],
        msg: m[i],
        a: i,
      }));
      setData(merge);
      console.log(merge, "fum");
      setCid(merge?.c?._id);
      setLoad(true);
    } catch (e) {
      setLoad(false);

      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    fetchConv();
  }, [fetchConv]);
  if (load) {
    return (
      <div className="h-[100vh] w-[100%] bg-white dark:bg-[#171717] flex pn:max-md:justify-center ">
        {/* chats */}
        {/* Chat header */}
        <div className="h-[100vh] select-none pn:max-md:w-[100%] md:min-w-[390px] md:[360px] flex flex-col items-center pb-20  md:border-r-2 border-[#f7f7f7] overflow-auto scrollbar-hide ">
          <div className="w-[100%] h-[100px] flex flex-row px-5 justify-between items-center pn:max-md:h-[8%]">
            <div className="text-[24px] text-black font-sans font-semibold">
              Chats
            </div>
            <div className="text-[14px] text-black font-sans font-medium">
            Request
          </div>
          </div>
          {/* messages */}
          <div className="w-[100%]  overflow-auto pn:max-md:h-[92%] h-[100vh] flex flex-col ">
            {/* one chat */}

            {data.map((d, i) => (
              <React.Fragment key={i}>
                <Link
                  href={{
                    pathname: "../../main/chat/inner",
                    query: {
                      convId: d?.rec?._id,
                      pro: d?.dp,
                      name: d?.rec?.fullname,
                    }, // Corrected the object property assignments
                  }}
                  onClick={() => {
                    setClick(true);
                  }}
                  className={`pn:max-md:hidden justify-center items-center ${
                    click
                      ? "w-[100%] rounded-xl hover:bg-[#f9f9f9]   h-[70px] px-4 flex flex-row "
                      : "w-[100%] rounded-xl bg-[#fff]  h-[70px] px-4 flex flex-row "
                  }`}
                >
                  {/* profile */}

                  <div className=" h-[45px] w-[45px] rounded-2xl flex justify-end items-center ">
                    <img
                      alt="dp"
                      src={d?.dp}
                      className="h-[45px] w-[45px] rounded-2xl bg-[#f9f9f9] ring-1 ring-white shadow-sm"
                    />
                  </div>
                  {/* Name and message */}

                  <div className=" h-[100%] w-[300px]  flex flex-row">
                    <div className="h-[100%] w-[100%] px-3 py-4 justify-between overflow-hidden  flex flex-col ">
                      <p className="text-[16px] text-black font-sans font-medium max-w-[100%] ">
                        {d?.rec?.fullname}
                      </p>
                      <p className="text-[12px] text-black font-medium truncate max-w-[100%] ">
                        {d?.msg?.text}
                      </p>
                    </div>
                    <div className=" h-[100%] w-[30%] flex flex-col py-3 justify-center items-center">
                      {/* <div className="bg-[#0075FF] text-white text-[10px] flex px-2 pn:max-md:justify-center pn:max-md:items-center py-1 h-[20px] w-[20px] rounded-full">
                      1
                    </div> */}
                      <div className="text-black text-[12px] font-semibold">
                        {moment(d?.msg?.updatedAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href={{
                    pathname: "../../phone/ChatInner",
                    query: {
                      convId: d?.msg?.conversationId,
                      pro: d?.dp,
                      name: d?.rec?.fullname,
                      status: d?.msg?.status,
                    }, // Corrected the object property assignments
                  }}
                  className="w-[100%] md:hidden  rounded-xl hover:bg-[#f9f9f9] bg-white h-[70px] px-4 flex flex-row "
                >
                  {/* profile */}

                  <div className=" h-[100%] flex justify-end items-center ">
                    <img
                      alt="dp"
                      src={d?.dp}
                      className="h-[45px] w-[50px] ring-1 ring-white rounded-2xl bg-[#f9f9f9] shadow-sm"
                    />
                  </div>
                  {/* Name and message */}

                  <div className=" h-[100%] w-[100%]  flex flex-row">
                    <div className="h-[100%] w-[100%] px-3 py-4 justify-between  flex flex-col ">
                      <p className="text-[16px] text-black font-sans font-medium max-w-[100%] ">
                        {d?.rec?.fullname}
                      </p>
                      <p className="text-[12px] text-black font-medium  max-w-[100%] ">
                        {d?.msg?.text}
                      </p>
                    </div>
                    <div className=" h-[100%] w-[30%] flex flex-col py-3 justify-center items-center">
                      {/* <div className="bg-[#0075FF] text-white text-[10px] flex px-2 pn:max-md:justify-center pn:max-md:items-center py-1 h-[20px] w-[20px] rounded-full">
                      1
                    </div> */}
                      <div className="text-black text-[12px] font-semibold">
                        {moment(d?.msg?.updatedAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Chat */}
        {click === false ? (
          <div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
            <div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
              <Image src={Empty} alt="empty" />
              <div className="text-[20px] font-bold">You've got message</div>
              <div className="font-medium">No messages in your inbox</div>
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  } else {
    return (
      <div className="h-[100vh] w-[100%] bg-white dark:bg-[#171717] flex pn:max-md:justify-center ">
        {/* chats */}
        {/* Chat header */}
        <div className="h-[100vh] select-none pn:max-md:w-[100%] md:min-w-[390px] md:[360px] flex flex-col items-center pb-20  md:border-r-2 border-[#f7f7f7] overflow-auto scrollbar-hide ">
          <div className="w-[100%] h-[100px] flex flex-row px-5 justify-between items-center pn:max-md:h-[8%]">
            <div className="text-[24px] text-black font-sans font-semibold">
              Chats
            </div>
            {/* <div className="text-[14px] text-black font-sans font-medium">
        Request
      </div> */}
          </div>
          {/* messages */}
          <div className="w-[100%]  overflow-auto pn:max-md:h-[92%] h-[100vh] flex flex-col ">
            {/* one chat */}
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl hover:bg-[#f9f9f9] my-1 bg-slate-300 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
          </div>
        </div>

        {/* Chat */}
        {click === true ? (
          <div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
            <div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
              <Image src={Empty} alt="empty" />
              <div className="text-[20px] font-bold">You've got message</div>
              <div className="font-medium">No messages in your inbox</div>
            </div>
          </div>
        ) : (
          <div className="pn:max-md:hidden"> {children}</div>
        )}
      </div>
    );
  }
}
