import React from "react";

function page() {
  return (
    <>
      <div className="w-[100%] h-screen  flex select-none flex-col bg-[#f9f9f9] items-center">
        {/* header */}
        <div className="h-[70px] w-[100%] bg-white flex justify-between">
          <div className="flex w-[300px] pl-2">
            <div className="w-[50px] h-[100%] flex justify-center object-scale-down items-center ">
              <div className="h-[40px] w-[40px] bg-slate-100 animate-pulse object-fill rounded-xl shadow-sm " />
            </div>
            <div className="flex flex-col w-[79%] justify-center px-2 items-start">
              <div className="flex flex-row py-2 items-center">
                <div className="w-20 h-4 bg-slate-100 animate-pulse rounded-full text-[14px] font-bold font-sans"></div>
              </div>

              <div className="flex flex-row  justify-start z-0 w-[100%] items-center space-x-3">
                <div className="flex flex-row  justify-start z-0 ">
                  <div className="h-[25px] w-[25px] rounded-lg z-30 bg-slate-100 animate-pulse" />
                  <div className="h-[25px] w-[25px] rounded-lg z-20 -ml-[10px] bg-slate-200 animate-pulse" />
                  <div className="h-[25px] w-[25px] rounded-lg z-10 -ml-[10px] bg-slate-300 animate-pulse" />
                  <div className="h-[25px] w-[25px] rounded-lg z-0 -ml-[10px] bg-slate-400 animate-pulse" />
                </div>

                <div className="w-10 h-4 rounded-full bg-slate-100 animate-pulse "></div>
              </div>
            </div>
          </div>
          <div className="w-[50px] flex justify-center items-center h-[100%] ">
            <div className="h-[40px] w-[40px] bg-slate-100 rounded-lg" />
          </div>
        </div>

        {/* Main */}
        <div className="h-[85%] w-[100%] flex flex-col justify-center  ">
          {/* All  */}
          <div className="h-[50px] w-[100%] bg-white flex flex-row shadow-sm justify-center items-center ">
            <div className="flex flex-row w-[100%] px-4 justify-center items-center ">
              <div className="mx-2 bg-slate-100 rounded-3xl w-20 h-7 text-white cursor-pointer font-medium font-sans"></div>
              <div className="mx-2 bg-slate-100 rounded-3xl w-20 h-7 text-white cursor-pointer font-medium font-sans"></div>
              <div className="mx-2 bg-slate-100 rounded-3xl w-20 h-7 text-white cursor-pointer font-medium font-sans"></div>
              <div className="mx-2 bg-slate-100 rounded-3xl w-20 h-7 text-white cursor-pointer font-medium font-sans"></div>
            </div>
          </div>
          {/*  Post section and chatting*/}
          <div className="h-[100vh] overflow-y-scroll scrollbar-hide bg-bgg bg-contain">
            <>
              {/* Post */}
              <div className=" w-[360px] flex flex-row p-2">
                {/* dp */}
                <div className="h-[35px] w-[35px] animate-pulse rounded-xl bg-slate-200 shadow-sm" />

                {/* whole post */}
                <div className="flex flex-col bg-slate-100 animate-pulse shadow-md w-[100%] mt-4 ml-2 rounded-r-xl rounded-bl-xl p-2">
                  {/* sender and time */}
                  <div className="h-[30px]   w-[100%] flex flex-row items-center ">
                    <div className="flex flex-row w-[100%] items-center h-[100%] ">
                      {/* Community name */}
                      <div className="flex flex-col w-[100%] justify-start px-2 items-start">
                        <div className="flex flex-row items-center ">
                          <div className="text-[12px] w-8 h-4 bg-slate-200 rounded-full font-sans"></div>
                          {/* //Time */}
                          <div className="text-[12px] w-6 h-4 bg-slate-200 rounded-full font-sans"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Post img */}
                  <div className="h-[250px] w-full bg-slate-200 object-scale-down flex justify-center  items-center rounded-md" />
                  {/* Desc */}
                  <div className="w-[100%] h-[30px] flex items-center overflow-hidden text-clip text-black text-[16px] py-2"></div>
                  {/* Comment */}
                  <div className="flex flex-row  items-center justify-between">
                    <div className="w-[70%]">
                      <div className="h-[35px] w-[140px] bg-slate-200 rounded-2xl  px-2 flex items-center text-black outline-none text-[14px] " />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex flex-row bg-slate-200 rounded-2xl px-2 py-1 items-center">
                        <div className="h-[25px] w-[25px]" />
                        <div className="text-[12px] w-2 h-6 text-[#3A3A3A] mx-1"></div>
                      </div>
                      <div className="h-[33px] w-[33px] bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-[360px] flex flex-row p-2">
                {/* dp */}
                <div className="h-[35px] w-[35px] animate-pulse rounded-xl bg-slate-200 shadow-sm" />

                {/* whole post */}
                <div className="flex flex-col bg-slate-100 animate-pulse shadow-md w-[100%] mt-4 ml-2 rounded-r-xl rounded-bl-xl p-2">
                  {/* sender and time */}
                  <div className="h-[30px]   w-[100%] flex flex-row items-center ">
                    <div className="flex flex-row w-[100%] items-center h-[100%] ">
                      {/* Community name */}
                      <div className="flex flex-col w-[100%] justify-start px-2 items-start">
                        <div className="flex flex-row items-center ">
                          <div className="text-[12px] w-8 h-4 bg-slate-200 rounded-full font-sans"></div>
                          {/* //Time */}
                          <div className="text-[12px] w-6 h-4 bg-slate-200 rounded-full font-sans"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Post img */}
                  <div className="h-[250px] w-full bg-slate-200 object-scale-down flex justify-center  items-center rounded-md" />
                  {/* Desc */}
                  <div className="w-[100%] h-[30px] flex items-center overflow-hidden text-clip text-black text-[16px] py-2"></div>
                  {/* Comment */}
                  <div className="flex flex-row  items-center justify-between">
                    <div className="w-[70%]">
                      <div className="h-[35px] w-[140px] bg-slate-200 rounded-2xl  px-2 flex items-center text-black outline-none text-[14px] " />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex flex-row bg-slate-200 rounded-2xl px-2 py-1 items-center">
                        <div className="h-[25px] w-[25px]" />
                        <div className="text-[12px] w-2 h-6 text-[#3A3A3A] mx-1"></div>
                      </div>
                      <div className="h-[33px] w-[33px] bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-[360px] flex flex-row p-2">
                {/* dp */}
                <div className="h-[35px] w-[35px] animate-pulse rounded-xl bg-slate-200 shadow-sm" />

                {/* whole post */}
                <div className="flex flex-col bg-slate-100 animate-pulse shadow-md w-[100%] mt-4 ml-2 rounded-r-xl rounded-bl-xl p-2">
                  {/* sender and time */}
                  <div className="h-[30px]   w-[100%] flex flex-row items-center ">
                    <div className="flex flex-row w-[100%] items-center h-[100%] ">
                      {/* Community name */}
                      <div className="flex flex-col w-[100%] justify-start px-2 items-start">
                        <div className="flex flex-row items-center ">
                          <div className="text-[12px] w-8 h-4 bg-slate-200 rounded-full font-sans"></div>
                          {/* //Time */}
                          <div className="text-[12px] w-6 h-4 bg-slate-200 rounded-full font-sans"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Post img */}
                  <div className="h-[250px] w-full bg-slate-200 object-scale-down flex justify-center  items-center rounded-md" />
                  {/* Desc */}
                  <div className="w-[100%] h-[30px] flex items-center overflow-hidden text-clip text-black text-[16px] py-2"></div>
                  {/* Comment */}
                  <div className="flex flex-row  items-center justify-between">
                    <div className="w-[70%]">
                      <div className="h-[35px] w-[140px] bg-slate-200 rounded-2xl  px-2 flex items-center text-black outline-none text-[14px] " />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex flex-row bg-slate-200 rounded-2xl px-2 py-1 items-center">
                        <div className="h-[25px] w-[25px]" />
                        <div className="text-[12px] w-2 h-6 text-[#3A3A3A] mx-1"></div>
                      </div>
                      <div className="h-[33px] w-[33px] bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>

        {/* Footer */}

        <div className="h-[10%] w-[100%]  flex items-end">
          <div className="h-[70%] w-[100%] bg-[#F1F1F1] rounded-t-3xl shadow-2xl flex flex-row justify-center items-center">
            <div className="h-[30px] w-[30px] mx-2" />
            <div className="w-80 h-6 bg-slate-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
