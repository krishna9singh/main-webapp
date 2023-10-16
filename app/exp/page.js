"use client";
import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

function exp() {
  const [open, setOpen] = useState(true);
  const [t, setT] = useState("");
  const [three, setThree] = useState({ tags: [] });
  return (
    <div
      onClick={() => {}}
      className={`absolute z-20 top-0 bottom-0 right-0 left-0 bg-[#27272725] duration-500 ${
        open ? " w-screen h-screen flex justify-center items-center" : "hidden"
      }`}
    >
      <div className="h-[480px] pn:max-md:h-screen w-[690px] bg-white rounded-2xl py-4">
        <div className="flex justify-between items-center px-4 ">
          <div className="font-bold text-[20px]">Create Post</div>
        
        </div>

        <div className="flex pn:max-md:flex-col justify-between px-1 pt-4">
          <div className="h-[40vh] md:w-[50%] flex justify-center items-center bg-slate-100 rounded-lg">
            <input className="" type="file" />
          </div>
          <div className="md:w-[50%] flex flex-col px-6 justify-center">
            <div className="py-2 relative">
              <div className="text-[18px]">Title</div>
              <input
                placeholder="posts name..."
                className="w-full rounded-xl p-2 outline-none bg-[#f7f7f7]"
              />
            </div>
            <div className="py-2 relative">
              <h1 className="text-[18px] py-1 font-medium">Enter Tags</h1>
              <div className="w-full flex justify-center items-center  rounded-xl border ">
                <input
                  name="myForm"
                  type="text"
                  onChange={(e) => {
                    setT(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (!t) return;
                    else if (three?.tags?.length < 5) {
                      if (e.key === "Enter") {
                        setThree((three) => ({
                          ...three,
                          tags: [...three.tags, e.target.value],
                        }));
                        setT("");
                      }
                    } else {
                      if (e.key === "Enter") {
                        setT(e.target.value);
                      }
                    }
                  }}
                  value={t}
                  placeholder="tags"
                  className="w-full rounded-xl p-2 outline-none bg-[#f7f7f7]"
                />
              </div>
              {three?.tags?.length >= 5 && t !== "" && (
                <>
                  <div className="text-sm font-medium py-3 text-red-500">
                    Cant insert more than 5 tags
                  </div>
                </>
              )}
              <div className="flex  flex-wrap items-center gap-2 my-3">
                {three?.tags?.map((f, g) => (
                  <div
                    key={g}
                    className="flex justify-center items-center gap-2 bg-[#FAFAFA] p-2 px-3 rounded-full"
                  >
                    <div>{f}</div>
                    <div
                      onClick={() => {
                        setThree((three) => ({
                          ...three,
                          tags: three.tags.filter((_, h) => h !== g),
                        }));
                      }}
                    >
                      <AiOutlineClose className="text-white bg-black rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[#5585FF] text-[13px] ">
                Note: Enter tags that your audience interested in..
              </div>
            </div>
            <div>
              <div>Description</div>
              <textarea placeholder="description" className="w-full rounded-xl p-2 outline-none bg-[#f7f7f7]" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="w-36 rounded-xl flex items-center justify-center py-2 ring-2 ring-[#0075ff] text-[#0075ff]">
                Discard Post
              </div>
              <div className="w-36 rounded-xl flex items-center justify-center py-2 bg-[#0075ff] text-[#fff]"> Post</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default exp;
