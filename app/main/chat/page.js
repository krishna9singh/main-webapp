"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import list from "../../assets/Images/list.png";
import doc from "../../assets/Images/doc.png";
import smile from "../../assets/Images/smile.png";
import send from "../../assets/Images/send.png";
import { useSearchParams } from "next/navigation";

function page() {
  const search = useSearchParams();
  const pro = search.get("pro");
  const convId = search.get("convId");
  const name = search.get("name");
  const status = search.get("status");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [no, setNo] = useState(false);
  const contentRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [newContent, setNewContent] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    // Function to scroll the content down
    const scrollDownContent = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop += 10000000; // Adjust the scroll speed as needed
      }
    };

    // Call scrollDownContent every 100 milliseconds (adjust the timing as needed)
    const infiniteScrollInterval = setInterval(scrollDownContent, 10);

    // Start scrolling when new content appears
    if (newContent) {
      setScrolling(true);
      const scrollInterval = setInterval(scrollDownContent, 10); // Adjust the interval as needed

      // Stop scrolling after a certain duration (e.g., 3 seconds)
      setTimeout(() => {
        setScrolling(false);
        clearInterval(scrollInterval);
      }, 500); // Adjust the duration as needed
    }
  }, [newContent]);

  const inner = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getoneconv/${convId}/${id}`);
      const dat = res.data.reversedConv;
      const con = res.data?.reversedCont;
      const merge = dat?.map((d, i) => ({
        d,
        content: con[i],
      }));
      setData(merge);
    } catch (e) {}
    setTimeout(() => {
      setNewContent("New Content Here");
    }, 500);
  }, [convId]);

  useEffect(() => {
    const i = sessionStorage.getItem("id");
    setId(i);
    inner();
  }, [inner]);

  const handleSend = async () => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const scrollDownContent = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop += 10000; // Adjust the scroll speed as needed
      }
    };

    // Start scrolling when new content appears
    if (newContent) {
      setScrolling(true);
      const scrollInterval = setInterval(scrollDownContent, 10); // Adjust the interval as needed

      // Stop scrolling after a certain duration (e.g., 3 seconds)
      setTimeout(() => {
        setScrolling(false);
        clearInterval(scrollInterval);
      }, 1000); // Adjust the duration as needed
    }
    if (!msg.trim()) {
      console.log("type something");
    } else {
      if (reply) {
        let dat = {
          text: msg,
          //   vname: vname,
          //   imag: imag,
          sender: id,
          reply: reply,
          type: "reply",
          conversationId: convId,
          mesId: rid,
        };
        setData((p) => [...p, dat]);
        setReply("");
        setMsg("");
        const res = await axios.post(`${API}/newmessage`, dat);
        console.log(res?.data?.success);
      } else {
        let main = {
          text: msg,
          // vname: vname,
          // imag: imag,
          type: "message",
          conversationId: convId,
          sender: id,
          mesId: rid,
        };
        let dat = {
          d: {
            text: msg,
            // vname: vname,
            // imag: imag,
            sender: id,
            typ: "message",
            conversationId: convId,
            mesId: rid,
          },
          content: "Nothing",
        };
        setData((p) => [...p, dat]);
        setMsg("");
        const res = await axios.post(`${API}/newmessage`, main);
        console.log(res?.data?.success);
        setMessage("");
      }
    }
  };
  return (
    <div className="w-[100%] pn:max-md:hidden h-screen bg-white flex  flex-col ">
      {/* header */}
      <div className="h-[80px] w-[100%] bg-white flex flex-row shadow-sm">
        {/* profile */}
        <div className=" h-[100%] w-[8%]   flex justify-center items-center ">
          <img
            alt="dp"
            src={pro}
            className="h-[40px] w-[40px] ring-1 ring-white rounded-2xl bg-[#f9f9f9] shadow-sm"
          />
        </div>

        {/* name */}
        <div className="h-[100%] w-[84%] flex flex-col justify-center ">
          <p className="text-[16px] text-black font-sans font-medium max-w-[100%] ">
            {name}
          </p>
          <p className="text-[12px] text-black font-sans  max-w-[100%] ">
            {status}
          </p>
        </div>

        {/* list */}
        <div
          onClick={() => {
            setVisible(true);
            setClick(!click);
          }}
          className="h-[100%] w-[8%]  flex justify-center items-center"
        >
          <Image alt="list" src={list} className="h-[20px] w-[20px]" />
        </div>
      </div>

      {/* Messages*/}
      <div
        ref={contentRef}
        style={{ scrollBehavior: scrolling ? "smooth" : "auto" }}
        className="w-[100%] h-[80%] bg-bgg bg-contain px-5 py-2 flex flex-col overflow-auto scrollbar-hide"
      >
        {data.map((d, i) => {
          return (
            <div key={i} className=" px-5 py-2 flex flex-row">
              {d?.d?.sender === id ? (
                <>
                  <div className="flex flex-col w-[100%] h-[100%]  space-y-1 px-2 py-2">
                    <div className="flex items-end justify-end  ">
                      {newContent && (
                        <div className=" bg-blue-500 p-2 max-w-[80%] text-white rounded-b-lg rounded-tl-lg">
                          {d?.d?.text}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" h-[100%] w-[45px] ">
                    <img
                      alt="dp"
                      src={pro}
                      className="h-[35px] w-[35px] ring-1 ring-white rounded-xl bg-[#f9f9f9] shadow-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className=" h-[100%] w-[45px] ">
                    <img
                      alt="dp"
                      src={pro}
                      className="h-[35px] w-[35px] ring-1 ring-white rounded-xl bg-[#f9f9f9] shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]  space-y-1 px-2 py-2">
                    <div className="flex items-end ">
                      {newContent && (
                        <div className=" bg-[fff] p-2 max-w-[80%] bg-white text-black rounded-r-lg rounded-bl-lg">
                          {d?.d?.text}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="h-[100px] rounded-t-2xl bg-white w-[100%] white flex flex-row">
        <div className="w-[8%] flex justify-center items-center">
          <Image alt="doc" src={doc} className="h-[30px] w-[30px]" />
        </div>
        <div className="w-[92%] h-[100%] flex items-center">
          <div className="w-[95%] h-[70%] flex items-center bg-[#f9f9f9] rounded-2xl flex-row">
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              onChange={(text) => {
                setMsg(text.target.value);
              }}
              value={msg}
              className="h-[50px] w-[100%] outline-none px-2 rounded-2xl bg-[#f9f9f9] text-black"
              placeholder="Type a message"
            />
            <Image alt="smile" src={smile} className="h-[30px] w-[30px] " />
            <Image
              src={send}
              alt="send"
              onClick={handleSend}
              className="h-[30px] w-[30px] mx-2"
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`duration-150  ${
          click
            ? "right-0 absolute h-[100vh] overflow-auto scrollbar-hide bg-red-200"
            : " right-0 absolute h-[100vh] overflow-auto scrollbar-hide bg-red-200"
        }`}
      ></div>
    </div>
  );
}

export default page;
