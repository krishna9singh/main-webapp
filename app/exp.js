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
        open ? " w-screen h-screen flex justify-center items-center" : "hidden "
      }`}
    >
      <div className="h-[60vh] w-[40vw] bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4">
          <div>Create Post</div>
          <AiOutlineClose className="w-20 h-20" />
        </div>

        <div className="flex">
          <div className="h-[50vh] w-[20vw] bg-slate-100 rounded-lg">
            <input className="" />
          </div>

          <div>
            <div>
              <div>Title</div>
              <input className="bg-[#f7f7f7]" />
            </div>
            <div className="py-2 px-[2%] bg-white rounded-b-xl relative">
              <h1 className="text-lg py-1 font-medium">Enter Tags</h1>
              <div className="w-full flex justify-center items-center  rounded-xl border ">
                <div className="border-r-2 p-2 text-4xl" />
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
                  className="w-full rounded-xl p-2 outline-none "
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

              <div className="text-[#5585FF] text-[13px] mt-2">
                Note: Enter tags that your audience interested in..
              </div>
            </div>
            <div>
              <div>Description</div>
              <textarea className="bg-[#f7f7f7]" />
            </div>
            <div className="flex items-center justify-between ">
              <div className="w-20 py-2 ring-2 ring-[#0075ff] text-[#0075ff]">
                Discard Post
              </div>
              <div className="w-20 py-2 bg-[#0075ff] text-[#fff]"> Post</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default exp;
